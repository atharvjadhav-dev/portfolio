"use client";

import React, { useEffect, useState } from "react";
import { socialsData } from "@/data/socials";
import { GitHubRepo, FALLBACK_REPOS } from "@/data/repos";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import { GitBranch, Star, GitFork, ArrowUpRight, RefreshCw, AlertCircle } from "lucide-react";

export function GitHubSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch("https://api.github.com/users/atharvjadhav-dev/repos?sort=updated&per_page=12", {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub responded with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formatted: GitHubRepo[] = data.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            htmlUrl: repo.html_url,
            language: repo.language,
            stars: repo.stargazers_count ?? 0,
            forks: repo.forks_count ?? 0,
            updatedAt: repo.updated_at,
            topics: repo.topics ?? [],
            isArchived: repo.archived ?? false,
          }));
          setRepos(formatted);
          setIsFallback(false);
        } else {
          setRepos(FALLBACK_REPOS);
          setIsFallback(true);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn("GitHub live fetch fallback triggered:", err.message);
        setRepos(FALLBACK_REPOS);
        setIsFallback(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("https://api.github.com/users/atharvjadhav-dev/repos?sort=updated&per_page=12", {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      if (!res.ok) throw new Error("Rate limit or network error");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted: GitHubRepo[] = data.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          htmlUrl: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          updatedAt: repo.updated_at,
          topics: repo.topics ?? [],
          isArchived: repo.archived ?? false,
        }));
        setRepos(formatted);
        setIsFallback(false);
      } else {
        setRepos(FALLBACK_REPOS);
        setIsFallback(true);
      }
    } catch {
      setRepos(FALLBACK_REPOS);
      setIsFallback(true);
      setErrorMsg("Using cached repository inventory.");
    } finally {
      setLoading(false);
    }
  };

  const getLanguageColor = (lang: string | null) => {
    switch (lang) {
      case "TypeScript":
        return "#3178c6";
      case "JavaScript":
        return "#f7df1e";
      case "HCL":
        return "#844fba";
      case "HTML":
        return "#e34c26";
      case "Shell":
      case "Bash":
        return "#89e051";
      default:
        return "#39FF88";
    }
  };

  return (
    <section id="github" className="py-16 sm:py-20 lg:py-24 border-b border-[#1c1c1c] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#39FF88] uppercase mb-2">
              <GitHubIcon className="w-4 h-4 text-[#39FF88]" />
              <span>SOURCE CODE & AUDITABILITY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F5F5]">
              Open source. Real work. Continuous improvement.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A1A1AA] max-w-2xl">
              Inspect actual codebases, commit histories, Terraform module declarations, and multi-stage Docker builds on GitHub.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={socialsData.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded bg-[#161616] text-[#F5F5F5] border border-[#2a2a2a] hover:border-[#39FF88]/50 hover:bg-[#202020] transition-colors min-h-[44px]"
            >
              <GitHubIcon className="w-4 h-4 text-[#39FF88]" />
              <span>atharvjadhav-dev</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A]" />
            </a>

            <button
              type="button"
              onClick={handleRefresh}
              title="Refresh repository data"
              className="p-2.5 text-[#A1A1AA] hover:text-[#F5F5F5] bg-[#161616] border border-[#262626] rounded hover:border-[#39FF88]/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Refresh repository data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#39FF88]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Fallback Notice if GitHub rate-limited or offline */}
        {isFallback && !loading && (
          <div className="mb-6 p-3 rounded-lg bg-[#18150a] border border-[#854d0e]/40 flex items-center gap-2.5 text-xs text-[#fde047] font-mono">
            <AlertCircle className="w-4 h-4 text-[#eab308] shrink-0" />
            <span>
              Displaying local verified repository snapshot (GitHub public rate-limit reached or upstream throttled).
            </span>
          </div>
        )}

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#111111] border border-[#222222] hover:border-[#39FF88]/40 rounded-xl p-5 flex flex-col justify-between transition-all hover:-translate-y-0.5 shadow-sm"
            >
              <div className="space-y-2.5">
                {/* Repo Title & Icon */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-[#39FF88] shrink-0" />
                    <h3 className="font-mono text-sm font-bold text-[#F5F5F5] group-hover:text-[#39FF88] transition-colors truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#39FF88] shrink-0" />
                </div>

                {/* Description */}
                <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
                  {repo.description || "Infrastructure repository authored by Atharv Jadhav."}
                </p>
              </div>

              {/* Footer metadata */}
              <div className="pt-4 mt-3 border-t border-[#1c1c1c] flex items-center justify-between text-xs font-mono text-[#71717A]">
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span className="text-[#D4D4D8]">{repo.language}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#71717A]" />
                    <span>{repo.stars}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-[#71717A]" />
                    <span>{repo.forks}</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Verifiable Activity Banner */}
        <div className="mt-8 p-4 rounded-xl bg-[#141414] border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold text-[#F5F5F5] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39FF88] animate-pulse" />
              <span>Verifiable Git Commit Trails</span>
            </div>
            <p className="text-xs text-[#A1A1AA]">
              Every project links to concrete source code with semantic commits and version-controlled infrastructure definitions.
            </p>
          </div>

          <a
            href={socialsData.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono bg-[#1c1c1c] hover:bg-[#252525] text-[#39FF88] border border-[#39FF88]/30 hover:border-[#39FF88] rounded transition-all shrink-0 min-h-[44px]"
          >
            <span>View All Repositories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
