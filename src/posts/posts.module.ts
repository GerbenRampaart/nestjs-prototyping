import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { AppLoggerModule } from '../logger/app-logger.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [
        AppLoggerModule,
        PrismaModule
    ],
    providers: [
        PostService,
        PrismaService
    ],
    exports: [
        PostService
    ]
})
export class PostModule { }