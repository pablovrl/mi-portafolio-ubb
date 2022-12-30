import { Box, Button, FormHelperText, IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Technology } from '@prisma/client';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { Formik } from 'formik';
import { createTechnology } from '../api/technology';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';

interface Props {
	technologies: Technology[];
}

const validationSchema = yup.object({
	name: yup.string().required('El nombre es requerido'),
	icon: yup.string().required('El ícono es requerido'),
});

const ROWS = 5;

const Technologies = ({ technologies }: Props) => {
	const [filter, setFilter] = useState('');
	const [page, setPage] = useState(1);
	const [data, setData] = useState(technologies);

	const filteredData = data.filter((technology) =>
		technology.name.toLowerCase().includes(filter.toLowerCase())
	);
	const totalPages = Math.ceil(filteredData.length / ROWS);

	const currentPageData = filteredData.slice((page - 1) * ROWS, page * ROWS);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Box>
			<Box mb={2}>
				<TextField label="Busca tecnologías por su nombre" fullWidth onChange={(e) => { setFilter(e.target.value); setPage(1); }} />
			</Box>
			<TableContainer sx={{ height: '430px' }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Nombre</TableCell>
							<TableCell>Ícono</TableCell>
							<TableCell>Eliminar</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currentPageData.map((technology) => (
							<TableRow key={technology.id}>
								<TableCell>{technology.id}</TableCell>
								<TableCell>{technology.name.toUpperCase()}</TableCell>
								{technology.icon.includes('uploads/images') ? (
									<TableCell>
										<img src={technology.icon.replace('/public', '')} alt={technology.name} width={30} />
									</TableCell>
								) : (
									<TableCell><i className={technology.icon} /></TableCell>
								)}
								<TableCell>
									<IconButton color='error'>
										<DeleteForeverIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box display='flex' my={2} alignItems='center' justifyContent={'center'} flexDirection='column' gap={2}>
				<Pagination size='small' page={page} onChange={handleChange} count={totalPages} />
				<Box>
					<Formik
						validationSchema={validationSchema}
						initialValues={{ name: '', icon: undefined }}
						onSubmit={async (values) => {
							try {
								const res = await createTechnology(values);
								toast.success('Tecnología creada');
								setData([...data, res.data]);
							} catch (error) {
								toast.error('Error al crear la tecnología');
							}
						}}
					>
						{props => (
							<Box component={'form'} onSubmit={props.handleSubmit}>
								<TextField
									name='name'
									label='Nombre de la tecnología'
									fullWidth
									onChange={props.handleChange}
									value={props.values.name}
									error={props.touched.name && Boolean(props.errors.name)}
									helperText={props.touched.name && props.errors.name}
								/>
								{props.values.icon ? (
									<Button onClick={() => props.setFieldValue('icon', undefined)}>Eliminar imagen</Button>
								) : (
									<Box>
										<Button fullWidth variant='outlined' component='label'>
											Agregar imagen
											<input
												accept='.jpg, .png, jpeg, .webp'
												type='file'
												hidden
												name='icon'
												onChange={(e) => {
													if (e.target.files) {
														props.setFieldValue('icon', e.target.files[0]);
													}
												}}
											/>
										</Button>
										<FormHelperText error>{props.errors.icon}</FormHelperText>
									</Box>
								)}
								<Button type='submit' variant='outlined' fullWidth>Agregar nueva tecnología</Button>
							</Box>
						)}
					</Formik>
				</Box>
			</Box>
		</Box >
	);
};

export default Technologies;