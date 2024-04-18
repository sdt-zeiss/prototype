"use server";

import { signIn } from "@/auth";
import { authSchema } from "./zod";
import { z } from "zod";

export async function submitAuthForm(data: z.infer<typeof authSchema>) {
  const user = await signIn("credentials", {
    ...data,
    redirectTo: "/dashboard",
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return user;
}
