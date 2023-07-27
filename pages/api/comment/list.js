import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(request, response) {
  if (request.method === 'GET') {
    const client = await connectDB;
    const db = client.db('forum');

    try {
      let result = await db
        .collection('comment')
        .find({ parent: new ObjectId(request.query.id) })
        .toArray();

      return response.status(200).json(result); // result를 어떻게 반환하는가?
    } catch (err) {
      return response.status(500).json('DB 에러');
    }
  }
}
