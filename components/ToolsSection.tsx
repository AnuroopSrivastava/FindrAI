"use client";

import { motion, Variants } from "framer-motion";
import type { Tool } from "@/lib/getTools";
import SearchFilterBar from "@/components/SearchFilterBar";

// Fixed Framer Motion variants (with proper TS types + valid easing)
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // FIXED — no more "easeOut" string
    },
  },
};

export default function ToolsSection({ tools }: { tools: Tool[] }) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-10"
    >
      <SearchFilterBar initialTools={tools} />
    </motion.section>
  );
}
