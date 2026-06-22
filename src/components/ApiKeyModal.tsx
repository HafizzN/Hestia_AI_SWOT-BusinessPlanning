"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Key, ShieldCheck } from "@phosphor-icons/react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
}

export function ApiKeyModal({ isOpen, onClose, onSave, currentKey }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    setApiKey(currentKey);
  }, [currentKey]);

  const handleSave = () => {
    onSave(apiKey.trim());
    onClose();
  };

  const handleClear = () => {
    setApiKey("");
    onSave("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1A18]/20 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md bg-canvas border border-border-custom rounded-lg p-6 shadow-elevated text-ink"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-ink-muted hover:text-ink rounded-full transition-colors focus-visible:outline-none"
              aria-label="Tutup Konfigurasi API Key"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-surface-1 rounded-md text-primary">
                <Key size={20} weight="duotone" />
              </div>
              <div>
                <h3 className="text-lg font-medium leading-none">Kunci API Gemini</h3>
                <p className="text-xs text-ink-muted mt-1">Aktifkan analisis kecerdasan buatan penuh</p>
              </div>
            </div>

            <p className="text-sm text-ink-muted leading-relaxed mb-4">
              Secara bawaan Hestia berjalan menggunakan mesin heuristik lokal.
              Untuk mengaktifkan rekomendasi dinamis mendalam yang didukung oleh Google Gemini, masukkan Kunci API Gemini Anda di bawah ini.
              Kunci API disimpan secara lokal di dalam browser Anda.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="api-key-input" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-ink">
                  Kunci API (API Key)
                </label>
                <input
                  id="api-key-input"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 bg-surface-1 border border-border-custom rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-ink-muted/50"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-surface-1 rounded-md border border-border-custom/50 text-xs text-ink-muted">
                <ShieldCheck size={18} className="text-primary flex-shrink-0" />
                <span>Kunci API Anda tidak pernah dikirim ke server kami; semua panggilan API terjadi langsung dari peramban Anda.</span>
              </div>

              <div className="flex gap-3 pt-2">
                {currentKey && (
                  <button
                    onClick={handleClear}
                    className="flex-1 px-4 py-2 border border-border-custom text-ink hover:bg-surface-1 rounded-md text-sm font-medium transition-colors cursor-pointer"
                  >
                    Hapus Kunci
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-canvas rounded-md text-sm font-medium transition-colors cursor-pointer text-center"
                >
                  Simpan Konfigurasi
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
