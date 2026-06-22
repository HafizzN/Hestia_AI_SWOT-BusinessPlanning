"use client";

import React from "react";
import { Key, Sparkle, SuitcaseSimple } from "@phosphor-icons/react";

interface HeaderProps {
  currentStep: number;
  setStep: (step: number) => void;
  isApiKeyConfigured: boolean;
  onOpenApiModal: () => void;
  isProfileReady: boolean;
  isSwotReady: boolean;
  isTowsReady: boolean;
  isFinancialReady: boolean;
}

export function Header({
  currentStep,
  setStep,
  isApiKeyConfigured,
  onOpenApiModal,
  isProfileReady,
  isSwotReady,
  isTowsReady,
  isFinancialReady,
}: HeaderProps) {
  const steps = [
    { id: 1, label: "Profil Bisnis", enabled: true },
    { id: 2, label: "Matriks SWOT", enabled: isProfileReady },
    { id: 3, label: "Strategi TOWS", enabled: isSwotReady },
    { id: 4, label: "Keuangan & HPP", enabled: isTowsReady },
    { id: 5, label: "Peta Jalan Aksi", enabled: isFinancialReady },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-canvas/90 backdrop-blur-md border-b border-border-custom px-6 py-4 flex items-center justify-between print:hidden">
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-primary text-canvas rounded-md">
          <SuitcaseSimple size={18} weight="duotone" />
        </div>
        <span className="font-display font-semibold tracking-tight text-lg">Hestia</span>
        <span className="text-xs font-mono px-2 py-0.5 bg-surface-1 text-ink-muted border border-border-custom rounded-md">
          v1.1
        </span>
      </div>

      {/* Steps Navigation */}
      <nav className="hidden md:flex items-center gap-1.5">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => step.enabled && setStep(step.id)}
              disabled={!step.enabled}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none ${
                isActive
                  ? "bg-surface-2 text-ink"
                  : step.enabled
                  ? "text-ink-muted hover:text-ink hover:bg-surface-1 cursor-pointer"
                  : "text-ink-muted/30 cursor-not-allowed"
              }`}
            >
              <span className="mr-1.5 opacity-60 text-xs font-mono">{step.id}.</span>
              {step.label}
            </button>
          );
        })}
      </nav>

      {/* AI Status / Settings */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenApiModal}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors cursor-pointer focus:outline-none ${
            isApiKeyConfigured
              ? "bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
              : "bg-surface-1 border-border-custom text-ink-muted hover:text-ink hover:bg-surface-2"
          }`}
        >
          {isApiKeyConfigured ? (
            <>
              <Sparkle size={14} weight="fill" className="animate-pulse" />
              <span>Mode AI Aktif</span>
            </>
          ) : (
            <>
              <Key size={14} />
              <span>Mode Lokal</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
