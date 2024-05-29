"use client";
import { MoveRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const leftEye = [
  {
    x: 10,
    y: 4,
  },
  {
    x: 11,
    y: 4,
  },
  {
    x: 12,
    y: 4,
  },
  {
    x: 13,
    y: 4,
  },
  {
    x: 14,
    y: 5,
  },
  {
    x: 15,
    y: 6,
  },
  {
    x: 16,
    y: 7,
  },
  {
    x: 16,
    y: 8,
  },
  {
    x: 16,
    y: 9,
  },
  {
    x: 16,
    y: 10,
  },
  {
    x: 15,
    y: 11,
  },
  {
    x: 14,
    y: 12,
  },
  {
    x: 13,
    y: 13,
  },
  {
    x: 12,
    y: 13,
  },
  {
    x: 11,
    y: 13,
  },
  {
    x: 10,
    y: 13,
  },
  {
    x: 9,
    y: 12,
  },
  {
    x: 8,
    y: 11,
  },
  {
    x: 7,
    y: 10,
  },
  {
    x: 7,
    y: 9,
  },
  {
    x: 7,
    y: 8,
  },
  {
    x: 7,
    y: 7,
  },
  {
    x: 8,
    y: 6,
  },
  {
    x: 9,
    y: 5,
  },
];

const mouth = [
  {
    x: 18,
    y: 17,
  },
  {
    x: 19,
    y: 18,
  },
  {
    x: 20,
    y: 18,
  },
  {
    x: 21,
    y: 18,
  },
  {
    x: 22,
    y: 17,
  },
];

const pupilLeft = [
  {
    x: 11,
    y: 10,
  },
  {
    x: 11,
    y: 9,
  },
  {
    x: 11,
    y: 8,
  },
  {
    x: 11,
    y: 7,
  },
  {
    x: 12,
    y: 10,
  },
  {
    x: 12,
    y: 9,
  },
  {
    x: 12,
    y: 8,
  },
  {
    x: 12,
    y: 7,
  },

  {
    x: 10,
    y: 9,
  },
  {
    x: 10,
    y: 8,
  },
  {
    x: 13,
    y: 9,
  },
  {
    x: 13,
    y: 8,
  },
];

const pupilRight = pupilLeft.map((pos) => ({
  x: 40 - pos.x,
  y: pos.y,
}));

const rightEye = leftEye.map((pos) => ({
  x: 40 - pos.x,
  y: pos.y,
}));

const positions = [...leftEye, ...rightEye, ...mouth];

const pupilTransformations = [
  function moveFarLeft({ x, y }: { x: number; y: number }) {
    return {
      x: x - 2,
      y: y,
    };
  },
  function moveMiddle({ x, y }: { x: number; y: number }) {
    return {
      x: x,
      y: y,
    };
  },
  function moveFarRight({ x, y }: { x: number; y: number }) {
    return {
      x: x + 2,
      y: y,
    };
  },
];

export default function Page() {
  const [pupilPositions, setPupilPositions] = useState<typeof pupilLeft>([
    ...pupilLeft,
    ...pupilRight,
  ]);

  const router = useRouter();

  const [q, setQ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      /*
        fetch("http://localhost:8000/quadrant")
          .then((res) => res.json())
          .then((data: { quadrant: number }) => {
            const transformation = pupilTransformations[data.quadrant - 1];
            setQ(data.quadrant);
            setPupilPositions(
              [...pupilLeft, ...pupilRight].map((pos) => transformation(pos)),
            );
          });
          */
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="grid-cols-40 grid-rows-24 grid h-screen w-screen items-center justify-center bg-black"
      onClick={() => {
        router.push("/content");
      }}
    >
      {positions.map((pos, index) => (
        <div
          key={index}
          className={`col-span-1 row-span-1 h-full w-full bg-white`}
          style={{
            gridColumnStart: pos.x,
            gridRowStart: pos.y,
          }}
        />
      ))}

      {pupilPositions.map((pos, index) => (
        <div
          key={index}
          className={`col-span-1 row-span-1 h-full w-full bg-white`}
          style={{
            gridColumnStart: pos.x,
            gridRowStart: pos.y,
          }}
        />
      ))}
      <div className="absolute bottom-8 flex w-screen animate-pulse flex-row items-center justify-center gap-4 text-center align-middle font-mono text-4xl font-bold text-white">
        Touch anywhere to get started <MoveRightIcon className="h-8 w-8" />
      </div>
    </div>
  );
}
