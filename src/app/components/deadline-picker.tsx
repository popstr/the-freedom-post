'use client';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

const TZ = 'Europe/Copenhagen';

export default function DeadlinePicker({ value }: { value: Date | null }) {
  return (
    <>
      <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
        Deadline
      </label>
      <input
        type="datetime-local"
        id="deadline"
        name="deadline"
        defaultValue={value ? formatDate(value) : ''}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </>
  );
}

function formatDate(date: Date): string {
  // Return in the format expected by datetime-local input
  return dayjs(date).tz(TZ).format('YYYY-MM-DDTHH:mm');
}
