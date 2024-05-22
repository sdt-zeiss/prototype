"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Post } from "@/app/home/page";
import { getProfile, getUnreviewedPosts, reviewPost } from "@/lib/actions";
import PostContent from "@/components/post/post-content";
import { Button } from "@ui/components/button";
import { useToast } from "@ui/components/use-toast";
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // State to manage button disabled state

  // get unreviewed posts on page load
  useEffect(() => {
    getProfile().then((profile) => {
      if (!profile || profile.type !== "Admin") {
        window.location.href = "/home";
      }
      getUnreviewedPosts().then((posts) => {
        console.log("posts");
        setPosts(posts);
      });
    });
  }, []);

  const { toast } = useToast();

  const onSubmitUpload = async (event) => {
    event.preventDefault();
    const endpoint = "https://prototype-ai.sliplane.app/analyze-audio";
    const formData = new FormData();
    formData.append("audio_file", file);

    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an audio or video file to upload",
      });
      return;
    }

    setIsUploading(true); // Disable the button

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          toast({
            title: "Upload successful",
            description: "Your file has been uploaded successfully",
          });
          console.log(result); // Handle the response data
        } else {
          const errorData = await response.json();
          toast({
            title: "Upload failed",
            description: errorData.error || "Your file could not be uploaded",
          });
        }
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "An error occurred while uploading the file",
        });
        console.error("Error uploading file:", error);
      } finally {
        setIsUploading(false); // Re-enable the button
      }
    // if (response.ok) {
    //   toast({
    //     title: "Upload successful",
    //     description: "Your audio has been uploaded successfully",
    //   });
    // } else {
    //   toast({
    //     title: "Upload failed",
    //     description: "Your audio could not be uploaded",
    //   });
    // }
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an audio or video file to upload",
      });
      return;
    }

    // Constrain filetypes to be one of the following
    const allowedTypes = ["audio/mp3", "audio/mpeg", "audio/wav", "audio/ogg", "video/mp4", "video/webm"];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid audio or video file",
      });
      return;
    }

    setFile(selectedFile);
    toast({
      title: "File selected",
      description: `Your file ${selectedFile.name} has been selected`,
    });
  };

  const approvePostFunction = (postId: string) => {
    return async () => {
      await reviewPost(postId, "ai_generated_approved");
      setPosts(posts.filter((post) => post.id !== postId));
      toast({
        title: "Post approved",
        description: "The post has been approved",
      });
    };
  };

  const rejectPostFunction = (postId: string) => {
    return async () => {
      await reviewPost(postId, "ai_generated_rejected");
      setPosts(posts.filter((post) => post.id !== postId));
      toast({
        title: "Post rejected",
        description: "The post has been rejected",
      });
    };
  };

  return (
    <div className="mt-2 flex w-full flex-col items-center gap-y-8">
      <div className="mt-8 flex flex-col items-center gap-y-4 lg:mx-0 lg:w-1/3">
        <h2 className="text-2xl font-bold">Upload new audio</h2>
        <div className="mx-4 flex w-full cursor-pointer items-center justify-around rounded-xl border p-5 shadow">
          <form
            className="flex w-full flex-row items-center justify-between gap-x-4 text-black"
            onSubmit={onSubmitUpload}
          >
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="absolute h-0 w-0"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Upload File
              </label>
            </div>
            {file && <span>{file.name}</span>}
            <Button type="submit" disabled={isUploading}>Upload</Button>
          </form>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center gap-y-4 lg:mx-0 lg:w-1/3">
        <h2 className="text-2xl font-bold">Pending reviews for posts</h2>
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              className="w-fill flex flex-col gap-y-2 rounded-xl border p-5 shadow"
              key={post.id}
              layoutId={post.id}
            >
              <PostContent
                post={post}
                type="review"
                deleteOwnPost={undefined}
                setDialogOpen={undefined}
                toggleOwnLike={undefined}
              />
              <div className="flex flex-row items-center justify-between gap-4">
                <Button
                  className="rounded-lg"
                  onClick={approvePostFunction(post.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  className="rounded-lg"
                  onClick={rejectPostFunction(post.id)}
                >
                  Reject
                </Button>
              </div>
            </motion.div>
          ))}
          {posts.length === 0 && (
            <motion.div
              className="mx-4 w-full cursor-pointer rounded-xl border p-5 shadow"
              key={"0"}
              layoutId={"0"}
            >
              <span>No posts to review</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
