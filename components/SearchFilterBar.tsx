'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Tool } from '@/lib/getTools';
import ToolCard from '@/components/ToolCard';

export default function SearchFilterBar({ initialTools }: { initialTools: Tool[] }) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');
  const [pricing, setPricing] = useState('All');
  const [activeTab, setActiveTab] = useState('all');

  const [itemsToShow, setItemsToShow] = useState(18); // initial load
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(initialTools.map(t => t.category)))],
    [initialTools]
  );

  const pricings = useMemo(
    () => ['All', ...Array.from(new Set(initialTools.map(t => t.pricing)))],
    [initialTools]
  );

  // Alphabetical base sorting
  const alphabeticallySorted = useMemo(() => {
    return initialTools.slice().sort((a, b) => a.name.localeCompare(b.name));
  }, [initialTools]);

  // Tabs logic
  const tabSorted = useMemo(() => {
    let list = alphabeticallySorted.slice();

    if (activeTab === 'trending') {
      return list.sort((a, b) => (b.tags?.length || 0) - (a.tags?.length || 0));
    }

    if (activeTab === 'new') {
      return list.slice().reverse();
    }

    if (activeTab === 'featured') {
      return list.filter(t => t.featured === true);
    }

    return list; // ALL
  }, [alphabeticallySorted, activeTab]);

  // Search, category, pricing filters
  const filtered = useMemo(() => {
    let res = tabSorted.slice();

    if (q.trim()) {
      const qq = q.toLowerCase();
      res = res.filter(t =>
        (t.name + ' ' + t.description + ' ' + (t.tags || []).join(' '))
          .toLowerCase()
          .includes(qq)
      );
    }

    if (category !== 'All') res = res.filter(t => t.category === category);
    if (pricing !== 'All') res = res.filter(t => t.pricing === pricing);

    return res;
  }, [tabSorted, q, category, pricing]);

  // REAL Infinite Scroll – IntersectionObserver
useEffect(() => {
  if (!loadMoreRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      console.log("📌 Observer fired. isIntersecting =", entry.isIntersecting);

      if (entry.isIntersecting) {
        setItemsToShow(prev => {
          const next = prev + 18;
          console.log("➡️ Loading more. New count =", next);
          return Math.min(next, filtered.length);
        });
      }
    },
    {
      root: null,
      rootMargin: "0px 0px 500px 0px", // BIG margin = easier trigger
      threshold: 0.1,
    }
  );

  observer.observe(loadMoreRef.current);

  return () => observer.disconnect();
}, [filtered]);


  // Show visible
  const visibleTools = filtered.slice(0, itemsToShow);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full overflow-x-hidden"
    >
      {/* CATEGORY BAR */}
      <div className="category-bar flex gap-2 overflow-x-auto mb-4 py-1 scrollbar-none">
        {categories.map(c => (
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full border bg-white/5 text-gray-300 border-white/10
              hover:border-fuchsia-400 hover:text-white transition-all duration-200 whitespace-nowrap
              ${category === c ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20' : ''}`}
          >
            {c}
          </motion.button>
        ))}
      </div>

      {/* TABS BAR */}
{/* TABS BAR */}
<div className="tabs-bar flex gap-2 mb-4 overflow-x-auto scrollbar-none">
  {[
    { key: 'trending', label: '⭐ Trending' },
    { key: 'new', label: '🆕 New' },
    { key: 'featured', label: '🎯 Featured' },
    { key: 'all', label: 'All Tools' },
  ].map(tab => (
    <motion.button
      key={tab.key}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      onClick={() => {
        setActiveTab(tab.key);

        // 🟦 RESET filters completely when All Tools is selected
        if (tab.key === 'all') {
          setCategory('All');
          setPricing('All');
          setQ('');
        }

        setItemsToShow(18); // reset pagination
      }}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
        ${
          activeTab === tab.key
            ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow shadow-fuchsia-500/20'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
    >
      {tab.label}
    </motion.button>
  ))}
</div>


      {/* SEARCH + PRICING */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          value={q}
          onChange={e => {
            setQ(e.target.value);
            setItemsToShow(18); // reset when searching
          }}
          placeholder="Search tools..."
          className="w-full px-4 py-3 rounded-xl bg-white/5 text-white 
            border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
            placeholder:text-gray-500 transition"
        />

        <motion.select
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          value={pricing}
          onChange={e => {
            setPricing(e.target.value);
            setItemsToShow(18);
          }}
          className="px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10
            hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all"
        >
          {pricings.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </motion.select>
      </div>

      {/* TOOL GRID */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
      >
        {visibleTools.map(t => (
          <motion.div
            key={t.slug}
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ToolCard tool={t} />
          </motion.div>
        ))}
      </motion.div>

      {/* Infinite Scroll Trigger */}
      {itemsToShow < filtered.length && (
<div
  ref={loadMoreRef}
  className="h-24 w-full flex justify-center items-center mt-6 bg-white/5 text-slate-300 rounded-xl"
>
  ⬇️ Scroll to load more...
</div>

      )}

      {filtered.length === 0 && (
        <div className="mt-6 text-slate-500 text-center">No tools match your search.</div>
      )}
    </motion.div>
  );
}
