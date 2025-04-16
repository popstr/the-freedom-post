import Link from "next/link";
import CMSPage from "./components/cms-page";

export default function Home() {
  
  let articles = new Array<ContentItem>()
  articles = [
    {
      id: "1",
      type: "Article",
      title: "First Article",
      content: "Content 1",
      authors: [{
        id: "1",
        name: "Author 1",
        email: "author1@example.com"
      }],
      status: "published",
      deadline: new Date(),
    },
    {
      id: "2",
      type: "Article",
      title: "Second Article",
      content: "Content 2",
      authors: [{
        id: "2",
        name: "Author 2",
        email: "author2@example.com"
      }],
      status: "published",
      deadline: new Date(),
    }
  ]

  return (
    <CMSPage pageTitle="Content">

      <div className="max-w-4xl mx-auto">
        
        <div className="space-y-6">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-blue-600">{article.status}</span>
                <span className="text-sm text-gray-500">{article.type}</span>
              </div>
              
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                <Link href={`/content/edit/${article.id}`}>
                  {article.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 mb-4">{truncateText(article.content, 100)}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{article.authors.map((author) => author.name).join(", ")}</span>
                <time dateTime={article.deadline.toISOString()}>
                  {new Date(article.deadline).toLocaleDateString('da-DK', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </CMSPage>
  );
}

// Helper function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}