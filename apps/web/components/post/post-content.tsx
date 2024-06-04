import { Post } from "@/app/home/page";
import { Button } from "@ui/components/button";
import { deletePost } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { ThumbsUp, Trash, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatDistance } from "date-fns";

export default function PostContent({
  post,
  type,
  deleteOwnPost,
  setDialogOpen,
  toggleOwnLike,
  truncateContent,
}: {
  post: Post;
  type: "create" | "view" | "edit" | "review";
  deleteOwnPost: () => void;
  setDialogOpen: (open: boolean) => void;
  toggleOwnLike: () => Promise<boolean>;
  truncateContent?: boolean;
}) {
  const { data: session, status } = useSession();

  return (
    <motion.div className="flex flex-col gap-y-2">
      <motion.div className=" flex flex-row items-center justify-between">
        <motion.span className="line-clamp-2 text-2xl font-bold">
          {post.title}
        </motion.span>
      </motion.div>
      <div className="flex flex-row items-center gap-4">
        <motion.span className="bg-primary text-primary-foreground w-min rounded-full px-3 py-1 text-base">
          {post.type}
        </motion.span>
        <span className="flex-grow"></span>
        {status === "authenticated" && type !== "review" && (
          <Button
            variant="ghost"
            size="icon"
            className="bg-muted rounded-lg"
            aria-label="Like Post"
            onClick={async (event) => {
              event.stopPropagation();
              await toggleOwnLike();
            }}
          >
            <ThumbsUp
              className="size-5"
              fill={
                post.likes.find(
                  (like) => like.user.email === session.user.email,
                ) !== undefined
                  ? "black"
                  : "none"
              }
            />
          </Button>
        )}
        {status === "authenticated" &&
          type !== "review" &&
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
      </div>
      <div
        className={`flex flex-col gap-y-1 lg:gap-y-2 ${!truncateContent ? "max-h-[38vh] overflow-auto" : ""}`}
      >
        {post.imageId && (
          <motion.div>
            <Image
              className="rounded-xl"
              src={`/api/images/${post.imageId}`}
              alt={post.title}
              width={1000}
              height={500}
            />
          </motion.div>
        )}
        <motion.span className="text-sm font-normal">
          {post.content}
        </motion.span>
      </div>
      <motion.div className="flex flex-row justify-between">
        <div className="... flex max-w-[<70vw] flex-row items-center justify-start gap-1 text-sm font-normal">
          <span className="text-sm font-normal">by</span>
          <span className="truncate text-sm font-bold">
            {post.author.email.split("@")[0]}
          </span>
          {formatDistance(post.createdAt, new Date(), { addSuffix: true })}
        </div>
        {type !== "review" && (
          <div className="flex flex-row text-base font-normal lg:flex-row">
            <div className="flex flex-row items-center gap-x-2">
              {post.likes.length}
              <ThumbsUp size="20" />{" "}
            </div>
            <span className="mx-2">•</span>
            <div className="flex flex-row items-center gap-x-2">
              {post.comments ? post.comments.length : 0}{" "}
              <MessageCircle size="20" />
            </div>
          </div>
        )}
      </motion.div>
      <motion.span className="text-sm font-normal"></motion.span>
    </motion.div>
  );
}
