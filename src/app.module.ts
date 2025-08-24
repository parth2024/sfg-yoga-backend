import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MySQLConfigModule } from './db-config/mysql.config.module';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongoConfigModule } from './db-config/mongo.config.module';
import { UsersModule } from './users/users.module';
import { BatchesModule } from './batches/batches.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    CronModule,
    MongoConfigModule,
    UsersModule,
    // MySQLConfigModule,
    UsersModule,
    BatchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
