import AuthorsPicker from '@/app/components/authors-picker';
import CMSPage from '@/app/components/cms-page';
import DeadlinePicker from '@/app/components/deadline-picker';
import { STATUS_TYPES } from '@/app/model/content-item';
import { deleteContentItem, getArticle, updateContentItem } from '@/app/server/content-item';
import { requireUser } from '@/app/server/session';
import { redirect } from 'next/navigation';

export default async function EditContent({ params }: { params: { id: string } }) {
  const { id } = await params;
  const article = await getArticle(id);

  return (
    <CMSPage pageTitle="Edit Content">
      <div className="relative">
        <div className="flex justify-end mb-6">
          <form action={deleteContentItem.bind(null, id)}>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
            >
              Delete Article
            </button>
          </form>
        </div>

        <div className="max-w-2xl mx-auto">
          <form
            action={async (formData) => {
              'use server';
              requireUser();

              updateContentItem(id, {
                title: formData.get('title') as string,
                content: formData.get('content') as string,
                status: formData.get('status') as string,
                authors: formData.getAll('authors') as string[],
                deadline: formData.get('deadline') as string,
              });
              redirect('/content');
            }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={article.title}
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
                defaultValue={article.content}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <AuthorsPicker selectedAuthors={article.authors} />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={article.status}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value={STATUS_TYPES.DRAFT}>Draft</option>
                <option value={STATUS_TYPES.IN_REVIEW}>In Review</option>
                <option value={STATUS_TYPES.PUBLISHED}>Published</option>
                <option value={STATUS_TYPES.ARCHIVED}>Archived</option>
              </select>
            </div>

            <div>
              <DeadlinePicker value={article.deadline ? new Date(article.deadline) : null} />
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </CMSPage>
  );
}
