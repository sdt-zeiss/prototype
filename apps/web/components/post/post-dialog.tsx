"use client";

import { Post } from "@/app/home/page";
import PostContent from "@/components/post/post-content";
import { useState } from "react";
import {
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@ui/components/dialog";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";

export default function PostDialog({
  post,
}: {
  post: Post;
  onClose: () => void;
}) {
  const [commentText, setCommentText] = useState<string>("");

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent>
        <div className="flex flex-col justify-start">
          <PostContent post={post} />
          <div className="mt-3 flex flex-row justify-between gap-x-4 border-b pb-4 text-black">
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
            />
            <Button onClick={() => {}}>Comment</Button>
          </div>
          <div className="flex flex-col divide-y">
            {post.comments.map((comment) => (
              <div
                className="flex flex-col p-5 text-base font-normal"
                key={comment.author + comment.content}
              >
                <span className="font-bold"> {comment.author}</span>
                <span>{comment.content}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  );
}
