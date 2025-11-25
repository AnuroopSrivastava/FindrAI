"use client";

import { useState } from "react";
import React from "react";
import { Mail, Phone, User, MessageSquare, ClipboardList, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      setShowModal(true);
      form.reset();

      const audio = document.getElementById("successSound") as HTMLAudioElement;
      audio?.play();

      setTimeout(() => {
        setShowModal(false);
      }, 2500);
    } else {
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <>
      <audio id="successSound">
        <source src="/sounds/success.mp3" type="audio/mp3" />
      </audio>

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl rounded-3xl border border-slate-800/70 bg-slate-900/60 p-10 shadow-xl shadow-slate-950/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-emerald-900/40">
          
          {/* Header */}
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl text-sky-400 mb-3">
            Contact Me
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Have any questions, ideas, or want to collaborate? Send a message — I’ll get back to you soon!
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              {
                icon: User,
                name: "name",
                placeholder: "Full Name",
                type: "",
                required: true,
              },
              {
                icon: Mail,
                name: "email",
                placeholder: "Email Address",
                type: "email",
                required: true,
              },
              {
                icon: Phone,
                name: "phone",
                placeholder: "Phone Number",
                type: "tel",
              },
              {
                icon: ClipboardList,
                name: "subject",
                placeholder: "Subject",
                type: "",
                required: true,
              },
            ].map((field, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-slate-900/40 rounded-xl border border-slate-700 backdrop-blur-sm
                focus-within:border-sky-500/60 hover:border-sky-500/60 transition-all duration-300"
              >
                <field.icon className="w-5 h-5 text-sky-400" />
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete="off"
                  className="bg-transparent text-slate-200 placeholder-slate-500 w-full outline-none"
                />
              </div>
            ))}

            {/* Message */}
            <div className="flex items-start gap-3 p-3 bg-slate-900/40 rounded-xl border border-slate-700 backdrop-blur-sm
              focus-within:border-sky-500/60 hover:border-sky-500/60 transition-all duration-300">
              <MessageSquare className="w-5 h-5 text-sky-400 mt-1" />
              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                required
                autoComplete="off"
                className="bg-transparent text-slate-200 placeholder-slate-500 w-full outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 font-semibold text-white transition-all hover:scale-[1.015] disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Mini Footer */}
          <p className="mt-6 text-center text-slate-400 text-sm">
            💬 I usually reply within{" "}
            <span className="text-emerald-400 font-semibold">24 hours</span>!
          </p>

        </div>
      </main>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-slate-900/80 border border-emerald-500/40 p-8 rounded-2xl text-center shadow-2xl">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-slate-100 mb-1">Message Sent!</h3>
            <p className="text-slate-400 mb-5">I’ll get back to you very soon. 😊</p>

            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-all text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
