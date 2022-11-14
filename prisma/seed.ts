import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import data from '../src/utils/data.json';

async function main() {
	data.forEach(async element => {
		await prisma.technology.create({ data: { name: element.name, icon: element.icon } });
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