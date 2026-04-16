import React from 'react';
import { ShieldX, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CIDecision({ status, show }) {
  if (!show) return null;

  const config = {
    FAIL: {
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      glow: 'shadow-[0_0_30px_rgba(244,63,94,0.3)]',
      icon: ShieldX,
      text: 'CI PIPELINE: BLOCKED',
      desc: 'Critical vulnerabilities detected. Merge prevented.'
    },
    PASS: {
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
      icon: ShieldCheck,
      text: 'CI PIPELINE: PASSED',
      desc: 'Code is secure and ready for deployment.'
    },
    WARNING: {
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]',
      icon: AlertTriangle,
      text: 'CI PIPELINE: WARNING',
      desc: 'Minor issues found. Proceed with caution.'
    }
  };

  const selected = config[status] || config.FAIL;
  const Icon = selected.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
      className={`mt-6 p-6 rounded-xl border-2 flex items-center gap-6 ${selected.bg} ${selected.border} ${selected.glow}`}
    >
      <div className={`p-4 rounded-full bg-slate-950 ${selected.color}`}>
        <Icon className="w-10 h-10" />
      </div>
      <div>
        <h2 className={`text-2xl font-black tracking-widest ${selected.color}`}>
          {selected.text}
        </h2>
        <p className="text-slate-300 mt-1">{selected.desc}</p>
      </div>
    </motion.div>
  );
}
