"use client";

import React, { useEffect } from "react";
import { ProjectItem } from "@/data/projects";
import { X, ArrowUpRight, ShieldCheck, Cpu, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";

interface CaseStudyModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ project, isOpen, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl my-8 bg-[#111111] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#F5F5F5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#161616] px-5 py-4 border-b border-[#262626] flex items-center justify-between shrink-0">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#39FF88]">
              <span>[CASE STUDY]</span>
              <span className="text-[#71717A]">•</span>
              <span className="text-[#A1A1AA]">{project.category}</span>
            </div>
            <h2 id="case-study-title" className="text-lg sm:text-xl font-bold tracking-tight text-[#F5F5F5]">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#202020] text-[#F5F5F5] hover:text-[#39FF88] border border-[#333333] rounded hover:border-[#39FF88]/40 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#222222] rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close case study modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm leading-relaxed">
          {/* Problem Statement */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono tracking-wider uppercase text-[#39FF88] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#39FF88] rounded-full inline-block" />
              01. Problem Statement
            </h3>
            <p className="text-[#D4D4D8] bg-[#161616] p-4 rounded-lg border border-[#222222] font-sans">
              {project.caseStudy.problem}
            </p>
          </section>

          {/* Architecture & Flow */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono tracking-wider uppercase text-[#39FF88] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#39FF88]" />
              02. Architecture & Request Flow
            </h3>
            <div className="bg-[#141414] p-4 rounded-lg border border-[#222222] space-y-2.5">
              {project.caseStudy.architecture.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-xs text-[#39FF88] shrink-0 mt-0.5">
                    [{idx + 1}]
                  </span>
                  <span className="text-[#D4D4D8]">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Choices */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono tracking-wider uppercase text-[#39FF88] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#39FF88] rounded-full inline-block" />
              03. Technology Decision Records
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.caseStudy.techChoices.map((tc, idx) => (
                <div key={idx} className="p-3.5 bg-[#161616] border border-[#262626] rounded-lg space-y-1">
                  <div className="font-mono text-xs text-[#39FF88] font-semibold">{tc.technology}</div>
                  <p className="text-xs text-[#A1A1AA] leading-normal">{tc.reason}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Implementation Details */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono tracking-wider uppercase text-[#39FF88] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#39FF88]" />
              04. Key Implementation Steps
            </h3>
            <ul className="space-y-2 bg-[#161616] p-4 rounded-lg border border-[#222222]">
              {project.caseStudy.implementation.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[#D4D4D8]">
                  <span className="text-[#39FF88] text-sm">✔</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Security Considerations */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono tracking-wider uppercase text-[#39FF88] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#39FF88]" />
              05. Security Architecture
            </h3>
            <div className="bg-[#161616] p-4 rounded-lg border border-[#262626] space-y-2">
              {project.caseStudy.security.map((sec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#D4D4D8]">
                  <span className="text-[#39FF88] font-mono">🔒</span>
                  <span>{sec}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Engineering Challenges & Solutions */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono tracking-wider uppercase text-[#39FF88] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#eab308]" />
              06. Challenges & Solutions
            </h3>
            <div className="space-y-3">
              {project.caseStudy.challenges.map((ch, idx) => (
                <div key={idx} className="p-3.5 bg-[#161616] border border-[#262626] rounded-lg space-y-1.5">
                  <div className="text-xs font-medium text-[#fca5a5]">
                    <span className="font-mono font-bold text-[#ef4444]">Challenge:</span> {ch.challenge}
                  </div>
                  <div className="text-xs text-[#D4D4D8]">
                    <span className="font-mono font-bold text-[#39FF88]">Solution:</span> {ch.solution}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lessons Learned */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono tracking-wider uppercase text-[#39FF88] flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#39FF88]" />
              07. Lessons Learned & Next Iterations
            </h3>
            <ul className="space-y-1.5 bg-[#161616] p-4 rounded-lg border border-[#222222]">
              {project.caseStudy.lessonsLearned.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#A1A1AA]">
                  <span className="text-[#39FF88]">•</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#161616] px-5 py-3.5 border-t border-[#262626] flex items-center justify-between shrink-0">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono bg-[#39FF88] text-[#0A0A0A] font-semibold rounded hover:bg-[#2fe075] transition-colors"
          >
            <span>View Source Repository</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono bg-[#222222] text-[#A1A1AA] hover:text-[#F5F5F5] rounded border border-[#2e2e2e] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
