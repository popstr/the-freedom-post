"use client"
import Link from "next/link";
import { useState } from "react";
import CMSPage from "./components/cms-page";
import { ContentItem, STATUS_TYPES, statusLabels, StatusType } from "./model/content-item";

export default function Home() {
  const [selectedStatus, setSelectedStatus] = useState<StatusType>(STATUS_TYPES.ALL);
  
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
      status: STATUS_TYPES.PUBLISHED,
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
      status: STATUS_TYPES.DRAFT,
      deadline: new Date(),
    }
  ]

  // Filter articles based on selected status
  const filteredArticles = selectedStatus === STATUS_TYPES.ALL 
    ? articles 
    : articles.filter(article => article.status === selectedStatus);

  return (
    <CMSPage pageTitle="Content">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {Object.entries(STATUS_TYPES).map(([_, value]) => (
              <button
                key={value}
                onClick={() => setSelectedStatus(value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedStatus === value
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {statusLabels[value]}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-emerald-800 text-white rounded-md hover:bg-emerald-600 transition-colors cursor-pointer">
            Create new
          </button>
        </div>
        
        <div className="space-y-6">
          {filteredArticles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-sm font-medium ${
                  article.status === STATUS_TYPES.PUBLISHED ? 'text-green-600' :
                  article.status === STATUS_TYPES.DRAFT ? 'text-gray-600' :
                  article.status === STATUS_TYPES.IN_REVIEW ? 'text-blue-600' :
                  'text-gray-400'
                }`}>
                  {statusLabels[article.status]}
                </span>
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