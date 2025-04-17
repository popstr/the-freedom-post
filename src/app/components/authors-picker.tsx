'use client';
import { useEffect, useState } from 'react';
import { Author } from '../model/content-item';

export default function AuthorsPicker({ selectedAuthors }: { selectedAuthors: string[] }) {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    getAuthors().then((data) => setAuthors(data));
  }, []);

  if (authors.length == 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <label htmlFor="authors" className="block text-sm font-medium text-gray-700 mb-1">
        Authors
      </label>
      <select
        id="authors"
        name="authors"
        multiple
        defaultValue={selectedAuthors}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name} ({author.email})
          </option>
        ))}
      </select>
      <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple authors</p>
    </>
  );
}

function getAuthors(): Promise<Author[]> {
  return fetch('http://localhost:3001/authors')
    .then((response) => response.json())
    .then((data) => data);
}
