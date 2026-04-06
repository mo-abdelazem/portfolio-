import { PERSONAL } from "@/lib/data";
import { Reveal } from "./reveal";

const DETAILS = [
  { label: "Location", value: PERSONAL.location },
  { label: "Languages", value: "Arabic, English" },
  { label: "Platforms", value: "Web, SPA, SSR/SSG" },
  { label: "Focus", value: "Performance & A11y" },
] as const;

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">About</p>
          <h2 id="about-heading" className="section__title">
            A bit about me
          </h2>
        </Reveal>
        <div className="about__grid">
          <Reveal delay={100}>
            <p className="about__bio">{PERSONAL.bio}</p>
          </Reveal>
          <div className="about__details">
            {DETAILS.map((detail, i) => (
              <Reveal key={detail.label} delay={150 + i * 75}>
                <div className="about__card">
                  <span className="about__card-label">{detail.label}</span>
                  <span className="about__card-value">{detail.value}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
