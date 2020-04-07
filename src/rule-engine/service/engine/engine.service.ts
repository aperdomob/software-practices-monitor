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

  private applyRule<T>(rule: Rule<T>, value: T): RuleResponse {
    console.log(`Executiong rule ${rule.name}`);

    const result: RuleResponse = {
      name: rule.name,
      result: 'OK',
      error: this.runExpression(rule, value),
      children: []
    };

    if (typeof result.error === 'object') {
      result.result = 'Fail';
    }

    if (typeof rule.children !== 'undefined') {
      if (result.result === 'Fail') {
        result.children = this.failResponses(rule.children);
      } else {
        const childrenExecution = rule.children.map((r) => this.applyRule(r, value));
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

  private runExpression<T>(rule: Rule<T>, value: T): ErrorResponse {
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
