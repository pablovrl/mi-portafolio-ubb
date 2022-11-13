import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../utils/db';
import { User } from '@prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if(req.method === 'POST') {
		const {name, lastName, career, email, password} = req.body as User;
  
		if(!name || !lastName || !career || !email || !password) {
			return res.status(400).json({message: 'Missing body params'});
		}

		const user = await prisma.user.findMany({ where: { email: email } });
		if (user.length > 0) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = await prisma.user.create({
			data: {
				name,
				lastName,
				career,
				email,
				password: hashedPassword,
				image: '/uploads/images/default.png'
			},
		});

		return res.status(201).json(newUser);
	}

	return res.status(405).send('Method not allowed');
}
