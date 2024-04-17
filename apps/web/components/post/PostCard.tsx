import { Post } from "@/app/home/page";
import PostContent from "@/components/post/PostContent";


export default function PostCard({ post, onClick }: { post: Post, onClick: () => void }) {

  return (
    <div
      className="w-1/3 rounded-xl bg-gray-800 p-5 text-white shadow hover:shadow-2xl hover:scale-102 transition ease-in-out cursor-pointer"
      onClick={onClick}>
      <PostContent post={post} />
    </div>
  );
}
