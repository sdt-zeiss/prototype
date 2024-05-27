import { prisma } from "database";
import { Text } from "./text";
import Record from "./record";

export default async function Page() {
  const question = await prisma.post.findFirst({
    where: {
      type: "Discussion",
    },
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between bg-black p-10">
      <div className="mx-auto text-center leading-10">
        <Text text={question.content} />
      </div>
      <Record />
    </div>
  );
}
