"use client"
import CMSPage from "@/app/components/cms-page";
import Deadline from '@/app/components/deadline-picker';
import { ContentItem, STATUS_TYPES } from "@/app/model/content-item";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewContent() {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<ContentItem>>({
        title: "",
        content: "",
        type: "Article",
        status: STATUS_TYPES.DRAFT,
        authors: [],
        deadline: new Date().toISOString()
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                router.push('/content');
            }
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    return (
        <CMSPage pageTitle="New Article">
            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            id="status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof STATUS_TYPES[keyof typeof STATUS_TYPES] })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value={STATUS_TYPES.DRAFT}>Draft</option>
                            <option value={STATUS_TYPES.IN_REVIEW}>In Review</option>
                            <option value={STATUS_TYPES.PUBLISHED}>Published</option>
                            <option value={STATUS_TYPES.ARCHIVED}>Archived</option>
                        </select>
                    </div>

                    <div>
                        <Deadline value={formData.deadline ? new Date(formData.deadline) : null} onChange={(newDate: Date) => setFormData({ ...formData, deadline: newDate.toISOString() })} />
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
                            Create Content
                        </button>
                    </div>
                </form>
            </div>
        </CMSPage>
    );
}
