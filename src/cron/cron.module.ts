import { Module } from '@nestjs/common';
import { AxiosModule } from 'src/common/axios/axios.module';
import { CronService } from './cron.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.schema';

@Module({
  imports: [
    AxiosModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: 'users',
      },
    ])
  ],
  controllers: [],
  providers: [
    {
      provide: 'CronService',
      useClass: CronService,
    },
  ],
})
export class CronModule { }
