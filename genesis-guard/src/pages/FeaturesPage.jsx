import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, GitPullRequest, Code2, Lock, Activity } from 'lucide-react';
import CustomCursor from '../components/ui/CustomCursor';

export default function FeaturesPage() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Real-Time AST Scanning",
      description: "Genesis Guard reads the Abstract Syntax Tree dynamically, caching vulnerabilities instantly without relying on regex overhead."
    },
    {
      icon: <GitPullRequest className="w-6 h-6 text-purple-400" />,
      title: "Native CI/CD Hooks",
      description: "Intercepts merges directly through semantic GitHub/GitLab bots natively injected into your DevOps pipelines."
    },
    {
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      title: "Zero-Day Threat Defense",
      description: "AI-driven heuristics track anomalous code structures typical of zero-day injection attacks, not just known CVE signatures."
    },
    {
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
      title: "In-IDE Feedback",
      description: "Bring the guard rails directly into VSCode or IntelliJ. Developers receive contextual fixes before pushing commits."
    },
    {
      icon: <Lock className="w-6 h-6 text-rose-400" />,
      title: "Secrets Detection",
      description: "High-entropy string scanning ensuring AWS keys, database passwords, and internal tokens never leave the local machine."
    },
    {
      icon: <Activity className="w-6 h-6 text-blue-400" />,
      title: "Compliance Dashboards",
      description: "Generates fully audited reports compliant with SOC2, GDPR, and HIPAA data standards directly from scans."
    }
  ];

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Security Features</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Built for speed, accuracy, and developer experience. Explore the tools keeping the highest performing codebases secure.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:bg-slate-900 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                  {feature.icon}
                </div>
                <div className="bg-slate-950/80 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-slate-800 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
