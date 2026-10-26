"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { Shield, ArrowRight, Compass, Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 border-b border-[#1c1c1c] relative bg-[#0C0C0C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Philosophy & Intro */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#39FF88] uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-[#39FF88]" />
                <span>ABOUT & METHODOLOGY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F5F5]">
                Engineering with intent.
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              {profileData.detailedBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Principles Box */}
            <div className="p-4 rounded-xl bg-[#111111] border border-[#222222] space-y-3">
              <div className="text-xs font-mono text-[#39FF88] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Core Operating Principles</span>
              </div>
              <ul className="space-y-2 text-xs text-[#D4D4D8] font-mono">
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF88]">✔</span>
                  <span>Everything codified in Git; no manual console edits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF88]">✔</span>
                  <span>Least privilege IAM; default deny for incoming traffic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF88]">✔</span>
                  <span>Deterministic CI/CD builds with automated verification.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Engineering Workflow & Learning Roadmap */}
          <div className="lg:col-span-7 space-y-8">
            {/* The 6-Step Workflow */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#39FF88] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#39FF88]" />
                  <span>The Engineering Workflow</span>
                </h3>
                <span className="text-xs font-mono text-[#71717A] hidden sm:inline">
                  Plan → Build → Automate → Deploy → Monitor → Improve
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {profileData.workflow.map((item) => (
                  <div
                    key={item.step}
                    className="p-3.5 rounded-lg bg-[#111111] border border-[#222222] hover:border-[#39FF88]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs text-[#39FF88] font-bold">
                        {item.step}
                      </span>
                      <h4 className="font-semibold text-sm text-[#F5F5F5] mt-1">{item.title}</h4>
                      <p className="text-[11px] text-[#A1A1AA] mt-1.5 leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Learning Goals */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-4">
                <Sparkles className="w-4 h-4 text-[#39FF88]" />
                <span>Active Learning Roadmap & Technical Objectives</span>
              </div>

              <div className="space-y-3">
                {profileData.learningGoals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#111111] border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#F5F5F5]">
                          {goal.title}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-mono rounded-full ${
                            goal.status === "in-progress"
                              ? "bg-[#39FF88]/15 text-[#39FF88] border border-[#39FF88]/30"
                              : "bg-[#222222] text-[#A1A1AA]"
                          }`}
                        >
                          {goal.status === "in-progress" ? "In Progress" : "Planned"}
                        </span>
                      </div>
                      <p className="text-xs text-[#A1A1AA]">{goal.focus}</p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#71717A] hidden sm:block shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
