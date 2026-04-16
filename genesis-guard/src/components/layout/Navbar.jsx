import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors">
            Genesis<span className="text-cyan-400">Guard</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link to="/features" className="hover:text-cyan-400 transition-colors">Features</Link>
          <Link to="/scan" className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 px-5 py-2 rounded-full hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
            Launch Scanner
          </Link>
        </div>
      </div>
    </nav>
  );
}
