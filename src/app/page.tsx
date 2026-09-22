import { Calculators } from "@/components/Calculators";
import { ClientLoginProvider } from "@/components/ClientLogin";
import { GetInTouch } from "@/components/GetInTouch";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { LogoMarquee } from "@/components/LogoMarquee";
import { NavMarquee } from "@/components/NavMarquee";
import { QuoteBand } from "@/components/QuoteBand";
import { Services } from "@/components/Services";
import { SparkStory } from "@/components/SparkStory";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Values } from "@/components/Values";
import { WhatWeDo } from "@/components/WhatWeDo";
import { PositioningBand, WhoWeAre } from "@/components/WhoWeAre";

export default function Home() {
  return (
    <ClientLoginProvider>
      <SiteHeader />
      <main>
        <Hero />
        <NavMarquee />
        <PositioningBand />
        <WhoWeAre />
        <SparkStory />
        <Values />
        <QuoteBand />
        <WhatWeDo />
        <Services />
        <Calculators />
        <HowWeWork />
        <GetInTouch />
        <LogoMarquee />
      </main>
      <SiteFooter />
    </ClientLoginProvider>
  );
}
