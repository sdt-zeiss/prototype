"use client";

import { Post } from "@/app/home/page";
import PostContent from "@/components/post/PostContent";
import Input from "@/components/Input";
import { useState } from "react";

export default function PostModal({ post, onClose }: { post: Post, onClose: () => void }) {

  const [commentText, setCommentText] = useState();

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur ">
        <div className="w-1/3 bg-gray-800 text-white border-2 rounded-lg drop-shadow-2xl flex flex-col p-5">
          <div className="flex justify-end p-3">
            <button className="text-base font-normal bg-white rounded-full text-black px-3 py-1" onClick={onClose}>
              Close
            </button>
          </div>
          <PostContent post={post} />
          <div className="my-3 flex flex-row gap-x-4 justify-between text-black">
            <Input value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Add a comment" />
            <button className="text-base font-normal bg-white rounded-full text-black px-3 py-1" onClick={()=>{}}>
              Comment
            </button>
          </div>
          <div className="flex flex-col gap-y-3 mt-3">
            {post.comments.map((comment) =>
              <div className="border-2 border-white rounded-md p-5 flex flex-col text-base font-normal">
                <span>{comment.content}</span>
                <div className="flex flex-row justify-end">
                  <span>by</span>
                  <span className="font-bold">{' '}{comment.author}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
