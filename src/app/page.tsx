import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { GitHubSection } from "@/components/github/GitHubSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#39FF88]/20 selection:text-[#39FF88]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero & Interactive Terminal */}
        <Hero />

        {/* Featured Projects with Architecture Details & Case Studies */}
        <ProjectsSection />

        {/* Technical Stack & Infrastructure Tools */}
        <SkillsSection />

        {/* GitHub Live Integration & Open Source Repositories */}
        <GitHubSection />

        {/* About & 6-Step Engineering Workflow & Active Learning Roadmap */}
        <AboutSection />

        {/* Contact Form & Direct Channels */}
        <ContactSection />
      </main>

      {/* Terminal Inspired Footer */}
      <Footer />
    </div>
  );
}
