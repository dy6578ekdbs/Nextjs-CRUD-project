'use client';

import Link from 'next/link';

export default function ListItem({ result }) {
  const DeleteHandler = (e, id) => {
    // 삭제 성공하면 지우기
    fetch('/api/post/delete', { method: 'DELETE', body: id }).then(
      (response) => {
        console.log(response);

        if (response.status == 200) {
          e.target.parentElement.style.opacity = 0;
          setTimeout(() => {
            e.target.parentElement.style.display = 'none';
          }, 1000);
        }
      }
    );
  };

  return (
    <div className="list-bg">
      {result.map((post) => (
        <div className="list-item" key={post._id}>
          <Link prefetch={false} href={`/detail/${post._id}`}>
            <h4>{post.title}</h4>
          </Link>
          <Link href={`/edit/${post._id}`}>✏️</Link>
          <button
            onClick={(e) => {
              DeleteHandler(e, post._id);
            }}
          >
            🗑️
          </button>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
