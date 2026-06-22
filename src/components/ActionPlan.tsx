"use client";

import React, { useState, useEffect } from "react";
import { Sparkle, ArrowLeft, Download, Plus, Trash, CheckSquare, Calendar, Copy, Check, Printer } from "@phosphor-icons/react";
import { BusinessProfile, SwotData, TowsData, RoadmapItem, FinancialData, FinancialResult, generateLocalRoadmap, generateRoadmapWithGemini } from "../utils/aiEngine";

interface ActionPlanProps {
  profile: BusinessProfile;
  tows: TowsData;
  initialRoadmap: RoadmapItem[] | null;
  onSaveRoadmap: (roadmap: RoadmapItem[]) => void;
  onBack: () => void;
  apiKey: string;
  swot: SwotData;
  financialData: FinancialData | null;
  financialResult: FinancialResult | null;
}

export function ActionPlan({
  profile,
  tows,
  initialRoadmap,
  onSaveRoadmap,
  onBack,
  apiKey,
  swot,
  financialData,
  financialResult,
}: ActionPlanProps) {
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Custom add state
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTimeframe, setNewTimeframe] = useState<"immediate" | "midterm" | "longterm">("immediate");
  const [newKpi, setNewKpi] = useState("");

  useEffect(() => {
    if (initialRoadmap) {
      setRoadmap(initialRoadmap);
    } else {
      handleGenerateRoadmap();
    }
  }, [initialRoadmap]);

  const handleGenerateRoadmap = async () => {
    setIsLoading(true);
    try {
      let data: RoadmapItem[];
      if (apiKey) {
        data = await generateRoadmapWithGemini(profile, tows, apiKey);
      } else {
        data = generateLocalRoadmap(profile, tows);
      }
      setRoadmap(data);
    } catch (err: unknown) {
      console.error(err);
      const fallback = generateLocalRoadmap(profile, tows);
      setRoadmap(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newItem: RoadmapItem = {
      id: `custom_rm_${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim(),
      timeframe: newTimeframe,
      kpi: newKpi.trim() || "Tidak ada metrik spesifik yang ditentukan."
    };

    setRoadmap((prev) => [...prev, newItem]);
    setNewTitle("");
    setNewDesc("");
    setNewKpi("");
  };

  const handleRemoveItem = (id: string) => {
    setRoadmap((prev) => prev.filter(item => item.id !== id));
  };

  // Compile full business report in markdown format
  const getMarkdownReport = () => {
    const swotSection = `
## 2. Matriks SWOT

### Kekuatan (Strengths)
${swot.strengths.map((s, i) => `- S${i + 1}: ${s}`).join("\n")}

### Kelemahan (Weaknesses)
${swot.weaknesses.map((w, i) => `- W${i + 1}: ${w}`).join("\n")}

### Peluang (Opportunities)
${swot.opportunities.map((o, i) => `- O${i + 1}: ${o}`).join("\n")}

### Ancaman (Threats)
${swot.threats.map((t, i) => `- T${i + 1}: ${t}`).join("\n")}
`;

    const towsSection = `
## 3. Strategi TOWS

### Opsi SO (Strategi Kekuatan-Peluang)
${tows.so.map(s => `- **${s.title}**: ${s.description} (Dampak: ${s.impact})`).join("\n")}

### Opsi WO (Strategi Kelemahan-Peluang)
${tows.wo.map(s => `- **${s.title}**: ${s.description} (Dampak: ${s.impact})`).join("\n")}

### Opsi ST (Strategi Kekuatan-Ancaman)
${tows.st.map(s => `- **${s.title}**: ${s.description} (Dampak: ${s.impact})`).join("\n")}

### Opsi WT (Strategi Kelemahan-Ancaman)
${tows.wt.map(s => `- **${s.title}**: ${s.description} (Dampak: ${s.impact})`).join("\n")}
`;

    const financialsSection = financialResult && financialData ? `
## 4. Struktur Keuangan & HPP
- **Bahan Baku**: Rp ${financialData.rawMaterials.toLocaleString("id-ID")}
- **Tenaga Kerja**: Rp ${financialData.labor.toLocaleString("id-ID")}
- **Overhead Pabrik**: Rp ${financialData.overhead.toLocaleString("id-ID")}
- **Jumlah Produksi**: ${financialData.producedUnits} Unit
- **HPP per Unit**: Rp ${Math.round(financialResult.hppPerUnit).toLocaleString("id-ID")}
- **Harga Jual per Unit**: Rp ${financialData.sellingPrice.toLocaleString("id-ID")}
- **Margin Keuntungan Kotor**: ${financialResult.markupMargin.toFixed(1)}%
- **Biaya Tetap Bulanan**: Rp ${financialData.fixedCosts.toLocaleString("id-ID")}
- **Estimasi Penjualan Bulanan**: ${financialData.salesVolume} Unit
- **Proyeksi Laba Bersih Bulanan**: Rp ${Math.round(financialResult.netProfit).toLocaleString("id-ID")}
- **Titik Impas (BEP)**: ${financialResult.bepUnits} Unit (setara Rp ${Math.round(financialResult.bepCurrency).toLocaleString("id-ID")})
` : "";

    const roadmapSection = `
## 5. Rencana Peta Jalan 12-Bulan

### Fase 1: Tindakan Segera (0-3 Bulan)
${roadmap.filter(r => r.timeframe === "immediate").map(r => `- **${r.title}**: ${r.description}\n  *KPI: ${r.kpi}*`).join("\n")}

### Fase 2: Tindakan Jangka Menengah (3-6 Bulan)
${roadmap.filter(r => r.timeframe === "midterm").map(r => `- **${r.title}**: ${r.description}\n  *KPI: ${r.kpi}*`).join("\n")}

### Fase 3: Tindakan Jangka Panjang (6-12 Bulan)
${roadmap.filter(r => r.timeframe === "longterm").map(r => `- **${r.title}**: ${r.description}\n  *KPI: ${r.kpi}*`).join("\n")}
`;

    return `# Laporan Rencana Strategis Bisnis: ${profile.name}
*Dibuat otomatis oleh Hestia — Perancang Bisnis SWOT AI*

---

## 1. Profil Usaha
- **Kategori Industri**: ${profile.industry.toUpperCase()}
- **Skala Target**: ${profile.scale.toUpperCase()}
- **Proposisi Nilai Utama**: ${profile.valueProposition}
- **Deskripsi Ide Bisnis**: ${profile.description}
- **Target Audiens**: ${profile.targetAudience}

---
${swotSection}
---
${towsSection}
---
${financialsSection}
---
${roadmapSection}
`;
  };

  const handleCopyToClipboard = () => {
    const report = getMarkdownReport();
    navigator.clipboard.writeText(report).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleDownloadJson = () => {
    const fullPlan = {
      profile,
      swot,
      tows,
      financialData,
      financialResult,
      roadmap,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullPlan, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `hestia_rencana_${profile.name.toLowerCase().replace(/\s+/g, "_")}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  const renderTimelinePhase = (phase: "immediate" | "midterm" | "longterm", title: string, subtitle: string) => {
    const phaseItems = roadmap.filter(item => item.timeframe === phase);
    return (
      <div className="space-y-4">
        <div className="border-l-2 border-primary pl-4 py-1">
          <h3 className="text-sm font-bold text-ink flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            {title}
          </h3>
          <p className="text-xs text-ink-muted">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {phaseItems.map((item) => (
            <div
              key={item.id}
              className="bg-canvas border border-border-custom rounded-lg p-5 flex flex-col md:flex-row items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-grow max-w-xl">
                <h4 className="text-sm font-bold text-ink">{item.title}</h4>
                <p className="text-xs text-ink-muted leading-relaxed">{item.description}</p>
                <div className="pt-2 border-t border-border-custom/40 flex items-start gap-1.5 text-xs text-ink-muted">
                  <CheckSquare size={14} className="text-primary mt-0.5" />
                  <span>
                    <strong className="font-semibold text-ink">Metrik Keberhasilan (KPI): </strong>
                    {item.kpi}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="p-1.5 text-ink-muted hover:text-primary rounded-full hover:bg-surface-1 transition-colors cursor-pointer"
                aria-label="Hapus Item Peta Jalan"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
          {phaseItems.length === 0 && (
            <p className="text-xs text-ink-muted italic pl-4">Belum ada item penugasan rencana aksi di fase ini.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Screen Layout: Hidden during printing */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-[calc(100vh-68px)] print:hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
              Peta Jalan Aksi Strategis
            </h2>
            <p className="text-sm text-ink-muted mt-1 leading-relaxed max-w-xl">
              Distribusi target pengerjaan taktik TOWS Anda ke dalam timeline 12-bulan operasional yang kronologis dan terukur.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-4 py-2 border border-border-custom text-ink hover:bg-surface-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Keuangan & HPP</span>
            </button>
            <button
              onClick={handleGenerateRoadmap}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 border border-primary/20 text-primary hover:bg-primary/5 rounded-md text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              <Sparkle size={16} className={isLoading ? "animate-spin" : ""} />
              <span>Regenerasi AI Peta Jalan</span>
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="flex items-center gap-1.5 px-4 py-2 border border-border-custom text-ink hover:bg-surface-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
            >
              {isCopied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              <span>{isCopied ? "Tersalin!" : "Salin Laporan"}</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-4 py-2 border border-border-custom text-ink hover:bg-surface-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
              title="Ekspor sebagai File JSON"
            >
              <Download size={16} />
              <span>Ekspor JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-hover text-canvas font-medium rounded-md transition-colors cursor-pointer text-sm"
              title="Unduh Rencana dalam bentuk PDF (Cetak Halaman)"
            >
              <Printer size={16} />
              <span>Ekspor PDF / Cetak</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
          {/* Left Column: Timeline Phases */}
          <div className="lg:col-span-8 space-y-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <Sparkle size={32} className="animate-spin text-primary" />
                <p className="text-sm text-ink-muted">AI sedang menyusun peta jalan rencana aksi...</p>
              </div>
            ) : (
              <>
                {renderTimelinePhase("immediate", "Fase 1: Tindakan Segera (0-3 Bulan)", "Fokus pada validasi produk, penataan keuangan, dan langkah persiapan utama.")}
                {renderTimelinePhase("midterm", "Fase 2: Tindakan Jangka Menengah (3-6 Bulan)", "Pengembangan berkelanjutan, optimasi promosi, dan otomatisasi administrasi.")}
                {renderTimelinePhase("longterm", "Fase 3: Tindakan Jangka Panjang (6-12 Bulan)", "Langkah perluasan jangkauan pasar, kemitraan strategis, dan ekspansi skala produk.")}
              </>
            )}
          </div>

          {/* Right Column: Custom Item Adder */}
          <div className="lg:col-span-4 self-start">
            <form onSubmit={handleAddItem} className="bg-surface-1 border border-border-custom rounded-lg p-5 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink flex items-center gap-1.5">
                <Plus size={12} className="text-primary" />
                Tambah Rencana Kustom
              </h4>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="rm-title" className="text-[10px] font-bold text-ink uppercase">Nama Kegiatan</label>
                <input
                  id="rm-title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="misal: Mendaftarkan Izin Edar PIRT"
                  className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="rm-timeframe" className="text-[10px] font-bold text-ink uppercase">Fase Target Waktu</label>
                <div className="flex gap-2">
                  {(["immediate", "midterm", "longterm"] as const).map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setNewTimeframe(tf)}
                      className={`flex-1 px-2 py-1 border rounded text-[10px] font-bold capitalize transition-colors cursor-pointer ${
                        newTimeframe === tf
                          ? "bg-primary text-canvas border-primary"
                          : "bg-canvas border-border-custom text-ink hover:bg-surface-2"
                      }`}
                    >
                      {tf === "immediate" ? "0-3 Bln" : tf === "midterm" ? "3-6 Bln" : "6-12 Bln"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="rm-desc" className="text-[10px] font-bold text-ink uppercase">Detail Tindakan</label>
                <textarea
                  id="rm-desc"
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Rincian deskripsi mengenai apa yang harus dikerjakan..."
                  className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="rm-kpi" className="text-[10px] font-bold text-ink uppercase">Indikator Kinerja Utama (KPI)</label>
                <input
                  id="rm-kpi"
                  type="text"
                  value={newKpi}
                  onChange={(e) => setNewKpi(e.target.value)}
                  placeholder="misal: Sertifikat izin edar terbit"
                  className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-primary hover:bg-primary-hover text-canvas font-medium rounded-md text-xs transition-colors cursor-pointer text-center"
              >
                Tambah Rencana
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* PRINT LAYOUT: Visible ONLY during window.print() (PDF generation) */}
      <div className="hidden print:block font-serif max-w-[800px] mx-auto p-12 bg-white text-black space-y-8 leading-relaxed text-sm">
        {/* Document Header */}
        <div className="border-b-2 border-black pb-4 text-center space-y-1">
          <h1 className="text-2xl font-bold uppercase tracking-tight">Laporan Rencana Strategis Bisnis</h1>
          <p className="text-sm italic text-gray-600">Dibuat otomatis oleh Hestia — Perancang Bisnis SWOT & TOWS AI</p>
          <p className="text-xs text-gray-500">Tanggal Ekspor: {new Date().toLocaleDateString("id-ID")}</p>
        </div>

        {/* 1. Profil Usaha */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1">1. Profil Usaha</h2>
          <table className="w-full text-left text-xs border-collapse">
            <tbody>
              <tr className="border-b border-gray-100">
                <th className="py-2 w-1/4 align-top">Nama Bisnis:</th>
                <td className="py-2">{profile.name}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="py-2 align-top">Kategori Industri:</th>
                <td className="py-2 capitalize">{profile.industry}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="py-2 align-top">Skala Target:</th>
                <td className="py-2 capitalize">{profile.scale}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="py-2 align-top">Proposisi Nilai:</th>
                <td className="py-2">{profile.valueProposition}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="py-2 align-top">Deskripsi Ide:</th>
                <td className="py-2">{profile.description}</td>
              </tr>
              <tr>
                <th className="py-2 align-top">Target Audiens:</th>
                <td className="py-2">{profile.targetAudience}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 2. Matriks SWOT */}
        <section className="space-y-3 page-break-before">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1">2. Matriks SWOT</h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            {/* Strengths */}
            <div className="border border-gray-200 p-3 rounded">
              <h4 className="font-bold text-green-800 mb-2">Kekuatan (Strengths)</h4>
              <ul className="list-disc pl-4 space-y-1">
                {swot.strengths.map((item, idx) => (
                  <li key={idx}>[S{idx + 1}] {item}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="border border-gray-200 p-3 rounded">
              <h4 className="font-bold text-red-800 mb-2">Kelemahan (Weaknesses)</h4>
              <ul className="list-disc pl-4 space-y-1">
                {swot.weaknesses.map((item, idx) => (
                  <li key={idx}>[W{idx + 1}] {item}</li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="border border-gray-200 p-3 rounded">
              <h4 className="font-bold text-blue-800 mb-2">Peluang (Opportunities)</h4>
              <ul className="list-disc pl-4 space-y-1">
                {swot.opportunities.map((item, idx) => (
                  <li key={idx}>[O{idx + 1}] {item}</li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="border border-gray-200 p-3 rounded">
              <h4 className="font-bold text-yellow-800 mb-2">Ancaman (Threats)</h4>
              <ul className="list-disc pl-4 space-y-1">
                {swot.threats.map((item, idx) => (
                  <li key={idx}>[T{idx + 1}] {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Strategi TOWS */}
        <section className="space-y-4 page-break-before">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1">3. Strategi TOWS</h2>
          
          <div className="space-y-3 text-xs">
            {/* SO */}
            {tows.so.length > 0 && (
              <div>
                <h3 className="font-bold text-green-800">Strategi Kekuatan-Peluang (SO)</h3>
                <ul className="list-decimal pl-4 space-y-1 mt-1">
                  {tows.so.map(s => (
                    <li key={s.id}><strong>{s.title}</strong>: {s.description} ({s.factors.join(", ")})</li>
                  ))}
                </ul>
              </div>
            )}

            {/* WO */}
            {tows.wo.length > 0 && (
              <div>
                <h3 className="font-bold text-blue-800 mt-2">Strategi Kelemahan-Peluang (WO)</h3>
                <ul className="list-decimal pl-4 space-y-1 mt-1">
                  {tows.wo.map(s => (
                    <li key={s.id}><strong>{s.title}</strong>: {s.description} ({s.factors.join(", ")})</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ST */}
            {tows.st.length > 0 && (
              <div>
                <h3 className="font-bold text-yellow-800 mt-2">Strategi Kekuatan-Ancaman (ST)</h3>
                <ul className="list-decimal pl-4 space-y-1 mt-1">
                  {tows.st.map(s => (
                    <li key={s.id}><strong>{s.title}</strong>: {s.description} ({s.factors.join(", ")})</li>
                  ))}
                </ul>
              </div>
            )}

            {/* WT */}
            {tows.wt.length > 0 && (
              <div>
                <h3 className="font-bold text-red-800 mt-2">Strategi Kelemahan-Ancaman (WT)</h3>
                <ul className="list-decimal pl-4 space-y-1 mt-1">
                  {tows.wt.map(s => (
                    <li key={s.id}><strong>{s.title}</strong>: {s.description} ({s.factors.join(", ")})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* 4. Analisis Keuangan */}
        {financialResult && financialData && (
          <section className="space-y-3 page-break-before">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1">4. Analisis Keuangan & Harga Pokok Penjualan (HPP)</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
              <div><strong className="text-gray-700">Biaya Bahan Baku:</strong> Rp {financialData.rawMaterials.toLocaleString("id-ID")}</div>
              <div><strong className="text-gray-700">Tenaga Kerja Langsung:</strong> Rp {financialData.labor.toLocaleString("id-ID")}</div>
              <div><strong className="text-gray-700">Biaya Overhead Pabrik:</strong> Rp {financialData.overhead.toLocaleString("id-ID")}</div>
              <div><strong className="text-gray-700">Jumlah Unit Produksi:</strong> {financialData.producedUnits} Unit</div>
              <div className="col-span-2 border-t border-gray-100 my-1"></div>
              <div><strong className="text-gray-900">HPP per Unit:</strong> Rp {Math.round(financialResult.hppPerUnit).toLocaleString("id-ID")}</div>
              <div><strong className="text-gray-900">Harga Jual per Unit:</strong> Rp {financialData.sellingPrice.toLocaleString("id-ID")}</div>
              <div><strong className="text-gray-900">Margin Keuntungan Kotor:</strong> {financialResult.markupMargin.toFixed(1)}%</div>
              <div><strong className="text-gray-900">Biaya Tetap Bulanan:</strong> Rp {financialData.fixedCosts.toLocaleString("id-ID")}</div>
              <div className="col-span-2 border-t border-gray-100 my-1"></div>
              <div><strong className="text-gray-900">Volume Penjualan Bulanan:</strong> {financialData.salesVolume} Unit</div>
              <div><strong className="text-green-800">Proyeksi Laba Bersih Bulanan:</strong> Rp {Math.round(financialResult.netProfit).toLocaleString("id-ID")}</div>
              <div><strong className="text-gray-900">Titik Impas (BEP) Unit:</strong> {financialResult.bepUnits} Unit</div>
              <div><strong className="text-gray-900">Titik Impas (BEP) Rupiah:</strong> Rp {Math.round(financialResult.bepCurrency).toLocaleString("id-ID")}</div>
            </div>
          </section>
        )}

        {/* 5. Peta Jalan Aksi */}
        <section className="space-y-4 page-break-before">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1">5. Rencana Peta Jalan Aksi (Roadmap)</h2>
          
          <div className="space-y-4 text-xs">
            {/* Immediate */}
            <div>
              <h3 className="font-bold border-l-2 border-black pl-2">Fase 1: Tindakan Jangka Pendek (0-3 Bulan)</h3>
              <ul className="space-y-2 mt-2 pl-2">
                {roadmap.filter(r => r.timeframe === "immediate").map(r => (
                  <li key={r.id} className="border-b border-gray-50 pb-2">
                    <strong>{r.title}</strong>: {r.description} <br/>
                    <span className="text-gray-600 italic">*KPI: {r.kpi}*</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Midterm */}
            <div>
              <h3 className="font-bold border-l-2 border-black pl-2 mt-3">Fase 2: Tindakan Jangka Menengah (3-6 Bulan)</h3>
              <ul className="space-y-2 mt-2 pl-2">
                {roadmap.filter(r => r.timeframe === "midterm").map(r => (
                  <li key={r.id} className="border-b border-gray-50 pb-2">
                    <strong>{r.title}</strong>: {r.description} <br/>
                    <span className="text-gray-600 italic">*KPI: {r.kpi}*</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Longterm */}
            <div>
              <h3 className="font-bold border-l-2 border-black pl-2 mt-3">Fase 3: Tindakan Jangka Panjang (6-12 Bulan)</h3>
              <ul className="space-y-2 mt-2 pl-2">
                {roadmap.filter(r => r.timeframe === "longterm").map(r => (
                  <li key={r.id} className="border-b border-gray-50 pb-2">
                    <strong>{r.title}</strong>: {r.description} <br/>
                    <span className="text-gray-600 italic">*KPI: {r.kpi}*</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
