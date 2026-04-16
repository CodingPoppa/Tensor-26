import React from 'react';
import FindingCard from './FindingCard';
import { mockFindings } from '../../data/mockFindings';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function ScanFindings({ isScanning, scanComplete, language, isSecure }) {
  if (isScanning) {
    return (
      <div className="h-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-2 border-emerald-400 rounded-full animate-[spin_1.5s_reverse_infinite]"></div>
          <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] animate-pulse">
            <span className="text-cyan-400 text-xs font-bold font-mono">AST</span>
          </div>
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Analyzing Data Flow</h3>
        <p className="text-slate-400 text-sm font-mono animate-pulse">Checking against OWASP Top 10...</p>
      </div>
    );
  }

  if (!scanComplete) {
    return (
      <div className="h-full flex flex-col items-center justify-center min-h-[400px] text-slate-500 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50">
        <p className="font-mono text-sm">System Ready. Awaiting Code Input.</p>
      </div>
    );
  }

  const findings = isSecure ? [] : mockFindings[language] || [];

  if (findings.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center min-h-[400px] bg-emerald-500/5 border border-emerald-500/20 rounded-xl"
      >
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <ShieldCheck className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">0 Vulnerabilities Found</h3>
        <p className="text-slate-400 text-center max-w-sm">This code passes all security checks and contains zero known threat signatures.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2 pb-4 border-b border-slate-800">
        <h3 className="text-xl font-semibold text-white">Threat Analysis</h3>
        <div className="bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full text-sm font-bold border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
          {findings.length} Critical Issues
        </div>
      </div>
      
      <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {findings.map((finding, idx) => (
          <FindingCard key={finding.id} finding={finding} index={idx} />
        ))}
      </div>
    </div>
  );
}
