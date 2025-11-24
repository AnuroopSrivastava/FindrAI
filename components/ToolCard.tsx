import Link from "next/link";
import Image from "next/image";
import type { Tool } from "@/lib/getTools";

// Category Icon Mapping
const getCategoryIcon = (category: string) => {
  const map: Record<string, string> = {
    "AI Tools": "🧠",
    "Design": "🎨",
    "Productivity": "⚡",
    "Development": "💻",
    "Marketing": "📈",
    "Analytics": "📊",
    "Writing": "✍️",
  };
  return map[category] || "✨"; // Fallback icon
};

// Pricing Icon Mapping
const getPricingIcon = (pricing: string) => {
  const map: Record<string, string> = {
    Free: "🆓",
    Freemium: "💸",
    Paid: "💳",
    Subscription: "📅",
  };
  return map[pricing] || "💰"; // Fallback icon
};

// 🔥 Improved logic for resolving tool logo file path
const normalizeLogo = (logo: string) => {
  if (!logo) return "/logos/default.png"; // fallback if missing

  if (logo.startsWith("/") || logo.startsWith("http")) {
    return logo;
  }

  return `/logos/${logo
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, "")}`; // remove spaces + invalid chars
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const logoPath = normalizeLogo(tool.logo);

  return (
    <Link
      href={tool.website}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div
        className="rounded-2xl p-5 border border-white/10 transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl
        hover:shadow-fuchsia-500/25 hover:border-fuchsia-400/40
        bg-white/5 backdrop-blur-sm"
      >
        {/* Optimized Image */}
        <Image
          src={logoPath}
          alt={tool.name}
          width={52}
          height={52}
          className="object-contain mb-4 rounded-lg transition duration-300 group-hover:scale-105"
        />

        <h2 className="text-lg font-semibold text-white mb-1">
          {tool.name}
        </h2>

        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {tool.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          {/* Category Badge */}
          <span className="text-xs px-2.5 py-1 rounded-full bg-fuchsia-500/10 
            border border-fuchsia-500/30 text-fuchsia-300 backdrop-blur-sm">
            {getCategoryIcon(tool.category)} {tool.category || "Other"}
          </span>

          {/* Pricing Badge */}
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 
            border border-cyan-500/30 text-cyan-300 backdrop-blur-sm">
            {getPricingIcon(tool.pricing)} {tool.pricing}
          </span>
        </div>
      </div>
    </Link>
  );
}
