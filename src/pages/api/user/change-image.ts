import nextConnect from 'next-connect';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserSession } from '../../../utils/userSession';
import { prisma } from '../../../utils/db';
import fs from 'fs';

const whitelist = [
	'image/png',
	'image/jpg',
	'image/jpeg',
	'image/webp'
];

const upload = multer({
	storage: multer.diskStorage({
		destination: 'public/uploads/images',
		filename: (req, file, cb) => {
			const extension = file.mimetype.split('/')[1];
			cb(null, `${uuidv4()}.${extension}`);
		}
	}),
	fileFilter: (req, file, cb) => {
		if (whitelist.includes(file.mimetype)) {
			return cb(null, true);
		} else {
			return cb(null, false);
		}
	}
});

const apiRoute = nextConnect({
	onError(error, req, res: NextApiResponse) {
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	}
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req: NextApiRequest & { file: Express.Multer.File }, res: NextApiResponse) => {
	const session = await getUserSession(req, res);
	if (!session?.user?.email) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	if (!req.file) {
		return res.status(400).json({ error: 'Please upload a file' });
	}

	const imageRoute = '/uploads/images/' + req.file.filename;

	let user = await prisma.user.findFirst({ where: { email: session.user.email } });
	
	if (user?.image && user.image !== '/uploads/images/default.png') {
		try {
			fs.unlinkSync('public' + user.image);
		} catch(error) {
			console.log(error);
		}
	}

	user = await prisma.user.update({
		where: { email: session.user.email },
		data: { image: imageRoute }
	});

	return res.json({ data: 'Image changed successfully!', image: imageRoute });
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};