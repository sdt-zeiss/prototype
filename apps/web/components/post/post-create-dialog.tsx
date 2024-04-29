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
import { PostContext } from "@/app/home/layout";
import { useSession } from "next-auth/react";
import { postSchema } from "@/lib/zod";

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

  async function onSubmit(data: z.infer<typeof postSchema>) {
    try {
      const post = await createPost(data);
      setPosts([
        {
          ...post,
          author: { email: session.user.email },
          comments: [],
        },
        ...posts,
      ]);
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Invalid post",
        description: "Please check your post and try again.",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col justify-start space-y-2"
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
