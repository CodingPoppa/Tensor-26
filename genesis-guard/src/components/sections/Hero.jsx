import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-1/4 right-[20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] opacity-70 animate-pulse-slow"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Text Sequence */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sm text-cyan-400 mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Real-time PR Protection Active
          </div>
          
          <h1 className="text-5xl lg:text-[4rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 tracking-tight leading-[1.1] mb-6">
            Secure Your Codebase <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">At The Speed Of Thought</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed font-medium">
            Genesis Guard is a premium AI-powered DevSecOps pipeline. It intercepts commits, parses AST structures dynamically, and blocks vulnerabilities before they ever merge.
          </p>
          
          <div className="flex items-center gap-4">
            <Link to="/scan" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]">
              <span className="relative flex items-center gap-2">
                Run Scanner Demo <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/features" className="px-8 py-4 font-bold text-white border border-slate-700 bg-slate-900/50 rounded-lg hover:bg-slate-800 hover:border-slate-600 transition-colors">
              Explore Findings
            </Link>
          </div>
        </motion.div>

        {/* Right Console Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[500px] w-full mt-10 lg:mt-0 flex items-center justify-end"
        >
          {/* Main fake console frame */}
          <div className="w-full max-w-[500px] bg-[#0d1117] border border-slate-700/50 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Header */}
            <div className="bg-[#161b22] px-4 py-2 border-b border-slate-700/50 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="mx-auto flex items-center gap-2 opacity-50 text-xs font-mono text-slate-300">
                <Terminal className="w-3 h-3" /> genesis.scanner.exe
              </div>
            </div>
            
            {/* Console body */}
            <div className="p-5 font-mono text-xs leading-relaxed h-[300px] lg:h-[400px] overflow-hidden flex flex-col justify-end relative">
               {/* Scan beam */}
               <motion.div 
                 animate={{ y: [0, 400, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 right-0 h-1 bg-cyan-400/50 top-0 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-20"
               ></motion.div>

               {/* Simulated code output */}
               <div className="opacity-70 text-[#9cdcfe]">
                 <div>&gt; Initiating genesis-guard hook...</div>
                 <div>&gt; Extracting git diff [master...feature/auth] OK</div>
               </div>
               
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1, duration: 0.5 }}
                 className="text-[#ce9178] mt-2"
               >
                 <div>[AST_PARSE] Analyzing 42 nodes in src/api/auth.js</div>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 2, duration: 0.2 }}
                 className="mt-4 border-l-2 border-[#f14c4c] pl-3"
               >
                 <div className="text-[#f14c4c] font-bold">VULNERABILITY DETECTED</div>
                 <div className="text-[#cccccc]">Type: CWE-89 (SQL Injection)</div>
                 <div className="text-[#cccccc]">Confidence: 99.2%</div>
                 <div className="text-[#cccccc] opacity-50 mt-1">req.body.email mapped directly to query string</div>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 3, duration: 0.5 }}
                 className="mt-4 flex items-center gap-2 text-[#4ec9b0]"
               >
                 <Shield className="w-4 h-4" /> Generating safe patch...
               </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
