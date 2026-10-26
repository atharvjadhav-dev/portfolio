"use client";

import React, { useState } from "react";
import { projectsData, ProjectItem } from "@/data/projects";
import { CaseStudyModal } from "@/components/case-study/CaseStudyModal";
import { ArrowUpRight, BookOpen, GitBranch, Server } from "lucide-react";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectItem | null>(null);

  const categories = ["All", "Cloud Infrastructure", "Infrastructure as Code", "Containers & Orchestration", "Cloud Security & Storage"];

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 border-b border-[#1c1c1c] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#39FF88] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#39FF88]" />
              <span>PRODUCTION SYSTEMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F5F5]">
              Things I&apos;ve built, deployed, and automated.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A1A1AA] max-w-2xl">
              Real infrastructure deployments with verifiable GitHub repositories, multi-stage pipelines, and documented architecture decisions.
            </p>
          </div>

          {/* Category Filter for rapid discovery */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-all shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#39FF88] text-[#0A0A0A] font-semibold border-[#39FF88]"
                    : "bg-[#141414] text-[#A1A1AA] border-[#262626] hover:border-[#39FF88]/40 hover:text-[#F5F5F5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="group bg-[#111111] border border-[#222222] hover:border-[#39FF88]/40 rounded-xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              {/* Subtle card top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#39FF88] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Header row: Index & Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#39FF88]">
                      0{index + 1}
                    </span>
                    <span className="text-[#3f3f46]">/</span>
                    <span className="text-xs font-mono text-[#A1A1AA]">
                      {project.category}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#161616] border border-[#2a2a2a] text-[#39FF88]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88]" />
                    {project.status.split(" / ")[0]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] group-hover:text-[#39FF88] transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Architecture Highlights */}
                <div className="bg-[#161616] p-3.5 rounded-lg border border-[#222222] space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                    <Server className="w-3 h-3 text-[#39FF88]" />
                    <span>Key Architecture Highlights</span>
                  </div>
                  <ul className="space-y-1 text-xs text-[#D4D4D8]">
                    {project.keyHighlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#39FF88] text-[10px] mt-0.5">▶</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-mono bg-[#18181b] border border-[#27272a] text-[#A1A1AA] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-[#1c1c1c] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCaseStudy(project)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded bg-[#181818] text-[#F5F5F5] hover:text-[#39FF88] hover:bg-[#202020] border border-[#2a2a2a] hover:border-[#39FF88]/40 transition-colors min-h-[40px]"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#39FF88]" />
                  <span>Case Study</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded bg-[#181818] text-[#A1A1AA] hover:text-[#F5F5F5] border border-[#2a2a2a] hover:border-[#404040] transition-colors min-h-[40px]"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Repository</span>
                  <ArrowUpRight className="w-3 h-3 text-[#71717A]" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal Dialog */}
      <CaseStudyModal
        project={activeCaseStudy}
        isOpen={Boolean(activeCaseStudy)}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  );
}
