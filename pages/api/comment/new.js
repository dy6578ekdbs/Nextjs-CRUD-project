import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    let session = await getServerSession(request, response, authOptions);

    if (session) {
      request.body = JSON.parse(request.body);

      const client = await connectDB;
      const db = client.db('forum');

      let newCommnet = {
        content: request.body.comment,
        parent: new ObjectId(request.body.parent),
        author: session.user.email,
        name: session.user.name,
      };

      try {
        let result = await db.collection('comment').insertOne(newCommnet);

        return response.redirect(302, `/detail/${request.body.parent}`);
      } catch (err) {
        return response.status(500).json('DB 에러');
      }
    } else {
      console.log('회원가입 필요');
      return response.status(400).json('회원가입 필요');
    }
  }
}
