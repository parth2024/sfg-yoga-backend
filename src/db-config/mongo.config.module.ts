import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseError } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get('MONGO_URI')}/${configService.get(
          'MONGO_DB',
        )}`,
        useNewUrlParser: true,
        // keepAlive: true,
        retryWrites: false,
        connectionErrorFactory: (error: MongooseError) => {
          console.log(`Mongo Connection Error\n${error.message}`);
          return error;
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoConfigModule {}
