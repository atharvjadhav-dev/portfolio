"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { socialsData } from "@/data/socials";
import { Terminal } from "@/components/terminal/Terminal";
import { ArrowDown, ArrowUpRight, FileDown, Layers } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 border-b border-[#1c1c1c] overflow-hidden"
    >
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#F5F5F5 1px, transparent 1px), linear-gradient(90deg, #F5F5F5 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Introduction & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
            {/* Availability Pill */}
            {profileData.availability.isOpen && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#2a2a2a] text-xs font-mono text-[#D4D4D8] self-start shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF88] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF88]" />
                </span>
                <span className="text-[#39FF88] font-medium">{profileData.availability.label}</span>
              </div>
            )}

            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-[#A1A1AA] uppercase">
              <span className="text-[#39FF88]">$</span>
              <span>{profileData.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F5] leading-[1.15] text-balance">
              Building reliable systems.{" "}
              <span className="text-[#A1A1AA] block sm:inline">
                Automating everything else.
              </span>
            </h1>

            {/* Supporting description */}
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl">
              {profileData.bio}
            </p>

            {/* Quick Metrics / Focus Badges */}
            <div className="flex flex-wrap gap-2 text-xs font-mono pt-1 text-[#D4D4D8]">
              <span className="px-2.5 py-1 bg-[#141414] border border-[#262626] rounded">
                AWS Architecture
              </span>
              <span className="px-2.5 py-1 bg-[#141414] border border-[#262626] rounded">
                Terraform IaC
              </span>
              <span className="px-2.5 py-1 bg-[#141414] border border-[#262626] rounded">
                Docker & Kubernetes
              </span>
              <span className="px-2.5 py-1 bg-[#141414] border border-[#262626] rounded">
                GitHub Actions CI/CD
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#39FF88] text-[#0A0A0A] font-semibold text-sm hover:bg-[#2fe075] transition-all shadow-md shadow-[#39FF88]/10 active:scale-[0.98] min-h-[44px]"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Projects</span>
                <ArrowDown className="w-3.5 h-3.5 ml-0.5" />
              </a>

              <a
                href={socialsData.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#161616] text-[#F5F5F5] border border-[#2c2c2c] hover:border-[#39FF88]/50 hover:bg-[#202020] font-medium text-sm transition-all min-h-[44px]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-[#A1A1AA]" />
              </a>

              <a
                href={socialsData.resume.url}
                download={socialsData.resume.filename}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-transparent text-[#A1A1AA] hover:text-[#39FF88] border border-transparent hover:border-[#39FF88]/30 font-mono text-xs sm:text-sm transition-all min-h-[44px]"
              >
                <FileDown className="w-4 h-4 text-[#39FF88]" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Terminal */}
          <div className="lg:col-span-5 w-full mt-2 lg:mt-0">
            <div className="relative">
              {/* Subtle accent highlight behind terminal */}
              <div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-[#39FF88]/10 to-transparent blur-xl pointer-events-none opacity-40"
                aria-hidden="true"
              />
              <Terminal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
