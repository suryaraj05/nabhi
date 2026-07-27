import Atmosphere from "@/components/Atmosphere";
import JsonLd from "@/components/seo/JsonLd";
import Ch01Arrival from "@/components/sections/Ch01Arrival";
import Ch02Philosophy from "@/components/sections/Ch02Philosophy";
import Ch03SecondBrain from "@/components/sections/Ch03SecondBrain";
import Ch04WhatWeBuild from "@/components/sections/Ch04WhatWeBuild";
import Ch05Intelligence from "@/components/sections/Ch05Intelligence";
import Ch06Proof from "@/components/sections/Ch06Proof";
import Ch07WhyNabhi from "@/components/sections/Ch07WhyNabhi";
import Ch08OurStory from "@/components/sections/Ch08OurStory";
import Ch09Begin from "@/components/sections/Ch09Begin";
import Ch10Continuation from "@/components/sections/Ch10Continuation";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Atmosphere />
      <Ch01Arrival />
      <Ch02Philosophy />
      <Ch03SecondBrain />
      <Ch04WhatWeBuild />
      <Ch05Intelligence />
      <Ch06Proof />
      <Ch07WhyNabhi />
      <Ch08OurStory />
      <Ch09Begin />
      <Ch10Continuation />
    </>
  );
}
