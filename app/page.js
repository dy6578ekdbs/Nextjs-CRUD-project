import { connectDB } from '@/util/database';

export default async function Home() {
  // const client = await connectDB;
  // const db = client.db('forum');

  // // db 꺼내오기
  // let result = await db.collection('post').find().toArray(); // post 컬렉션의 모든 데이터(find) 가져와서 배열로 변환 (toArray)

  return <div>홈</div>;
}
