import React, { useState } from 'react';
import { AlertCircle, FileCode2, Terminal, ChevronDown, Activity, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FindingCard({ finding, index }) {
  const [expanded, setExpanded] = useState(false);

  const getSeverityStyles = (severity) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.2)]';
      case 'HIGH':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getConfidenceColor = (conf) => {
    if (conf > 90) return 'bg-emerald-500';
    if (conf > 70) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden mb-4 hover:border-slate-700 transition-colors"
    >
      {/* Header - Always visible */}
      <div 
        onClick={() => setExpanded(!expanded)}
        className="p-5 cursor-pointer flex items-start justify-between bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
      >
        <div className="flex-1 pr-4">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getSeverityStyles(finding.severity)}`}>
              {finding.severity}
            </span>
            <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
              {finding.category}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-white">{finding.title}</h4>
        </div>
        
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-slate-400 text-sm font-mono bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800">
            <FileCode2 className="w-4 h-4 text-cyan-400" />
            <span>{finding.file}:{finding.line}</span>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} className="mr-2 mt-1 text-slate-500">
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
      
      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-800"
          >
            <div className="p-5 space-y-6">
              
              {/* Context Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                  <h5 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Signal Strength
                  </h5>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${getConfidenceColor(finding.confidence)}`} style={{ width: finding.confidence + '%' }}></div>
                    </div>
                    <span className="text-sm font-mono text-slate-300">{finding.confidence}%</span>
                  </div>
                </div>
                
                <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                  <h5 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    Exploit Potential
                  </h5>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {finding.exploitPotential || "Unknown vector"}
                  </p>
                </div>
              </div>

              {/* Description & Fix Setup */}
              <div>
                <h5 className="text-white font-medium mb-1.5">Root Cause Analysis</h5>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {finding.description}
                </p>
                
                <h5 className="text-emerald-400 font-medium mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Remediation Strategy
                </h5>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {finding.fix}
                </p>
              </div>

              {/* Diffs Before/After */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                {/* Vulnerable */}
                <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-rose-500/20">
                  <div className="bg-rose-500/10 px-3 py-1.5 border-b border-rose-500/20 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-xs font-mono text-rose-400">Vulnerable Before</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto">
                    <code>{finding.snippet}</code>
                  </pre>
                </div>

                {/* Secure */}
                <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-emerald-500/20">
                  <div className="bg-emerald-500/10 px-3 py-1.5 border-b border-emerald-500/20 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-mono text-emerald-400">Secured After</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto">
                    <code>{finding.fixedSnippet}</code>
                  </pre>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
