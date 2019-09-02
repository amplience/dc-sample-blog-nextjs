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

const addLeadingZeroes = (num: number): string => (num < 10 ? `0${num}` : num.toString());

export default function convertToBlogDate(value: string): string {
  if (isNaN(Date.parse(value))) {
    return '';
  }

  const blogDate = new Date(value);
  return `${MONTHS[blogDate.getMonth()]} ${addLeadingZeroes(blogDate.getDate())}, ${blogDate.getFullYear()}`;
}
