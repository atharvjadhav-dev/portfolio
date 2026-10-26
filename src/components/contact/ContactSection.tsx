"use client";

import React, { useState } from "react";
import { socialsData } from "@/data/socials";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";
import { Mail, FileDown, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight, Cpu } from "lucide-react";

const SERVERLESS_ENDPOINT = "https://0gqy61gwd2.execute-api.ap-south-1.amazonaws.com";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _hp: "", // Honeypot field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
    submissionId?: string;
  } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Name is required.";
    } else if (formData.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      errs.subject = "Subject is required.";
    } else if (formData.subject.trim().length < 3) {
      errs.subject = "Subject must be at least 3 characters.";
    }

    if (!formData.message.trim()) {
      errs.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const res = await fetch(SERVERLESS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({
          type: "success",
          message: data.message || "Thank you! Your message was received by Atharv's AWS Lambda backend.",
          submissionId: data.submissionId,
        });
        setFormData({ name: "", email: "", subject: "", message: "", _hp: "" });
        setErrors({});
      } else {
        if (data.errors) {
          setErrors(data.errors);
        }
        setFeedback({
          type: "error",
          message: data.message || "Failed to process message. Please email atharvjadhav.dev@gmail.com directly.",
        });
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setFeedback({
        type: "error",
        message: "Network error occurred while calling the serverless backend. Please reach out to atharvjadhav.dev@gmail.com directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#39FF88] uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-[#39FF88]" />
                <span>COMMUNICATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F5F5]">
                Have a project in mind? Let&apos;s connect.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Whether you have questions about cloud architecture, automated pipelines, or potential engineering opportunities, feel free to drop a line.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3 pt-2">
              {/* Email */}
              <a
                href={socialsData.email.url}
                className="p-4 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#39FF88]/40 transition-all flex items-center justify-between group min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626] text-[#39FF88]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#71717A]">Direct Email</div>
                    <div className="text-xs sm:text-sm font-mono text-[#F5F5F5] group-hover:text-[#39FF88] transition-colors">
                      {socialsData.email.label}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[#39FF88] transition-colors" />
              </a>

              {/* GitHub */}
              <a
                href={socialsData.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#39FF88]/40 transition-all flex items-center justify-between group min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626] text-[#39FF88]">
                    <GitHubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#71717A]">GitHub Repositories</div>
                    <div className="text-xs sm:text-sm font-mono text-[#F5F5F5] group-hover:text-[#39FF88] transition-colors">
                      {socialsData.github.label}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[#39FF88] transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href={socialsData.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#39FF88]/40 transition-all flex items-center justify-between group min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626] text-[#39FF88]">
                    <LinkedInIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#71717A]">LinkedIn Profile</div>
                    <div className="text-xs sm:text-sm font-mono text-[#F5F5F5] group-hover:text-[#39FF88] transition-colors">
                      {socialsData.linkedin.label}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#71717A] group-hover:text-[#39FF88] transition-colors" />
              </a>

              {/* Resume Download */}
              <a
                href={socialsData.resume.url}
                download={socialsData.resume.filename}
                className="p-4 rounded-xl bg-[#141414] border border-[#39FF88]/20 hover:border-[#39FF88] transition-all flex items-center justify-between group min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#2a2a2a] text-[#39FF88]">
                    <FileDown className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#71717A]">Resume File</div>
                    <div className="text-xs sm:text-sm font-mono text-[#39FF88] font-semibold">
                      Download PDF Resume
                    </div>
                  </div>
                </div>
                <FileDown className="w-4 h-4 text-[#39FF88]" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 sm:p-8 shadow-xl">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#F5F5F5] flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#39FF88]" />
                    <span>Send a direct message</span>
                  </h3>
                  <p className="text-xs text-[#71717A] mt-1 font-mono">
                    Validated and processed serverlessly via AWS Lambda & API Gateway.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161616] border border-[#2a2a2a] text-[11px] font-mono text-[#39FF88] self-start sm:self-auto">
                  <Cpu className="w-3 h-3 text-[#39FF88]" />
                  <span>AWS Lambda Active</span>
                </div>
              </div>

              {feedback && (
                <div
                  className={`p-4 rounded-lg mb-6 text-xs font-mono flex flex-col gap-1.5 ${
                    feedback.type === "success"
                      ? "bg-[#0b1f13] border border-[#166534] text-[#86efac]"
                      : "bg-[#200e0e] border border-[#991b1b] text-[#fca5a5]"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {feedback.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold">{feedback.message}</p>
                      {feedback.submissionId && (
                        <p className="text-[11px] text-[#A1A1AA] mt-0.5">
                          Tracking ID: <span className="text-[#39FF88]">{feedback.submissionId}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot field (hidden from view) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="_hp_field">Do not fill this</label>
                  <input
                    id="_hp_field"
                    type="text"
                    name="_hp"
                    tabIndex={-1}
                    value={formData._hp}
                    onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-mono text-[#D4D4D8]">
                      Name <span className="text-[#39FF88]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      placeholder="e.g. Alex Chen"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#161616] text-[#F5F5F5] text-xs sm:text-sm font-sans border transition-colors focus:outline-none min-h-[44px] ${
                        errors.name ? "border-[#ef4444]" : "border-[#2a2a2a] focus:border-[#39FF88]"
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-[#f87171]">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-mono text-[#D4D4D8]">
                      Email <span className="text-[#39FF88]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      placeholder="alex@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#161616] text-[#F5F5F5] text-xs sm:text-sm font-sans border transition-colors focus:outline-none min-h-[44px] ${
                        errors.email ? "border-[#ef4444]" : "border-[#2a2a2a] focus:border-[#39FF88]"
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-[#f87171]">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-mono text-[#D4D4D8]">
                    Subject <span className="text-[#39FF88]">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: "" });
                    }}
                    placeholder="DevOps Engineering Opportunity / Infrastructure Collaboration"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#161616] text-[#F5F5F5] text-xs sm:text-sm font-sans border transition-colors focus:outline-none min-h-[44px] ${
                      errors.subject ? "border-[#ef4444]" : "border-[#2a2a2a] focus:border-[#39FF88]"
                    }`}
                    required
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-mono text-[#f87171]">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[#D4D4D8]">
                    Message <span className="text-[#39FF88]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    placeholder="Tell me about your project, team requirements, or cloud architecture inquiry..."
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#161616] text-[#F5F5F5] text-xs sm:text-sm font-sans border transition-colors focus:outline-none resize-none ${
                      errors.message ? "border-[#ef4444]" : "border-[#2a2a2a] focus:border-[#39FF88]"
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-[#f87171]">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#39FF88] text-[#0A0A0A] font-semibold text-xs sm:text-sm hover:bg-[#2fe075] transition-all disabled:opacity-50 min-h-[44px] shadow-sm shadow-[#39FF88]/20"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching to Lambda...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
