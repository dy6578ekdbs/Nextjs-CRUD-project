'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h4>최상위 에러</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        다시시도
      </button>
    </div>
  );
}
