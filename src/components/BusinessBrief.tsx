"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkle, Suitcase, Users, Target } from "@phosphor-icons/react";
import { BusinessProfile, SwotData, generateLocalSwotSuggestions, generateSwotWithGemini } from "../utils/aiEngine";

interface BusinessBriefProps {
  onSaveProfile: (profile: BusinessProfile, initialSwot: SwotData) => void;
  savedProfile: BusinessProfile | null;
  apiKey: string;
}

const INDUSTRIES = [
  { id: "tech", label: "Teknologi / SaaS" },
  { id: "retail", label: "Ritel / E-Commerce" },
  { id: "food", label: "Kuliner / F&B" },
  { id: "services", label: "Jasa Profesional" },
  { id: "health", label: "Kesehatan / Fitness" },
  { id: "creator", label: "Kreator Konten" },
  { id: "general", label: "Bisnis Umum" }
];

export function BusinessBrief({ onSaveProfile, savedProfile, apiKey }: BusinessBriefProps) {
  const [profile, setProfile] = useState<BusinessProfile>({
    name: savedProfile?.name || "",
    description: savedProfile?.description || "",
    industry: savedProfile?.industry || "tech",
    targetAudience: savedProfile?.targetAudience || "",
    valueProposition: savedProfile?.valueProposition || "",
    scale: savedProfile?.scale || "local"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!profile.name.trim()) newErrors.name = "Nama bisnis wajib diisi";
    if (!profile.description.trim()) newErrors.description = "Deskripsi bisnis wajib diisi";
    if (profile.description.trim().length < 15) newErrors.description = "Tuliskan deskripsi minimal 15 karakter";
    if (!profile.targetAudience.trim()) newErrors.targetAudience = "Target audiens wajib diisi";
    if (!profile.valueProposition.trim()) newErrors.valueProposition = "Proposisi nilai wajib diisi";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      let swotData: SwotData;
      if (apiKey) {
        swotData = await generateSwotWithGemini(profile, apiKey);
      } else {
        swotData = generateLocalSwotSuggestions(profile);
      }
      onSaveProfile(profile, swotData);
    } catch (err: unknown) {
      console.error(err);
      const fallbackSwot = generateLocalSwotSuggestions(profile);
      onSaveProfile(profile, fallbackSwot);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-68px)]">
      {/* Left Column: Form */}
      <div className="lg:col-span-7 px-6 py-12 md:px-12 xl:px-16 flex flex-col justify-center bg-canvas">
        <div className="max-w-xl w-full mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-ink">
              Rancang Profil Bisnis Anda
            </h1>
            <p className="text-ink-muted text-base mt-2">
              Berikan informasi dasar mengenai ide bisnis Anda untuk memicu pemetaan matriks analisis SWOT otomatis bertenaga AI.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="business-name" className="text-xs font-semibold uppercase tracking-wider text-ink flex items-center gap-1.5">
                <Suitcase size={14} className="text-primary" />
                Nama Bisnis / Brand
              </label>
              <input
                id="business-name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="misal: Aurora Coffee Roasters"
                className="w-full px-4 py-2.5 bg-surface-1 border border-border-custom rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-ink-muted/40"
              />
              {errors.name && <span className="text-xs text-primary font-medium mt-1">{errors.name}</span>}
            </div>

            {/* Industry Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-ink">
                Kategori Industri
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => setProfile({ ...profile, industry: ind.id })}
                    className={`px-3 py-2 border rounded-md text-xs font-medium text-center transition-colors cursor-pointer focus:outline-none ${
                      profile.industry === ind.id
                        ? "bg-primary text-canvas border-primary"
                        : "bg-surface-1 border-border-custom text-ink hover:bg-surface-2"
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="business-desc" className="text-xs font-semibold uppercase tracking-wider text-ink">
                Deskripsi Ide Bisnis
              </label>
              <textarea
                id="business-desc"
                rows={3}
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                placeholder="Jelaskan mengenai produk atau layanan yang ditawarkan, model operasional, dan keunikan ide bisnis..."
                className="w-full px-4 py-2.5 bg-surface-1 border border-border-custom rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-ink-muted/40 resize-y"
              />
              {errors.description && <span className="text-xs text-primary font-medium mt-1">{errors.description}</span>}
            </div>

            {/* Target Audience */}
            <div className="flex flex-col gap-2">
              <label htmlFor="target-audience" className="text-xs font-semibold uppercase tracking-wider text-ink flex items-center gap-1.5">
                <Users size={14} className="text-primary" />
                Target Audiens / Pelanggan
              </label>
              <input
                id="target-audience"
                type="text"
                value={profile.targetAudience}
                onChange={(e) => setProfile({ ...profile, targetAudience: e.target.value })}
                placeholder="misal: Pecinta kopi perkotaan usia 25-45 tahun yang menghargai keberlanjutan"
                className="w-full px-4 py-2.5 bg-surface-1 border border-border-custom rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-ink-muted/40"
              />
              {errors.targetAudience && <span className="text-xs text-primary font-medium mt-1">{errors.targetAudience}</span>}
            </div>

            {/* Value Proposition */}
            <div className="flex flex-col gap-2">
              <label htmlFor="value-prop" className="text-xs font-semibold uppercase tracking-wider text-ink flex items-center gap-1.5">
                <Target size={14} className="text-primary" />
                Proposisi Nilai Utama (Value Proposition)
              </label>
              <textarea
                id="value-prop"
                rows={2}
                value={profile.valueProposition}
                onChange={(e) => setProfile({ ...profile, valueProposition: e.target.value })}
                placeholder="Alasan mengapa pelanggan bersedia membayar produk Anda dibandingkan membeli di kompetitor..."
                className="w-full px-4 py-2.5 bg-surface-1 border border-border-custom rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-ink-muted/40 resize-y"
              />
              {errors.valueProposition && <span className="text-xs text-primary font-medium mt-1">{errors.valueProposition}</span>}
            </div>

            {/* Business Scale */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-ink">
                Skala Target Operasional
              </label>
              <div className="flex gap-2">
                {[
                  { id: "local", label: "Lokal" },
                  { id: "national", label: "Nasional" },
                  { id: "global", label: "Global" }
                ].map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setProfile({ ...profile, scale: sc.id })}
                    className={`flex-1 px-4 py-2 border rounded-md text-xs font-medium text-center transition-colors cursor-pointer focus:outline-none ${
                      profile.scale === sc.id
                        ? "bg-primary text-canvas border-primary"
                        : "bg-surface-1 border-border-custom text-ink hover:bg-surface-2"
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-canvas font-medium rounded-md transition-all active:scale-[0.98] active:-translate-y-[1px] cursor-pointer text-sm focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Sparkle size={16} className="animate-spin text-canvas" />
                  <span>Menganalisis SWOT via AI...</span>
                </>
              ) : (
                <>
                  <span>Lanjutkan ke Matriks SWOT</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Educational Material */}
      <div className="lg:col-span-5 bg-surface-1 border-l border-border-custom px-6 py-12 md:px-12 xl:px-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
              Kerangka Kerja
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink mt-2">
              Perencanaan TOWS & SWOT Integratif
            </h2>
            <p className="text-sm text-ink-muted mt-2 leading-relaxed">
              Matriks SWOT standar hanya mengelompokkan faktor internal dan eksternal bisnis Anda, namun seringkali berhenti di situ. 
              Hestia menyilangkan faktor-faktor SWOT tersebut secara langsung untuk merumuskan pilihan strategi aksi (TOWS) yang siap dijalankan.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-custom flex items-center justify-center text-xs font-mono font-bold text-primary flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Profil Ide Bisnis</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Lengkapi spesifikasi pasar, audiens, dan proposisi nilai Anda. Ini digunakan untuk melatih kontekstual mesin AI.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-custom flex items-center justify-center text-xs font-mono font-bold text-primary flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Pemetaan Matriks SWOT</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Ulas hasil SWOT otomatis dari AI. Tambahkan poin-poin internal maupun risiko eksternal secara dinamis.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-custom flex items-center justify-center text-xs font-mono font-bold text-primary flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Formulasi Strategi TOWS</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Rancang aksi strategis gabungan: menggunakan kekuatan untuk merebut peluang (SO), atau mengantisipasi ancaman luar (ST).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-custom flex items-center justify-center text-xs font-mono font-bold text-primary flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Kalkulasi Keuangan & HPP</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Hitung Harga Pokok Penjualan (HPP) per unit produk, tentukan harga jual, serta simulasikan kelayakan BEP usaha bulanan.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-custom flex items-center justify-center text-xs font-mono font-bold text-primary flex-shrink-0">
                5
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">Peta Jalan (Roadmap) Aksi</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Distribusi langkah-langkah strategi ke dalam target bulanan terukur lengkap dengan metrik KPI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
