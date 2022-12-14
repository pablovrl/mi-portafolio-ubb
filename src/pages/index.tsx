import type { NextPage } from 'next';
import { requireAuth } from '../utils/requireAuth';
import { Box, Typography, Container, Button, Link as MUILink, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const getServerSideProps = requireAuth(async () => {
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
						<Typography variant='h1' fontSize={{xs: '2.5rem', md: '5rem'}} fontWeight={'bold'} fontFamily='sans-serif'>Mi Portafolio UBB</Typography>
						<Typography variant='h6' color='grey'>
							Crea rápidamente tu portafolio para que puedas mostrar tus proyectos a terceros, y así obtener más oportunidades y un factor diferenciador. Revisa los portafolios de tus compañeros y conoce sus proyectos.
						</Typography>
						<Box display={'flex'} gap={1} my={2} flexDirection='column' width={'fit-content'}>
							<Button LinkComponent={'a'} href={`/portafolio/${session.data?.user?.email}`} size='large' variant='contained'>Crear portafolio</Button>
							<Link href={'/portafolios'}>
								<MUILink sx={{cursor: 'pointer'}}>
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
