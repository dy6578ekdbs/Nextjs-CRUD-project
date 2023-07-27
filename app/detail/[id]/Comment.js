'use client';
import { useEffect, useState } from 'react';

export default function Comment({ postId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // 댓글 추가
  const postCommnet = () => {
    let content = { comment: comment, parent: postId };

    fetch('/api/comment/new', {
      method: 'POST',
      body: JSON.stringify(content),
    }).then((res) => {
      setComment('');
      fetchComment();
    });
  };

  // 댓글 가져오기
  const fetchComment = () => {
    fetch(`/api/comment/list?id=${postId}`) // 쿼리 스트링
      .then((res) => res.json())
      .then((res) => setComments(res));
  };

  // 댓글 가져오기
  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div>
      <div>
        <hr />
        {comments.length > 0 ? (
          comments.map((c) => (
            <p key={c._id}>
              {c.name} : {c.content}
            </p>
          ))
        ) : (
          <p>댓글 없음</p>
        )}
      </div>
      <input
        placeholder="댓글을 작성해주세요"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="button-style" onClick={postCommnet}>
        전송
      </button>
    </div>
  );
}
