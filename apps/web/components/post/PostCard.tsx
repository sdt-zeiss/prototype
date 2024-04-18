import { Post } from "@/app/home/page";
import PostContent from "@/components/post/PostContent";

export default function PostCard({
  post,
  onClick,
}: {
  post: Post;
  onClick: () => void;
}) {
  return (
    <div
      className="hover:scale-102 w-1/3 cursor-pointer rounded-xl bg-gray-800 p-5 text-white shadow transition ease-in-out hover:shadow-2xl"
      onClick={onClick}
    >
      <PostContent post={post} />
    </div>
  );
}
