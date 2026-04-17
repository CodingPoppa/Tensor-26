import React, { useState, useEffect } from 'react';
import { Terminal, Copy, CheckCircle, ShieldCheck, Zap, Globe } from 'lucide-react';

const OnboardingPortal = () => {
  const [ngrokUrl, setNgrokUrl] = useState('https://YOUR-TUNNEL-HERE.ngrok-free.dev');
  const [copied, setCopied] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('idle'); // idle, testing, success, error

  const yamlCode = `name: AI Security Scanner
permissions:
  contents: read
  pull-requests: write
on:
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Run AI Scan
        run: |
          jq -n --arg d "$(git diff origin/\${{ github.event.pull_request.base.ref }})" '{diff: $d, language: "python"}' > payload.json
          curl -s -X POST ${ngrokUrl}/api/scan \\
          -H "Content-Type: application/json" -d @payload.json > result.json`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(yamlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testConnection = () => {
    setConnectionStatus('testing');
    // Simulate API ping
    setTimeout(() => setConnectionStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-12">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            SEC-AI ONBOARDING
          </h1>
          <p className="text-slate-500 mt-2">Transform your repository into a fortress in 3 steps.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full">
          <div className={`w-2 h-2 rounded-full ${connectionStatus === 'success' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">System Ready</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Instructions */}
        <div className="lg:col-span-1 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">1</span>
              <h3 className="text-xl font-semibold">Tunnel Setup</h3>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Backend Ngrok URL</label>
              <input 
                type="text"
                className="w-full bg-black border border-slate-700 rounded-md p-2 text-blue-400 font-mono text-sm focus:outline-none focus:border-blue-500 transition-all"
                value={ngrokUrl}
                onChange={(e) => setNgrokUrl(e.target.value)}
              />
              <button 
                onClick={testConnection}
                className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {connectionStatus === 'testing' ? 'Pinging...' : 'Test Connection'}
                {connectionStatus === 'success' && <CheckCircle size={16} className="text-emerald-400" />}
              </button>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">2</span>
              <h3 className="text-xl font-semibold">GitHub Config</h3>
            </div>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3">
                <div className="mt-1"><ShieldCheck size={16} className="text-blue-500" /></div>
                <p>Go to <b>Settings &gt; Actions</b> and enable <b>Read and write permissions</b>.</p>
              </li>
              <li className="flex gap-3">
                <div className="mt-1"><Zap size={16} className="text-yellow-500" /></div>
                <p>Create <code>.github/workflows/security.yml</code> in your repo.</p>
              </li>
            </ul>
          </section>
        </div>

        {/* Right Column: Code Generator */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">3</span>
              <h3 className="text-xl font-semibold">Generate & Paste</h3>
            </div>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all"
            >
              {copied ? 'Copied!' : <><Copy size={14}/> Copy Code</>}
            </button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-black rounded-xl border border-slate-800 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/50">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <span className="text-[10px] font-mono ml-2 text-slate-500">security.yml</span>
              </div>
              <pre className="p-6 overflow-x-auto font-mono text-sm leading-relaxed text-blue-100">
                <code>{yamlCode}</code>
              </pre>
            </div>
          </div>

          {/* Quick Stats Mockup for "Wow" Factor */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                <Globe size={14}/> Global Scans
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400">1,284</div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                <Terminal size={14}/> Vulnerabilities Found
              </div>
              <div className="text-2xl font-bold font-mono text-red-400">42</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingPortal;
