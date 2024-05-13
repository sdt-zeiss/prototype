"use client";

import PostCard from "@/components/post/post-card";
import PostDialog from "@/components/post/post-dialog";
import React, { useContext, useEffect, useState } from "react";
import { Dialog } from "@ui/components/dialog";
import { createLike, deleteLike, getPostsWithComments } from "@/lib/actions";
import { motion, AnimatePresence } from "framer-motion";
import { PostContext } from "@/contexts/PostContext";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import OnboardingDialog from "@/components/onboarding/onboarding-dialog";

export type Comment = {
  content: string;
  id: string;
  author: { email: string };
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  type: string;
  author: { email: string };
  likes: { id: string; user: { email: string } }[];
  comments: Comment[];
};

export default function Page() {
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);
  const { data: session } = useSession();

  const { posts, setPosts } = useContext(PostContext);

  const searchParams = useSearchParams();

  useEffect(() => {
    setIsOnboarding(searchParams.get("onboarding") === "true");
  }, [searchParams]);

  useEffect(() => {
    getPostsWithComments().then((posts) => {
      setPosts(posts);
    });
  }, [setPosts]);

  const deleteOwnPost = (posts: Post[], post: Post) => {
    return () => {
      setPosts(posts.filter((p) => p.id !== post.id));
    };
  };

  const toggleOwnLike = (posts: Post[], post: Post) => {
    return async () => {
      if (post.likes.some((like) => like.user.email === session.user.email)) {
        await deleteLike(post.id);
        post.likes = post.likes.filter(
          (like) => like.user.email !== session.user.email,
        );
      } else {
        const like = await createLike(post.id);
        post.likes.push({ id: like.id, user: { email: session.user.email } });
      }
      const newPosts = [...posts.filter((p) => p.id !== post.id), post];
      newPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      setPosts(newPosts);
      return true;
    };
  };

  return (
    <div className="flex items-center text-2xl font-bold">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="mt-2 flex w-full flex-col items-center gap-y-2">
          <AnimatePresence>
            {posts &&
              posts.map((post) => (
                <motion.div
                  className="mx-4 lg:mx-0 lg:w-1/3"
                  key={post.id}
                  layoutId={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <PostCard
                    post={post}
                    onClick={() => setOpenedPost(post)}
                    deleteOwnPost={deleteOwnPost(posts, post)}
                    setDialogOpen={setDialogOpen}
                    toggleOwnLike={toggleOwnLike(posts, post)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          <PostDialog
            type={"view"}
            post={openedPost}
            setDialogOpen={setDialogOpen}
            deleteOwnPost={deleteOwnPost(posts, openedPost)}
            toggleOwnLike={toggleOwnLike(posts, openedPost)}
          />
        </AnimatePresence>
        <Dialog open={isOnboarding} onOpenChange={setIsOnboarding}>
          <AnimatePresence>
            <OnboardingDialog setDialogOpen={setIsOnboarding} />
          </AnimatePresence>
        </Dialog>
      </Dialog>
    </div>
  );
}
