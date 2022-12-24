import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/db';
import bcrypt from 'bcryptjs';
import { transporter } from '../../../utils/nodemailer';
import { env } from 'process';

const apiRoute = nextConnect({
	onError(error, req, res: NextApiResponse) {
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	}
});

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { email } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			email: email
		}
	});
   
	if (!user) return res.status(404).json({ error: 'User not found' });

	const token = await bcrypt.hash(email, 10);
	// send token to user email
	await prisma.user.update({
		where: {
			email: email
		},
		data: {
			resetPasswordToken: token,
		}
	});

	await transporter.sendMail({
		from: 'pablo.villarroel1901@alumnos.ubiobio.cl',
		to: email,
		subject: 'Reset Password',
		html: `
			<h1>Reset Password</h1>
			<p>Click the link below to reset your password</p>
			<a href="${env.NEXT_PUBLIC_DEPLOY}/reset-password/${token}">Reset Password</a>
			`
	});

	return res.status(200).json({ message: 'Email sent' });


});

export default apiRoute;