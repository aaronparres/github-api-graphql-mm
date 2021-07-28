import { format, getDate, isSameDay, differenceInCalendarDays } from 'date-fns';

export const dateFormatter = (date: string) => {
	const currentDate = new Date();
	const lastInsertDate = new Date(date);

	if (isSameDay(currentDate, lastInsertDate))
		return formatWithLabeledDayDate('today @', lastInsertDate);

	if (differenceInCalendarDays(currentDate, lastInsertDate) === 1) {
		return formatWithLabeledDayDate('yesterday @', lastInsertDate);
	}

	return formatShortMonthDate(lastInsertDate);
};

// today @ 12:55
const formatWithLabeledDayDate = (labeledDay: string, date: Date) =>
	`${labeledDay} ${format(date, 'HH:mm')}`;

// 12 may.
const formatShortMonthDate = (date: Date) =>
	`${getDate(date)} ${format(date, 'MMM').toLowerCase().slice(0, 3)}.`;
