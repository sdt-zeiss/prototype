import { BotIcon, CornerDownLeft, Mic } from "lucide-react";
import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { Label } from "@ui/components/label";
import { Textarea } from "@ui/components/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/tooltip";
import { Message, messages } from "./data";
import clsx from "clsx";
import Image from "next/image";

export default function Chat() {
  return (
    <div className="bg-muted/50 relative flex h-full max-h-[90%] min-h-[50vh] flex-col rounded-xl p-4 lg:col-span-2">
      <Badge variant="outline" className="absolute right-3 top-3">
        AI generated
      </Badge>

      <div className="max-h-full flex-1 overflow-y-auto">
        {messages.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>
      <form className="bg-background focus-within:ring-ring relative overflow-hidden rounded-lg border focus-within:ring-1">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
}

function MessageComponent({ message }: { message: Message }) {
  return (
    <div className="flex gap-2 pt-6">
      <div
        className={clsx(
          "bg-background flex max-w-[80%] flex-shrink-0 flex-row items-center gap-2 rounded-lg p-2 text-black shadow-md",
          message.from === "User" && "ml-auto",
        )}
      >
        {message.from === "User" ? (
          <Image
            src="/avatar.jpg"
            width={24}
            height={24}
            alt="Avatar"
            className="overflow-hidden rounded-full object-fill"
          />
        ) : (
          <BotIcon className="size-4 shrink-0" />
        )}
        <p>{message.content}</p>
      </div>
    </div>
  );
}
