import React from 'react';
import { ShieldAlert, GitPullRequest, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockFindings } from '../../data/mockFindings';

export default function PRCommentSim({ show, language }) {
  if (!show) return null;

  const findings = mockFindings[language] || [];
  if (findings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden text-[#e6edf3] font-sans shadow-xl"
    >
      <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-5 h-5 invert opacity-70" />
          <span className="font-semibold text-sm text-[#e6edf3]">genesis-guard-bot</span>
          <span className="text-sm text-[#7d8590] hidden sm:inline">commented just now</span>
        </div>
        <span className="bg-[#238636] text-white text-xs px-2 py-0.5 rounded-full font-medium">Bot</span>
      </div>
      
      <div className="p-4 sm:p-5 text-sm">
        <div className="flex items-start gap-3 mb-4">
          <ShieldAlert className="w-6 h-6 text-[#f85149] mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-[#f85149] mb-1">Security Scan Failed: High Vulnerabilities Detected</h3>
            <p className="text-[#8b949e]">Genesis Guard intercepted this Pull Request. The following critical issues must be resolved before merging.</p>
          </div>
        </div>

        {findings.map(finding => (
          <div key={finding.id} className="border border-[#30363d] rounded-md mb-4 bg-[#161b22] overflow-hidden">
            <div className="p-3 border-b border-[#30363d] flex items-center gap-2 font-mono text-xs">
              <span className="text-[#8b949e]">{finding.file}</span>
              <span className="text-[#f85149] border border-[#f85149]/30 bg-[#f85149]/10 px-1.5 rounded pr-2 flex items-center"><ShieldAlert className="w-3 h-3 inline mr-1" /> Line {finding.line}</span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <p className="font-semibold text-[#e6edf3]">{finding.title}</p>
              <p className="text-[#8b949e] leading-relaxed">{finding.description}</p>
              <div className="bg-[#0d1117] border border-[#30363d] p-3 rounded font-mono text-xs text-[#f85149] overflow-x-auto">
                <span className="opacity-50 select-none mr-2">-</span>{finding.snippet}
              </div>
              <p className="text-[#8957e5] mt-2 font-medium">Suggested Resolution:</p>
              <div className="bg-[#0d1117] border border-[#30363d] p-3 rounded font-mono text-xs text-[#3fb950] overflow-x-auto">
                <span className="opacity-50 select-none mr-2">+</span>{finding.fixedSnippet}
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-[#30363d] pt-4 mt-4">
          <div className="flex items-center gap-2 text-[#8b949e]">
            <GitPullRequest className="w-4 h-4 text-[#8957e5]" />
            <span className="font-mono text-xs">Commit: 8f3a2b1</span>
          </div>
          <span className="text-[#f85149] font-bold text-xs">Merge Blocked</span>
        </div>
      </div>
    </motion.div>
  );
}
