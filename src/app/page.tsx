import Image from "next/image";
import { ArrowRight, CarFront, Gauge, ShieldCheck, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { InitialScrollReset } from "@/components/initial-scroll-reset";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ThemeToggle } from "@/components/theme-toggle";

import certificate1 from "@/assets/certificates/Screenshot_20260213-104334.png";
import certificate2 from "@/assets/certificates/Screenshot_20260213-104401.png";
import image1 from "@/assets/FB_IMG_1773529016017.jpg";
import image2 from "@/assets/FB_IMG_1773529050398.jpg";
import image3 from "@/assets/IMG_20260113_150534.jpg";

const navigationItems = [
  { label: "Overview", href: "#introduction" },
  { label: "Gallery", href: "#gallery" },
  { label: "Training", href: "#practice" },
  { label: "Certificates", href: "#records" },
];

const mechanicalActivities = [
  "Daily pre-service inspection and condition reporting.",
  "Fluid level checks for engine oil, coolant, brake fluid, and washer fluid.",
  "Spark plug cleaning support and battery terminal maintenance.",
  "Tire pressure checks, tread inspection, and wheel alignment preparation.",
  "Underchassis inspection for leaks and worn-out components.",
  "Brake cleaning assistance and basic brake system diagnosis.",
  "OBD scanning for initial fault code identification.",
  "Workshop housekeeping, tool control, and safety compliance.",
];

const trainingFocus = [
  {
    icon: Wrench,
    title: "Preventive Maintenance",
    detail:
      "Performed routine checking, cleaning, and basic service support to help keep vehicles ready for operation.",
  },
  {
    icon: Gauge,
    title: "Basic Diagnostics",
    detail:
      "Learned how to inspect symptoms, identify common faults, and assist with simple diagnostic procedures.",
  },
  {
    icon: ShieldCheck,
    title: "Safety Discipline",
    detail:
      "Followed shop rules, proper PPE use, and safe handling of tools, equipment, and work areas.",
  },
  {
    icon: CarFront,
    title: "Shop Readiness",
    detail:
      "Built confidence in assisting mechanics, preparing work areas, and supporting actual service jobs in the shop.",
  },
];

