import type { NextPage } from 'next';
import { requireAuth } from '../utils/requireAuth';
import { Box, Typography, Container, Button, Link as MUILink, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getUserSessionWithContext } from '../utils/userSession';

export const getServerSideProps = requireAuth(async (ctx) => {
	const session = await getUserSessionWithContext(ctx);
	console.log(session);
	if(session?.user?.role === 'ADMIN') {
		return {
			redirect: {
				destination: '/admin',
				permanent: false
			}
		};
	}

	return {
		props: {}
	};
});

const Home: NextPage = () => {
	const session = useSession();
	return (
		<Box width='100vw' height={'100vh'} display='fl/ubb-color.pngex' justifyContent={'center'} alignItems={{ md: 'center' }} >
			<Navbar />
			<Container>
				<Grid container mt={{ xs: '70px' }} display={'flex'} alignItems='center' flexDirection={{ xs: 'column', md: 'row' }}>
					<Grid item md={8}>
						<Typography variant='h1' fontSize={{ xs: '2.5rem', md: '5rem' }} fontWeight={'bold'} fontFamily='sans-serif'>Bienvenid@ a</Typography>
						<Typography variant='h1' fontSize={{ xs: '2.5rem', md: '5rem' }} fontWeight={'bold'} fontFamily='sans-serif'>Mi Portafolio UBB</Typography>
						<Typography variant='h6' color='grey'>
							Crea un portafolio para mostrar tus proyectos a terceros.
							Revisa los portafolios de tus compañeros y conoce sus trabajos.
						</Typography>
						<Box display={'flex'} gap={1} my={2} flexDirection='column' width={'fit-content'}>
							<Button LinkComponent={'a'} href={`/portafolio/${session.data?.user?.email}`} size='large' variant='contained'>Crear portafolio</Button>
							<Link href={'/portafolios'}>
								<MUILink sx={{ cursor: 'pointer' }}>
									También puedes buscar portafolios de tus compañeros
								</MUILink>
							</Link>
						</Box>
					</Grid>
					<Grid item md={4} display={{ xs: 'none', md: 'block' }}>
						<img src="ubb-color.png" alt="Logo universidad del bío-bío" width={'400px'} />
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Home;
