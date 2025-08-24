import { Controller, Get } from '@nestjs/common';
import { BatchesService } from './batches.service';

@Controller('api/v1')
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  @Get('batches')
  findAll() {
    return this.batchesService.findAll();
  }
}
