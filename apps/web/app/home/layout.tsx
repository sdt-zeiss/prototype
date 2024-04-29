"use client";

import NavigationBar from "@/components/layout/navigation-bar";
import { useSession } from "next-auth/react";
import { Post } from "@/app/home/page";
import { createContext, useState } from "react";

export const PostContext = createContext({
  posts: [] as Post[],
  setPosts: (posts: Post[]) => {},
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  const [posts, setPosts] = useState<Post[]>();

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      <div className="flex flex-col">
        <NavigationBar
          user={session && session.user ? session.user : undefined}
          title="How to make decisions in an uncertain environment?"
        />
        <main className="">{children}</main>
      </div>
    </PostContext.Provider>
  );
}
