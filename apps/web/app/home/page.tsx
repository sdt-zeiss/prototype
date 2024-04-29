"use client";

import PostCard from "@/components/post/post-card";
import PostDialog from "@/components/post/post-dialog";
import React, { useContext, useEffect, useState } from "react";
import { Dialog } from "@ui/components/dialog";
import { getPostsWithComments } from "@/lib/actions";
import { motion, AnimatePresence } from "framer-motion";
import { PostContext } from "@/app/home/layout";

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
  comments: Comment[];
};

export default function Page() {
  const [openedPost, setOpenedPost] = useState<Post | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    getPostsWithComments().then((posts) => {
      setPosts(posts);
    });
  }, []);

  const deleteOwnPost = (posts: Post[], post: Post) => {
    return () => {
      setPosts(posts.filter((p) => p.id !== post.id));
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
                  className="w-1/3"
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
          />
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
