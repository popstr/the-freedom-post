"use client"
import CMSPage from "@/app/components/cms-page";
import { ContentItem } from "@/app/model/content-item";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditContent() {
    const router = useRouter();
    const { id } = useParams();
    const [article, setArticle] = useState<ContentItem>();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
      getArticle(id as string).then(data => setArticle(data));
    }, [id]);

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

                <div>
                    {article.title}
                </div>
            </div>
        </CMSPage>
    )
}

function getArticle(id: string) {
    console.log("url", `http://localhost:3001/articles/${id}`);
    return fetch(`http://localhost:3001/articles/${id}`)
        .then(response => response.json())
        .then(data => data);
}
