import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '../prisma-schema/_generated/client';
import {  } from "@prisma/client";
@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }


  async createPost(args: Prisma.PostCreateArgs) {
    return this.prisma.post.create(args);
  }

  async getPosts(args: Prisma.PostFindManyArgs): Promise<Post[]> {
    return this.prisma.post.findMany(args);
  }
}
