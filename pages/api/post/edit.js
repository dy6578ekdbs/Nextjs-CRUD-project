import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const client = await connectDB;
    const db = client.db('forum');

    if (request.body.title === '') {
      return response.status(400).json('제목 누락');
    }

    try {
      let update = { title: request.body.title, content: request.body.content };

      let result = await db
        .collection('post')
        .updateOne({ _id: new ObjectId(request.body._id) }, { $set: update });

      return response.redirect(302, '/list');
    } catch (err) {
      return response.status(500).json('DB 에러');
    }
  }
}
