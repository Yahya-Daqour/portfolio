import {
  createElement,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { achievements } from "@/data/achievements";
import { education } from "@/data/education";

const navigation = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

type IconName =
  | "sun"
  | "moon"
  | "menu"
  | "close"
  | "arrow"
  | "download"
  | "mail"
  | "linkedin"
  | "github"
  | "scholar"
  | "trophy"
  | "medal"
  | "spark"
  | "award";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  const paths: Record<IconName, ReactNode> = {
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></>,
    moon: <path d="M20.4 14.6A8 8 0 0 1 9.4 3.6 8.5 8.5 0 1 0 20.4 14.6Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    linkedin: <><path d="M7 9v9M7 6.5v.01M11 18v-5c0-2 1-3 3-3s3 1.5 3 3.5V18M11 10v8" /></>,
    github: <><path d="M9 19c-4 1.5-4-2-5-2.5M15 22v-3.5c0-1 .1-1.4-.5-2 2.5-.3 5-1.2 5-5.5 0-1.2-.4-2.2-1.1-3 .1-.3.5-1.5-.1-3-1 0-2.2.8-3 1.2a10.4 10.4 0 0 0-6 0C8.5 5.8 7.3 5 6.3 5c-.6 1.5-.2 2.7-.1 3A4.3 4.3 0 0 0 5 11c0 4.3 2.5 5.2 5 5.5-.5.5-.6 1.1-.5 2V22" /></>,
    scholar: <><path d="M12 4 3 8.5 12 13l9-4.5L12 4Z" /><path d="M7 10.5V15c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5" /><path d="M21 8.5V14" /></>,
    trophy: <><path d="M8 4h8v4a4 4 0 0 1-8 0V4ZM12 12v4M8 20h8M10 16h4" /><path d="M8 6H5v1a4 4 0 0 0 4 4M16 6h3v1a4 4 0 0 1-4 4" /></>,
    medal: <><circle cx="12" cy="15" r="5" /><path d="m9 10-3-7h4l2 4 2-4h4l-3 7M10 15l1.3 1.3L14 13.5" /></>,
    spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>,
    award: <><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1 7 4.5-2 4.5 2-1-7M12 6v6M9 9h6" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function ActionLink({
  href,
  children,
  className = "",
  label,
  download,
  external = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  label?: string;
  download?: string;
  external?: boolean;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}) {
  return createElement(
    "a",
    {
      href,
      className,
      "aria-label": label,
      download,
      onClick,
      ...(external ? { target: "_blank", rel: "noreferrer" } : {}),
    },
    children,
  );
}

function Control({
  children,
  className = "",
  label,
  onClick,
  type = "button",
  ariaExpanded,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaExpanded?: boolean;
}) {
  return createElement(
    "button",
    { type, className, "aria-label": label, "aria-expanded": ariaExpanded, onClick },
    children,
  );
}

