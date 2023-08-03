import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '../prisma-schema/_generated/client';
import {  } from "@prisma/client";
import { AppLoggerService } from '../logger/app-logger.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private readonly l: AppLoggerService) { }


  async createPost(args: Prisma.PostCreateArgs) {
    this.l.info('inserting record');
    this.l.warn('inserting record2');

    return this.prisma.post.create(args);
  }

  async getPosts(args: Prisma.PostFindManyArgs): Promise<Post[]> {
    return this.prisma.post.findMany(args);
  }
}
