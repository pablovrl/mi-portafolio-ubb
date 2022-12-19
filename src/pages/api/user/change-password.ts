import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserSession } from '../../../utils/userSession';
import { prisma } from '../../../utils/db';
import bcrypt from 'bcryptjs';

const apiRoute = nextConnect({
	onError(error, req, res: NextApiResponse) {
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	}
});

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { password, newPassword } = req.body;

	const session = await getUserSession(req, res);
	if (!session?.user?.email) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const user = await prisma.user.findFirst({ where: { email: session.user.email } });
	if(!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const isPasswordValid = await bcrypt.compare(password, user.password || '');
	if(!isPasswordValid) {
		return res.status(400).json({ error: 'Invalid password' });
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10);
	await prisma.user.update({
		where: { id: user.id },
		data: { password: hashedPassword },
	});

	return res.status(200).json({ message: 'Password changed successfully' });
  
});

export default apiRoute;