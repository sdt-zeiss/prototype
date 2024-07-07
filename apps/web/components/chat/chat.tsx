"use client";
import { BotIcon, SendHorizonal } from "lucide-react";
import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import { Label } from "@ui/components/label";
import { Textarea } from "@ui/components/textarea";
import { Message } from "./data";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "System",
      content:
        "Hello! I'm here to assist you with any questions you have regarding the discussions held at InsightsOut. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      from: "User",
      content: input,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput("");

    const chatEndpoint = "https://prototype-ai.sliplane.app/ask";

    try {
      const response = await fetch(chatEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const botMessage: Message = {
        id: Date.now() + 1,
        from: "System",
        content: data.answer,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event);
    }
  };

  return (
    <div>
      <div className="bg-muted/50 mb-[74px] flex h-full min-h-[50vh] flex-col gap-2 rounded-xl p-4 lg:col-span-2">
        <Badge variant="outline" className="ml-auto">
          AI generated
        </Badge>

        {messages.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>
      <div className="fixed bottom-2 right-4 left-4 h-[66px]">
        <form
          className="bg-background focus-within:ring-ring flex w-full flex-grow-0 overflow-hidden rounded-lg border shadow-md focus-within:ring-1"
          onSubmit={handleSubmit}
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            value={input}
            // onChange={(e) => setInput(e.target.value)}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center p-3 pt-0">
            <Button type="submit" size="icon" className="ml-auto gap-1.5">
              <SendHorizonal />
            </Button>
          </div>
        </form>
      </div>
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
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
      </div>
    </div>
  );
}
