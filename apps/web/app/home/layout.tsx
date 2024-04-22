import NavigationBar from "@/components/layout/navigation-bar";
import { auth } from "@/auth";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex flex-col">
      <NavigationBar
        user={session.user}
        title="How to make decisions in an uncertain environment?"
      />
      <main className="">{children}</main>
    </div>
  );
}
