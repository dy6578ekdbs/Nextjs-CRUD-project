import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Detail(props) {
  let postId = props.params.id;

  const db = (await connectDB).db('forum');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(postId) });

  console.log(postId);

  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  );
}
