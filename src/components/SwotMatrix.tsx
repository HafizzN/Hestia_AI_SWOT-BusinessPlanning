"use client";

import React, { useState } from "react";
import { Plus, X, ArrowRight, ShieldCheck, WarningOctagon, TrendUp, Warning } from "@phosphor-icons/react";
import { SwotData } from "../utils/aiEngine";

interface SwotMatrixProps {
  initialSwot: SwotData;
  onSaveSwot: (swot: SwotData) => void;
  onBack: () => void;
}

export function SwotMatrix({ initialSwot, onSaveSwot, onBack }: SwotMatrixProps) {
  const [swot, setSwot] = useState<SwotData>({
    strengths: [...initialSwot.strengths],
    weaknesses: [...initialSwot.weaknesses],
    opportunities: [...initialSwot.opportunities],
    threats: [...initialSwot.threats]
  });

  const [newStrength, setNewStrength] = useState("");
  const [newWeakness, setNewWeakness] = useState("");
  const [newOpportunity, setNewOpportunity] = useState("");
  const [newThreat, setNewThreat] = useState("");

  const handleAddItem = (category: keyof SwotData, text: string, clearFn: () => void) => {
    if (!text.trim()) return;
    setSwot((prev) => ({
      ...prev,
      [category]: [...prev[category], text.trim()]
    }));
    clearFn();
  };

  const handleRemoveItem = (category: keyof SwotData, index: number) => {
    setSwot((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleProceed = () => {
    onSaveSwot(swot);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-[calc(100vh-68px)]">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            Papan Matriks SWOT
          </h2>
          <p className="text-sm text-ink-muted mt-1 leading-relaxed max-w-xl">
            Tinjau dan sesuaikan faktor kekuatan & kelemahan internal, serta peluang & ancaman eksternal bisnis Anda. Anda bebas menambah kartu baru atau menghapus saran otomatis.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-border-custom text-ink hover:bg-surface-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
          >
            Ubah Profil
          </button>
          <button
            onClick={handleProceed}
            className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-hover text-canvas font-medium rounded-md transition-colors cursor-pointer text-sm"
          >
            <span>Lanjutkan ke TOWS</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
        {/* STRENGTHS (Internal, Helpful) */}
        <div className="bg-surface-1 border border-border-custom rounded-lg p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-green-50 text-green-700 border border-green-200/50 rounded-md">
                <ShieldCheck size={18} weight="duotone" />
              </div>
              <h3 className="text-base font-semibold text-ink">Kekuatan (Strengths)</h3>
              <span className="text-xs text-ink-muted font-mono ml-auto">Internal · Membantu</span>
            </div>
            <p className="text-xs text-ink-muted mb-4">
              Apa keunggulan utama dari bisnis Anda? Aset, keahlian khusus, atau sumber daya unik apa yang Anda miliki?
            </p>

            <ul className="space-y-2 mb-6">
              {swot.strengths.map((item, idx) => (
                <li
                  key={idx}
                  className="group flex items-start gap-2 bg-canvas border border-border-custom rounded-md p-3 text-sm text-ink leading-relaxed"
                >
                  <span className="text-xs font-mono font-semibold text-primary mt-0.5">S{idx + 1}</span>
                  <span className="flex-grow">{item}</span>
                  <button
                    onClick={() => handleRemoveItem("strengths", idx)}
                    className="p-1 text-ink-muted hover:text-primary rounded-full hover:bg-surface-1 transition-colors cursor-pointer focus:outline-none"
                    aria-label="Hapus faktor kekuatan"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
              {swot.strengths.length === 0 && (
                <p className="text-xs text-ink-muted italic py-4">Belum ada daftar kekuatan. Tambahkan di bawah ini.</p>
              )}
            </ul>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newStrength}
              onChange={(e) => setNewStrength(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddItem("strengths", newStrength, () => setNewStrength(""))}
              placeholder="Tambah kekuatan kustom..."
              className="flex-grow px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
            />
            <button
              onClick={() => handleAddItem("strengths", newStrength, () => setNewStrength(""))}
              className="p-2 bg-surface-2 hover:bg-border-custom text-ink rounded-md transition-colors cursor-pointer focus:outline-none"
              aria-label="Tambah Kekuatan"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* WEAKNESSES (Internal, Harmful) */}
        <div className="bg-surface-1 border border-border-custom rounded-lg p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-red-50 text-red-700 border border-red-200/50 rounded-md">
                <WarningOctagon size={18} weight="duotone" />
              </div>
              <h3 className="text-base font-semibold text-ink">Kelemahan (Weaknesses)</h3>
              <span className="text-xs text-ink-muted font-mono ml-auto">Internal · Menghambat</span>
            </div>
            <p className="text-xs text-ink-muted mb-4">
              Apa kelemahan internal dari bisnis Anda? Hambatan operasional, keterbatasan dana, atau kesenjangan kompetensi apa yang dihadapi?
            </p>

            <ul className="space-y-2 mb-6">
              {swot.weaknesses.map((item, idx) => (
                <li
                  key={idx}
                  className="group flex items-start gap-2 bg-canvas border border-border-custom rounded-md p-3 text-sm text-ink leading-relaxed"
                >
                  <span className="text-xs font-mono font-semibold text-primary mt-0.5">W{idx + 1}</span>
                  <span className="flex-grow">{item}</span>
                  <button
                    onClick={() => handleRemoveItem("weaknesses", idx)}
                    className="p-1 text-ink-muted hover:text-primary rounded-full hover:bg-surface-1 transition-colors cursor-pointer focus:outline-none"
                    aria-label="Hapus faktor kelemahan"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
              {swot.weaknesses.length === 0 && (
                <p className="text-xs text-ink-muted italic py-4">Belum ada daftar kelemahan. Tambahkan di bawah ini.</p>
              )}
            </ul>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newWeakness}
              onChange={(e) => setNewWeakness(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddItem("weaknesses", newWeakness, () => setNewWeakness(""))}
              placeholder="Tambah kelemahan kustom..."
              className="flex-grow px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
            />
            <button
              onClick={() => handleAddItem("weaknesses", newWeakness, () => setNewWeakness(""))}
              className="p-2 bg-surface-2 hover:bg-border-custom text-ink rounded-md transition-colors cursor-pointer focus:outline-none"
              aria-label="Tambah Kelemahan"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* OPPORTUNITIES (External, Helpful) */}
        <div className="bg-surface-1 border border-border-custom rounded-lg p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-blue-50 text-blue-700 border border-blue-200/50 rounded-md">
                <TrendUp size={18} weight="duotone" />
              </div>
              <h3 className="text-base font-semibold text-ink">Peluang (Opportunities)</h3>
              <span className="text-xs text-ink-muted font-mono ml-auto">Eksternal · Membantu</span>
            </div>
            <p className="text-xs text-ink-muted mb-4">
              Peluang luar apa yang dapat dimanfaatkan? Tren pasar, pergeseran minat konsumen, atau perkembangan regulasi baru yang mendukung?
            </p>

            <ul className="space-y-2 mb-6">
              {swot.opportunities.map((item, idx) => (
                <li
                  key={idx}
                  className="group flex items-start gap-2 bg-canvas border border-border-custom rounded-md p-3 text-sm text-ink leading-relaxed"
                >
                  <span className="text-xs font-mono font-semibold text-primary mt-0.5">O{idx + 1}</span>
                  <span className="flex-grow">{item}</span>
                  <button
                    onClick={() => handleRemoveItem("opportunities", idx)}
                    className="p-1 text-ink-muted hover:text-primary rounded-full hover:bg-surface-1 transition-colors cursor-pointer focus:outline-none"
                    aria-label="Hapus faktor peluang"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
              {swot.opportunities.length === 0 && (
                <p className="text-xs text-ink-muted italic py-4">Belum ada daftar peluang. Tambahkan di bawah ini.</p>
              )}
            </ul>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newOpportunity}
              onChange={(e) => setNewOpportunity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddItem("opportunities", newOpportunity, () => setNewOpportunity(""))}
              placeholder="Tambah peluang kustom..."
              className="flex-grow px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
            />
            <button
              onClick={() => handleAddItem("opportunities", newOpportunity, () => setNewOpportunity(""))}
              className="p-2 bg-surface-2 hover:bg-border-custom text-ink rounded-md transition-colors cursor-pointer focus:outline-none"
              aria-label="Tambah Peluang"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* THREATS (External, Harmful) */}
        <div className="bg-surface-1 border border-border-custom rounded-lg p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200/50 rounded-md">
                <Warning size={18} weight="duotone" />
              </div>
              <h3 className="text-base font-semibold text-ink">Ancaman (Threats)</h3>
              <span className="text-xs text-ink-muted font-mono ml-auto">Eksternal · Menghambat</span>
            </div>
            <p className="text-xs text-ink-muted mb-4">
              Apa saja ancaman luar yang mungkin mengganggu? Gerakan kompetitor, risiko suplai bahan baku, atau krisis makro ekonomi?
            </p>

            <ul className="space-y-2 mb-6">
              {swot.threats.map((item, idx) => (
                <li
                  key={idx}
                  className="group flex items-start gap-2 bg-canvas border border-border-custom rounded-md p-3 text-sm text-ink leading-relaxed"
                >
                  <span className="text-xs font-mono font-semibold text-primary mt-0.5">T{idx + 1}</span>
                  <span className="flex-grow">{item}</span>
                  <button
                    onClick={() => handleRemoveItem("threats", idx)}
                    className="p-1 text-ink-muted hover:text-primary rounded-full hover:bg-surface-1 transition-colors cursor-pointer focus:outline-none"
                    aria-label="Hapus faktor ancaman"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
              {swot.threats.length === 0 && (
                <p className="text-xs text-ink-muted italic py-4">Belum ada daftar ancaman. Tambahkan di bawah ini.</p>
              )}
            </ul>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newThreat}
              onChange={(e) => setNewThreat(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddItem("threats", newThreat, () => setNewThreat(""))}
              placeholder="Tambah ancaman kustom..."
              className="flex-grow px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
            />
            <button
              onClick={() => handleAddItem("threats", newThreat, () => setNewThreat(""))}
              className="p-2 bg-surface-2 hover:bg-border-custom text-ink rounded-md transition-colors cursor-pointer focus:outline-none"
              aria-label="Tambah Ancaman"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
