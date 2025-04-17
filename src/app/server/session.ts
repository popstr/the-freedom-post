'use server';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const user = await currentUser();
  return user;
}

export async function getCurrentUserId() {
  const user = await currentUser();
  return user?.id;
}

export async function requireUser(): Promise<string> {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/sign-in');
  }
  return user.id;
}
