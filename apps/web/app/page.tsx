import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { PrimaryFeatures } from "@/components/landing/PrimaryFeatures";
import { CallToAction } from "@/components/landing/CallToAction";
import { TheTeam } from "@/components/landing/Team";
import { Footer } from "@/components/landing/Footer";
import Content from "@/components/landing/Content";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <Content />
        <CallToAction />
        <TheTeam />
      </main>
      <Footer />
    </>
  );
}
