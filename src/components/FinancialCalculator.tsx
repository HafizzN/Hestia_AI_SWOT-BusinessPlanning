"use client";

import React, { useState, useEffect } from "react";
import { Sparkle, ArrowRight, ArrowLeft, Calculator, ChartPieSlice, TrendUp } from "@phosphor-icons/react";
import { BusinessProfile, FinancialData, FinancialResult, calculateFinancials, analyzeFinancialsLocal, analyzeFinancialsWithGemini } from "../utils/aiEngine";

interface FinancialCalculatorProps {
  profile: BusinessProfile;
  initialData: FinancialData | null;
  onSaveFinancials: (data: FinancialData, result: FinancialResult) => void;
  onBack: () => void;
  apiKey: string;
}

export function FinancialCalculator({ profile, initialData, onSaveFinancials, onBack, apiKey }: FinancialCalculatorProps) {
  const [data, setData] = useState<FinancialData>({
    rawMaterials: initialData?.rawMaterials || 0,
    labor: initialData?.labor || 0,
    overhead: initialData?.overhead || 0,
    producedUnits: initialData?.producedUnits || 1000,
    sellingPrice: initialData?.sellingPrice || 0,
    salesVolume: initialData?.salesVolume || 500,
    fixedCosts: initialData?.fixedCosts || 0
  });

  const [result, setResult] = useState<FinancialResult>({
    hppPerUnit: 0,
    markupMargin: 0,
    grossRevenue: 0,
    grossProfit: 0,
    netProfit: 0,
    bepUnits: 0,
    bepCurrency: 0
  });

  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Re-calculate results when inputs change
  useEffect(() => {
    const res = calculateFinancials(data);
    setResult(res);
  }, [data]);

  // Handle local or live AI financial insights
  const handleAnalyzeFinancials = async () => {
    setIsLoading(true);
    try {
      if (apiKey) {
        const geminiInsights = await analyzeFinancialsWithGemini(profile, data, result, apiKey);
        setInsights(geminiInsights);
      } else {
        const localInsights = analyzeFinancialsLocal(data, result);
        setInsights(localInsights);
      }
    } catch (err: unknown) {
      console.error(err);
      const localInsights = analyzeFinancialsLocal(data, result);
      setInsights(localInsights);
    } finally {
      setIsLoading(false);
    }
  };

  // Run local insights initially
  useEffect(() => {
    const localInsights = analyzeFinancialsLocal(data, calculateFinancials(data));
    setInsights(localInsights);
  }, []);

  const handleProceed = () => {
    onSaveFinancials(data, result);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-[calc(100vh-68px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            Kalkulator Keuangan & HPP
          </h2>
          <p className="text-sm text-ink-muted mt-1 leading-relaxed max-w-xl">
            Hitung harga pokok penjualan (HPP) produk Anda, proyeksikan keuntungan kotor & bersih bulanan, serta tentukan titik impas kelayakan usaha (BEP).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 border border-border-custom text-ink hover:bg-surface-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Strategi TOWS</span>
          </button>
          <button
            onClick={handleProceed}
            className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-hover text-canvas font-medium rounded-md transition-colors cursor-pointer text-sm"
          >
            <span>Buat Peta Jalan Aksi</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        {/* Left: Input Form */}
        <div className="lg:col-span-6 bg-surface-1 border border-border-custom rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-ink flex items-center gap-2 mb-1">
              <Calculator size={18} className="text-primary" />
              1. Komponen Biaya Produksi (HPP)
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Tentukan biaya variabel yang dikeluarkan untuk memproduksi satu batch unit produk Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-ink uppercase">Biaya Bahan Baku (Rp)</label>
              <input
                type="number"
                value={data.rawMaterials || ""}
                onChange={(e) => setData({ ...data, rawMaterials: Math.max(0, parseFloat(e.target.value) || 0) })}
                placeholder="0"
                className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-ink uppercase">Tenaga Kerja Langsung (Rp)</label>
              <input
                type="number"
                value={data.labor || ""}
                onChange={(e) => setData({ ...data, labor: Math.max(0, parseFloat(e.target.value) || 0) })}
                placeholder="0"
                className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-ink uppercase">Biaya Overhead Pabrik (Rp)</label>
              <input
                type="number"
                value={data.overhead || ""}
                onChange={(e) => setData({ ...data, overhead: Math.max(0, parseFloat(e.target.value) || 0) })}
                placeholder="0"
                className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-ink uppercase">Volume Produksi (Unit)</label>
              <input
                type="number"
                value={data.producedUnits || ""}
                onChange={(e) => setData({ ...data, producedUnits: Math.max(1, parseInt(e.target.value) || 0) })}
                placeholder="1000"
                className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
              />
            </div>
          </div>

          <div className="border-t border-border-custom/50 pt-6">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2 mb-1">
              <TrendUp size={18} className="text-primary" />
              2. Harga Jual & Estimasi Penjualan
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Tentukan harga jual yang ditawarkan ke konsumen serta target volume penjualan bulanan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-ink uppercase">Harga Jual per Unit (Rp)</label>
              <input
                type="number"
                value={data.sellingPrice || ""}
                onChange={(e) => setData({ ...data, sellingPrice: Math.max(0, parseFloat(e.target.value) || 0) })}
                placeholder="0"
                className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-ink uppercase">Estimasi Penjualan per Bulan (Unit)</label>
              <input
                type="number"
                value={data.salesVolume || ""}
                onChange={(e) => setData({ ...data, salesVolume: Math.max(0, parseInt(e.target.value) || 0) })}
                placeholder="500"
                className="px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
              />
            </div>
          </div>

          <div className="border-t border-border-custom/50 pt-6">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2 mb-1">
              <ChartPieSlice size={18} className="text-primary" />
              3. Biaya Operasional Tetap (Fixed Cost)
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Biaya rutin yang wajib dibayar per bulan terlepas dari volume produksi (seperti sewa gedung, gaji pokok karyawan, promosi, dll).
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-ink uppercase">Biaya Tetap Bulanan (Rp)</label>
            <input
              type="number"
              value={data.fixedCosts || ""}
              onChange={(e) => setData({ ...data, fixedCosts: Math.max(0, parseFloat(e.target.value) || 0) })}
              placeholder="0"
              className="w-full px-3 py-2 bg-canvas border border-border-custom rounded-md text-xs focus:outline-none focus:border-primary placeholder-ink-muted/40"
            />
          </div>
        </div>

        {/* Right: Results & AI Insights */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="bg-canvas border border-border-custom rounded-lg p-6 space-y-6">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider pb-2 border-b border-border-custom/40">
              Hasil Analisis Proyeksi
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* HPP per unit */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-ink-muted uppercase">HPP per Unit</span>
                <p className="text-lg font-mono font-bold text-ink">
                  Rp {Math.round(result.hppPerUnit).toLocaleString("id-ID")}
                </p>
              </div>

              {/* Markup Margin */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-ink-muted uppercase">Margin Keuntungan Kotor</span>
                <p className="text-lg font-mono font-bold text-primary">
                  {result.markupMargin.toFixed(1)}%
                </p>
              </div>

              {/* Revenue */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-ink-muted uppercase">Pendapatan Kotor Bulanan</span>
                <p className="text-base font-mono font-semibold text-ink">
                  Rp {Math.round(result.grossRevenue).toLocaleString("id-ID")}
                </p>
              </div>

              {/* Laba Kotor */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-ink-muted uppercase">Laba Kotor Bulanan</span>
                <p className="text-base font-mono font-semibold text-ink">
                  Rp {Math.round(result.grossProfit).toLocaleString("id-ID")}
                </p>
              </div>

              {/* Laba Bersih */}
              <div className="col-span-2 space-y-1 p-3 bg-surface-1 rounded-md border border-border-custom/40">
                <span className="text-[10px] font-bold text-ink-muted uppercase">Proyeksi Laba Bersih Bulanan (Setelah Biaya Tetap)</span>
                <p className={`text-xl font-mono font-bold ${result.netProfit >= 0 ? "text-green-700" : "text-primary"}`}>
                  Rp {Math.round(result.netProfit).toLocaleString("id-ID")}
                </p>
              </div>

              {/* BEP */}
              <div className="col-span-2 space-y-2">
                <span className="text-[10px] font-bold text-ink-muted uppercase">Titik Impas (Break-Even Point)</span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-2.5 bg-surface-1 rounded border border-border-custom/30 text-center">
                    <span className="text-[9px] font-bold text-ink-muted uppercase block">BEP Unit</span>
                    <span className="text-sm font-mono font-bold text-ink">{result.bepUnits} Unit</span>
                  </div>
                  <div className="p-2.5 bg-surface-1 rounded border border-border-custom/30 text-center">
                    <span className="text-[9px] font-bold text-ink-muted uppercase block">BEP Rupiah</span>
                    <span className="text-sm font-mono font-bold text-ink">Rp {Math.round(result.bepCurrency).toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights panel */}
          <div className="bg-surface-1 border border-border-custom rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink flex items-center gap-1.5">
                <Sparkle size={14} className="text-primary" />
                Analisis Finansial AI
              </h4>
              <button
                type="button"
                onClick={handleAnalyzeFinancials}
                disabled={isLoading}
                className="px-3 py-1 bg-canvas border border-primary/20 text-primary hover:bg-primary/5 rounded text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Menganalisis..." : "Jalankan Analisis AI"}
              </button>
            </div>

            <div className="space-y-2 text-xs text-ink-muted">
              {insights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-canvas border border-border-custom/40 rounded-md p-3 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{insight}</span>
                </div>
              ))}
              {insights.length === 0 && (
                <p className="text-xs italic text-center py-4">Tekan &quot;Jalankan Analisis AI&quot; untuk mengulas kelayakan finansial Anda secara otomatis.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
