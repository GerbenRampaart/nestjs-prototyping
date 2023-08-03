import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PostService } from './posts/posts.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly p: PostService) {}

  @Get('error')
  async throwError(): Promise<any> {
    throw new Error();
  }

  @Get('posts')
  async getPosts(): Promise<any> {
    const dt = new Date();
    await this.p.createPost({
      data: {
        title: `title ${dt}`,
        content: `content ${dt}`,
        createdAt: dt.toISOString(),
        published: false,
        comments: {
          createMany: {
            data: [
              {
                body: `body 1 ${dt}`
              },
              {
                body: `body 1 ${dt}`
              }
            ]
          }
        }
      }
    });

    return await this.p.getPosts({});
  }
}
