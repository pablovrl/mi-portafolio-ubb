import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserSession } from '../../../utils/userSession';
import { prisma } from '../../../utils/db';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Contact, Experience, Project, Technology } from '@prisma/client';

const upload = multer({
	storage: multer.diskStorage({
		destination: 'public/uploads/projects',
		filename: (req, file, cb) => {
			const extension = file.mimetype.split('/')[1];
			cb(null, `${uuidv4()}.${extension}`);
		}
	})
});

const apiRoute = nextConnect({
	onError(error, req, res: NextApiResponse) {
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	}
});

apiRoute.use(upload.array('project'));


apiRoute.delete(async (req: NextApiRequest & { files: Express.Multer.File[] }, res: NextApiResponse) => {
	const session = await getUserSession(req, res);
	if (!session?.user?.email) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	await prisma.experience.deleteMany({ where: { user: { email: session.user.email } } });
	await prisma.technologiesOnUsers.deleteMany({ where: { user: { email: session.user.email } } });
	await prisma.contact.deleteMany({ where: { user: { email: session.user.email } } });
	await prisma.project.deleteMany({ where: { user: { email: session.user.email } } });
	await prisma.user.update({
		where: { email: session.user.email }, data: {
			portfolio: false,
			about: ''
		}
	});

	return res.status(200).json({ message: 'Portfolio deleted' });
});
// route to get the current user
apiRoute.post(async (req: NextApiRequest & { files: Express.Multer.File[] }, res: NextApiResponse) => {
	const about = req.body.about;
	const contact = JSON.parse(req.body.contact).map((contact: Partial<Contact>) => {
		delete contact.id;
		delete contact.userId;
		// if contact.url doesn't start with http:// or https://, add it
		if (contact.url)
			if (!contact.url.startsWith('http://') && !contact.url
				.startsWith('https://') && !contact.url.startsWith('mailto:')) {
				contact.url = `http://${contact.url}`;
			}
		return contact;
	});
	const technologiesIds = JSON.parse(req.body.technologies).map((el: Technology) => ({ technologyId: el.id }));
	const experience = JSON.parse(req.body.experience).map((el: Partial<Experience>) => {
		delete el.id;
		delete el.userId;
		if(el.endedAt) el.endedAt = new Date(el.endedAt);
		if(el.startedAt) el.startedAt = new Date(el.startedAt);
		return el;
	});

	// console.log(JSON.parse(req.body.projects));
	// console.log(req.files);
	let cont = 0;
	const projects = JSON.parse(req.body.projects).map((el: Partial<Project>) => {
		delete el.id;
		delete el.userId;
		if (typeof el.file !== 'string') {
			el.file = req.files[cont].path.replace('public', '');
			cont++;
		}
		return el;
	});
	console.log(projects);


	if (!req.files) {
		return res.status(400).json({ error: 'Please upload a file' });
	}

	const session = await getUserSession(req, res);
	if (!session?.user?.email) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	await prisma.experience.deleteMany({ where: { user: { email: session.user.email } } });
	await prisma.technologiesOnUsers.deleteMany({ where: { user: { email: session.user.email } } });
	await prisma.contact.deleteMany({ where: { user: { email: session.user.email } } });
	await prisma.project.deleteMany({ where: { user: { email: session.user.email } } });
	await prisma.user.update({
		where: { email: session.user.email }, data: {
			portfolio: false,
			about: ''
		}
	});

	await prisma.user.update({
		where: {
			email: session.user.email
		},
		data: {
			portfolio: true,
			about,
			technologies: {
				createMany: {
					data: technologiesIds
				}
			},
			experiences: {
				createMany: {
					data: experience
				}
			},
			contacts: {
				createMany: {
					data: contact
				}
			},
			projects: {
				createMany: {
					data: projects
				}
			}
		},
	});

	res.status(200).json({ 'message': 'good' });

});

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
};

export default apiRoute;