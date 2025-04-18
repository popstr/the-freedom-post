import Link from 'next/link';

export default function CreateArticleButton() {
  return (
    <Link
      href="/content/new"
      className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
    >
      Create new
    </Link>
  );
}
