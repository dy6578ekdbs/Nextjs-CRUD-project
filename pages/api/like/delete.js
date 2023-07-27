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

      if (check) {
        // 좋아요 삭제
        let result = await db.collection('like').deleteOne({
          user: session.user.email,
          postId: new ObjectId(request.query.id),
        });

        return response.status(200).json('좋아요 삭제 성공');
      } else {
        return response.status(400).json('좋아요를 누르지 않음');
      }
    } catch (err) {
      return response.status(500).json('DB 에러');
    }
  } else {
    return response.status(401).json('로그인을 해주세요');
  }
}
