import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppLoggerModule } from '../logger/app-logger.module';

@Module({
    imports: [
        AppLoggerModule
    ],
    providers: [
        PrismaService
    ]
})
export class PrismaModule {
}
