import { connectDB } from '@/util/database';

export default async function List() {
  const db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray();

  console.log(result);

  return (
    <div className="list-bg">
      {result.map((post) => (
        <div className="list-item">
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
