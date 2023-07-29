import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';

export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);

  if (request.method === 'POST') {
    request.body = JSON.parse(request.body);

    const client = await connectDB;
    const db = client.db('forum');

    if (request.body.title === '') {
      return response.status(400).json('제목 누락');
    }

    // 글작성자 추가
    if (session) {
      request.body.author = session.user.email;
    }

    try {
      let result = await db.collection('post').insertOne(request.body); // _id는 자동생성
      return response.redirect(302, '/list');
    } catch (err) {
      return response.status(500).json('DB 에러');
    }

    /*
    result 는 이런게 나옴
    {
    acknowledged: true,
    insertedId: new ObjectId("64bb71069aa9aacf31d992c5")
    }
     */

    //return response.status(200).json('추가 완료');

    // { _id: time, title: title, content: content },
    // (err, result) => {
    //   console.log('완료');
    // }
  }
}
