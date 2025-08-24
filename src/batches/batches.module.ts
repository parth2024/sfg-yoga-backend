import { Module } from '@nestjs/common';
import { BatchesController } from './batches.controller';
import { BatchesService } from './batches.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Batch, BatchSchema } from './batches.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Batch.name,
      schema: BatchSchema,
      collection: 'batches',
    },
  ])],
  controllers: [BatchesController],
  providers: [BatchesService]
})
export class BatchesModule {}
