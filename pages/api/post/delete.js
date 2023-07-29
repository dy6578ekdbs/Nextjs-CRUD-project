import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';

export default async function handler(request, response) {
  if (request.method == 'DELETE') {
    // 사용자 정보
    let session = await getServerSession(request, response, authOptions);

    // 게시글 찾기
    let db = (await connectDB).db('forum');
    let request_post = await db
      .collection('post')
      .findOne({ _id: new ObjectId(request.body) });

    if (session) {
      if (session.user.email == request_post.author) {
        try {
          let result = await db
            .collection('post')
            .deleteOne({ _id: new ObjectId(request.body) });

          return response.status(200).json('삭제완료');
        } catch (err) {
          response.status(500);
        }
      } else {
        return response.status(400).json('자신의 글만 삭제할 수 있습니다.');
      }
    } else {
      return response.status(400).json('로그인이 필요합니다.');
    }
  }
}
