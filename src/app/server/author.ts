import { Author } from '../model/content-item';
import { getCurrentUser } from './session';

export const getAuthors = async () => {
  const res = await fetch('http://localhost:3001/authors');
  const authors = await res.json();
  return authors;
};

export const getAuthorByEmail = async (email: string) => {
  const authors = await getAuthors();
  return authors.find((author: Author) => author.email === email);
};

export const userIsEditor = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  if (!user) {
    return false;
  }
  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) {
    return false;
  }
  const author = await getAuthorByEmail(email);
  console.log('author', author);
  console.log('author?.role', author?.role);
  return author?.role === 'editor';
};
