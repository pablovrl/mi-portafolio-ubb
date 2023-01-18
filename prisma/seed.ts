import { PrismaClient, Role, User } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import { env } from 'process';
import data from '../src/utils/data.json';

async function main() {
	data.forEach(async element => {
		await prisma.technology.create({ data: { name: element.name, icon: element.icon } });
	});

	const adminUser: User = {
		id: 1,
		name: null,
		about: null,
		lastName: null,
		email: env.ADMIN_EMAIL || 'admin@ubiobio.cl',
		password: await bcrypt.hash(env.ADMIN_PASSWORD || 'adminubb', 10),
		role: 'ADMIN' as Role,
		career: null,
		portfolio: false,
		image: null,
		resetPasswordToken: null
	};

	const testUser: User = {
		id: 2,
		name: 'Test',
		about: null,
		lastName: 'User',
		email: env.TEST_EMAIL || 'test@ubiobio.cl',
		password: await bcrypt.hash(env.TEST_PASSWORD || 'testubb123', 10),
		role: 'USER' as Role,
		career: 'IECI',
		portfolio: false,
		image: null,
		resetPasswordToken: null
	};

	await prisma.user.createMany({
		data: [adminUser, testUser],
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