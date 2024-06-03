import Image from "next/image";
import { Container } from "@/components/landing/Container";
import { Button } from "@/components/landing/Button";

import backgroundImage from "@/public/landing/background.jpg";

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Visit the home feed now and explore what{" "}
            <span className="font-medium">InsightsOut</span> has to offer for
            you.
          </p>
          <Button href="/register" color="white" className="mt-10">
            Go to home feed
          </Button>
        </div>
      </Container>
    </section>
  );
}
