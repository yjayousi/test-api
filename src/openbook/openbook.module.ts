import { Module } from '@nestjs/common';
import { OpenBookClient } from './OpenBookClient';

@Module({
  providers: [OpenBookClient],
  exports: [OpenBookClient],
})
export class OpenbookModule {}
