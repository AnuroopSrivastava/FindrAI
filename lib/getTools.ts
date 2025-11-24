import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export type Tool = {
  name: string;
  slug: string;
  category: string;
  pricing: string;
  description: string;
  website: string;
  logo?: string;
  tags?: string[];
  featured?: boolean; // ✅ Added this line
};

export async function getAllTools(): Promise<Tool[]> {
  const p = path.join(process.cwd(), 'data', 'tools.json');
  const raw = await readFile(p, 'utf-8');
  return JSON.parse(raw) as Tool[];
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const tools = await getAllTools();
  return tools.find(t => t.slug === slug) ?? null;
}