"use client";

import { motion } from "framer-motion";
import type { Tool } from "@/lib/getTools";
import SearchFilterBar from "@/components/SearchFilterBar";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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
