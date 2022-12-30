import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { prisma } from '../../../utils/db';
import { unlinkSync } from 'fs';

const apiRoute = nextConnect({
	onError(error, req, res: NextApiResponse) {
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	}
});

apiRoute.delete(async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query;

	// disconect all users from this technology
	await prisma.technologiesOnUsers.deleteMany({
		where: {
			technologyId: Number(id)
		}
	});

	const technology = await prisma.technology.delete({
		where: {
			id: Number(id)
		}
	});

	if (!technology) return res.status(404).json({ error: 'Technology not found' });

	if (technology.icon.includes('uploads/images/')) {
		unlinkSync(`public${technology.icon}`);
	}
	res.status(200).json({ message: 'Technology deleted' });
});

export default apiRoute;