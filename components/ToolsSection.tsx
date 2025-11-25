"use client";

import { motion, Variants } from "framer-motion";
import type { Tool } from "@/lib/getTools";
import SearchFilterBar from "@/components/SearchFilterBar";

// Safe mobile-friendly Framer Motion variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function ToolsSection({ tools }: { tools: Tool[] }) {
  return (
    <motion.section
      initial="visible"           // 👈 FIX — always visible on first load
      animate="visible"           // 👈 Fix for mobile browsers
      variants={sectionVariants}
      className="mt-10 w-full overflow-x-hidden"   // 👈 Prevent mobile cut-off
    >
      <SearchFilterBar initialTools={tools} />
    </motion.section>
  );
}
