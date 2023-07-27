import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';
import { ObjectId } from 'mongodb';

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);

  if (session) {
    try {
      const client = await connectDB;
      const db = client.db('forum');

      // 좋아요 눌렀는지 검사 필요
      let check = await db.collection('like').findOne({
        user: session.user.email,
        postId: new ObjectId(request.query.id),
      });

      if (!check) {
        // 좋아요 추가
        let result = await db.collection('like').insertOne({
          user: session.user.email,
          postId: new ObjectId(request.query.id),
        });

        return response.status(200).json('좋아요 성공');
      } else {
        console.log('이미 좋아요 누름');
        return response.status(400).json('이미 좋아요 누르셨습니다.');
      }
    } catch (err) {
      return response.status(500).json('DB 에러');
    }
  } else {
    return response.status(401).json('로그인을 해주세요');
  }
}
