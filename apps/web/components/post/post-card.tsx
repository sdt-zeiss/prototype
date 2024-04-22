import { Post } from "@/app/home/page";
import PostContent from "@/components/post/post-content";
import { DialogTrigger } from "@ui/components/dialog";

export default function PostCard({
  post,
  onClick,
}: {
  post: Post;
  onClick: () => void;
}) {
  return (
    <DialogTrigger asChild>
      <div
        className="hover:scale-102 w-1/3 cursor-pointer rounded-xl border p-5 shadow transition ease-in-out hover:shadow-2xl"
        onClick={onClick}
      >
        <PostContent post={post} />
      </div>
    </DialogTrigger>
  );
}
