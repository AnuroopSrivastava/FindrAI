"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import socialLinks from "@/data/socialLinks.json";

type SocialKey = keyof typeof socialLinks;

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // FIXED
    },
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Page header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="space-y-4"
        >
          <p className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400 shadow-sm">
            About
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            FindrAI &amp; the mind behind it.
          </h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Learn more about what this platform offers and the person building
            it — with a focus on performance, clarity, and real-world usability.
          </p>
        </motion.header>

        {/* About Website */}
        <motion.section
          variants = {sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-8 lg:grid-cols-[minmax(0,2fr)]"
        >
          <div className="group rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/60 hover:shadow-sky-900/40 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              About This Website
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Welcome to{" "}
              <span className="font-semibold text-sky-400">FindrAI </span>{" "}
              — a modern, fast, and user-friendly directory built to help
              developers, creators, and everyday users discover the best AI
              tools available today.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              The goal of this website is simple:
            </p>

            <div className="mt-6 grid gap-3 text-sm text-slate-200 sm:text-base">
              <FeatureItem text="A centralized collection of the latest and most useful AI tools" />
              <FeatureItem text="Beautiful UI with smooth animations and clean interface" />
              <FeatureItem text="Quick search, filter, and sort functionality" />
              <FeatureItem text="Accurate tool descriptions with direct links, pricing info, categories, and tags" />
              <FeatureItem text="Carefully curated tool listings for productivity, creativity, coding, writing, analytics, and more" />
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-300 sm:text-base">
              This website is continuously improving, evolving, and scaling with
              modern design principles and user experience in mind. Everything
              is optimised to help you find the right AI tool instantly and make
              your workflow faster and smarter.
            </p>
          </div>
        </motion.section>

        {/* About Me */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          {/* Text */}
          <motion.div
            variants = {sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="order-2 space-y-5 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-emerald-900/40 sm:order-1 sm:p-8"
          >
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              About Me — Anuroop Srivastava
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Hi! I’m{" "}
              <span className="font-semibold text-emerald-400">
                Anuroop Srivastava
              </span>
              , a passionate and dedicated Full-Stack Web Developer &amp; AI/ML
              Enthusiast from India. I enjoy building fast, modern, and visually
              appealing web applications while exploring the latest advancements
              in machine learning and artificial intelligence.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
                Full-Stack Web Developer
              </span>
              <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sky-300">
                AI / ML Enthusiast
              </span>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                My Vision
              </h3>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                I believe in building technology that makes life simpler,
                smarter, and accessible. This website is a small step toward
                creating a platform that helps people unlock the true potential
                of AI — with clarity, speed, and ease of use.
              </p>
            </div>

            {/* Social links from JSON */}
            <div className="mt-6 flex flex-wrap gap-3">
              <SocialLink socialKey="instagram" />
              <SocialLink socialKey="linkedin" />
            </div>
          </motion.div>

          {/* Profile card */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="order-1 sm:order-2"
          >
            <div className="group relative mx-auto flex max-w-xs flex-col items-center overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-emerald-500/70 hover:shadow-emerald-900/50">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/anuroop-profile.jpg"
                  alt="Portrait of Anuroop Srivastava"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 280px, 60vw"
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold tracking-tight">
                  Anuroop Srivastava
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Full-Stack Web Developer &nbsp;•&nbsp; AI / ML Enthusiast
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

/* Small subcomponents */

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-[3px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border border-sky-500/60 bg-sky-500/10 text-[10px] font-semibold text-sky-300 shadow-sm shadow-sky-900/40">
        ✦
      </span>
      <p className="text-sm leading-relaxed text-slate-200 sm:text-[0.95rem]">
        {text}
      </p>
    </div>
  );
}

function SocialLink({ socialKey }: { socialKey: SocialKey }) {
  const social = socialLinks[socialKey];

  if (!social) return null;

  return (
    <Link
      href={social.url}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-100 shadow-sm shadow-slate-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/70 hover:bg-slate-900 hover:shadow-emerald-900/40"
    >
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-[11px]">
        {social.label === "Instagram" ? "IG" : "in"}
      </span>
      <span className="flex flex-col leading-none text-left">
        <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
          {social.label}
        </span>
        <span className="text-xs text-slate-100">{social.handle}</span>
      </span>
    </Link>
  );
}
