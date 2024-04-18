"use client";

import { Post } from "@/app/home/page";
import PostContent from "@/components/post/PostContent";
import Input from "@/components/Input";
import { useState } from "react";

export default function PostModal({
  post,
  onClose,
}: {
  post: Post;
  onClose: () => void;
}) {
  const [commentText, setCommentText] = useState();

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur ">
        <div className="flex w-1/3 flex-col rounded-lg border-2 bg-gray-800 p-5 text-white drop-shadow-2xl">
          <div className="flex justify-end p-3">
            <button
              className="rounded-full bg-white px-3 py-1 text-base font-normal text-black"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <PostContent post={post} />
          <div className="my-3 flex flex-row justify-between gap-x-4 text-black">
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
            />
            <button
              className="rounded-full bg-white px-3 py-1 text-base font-normal text-black"
              onClick={() => {}}
            >
              Comment
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-y-3">
            {post.comments.map((comment) => (
              <div
                className="flex flex-col rounded-md border-2 border-white p-5 text-base font-normal"
                key={comment.author + comment.content}
              >
                <span>{comment.content}</span>
                <div className="flex flex-row justify-end">
                  <span>by</span>
                  <span className="font-bold"> {comment.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
