import { getAllTools } from "@/lib/getTools";
import ToolsSection from "@/components/ToolsSection";

export default async function HomePage() {
  const tools = await getAllTools();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        {/* Hero */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-5">
            <p className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Curated AI Directory
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Transform your workflow with{" "}
              <span className="text-sky-400">intelligent tools</span>.
            </h1>
            <p className="max-w-xl text-sm sm:text-base text-gray-300 leading-relaxed">
              Built for speed, clarity &amp; creativity — FindrAI helps
              developers, creators, and everyday users quickly discover the
              right AI tools for coding, writing, design, analytics, automation,
              and more.
            </p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span className="text-sky-400">•</span> Instant search, filter
                &amp; sorting
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-400">•</span> Clean, fast &amp;
                minimal UI
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-400">•</span> Accurate descriptions &
                direct links
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sky-400">•</span> Curated categories &
                tags
              </li>
            </ul>
          </div>

          {/* Simple highlight card */}
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/70 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Why this exists
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              Instead of jumping across dozens of tabs and random lists, FindrAI
               gives you a focused, high-quality directory of tools
              that actually matter — with a modern experience and zero clutter.
            </p>
            <p className="mt-4 text-xs text-slate-400">
              Built &amp; maintained by{" "}
              <span className="font-medium text-sky-300">
                Anuroop Srivastava
              </span>{" "}
              — Full-Stack Web Developer &amp; AI/ML Enthusiast.
            </p>
          </div>
        </section>

        {/* Animated tools section with search/filter/sort */}
        <ToolsSection tools={tools} />
      </div>
    </main>
  );
}
