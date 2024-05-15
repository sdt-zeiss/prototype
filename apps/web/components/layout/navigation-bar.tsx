"use client";

import { Input } from "@ui/components/input";
import React, { useState } from "react";
import { Button } from "@ui/components/button";
import { User } from "next-auth";
import AvatarMenu from "@/components/layout/avatar-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/dialog";
import PostCreateDialog from "@/components/post/post-create-dialog";

export default function NavigationBar({
  user,
  title,
}: {
  user: User | undefined;
  title: string;
}) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl flex-row items-center justify-around p-6 lg:gap-x-12 lg:px-8">
        <span className="text-2xl font-bold lg:justify-start">InsightOut</span>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <AvatarMenu username={user.email} />
          ) : (
            <Button>
              <span className="text-md text-base font-medium">Sign In</span>
            </Button>
          )}
        </div>
      </nav>
      <nav className="mx-auto flex max-w-7xl flex-row items-center justify-between p-6 lg:gap-x-12 lg:px-8">
        <span className="text-xl font-bold lg:justify-start">{title}</span>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <span className="text-md text-base font-medium">Create Post</span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>Create Post</DialogTitle>
            <PostCreateDialog setDialogOpen={setDialogOpen} />
          </DialogContent>
        </Dialog>
      </nav>
    </header>
  );
}
