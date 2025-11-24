export default function Footer() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-[13px]">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-slate-200">
            FindrAI
          </span>
          . Built by{" "}
          <span className="font-medium text-sky-400">
            Anuroop Srivastava
          </span>
          .
        </p>
        <p className="text-[11px] sm:text-xs">
          Fast, minimal &amp; curated directory of AI tools for developers,
          creators &amp; everyday users.
        </p>
      </div>
    </footer>
  );
}
