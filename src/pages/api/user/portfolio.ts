import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserSession } from '../../../utils/userSession';
import { prisma } from '../../../utils/db';

const apiRoute = nextConnect({
  onError(error, req, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

// route to get the current user
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  let { about, technologies, experience, contact } = req.body;
  technologies = technologies.map((el: any) => ({technologyId: el.id}))
  experience = experience.forEach((el: any) => {
		el.endedAt = new Date(el.endedAt)
		el.startedAt = new Date(el.startedAt)
	})

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
          data: technologies
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
      }
    },
    include: {
      experiences: true,
      technologies: true,
      contacts: true
    }
  })
  console.log(getUser);

  res.json({ 'message': 'good' });

});

export default apiRoute;