import { Button, Grid } from '@mui/material';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { changeImage } from '../../api/user';
import ProfileImage from '../ProfileImage';
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
				if (res.status === 200) {
					toast.success('Imagen actualizada');
					setCurrentImage(res.data.image);
				}
				else toast.error('El tipo de archivo no es válido');
			}
		};
		uploadImage();
	}, [image]);

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImage(e.target.files[0]);
		}
	};

	console.log(process.env);

	return (
		<>
			<Title text='Actualiza tu imagen' />
			<Grid container spacing={2}>
				<Grid item xs={12} display='flex' justifyContent='center'>
					<ProfileImage src={currentImage} size={'180px'} />
				</Grid>
				<Grid item xs={12}>
					<Button fullWidth variant='outlined' component='label'>
						Cambiar imagen
						<input accept='.jpg, .png, jpeg, .webp' type='file' hidden onChange={handleImageChange} />
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default UserImage;