"use server"

import { prisma } from "database";

export async function getQuestion() {
  const question = await prisma.post.findFirst({
    where: {
      type: "Discussion",
    },
  });

  return question;
}

export async function getState() {
  const res = await fetch("http://localhost:8000/state");
  const json = await res.json();

  return json.state;
}
