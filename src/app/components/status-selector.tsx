'use client';
import Link from 'next/link';
import { STATUS_TYPES, statusLabels } from '../model/content-item';

export default function StatusSelector({ selectedStatus }: { selectedStatus: string }) {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {Object.entries(STATUS_TYPES).map(([key, value]) => (
        <Link
          key={key}
          href={`/content?status=${value}`}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedStatus === value
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          {statusLabels[value]}
        </Link>
      ))}
    </div>
  );
}
