'use client';

import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session, status, update } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <p>Signed in as {session.user.name}</p>
      </>
    );
  }

  return <p>로그인하지 않음</p>;
}
