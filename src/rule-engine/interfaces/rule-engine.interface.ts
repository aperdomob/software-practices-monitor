export enum Level {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

export interface Rule {
  name: string;
  displayName?: string;
  level: Level
  expression: (value: any) => boolean;
  errorMessagePattern: string;
  children: []
}

export interface RuleResponse {
  name: string,
  displayName?: string,
  result: string,
  error?: {
    message: string,
    level: Level,
    actual: any,
    expected: any,
    stack: string
  }
}
