import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CronServiceInterface } from './cron.interface';
import { AxiosServiceInterface } from 'src/common/axios/interface/axios.service.interface';
import { LessThan, MoreThan } from 'typeorm';
import { SendWhatsappCommunicationRequest } from 'src/third-party/whatsapp-communication/request-response';
import { WhatsappCommunicationType } from 'src/common/enum';
import { WhatsappMessages } from 'src/third-party/whatsapp-communication/whatsapp-communication.service';

@Injectable()
export class CronService implements CronServiceInterface {
  constructor(
    @Inject('AxiosService')
    private readonly axiosService: AxiosServiceInterface,
  ) { }
  // @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_9)
  // @Cron("*/20 * * * * *")
  @Cron("0 0 02 * * 1-6")
  async sendWhatsappMessage() {
    const whatsappMessages = new WhatsappMessages()
    // const users = [{ phone: '9451765673', firstName: 'Rohit Ji' }, { phone: '9792862723', firstName: 'Sumit Ji' }];
    const users = [
      {phone: '6392075010', firstName: 'Avaneesh Ji'}, 
      {phone: '9670238902', firstName: 'Shivam Ji'}, 
      {phone: '8423032276', firstName: 'Gyan Ji'}, 
      {phone: '8423090347', firstName: 'Harsha Ji'},
      {phone: '9205365997', firstName: 'Hemang Ji'}, 
      {phone: '9555184566', firstName: 'Narendra Ji'}, 
      {phone: '8433003469', firstName: 'Purvi Ji'}, 
      {phone: '6386039601', firstName: 'Shailja Ji'},
      {phone: '7458968889', firstName: 'Shivkant Ji'},
      {phone: '8924024755', firstName: 'Shyam Ji'},
      {phone: '9451765673', firstName: 'Rohit Ji'},
      {phone: '9792862723', firstName: 'Sumit Ji'}
    ];
    await Promise.all(
      users.map(async (user) => {
        try {
          const sendWhatsappCommunicationRequestRequest = new SendWhatsappCommunicationRequest(
            WhatsappCommunicationType.PERSONAL,
            `+91${user.phone}`,
            await whatsappMessages.personalTraining745(user));

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