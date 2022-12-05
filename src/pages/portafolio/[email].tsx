import { Technology } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import StudentPortfolio from '../../components/StudentPortfolio';
import { UserPortfolio } from '../../types';
import { prisma } from '../../utils/db';
import { getUserSessionWithContext } from '../../utils/userSession';
import PortfolioForm from '../../components/PortfolioForm';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { email } = ctx.query;
	const user = await prisma.user.findFirst({
		where: { email: email as string },
		include: {
			technologies: { include: { technology: true } },
			projects: true,
			experiences: true,
			contacts: true,
		},
	});

	if (!user)
		return { notFound: true };

	const session = await getUserSessionWithContext(ctx);

	if (session?.user?.email !== user.email && user.portfolio === false)
		return { notFound: true };

	const technologies = await prisma.technology.findMany();
	return { props: { email, stringifiedUser: JSON.stringify(user), technologies } };
};

interface PortfolioProps {
	email: string;
	stringifiedUser: string;
	technologies: Technology[];
}

const Portfolio: NextPage<PortfolioProps> = ({ email, stringifiedUser, technologies }) => {
	const { data } = useSession();
	const user = JSON.parse(stringifiedUser) as UserPortfolio;

	// Eres creador y no tienes portafolio
	if (email === data?.user?.email && user.portfolio === false)
		return (
			<PortfolioForm user={user} technologies={technologies} />
		);

	// Eres el creador y tienes portafolio
	if (email === data?.user?.email)
		return <Layout>
			<StudentPortfolio user={user} />
		</Layout>;

	return (
		<Layout noNavbar>
			<StudentPortfolio user={user} />
		</Layout>
	);
};

export default Portfolio;