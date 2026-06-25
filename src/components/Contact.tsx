"use client";

import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { budgetRanges, projectTypes } from "@/lib/lead";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="start" className="scroll-mt-24 border-t border-white/5 py-24 md:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Start"
            title="Start a project."
            description="Tell us where you want to go. We'll reply within one business day with clear next steps — no noise."
          />
          <div className="mt-10 space-y-4 text-sm text-slate-400">
            <p>
              Prefer email?{" "}
              <a
                href="mailto:hello@northwise.pt"
                className="font-medium text-brand-400 hover:text-brand-300"
              >
                hello@northwise.pt
              </a>
            </p>
            <p>Based in Northern Portugal — working with clients worldwide.</p>
          </div>
        </div>

        <div className="card">
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/15 text-2xl text-brand-300">
                ✓
              </div>
              <h3 className="mt-6 text-xl font-semibold">Message sent.</h3>
              <p className="mt-3 max-w-sm text-sm text-slate-400">
                Thanks for reaching out. We&apos;ll be in touch within one business day.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-medium text-brand-400 hover:text-brand-300"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot field — hidden from humans */}
              <div aria-hidden="true" className="absolute left-[-9999px]">
                <label htmlFor="website">Leave this empty</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">
                    Name *
                  </label>
                  <input id="name" name="name" type="text" required className="field-input" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="field-label">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="field-input"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="field-label">
                  Company
                </label>
                <input id="company" name="company" type="text" className="field-input" placeholder="Optional" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="projectType" className="field-label">
                    Project type *
                  </label>
                  <select id="projectType" name="projectType" required defaultValue="" className="field-input">
                    <option value="" disabled>
                      Select…
                    </option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="field-label">
                    Budget *
                  </label>
                  <select id="budget" name="budget" required defaultValue="" className="field-input">
                    <option value="" disabled>
                      Select…
                    </option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="field-label">
                  Project details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="field-input resize-none"
                  placeholder="What are you trying to build, and what does success look like?"
                />
              </div>

              {status === "error" && error && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : <span className="bracket">Send</span>}
              </button>

              <p className="text-xs text-slate-500">
                By submitting, you agree to be contacted about your enquiry. We never share your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
