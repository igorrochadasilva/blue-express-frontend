import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '../../../../actions/api';
import {
  PostSignInResponse,
  SignInDTO,
  UserSession,
} from '../../../../types/auth/sign';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as SignInDTO;

        try {
          const res: PostSignInResponse = await api({
            endpoint: `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/auth/login`,
            options: {
              method: 'POST',
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            },
            ignoreCache: true,
          });

          const user = {
            id: String(res.data.user.id),
            name: res.data.user.name,
            email: res.data.user.email,
            department: res.data.user.department,
            position: res.data.user.position,
            role: res.data.user.role,
            accessToken: res.data.token,
          };

          return user;
        } catch (error: unknown) {
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userData = user as unknown as UserSession;

        token.id = userData.id;
        token.name = userData.name;
        token.email = userData.email;
        token.department = userData.department;
        token.position = userData.position;
        token.role = userData.role;
        token.accessToken = userData.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        department: token.department,
        position: token.position,
        role: token.role,
        accessToken: token.accessToken,
      } as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
