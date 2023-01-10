import nodemailer from 'nodemailer';
import { env } from 'process';

// configure transporter using gmail 
export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: env.EMAIL,
		pass: env.EMAIL_PASSWORD
	},
});
