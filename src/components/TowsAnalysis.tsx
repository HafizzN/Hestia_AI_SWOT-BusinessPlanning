"use client";

import React, { useState, useEffect } from "react";
import { Sparkle, ArrowRight, ArrowLeft, Plus, Trash } from "@phosphor-icons/react";
import { BusinessProfile, SwotData, TowsData, TowsStrategy, generateLocalTowsData, generateTowsWithGemini } from "../utils/aiEngine";

interface TowsAnalysisProps {
  profile: BusinessProfile;
  swot: SwotData;
  initialTows: TowsData | null;
  onSaveTows: (tows: TowsData) => void;
  onBack: () => void;
  apiKey: string;
}

export function TowsAnalysis({ profile, swot, initialTows, onSaveTows, onBack, apiKey }: TowsAnalysisProps) {
  const [tows, setTows] = useState<TowsData>({
    so: [],
    wo: [],
    st: [],
    wt: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"so" | "wo" | "st" | "wt">("so");

  // Inputs for adding new strategy
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImpact, setNewImpact] = useState<"High" | "Medium" | "Low">("High");
  const [newFactors, setNewFactors] = useState("");

  useEffect(() => {
    if (initialTows) {
      setTows(initialTows);
    } else {
      handleGenerateStrategies();
    }
  }, [initialTows]);

  const handleGenerateStrategies = async () => {
    setIsLoading(true);
    try {
      let data: TowsData;
      if (apiKey) {
        data = await generateTowsWithGemini(profile, swot, apiKey);
      } else {
        data = generateLocalTowsData(profile, swot);
      }
      setTows(data);
    } catch (err: unknown) {
      console.error(err);
      const fallback = generateLocalTowsData(profile, swot);
      setTows(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStrategy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newStrat: TowsStrategy = {
      id: `custom_${activeTab}_${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim(),
      impact: newImpact,
      factors: newFactors ? newFactors.split(",").map(f => f.trim().toUpperCase()) : []
    };

    setTows((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newStrat]
    }));

    setNewTitle("");
    setNewDesc("");
    setNewImpact("High");
    setNewFactors("");
  };

  const handleRemoveStrategy = (quadrant: "so" | "wo" | "st" | "wt", id: string) => {
    setTows((prev) => ({
      ...prev,
      [quadrant]: prev[quadrant].filter(s => s.id !== id)
    }));
  };

  const handleProceed = () => {
    onSaveTows(tows);
  };

  const quadrantInfo = {
    so: {
      label: "Strategi SO (Maxi-Maxi)",
      def: "Gunakan kekuatan internal (Strengths) untuk menangkap peluang eksternal (Opportunities).",
      bg: "bg-green-50/50 border-green-200/50 text-green-800"
    },
    wo: {
      label: "Strategi WO (Mini-Maxi)",
      def: "Atasi kelemahan internal (Weaknesses) dengan memanfaatkan peluang eksternal (Opportunities).",
      bg: "bg-blue-50/50 border-blue-200/50 text-blue-800"
    },
    st: {
      label: "Strategi ST (Maxi-Mini)",
      def: "Gunakan kekuatan internal (Strengths) untuk meminimalkan dampak ancaman eksternal (Threats).",
      bg: "bg-yellow-50/50 border-yellow-200/50 text-yellow-800"
    },
    wt: {
      label: "Strategi WT (Mini-Mini)",
      def: "Minimalkan kelemahan internal (Weaknesses) dan hindari ancaman eksternal (Threats).",
      bg: "bg-red-50/50 border-red-200/50 text-red-800"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-[calc(100vh-68px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            Formulasi Strategi TOWS
          </h2>
          <p className="text-sm text-ink-muted mt-1 leading-relaxed max-w-xl">
            TOWS menyilangkan faktor SWOT Anda untuk menemukan opsi strategi pertumbuhan (growth) dan pertahanan (defense) yang paling masuk akal.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 border border-border-custom text-ink hover:bg-surface-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Papan SWOT</span>
          </button>
          <button
            onClick={handleGenerateStrategies}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 border border-primary/20 text-primary hover:bg-primary/5 rounded-md text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            <Sparkle size={16} className={isLoading ? "animate-spin" : ""} />
            <span>Regenerasi Ide AI</span>
          </button>
          <button
            onClick={handleProceed}
            className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-hover text-canvas font-medium rounded-md transition-colors cursor-pointer text-sm"
          >
            <span>Kalkulasi Keuangan & HPP</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        {/* Left Column: Quick SWOT Reference */}
        <div className="lg:col-span-4 bg-surface-1 border border-border-custom rounded-lg p-5 self-start">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink mb-4">
            Panel Referensi SWOT
          </h3>
          
          <div className="space-y-4">
            {/* Strengths */}
            <div>
              <h4 className="text-xs font-semibold text-green-800 mb-1">Kekuatan (S)</h4>
              <div className="flex flex-wrap gap-1">
                {swot.strengths.map((_, i) => (
                  <span key={i} title={_} className="px-2 py-0.5 bg-canvas border border-border-custom text-xs font-mono font-bold rounded">
                    S{i + 1}
                  </span>
                ))}
                {swot.strengths.length === 0 && <span className="text-xs text-ink-muted italic">Kosong</span>}
              </div>
            </div>

            {/* Weaknesses */}
            <div>
              <h4 className="text-xs font-semibold text-red-800 mb-1">Kelemahan (W)</h4>
              <div className="flex flex-wrap gap-1">
                {swot.weaknesses.map((_, i) => (
                  <span key={i} title={_} className="px-2 py-0.5 bg-canvas border border-border-custom text-xs font-mono font-bold rounded">
                    W{i + 1}
                  </span>
                ))}
                {swot.weaknesses.length === 0 && <span className="text-xs text-ink-muted italic">Kosong</span>}
              </div>
            </div>

            {/* Opportunities */}
            <div>
              <h4 className="text-xs font-semibold text-blue-800 mb-1">Peluang (O)</h4>
              <div className="flex flex-wrap gap-1">
                {swot.opportunities.map((_, i) => (
                  <span key={i} title={_} className="px-2 py-0.5 bg-canvas border border-border-custom text-xs font-mono font-bold rounded">
                    O{i + 1}
                  </span>
                ))}
                {swot.opportunities.length === 0 && <span className="text-xs text-ink-muted italic">Kosong</span>}
              </div>
            </div>

            {/* Threats */}
            <div>
              <h4 className="text-xs font-semibold text-yellow-800 mb-1">Ancaman (T)</h4>
              <div className="flex flex-wrap gap-1">
                {swot.threats.map((_, i) => (
                  <span key={i} title={_} className="px-2 py-0.5 bg-canvas border border-border-custom text-xs font-mono font-bold rounded">
                    T{i + 1}
                  </span>
                ))}
                {swot.threats.length === 0 && <span className="text-xs text-ink-muted italic">Kosong</span>}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-border-custom text-xs text-ink-muted leading-relaxed">
            Metode TOWS mengawinkan kode faktor internal dan eksternal. Hubungkan faktor di dalam deskripsi saat membuat strategi baru.
          </div>
        </div>

        {/* Right Column: TOWS Quad Tabs and Strategies */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-border-custom gap-1 mb-6">
            {(["so", "wo", "st", "wt"] as const).map((quad) => {
              const isActive = activeTab === quad;
              return (
                <button
                  key={quad}
                  onClick={() => setActiveTab(quad)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer focus:outline-none ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-ink-muted hover:text-ink hover:border-border-custom"
                  }`}
                >
                  Opsi {quad.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Active Quadrant Details */}
          <div className={`p-4 border rounded-md mb-6 ${quadrantInfo[activeTab].bg}`}>
            <h3 className="text-sm font-semibold">{quadrantInfo[activeTab].label}</h3>
            <p className="text-xs mt-1 opacity-90 leading-relaxed">{quadrantInfo[activeTab].def}</p>
          </div>

          {/* Strategies List */}
          <div className="space-y-4 mb-8 flex-grow">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Sparkle size={32} className="animate-spin text-primary" />
                <p className="text-sm text-ink-muted">AI sedang merumuskan opsi TOWS...</p>
              </div>
            ) : tows[activeTab]?.length > 0 ? (
              tows[activeTab].map((strat) => (
                <div
                  key={strat.id}
                  className="bg-canvas border border-border-custom rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-border-custom/80 transition-colors"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-ink">{strat.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        strat.impact === "High"
                          ? "bg-primary/10 text-primary"
                          : strat.impact === "Medium"
                          ? "bg-accent-warm/15 text-primary-hover"
                          : "bg-surface-2 text-ink-muted"
                      }`}>
                        Dampak {strat.impact === "High" ? "Tinggi" : strat.impact === "Medium" ? "Sedang" : "Rendah"}
                      </span>
                      {strat.factors?.length > 0 && (
                        <div className="flex gap-1">
                          {strat.factors.map((f, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-surface-1 border border-border-custom text-[10px] font-mono text-ink-muted rounded">
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed">{strat.description}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveStrategy(activeTab, strat.id)}
                    className="p-1.5 text-ink-muted hover:text-primary rounded-full hover:bg-surface-1 transition-colors cursor-pointer flex-shrink-0"
                    aria-label="Hapus Strategi"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-surface-1 rounded-md border border-border-custom border-dashed">
                <p className="text-xs text-ink-muted italic">Belum ada strategi kustom di kuadran ini.</p>
              </div>
            )}
          </div>

          {/* Add Custom Strategy Form */}
          <form onSubmit={handleAddStrategy} className="bg-surface-1 border border-border-custom rounded-lg p-5 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink flex items-center gap-1.5">
              <Plus size={12} className="text-primary" />
              Tambah Strategi Kustom
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="strategy-title" className="text-[10px] font-bold text-ink uppercase">Judul Strategi</label>
                <input
                  id="strategy-title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="misal: Kampanye Afiliasi Akhir Tahun"
                  className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="strategy-factors" className="text-[10px] font-bold text-ink uppercase">Faktor Silang (Kompatibel, misal: S1, O3)</label>
                <input
                  id="strategy-factors"
                  type="text"
                  value={newFactors}
                  onChange={(e) => setNewFactors(e.target.value)}
                  placeholder="e.g. S1, O3, T2"
                  className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="strategy-desc" className="text-[10px] font-bold text-ink uppercase">Detail Aksi Strategis</label>
              <textarea
                id="strategy-desc"
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Bagaimana langkah konkret pengerjaan operasional dari strategi ini?"
                className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40 resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2 border-t border-border-custom/50">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-ink uppercase">Tingkat Dampak</span>
                <div className="flex gap-2">
                  {[
                    { id: "High", label: "Tinggi" },
                    { id: "Medium", label: "Sedang" },
                    { id: "Low", label: "Rendah" }
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setNewImpact(lvl.id as "High" | "Medium" | "Low")}
                      className={`px-3 py-1 border rounded text-[10px] font-bold transition-colors cursor-pointer ${
                        newImpact === lvl.id
                          ? "bg-primary text-canvas border-primary"
                          : "bg-canvas border-border-custom text-ink hover:bg-surface-2"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-canvas font-medium rounded-md text-xs transition-colors cursor-pointer"
              >
                Tambah Opsi Strategi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
