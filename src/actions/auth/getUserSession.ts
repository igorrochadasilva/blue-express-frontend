import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';

export async function getUserSession() {
  const session = await getServerSession(nextAuthOptions);
  return session?.user;
}
