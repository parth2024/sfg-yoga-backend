import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly usersModel: Model<UsersDocument>,
    ) { }
    async findAll() {
        return await this.usersModel.find().exec();
    }
}
