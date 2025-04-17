'use client';
import AuthorsPicker from '@/app/components/authors-picker';
import CMSPage from '@/app/components/cms-page';
import DeadlinePicker from '@/app/components/deadline-picker';
import { ContentItem, STATUS_TYPES } from '@/app/model/content-item';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditContent() {
  const router = useRouter();
  const { id } = useParams();
  const [article, setArticle] = useState<ContentItem>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    getArticle(id as string).then((data) => setArticle(data));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      if (response.ok) {
        router.push('/content');
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3001/articles/${id}`, {
        method: 'DELETE',
      });
      router.push('/content');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <CMSPage pageTitle="Edit Content">
      <div className="relative">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete Article
          </button>
        </div>

        {showDeleteDialog && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Delete Article</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this article? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={article.title}
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
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
                value={article.content}
                onChange={(e) => setArticle({ ...article, content: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <AuthorsPicker
                selectedAuthors={article.authors}
                onChange={(selectedAuthors) => {
                  setArticle({ ...article, authors: selectedAuthors });
                }}
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={article.status}
                onChange={(e) =>
                  setArticle({
                    ...article,
                    status: e.target.value as (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES],
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value={STATUS_TYPES.DRAFT}>Draft</option>
                <option value={STATUS_TYPES.IN_REVIEW}>In Review</option>
                <option value={STATUS_TYPES.PUBLISHED}>Published</option>
                <option value={STATUS_TYPES.ARCHIVED}>Archived</option>
              </select>
            </div>

            <div>
              <DeadlinePicker
                value={article.deadline ? new Date(article.deadline) : null}
                onChange={(newDate: Date) =>
                  setArticle({ ...article, deadline: newDate.toISOString() })
                }
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/content')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
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

function getArticle(id: string) {
  return fetch(`http://localhost:3001/articles/${id}`)
    .then((response) => response.json())
    .then((data) => data);
}
