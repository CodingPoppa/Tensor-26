import React from 'react';
import { motion } from 'framer-motion';

export default function ArchitectureIntegration() {
  return (
    <section className="py-24 relative z-10 w-full overflow-hidden border-t border-slate-800 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/3">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-white mb-6"
            >
              Native <span className="text-cyan-400">CI/CD</span> Integration Architecture
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 leading-relaxed mb-8"
            >
              Genesis Guard sits between your version control system and your deployment pipelines. It acts as an automated security gatekeeper, intercepting Pull Request webhooks to scan code changes before a human reviewer ever sees them.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {['GitHub Actions & GitLab CI Native', 'Sub-second AST analysis payload', 'Zero footprint on your main deployment runtime'].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  {feature}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="lg:w-2/3 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-8 relative shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-4 font-mono text-xs text-slate-600 select-none">ARCHITECTURE_MAP_V1.0</div>
              
              <div className="grid grid-cols-3 gap-y-12 relative pt-8">
                {/* Horizontal connection lines */}
                <div className="absolute top-16 left-1/6 right-1/6 border-t-2 border-dashed border-slate-700 -z-10"></div>
                <div className="absolute bottom-12 left-1/6 right-1/6 border-t-2 border-dashed border-slate-700 -z-10"></div>
                <div className="absolute top-16 bottom-12 left-1/2 border-l-2 border-dashed border-slate-700 -z-10"></div>

                {/* Nodes */}
                {[
                  { label: "Git Webhook", color: "text-slate-300", bg: "bg-slate-800" },
                  { label: "Diff Parser", color: "text-blue-400", bg: "bg-blue-500/10" },
                  { label: "AST Scanner Engine", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/50" },
                  { label: "LLM Explainer", color: "text-purple-400", bg: "bg-purple-500/10" },
                  { label: "PR Comment API", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { label: "Merge / CI Gate", color: "text-rose-400", bg: "bg-rose-500/10" }
                ].map((node, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center relative">
                    <div className={`w-32 h-16 rounded-xl flex items-center justify-center font-bold text-sm text-center border shadow-lg ${node.bg} ${node.color} ${node.border || 'border-slate-800'} backdrop-blur-sm z-10`}>
                      {node.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
