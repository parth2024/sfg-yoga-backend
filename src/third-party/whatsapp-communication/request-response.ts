import { ConfigService } from '@nestjs/config';
import { BaseRequestInterface } from 'src/common/base-request-interface';
import { WhatsappCommunicationType } from 'src/common/enum';

export class SendWhatsappCommunicationRequest implements BaseRequestInterface {
  url: string;
  body: {
    type: WhatsappCommunicationType
    SenderID: string,
    message: {
        text: string,
    }
  };
  headers: any;

  constructor(type: WhatsappCommunicationType, SenderID: string, text: string) {
    const configService = new ConfigService();
    this.url = `${configService.get<string>('WHATSAPP_COMM_API_BASE_URL')}/sendMessage`;
    this.body = {
      type,
      SenderID,
      message: {
        text,
    }
    };
    this.headers = {};
  }
}
