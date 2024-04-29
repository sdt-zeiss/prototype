"use client";

import { Post, Comment } from "@/app/home/page";
import PostContent from "@/components/post/post-content";
import { useEffect, useState } from "react";
import {
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@ui/components/dialog";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { AnimatePresence, motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@ui/components/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { commentSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComment, deleteComment } from "@/lib/actions";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";

export default function PostDialog({
  post,
  type,
  deleteOwnPost,
  setDialogOpen,
}: {
  post: Post | null;
  type: "create" | "view" | "edit";
  deleteOwnPost: () => void;
  setDialogOpen: (open: boolean) => void;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const { data: session } = useSession();

  const commentForm = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmitComment = async (data: z.infer<typeof commentSchema>) => {
    const comment = await createComment(post.id, data);
    setComments([...comments, comment]);
    commentForm.reset();
  };

  useEffect(() => {
    if (!post) return;
    setComments(post.comments);
  }, [post]);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent>
        <motion.div className="flex flex-col justify-start">
          <PostContent
            post={post}
            type={type}
            deleteOwnPost={deleteOwnPost}
            setDialogOpen={setDialogOpen}
          />

          <div>
            <div className="mt-3">
              {session && session.user && session.user.email && (
                <Form {...commentForm}>
                  <form
                    className=" flex flex-row justify-between gap-x-4 pb-4 text-black"
                    onSubmit={commentForm.handleSubmit(onSubmitComment)}
                  >
                    <FormField
                      control={commentForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Comment</Button>
                  </form>
                </Form>
              )}
            </div>
            <span className="text-lg font-bold">Comments</span>

            <div className="flex max-h-80 flex-col divide-y overflow-y-auto">
              <AnimatePresence>
                {comments &&
                  comments.map((comment) => (
                    <motion.div
                      className="w-full"
                      key={comment.id}
                      layoutId={comment.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-row items-start justify-between">
                        <div className=" flex flex-col p-5 text-base font-normal">
                          <span className="font-bold">
                            {comment.author.email}
                          </span>
                          <span className="font-light">
                            Created at {comment.createdAt.toLocaleString()}
                          </span>
                          <span>{comment.content}</span>
                        </div>
                        {session &&
                          session.user &&
                          comment.author.email === session.user.email && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-muted mt-5 mr-5 rounded-lg"
                              aria-label="Delete Post"
                              onClick={async () => {
                                const result = await deleteComment(comment.id);
                                if (result) {
                                  setComments(
                                    comments.filter((c) => c.id !== comment.id),
                                  );
                                }
                              }}
                            >
                              <Trash className="size-5" />
                            </Button>
                          )}
                      </div>
                    </motion.div>
                  ))}
                {comments && comments.length === 0 && (
                  <motion.div
                    className="w-full"
                    key={0}
                    layoutId={"1"}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    No comments yet
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </DialogPortal>
  );
}
