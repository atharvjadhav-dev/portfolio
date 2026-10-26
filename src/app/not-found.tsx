import React from "react";
import Link from "next/link";
import { Terminal, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-lg rounded-xl border border-[#262626] bg-[#111111] shadow-2xl overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="bg-[#161616] px-4 py-2.5 border-b border-[#262626] flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs text-[#A1A1AA] font-semibold ml-2">404: route_not_found</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[#39FF88]">
            <Terminal className="w-4 h-4" />
            <span>atharv@cloud-lab:~$</span>
            <span className="text-[#F5F5F5]">curl -I https://atharvjadhav.xyz/requested-path</span>
          </div>

          <div className="p-3 rounded bg-[#181818] border border-[#222222] text-[#f87171] space-y-1">
            <p className="font-bold">HTTP/2 404 Not Found</p>
            <p className="text-xs text-[#A1A1AA]">error: The requested route does not exist in this deployment.</p>
          </div>

          <div className="text-[#A1A1AA] pt-2">
            Suggested action: navigate back to root directory.
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#39FF88] text-[#0A0A0A] font-bold text-xs hover:bg-[#2fe075] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>cd /home/atharv (Return Home)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
