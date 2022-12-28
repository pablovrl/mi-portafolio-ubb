import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import data from '../src/utils/data.json';

async function main() {
	data.forEach(async element => {
		await prisma.technology.create({ data: { name: element.name, icon: element.icon } });
	});

	const password = await bcrypt.hash('adminubb', 10);
	const user = {
		email: 'admin@ubiobio.cl',
		password,
		role: 'ADMIN' as Role,
	};

	await prisma.user.create({
		data: user
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});