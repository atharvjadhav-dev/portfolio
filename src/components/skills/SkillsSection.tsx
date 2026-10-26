"use client";

import React from "react";
import { skillCategories } from "@/data/skills";
import { Cloud, Box, Cpu, Network, Activity, Terminal as TerminalIcon } from "lucide-react";

export function SkillsSection() {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "cloud":
        return <Cloud className="w-5 h-5 text-[#39FF88]" />;
      case "containers":
        return <Box className="w-5 h-5 text-[#39FF88]" />;
      case "iac":
        return <Cpu className="w-5 h-5 text-[#39FF88]" />;
      case "os-networking":
        return <Network className="w-5 h-5 text-[#39FF88]" />;
      case "observability":
        return <Activity className="w-5 h-5 text-[#39FF88]" />;
      default:
        return <TerminalIcon className="w-5 h-5 text-[#39FF88]" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 border-b border-[#1c1c1c] relative bg-[#0C0C0C]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#39FF88] uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#39FF88]" />
            <span>ENGINEERING TOOLKIT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F5F5]">
            The tools behind the deployments.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Technologies I use to build, package, automate, and monitor systems. Focus is placed on repeatable patterns, least-privilege security, and declarative configurations.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[#111111] border border-[#222222] hover:border-[#333333] rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-colors shadow-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#181818] border border-[#262626]">
                    {getCategoryIcon(category.id)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-[#F5F5F5]">{category.title}</h3>
                    <p className="text-xs text-[#71717A]">{category.description}</p>
                  </div>
                </div>

                {/* Skill List */}
                <div className="space-y-2 mt-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`p-2.5 rounded-lg border text-xs font-mono transition-colors ${
                        skill.highlight
                          ? "bg-[#161616] border-[#39FF88]/30 hover:border-[#39FF88]/60"
                          : "bg-[#141414] border-[#222222] hover:border-[#2f2f2f]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#F5F5F5] flex items-center gap-1.5">
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88]" />
                          )}
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-[#71717A] uppercase">{skill.category}</span>
                      </div>
                      <p className="text-[11px] text-[#A1A1AA] mt-1 font-sans leading-normal">
                        {skill.tagline}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on skills */}
        <div className="mt-8 p-4 rounded-lg bg-[#141414] border border-[#222222] flex items-start sm:items-center gap-3 text-xs text-[#A1A1AA] font-mono">
          <span className="text-[#39FF88] text-base">ℹ</span>
          <span>
            No artificial 95% proficiency bars. Each technology listed represents hands-on project implementations with actual configuration files, build logs, and code in the repositories below.
          </span>
        </div>
      </div>
    </section>
  );
}
