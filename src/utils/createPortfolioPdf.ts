import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UserPortfolio } from '../types';
import { getFormattedDate } from './getFormattedDate';

// @ts-expect-error
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const createPdf = async (user: UserPortfolio) => {
	const pr = user.projects.map(project => {
		return [
			{
				text: `${project.technology.toUpperCase()}`,
				style: 'small',
				marginBottom: 2
			},
			{
				text: project.name,
				style: 'h3'
			},
			{
				text: project.description,
				alignment: 'justify'
			},
			{
				text: 'Descargar\n\n',
				link: `${process.env.NEXT_PUBLIC_DEPLOY}/api/file${project.file}`,
				color: 'blue',
				margin: [0, 5]
			}
		];
	});

	const ct = user.contacts.map(contact => {
		return {
			width: 'auto',
			text: contact.name,
			link: contact.url,
			color: 'blue'
		};
	});

	const ex = user.experiences.map(exp => {
		return [
			{
				text: `${exp.company} - ${exp.position} (${getFormattedDate((exp.startedAt))} - ${exp.endedAt ? getFormattedDate(exp.endedAt) : 'Actualidad'})`,
				style: 'h3',
				margin: [0, 5]
			},
			{
				text: exp.description,
				alignment: 'justify',
				marginBottom: 10
			}
		];
	});

	const tec = user.technologies.map((tech) => {
		return {
			text: tech.technology.name.toUpperCase(),
			margin: [0, 0, 0, 5],
		};
	});

	const tecLength = tec.length;

	const dd = {
		content: [
			{
				columns: [
					{
						width: 'auto',
						text: 'Portafolio',
						link: `${process.env.NEXT_PUBLIC_DEPLOY}/portafolio/${user.email}`,
						color: 'blue'
					},
					...ct
				],
				columnGap: 6
			},
			{
				text: `${user.name} ${user.lastName}`,
				style: 'header',
				marginTop: 10
			},
			{
				text: user.career === 'IECI' ?
					'Ingeniería de Ejecución en Computación e Informática' :
					'Ingeniería Civil Informática',
				style: 'subheader'
			},
			{
				text: 'Universidad del Bío-Bío \n\n'
			},
			{
				text: user.about + '\n\n',
				alignment: 'justify'
			},
			{
				text: 'Tecnologías',
				style: 'subheader'
			},
			{
				columns: [
					{
						ul: [...tec.slice(0, Math.ceil(tecLength / 2))]
					},
					{
						ul: [...tec.slice(Math.ceil(tecLength / 2), tecLength)]
					}
				]
			},
			user.projects.length > 0 && {
				text: 'Proyectos',
				style: 'subheader',
				margin: [0, 10]
			},
			...pr,
			user.experiences.length > 0 && {
				text: 'Experiencia Profesional',
				style: 'subheader',
				margin: [0, 5]
			},
			...ex
		],
		styles: {
			header: {
				fontSize: 40,
				bold: true
			},
			subheader: {
				fontSize: 18,
				bold: true,
				marginBottom: 5
			},
			h3: {
				fontSize: 14,
				bold: true,
				marginBottom: 2
			},
			quote: {
				italics: true
			},
			small: {
				fontSize: 10,
				color: 'grey',
			},
			link: {
				color: 'blue',
				fontSize: 10
			}
		}
	};

	// @ts-expect-error
	pdfMake.createPdf(dd).open();
};