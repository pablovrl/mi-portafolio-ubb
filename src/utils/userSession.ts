import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export async function getUserSession(req: NextApiRequest, res: NextApiResponse ) {
	const session = await unstable_getServerSession(req, res, authOptions);
	return session;
}

export async function getUserSessionWithContext(context: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions);
	return session;
}
