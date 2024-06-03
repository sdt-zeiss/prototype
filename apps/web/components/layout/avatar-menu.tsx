"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/dropdown-menu";
import { Button } from "@ui/components/button";
import Image from "next/image";
import { signOutAndRedirect } from "@/lib/actions";
import { useState } from "react";
import SettingsDialog from "@/components/settings/settings-dialog";
import { Dialog } from "@ui/components/dialog";

export default function AvatarMenu({ username }: { username: string }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto overflow-hidden rounded-full"
          >
            <Image
              src="/avatar.jpg"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full object-fill"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              window.location.href = "/chat";
            }}
          >
            Chat
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signOutAndRedirect();
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SettingsDialog setDialogOpen={setIsSettingsOpen} />
    </Dialog>
  );
}
