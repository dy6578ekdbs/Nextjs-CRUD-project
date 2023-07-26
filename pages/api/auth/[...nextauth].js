import { connectDB } from '@/util/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Github에서 발급받은 ID',
      clientSecret: 'Github에서 발급받은 Secret',
    }),

    // 아이디, 비번으로 로그인할 수 있게 함
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: 'credentials',
      credentials: {
        // 로그인 페이지에 들어갈 input 설정
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      // 2. 로그인요청시 실행되는코드
      // 직접 DB에서 아이디,비번 비교하고
      // 아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db('forum');
        let user = await db
          .collection('user_cred')
          .findOne({ email: credentials.email });

        // 해당 이메일이 존재하지 않음
        if (!user) {
          console.log('해당 이메일은 없음');
          return null;
        }

        // 비번 체크
        const pwcheck = await bcrypt.compare(
          credentials.password, // 유저가 제출한 비번
          user.password // db에 저장되어있는 비번
        );

        // 비번 틀림
        if (!pwcheck) {
          console.log('비번틀림');
          return null;
        }

        return user;
      },
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일 설정
  // session을 쓸지 jwt를 쓸지 결정하는 곳
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, //30일 (로그인 30일동안 유지)
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    // 유저에게 보내는 jwt에 어떤 내용을 담을 것인가
    // user변수는 DB의 유저 정보 담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },

    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    // 컴포넌트에서 세션을 조회 할 때 유저 정보 중 어떤 것을 출력할 것인가
    session: async ({ session, token }) => {
      session.user = token.user; // 토큰의 모든 데이터를 컴포넌트에게 전달하기
      return session;
    },
  },

  adapter: MongoDBAdapter(connectDB),
  secret: 'qwer1234',
};
export default NextAuth(authOptions);
