import { Injectable } from '@nestjs/common';
import {
  Rule,
  RuleResponse,
  ErrorResponse,
  RuleEngineResponse,
} from 'src/rule-engine/interfaces/rule-engine.interface';
import { AssertionError } from 'chai';

@Injectable()
export class EngineService {
  public run<T>(rules: Rule<T>[], value: T): RuleEngineResponse {
    const resultRules = rules.map(rule => this.applyRule<T>(rule, value));

    const total = resultRules.length;
    const failRules = resultRules.filter(current => current.result === 'Fail');
    const fail = failRules.length;
    const ok = total - fail;

    return {
      rules: resultRules,
      metrics: {
        total,
        ok,
        fail,
      },
    };
  }

  private applyRule<T>(rule, value: T): RuleResponse {
    console.log(`Executiong rule ${rule.name}`);

    const result: RuleResponse = {
      name: rule.name,
      result: 'OK',
      error: this.runExpression(rule, value),
    };

    if (typeof result.error === 'object') {
      result.result = 'Fail';
    }

    return result;
  }

  private runExpression<T>(rule, value: T): ErrorResponse {
    try {
      rule.expression(value);
    } catch (ex) {
      if (ex.name === 'AssertionError') {
        return {
          message: ex.message,
          stack: ex.stack,
          actual: ex.actual,
          expected: ex.expected,
          level: rule.level,
        };
      }

      throw ex;
    }

    return undefined;
  }
}
