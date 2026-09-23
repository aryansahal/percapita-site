import { Calculators } from "@/components/Calculators";
import { ClientLoginProvider } from "@/components/ClientLogin";
import { Faqs } from "@/components/Faqs";
import { GetInTouch } from "@/components/GetInTouch";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { InsightsTiles } from "@/components/InsightsTiles";
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
        {/* Client-specified order, Sept 2026. What We Do and Services move
            up ahead of mindset and commitment, so the page says what
            Percapita does before it says what Percapita believes. */}
        <Hero />
        <NavMarquee />
        <PositioningBand />
        <WhoWeAre />
        <SparkStory />
        <WhatWeDo />
        <Services />
        <Values />
        <QuoteBand />
        <Calculators />
        <HowWeWork />
        <InsightsTiles />
        <GetInTouch />
        <Faqs />
        <LogoMarquee />
      </main>
      <SiteFooter />
    </ClientLoginProvider>
  );
}
