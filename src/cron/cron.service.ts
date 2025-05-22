import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CronServiceInterface } from './cron.interface';
import { AxiosServiceInterface } from 'src/common/axios/interface/axios.service.interface';
import { LessThan, MoreThan } from 'typeorm';
import { SendWhatsappCommunicationRequest } from 'src/third-party/whatsapp-communication/request-response';
import { WhatsappCommunicationType } from 'src/common/enum';
import { WhatsappMessages } from 'src/third-party/whatsapp-communication/whatsapp-communication.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from 'src/users/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class CronService implements CronServiceInterface {
  constructor(
    @Inject('AxiosService')
    private readonly axiosService: AxiosServiceInterface,

    @InjectModel(User.name)
    private readonly usersModel: Model<UsersDocument>,
  ) { }
  // @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_9)
  // @Cron("*/20 * * * * *")
  @Cron("0 15 02 * * 1-6")
  async sendWhatsappMessage() {
    const whatsappMessages = new WhatsappMessages()
    const users = await this.usersModel.find({ isActive: true }).exec();
    // const users = [{ phone: '9451765673', fName: 'Rohit' }, { phone: '9792862723', fName: 'Sumit' }];
    // const users = [
    //   {phone: '6392075010', fName: 'Avaneesh'}, 
    //   {phone: '9670238902', fName: 'Shivam'}, 
    //   {phone: '8423032276', fName: 'Gyan'}, 
    //   {phone: '8423090347', fName: 'Harsha'},
    //   {phone: '9205365997', fName: 'Hemang'}, 
    //   {phone: '9555184566', fName: 'Narendra'}, 
    //   {phone: '8433003469', fName: 'Purvi'}, 
    //   {phone: '6386039601', fName: 'Shailja'},
    //   {phone: '7458968889', fName: 'Shivkant'},
    //   {phone: '8924024755', fName: 'Shyam'},
    //   {phone: '9451765673', fName: 'Rohit'},
    //   {phone: '9792862723', fName: 'Sumit'}
    // ];
    await Promise.all(
      users.map(async (user) => {
        try {
          const sendWhatsappCommunicationRequestRequest = new SendWhatsappCommunicationRequest(
            WhatsappCommunicationType.PERSONAL,
            `+91${user.phone}`,
            await whatsappMessages.personalTraining800(user));

          const res = await this.axiosService.post(
            sendWhatsappCommunicationRequestRequest.url,
            sendWhatsappCommunicationRequestRequest.headers,
            sendWhatsappCommunicationRequestRequest.body,
            'internal-send-comm',
            user.phone,
          );
          console.log('Send communication Cron Success', user.phone, ': ', res);
        } catch (e) {
          console.log('Send communication Cron Error', user.phone);
          console.error(e);
        }
      })
    );
  }
}
// 🙏 Namaste, Rohit!
// 🔑 Your OTP for signing into SFG Yoga is: 1234.

// 🧘 Learn yoga from certified Yoga Acharyas and embark on your wellness journey with us!
// 🌐 Visit our website: www.sfg-yoga.com

// Stay calm and carry on! 🙌