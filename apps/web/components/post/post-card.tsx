import { Post } from "@/app/home/page";
import PostContent from "@/components/post/post-content";
import { DialogTrigger } from "@ui/components/dialog";

export default function PostCard({
  post,
  onClick,
  deleteOwnPost,
  toggleOwnLike,
  setDialogOpen,
}: {
  post: Post;
  onClick: () => void;
  deleteOwnPost: () => void;
  setDialogOpen: (open: boolean) => void;
  toggleOwnLike: () => Promise<boolean>;
}) {
  return (
    <DialogTrigger asChild>
      <div
        className="hover:scale-102 cursor-pointer rounded-xl border p-5 shadow transition ease-in-out hover:shadow-2xl"
        onClick={onClick}
      >
        <PostContent
          type="view"
          post={post}
          deleteOwnPost={deleteOwnPost}
          setDialogOpen={setDialogOpen}
          toggleOwnLike={toggleOwnLike}
        />
      </div>
    </DialogTrigger>
  );
}
