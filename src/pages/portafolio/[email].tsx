import { Alert, AlertTitle } from '@mui/material';
import { Portfolio, User } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import PersonalInfo from '../../components/Forms/PersonalInfo';
import Layout from '../../components/Layout';
import { prisma } from '../../utils/db';
import { getUserSessionWithContext } from '../../utils/userSession';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { email } = ctx.query;
	const user = await prisma.user.findFirst({
		where: { email: email as string },
		include: { portfolio: true }
	});

	if (!user)
		return { notFound: true };

	const session = await getUserSessionWithContext(ctx);

	if (session?.user?.email !== user.email && user.portfolio === null)
		return { notFound: true };
	return { props: { email, user } };
};

interface PortfolioProps {
	email: string;
	user: User & { portfolio?: Portfolio };
}

const Portfolio: NextPage<PortfolioProps> = ({ email, user }) => {
	const { data } = useSession();

	// Eres creador y no tienes portafolio
	if (email === data?.user?.email && user.portfolio === null)
		return (
			<Layout>
				<Alert severity='info'>
					<AlertTitle>Aún no tienes un portafolio :(</AlertTitle>
					Sigue los siguientes pasos para crear uno.
				</Alert>
				<PersonalInfo user={user} />
			</Layout>
		);

	// Eres el creador y tienes portafolio
	if (email === data?.user?.email)
		return (
			<p>Eres el creador y tienes portafolio</p>
		);

	return (
		<p>No eres el creador</p>
	);
};

export default Portfolio;