function Heading({
  level,
  children,
  className = "",
  id,
}: {
  level: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return createElement(`h${level}`, { className, id }, children);
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-12 grid gap-3 border-t border-line pt-5 sm:grid-cols-[1fr_3fr] lg:mb-16">
      <span className="font-mono text-xs font-medium tracking-widest text-muted">{index}</span>
      <Heading level={2} className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </Heading>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [roleIndex, setRoleIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(saved ? saved === "dark" : preferred);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setRoleIndex((current) => (current + 1) % profile.roles.length),
      2400,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    document.body.classList.add("modal-open");
    window.setTimeout(() => closeRef.current?.focus(), 0);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-page text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-page/95 backdrop-blur-sm">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <ActionLink href="#top" className="focus-ring text-sm font-bold tracking-tight sm:text-base">
            {profile.name}
          </ActionLink>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <ActionLink
                key={item.id}
                href={`#${item.id}`}
                className={`focus-ring nav-link ${activeSection === item.id ? "is-active" : ""}`}
              >
                {item.label}
              </ActionLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ActionLink
              href={profile.resume.href}
              download={profile.resume.downloadName}
              className="focus-ring hidden min-h-11 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white hover-action sm:flex"
            >
              Resume <Icon name="download" size={17} />
            </ActionLink>
            <Control
              label={`Switch to ${dark ? "light" : "dark"} mode`}
              onClick={() => setDark((value) => !value)}
              className="focus-ring icon-button hover-action"
            >
              <Icon name={dark ? "sun" : "moon"} />
            </Control>
            <Control
              label={menuOpen ? "Close navigation" : "Open navigation"}
              ariaExpanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
              className="focus-ring icon-button hover-action md:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </Control>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-line bg-page px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-7xl">
              {navigation.map((item) => (
                <ActionLink
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`focus-ring flex min-h-11 items-center border-b border-line text-sm font-medium ${
                    activeSection === item.id ? "text-accent" : ""
                  }`}
                >
                  {item.label}
                </ActionLink>
              ))}
              <ActionLink
                href={profile.resume.href}
                download={profile.resume.downloadName}
                className="focus-ring mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white"
              >
                Download resume <Icon name="download" size={17} />
              </ActionLink>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
          <div className="max-w-5xl">
            <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {profile.availabilityLine}
            </p>
            <Heading level={1} className="text-6xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-8xl lg:text-[8.5rem]">
              {profile.name}
            </Heading>
            <div className="mt-7 flex flex-wrap items-baseline gap-x-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              <span key={roleIndex} className="role-cycle text-accent">
                {profile.roles[roleIndex]}.
              </span>
            </div>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {profile.heroTagline}
            </p>
          </div>
          <div className="mt-20 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="h-px w-12 bg-line" />
            Scroll to explore
          </div>
        </section>

        <section id="about" className="section-shell scroll-mt-24">
          <Reveal>
            <SectionHeader index="01" title="About" />
            <div className="grid gap-8 sm:grid-cols-[1fr_3fr]">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{profile.about.eyebrow}</p>
              <div className="max-w-3xl space-y-6 text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
                {profile.about.paragraphs.map((paragraph, index) => (
                  <p key={paragraph} className={index > 0 ? "text-muted" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="experience" className="section-shell scroll-mt-24">
          <Reveal>
            <SectionHeader index="02" title="Experience" />
            <div className="sm:ml-[25%]">
              {experience.map((job, index) => (
                <article key={job.company} className="relative border-l border-line pb-14 pl-7 last:pb-0 sm:pl-10">
                  <span className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full border-2 border-accent bg-page" />
                  <p className="mb-3 font-mono text-xs tracking-wide text-accent">{job.period}</p>
                  <Heading level={3} className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {job.role}
                  </Heading>
                  <p className="mt-1 text-sm font-medium text-muted">{job.company}</p>
                  <ul className="mt-5 max-w-3xl space-y-3 text-sm leading-relaxed text-muted sm:text-base">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="grid grid-cols-[auto_1fr] gap-3">
                        <span className="mt-[0.7em] h-px w-3 bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {index < experience.length - 1 && <span className="sr-only">Previous role</span>}
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="projects" className="section-shell scroll-mt-24">
          <Reveal>
            <SectionHeader index="03" title="Selected projects" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Control
                  key={project.title}
                  label={`View ${project.title} project details`}
                  onClick={() => setSelectedProject(project)}
                  className="focus-ring project-card group text-left hover-action"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-muted">{project.number}</span>
                    <span className="text-accent">
                      <Icon name="arrow" />
                    </span>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                      {project.employer ?? "Personal Project"}
                    </p>
                    <Heading level={3} className="text-2xl font-semibold tracking-tight">
                      {project.title}
                    </Heading>
                    <p className="mt-2 text-sm text-muted">{project.subtitle}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Control>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="skills" className="section-shell scroll-mt-24">
          <Reveal>
            <SectionHeader index="04" title="Skills & tools" />
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 sm:pl-[25%]">
              {skills.map((group) => (
                <div key={group.category}>
                  <Heading level={3} className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-accent">
                    {group.category}
                  </Heading>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-lg border border-line bg-card px-3 py-2 text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="section-shell">
          <Reveal>
            <SectionHeader index="05" title="Achievements & competitions" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map((achievement) => (
                <article key={achievement.title} className="rounded-xl border border-line bg-card p-5">
                  <div className="mb-9 text-accent">
                    <Icon name={achievement.icon as IconName} size={24} />
                  </div>
                  <Heading level={3} className="text-base font-semibold">
                    {achievement.title}
                  </Heading>
                  <p className="mt-2 text-sm text-muted">{achievement.result}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="section-shell">
          <Reveal>
            <SectionHeader index="06" title="Education" />
            <div className="space-y-4 sm:ml-[25%]">
              {education.map((item) => (
                <article
                  key={item.degree}
                  className="grid gap-6 rounded-xl border border-line bg-card p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8"
                >
                  <div>
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">{item.eyebrow}</p>
                    <Heading level={3} className="text-xl font-semibold sm:text-2xl">
                      {item.degree}
                    </Heading>
                    <p className="mt-2 text-muted">
                      {item.institution}
                      {item.note ? ` · ${item.note}` : ""}
                    </p>
                  </div>
                  <p className="font-mono text-xs tracking-wide text-muted">{item.period}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>
      </main>

      <footer id="contact" className="scroll-mt-24 border-t border-line">
        <Reveal className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{profile.contact.eyebrow}</p>
          <Heading level={2} className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {profile.contact.heading}
          </Heading>
          <div className="mt-12 flex flex-col gap-6 border-b border-line pb-16 sm:flex-row sm:items-center sm:justify-between">
            <ActionLink
              href={profile.resume.href}
              download={profile.resume.downloadName}
              className="focus-ring flex min-h-12 w-fit items-center gap-3 rounded-xl bg-accent px-5 text-sm font-semibold text-white hover-action"
            >
              Download CV <Icon name="download" size={18} />
            </ActionLink>
            <div className="flex gap-2">
              <ActionLink href={`mailto:${profile.email}`} label="Email" className="focus-ring icon-link hover-action">
                <Icon name="mail" />
              </ActionLink>
              <ActionLink href={profile.social.linkedin} external label="LinkedIn" className="focus-ring icon-link hover-action">
                <Icon name="linkedin" />
              </ActionLink>
              <ActionLink href={profile.social.github} external label="GitHub" className="focus-ring icon-link hover-action">
                <Icon name="github" />
              </ActionLink>
              <ActionLink href={profile.social.scholar} external label="Google Scholar" className="focus-ring icon-link hover-action">
                <Icon name="scholar" />
              </ActionLink>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-6 font-mono text-xs text-muted sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} {profile.name}</p>
            <p>{profile.contact.closingLine}</p>
          </div>
        </Reveal>
      </footer>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-xl border border-line bg-card p-6 text-ink sm:rounded-xl sm:p-10"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-xs text-accent">
                  {selectedProject.number} / {selectedProject.employer ?? "Personal Project"}
                </p>
                <Heading id="project-modal-title" level={2} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {selectedProject.title}
                </Heading>
              </div>
              {createElement(
                "button",
                {
                  ref: closeRef,
                  type: "button",
                  className: "focus-ring icon-button hover-action shrink-0",
                  "aria-label": "Close project details",
                  onClick: () => setSelectedProject(null),
                },
                <Icon name="close" />,
              )}
            </div>
            <p className="mt-8 text-lg leading-relaxed text-muted">{selectedProject.description}</p>
            <div className="mt-8 border-t border-line pt-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">Technology</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <span key={tech} className="rounded-lg border border-line px-3 py-2 text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {(selectedProject.demo || selectedProject.repo) && (
              <div className="mt-10 flex flex-wrap gap-6">
                {selectedProject.demo && (
                  <ActionLink href={selectedProject.demo} external className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent">
                    View live project <Icon name="arrow" size={17} />
                  </ActionLink>
                )}
                {selectedProject.repo && (
                  <ActionLink href={selectedProject.repo} external className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
                    View source <Icon name="github" size={17} />
                  </ActionLink>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
