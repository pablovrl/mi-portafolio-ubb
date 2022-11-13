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
	multiline?: boolean
	minRows?: number
	placeholder?: string
}

const FormikInput = ({ name, label, autoFocus, type, margin, multiline, minRows, placeholder }: FormikInputProps) => {
	const context = useFormikContext<CreateUser>();
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
			multiline={multiline}
			minRows={minRows}
			placeholder={placeholder}
		/>
	);
};

export default FormikInput;
