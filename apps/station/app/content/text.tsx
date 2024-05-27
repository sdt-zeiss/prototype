"use client";
import { TypeAnimation } from "react-type-animation";

export function Text({ text }: { text: string }) {
  return (
    <TypeAnimation
      sequence={[500, text]}
      wrapper="span"
      speed={25}
      className="font-mono text-2xl font-bold text-white"
      repeat={Infinity}
    />
  );
}
