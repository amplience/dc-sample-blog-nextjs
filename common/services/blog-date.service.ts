const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export default function convertToBlogDate(value: string): string {
  if (!value || isNaN(Date.parse(value))) {
    return '';
  }

  const blogDate = new Date(value);
  return `${blogDate.getDate()} ${MONTHS[blogDate.getMonth()]}, ${blogDate.getFullYear()}`;
}
