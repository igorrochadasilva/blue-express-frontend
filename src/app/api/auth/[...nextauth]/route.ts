import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type TUser = {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  role: number;
  accessToken: string;
};

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
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BLUE_EXPRESS_API}/auth/login`,
            {
              email,
              password,
            }
          );

          const user = {
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            department: res.data.user.department,
            position: res.data.user.position,
            role: res.data.user.role,
            accessToken: res.data.token.accessToken,
          };

          return user;
        } catch (error: any) {
          if (error?.response?.status === 401) {
            const { data } = error.response;
            throw new Error(data.message);
          } else {
            throw new Error('An error occurred. Please try again later.');
          }
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
      const userData: TUser | any = user;

      if (user) {
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
