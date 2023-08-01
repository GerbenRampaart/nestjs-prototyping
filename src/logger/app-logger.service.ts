import { Inject, Injectable, Logger  } from '@nestjs/common';
import { PARAMS_PROVIDER_TOKEN, Params, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppLoggerService extends PinoLogger {
  constructor(
    private readonly l: PinoLogger,
    @Inject(PARAMS_PROVIDER_TOKEN) private readonly params: Params
  ) {
    super(params);
  }

}
