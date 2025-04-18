'use server';
import { currentUser } from '@clerk/nextjs/server';

export async function getCurrentUser() {
  const user = await currentUser();
  return user;
}

export async function getCurrentUserId(): Promise<string> {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found');
  }
  return user.id;
}
