import { Text } from "./text";
import Record from "./record";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { prisma } from "database";

export default async function Page() {
  const question = await prisma.post.findFirst({
    where: {
      type: "Discussion",
    },
  });

  return (
    <Link
      className="flex h-screen w-screen flex-col items-center justify-between bg-black p-10"
      href="/end"
    >
      <div className="mx-auto text-center leading-10">
        <Text text={question.content} />
      </div>
      <div className="absolute bottom-8 flex w-screen animate-pulse flex-row items-center justify-center gap-4 text-center align-middle font-mono text-xl font-bold text-white">
        Touch anywhere to end <MoveRightIcon className="h-8 w-8" />
      </div>
    </Link>
  );
}
