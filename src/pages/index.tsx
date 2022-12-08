import type { NextPage } from 'next';
import { requireAuth } from '../utils/requireAuth';
import Layout from '../components/Layout';
import { prisma } from '../utils/db';
import { User } from '@prisma/client';
import { Alert, AlertTitle, Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import ProfileImage from '../components/ProfileImage';
import { getUserSessionWithContext } from '../utils/userSession';

export const getServerSideProps = requireAuth(async (ctx) => {
	const session = await getUserSessionWithContext(ctx);
	const user = await prisma.user.findUnique({ where: { email: session?.user?.email as string } });
	const users = await prisma.user.findMany({ where: { portfolio: true } });
	return { props: { user, users } };
});

interface Props {
	user: User;
	users: User[];
}
const UserCard = ({ user }: { user: User }) => (
	<Link href={`/portafolio/${user.email}`}>
		<Box bgcolor={'#FAFAFA'} p={5} display='flex' gap={2} flexDirection='column' sx={{ transition: 'transform .2s', '&:hover': { transform: 'scale(1.05)' }, cursor: 'pointer' }}>
			<Box display='flex' gap={2} alignItems='center'>
				<Box>
					<Typography variant={'h6'} fontWeight={'bold'}>{user.name.toUpperCase()} {user.lastName.toUpperCase()}</Typography>
				</Box>
				<ProfileImage src={user.image!} size={'120px'} />
			</Box>
			<Typography fontWeight={'bold'} color='grey'>
				{user.career === 'IECI' ? 'Ingeniería de Ejecución en Computación e Informática' : 'Ingeniería Civil Informática'}
			</Typography>
		</Box>
	</Link>
);

const Home: NextPage<Props> = ({ user, users }) => {
	return (
		<Layout>
			{!user.portfolio && (
				<Alert severity='info'>
					<AlertTitle>
						¿Aún no tienes tu portafolio?, haz click aquí para crearlo, <Link href={`/portafolio/${user.email}`}>crear portafolio</Link>.
					</AlertTitle>
				</Alert>
			)}
			<Grid container spacing={2} my={2}>
				{users.map((user) => (
					<Grid key={user.id} item xs={12} md={6}>
						<UserCard user={user} />
					</Grid>
				))}
			</Grid>
		</Layout>
	);
};

export default Home;
