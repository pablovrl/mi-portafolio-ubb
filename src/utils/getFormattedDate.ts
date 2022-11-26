
// format date to Month - Year
const months = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
];

export function getFormattedDate(date: Date): string {
	const splittedDate = date.toString().split('-');
	return `${months[parseInt(splittedDate[1]) - 1]} ${splittedDate[0]}`;
}
