import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserSession } from '../../../utils/userSession';
import { prisma } from '../../../utils/db';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';


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

// route to get the current user
apiRoute.post(async (req: NextApiRequest & { files: Express.Multer.File[] }, res: NextApiResponse) => {
  const about = req.body.about;
  const contact = JSON.parse(req.body.contact);
  const technologiesIds = JSON.parse(req.body.technologies).map((el: any) => ({ technologyId: el.id }));
  const experience = JSON.parse(req.body.experience).map((el: any) => {
    el.endedAt = new Date(el.endedAt);
    el.startedAt = new Date(el.startedAt);
    return el;
  });
  const projects = JSON.parse(req.body.projects).map((el: any, index: number ) => {
    el.courseId = 1;
    el.file = req.files[index].path.replace('public', '');
    delete el.course;
    return el;
  });

  if (!req.files) {
    return res.status(400).json({ error: 'Please upload a file' });
  }

  req.files.forEach(element => {
    fs.unlink(element.path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  });

  const session = await getUserSession(req, res);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const getUser = await prisma.user.update({
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
    include: {
      experiences: true,
      technologies: true,
      contacts: true,
      projects: true
    }
  })

  res.status(200).json({ 'message': 'good' });

});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;