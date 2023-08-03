import { Injectable, Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';
import { LoggerModule } from 'nestjs-pino';
import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';
import { ReqId } from 'pino-http';
import { v4 } from 'uuid';

@Injectable()
class ConfigService {
  // PINO_LOG_LEVEL
  // https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/
  public readonly level = 'debug';
}

@Module({
  providers: [ConfigService],
  exports: [ConfigService]
})
class ConfigModule { }


@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            level: config.level,
            name: 'app:version',
            transport: process.env.NODE_ENV !== 'production' ? { 
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: true
              }
            } : undefined,
            genReqId: (req: IncomingMessage, res: ServerResponse): ReqId => {
              const cId = 'x-correlation-id';
              const rId = 'x-request-id';

              const corId = req.headers[cId]?.toString() ?? v4();
              const reqId = req.headers[rId]?.toString() ?? v4();

              req.headers[cId] = corId;
              req.headers[rId] = reqId;

              res.setHeader(cId, corId);
              res.setHeader(rId, reqId);

              return reqId;
            }
          },
        };
      }
    })
  ],
  providers: [
    AppLoggerService
  ],
  exports: [
    AppLoggerService
  ]
})
export class AppLoggerModule { }
