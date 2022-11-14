import { Box, Button, Grid } from '@mui/material';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { changeImage } from '../../api/user';
import Image from 'next/image';
import Title from './common/Title';

interface UserImageProps {
  user: User;
}

const UserImage = ({ user }: UserImageProps) => {
	const [image, setImage] = useState<null | File>(null);
	const [currentImage, setCurrentImage] = useState(user.image || '');

	useEffect(() => {
		const uploadImage = async () => {
			if (image) {
				const res = await changeImage(image);
				setCurrentImage(res.data.image);
			}
		};
		uploadImage();
	}, [image]);

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImage(e.target.files[0]);
		}
	};

	return (

		<>
			<Title text='Actualiza tu imagen' />
			<Grid container spacing={2}>
				<Grid item xs={12} display='flex' justifyContent='center'>
					<Box position='relative' height='200px' width='200px' display={'flex'}>
						<Image src={currentImage} layout='fill' style={{ borderRadius: '50%' }} objectFit='cover' />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Button fullWidth variant='outlined' component='label'>
							Cambiar imagen
						<input type='file' hidden onChange={handleImageChange} />
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default UserImage;