import { getServerSession } from 'next-auth';
import { UserSession } from '../../types/auth/sign';
import { nextAuthOptions } from '@/utils/authOptions';

export async function getUserSession(): Promise<UserSession> {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserSession;
  return user;
}
