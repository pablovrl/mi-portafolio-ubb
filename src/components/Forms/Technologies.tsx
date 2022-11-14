import Helptext from './common/Helptext';
import Title from './common/Title';
import { Technology } from '@prisma/client';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface Props {
	technologies: Technology[];
}

const Technologies = ({ technologies }: Props) => {
	const [selectedTechnologies, setSelectedTechnologies] = useState<Technology[]>([]);

	return (
		<Box>
			<Title text='Tecnologías' />
			<Helptext>
				A continuación ingresa las tecnologías que más domines.
			</Helptext>
			<Autocomplete
				multiple
				onChange={(event, value) => setSelectedTechnologies(value)}
				sx={{ marginTop: 1 }}
				options={technologies}
				getOptionLabel={(option) => option.name}
				id="multiple-limit-tags"
				renderOption={(props, option) => (
					<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
						<i className={option.icon} />
						<Typography ml={2}>
							{option.name}
						</Typography>
					</Box>
				)}
				renderInput={(params) => (
					<TextField {...params} label="Tecnologías" placeholder="Tecnologías" />
				)}
			/>
		</Box>
	);
};

export default Technologies;