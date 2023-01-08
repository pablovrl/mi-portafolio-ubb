import type { GetServerSideProps, NextPage } from 'next';
import Layout from '../components/Layout';
import { prisma } from '../utils/db';
import { Technology, User } from '@prisma/client';
import { Alert, AlertTitle, Box, Grid, TextField, Typography, Link as MUILink, Pagination } from '@mui/material';
import Link from 'next/link';
import ProfileImage from '../components/ProfileImage';
import { getUserSessionWithContext } from '../utils/userSession';
import { useState } from 'react';
import Logo from '../components/Logo';

export const getServerSideProps: GetServerSideProps = (async (ctx) => {
	const users = await prisma.user.findMany({
		where: {
			portfolio: true,
			role: 'USER'
		},
		include: {
			technologies: { include: { technology: true } },
		}
	});

	const session = await getUserSessionWithContext(ctx);
	if (session) {
		const user = await prisma.user.findUnique({ where: { email: session?.user?.email as string } });
		return { props: { user, users } };
	}

	return { props: { users } };
});

interface UserWithTechnologies extends User {
	technologies: {
		userId: number;
		technologyId: number;
		technology: Technology;
	}[];
}
interface Props {
	user?: User;
	users: UserWithTechnologies[];
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

const ListUsers = ({ users }: { users: UserWithTechnologies[] }) => {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const ROWS = 4;

	const filteredUsers = users.filter((user) =>
		user.name?.toLowerCase().includes(search.toLowerCase()) ||
		user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
		user.career?.toLowerCase().includes(search.toLowerCase()) ||
		user.technologies.some((tech) => tech.technology.name.toLowerCase().includes(search.toLowerCase()))
	);

	const totalPages = Math.ceil(filteredUsers.length / ROWS);
	const currentPageData = filteredUsers.slice((page - 1) * ROWS, page * ROWS);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Box>
			<Box my={2}>
				<TextField
					label='Buscar portafolios de estudiantes'
					placeholder='Puedes buscar por nombre, apellido, carrera (IECI, ICINF) o tecnología (typescript, java, etc...).'
					value={search}
					fullWidth
					onChange={(e) => { setSearch(e.target.value); setPage(1); }}
				/>
			</Box>
			{filteredUsers.length === 0 && (
				<Alert severity='info'>
					<AlertTitle>No se encontraron portafolios.</AlertTitle>
				</Alert>
			)}
			<Grid container spacing={2} my={2}>
				{currentPageData.map((user) => (
					<Grid key={user.id} item xs={12} md={6}>
						<UserCard user={user} />
					</Grid>
				))}
			</Grid>
			<Box display='flex' my={2} alignItems='center' justifyContent={'center'} flexDirection='column' gap={2}>
				<Pagination page={page} onChange={handlePageChange} count={totalPages} />
			</Box>
		</Box>
	);
};

const Home: NextPage<Props> = ({ user, users }) => {

	if (!user) return (
		<Layout noNavbar>
			<Box width={'100%'} display='flex' justifyContent={'center'}>
				<Box mx={20} width={'300px'}>
					<Logo />
				</Box>
			</Box>
			<ListUsers users={users} />
		</Layout>
	);

	return (
		<Layout>
			{!user.portfolio && (
				<Alert severity='warning' sx={{ marginBottom: '15px' }}>
					<AlertTitle>
						¿Aún no tienes tu portafolio?
					</AlertTitle>
					Crea uno haciendo click aquí <Link href={`/portafolio/${user.email}`}><MUILink sx={{ cursor: 'pointer' }}>crear portafolio</MUILink></Link>.
				</Alert>
			)}
			<ListUsers users={users} />
		</Layout>
	);
};

export default Home;
