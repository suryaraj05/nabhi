import Atmosphere from "@/components/Atmosphere";
import JsonLd from "@/components/seo/JsonLd";
import Act from "@/components/spatial/Act";
import Door from "@/components/spatial/Door";
import Threshold from "@/components/spatial/Threshold";
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
import { ACTS } from "@/lib/acts";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const CHAPTERS_BY_ACT = {
  threshold: (
    <>
      <Ch01Arrival />
      <Ch02Philosophy />
    </>
  ),
  "curve-one": <Ch03SecondBrain />,
  "curve-two": <Ch04WhatWeBuild />,
  approach: <Ch05Intelligence />,
  "the-work": (
    <>
      <Ch06Proof />
      <Ch07WhyNabhi />
    </>
  ),
  horizon: (
    <>
      <Ch08OurStory />
      <Ch09Begin />
      <Ch10Continuation />
    </>
  ),
} as const;

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Atmosphere />
      <Door />
      <Threshold />
      {ACTS.map((act) => (
        <Act key={act.id} act={act}>
          {CHAPTERS_BY_ACT[act.id as keyof typeof CHAPTERS_BY_ACT]}
        </Act>
      ))}
    </>
  );
}