const galleryItems = [
  {
    type: "video" as const,
    src: "/videos/driving-course-ojt-web.mp4",
    title: "Work Immersion Training Video",
  },
  {
    type: "image" as const,
    src: image1,
    title: "Work Immersion Photo 1",
  },
  {
    type: "image" as const,
    src: image2,
    title: "Work Immersion Photo 2",
  },
  {
    type: "image" as const,
    src: image3,
    title: "Work Immersion Photo 3",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <InitialScrollReset />
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color:color-mix(in_srgb,var(--background)_84%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[11px] sm:tracking-[0.32em]">
              Cyrus Lucas Sibelius
            </p>
            <h1 className="display-face text-xl leading-none sm:text-3xl">
              Work Immersion Portfolio
            </h1>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      <section
        id="introduction"
        className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-14 lg:px-8 lg:pb-16"
      >
        <div className="mechanic-panel mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center rounded-[2.25rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.1),transparent_34%),linear-gradient(135deg,rgba(0,0,0,0.05),transparent_42%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_42%)]" />
          <div className="metal-line absolute inset-x-8 top-0 h-px lg:inset-x-12" />

          <div className="relative z-10 grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_22rem] lg:gap-10 lg:p-12">
            <ScrollReveal className="self-center">
              <Badge variant="secondary">Work Immersion</Badge>
              <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] sm:mt-8 sm:text-[11px] sm:tracking-[0.34em]">
                Portfolio by Cyrus Lucas Sibelius
              </p>
              <h2 className="display-face mt-3 max-w-4xl text-[2.9rem] leading-[0.9] sm:text-6xl lg:text-[6.2rem]">
                Work immersion, Documentation.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:mt-6 sm:text-base">
                This landing page brings together my training experience,
                practical activities, field exposure, and certificate records in one
                place. It is designed to show what I learned during work
                immersion without unnecessary clutter.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
                <a
                href="#gallery"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:opacity-90"
              >
                View gallery
                <ArrowRight className="size-4" />
              </a>
                <a
                  href="#records"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--line-strong)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                >
                  View certificates
                </a>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 self-stretch">
              <ScrollReveal
                variant="right"
                delay={80}
                className="rounded-[1.6rem] border border-[var(--line)] bg-[color:color-mix(in_srgb,var(--surface)_92%,transparent)] p-5"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Focus
                </p>
                <p className="display-face mt-3 text-4xl leading-none">
                  Work Immersion
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Built around practical activities, training footage, and
                  documented immersion outputs.
                </p>
              </ScrollReveal>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <ScrollReveal
                  variant="right"
                  delay={140}
                  className="rounded-[1.6rem] border border-[var(--line)] bg-[color:color-mix(in_srgb,var(--surface)_92%,transparent)] p-5"
                >
                  <p className="display-face text-5xl leading-none">01</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    Immersion gallery with photos and video.
                  </p>
                </ScrollReveal>
                <ScrollReveal
                  variant="right"
                  delay={220}
                  className="rounded-[1.6rem] border border-[var(--line)] bg-[color:color-mix(in_srgb,var(--surface)_92%,transparent)] p-5"
                >
                  <p className="display-face text-5xl leading-none">02</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    Training activities and practical tasks.
                  </p>
                </ScrollReveal>
                <ScrollReveal
                  variant="right"
                  delay={300}
                  className="rounded-[1.6rem] border border-[var(--line)] bg-[color:color-mix(in_srgb,var(--surface)_92%,transparent)] p-5"
                >
                  <p className="display-face text-5xl leading-none">03</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    Certificate evidence for immersion outputs.
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="px-4 pt-12 pb-16 scroll-mt-24 sm:px-6 sm:pt-14 sm:pb-18 lg:px-8 lg:pt-16 lg:pb-20"
      >
        <div className="mx-auto max-w-7xl">
          <ScrollReveal
            className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
            distance={64}
            blur={4}
            scene
            sceneStart={0.82}
            requireScroll
          >
            <div>
              <Badge variant="outline">Gallery</Badge>
              <h2 className="display-face mt-4 text-3xl leading-none sm:text-5xl">
                Driving-course photos and video.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
              This gallery focuses on driving-course activities, including
              actual training footage and photos taken during practice,
              assessment, and field exposure.
            </p>
          </ScrollReveal>

          <ScrollReveal
            variant="zoom"
            distance={72}
            blur={6}
            scene
            sceneStart={0.78}
            requireScroll
          >
            <GalleryCarousel items={galleryItems} />
          </ScrollReveal>
        </div>
      </section>

      <section
        id="practice"
        className="px-4 pt-12 pb-16 scroll-mt-24 sm:px-6 sm:pt-14 sm:pb-18 lg:px-8 lg:pt-16 lg:pb-20"
      >
        <div className="mx-auto max-w-7xl">
          <ScrollReveal
            className="mb-8"
            distance={64}
            blur={4}
            scene
            sceneStart={0.82}
            requireScroll
          >
            <Badge variant="outline">Training</Badge>
            <h2 className="display-face mt-4 text-3xl leading-none sm:text-5xl">
              Core tasks and practical skills learned during work immersion.
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <ScrollReveal
              variant="up"
              distance={72}
              blur={5}
              scene
              sceneStart={0.78}
              requireScroll
            >
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="display-face text-3xl font-medium sm:text-4xl">
                    Work Immersion Activities
                  </CardTitle>
                  <CardDescription className="max-w-xl leading-7">
                    Summary of the actual duties, practical tasks, and training
                    exposure completed during work immersion.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {mechanicalActivities.map((activity, index) => (
                      <div
                        key={activity}
                        className="flex items-start gap-4 border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="display-face text-2xl leading-none text-[var(--muted)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm leading-7 text-[var(--foreground)]">
                          {activity}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <div className="grid gap-6 sm:grid-cols-2">
              {trainingFocus.map((item, idx) => (
                <ScrollReveal
                  key={item.title}
                  delay={idx * 90}
                  variant={idx % 2 === 0 ? "up" : "zoom"}
                  distance={60}
                  blur={4}
                  scene
                  sceneStart={0.84}
                  requireScroll
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="mb-6 inline-flex size-12 items-center justify-center rounded-full border border-[var(--line-strong)]">
                        <item.icon className="size-5" />
                      </div>
                      <CardTitle className="display-face text-[1.9rem] font-medium sm:text-3xl">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="leading-7">
                        {item.detail}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="records"
        className="px-4 pt-12 pb-18 scroll-mt-24 sm:px-6 sm:pt-14 sm:pb-20 lg:px-8 lg:pt-16 lg:pb-24"
      >
        <div className="mx-auto max-w-7xl">
          <ScrollReveal
            className="mb-8"
            distance={64}
            blur={4}
            scene
            sceneStart={0.82}
            requireScroll
          >
            <Badge variant="outline">Certificates</Badge>
            <h2 className="display-face mt-4 text-3xl leading-none sm:text-5xl">
              National certificates connected to technical training and immersion outputs.
            </h2>
            <Separator className="mt-6" />
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            <ScrollReveal
              variant="left"
              distance={72}
              blur={5}
              scene
              sceneStart={0.8}
              requireScroll
            >
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] border-b border-[var(--line)] bg-[var(--surface-strong)]">
                  <Image
                    src={certificate1}
                    alt="Training certificate"
                    fill
                    className="object-contain p-4 sm:p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <CardHeader className="flex-1">
                  <CardTitle className="display-face text-[1.9rem] font-medium sm:text-3xl">
                    Automotive Servicing NC I
                  </CardTitle>
                  <CardDescription className="leading-7">
                    National Certificate I showing basic competency in
                    automotive servicing and workshop-related practical skills.
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>

            <ScrollReveal
              delay={120}
              variant="right"
              distance={72}
              blur={5}
              scene
              sceneStart={0.8}
              requireScroll
            >
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10] border-b border-[var(--line)] bg-[var(--surface-strong)]">
                  <Image
                    src={certificate2}
                    alt="Assessment validation record"
                    fill
                    className="object-contain p-4 sm:p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <CardHeader className="flex-1">
                  <CardTitle className="display-face text-[1.9rem] font-medium sm:text-3xl">
                    Driving NC II
                  </CardTitle>
                  <CardDescription className="leading-7">
                    National Certificate II showing competency gained through
                    technical training and practical immersion experience.
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)] sm:text-[11px] sm:tracking-[0.32em]">
              Cyrus Lucas Sibelius
            </p>
            <p className="display-face mt-2 text-[1.9rem] leading-none sm:text-3xl">
              Practical learning. Real experience. Clear evidence.
            </p>
          </div>
          <div className="space-y-1 text-sm text-[var(--muted)]">
            <p>2026 Work Immersion Portfolio</p>
            <p>Prepared to document student training, immersion experience, and certificate records.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
