import { connectDB } from '@/util/database';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const client = await connectDB;
    const db = client.db('forum');

    if (request.body.title === '') {
      return response.status(400).json('제목 누락');
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
