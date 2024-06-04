import { TooltipProvider } from "@ui/components/tooltip";

export default function ChatLayout({ children }) {
  return (
    <TooltipProvider>
      <div className="grid h-screen w-full">{children}</div>
    </TooltipProvider>
  );
}
