import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

export async function generateSchema(): Promise<void> {
    const definitionsFactory = new GraphQLDefinitionsFactory();
    await definitionsFactory.generate({
      typePaths: ['./src/**/*.graphql'],
      path: join(process.cwd(), 'src/graphql.ts'),
      outputAs: 'class',
    });
}

//generateSchema();