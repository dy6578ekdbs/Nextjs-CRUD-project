import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  /*
  console.log(request.nextUrl); //유저가 요청중인 URL 출력해줌
  console.log(request.cookies); //유저가 보낸 쿠키 출력해줌
  console.log(request.headers); //유저의 headers 정보 출력해줌

  NextResponse.next(); // 통과
  NextResponse.redirect(); // 다른페이지 이동
  NextResponse.rewrite(); // 다른페이지 이동
 */

  // 로그인 상태
  const session = await getToken({ req: request });
  console.log('user >>>>', session);

  // 로그인 안한 유저는 write 페이지 접근 불가
  if (request.nextUrl.pathname.startsWith('/write')) {
    if (session == null) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
  }

  // '/list'에 하위 path가 있어도 실행
  if (request.nextUrl.pathname.startsWith('/list')) {
    // 접속 시도한 시간
    console.log('시간 >>>>', new Date().toLocaleString());
    // 접속 시도한 url
    console.log('os >>>>>', request.headers.get('sec-ch-ua-platform')); // os 정보 출력

    return NextResponse.next(); // 통과
  }

  // register 페이지 방문 시 visited=true라는 쿠키 생성
  if (request.nextUrl.pathname.startsWith('/register')) {
    // 쿠키 유무 확인
    if (request.cookies.get('visited') == false) {
      const response = NextResponse.next();

      response.cookies.set({
        name: 'visited',
        value: 'true',
        maxAge: 3600, // 쿠키 유지 기간
        httpOnly: true, // js로 쿠키조작 방지 가능
      });
      return response; //쿠키생성
    }
  }

  return NextResponse.next(); // 통과
}
