import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const imageName = req.query.slug as string[];
	const imagePath = imageName.join('/');
	const filePath = path.resolve('.', `public/${imagePath}`);
	const imageBuffer = fs.readFileSync(filePath);
	return res.send(imageBuffer);
}