"use server";

import { signIn, signOut } from "@/auth";
import { authSchema } from "./zod";
import { z } from "zod";

export async function submitAuthForm(data: z.infer<typeof authSchema>) {
  const user = await signIn("credentials", {
    ...data,
    redirectTo: `/dashboard?onboarding=${data.signup}`,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return user;
}

export async function signOutAndRedirect() {
  await signOut({ redirectTo: "/auth/signin" });
}
