import Link from 'next/link';
import CMSPage from '../components/cms-page';
import StatusSelector from '../components/status-selector';
import { ContentItem, STATUS_TYPES, statusLabels, StatusType } from '../model/content-item';
import { getAuthors } from '../server/author';
import { getArticles } from '../server/content-item';

export default async function ContentPage({ searchParams }: { searchParams: { status?: string } }) {
  const { status } = await searchParams;
  const selectedStatus = status || STATUS_TYPES.ALL;
  const articles = await getArticles(selectedStatus);
  const authors = await getAuthors();

  const filteredArticles = articles.filter((article: ContentItem) => {
    if (selectedStatus === STATUS_TYPES.ALL) return true;
    return article.status === selectedStatus;
  });

  return (
    <CMSPage pageTitle="Content">
      <div className="flex justify-end mb-6">
        <Link
          href="/content/new"
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Create new
        </Link>
      </div>

      <div className="mb-6">
        <StatusSelector selectedStatus={selectedStatus} />
      </div>

      <div className="grid gap-4">
        {filteredArticles.map((article: ContentItem) => (
          <Link
            key={article.id}
            href={`/content/edit/${article.id}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{article.title}</h2>
                <p className="text-gray-600 mt-1">{article.content || 'No content available'}</p>
                <div className="mt-2 text-sm text-gray-500">
                  {article.authors
                    .map((authorId: string) => {
                      const author = authors.find((a) => a.id === authorId);
                      return author ? author.name : 'Unknown author';
                    })
                    .join(', ')}
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    article.status === STATUS_TYPES.PUBLISHED
                      ? 'bg-green-100 text-green-800'
                      : article.status === STATUS_TYPES.IN_REVIEW
                        ? 'bg-yellow-100 text-yellow-800'
                        : article.status === STATUS_TYPES.ARCHIVED
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {statusLabels[article.status as StatusType]}
                </span>
                {article.deadline && (
                  <div className="mt-2 text-sm text-gray-500">
                    <time dateTime={new Date(article.deadline).toISOString()}>
                      {new Date(article.deadline).toLocaleDateString('da-DK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </time>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </CMSPage>
  );
}
