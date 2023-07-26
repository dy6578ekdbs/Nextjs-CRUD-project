import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';

export default async function Write() {
  let session = await getServerSession(authOptions);
  if (!session) {
    // 만약 세션이 없다면 (로그인하지 않았다면)
    console.log('로그인 필요');

    return <div>로그인해야 글을 쓸 수 있습니다.</div>;
  }
  return (
    <div className="p-20">
      <h4>글작성</h4>

      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글 제목" />
        <input name="content" placeholder="내용" />
        <button type="submit" className="button-style">
          버튼
        </button>
      </form>
    </div>
  );
}
