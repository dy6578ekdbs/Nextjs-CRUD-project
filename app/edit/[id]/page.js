import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Edit(props) {
  let postId = props.params.id;

  const db = (await connectDB).db('forum');

  let result = await db
    .collection('post')
    .findOne({ _id: new ObjectId(postId) });

  return (
    <div className="p-20">
      <h4>글 수정 페이지</h4>

      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result.title} />
        <input name="content" defaultValue={result.content} />
        <input value={result._id.toString()} name="_id" type="hidden" />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}
