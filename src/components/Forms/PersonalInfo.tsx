import { Typography, Grid, Box, Button } from '@mui/material';
import { User } from '@prisma/client';
import { Formik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { changeImage } from '../../api/user';
import FormikInput from '../FormikInput';

interface PersonalInfoProps {
	user: User;
}

const PersonalInfo = ({ user }: PersonalInfoProps) => {
	const [image, setImage] = useState<null | File>(null);
	const [currentImage, setCurrentImage] = useState(user.image || '');
	const handleFormSubmit = () => {
		console.log();
	};

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImage(e.target.files[0]);
		}
	};

	useEffect(() => {
		const uploadImage = async () => {
			if (image) {
				const res = await changeImage(image);
				setCurrentImage(res.data.image);
			}
		};
		uploadImage();
	}, [image]);

	return (
		<Box>
			<Typography variant='h5' my={2}>Actualiza tu foto</Typography>
			<Formik
				initialValues={{ about: '' }}
				onSubmit={handleFormSubmit}
			>
				<Grid container spacing={2}>
					<Grid item xs={12} display='flex' justifyContent='center'>
						<Box position='relative' height='200px' width='200px' display={'flex'}>
							<Image src={currentImage} layout='fill' style={{ borderRadius: '50%' }} objectFit='cover' />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Button fullWidth variant='contained' component='label'>
							Cambiar imagen
							<input type='file' hidden onChange={handleImageChange} />
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h5' my={2}>Ingresa información personal</Typography>
					</Grid>	
					<Grid item xs={12}>
						<FormikInput
							name='name'
							label='Nombre'
						/>
					</Grid>
					<Grid item xs={12}>
						<FormikInput
							name='lastName'
							label='Apellido'
						/>
					</Grid>
					<Grid item xs={12}>
						<FormikInput
							name='about'
							label='Sobre mi'
							multiline
							minRows={3}
							placeholder="Ingresa una breve descripción sobre ti."
						/>
					</Grid>
				</Grid>
			</Formik>
		</Box>
	);
};

export default PersonalInfo;