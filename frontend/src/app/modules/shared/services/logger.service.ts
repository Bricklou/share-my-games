import { Injectable } from '@angular/core';

export enum LogLevel {
  all = 0,
  debug = 1,
  info = 2,
  warn = 3,
  error = 4,
  fatal = 5,
  off = 6,
}

@Injectable({ providedIn: 'root' })
export class LoggerService {
  public logLevel: LogLevel = LogLevel.all;
  public logPrefix = '[LoggerService]';
  public logWithDate = true;

  public debug<P extends unknown[]>(msg: string, ...optionalParams: P): void {
    this.writeToLog(msg, LogLevel.debug, optionalParams);
  }

  public info<P extends unknown[]>(msg: string, ...optionalParams: P): void {
    this.writeToLog(msg, LogLevel.info, optionalParams);
  }

  public warn<P extends unknown[]>(msg: string, ...optionalParams: P): void {
    this.writeToLog(msg, LogLevel.warn, optionalParams);
  }

  public error<P extends unknown[]>(msg: string, ...optionalParams: P): void {
    this.writeToLog(msg, LogLevel.error, optionalParams);
  }

  public fatal<P extends unknown[]>(msg: string, ...optionalParams: P): void {
    this.writeToLog(msg, LogLevel.fatal, optionalParams);
  }

  public log<P extends unknown[]>(msg: string, ...optionalParams: P): void {
    this.writeToLog(msg, LogLevel.all, optionalParams);
  }

  private writeToLog<P extends unknown[]>(
    msg: string,
    level: LogLevel,
    params: P
  ): void {
    if (this.shouldLog(level)) {
      let message = '';
      const args = [];

      message += `%c${this.logPrefix} `;
      args.push('color: DodgerBlue; font-weight: bold');

      // Build log string
      if (this.logWithDate) {
        message += `%c${new Date().toISOString()} `;
        args.push('color: gray');
      }

      const color = this.formatColor(level);
      message += ` %c${LogLevel[level].toUpperCase()} `;
      args.push(`color: ${color}`);

      // Log the value
      const logMethod = this.logMethod(level);
      logMethod(`${message} %c${msg}`, ...args, `color: ${color}`, ...params);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return (
      // Is the level we are trying to log greater than the set level?
      (level >= this.logLevel && level !== LogLevel.off) ||
      // Or, is the log level set to "all"?
      this.logLevel === LogLevel.all
    );
  }

  private logMethod(level: LogLevel): (...args: unknown[]) => void {
    let method = console.log;
    switch (level) {
      case LogLevel.debug:
        method = console.debug;
        break;
      case LogLevel.info:
        method = console.info;
        break;
      case LogLevel.warn:
        method = console.warn;
        break;
      case LogLevel.error:
      case LogLevel.fatal:
        method = console.error;
        break;
      default:
        return console.log;
    }

    return method;
  }

  private formatColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.debug:
        return 'gray';
      case LogLevel.info:
        return 'DodgerBlue';
      case LogLevel.warn:
        return 'orange';
      case LogLevel.error:
        return 'red';
      case LogLevel.fatal:
        return 'magenta';
      default:
        return 'inherit';
    }
  }

  private formatParams(params: unknown[]): string {
    let result = params.join(',');

    // Is there at least one object in the array?
    if (params.some((p) => typeof p === 'object')) {
      result = '';

      // Build comma-delimited string
      for (const item of params) {
        result += JSON.stringify(item) + ',';
      }
    }

    return result;
  }
}
