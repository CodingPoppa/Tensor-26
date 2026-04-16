import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Activity, ShieldCheck, MessageSquare, ShieldX, ArrowRight, Zap } from 'lucide-react';

export default function ProductOverview() {
  const steps = [
    { icon: <GitCommit />, title: "Receive Commit Diff", desc: "Hooks directly into the GitHub/GitLab PR event stream, extracting only changed lines." },
    { icon: <Activity />, title: "Analyze Changes", desc: "Constructs semantic ASTs in milliseconds to detect data-flow and logic vulnerabilities." },
    { icon: <ShieldX />, title: "Map to OWASP", desc: "Correlates findings with known CVE libraries and the OWASP Top 10 framework." },
    { icon: <Zap />, title: "Suggest Remediation", desc: "Generates explicit, copy-paste ready code fixes for the specific language framework." },
    { icon: <MessageSquare />, title: "Generate PR Comment", desc: "Bot posts contextual warnings and inline code reviews directly in the pull request." },
    { icon: <ShieldCheck />, title: "Decide CI Status", desc: "Blocks the merge if critical issues are found, ensuring the master branch remains pristine." }
  ];

  return (
    <section className="py-24 relative z-10 w-full overflow-hidden bg-slate-950/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6"
          >
            How Genesis Guard <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Protects Your Code</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            A seamless, automated workflow designed to operate entirely in the background. It intercepts bad code the moment a developer types `git push`.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[50px] left-[5%] right-[5%] h-0.5 bg-slate-800">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-400 relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)]"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15, duration: 0.4 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300">
                  {step.icon}
                </div>
                {/* Mobile connector Arrow */}
                <div className="lg:hidden mb-6 text-slate-700">
                  {idx !== steps.length - 1 && <ArrowRight className="rotate-90 w-5 h-5 mx-auto" />}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
