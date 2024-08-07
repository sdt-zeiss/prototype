"use client";

import { useContext } from "react";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Textarea } from "@ui/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@ui/components/select";
import { useToast } from "@ui/components/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/lib/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/form";
import { useSession } from "next-auth/react";
import { postSchema } from "@/lib/zod";
import { PostContext } from "@/contexts/PostContext";
import { Post } from "@/app/home/page";

export default function PostCreateDialog({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
}) {
  const { toast } = useToast();

  const { posts, setPosts } = useContext(PostContext);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      type: "Question",
    },
  });

  function getImageDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function onSubmit(data: z.infer<typeof postSchema>) {
    try {
      const post = await createPost({
        content: data.content,
        title: data.title,
        type: data.type,
        imageDataUrl:
          data.image.length > 0
            ? await getImageDataUrl(data.image.item(0))
            : undefined,
      });
      console.log(post);
      const modifiedPost: Post = {
        ...post,
        author: { email: session.user.email },
        comments: [],
        likes: [],
      };
      setPosts([modifiedPost, ...posts]);
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Invalid post",
        description: "Please check your post and try again.",
      });
    }
  }

  const fileRef = form.register("image");

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col justify-start space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Image (optional)</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="shadcn" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Type</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      {field.value ?? "Select Type..."}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"Question"}>Question</SelectItem>
                      <SelectItem value={"Discussion"}>Discussion</SelectItem>
                      <SelectItem value={"Story"}>Story</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
}
