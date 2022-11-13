import type { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export async function getUserSession(context: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions);
	return session;
}
