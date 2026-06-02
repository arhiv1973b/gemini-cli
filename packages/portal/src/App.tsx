/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import { useState } from 'react';
import archiveData from './archive_manifest.json';

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArchive = archiveData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen w-full bg-legal-dark text-slate-200 font-mono p-4 md:p-8">
      {/* Header / Hero */}
      <header className="max-w-6xl mx-auto border-b border-slate-700 pb-8 mb-12">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold text-legal-gold">
            ⚖️ CASE-MACHERET-1997-2026
          </h1>
          <div className="flex gap-2">
            <span className="bg-legal-green text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
              A©t0r CORE v13
            </span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              VERIFIED
            </span>
          </div>
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
            <h2 className="text-2xl font-semibold mb-6 text-legal-green underline">
              Legal Evidence Archive
            </h2>

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search archive (e.g., Jus Cogens, Scanner)..."
                className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-sm focus:border-legal-gold outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-500">
                    <th className="pb-2 pr-4">Artifact Name</th>
                    <th className="pb-2 pr-4">Type</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredArchive.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="py-3 pr-4 font-bold text-slate-300">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {item.name}
                          </a>
                        ) : (
                          item.name
                        )}
                      </td>
                      <td className="py-3 pr-4 text-slate-500 uppercase text-xs tracking-tighter">
                        {item.type || 'mirror'}
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border ${
                            item.status === 'evidence'
                              ? 'border-red-500/50 text-red-400'
                              : item.status === 'legal'
                                ? 'border-legal-green/50 text-legal-green'
                                : 'border-slate-600 text-slate-400'
                          }`}
                        >
                          {item.status?.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-semibold mb-4 text-legal-gold">
              Cryptographic Fixation
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 rounded border border-slate-700">
                <div className="text-xs text-slate-500 mb-1">A©TOR_KEY</div>
                <code className="text-[10px] break-all text-legal-green">
                  &quot;# [⚖ A©tor Declaration]&quot;
                </code>
              </div>
              <div className="p-4 bg-slate-900 rounded border border-slate-700">
                <div className="text-xs text-slate-500 mb-1">Deploy Seal</div>
                <code className="text-[10px] break-all">
                  eployed_57BF917347C0B4DC6D4ABD3F6B16405A3D97971ADF7E52FA55CFEA244C289BEA
                </code>
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
              <p className="text-xs text-slate-500 italic mt-4 leading-relaxed">
                Recipient: Maceret Alexei. All contributions support Case
                Maceret 1997-2026 and Jus Cogens defense.
              </p>
            </div>
          </div>

          <div className="p-6 border border-slate-700 rounded-lg bg-slate-800/20">
            <h3 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-widest">
              Secret Word Verification
            </h3>
            <div className="text-center p-4 border-2 border-dashed border-slate-700 rounded text-legal-green font-bold">
              &quot;База Данных&quot;
            </div>
          </div>
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 border-t border-slate-800 py-8 flex justify-between items-center text-slate-500 text-xs">
        <p>
          © 2026 Case Maceret 1997-2026. Transcendent Integrity Architecture.
        </p>
        <div className="flex gap-4">
          <span>SHA-256 Verified</span>
          <span>Open Source</span>
        </div>
      </footer>
    </div>
  );
};
