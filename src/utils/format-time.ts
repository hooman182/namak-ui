import 'dayjs/locale/fa';

import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

// ----------------------------------------------------------------------

/**
 * @Docs
 * https://day.js.org/docs/en/display/format
 */

/**
 * Default timezones
 * https://day.js.org/docs/en/timezone/set-default-timezone#docsNav
 *
 */

/**
 * UTC
 * https://day.js.org/docs/en/plugin/utc
 * @install
 * import utc from 'dayjs/plugin/utc';
 * dayjs.extend(utc);
 * @usage
 * dayjs().utc().format()
 *
 */

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('fa');

// ----------------------------------------------------------------------

export type DatePickerFormat = Dayjs | Date | string | number | null | undefined;

export const formatPatterns = {
  dateTime: 'YYYY/MM/DD HH:mm',
  date: 'YYYY/MM/DD',
  time: 'HH:mm',
  split: {
    dateTime: 'YYYY/MM/DD HH:mm',
    date: 'YYYY/MM/DD',
  },
  paramCase: {
    dateTime: 'YYYY-MM-DD HH:mm',
    date: 'YYYY-MM-DD',
  },
};

const isValidDate = (date: DatePickerFormat) =>
  date !== null && date !== undefined && dayjs(date).isValid();

// ----------------------------------------------------------------------

/**
 * @output 17 Apr 2022 12:00 am
 */
export function fDateTime(date: DatePickerFormat, template?: string): string {
  if (!isValidDate(date)) {
    return 'تاریخ نامعتبر';
  }

  return dayjs(date).format(template ?? formatPatterns.dateTime);
}

// ----------------------------------------------------------------------

/**
 * @output 17 Apr 2022
 */
export function fDate(date: DatePickerFormat, template?: string): string {
  if (!isValidDate(date)) {
    return 'تاریخ نامعتبر';
  }

  return dayjs(date).format(template ?? formatPatterns.date);
}

// ----------------------------------------------------------------------

/**
 * @output a few seconds, 2 years
 */
export function fToNow(date: DatePickerFormat): string {
  if (!isValidDate(date)) {
    return 'تاریخ نامعتبر';
  }

  return dayjs(date).toNow(true);
}
