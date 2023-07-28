import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Comment from './Comment';
import Like from './Like';
import { notFound } from 'next/navigation';

export default async function Detail(props) {
  let postId = props.params.id;

  const db = (await connectDB).db('forum');
  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(postId) });

  if (result === null) {
    return notFound();
    // return <h4>404 에러 - 해당 id에 맞는 페이지가 존재하지 않습니다.</h4>;
  } else {
    return (
      <div>
        <h4>상세페이지</h4>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
        {result.imgUrl ? <img src={result.imgUrl} /> : <></>}
        <Like postId={result._id} />
        <Comment postId={result._id} />
      </div>
    );
  }
}
