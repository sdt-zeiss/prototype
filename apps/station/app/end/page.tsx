"use client";

import { MoveRightIcon } from "lucide-react";
import QRCode from "react-qr-code";
import randomAnimalName from "random-animal-name";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function createAnonymousUser() {
  const randomAnimal = randomAnimalName();
  const slug = randomAnimal.toLowerCase().replaceAll(" ", "-");
  const email = `anonymous-${slug}@insightsout.sliplane.app`;

  const password = generateRandomPassword();

  return {
    email,
    password,
  };
}

function generateRandomPassword() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export default function Page() {
  const user = createAnonymousUser();
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        fetch("http://localhost:8000/reset", { method: "POST" })
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const qrCode = `https://insightsout.sliplane.app/auth/signin?email=${user.email}&token=${user.password}&signup=true`;
  return (
    <Link className="flex h-screen w-screen flex-col items-center justify-center gap-8 bg-black" href="/">
      <div className="flex w-screen flex-row items-center justify-center gap-4 text-center align-middle font-mono text-xl font-bold text-white">
        Join our platform! <br />
      </div>
      <QRCode value={qrCode} bgColor="#000" fgColor="#FFA500" />
      <div className="flex w-screen flex-row items-center justify-center gap-4 text-center align-middle font-mono text-xl font-bold text-white">
        Touch anywhere to start again <MoveRightIcon className="h-8 w-8" />
      </div>
    </Link>
  );
}
