import { useState } from "react";

function ScannerPage() {
  const [diff, setDiff] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    if (!diff) {
      alert("Please enter some code!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          diff: diff,
          language: "python",
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Backend not responding!");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 text-white min-h-screen bg-slate-900">
      <h1 className="text-3xl font-bold mb-4">
        🔍 AI Vulnerability Scanner
      </h1>

      <p className="text-slate-400 mb-4">
        AI analyzing vulnerabilities using OWASP Top 10...
      </p>

      {/* TEXT AREA */}
      <textarea
        className="w-full p-3 border border-slate-700 rounded bg-slate-800"
        rows="10"
        placeholder="Paste your code diff here..."
        value={diff}
        onChange={(e) => setDiff(e.target.value)}
      />

      {/* BUTTONS */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleScan}
          className="px-6 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400"
        >
          {loading ? "Scanning..." : "Scan"}
        </button>

        <button
          onClick={() => setDiff("password = '123456'")}
          className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
        >
          Load Sample
        </button>
      </div>

      {/* RESULTS */}
      {result && (
        <div className="mt-6">
          <h2 className="text-xl mb-4">Results:</h2>

          {/* DECISION */}
          <div className="mb-4">
            <span className="font-bold">Decision: </span>
            <span
              className={
                result.decision === "FAIL"
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {result.decision}
            </span>
          </div>

          {/* FINDINGS */}
          {result.findings.map((f, index) => (
            <div
              key={index}
              className="border border-slate-700 p-4 mb-4 rounded bg-slate-800"
            >
              <p><strong>📁 File:</strong> {f.file}</p>
              <p><strong>📍 Line:</strong> {f.line}</p>
              <p><strong>🛡️ OWASP:</strong> {f.owasp_category}</p>

              <p>
                <strong>⚠️ Severity:</strong>{" "}
                <span
                  className={
                    f.severity === "HIGH"
                      ? "text-red-500"
                      : f.severity === "MEDIUM"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                >
                  {f.severity}
                </span>
              </p>

              <p className="mt-2">
                <strong>🧠 Explanation:</strong> {f.explanation}
              </p>

              {/* BEFORE / AFTER */}
              <div className="mt-3">
                <p className="text-red-400">❌ Before:</p>
                <pre className="bg-black p-2 rounded text-sm">
                  {f.fix_before}
                </pre>

                <p className="text-green-400 mt-2">✅ After:</p>
                <pre className="bg-black p-2 rounded text-sm">
                  {f.fix_after}
                </pre>
              </div>
            </div>
          ))}

          {/* SCAN TIME */}
          <p className="text-sm text-slate-400">
            ⏱ Scan Time: {result.scan_time_ms} ms
          </p>

          {/* PR SIMULATION (🔥 WIN FEATURE) */}
          <div className="mt-6 p-4 bg-slate-800 rounded border border-slate-700">
            <h3 className="font-bold mb-2">💬 PR Comment Simulation</h3>
            <pre className="text-sm text-slate-300">
{`⚠️ Vulnerability detected (${result.decision})
Fix recommended based on OWASP guidelines.
Please review suggested changes above.`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScannerPage;