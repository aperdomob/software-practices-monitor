import { Module } from '@nestjs/common';
import { EngineService } from './service/engine/engine.service';

@Module({
  providers: [EngineService],
})
export class RuleEngineModule {}
