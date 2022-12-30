import Helptext from './common/Helptext';
import Title from './common/Title';
import { Technology } from '@prisma/client';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { getImage } from '../../utils/getImage';

interface Props {
	technologies: Technology[];
}

const Technologies = ({ technologies }: Props) => {
	const formik = useFormikContext<{
		technologies: Technology[];
	}>();
	return (
		<Box>
			<Title text='Tecnologías' />
			<Helptext>
				A continuación ingresa las tecnologías que más domines. (Ingresa al menos 1).
			</Helptext>
			<Autocomplete
				multiple
				onChange={(e, value) => {
					formik.setFieldValue('technologies', value);
				}}
				isOptionEqualToValue={(option, value) => option.id === value.id}
				sx={{ marginTop: 1 }}
				options={technologies}
				getOptionLabel={(option) => option.name}
				value={formik.values.technologies}
				id="multiple-limit-tags"
				renderOption={(props, option) => (
					<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
						{option.icon.includes('uploads/images') ? (
							<img
								src={getImage(option.icon)}
								style={{ width: '30px', height: '30px' }}
							/>
						): (
							<i style={{ fontSize: '30px' }} className={option.icon} />
						)}
						<Typography ml={2}>
							{option.name}
						</Typography>
					</Box>
				)}
				renderInput={(params) => (
					<TextField {...params} label="Tecnologías *" placeholder="Tecnologías"
						error={formik.touched.technologies && Boolean(formik.errors.technologies)}
						helperText={formik.touched.technologies && formik.errors.technologies?.toString()}
					/>
				)}
			/>
		</Box>
	);
};

export default Technologies;