import fs from 'fs';
import path from 'path';

import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
  RequestGenericInterface
} from 'fastify';

import { client } from './graphql/client';
import {
  PostDocument,
  PostQuery,
  PostQueryVariables,
} from './graphql/generated';
import { generateOgImage } from './lib/canvas';

const cwd = process.cwd();

interface RequestGeneric extends RequestGenericInterface {
  Params: {
    slug: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function (instance: FastifyInstance, _opts: FastifyServerOptions, done: any) {
  instance.get('/', async (_req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send('ok');
  });

  instance.get('/check', async (_req: FastifyRequest<RequestGeneric>, reply: FastifyReply) => {
    try {
      // 疎通をチェックする
      const slug = 'first_post';
      const { data } = await client.query<PostQuery, PostQueryVariables>({
        query: PostDocument,
        variables: {slug: slug }
      });

      const title = data.postsCollection?.items[0]?.title as string;

      reply.send({ title: title });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.message);

      reply.send({ error: e.message });
    }
  });

  instance.get('/posts/:slug/ogImage', async (req: FastifyRequest<RequestGeneric>, reply: FastifyReply) => {
    const slug = req.params.slug;

    reply.header('Content-Type', 'image/png');

    try {
      const { data } = await client.query<PostQuery, PostQueryVariables>({
        query: PostDocument,
        variables: {slug: slug }
      });

      const title = data.postsCollection?.items[0]?.title as string;
      
      const img = await generateOgImage(title);

      reply.send(img);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.message);
      const file = path.resolve(cwd, 'src/canvas/og_image_default.png');
      const siteImg = fs.readFileSync(file);

      reply.send(siteImg);
    }
  });

  done();
}