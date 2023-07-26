import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

import { ObjectId } from 'mongodb';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    // 하나라도 빈칸이면 회원가입 거부
    if (
      !!request.body.email ||
      !!request.body.name ||
      !!request.body.password
    ) {
      console.log('모든 필드를 작성해주세요');
      response.writeHead(302, {
        Location: '/register',
      });
      return response.end();
    }

    let db = (await connectDB).db('forum');

    // 유저 찾기
    let isUser = await db
      .collection('user_cred')
      .findOne({ email: request.body.email });

    if (!isUser) {
      const hash = await bcrypt.hash(request.body.password, 10);
      request.body.password = hash;

      console.log('암호화결과:', hash);

      await db.collection('user_cred').insertOne(request.body);

      return response.redirect(302, '/');
    } else {
      console.log('이미 존재하는 이메일입니다.');
      // Redirect to the '/register' page with a custom header
      response.writeHead(302, {
        Location: '/register',
      });
      return response.end();
    }
  }
}
