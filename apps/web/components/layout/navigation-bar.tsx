"use client";

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
import Link from "next/link";
import { Logo } from "@/components/landing/Logo";

export default function NavigationBar({
  user,
  title,
}: {
  user: User | undefined;
  title: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl flex-row items-center justify-between p-6 lg:gap-x-12 lg:px-8">
        <span
          onClick={() => (window.location.href = "/home")}
          className="cursor-pointer text-2xl font-bold lg:justify-start"
        >
          <Logo />
        </span>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <AvatarMenu username={user.email} />
          ) : (
            <Link
              href="/auth/signin"
              className="ring-offset-background focus-visible:ring-ring text-primary inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="text-md text-base font-medium">Sign In</span>
            </Link>
          )}
        </div>
      </nav>
      <nav className="mx-auto flex max-w-7xl flex-col items-center justify-between p-6 md:flex-row lg:gap-x-12 lg:px-8">
        <span className="text-xl font-bold lg:justify-start">{title}</span>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-2 w-full md:mt-0 md:w-fit">
              <span className="text-md text-base font-medium ">
                Create Post
              </span>
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
