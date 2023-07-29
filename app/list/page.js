import { connectDB } from '@/util/database';
import ListItem from './ListItem';

export const dynamic = 'force-dynamic';

export default async function List() {
  const db = (await connectDB).db('forum');
  let result = await db.collection('post').find().toArray();

  /*
  에러 해결 >> id.toString()
  Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.
  */
  // id 문자열 변환
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
