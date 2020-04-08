import { Injectable } from '@nestjs/common';
import {
  Rule,
  RuleResponse,
  RuleEngineResponse,
} from 'src/rule-engine/interfaces/rule-engine.interface';

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

  private applyRule<T>(rule: Rule<T>, value: T): RuleResponse {
    console.log(`Executiong rule ${rule.name}`);

    const result: RuleResponse = {
      name: rule.name,
      result: 'OK',
      error: undefined,
      children: []
    };

    try {
      const expression = rule.expression(value);

      if (typeof rule.children !== 'undefined') {
        const childrenExecution = rule.children.map((r) => this.applyRule(r, expression));
        const some = childrenExecution.filter((r) => typeof r.error !== 'undefined');

        if (some.length > 0) {
          result.result = 'Fail';

          result.error = {
            message: 'one or more children rule fail',
            level: rule.level,
            actual: some.length,
            expected: 0,
            stack: JSON.stringify(some, null, 2),
          };
        }

        result.children = childrenExecution;
      }
    } catch(ex) {
      if (ex.name === 'AssertionError') {
        const error = {
          message: ex.message,
          stack: ex.stack,
          actual: ex.actual,
          expected: ex.expected,
          level: rule.level,
        };

        result.error = error;
        result.result = 'Fail';

        if (typeof rule.children !== 'undefined') {
          result.children = this.failResponses(rule.children);
        }
      } else {
        throw ex;
      }
    }

    return result;
  }

  private failResponses(children: Rule<any>[]): RuleResponse[] {
    return children.map((r) => ({
      name: r.name,
      displayName: r.displayName,
      result: 'Fail',
      error: {
        message: 'non executed',
        level: r.level,
        actual: undefined,
        expected: undefined,
        stack: '',
      },
      children: typeof r.children === 'undefined' ? [] : this.failResponses(r.children)
    }));
  }
}
