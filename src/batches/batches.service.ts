import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Batch, BatchDocument } from './batches.schema';
import { Model } from 'mongoose';

@Injectable()
export class BatchesService {
    constructor(
        @InjectModel(Batch.name)
        private readonly batchesModel: Model<BatchDocument>,
    ) { }
    async findAll() {
        return await this.batchesModel.find().exec();
    }
}
