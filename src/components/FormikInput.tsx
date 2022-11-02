import { TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import { HTMLInputTypeAttribute } from 'react';
import { CreateUser } from '../types';

interface FormikInputProps {
	name: string
	label: string
	autoFocus?: boolean
	type?: HTMLInputTypeAttribute
	margin?: 'none' | 'normal'
}

const FormikInput = ({ name, label, autoFocus, type, margin }: FormikInputProps) => {
	const context = useFormikContext<CreateUser>();
	console.log(context);
	return (
		<TextField
			margin={margin}
			fullWidth
			autoFocus={autoFocus}
			id={name}
			name={name}
			label={label}
			type={type || 'text'}
			value={context.values[name]}
			onChange={context.handleChange}
			error={context.touched[name] && Boolean(context.errors[name])}
			helperText={context.touched[name] && context.errors[name]}
		/>
	);
};

export default FormikInput;
