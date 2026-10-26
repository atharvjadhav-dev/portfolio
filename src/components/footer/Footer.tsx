"use client";

import React, { useEffect, useState } from "react";
import { socialsData } from "@/data/socials";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";
import { ArrowUp, Mail, Activity } from "lucide-react";

export function Footer() {
  const [healthStatus, setHealthStatus] = useState<{
    status: string;
    uptimeSeconds?: number;
  } | null>(null);

  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    let isMounted = true;
    fetch("/health.json")
      .then((r) => r.json())
      .then((data) => {
        if (!isMounted) return;
        setHealthStatus(data);
        setCurrentYear(new Date().getFullYear());
      })
      .catch(() => {
        if (!isMounted) return;
        setHealthStatus({ status: "offline" });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#1c1c1c] bg-[#0A0A0A] py-10 font-mono text-xs text-[#71717A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Terminal echo command */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-[#181818] pb-6">
          <div className="flex items-center gap-2">
            <span className="text-[#39FF88]">$</span>
            <span className="text-[#F5F5F5]">
              echo &quot;Thanks for exploring my corner of the cloud.&quot;
            </span>
          </div>

          {/* Health indicator */}
          <div className="flex items-center gap-2 text-[11px]">
            <Activity className="w-3.5 h-3.5 text-[#39FF88]" />
            <span className="text-[#A1A1AA]">Edge Health:</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#141414] border border-[#222222] text-[#39FF88]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] animate-pulse" />
              {healthStatus?.status === "healthy" ? "All systems nominal" : "Connecting..."}
            </span>
          </div>
        </div>

        {/* Links and Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href={socialsData.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1AA] hover:text-[#39FF88] transition-colors flex items-center gap-1.5 py-1"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={socialsData.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1AA] hover:text-[#39FF88] transition-colors flex items-center gap-1.5 py-1"
            >
              <LinkedInIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href={socialsData.email.url}
              className="text-[#A1A1AA] hover:text-[#39FF88] transition-colors flex items-center gap-1.5 py-1"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span>© {currentYear} Atharv Jadhav. Built with Next.js & Tailwind.</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#161616] border border-[#262626] hover:border-[#39FF88]/40 hover:text-[#F5F5F5] transition-colors min-h-[32px]"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#39FF88]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
