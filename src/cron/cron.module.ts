import { Module } from '@nestjs/common';
import { AxiosModule } from 'src/common/axios/axios.module';
import { CronService } from './cron.service';

@Module({
  imports: [
    AxiosModule
  ],
  controllers: [],
  providers: [
    {
      provide: 'CronService',
      useClass: CronService,
    },
  ],
})
export class CronModule {}
