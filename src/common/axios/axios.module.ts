import { AxiosService } from './service/axios.service';
import { Module } from '@nestjs/common';
// import { ApiLogModule } from 'src/api-log/api-log.module';

@Module({
  imports: [],
  providers: [
    {
      provide: 'AxiosService',
      useClass: AxiosService,
    },
  ],
  exports: [
    {
      provide: 'AxiosService',
      useClass: AxiosService,
    },
  ],
})
export class AxiosModule {}
