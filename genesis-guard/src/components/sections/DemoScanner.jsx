import React, { useState, useEffect } from 'react';
import { Play, Code2, ShieldAlert, ShieldCheck, ChevronDown, CheckCircle } from 'lucide-react';
import ScanFindings from '../demo/ScanFindings';
import PRCommentSim from '../demo/PRCommentSim';
import CIDecision from '../demo/CIDecision';
import { sampleCode } from '../../data/sampleCode';

export default function DemoScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  
  // State for dynamic scanner
  const [language, setLanguage] = useState('javascript');
  const [sampleType, setSampleType] = useState('insecure');
  const [codeEditor, setCodeEditor] = useState(sampleCode.javascript.insecure);
  
  // Reset scan state on change
  useEffect(() => {
    setScanComplete(false);
  }, [language, sampleType, codeEditor]);

  const loadSample = (type) => {
    setSampleType(type);
    setCodeEditor(sampleCode[language][type]);
  };

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCodeEditor(sampleCode[newLang][sampleType]);
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    
    // Simulate real scan time
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2800);
  };

  // Determine pass/fail state for the output component directly from selected sample
  const decisionStatus = sampleType === 'insecure' ? 'FAIL' : 'PASS';

  return (
    <section id="demo" className="py-12 relative z-10 w-full">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Live Analysis Engine</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience Genesis Guard. Paste your own code or load a sample diff below to see real-time AST parsing and vulnerability resolution in action.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 xl:gap-10 items-start">
          
          {/* Left Column - Input Panel */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col shadow-xl sticky top-24">
            
            {/* Header controls */}
            <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <div className="relative">
                  <select 
                    value={language}
                    onChange={handleLangChange}
                    className="appearance-none bg-slate-900 border border-slate-700 text-white text-sm font-medium py-1.5 pl-3 pr-8 rounded-md focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button 
                  onClick={() => loadSample('insecure')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${sampleType === 'insecure' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-slate-400 hover:text-white'}`}
                >
                  <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Vulnerable</span>
                </button>
                <button 
                  onClick={() => loadSample('secure')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${sampleType === 'secure' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
                >
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Secured</span>
                </button>
              </div>
            </div>
            
            {/* Text Area */}
            <div className="p-0 flex-grow relative group h-[450px]">
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-950/50 border-r border-slate-800 flex flex-col items-center py-4 text-xs font-mono text-slate-600 select-none">
                {[...Array(20)].map((_, i) => <div key={i} className="mb-[6px]">{i+1}</div>)}
              </div>
              <textarea 
                value={codeEditor}
                onChange={(e) => setCodeEditor(e.target.value)}
                spellCheck="false"
                className="w-full h-full pl-16 pr-4 py-4 bg-transparent text-slate-300 font-mono text-[13px] sm:text-sm resize-none outline-none custom-scrollbar leading-relaxed"
              />
              <div className="absolute inset-0 pointer-events-none group-focus-within:ring-1 ring-inset ring-cyan-500/50 transition-all"></div>
            </div>

            {/* Scan Action */}
            <div className="p-5 bg-slate-950 border-t border-slate-800">
              <button 
                onClick={handleScan}
                disabled={isScanning}
                className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
                  isScanning 
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]'
                }`}
              >
                {isScanning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-cyan-400 rounded-full animate-spin"></div>
                    Executing AST Analysis...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" fill="currentColor" /> Run Vulnerability Scan
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Results Console */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col min-h-[500px]">
              
              {/* Scan Metrics Top Bar */}
              {scanComplete && (
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-800">
                   <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 flex flex-col items-center justify-center">
                     <span className="text-slate-400 text-xs uppercase font-bold mb-1">Time</span>
                     <span className="text-cyan-400 font-mono font-bold text-lg">0.82s</span>
                   </div>
                   <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 flex flex-col items-center justify-center">
                     <span className="text-slate-400 text-xs uppercase font-bold mb-1">Files</span>
                     <span className="text-white font-mono font-bold text-lg">1</span>
                   </div>
                   <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 flex flex-col items-center justify-center">
                     <span className="text-slate-400 text-xs uppercase font-bold mb-1">Verdict</span>
                     {decisionStatus === 'FAIL' 
                       ? <span className="text-rose-500 font-mono font-bold text-lg">REJECT</span>
                       : <span className="text-emerald-500 font-mono font-bold text-lg">PASS</span>
                     }
                   </div>
                </div>
              )}

              <ScanFindings 
                isScanning={isScanning} 
                scanComplete={scanComplete} 
                language={language}
                isSecure={sampleType === 'secure'} 
              />
            </div>
            
            <PRCommentSim show={scanComplete && decisionStatus === 'FAIL'} language={language} />
            <CIDecision status={decisionStatus} show={scanComplete} />
          </div>
          
        </div>
      </div>
    </section>
  );
}
