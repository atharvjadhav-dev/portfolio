"use client";

import React, { useState, useRef, useEffect } from "react";
import { profileData } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { socialsData } from "@/data/socials";
import { Terminal as TerminalIcon, Copy, Check, RotateCcw, CornerDownLeft } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: React.ReactNode;
}

export function Terminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);
  const terminalScreenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  const initialLines: TerminalLine[] = [
    {
      id: "line-welcome-1",
      type: "system",
      content: (
        <span className="text-[#A1A1AA]">
          Last login: Sun Oct 25 20:30:15 on ttys001 from cloud-node.internal
        </span>
      ),
    },
    {
      id: "line-welcome-2",
      type: "system",
      content: (
        <div className="text-xs text-[#71717A] mt-0.5">
          Type <span className="text-[#39FF88] font-semibold">help</span> or tap a suggested command below.
        </div>
      ),
    },
  ];

  const [lines, setLines] = useState<TerminalLine[]>(initialLines);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (terminalScreenRef.current) {
      terminalScreenRef.current.scrollTop = terminalScreenRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    // Add to command history
    setHistory((prev) => [...prev, rawCommand]);
    setHistoryIndex(-1);

    // Append input line
    const inputLineId = `line-in-${Date.now()}`;
    const outputLineId = `line-out-${Date.now()}`;

    const newLines: TerminalLine[] = [
      ...lines,
      {
        id: inputLineId,
        type: "input",
        content: (
          <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
            <span className="text-[#39FF88]">atharv@cloud-lab</span>
            <span className="text-[#71717A]">:</span>
            <span className="text-[#60a5fa]">~</span>
            <span className="text-[#F5F5F5]">$</span>
            <span className="text-[#F5F5F5] font-semibold ml-1">{rawCommand}</span>
          </div>
        ),
      },
    ];

    let outputContent: React.ReactNode = null;

    switch (cmd) {
      case "help":
        outputContent = (
          <div className="space-y-1 text-xs sm:text-sm font-mono text-[#D4D4D8]">
            <p className="text-[#A1A1AA] mb-1.5">Available commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div>
                <span className="text-[#39FF88] font-bold">whoami</span>
                <span className="text-[#71717A]"> - Background & focus</span>
              </div>
              <div>
                <span className="text-[#39FF88] font-bold">skills</span>
                <span className="text-[#71717A]"> - Categorized tech stack</span>
              </div>
              <div>
                <span className="text-[#39FF88] font-bold">projects</span>
                <span className="text-[#71717A]"> - Featured deployments</span>
              </div>
              <div>
                <span className="text-[#39FF88] font-bold">github</span>
                <span className="text-[#71717A]"> - Public repositories</span>
              </div>
              <div>
                <span className="text-[#39FF88] font-bold">contact</span>
                <span className="text-[#71717A]"> - Email & social channels</span>
              </div>
              <div>
                <span className="text-[#39FF88] font-bold">status</span>
                <span className="text-[#71717A]"> - System health check</span>
              </div>
              <div>
                <span className="text-[#39FF88] font-bold">clear</span>
                <span className="text-[#71717A]"> - Clear terminal screen</span>
              </div>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputContent = (
          <div className="space-y-1.5 text-xs sm:text-sm font-mono">
            <p className="text-[#F5F5F5] font-semibold">{profileData.name} — {profileData.role}</p>
            <p className="text-[#A1A1AA]">{profileData.bio}</p>
            <div className="pt-1 flex items-center gap-2 text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-[#39FF88] animate-pulse" />
              <span className="text-[#39FF88]">{profileData.availability.label}</span>
            </div>
          </div>
        );
        break;

      case "skills":
        outputContent = (
          <div className="space-y-2 text-xs sm:text-sm font-mono">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                <span className="text-[#39FF88] font-semibold">{cat.title}:</span>{" "}
                <span className="text-[#D4D4D8]">
                  {cat.skills.map((s) => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        outputContent = (
          <div className="space-y-2 text-xs sm:text-sm font-mono">
            <p className="text-[#A1A1AA]">Deployed projects & infrastructure repositories:</p>
            {projectsData.map((p, idx) => (
              <div key={p.id} className="border-l-2 border-[#39FF88]/40 pl-2">
                <div className="text-[#F5F5F5] font-semibold">
                  0{idx + 1}. {p.title}
                </div>
                <div className="text-xs text-[#71717A]">{p.category} | {p.technologies.slice(0, 3).join(", ")}</div>
                <a
                  href={`#projects`}
                  className="text-xs text-[#39FF88] hover:underline inline-block mt-0.5"
                >
                  View project card & architecture →
                </a>
              </div>
            ))}
          </div>
        );
        break;

      case "github":
        outputContent = (
          <div className="space-y-1.5 text-xs sm:text-sm font-mono">
            <p className="text-[#F5F5F5]">GitHub Profile: <a href={socialsData.github.url} target="_blank" rel="noopener noreferrer" className="text-[#39FF88] underline">{socialsData.github.url}</a></p>
            <p className="text-xs text-[#A1A1AA]">7 public repositories featuring Terraform modules, S3/CloudFront setups, and containerized architectures.</p>
            <a href="#github" className="text-xs text-[#39FF88] hover:underline inline-block">Jump to GitHub section in page →</a>
          </div>
        );
        break;

      case "contact":
        outputContent = (
          <div className="space-y-1 text-xs sm:text-sm font-mono">
            <p className="text-[#F5F5F5] font-semibold">Get in touch with Atharv:</p>
            <p className="text-[#D4D4D8]">Email: <a href={socialsData.email.url} className="text-[#39FF88] underline">{socialsData.email.label}</a></p>
            <p className="text-[#D4D4D8]">GitHub: <a href={socialsData.github.url} target="_blank" rel="noopener noreferrer" className="text-[#39FF88] underline">{socialsData.github.label}</a></p>
            <p className="text-[#D4D4D8]">LinkedIn: <a href={socialsData.linkedin.url} target="_blank" rel="noopener noreferrer" className="text-[#39FF88] underline">{socialsData.linkedin.label}</a></p>
            <a href="#contact" className="text-xs text-[#39FF88] hover:underline inline-block pt-1">Open Contact form →</a>
          </div>
        );
        break;

      case "status":
        outputContent = (
          <div className="space-y-1 text-xs sm:text-sm font-mono text-[#D4D4D8]">
            <p className="text-[#39FF88]">● System Status: All services operational</p>
            <p className="text-xs text-[#71717A]">Node runtime: Next.js App Router (Turbopack) | Edge DNS: Active</p>
          </div>
        );
        break;

      case "clear":
        setLines([]);
        setInputVal("");
        return;

      default:
        outputContent = (
          <div className="text-xs sm:text-sm font-mono text-[#f87171]">
            zsh: command not found: {rawCommand}. Type <button type="button" onClick={() => executeCommand("help")} className="text-[#39FF88] underline font-bold">help</button> for available commands.
          </div>
        );
    }

    newLines.push({
      id: outputLineId,
      type: "output",
      content: outputContent,
    });

    setLines(newLines);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  const handleReset = () => {
    setLines(initialLines);
    setInputVal("");
  };

  const handleCopy = () => {
    const textToCopy = lines
      .map((l) => (typeof l.content === "string" ? l.content : ""))
      .filter(Boolean)
      .join("\n");
    navigator.clipboard.writeText(textToCopy || "Atharv Jadhav - Cloud & DevOps Portfolio Terminal");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const suggestions = ["whoami", "skills", "projects", "status", "contact", "clear"];

  return (
    <div className="w-full rounded-xl border border-[#262626] bg-[#111111] shadow-2xl overflow-hidden font-mono flex flex-col focus-within:border-[#39FF88]/40 transition-colors">
      {/* Window Title Bar */}
      <div className="bg-[#161616] px-3 sm:px-4 py-2.5 border-b border-[#262626] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          {/* Mac / Terminal 3 dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block opacity-85 hover:opacity-100 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block opacity-85 hover:opacity-100 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block opacity-85 hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex items-center gap-1.5 ml-2 text-xs text-[#A1A1AA]">
            <TerminalIcon className="w-3.5 h-3.5 text-[#39FF88]" />
            <span className="text-xs font-semibold text-[#F5F5F5]">{profileData.terminalUser}@{profileData.terminalHost}:~</span>
          </div>
        </div>

        {/* Window action buttons */}
        <div className="flex items-center gap-1 text-[#71717A]">
          <button
            type="button"
            onClick={handleCopy}
            title="Copy terminal session"
            className="p-1.5 hover:text-[#F5F5F5] hover:bg-[#222222] rounded transition-colors"
            aria-label="Copy terminal text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#39FF88]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleReset}
            title="Reset terminal"
            className="p-1.5 hover:text-[#F5F5F5] hover:bg-[#222222] rounded transition-colors"
            aria-label="Reset terminal output"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Screen Output */}
      <div
        ref={terminalScreenRef}
        className="p-3 sm:p-4 min-h-[220px] max-h-[340px] overflow-y-auto space-y-2.5 text-xs sm:text-sm bg-[#0E0E0E]"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div key={line.id} className="leading-relaxed">
            {line.content}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-[#39FF88] text-xs sm:text-sm">atharv@cloud-lab</span>
          <span className="text-[#71717A]">:</span>
          <span className="text-[#60a5fa] text-xs sm:text-sm">~</span>
          <span className="text-[#F5F5F5] text-xs sm:text-sm">$</span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="none"
              className="w-full bg-transparent text-[#F5F5F5] focus:outline-none text-xs sm:text-sm font-mono caret-[#39FF88]"
              aria-label="Terminal command prompt"
              placeholder="type help or select below..."
            />
          </div>
        </div>
      </div>

      {/* Suggestion Chips for touch screens and quick execution */}
      <div className="bg-[#141414] px-3 py-2 border-t border-[#222222] flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 text-[11px] text-[#71717A] shrink-0">
          <span className="hidden sm:inline">Commands:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {suggestions.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 text-xs font-mono bg-[#1c1c1c] text-[#A1A1AA] hover:text-[#39FF88] hover:bg-[#252525] border border-[#2c2c2c] hover:border-[#39FF88]/40 rounded transition-all shrink-0 active:scale-95"
            >
              ${cmd}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => executeCommand(inputVal)}
          disabled={!inputVal.trim()}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-[#1c1c1c] text-[#39FF88] disabled:opacity-30 disabled:text-[#71717A] border border-[#2c2c2c] rounded transition-all shrink-0"
          aria-label="Execute command"
        >
          <span>Run</span>
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
