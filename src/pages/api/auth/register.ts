import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../utils/db';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if(req.method === 'POST') {
		const { email, password } = req.body;
		if(!email || !password) {
			return res.status(400).json({message: 'Email and password are required'}); 
		}

		const user = await prisma.user.findMany({ where: { email: email } });
		if (user.length > 0) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = await prisma.user.create({
			data: {
				email: email,
				password: hashedPassword,
			},
		});

		return res.status(201).json(newUser);
	}

	return res.status(405).send('Method not allowed');
}
