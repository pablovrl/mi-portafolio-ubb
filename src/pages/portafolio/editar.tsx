import { Technology } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import PortfolioForm from '../../components/PortfolioForm';
import { UserPortfolio } from '../../types';
import { prisma } from '../../utils/db';
import { getUserSessionWithContext } from '../../utils/userSession';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getUserSessionWithContext(ctx);
	if (!session)
		return { notFound: true };

	const user = await prisma.user.findFirst({
		where: { email: session?.user?.email as string },
		include: {
			technologies: { include: { technology: true } },
			projects: true,
			experiences: true,
			contacts: true,
		},
	});

	const technologies = await prisma.technology.findMany();
	return { props: { stringifiedUser: JSON.stringify(user), technologies } };
};

interface Props {
  stringifiedUser: string;
  technologies: Technology[];
}

const Editar: NextPage<Props> = ({ stringifiedUser, technologies }) => {
	const user = JSON.parse(stringifiedUser) as UserPortfolio;
	return (
		<PortfolioForm user={user} technologies={technologies}/>
	);
};

export default Editar;