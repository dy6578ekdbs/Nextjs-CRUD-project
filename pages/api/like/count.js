import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(request, response) {
  if (request.method === 'GET') {
    const client = await connectDB;
    const db = client.db('forum');

    try {
      let result = await db
        .collection('like')
        .count({ postId: new ObjectId(request.query.id) });

      console.log('>>>', result);

      return response.status(200).json(result);
    } catch (err) {
      return response.status(500).json('DB 에러');
    }
  }
}
