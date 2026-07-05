"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [htmlContent, setHtmlContent] = useState<string>(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    p {
      color: #666;
    }
    button {
      margin-top: 1.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      background: #4a90e2;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover {
      background: #357abd;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello, Stitch AI!</h1>
    <p>This is a live preview of your HTML and CSS.</p>
    <button>Get Started</button>
  </div>
</body>
</html>`
  );
  const [debouncedContent, setDebouncedContent] = useState(htmlContent);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Debounce the input for smooth typing experience
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedContent(htmlContent);
    }, 500);
    return () => clearTimeout(handler);
  }, [htmlContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
  };

  const handleClear = () => {
    setHtmlContent("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-[#c9d1d9] font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#161b22] border-b border-[#30363d] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Stitch UI Previewer</h1>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#21262d] border border-[#30363d] text-[#8b949e]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live Render
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Editor Panel */}
        <section className="flex-1 flex flex-col border-r border-[#30363d] bg-[#0d1117] min-w-[300px]">
          <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
            <h2 className="text-sm font-semibold text-[#8b949e] flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              HTML / CSS Editor
            </h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopy}
                className="p-1.5 rounded hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-colors"
                title="Copy Code"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
              <button 
                onClick={handleClear}
                className="p-1.5 rounded hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-colors"
                title="Clear Code"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 relative group">
            <textarea
              className="w-full h-full bg-transparent text-[#e6edf3] font-mono text-sm leading-relaxed outline-none resize-none hide-scrollbar placeholder-[#484f58]"
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="<!-- Paste your HTML / CSS here -->"
              spellCheck="false"
            />
          </div>
        </section>

        {/* Preview Panel */}
        <section className={`flex-1 flex flex-col bg-[#ffffff] min-w-[300px] transition-all duration-200 ${isFullscreen ? 'fixed inset-0 z-50' : 'relative'}`}>
          <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d] text-[#8b949e]">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Preview
            </h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop')}
                className={`p-1.5 rounded hover:bg-[#30363d] transition-colors ${viewMode === 'mobile' ? 'text-white bg-[#30363d]' : 'text-[#8b949e] hover:text-white'}`}
                title={viewMode === 'desktop' ? "Mobile View" : "Desktop View"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </button>
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-colors"
                title={isFullscreen ? "Exit Full Screen" : "Full Screen"}
              >
                {isFullscreen ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex-1 w-full h-full relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNlN2U3ZTciLz48L3N2Zz4=')] flex items-center justify-center">
            <div className={`transition-all duration-300 ${viewMode === 'mobile' ? 'w-[375px] h-full max-h-[812px] border-8 border-gray-800 rounded-3xl shadow-2xl overflow-hidden my-4' : 'w-full h-full'}`}>
              <iframe
                ref={iframeRef}
                title="Preview"
                srcDoc={debouncedContent}
                className={`w-full h-full border-none shadow-inner ${viewMode === 'mobile' ? 'bg-white' : ''}`}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #30363d;
          border-radius: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #484f58;
        }
      `}} />
    </div>
  );
}
