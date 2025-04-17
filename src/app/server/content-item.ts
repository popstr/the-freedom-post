import { redirect } from 'next/navigation';
import { STATUS_TYPES } from '../model/content-item';
import { userIsEditor } from './author';
import { getCurrentUserId, requireUser } from './session';

export async function getArticles(status: string) {
  // prettier-ignore
  'use server';
  requireUser();

  const userId = await getCurrentUserId();
  const params = [];
  if (!(await userIsEditor())) {
    params.push(`createdBy=${userId}`);
  }
  if (status !== STATUS_TYPES.ALL) {
    params.push(`status=${status}`);
  }
  // Always sort by deadline, most urgent first
  params.push(`_sort=deadline&_order=asc`);

  let url = `http://localhost:3001/articles`;
  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
  console.log('url', url);
  const res = await fetch(url);
  const articles = await res.json();
  return articles;
}

export async function getArticle(id: string) {
  'use server';
  const userId = await requireUser();

  const params = [];
  if (!(await userIsEditor())) {
    params.push(`createdBy=${userId}`);
  }

  let url = `http://localhost:3001/articles/${id}`;
  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
  const res = await fetch(url);
  return await res.json();
}

type ContentItemInsert = {
  type: string;
  title: string;
  content: string;
  status: string;
  authors: string[];
  deadline: string | null;
  createdBy: string;
};

export async function createContentItem(data: ContentItemInsert) {
  'use server';
  requireUser();

  await fetch(`http://localhost:3001/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

type ContentItemUpdate = {
  title: string;
  content: string;
  status: string;
  authors: string[];
  deadline: string | null;
};

export async function updateContentItem(id: string, data: ContentItemUpdate) {
  'use server';
  requireUser();

  await fetch(`http://localhost:3001/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function deleteContentItem(id: string) {
  'use server';
  requireUser();

  await fetch(`http://localhost:3001/articles/${id}`, {
    method: 'DELETE',
  });
  redirect('/content');
}
