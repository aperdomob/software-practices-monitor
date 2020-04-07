export enum Level {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export interface Rule<T> {
  name: string;
  displayName?: string;
  level: Level;
  expression: (value: T) => void;
  errorMessagePattern?: string;
  children?: Rule<any>[];
}

export interface ErrorResponse {
  message: string;
  level: Level;
  actual: any;
  expected: any;
  stack: string;
}

export interface RuleResponse {
  name: string;
  displayName?: string;
  result: string;
  error?: ErrorResponse;
  children: RuleResponse[]
}

export interface RuleEngineResponse {
  rules: RuleResponse[];
  metrics: {
    total: number;
    ok: number;
    fail: number;
  };
}
