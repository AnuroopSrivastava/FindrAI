"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

type Message = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read?: boolean;
  createdAt?: string;
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0, limit: 10, unreadCount: 0 });
  const [selected, setSelected] = useState<Message | null>(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySubject, setReplySubject] = useState("");

  const limit = meta.limit || 10;

  const fetchPage = async (page = 1) => {
    const res = await fetch(`/api/admin/messages?page=${page}&limit=${limit}`);
    const json = await res.json();
    setMessages(json.messages || []);
    setMeta(json.meta || meta);
  };

  useEffect(() => {
    const ok = localStorage.getItem("admin-auth");
    if (!ok) {
      window.location.href = "/admin/login";
      return;
    }
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleRead = async (id: string, read: boolean) => {
    await fetch("/api/admin/mark-read", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    fetchPage(meta.page);
  };

  const doDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/delete?id=${id}`, { method: "DELETE" });
    fetchPage(meta.page);
  };

  const openReply = (msg: Message) => {
    setSelected(msg);
    setReplySubject(`Re: ${msg.subject}`);
    setReplyText(`Hi ${msg.name},\n\n`);
    setReplyOpen(true);
  };

  const sendReply = async () => {
    if (!selected) return;
    await fetch("/api/admin/reply", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: selected._id,
        to: selected.email,
        replySubject,
        replyBody: replyText,
      }),
    });
    setReplyOpen(false);
    setReplyText("");
    fetchPage(meta.page);
  };

  const go = (delta: number) => {
    const next = Math.min(Math.max(1, meta.page + delta), meta.pages || 1);
    if (next !== meta.page) fetchPage(next);
  };

  return (
    <div className="min-h-screen bg-black/90 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-400">📩 Admin Dashboard</h1>
          <div className="text-sm text-white/70">
            Unread: <span className="text-blue-300 font-semibold">{meta.unreadCount}</span>
          </div>
        </div>

        <div className="grid gap-4">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`p-5 rounded-2xl ${
                m.read ? "bg-white/3" : "bg-gradient-to-b from-[#0f1724]/60 to-[#071126]/40"
              } border border-white/6 shadow-lg transition-transform duration-200 transform hover:scale-[1.01]`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{m.subject}</h3>
                  <p className="text-sm text-white/60">
                    {m.name} — {m.email} {m.phone ? `• ${m.phone}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    title={m.read ? "Mark unread" : "Mark read"}
                    onClick={() => toggleRead(m._id, !m.read)}
                    className={`p-2 rounded-md ${
                      m.read ? "bg-white/5" : "bg-blue-600/90"
                    } hover:opacity-90`}
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </button>

                  <button
                    title="Reply"
                    onClick={() => openReply(m)}
                    className="p-2 rounded-md bg-white/5 hover:bg-white/6"
                  >
                    <Mail className="w-4 h-4 text-white" />
                  </button>

                  <button
                    title="Delete"
                    onClick={() => doDelete(m._id)}
                    className="p-2 rounded-md bg-red-600/90 hover:opacity-90"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="mt-3 text-white/70">
                <p style={{ whiteSpace: "pre-wrap" }}>{m.message}</p>
              </div>

              <div className="mt-3 text-sm text-white/50 flex justify-between items-center">
                <span>{new Date(m.createdAt || "").toLocaleString()}</span>
                <span className="text-xs">{m.read ? "Read" : "Unread"}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={() => go(-1)} className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/6">
            <ArrowLeft className="inline w-4 h-4 mr-1" /> Prev
          </button>

          <div className="px-3 py-1 rounded-md bg-white/3">
            Page {meta.page} / {meta.pages}
          </div>

          <button onClick={() => go(1)} className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/6">
            Next <ArrowRight className="inline w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Reply Modal */}
      {replyOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-2xl p-6 rounded-2xl bg-gradient-to-b from-[#0f1b2d]/70 to-[#0d1a27]/30 border border-blue-500/20 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-2">
              Reply to {selected.name} — {selected.email}
            </h2>

            <input
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 mb-3 text-white"
              value={replySubject}
              onChange={(e) => setReplySubject(e.target.value)}
            />

            <textarea
              rows={8}
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white mb-3"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className="flex gap-3 justify-end">
              <button onClick={() => setReplyOpen(false)} className="px-4 py-2 rounded-lg bg-white/5">
                Cancel
              </button>
              <button onClick={sendReply} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
