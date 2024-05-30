"use client";

import { Text } from "./text";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { getQuestion, getState } from "./actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {

  const [question, setQuestion] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {

    getQuestion().then((question) => {
      setQuestion(question.content);
    });

    const interval = setInterval(async () => {
      try {
        // get state, if state is not recording, redirect to /end
        const state = await getState();
        if (state !== "recording") {
          router.push("/end");
        }
      } catch (error) {
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      className="flex h-screen w-screen flex-col items-center justify-between bg-black p-10"
      href="/end"
    >
      <div className="mx-auto text-center leading-10">
        {question !== null && <Text text={question} />}
      </div>
      <div className="absolute bottom-8 flex w-screen animate-pulse flex-row items-center justify-center gap-4 text-center align-middle font-mono text-xl font-bold text-white">
        Touch anywhere to end <MoveRightIcon className="h-8 w-8" />
      </div>
    </Link>
  );
}
