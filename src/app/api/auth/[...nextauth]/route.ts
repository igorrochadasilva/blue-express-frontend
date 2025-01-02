import { nextAuthOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
