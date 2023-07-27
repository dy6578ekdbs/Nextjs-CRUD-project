'use client';
import { useEffect, useState } from 'react';

export default function Like({ postId }) {
  const [like, setLike] = useState(0);

  // 댓글 추가
  const addLike = () => {
    fetch(`/api/like/new?id=${postId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getLikeCount();
      });
  };

  const deleteLike = () => {
    fetch(`/api/like/delete?id=${postId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getLikeCount();
      });
  };

  const getLikeCount = () => {
    fetch(`/api/like/count?id=${postId}`)
      .then((res) => res.json())
      .then((res) => setLike(res));
  };

  useEffect(() => {
    getLikeCount();
  }, []);

  return (
    <div>
      <p>❤️ {like}개</p>
      <button onClick={addLike} className="button-style">
        좋아요
      </button>
      <button onClick={deleteLike} className="button-style">
        취소
      </button>
    </div>
  );
}
