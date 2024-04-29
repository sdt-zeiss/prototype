import { Post } from "@/app/home/page";
import { createContext } from "react";

interface PostContextType {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

export const PostContext = createContext<PostContextType | undefined>({
  posts: [],
  setPosts: (posts: Post[]) => {},
});
