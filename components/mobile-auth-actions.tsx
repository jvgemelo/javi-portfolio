'use server';

import { signOutAction } from "@/app/actions";

export async function handleSignOut() {
  return signOutAction();
} 