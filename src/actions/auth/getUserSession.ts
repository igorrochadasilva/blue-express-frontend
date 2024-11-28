import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { UserSession } from '../../types/auth/sign';

export async function getUserSession(): Promise<UserSession> {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as UserSession;
  return user;
}
