"use client"
import { useEffect, useState } from "react";
import CMSPage from "./components/cms-page";
import { ContentItem, STATUS_TYPES, StatusType } from "./model/content-item";

export default function Home() {
  const [selectedStatus, setSelectedStatus] = useState<StatusType>(STATUS_TYPES.ALL);
  const [articles, setArticles] = useState<ContentItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/articles')
      .then(response => response.json())
      .then(data => setArticles(data));
  }, []);

  // Filter articles based on selected status
  const filteredArticles = selectedStatus === STATUS_TYPES.ALL 
    ? articles 
    : articles.filter(article => article.status === selectedStatus);

  return (
    <CMSPage pageTitle="Welcome">
      <div>
        Welcome to the Freedom Post CMS
      </div>
    </CMSPage>
  );
}
