import { Inject, Injectable, Logger  } from '@nestjs/common';
import { PARAMS_PROVIDER_TOKEN, Params, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppLoggerService extends PinoLogger {
  constructor(
    @Inject(PARAMS_PROVIDER_TOKEN) private readonly params: Params
  ) {
    super(params);
  }

  public level(lvl: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace') {
    PinoLogger.root.level = lvl;
  }
}
