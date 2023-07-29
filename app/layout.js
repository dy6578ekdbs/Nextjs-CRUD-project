import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import LoginBtn from './LoginBtn';
import LogOutBtn from './LogOutBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';

import { cookies } from 'next/headers';
import DarkMode from './DartkMode';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EFUB forum',
  description: 'EFUB 2학기 세미나 - Next.js 실습',
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);

  if (session) {
    console.log(session);
  }

  let cookie = cookies().get('mode');

  return (
    <html lang="en">
      <body
        className={
          cookie != undefined && cookie.value == 'dark' ? 'dark-mode' : ''
        }
      >
        <div className="navbar">
          <Link href="/" className="logo">
            EFUB Forum
          </Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
          <Link href="/register">Register</Link>
          {session ? (
            <span>
              {session.user.name} <LogOutBtn />
            </span>
          ) : (
            <LoginBtn />
          )}

          <DarkMode cookie={cookie} />
        </div>

        {children}
      </body>
    </html>
  );
}
