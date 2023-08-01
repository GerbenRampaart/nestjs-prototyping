import { Injectable, OnModuleDestroy, OnModuleInit, Scope } from '@nestjs/common';
import { Prisma, PrismaClient } from '../prisma-schema/_generated/client/index';
import { AppLoggerService } from '../logger/app-logger.service';

@Injectable({
    scope: Scope.DEFAULT // singleton
})
export class PrismaService
    // https://github.com/prisma/prisma/issues/4746
    extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
    implements OnModuleInit, OnModuleDestroy {

    constructor(
        private readonly l: AppLoggerService
    ) {
        super({
            log: [
                {
                    level: 'error',
                    emit: 'event'
                },
                {
                    level: 'info',
                    emit: 'event'
                },
                {
                    level: 'query',
                    emit: 'event'
                },
                {
                    level: 'warn',
                    emit: 'event'
                }
            ],
            //errorFormat: isDebug
        });

        this.$on('error', (evt: Prisma.LogEvent) => {
            this.l.error(evt);
        });

        this.$on('info', (evt: Prisma.LogEvent) => {
            this.l.info(evt);
        });

        this.$on('query', (evt: Prisma.QueryEvent) => {
            this.l.info(evt);
        });

        this.$on('warn', (evt: Prisma.LogEvent) => {
            this.l.info(evt);
        });
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async onModuleInit() {
        await this.$connect();
    }
}
