import moment from 'moment';

export default function formatDate({
  date,
  format = 'LLLL'
}: {
  date: Date;
  format?: string;
}) {
  return moment(date).utcOffset(0, true).format(format);
}
