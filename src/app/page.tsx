import { Calculators } from "@/components/Calculators";
import { ClientLoginProvider } from "@/components/ClientLogin";
import { GetInTouch } from "@/components/GetInTouch";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { LogoMarquee } from "@/components/LogoMarquee";
import { QuoteBand } from "@/components/QuoteBand";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatWeDo } from "@/components/WhatWeDo";
import { PositioningBand, WhoWeAre } from "@/components/WhoWeAre";

export default function Home() {
  return (
    <ClientLoginProvider>
      <SiteHeader />
      <main>
        <Hero />
        <LogoMarquee />
        <PositioningBand />
        <WhoWeAre />
        <QuoteBand />
        <WhatWeDo />
        <Services />
        <Calculators />
        <HowWeWork />
        <GetInTouch />
      </main>
      <SiteFooter />
    </ClientLoginProvider>
  );
}
