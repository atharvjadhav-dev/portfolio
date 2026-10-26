"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { socialsData } from "@/data/socials";
import { Menu, X, ArrowUpRight, FileDown, Terminal as TerminalIcon } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "GitHub", href: "#github" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
        isScrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-[#262626] shadow-sm shadow-black/40"
          : "bg-[#0A0A0A]/80 backdrop-blur-sm border-[#1c1c1c]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / Prompt */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm sm:text-base text-[#F5F5F5] hover:text-[#39FF88] transition-colors group py-2"
          aria-label="Home - Atharv Jadhav"
        >
          <span className="text-[#39FF88] group-hover:translate-x-0.5 transition-transform font-bold">~</span>
          <span className="text-[#A1A1AA] group-hover:text-[#F5F5F5]">/</span>
          <span className="font-semibold tracking-tight text-[#F5F5F5]">atharv</span>
          <span className="inline-block w-2 h-3.5 bg-[#39FF88] opacity-75 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-xs lg:text-sm font-medium text-[#A1A1AA] hover:text-[#39FF88] transition-colors rounded hover:bg-[#161616]"
            >
              {link.label}
            </a>
          ))}

          <div className="h-4 w-px bg-[#262626] mx-2" />

          {/* GitHub Link */}
          <a
            href={socialsData.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 text-xs lg:text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors hover:bg-[#161616] rounded"
            aria-label="GitHub Profile (opens in new tab)"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A]" />
          </a>

          {/* Resume CTA */}
          <a
            href={socialsData.resume.url}
            download={socialsData.resume.filename}
            className="flex items-center gap-1.5 ml-1 px-3 py-1.5 text-xs lg:text-sm font-medium bg-[#161616] text-[#39FF88] border border-[#39FF88]/30 rounded hover:bg-[#39FF88]/10 hover:border-[#39FF88] transition-all"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={socialsData.resume.url}
            download={socialsData.resume.filename}
            className="flex items-center justify-center p-2 text-xs font-mono text-[#39FF88] bg-[#161616] border border-[#39FF88]/30 rounded min-h-[44px] min-w-[44px]"
            aria-label="Download Resume"
          >
            <FileDown className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#161616] rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#262626] bg-[#0A0A0A]/98 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            <div className="px-3 py-2 text-xs font-mono text-[#71717A] uppercase tracking-wider flex items-center gap-2">
              <TerminalIcon className="w-3.5 h-3.5 text-[#39FF88]" />
              <span>Navigation</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-3 text-sm font-medium text-[#F5F5F5] hover:text-[#39FF88] hover:bg-[#161616] rounded transition-colors flex items-center justify-between min-h-[44px]"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#71717A]">→</span>
              </a>
            ))}

            <div className="my-2 border-t border-[#1f1f1f]" />

            <a
              href={socialsData.github.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-3 text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#161616] rounded transition-colors flex items-center justify-between min-h-[44px]"
            >
              <div className="flex items-center gap-2">
                <span>GitHub Profile</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#71717A]" />
            </a>

            <a
              href={socialsData.resume.url}
              download={socialsData.resume.filename}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 px-3 py-3 text-sm font-medium bg-[#161616] text-[#39FF88] border border-[#39FF88]/40 rounded hover:bg-[#39FF88]/15 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
