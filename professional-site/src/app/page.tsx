export default function Home() {
  const journey = [
    {
      company: "Betsson Group",
      role: "Senior Software Engineer",
      period: "Sep 2024 - Mar 2025",
      impact:
        "Built and optimized payment experiences with Angular 18, RxJS, and NgRx while strengthening reliability through Jest and Playwright E2E coverage.",
    },
    {
      company: "Globant",
      role: "Senior Web UI Developer",
      period: "May 2022 - Sep 2024",
      impact:
        "Delivered large-scale streaming platform tooling for LaLiga and Disney, owning frontend modules, architecture conversations, and code quality standards.",
    },
    {
      company: "EPAM Anywhere",
      role: "Senior Software Engineer",
      period: "Jun 2021 - May 2022",
      impact:
        "Developed reusable Angular and NgRx components to automate shopping workflows, collaborating closely with product and engineering stakeholders.",
    },
    {
      company: "Endava + Globant",
      role: "Frontend Engineer",
      period: "Sep 2018 - May 2021",
      impact:
        "Shipped React and Angular products across e-commerce, insurance, and industrial IDE domains with strong testing and component-driven delivery.",
    },
  ];

  const coreSkills = [
    "Angular",
    "React",
    "TypeScript",
    "JavaScript",
    "NgRx / Redux",
    "GraphQL",
    "Jest / Playwright",
    "SCSS / CSS Architecture",
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16 md:px-10 lg:py-24">
        <section className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Bogotá, Colombia
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Mario Salazar
          </h1>
          <p className="mt-3 text-lg font-medium text-slate-200 md:text-2xl">
            Software Engineer | FrontEnd Developer
          </p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            Experienced frontend specialist focused on high-impact digital
            products. I blend enterprise-grade engineering discipline with
            modern UX execution to deliver fast, resilient, and polished web
            applications.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:mariosalav@gmail.com"
              className="btn-primary"
            >
              Contact Me
            </a>
            <a
              href="https://www.linkedin.com/in/mario-salazara"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              LinkedIn Profile
            </a>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="glass-panel rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              About Me
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              I specialize in building robust frontend ecosystems across
              fintech, streaming, automation, e-commerce, and insurance. My
              core strength is taking complex product requirements and turning
              them into elegant, maintainable interfaces that perform under
              real-world load.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-300">
              I thrive in cross-functional teams where architecture quality,
              testing strategy, and user experience all matter equally.
            </p>
          </article>

          <aside className="glass-panel rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-white">Core Stack</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <li key={skill} className="skill-pill">
                  {skill}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="glass-panel rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Career Journey
          </h2>
          <div className="mt-8 grid gap-5">
            {journey.map((item) => (
              <article
                key={`${item.company}-${item.period}`}
                className="timeline-item rounded-2xl p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    {item.company}
                  </h3>
                  <p className="text-sm font-medium uppercase tracking-wider text-cyan-300">
                    {item.period}
                  </p>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-200">
                  {item.role}
                </p>
                <p className="mt-3 leading-7 text-slate-300">{item.impact}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-8 text-center md:p-12">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Portfolio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Curated case studies are coming soon. This section will showcase
            selected frontend and architecture projects with outcomes, metrics,
            and implementation highlights.
          </p>
          <a href="#" className="btn-primary mt-8 inline-flex">
            Portfolio Launching Soon
          </a>
        </section>
      </main>
    </div>
  );
}
