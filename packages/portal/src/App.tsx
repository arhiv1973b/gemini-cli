/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';

export const App: React.FC = () => (
    <div className="min-h-screen w-full bg-legal-dark text-slate-200 font-mono p-4 md:p-8">
      {/* Header / Hero */}
      <header className="max-w-6xl mx-auto border-b border-slate-700 pb-8 mb-12">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold text-legal-gold">
            ⚖️ CASE-MACHERET-1997-2026
          </h1>
          <span className="bg-legal-green text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
            A©t0r CORE v13
          </span>
        </div>
        <p className="text-xl text-slate-400 max-w-2xl">
          Transcendent Integrity – Universal Legal Architecture (TI-ULA).
          Evidence Portal for Jus Cogens & Erga Omnes Protection.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Evidence Section */}
        <section className="lg:col-span-2 space-y-8">
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-legal-green underline">
              Legal Evidence & Proof
            </h2>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="text-sm text-slate-500">Mirror URL:</span>
                <a
                  href="https://arhiv1973b.github.io/apostille-mirror/jus-cogens-proof-macheret.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  jus-cogens-proof-macheret.html
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-slate-500">
                  Cryptographic Seal:
                </span>
                <code className="text-xs break-all bg-slate-900 p-2 mt-1 rounded">
                  eployed_57BF917347C0B4DC6D4ABD3F6B16405A3D97971ADF7E52FA55CFEA244C289BEA
                </code>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-slate-500">Secret Word:</span>
                <span className="text-slate-300 italic">
                  &quot;База Данных&quot;
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-legal-gold">
              Project Status
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded border border-slate-700">
                <div className="text-sm text-slate-500">Repository Hash</div>
                <div className="text-xs truncate">cfcecebe8...</div>
              </div>
              <div className="p-4 bg-slate-900 rounded border border-slate-700">
                <div className="text-sm text-slate-500">Build Version</div>
                <div className="text-xs">0.45.0-nightly</div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <aside className="space-y-8">
          <div className="bg-legal-gold/10 p-6 rounded-lg border border-legal-gold/30">
            <h2 className="text-2xl font-semibold mb-4 text-legal-gold">
              🏦 Support Project
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                  MDL (ЛЕИ)
                </h3>
                <p className="text-sm">
                  IBAN:{' '}
                  <code className="bg-slate-900 p-1">
                    MD55FT225920600348117498
                  </code>
                </p>
                <p className="text-sm mt-1">
                  IDNP: <code>2000001159655</code>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                  USD (ДОЛЛАРЫ)
                </h3>
                <p className="text-sm">FinComBank S.A., Chisinau</p>
                <p className="text-sm mt-1">
                  SWIFT: <code>FTMDMD2X</code>
                </p>
              </div>
              <p className="text-xs text-slate-500 italic mt-4">
                Recipient: Maceret Alexei. All contributions support Case
                Maceret 1997-2026.
              </p>
            </div>
          </div>

          <div className="p-6 border border-slate-700 rounded-lg opacity-50 text-xs">
            <p className="mb-2">
              A©TOR_KEY=&quot;# [⚖ A©tor Declaration]&quot;
            </p>
            <p>
              Verification Hash:
              d4ba478e946b8843c4078b632a6fd8454ae299fcb9ce5c34f99f7ededf57e433
            </p>
          </div>
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
        <p>
          © 2026 Case Maceret 1997-2026. Transcendent Integrity Architecture.
        </p>
      </footer>
    </div>
  );
