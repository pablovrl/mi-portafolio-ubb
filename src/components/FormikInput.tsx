import { TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import { CreateUser } from '../types';
import { TextFieldProps } from '@mui/material';

const FormikInput = ({ name, label, autoFocus, type, margin, multiline, minRows, placeholder }: TextFieldProps) => {
	const context = useFormikContext<CreateUser>();
	if(!name) throw new Error('FormikInput: name is required');
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
