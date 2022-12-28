
const months = [
	'Ene',
	'Feb',
	'Mar',
	'Abr',
	'May',
	'Jun',
	'Jul',
	'Ago',
	'Sep',
	'Oct',
	'Nov',
	'Dic',
];

export function getFormattedDate(date: string): string {
	const splittedDate = date.toString().split('-');
	return `${months[parseInt(splittedDate[1]) - 1]} ${splittedDate[0]}`;
}
