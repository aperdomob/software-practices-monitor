import { Injectable } from '@nestjs/common';
import { Rule, RuleResponse } from 'src/rule-engine/interfaces/rule-engine.interface';

@Injectable()
export class EngineService {
  public run<T>(rules: Rule[], value: T): RuleResponse[] {
    return [];
  }
}
