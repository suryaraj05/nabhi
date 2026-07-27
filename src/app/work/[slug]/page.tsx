import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Atmosphere from "@/components/Atmosphere";
import ProductFrame from "@/components/media/ProductFrame";
import JsonLd from "@/components/seo/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { getNextProject, getProject, PROJECTS, type Project } from "@/content/projects";
import { creativeWorkJsonLd } from "@/lib/seo";

/** Proof (Ch06) through morning — entered from the work list. */
const LIGHT_START = 0.68;
const LIGHT_END = 1;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.oneLiner,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: project.name,
      description: project.oneLiner,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

function StoryBlock({
  label,
  content,
  placeholder,
}: {
  label: string;
  content: string;
  placeholder: string;
}) {
  return (
    <section className="py-[clamp(40px,8vh,100px)] rule border-t">
      <Reveal>
        <p className="label mb-6">{label}</p>
        {content ? (
          <p className="lede">{content}</p>
        ) : (
          <p className="placeholder">{placeholder}</p>
        )}
      </Reveal>
    </section>
  );
}

function Continuation({ project, next }: { project: Project; next?: Project }) {
  return (
    <section className="py-[clamp(48px,10vh,120px)] rule border-t">
      <Reveal>
        <p className="label mb-6">Continuation</p>
        <p className="lede">
          {next ? (
            <>
              Next:{" "}
              <a href={`/work/${next.slug}`} className="cta-quiet">
                {next.name}
              </a>
              {" — "}then{" "}
              <a href="/#begin" className="cta-quiet">
                begin
              </a>
              .
            </>
          ) : (
            <>
              <a href="/#begin" className="cta-quiet">
                Begin a conversation
              </a>
              {" — "}tell us what has become too complicated.
            </>
          )}
        </p>
      </Reveal>
      {project.placeholder ? (
        <Reveal delay={0.06} className="mt-8">
          <p className="placeholder">
            Placeholder — case-study body copy for {project.name} is not written yet.
            Fill problemStated, problemActual, understanding, built, and changed in
            src/content/projects.ts. Never invent a metric for changed.
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const hero = project.images[0];

  return (
    <>
      <JsonLd data={creativeWorkJsonLd(project)} />
      <Atmosphere progressStart={LIGHT_START} progressEnd={LIGHT_END} />

      <article className="relative gut pb-[18vh] pt-[22vh]">
        <div className="shell">
          {/* Opening */}
          <header>
            <Reveal>
              <p className="label mb-5">{project.meta}</p>
              <h1 className="display">
                <span style={{ maxWidth: "14ch", display: "block" }}>{project.name}</span>
              </h1>
              <p className="lede mt-9">{project.oneLiner}</p>
            </Reveal>
            <Reveal delay={0.08} className="mt-[clamp(44px,8vh,100px)]">
              <ProductFrame
                src={hero?.src}
                alt={hero?.alt ?? `${project.name} — project screen`}
                width={1440}
                height={900}
                priority
              />
            </Reveal>
          </header>

          <StoryBlock
            label="What was actually wrong?"
            content={
              project.problemStated && project.problemActual
                ? `${project.problemStated} What turned out to be true underneath: ${project.problemActual}`
                : project.problemActual || project.problemStated
            }
            placeholder={`Placeholder — what ${project.name}'s client said was wrong, and what was actually wrong underneath. These are rarely the same.`}
          />

          <StoryBlock
            label="What we understood"
            content={project.understanding}
            placeholder={`Placeholder — the insight that made the build for ${project.name} obvious.`}
          />

          {/* What we built */}
          <section className="py-[clamp(40px,8vh,100px)] rule border-t">
            <Reveal>
              <p className="label mb-6">What we built</p>
              {project.built ? (
                <p className="lede">{project.built}</p>
              ) : (
                <p className="placeholder">
                  Placeholder — restrained description and real screens for {project.name}.
                  Screens, not feature lists.
                </p>
              )}
            </Reveal>
            {project.images.length > 1 ? (
              <div className="mt-[clamp(32px,6vh,72px)] space-y-8">
                {project.images.slice(1).map((img) => (
                  <Reveal key={img.src} delay={0.04}>
                    <ProductFrame
                      src={img.src}
                      alt={img.alt}
                      width={1440}
                      height={900}
                    />
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal delay={0.06} className="mt-8">
                <ProductFrame
                  alt={`${project.name} — additional screens`}
                  width={1440}
                  height={900}
                />
              </Reveal>
            )}
          </section>

          <StoryBlock
            label="What changed"
            content={project.changed}
            placeholder={`Placeholder — honest outcome for ${project.name}. Numbers only if they exist. Never invent a metric.`}
          />

          <Continuation project={project} next={next} />
        </div>
      </article>
    </>
  );
}
