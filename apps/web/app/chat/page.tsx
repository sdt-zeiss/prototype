import { SettingsIcon } from "lucide-react";
import { Button } from "@ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/components/drawer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AvatarMenu from "@/components/layout/avatar-menu";
import MobileSettings from "@/components/chat/mobile-settings";
import Settings from "@/components/chat/settings";
import Chat from "@/components/chat/chat";

export default async function ChatInterface() {
  const session = await auth();

  if (!session || !session.user) return redirect("/auth/signin");

  return (
    <div className="flex flex-col">
      <header className="bg-background sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b px-4">
        <h1 className="text-xl font-semibold">Chat</h1>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <SettingsIcon className="size-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Configuration</DrawerTitle>
              <DrawerDescription>
                Configure the settings for the AI interaction.
              </DrawerDescription>
            </DrawerHeader>
            <MobileSettings />
          </DrawerContent>
        </Drawer>
        <AvatarMenu username={session.user.email} />
      </header>
      <main className="grid flex-1 gap-4 overflow-auto md:grid-cols-2 md:p-4 lg:grid-cols-3">
        <div className="relative hidden flex-col items-start gap-8 md:flex">
          <Settings />
        </div>
        <Chat />
      </main>
    </div>
  );
}
