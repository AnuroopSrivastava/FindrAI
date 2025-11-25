"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Tool } from "@/lib/getTools";

// Category Icon Mapping
const getCategoryIcon = (category: string) => {
  const map: Record<string, string> = {
    "AI Tools": "🧠",
    Design: "🎨",
    Productivity: "⚡",
    Development: "💻",
    Marketing: "📈",
    Analytics: "📊",
    Writing: "✍️",
  };
  return map[category] || "✨";
};

// Pricing Icon Mapping
const getPricingIcon = (pricing: string) => {
  const map: Record<string, string> = {
    Free: "🆓",
    Freemium: "💸",
    Paid: "💳",
    Subscription: "📅",
  };
  return map[pricing] || "💰";
};

// Normalize logo path
const normalizeLogo = (logo: string) => {
  if (!logo) return "/logos/default.png";

  if (logo.startsWith("/") || logo.startsWith("http")) {
    return logo;
  }

  return `/logos/${logo.toLowerCase().replace(/[^a-z0-9.]/g, "")}`;
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const logoPath = normalizeLogo(tool.logo!);

  return (
    <Link
      href={tool.website}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.35 }}
        className="w-full rounded-2xl p-5 border border-white/10 
        bg-white/5 backdrop-blur-sm 
        hover:-translate-y-2 hover:shadow-xl hover:shadow-fuchsia-500/20 
        hover:border-fuchsia-400/40 transition-all duration-300"
      >
        {/* Logo */}
        <Image
          src={logoPath}
          alt={tool.name}
          width={52}
          height={52}
          className="object-contain mb-4 rounded-lg transition group-hover:scale-105"
        />

        <h2 className="text-lg font-semibold text-white mb-1">
          {tool.name}
        </h2>

        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {tool.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className="text-xs px-2.5 py-1 rounded-full bg-fuchsia-500/10 
            border border-fuchsia-500/30 text-fuchsia-300 backdrop-blur-sm"
          >
            {getCategoryIcon(tool.category)} {tool.category}
          </span>

          <span
            className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 
            border border-cyan-500/30 text-cyan-300 backdrop-blur-sm"
          >
            {getPricingIcon(tool.pricing)} {tool.pricing}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
