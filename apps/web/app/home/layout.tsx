"use client";

import NavigationBar from "@/components/layout/navigation-bar";
import { useSession } from "next-auth/react";
import { Post } from "@/app/home/page";
import { Suspense, useState } from "react";
import { PostContext } from "@/contexts/PostContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      <Suspense>
        <div className="flex flex-col">
          <NavigationBar
            user={session?.user}
            title="How to make decisions in an uncertain environment?"
          />
          <main className="">{children}</main>
        </div>
      </Suspense>
    </PostContext.Provider>
  );
}
