import { Post } from "@/app/home/page";

export default function PostContent({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-y-2">
      <span className="w-3/4 text-2xl font-bold">{post.title}</span>
      <span className="bg-primary text-primary-foreground w-min rounded-full px-3 py-1 text-base">
        {post.type}
      </span>
      <span className="text-sm font-normal">{post.content}</span>
      <div className="flex flex-row justify-between">
        <div>
          <span className="text-base font-normal">by </span>
          <span className="text-base font-bold">{post.author}</span>
        </div>
        <div className="text-base font-normal">
          <span>{post.likes} Likes</span>
          <span className="mx-2">•</span>
          <span>{post.comments.length} Comments</span>
        </div>
      </div>
    </div>
  );
}
