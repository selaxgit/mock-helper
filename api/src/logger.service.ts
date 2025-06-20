import { Injectable } from '@nestjs/common';
import { LoggerService as NestLoggerService } from '@nestjs/common';

type LogMessageType = 'LOG' | 'ERROR' | 'WARN' | 'DEBUG' | 'VERBOSE';

interface ILogMessage {
  type: LogMessageType;
  message: string;
  trace?: string;
}

@Injectable()
export class LoggerService implements NestLoggerService {
  public log(message: string) {
    this.output('LOG', message);
  }
  public error(message: string, trace: string) {
    this.output('ERROR', message, trace);
  }
  public warn(message: string) {
    this.output('WARN', message);
  }
  public debug(message: string) {
    this.output('DEBUG', message);
  }
  public verbose(message: string) {
    this.output('VERBOSE', message);
  }

  private output(type: LogMessageType, message: string, trace?: string) {
    const log: ILogMessage = {
      type,
      message,
    };

    if (trace) {
      log.trace = trace;
    }

    console.log(JSON.stringify(log));
  }
}
