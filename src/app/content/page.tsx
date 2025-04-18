import Link from 'next/link';
import CMSPage from '../components/cms-page';
import CreateArticleButton from '../components/create-article-button';
import StatusSelector from '../components/status-selector';
import { Author, ContentItem, STATUS_TYPES, statusLabels, StatusType } from '../model/content-item';
import { getAuthors } from '../server/author';
import { getItems } from '../server/content-item';

export default async function ContentPage({ searchParams }: { searchParams: { status?: string } }) {
  const { status } = await searchParams;
  const selectedStatus = status || STATUS_TYPES.ALL;
  const items = await getItems(selectedStatus);
  const authors = await getAuthors();

  // Check if have any items at all
  let isEmpty = false;
  if (items.length === 0) {
    // Obviously this is not the optimal way to do this :)
    const allItems = await getItems(STATUS_TYPES.ALL);
    isEmpty = allItems.length === 0;
  }

  return (
    <CMSPage pageTitle="Content">
      {isEmpty ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-600">
            You have no content yet! Press <CreateArticleButton /> to get started!
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <CreateArticleButton />
          </div>
          <div className="mb-6">
            <StatusSelector selectedStatus={selectedStatus} />
          </div>

          <div className="grid gap-4">
            {items.length === 0 ? (
              <div>{`There are no items with ${statusLabels[selectedStatus]} status.`}</div>
            ) : (
              <>
                {items.map((item: ContentItem) => (
                  <Link
                    key={item.id}
                    href={`/content/edit/${item.id}`}
                    className={`block p-4 rounded-lg shadow hover:shadow-md transition-shadow ${
                      item.deadline &&
                      item.status !== STATUS_TYPES.PUBLISHED &&
                      item.status !== STATUS_TYPES.ARCHIVED
                        ? new Date(item.deadline) < new Date()
                          ? 'bg-red-50 border border-red-200'
                          : new Date(item.deadline) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                            ? 'bg-yellow-50 border border-yellow-200'
                            : 'bg-white'
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="text-gray-600 mt-1">
                          {truncateText(item.content, 120) || 'No content available'}
                        </p>
                        <div className="mt-2 text-sm text-gray-500">
                          {item.authors
                            .map((authorId: string) => {
                              const author = authors.find((a: Author) => a.id === authorId);
                              return author ? author.name : 'Unknown author';
                            })
                            .join(', ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === STATUS_TYPES.PUBLISHED
                              ? 'bg-green-50 text-green-600'
                              : item.status === STATUS_TYPES.IN_REVIEW
                                ? 'bg-yellow-100 text-yellow-800'
                                : item.status === STATUS_TYPES.ARCHIVED
                                  ? 'bg-gray-100 text-gray-800'
                                  : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {statusLabels[item.status as StatusType]}
                        </span>
                        {item.deadline &&
                          item.status !== STATUS_TYPES.PUBLISHED &&
                          item.status !== STATUS_TYPES.ARCHIVED && (
                            <div className="mt-2 text-sm text-gray-500">
                              <span className="font-medium">Deadline: </span>
                              <time dateTime={new Date(item.deadline).toISOString()}>
                                {new Date(item.deadline).toLocaleDateString('da-DK', {
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
              </>
            )}
          </div>
        </>
      )}
    </CMSPage>
  );
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
