import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session.user) return null; // this means that the user is not authenticated!

  return (
    <div className="mx-auto flex h-screen w-screen flex-col items-center justify-center font-mono text-2xl">
      <span>{session.user.email}</span>
      <span>{session.expires}</span>
    </div>
  );
}
