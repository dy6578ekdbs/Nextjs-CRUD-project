'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DarkMode({ cookie }) {
  const [mode, setMode] = useState(cookie?.value);

  const router = useRouter();

  useEffect(() => {
    let cookie = ('; ' + document.cookie).split(`; mode=`).pop().split(';')[0];
    if (cookie == '') {
      document.cookie = 'mode=light; max-age=' + 3600 * 24 * 400;
    }

    setMode(cookie);
  }, []);

  const handleChangeDarkMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');

    let cookie = ('; ' + document.cookie).split(`; mode=`).pop().split(';')[0];
    if (cookie == 'light') {
      document.cookie = 'mode=dark; max-age=' + 3600 * 24 * 400;
    } else {
      document.cookie = 'mode=light; max-age=' + 3600 * 24 * 400;
    }

    router.refresh();
  };

  return (
    <span>
      {mode === 'dark' ? (
        <span onClick={handleChangeDarkMode}>☀️</span>
      ) : (
        <span onClick={handleChangeDarkMode}>🌙</span>
      )}
    </span>
  );
}
