import nodemailer from 'nodemailer';
import { env } from 'process';

// configure transporter using gmail 
export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'pablo.villarroel1901@alumnos.ubiobio.cl',
		pass: env.EMAIL_PASSWORD
	},
});
