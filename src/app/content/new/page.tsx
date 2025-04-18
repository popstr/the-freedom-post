import AuthorsPicker from '@/app/components/authors-picker';
import CMSPage from '@/app/components/cms-page';
import DeadlinePicker from '@/app/components/deadline-picker';
import { STATUS_TYPES } from '@/app/model/content-item';
import { createContentItem } from '@/app/server/content-item';
import { getCurrentUserId } from '@/app/server/session';
import { redirect } from 'next/navigation';

async function createArticle(formData: FormData) {
  // prettier-ignore
  'use server';
  const userId = await getCurrentUserId();

  createContentItem({
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    type: 'Article', // We only support this type for now
    status: formData.get('status') as string,
    authors: formData.getAll('authors') as string[],
    deadline: formData.get('deadline') as string,
    createdBy: userId,
  });
  redirect('/content');
}

export default function NewContent() {
  return (
    <CMSPage pageTitle="New Article">
      <div className="max-w-2xl mx-auto">
        <form action={createArticle} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <AuthorsPicker selectedAuthors={[]} />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={STATUS_TYPES.DRAFT}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={STATUS_TYPES.DRAFT}>Draft</option>
              <option value={STATUS_TYPES.IN_REVIEW}>In Review</option>
              <option value={STATUS_TYPES.PUBLISHED}>Published</option>
              <option value={STATUS_TYPES.ARCHIVED}>Archived</option>
            </select>
          </div>

          <div>
            <DeadlinePicker value={null} />
          </div>

          <div className="flex justify-end space-x-4">
            <a
              href="/content"
              className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-600 transition-colors cursor-pointer"
            >
              Create Article
            </button>
          </div>
        </form>
      </div>
    </CMSPage>
  );
}
