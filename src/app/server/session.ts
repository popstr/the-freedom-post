'use server';
import { currentUser } from '@clerk/nextjs/server';

export async function getCurrentUser() {
  const user = await currentUser();
  return user;
}

export async function getCurrentUserId() {
  const user = await currentUser();
  return user?.id;
}
