import { Post } from "@/app/home/page";
import { Button } from "@ui/components/button";
import { deletePost } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { Trash } from "lucide-react";
import { motion } from "framer-motion";

export default function PostContent({
  post,
  deleteOwnPost,
  setDialogOpen,
}: {
  post: Post;
  type: "create" | "view" | "edit";
  deleteOwnPost: () => void;
  setDialogOpen: (open: boolean) => void;
}) {
  const { data: session, status } = useSession();

  return (
    <motion.div className="flex flex-col gap-y-2">
      <motion.div className="mr-6 flex flex-row justify-between">
        <motion.span className="w-3/4 text-2xl font-bold">
          {post.title}
        </motion.span>
        {status === "authenticated" &&
          session.user.email === post.author.email && (
            <Button
              variant="ghost"
              size="icon"
              className="bg-muted rounded-lg"
              aria-label="Delete Post"
              onClick={async (event) => {
                event.stopPropagation();
                setDialogOpen(false);
                deleteOwnPost();
                await deletePost(post.id);
              }}
            >
              <Trash className="size-5" />
            </Button>
          )}
      </motion.div>

      <motion.span className="bg-primary text-primary-foreground w-min rounded-full px-3 py-1 text-base">
        {post.type}
      </motion.span>
      <motion.span className="text-sm font-normal">{post.content}</motion.span>
      <motion.div className="flex flex-row justify-between">
        <div className="flex flex-row items-center justify-start gap-1">
          <span className="text-base font-normal">by</span>
          <span className="text-base font-bold">{post.author.email}</span>
        </div>
        <div className="text-base font-normal">
          <span>{0} Likes</span>
          <span className="mx-2">•</span>
          <span>{post.comments ? post.comments.length : 0} Comments</span>
        </div>
      </motion.div>
      <motion.span className="text-sm font-normal">
        {post.createdAt.toLocaleString()}
      </motion.span>
    </motion.div>
  );
}
