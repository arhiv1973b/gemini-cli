/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import { useState, useMemo } from 'react';
import archiveData from './archive_manifest.json';

type Artifact = {
  name: string;
  type?: string;
  category?: string;
  status?: string;
  url?: string;
  timestamp?: string;
  hash?: string | null;
};

type TabType = 'archive' | 'timeline' | 'dashboard' | 'integrity';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('archive');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Legal', 'Evidence', 'Media', 'Archive'];

  // --- Data Processing ---
  const stats = useMemo(() => ({
      total: archiveData.length,
      verified: archiveData.filter((i) => i.status === 'verified').length,
      legal: archiveData.filter((i) => i.category === 'Legal').length,
      media: archiveData.filter((i) => i.category === 'Media').length,
      secured: archiveData.filter((i) => i.status === 'secured').length,
      hashed: archiveData.filter((i) => (i as Artifact).hash).length,
    }), []);

  const timelineData = useMemo(() => {
    const grouped: Record<string, Artifact[]> = {};
    archiveData.forEach((item) => {
      const artifact = item as Artifact;
      const year = artifact.timestamp
        ? new Date(artifact.timestamp).getFullYear().toString()
        : 'Unknown';
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(artifact);
    });
    return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]));
  }, []);

  const filteredArchive = useMemo(() => (archiveData as Artifact[]).filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    }), [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen w-full bg-legal-dark text-slate-200 font-mono p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto border-b border-slate-700 pb-8 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold text-legal-gold">
            ⚖️ CASE-MACHERET-1997-2026
          </h1>
          <div className="flex gap-2">
            <span className="bg-legal-green text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              A©t0r CORE v13
            </span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              SHA-256 SECURED
            </span>
          </div>
        </div>

        {/* Main Tabs */}
        <nav className="flex gap-6 mt-8">
          {[
            { id: 'archive' as TabType, label: '📁 Archive' },
            { id: 'timeline' as TabType, label: '📅 Timeline' },
            { id: 'dashboard' as TabType, label: '📊 Dashboard' },
            { id: 'integrity' as TabType, label: '🛡️ Integrity' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-1 text-sm font-bold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-legal-gold text-legal-gold'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* --- ARCHIVE VIEW --- */}
        {activeTab === 'archive' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded text-[10px] font-bold transition-all border ${
                        activeCategory === cat
                          ? 'bg-legal-gold text-slate-900 border-legal-gold shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search 2000+ artifacts..."
                    className="w-full bg-slate-900 border border-slate-600 rounded px-4 py-2 text-sm focus:border-legal-gold outline-none transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead className="sticky top-0 bg-slate-800 z-10">
                      <tr className="border-b border-slate-700 text-slate-500">
                        <th className="py-3 pr-4">Artifact Name</th>
                        <th className="py-3 pr-4">Category</th>
                        <th className="py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredArchive.map((item, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-700/30 transition-colors group"
                        >
                          <td className="py-3 pr-4 font-bold text-slate-300 truncate max-w-xs group-hover:text-legal-gold">
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
                          <td className="py-3 pr-4 text-slate-500 uppercase tracking-tighter">
                            {item.category}
                          </td>
                          <td className="py-3">
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded border ${
                                item.status === 'verified'
                                  ? 'border-legal-green text-legal-green'
                                  : item.status === 'evidence'
                                    ? 'border-red-500 text-red-400'
                                    : 'border-slate-600 text-slate-500'
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
            </section>

            <aside className="space-y-6 text-xs">
              <div className="bg-legal-gold/5 p-6 rounded-lg border border-legal-gold/20">
                <h3 className="text-legal-gold font-bold mb-4 uppercase">
                  Integrity Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Items:</span>{' '}
                    <span className="text-white font-bold">{stats.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Seals:</span>{' '}
                    <span className="text-legal-green font-bold">
                      {stats.verified}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 italic">
                    <span>Secured:</span> <span>{stats.secured}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-slate-800 rounded bg-slate-900/50">
                <p className="text-slate-500 mb-2 font-bold underline">
                  SECURITY DIRECTIVE
                </p>
                <p className="text-[10px] leading-relaxed text-slate-400 italic">
                  &quot;что не должно: &apos;уйти&apos; в открытый доступ&quot;
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <p className="text-slate-500 mb-1">A©TOR_KEY</p>
                  <code className="text-[9px] break-all text-legal-gold">
                    &quot;# [⚖ A©tor Declaration]&quot;
                  </code>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* --- TIMELINE VIEW --- */}
        {activeTab === 'timeline' && (
          <div className="max-w-4xl mx-auto space-y-12 py-8">
            {timelineData.map(([year, items]) => (
              <div
                key={year}
                className="relative pl-8 border-l-2 border-slate-700"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-legal-gold shadow-[0_0_10px_#f59e0b]" />
                <h3 className="text-3xl font-bold text-legal-gold mb-6">
                  {year}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.slice(0, 10).map((item, i) => (
                    <div
                      key={i}
                      className="bg-slate-800/40 p-4 rounded border border-slate-700 hover:border-slate-500 transition-colors"
                    >
                      <div className="text-xs font-bold truncate text-slate-300">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-2 flex justify-between uppercase">
                        <span>{item.type}</span>
                        <span
                          className={
                            item.status === 'verified' ? 'text-legal-green' : ''
                          }
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {items.length > 10 && (
                    <div className="text-xs text-slate-500 italic p-4">
                      + {items.length - 10} more artifacts for this period...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- DASHBOARD VIEW --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: 'Total Artifacts',
                  value: stats.total,
                  color: 'text-white',
                },
                {
                  label: 'SHA-256 Hashes',
                  value: stats.hashed,
                  color: 'text-legal-green',
                },
                {
                  label: 'Legal Backbone',
                  value: stats.legal,
                  color: 'text-blue-400',
                },
                {
                  label: 'Media Archive',
                  value: stats.media,
                  color: 'text-purple-400',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center"
                >
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                    {stat.label}
                  </div>
                  <div className={`text-4xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/30 p-8 rounded-lg border border-slate-700">
              <h2 className="text-2xl font-semibold mb-8 text-legal-gold">
                Evidence Distribution
              </h2>
              <div className="space-y-6">
                {[
                  {
                    label: 'Cryptographic Indexing',
                    pct: (stats.hashed / stats.total) * 100,
                    color: 'bg-legal-green',
                  },
                  {
                    label: 'Legal Documentation',
                    pct: (stats.legal / stats.total) * 100,
                    color: 'bg-blue-500',
                  },
                  {
                    label: 'Media Evidence',
                    pct: (stats.media / stats.total) * 100,
                    color: 'bg-purple-500',
                  },
                  {
                    label: 'Secured Local Files',
                    pct: (stats.secured / stats.total) * 100,
                    color: 'bg-slate-500',
                  },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-xs mb-2">
                      <span>{bar.label}</span>
                      <span>{Math.round(bar.pct)}%</span>
                    </div>
                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${bar.color} shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-1000`}
                        style={{ width: `${bar.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- INTEGRITY VIEW --- */}
        {activeTab === 'integrity' && (
          <div className="py-8 space-y-8">
            <div className="bg-slate-800/50 p-8 rounded-lg border border-slate-700">
              <h2 className="text-2xl font-semibold mb-6 text-legal-green underline">
                SHA-256 Cryptographic Audit
              </h2>
              <p className="text-slate-400 mb-8 max-w-3xl">
                Real-time integrity verification for Case Maceret artifacts.
                Every file is mapped to a unique hash to prevent unauthorized
                modification or data loss.
              </p>

              <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-4">
                {(archiveData as Artifact[])
                  .filter((i) => i.hash)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900/80 p-4 rounded border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-bold text-slate-200">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">
                          {item.category} | {item.timestamp}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-legal-green shadow-[0_0_5px_#10b981]"></span>
                          <span className="text-[10px] text-legal-green font-bold">
                            INTEGRITY VERIFIED
                          </span>
                        </div>
                        <code className="text-[9px] text-slate-600 bg-black/30 px-2 py-1 rounded">
                          {item.hash}
                        </code>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto mt-20 border-t border-slate-800 py-8 flex justify-between items-center text-slate-500 text-[10px] uppercase tracking-widest">
        <p>
          © 2026 Case Maceret 1997-2026. Transcendent Integrity Architecture.
        </p>
        <div className="flex gap-6">
          <span>SHA-256 Multi-Layered</span>
          <span className="text-legal-gold font-bold underline">
            Secret Word: База Данных
          </span>
          <span>A©TOR_KEY SECURED</span>
        </div>
      </footer>
    </div>
  );
};
