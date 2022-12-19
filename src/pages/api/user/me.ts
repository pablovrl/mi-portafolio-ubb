import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserSession } from '../../../utils/userSession';
import { prisma } from '../../../utils/db';

const apiRoute = nextConnect({
	onError(error, req, res: NextApiResponse) {
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	}
});

apiRoute.put(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getUserSession(req, res);
	if (!session?.user?.email) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const user = await prisma.user.update({
		where: { email: session.user.email },
		data: {
			...req.body
		}
	});

	return res.status(200).json({ ...user });

});

// route to get the current user
apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getUserSession(req, res);
	if (!session?.user?.email) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const user = await prisma.user.findFirst({ where: { email: session.user.email } });
	return res.json({ ...user });
});

export default apiRoute;