import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CronServiceInterface } from './cron.interface';
import { AxiosServiceInterface } from 'src/common/axios/interface/axios.service.interface';
import { LessThan, MoreThan } from 'typeorm';
import { SendWhatsappCommunicationRequest } from 'src/third-party/whatsapp-communication/request-response';
import { WhatsappCommunicationType } from 'src/common/enum';

@Injectable()
export class CronService implements CronServiceInterface {
  constructor(
    @Inject('AxiosService')
    private readonly axiosService: AxiosServiceInterface,
  ) {}
  // @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_9)
  @Cron("0 20 22 * * 1-6")
  async kycStatus() {
    console.log('Send communication Cron');
    try {
      const users = [{phone: '+919451765673', firstName: 'Rohit Ji'}, {phone: '+919792862723', firstName: 'Sumit Ji'}];
      // const users = [
      //   {phone: '+916392075010', firstName: 'Avaneesh Ji'}, 
      //   {phone: '+919670238902', firstName: 'Shivam Ji'}, 
      //   {phone: '+918423032276', firstName: 'Gyan Ji'}, 
      //   {phone: '+918423090347', firstName: 'Harsha Ji'},
      //   {phone: '+919205365997', firstName: 'Hemang Ji'}, 
      //   {phone: '+919555184566', firstName: 'Narendra Ji'}, 
      //   {phone: '+918433003469', firstName: 'Purvi Ji'}, 
      //   {phone: '+916386039601', firstName: 'Shailja Ji'},
      //   {phone: '+917458968889', firstName: 'Shivkant Ji'},
      //   {phone: '+918924024755', firstName: 'Shyam Ji'},
      //   {phone: '+9451765673', firstName: 'Rohit Ji'},
      //   {phone: '+919792862723', firstName: 'Sumit Ji'}
      // ];
      for (let i = 0; i < users.length; i++) {
        console.log('Send communication Cron', users[i].phone);
        const user = users[i];
        try {
          const sendWhatsappCommunicationRequestRequest = new SendWhatsappCommunicationRequest(
            WhatsappCommunicationType.PERSONAL,
            user.phone,
            `🌸 Namaste ${user.firstName} 🙏

Here are the details for your upcoming yoga session:

🧘 SFG Yoga Personal Training
🕖 Time: 7:45 AM - 8:30 AM
📹 Video Call Link: https://meet.google.com/hac-jcio-awv

⏳ Only 15 minutes left! Get ready to join your session.

🌐 Learn more about us: www.sfg-yoga.com

🌟 Prepare to rejuvenate your mind and body. See you soon! 😊`
          );
          const res = await this.axiosService.post(
            sendWhatsappCommunicationRequestRequest.url,
            sendWhatsappCommunicationRequestRequest.headers,
            sendWhatsappCommunicationRequestRequest.body,
            'internal-send-comm',
            user.phone,
          )
          console.log('Send communication Cron Success', user.phone, ': ', res);
        } catch (e) {
          console.log('Send communication Cron Error', user.phone);
          console.log(e);
        }
      }
    } catch (e) {
      console.log('Cron Error');
      console.log(e);
    }
  }
}

// 🙏 Namaste, Rohit!
// 🔑 Your OTP for signing into SFG Yoga is: 1234.

// 🧘 Learn yoga from certified Yoga Acharyas and embark on your wellness journey with us!
// 🌐 Visit our website: www.sfg-yoga.com

// Stay calm and carry on! 🙌