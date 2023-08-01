import { Injectable, Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';
import { LoggerModule } from 'nestjs-pino';

@Injectable()
class ConfigService {
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
