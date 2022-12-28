import type { NextPage } from 'next';
import { requireAuth } from '../utils/requireAuth';
import Layout from '../components/Layout';
import { prisma } from '../utils/db';
import { User } from '@prisma/client';
import { Alert, AlertTitle, Box, Grid, TextField, Typography, Link as MUILink } from '@mui/material';
import Link from 'next/link';
import ProfileImage from '../components/ProfileImage';
import { getUserSessionWithContext } from '../utils/userSession';
import { useState } from 'react';

export const getServerSideProps = requireAuth(async (ctx) => {
	const session = await getUserSessionWithContext(ctx);
	const user = await prisma.user.findUnique({ where: { email: session?.user?.email as string } });
	const users = await prisma.user.findMany({ where: { portfolio: true, role: 'USER' } });
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
					<Typography variant={'h6'} fontWeight={'bold'}>{user.name?.toUpperCase()} {user.lastName?.toUpperCase()}</Typography>
					<Typography variant='body2' fontWeight={'bold'} color='grey'>
						{user.career === 'IECI' ? 'Ingeniería de Ejecución en Computación e Informática' : 'Ingeniería Civil Informática'}
					</Typography>
				</Box>
				<ProfileImage src={user.image || ''} size={'120px'} />
			</Box>
		</Box>
	</Link>
);

const Home: NextPage<Props> = ({ user, users }) => {
	const [search, setSearch] = useState('');
	const filteredUsers = users.filter((user) =>
		user.name?.toLowerCase().includes(search.toLowerCase()) ||
		user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
		user.career?.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<Layout>
			<Box my={2}>
				<TextField
					label='Busca portafolios de tus compañeros por nombre, apellido o carrera (IECI o ICINF)'
					value={search}
					fullWidth
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Box>
			{!user.portfolio && (
				<Alert severity='warning' sx={{ marginBottom: '15px' }}>
					<AlertTitle>
						¿Aún no tienes tu portafolio?
					</AlertTitle>
					Crea uno haciendo click aquí <Link href={`/portafolio/${user.email}`}><MUILink sx={{cursor: 'pointer'}}>crear portafolio</MUILink></Link>.
				</Alert>
			)}
			{filteredUsers.length === 0 && (
				<Alert severity='info'>
					<AlertTitle>No se encontraron portafolios.</AlertTitle>
				</Alert>
			)}
			<Grid container spacing={2} my={2}>
				{filteredUsers.map((user) => (
					<Grid key={user.id} item xs={12} md={6}>
						<UserCard user={user} />
					</Grid>
				))}
			</Grid>
		</Layout>
	);
};

export default Home;
