import { Post } from "@/app/home/page";

export default function PostContent({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-y-2">
        <span className="text-2xl w-3/4">
            {post.title}
          </span>
      <span className="bg-white text-black text-base rounded-full px-3 py-1 w-min">
            {post.type}
          </span>
      <span className="text-sm font-normal">
            {post.content}
          </span>
      <div className="flex flex-row justify-between">
        <div>
          <span className="font-normal text-base">by </span>
          <span className="font-bold text-base">{post.author}</span>
        </div>
        <div className="font-normal text-base">
          <span>{post.likes} Likes</span>
          <span className="mx-2">•</span>
          <span>{post.comments.length} Comments</span>
        </div>
      </div>
    </div>
  );
}
