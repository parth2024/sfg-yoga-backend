import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './users.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UsersSchema,
      collection: 'users',
    },
  ])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
