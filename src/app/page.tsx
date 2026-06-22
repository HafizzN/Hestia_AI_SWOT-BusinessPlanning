"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { BusinessBrief } from "@/components/BusinessBrief";
import { SwotMatrix } from "@/components/SwotMatrix";
import { TowsAnalysis } from "@/components/TowsAnalysis";
import { FinancialCalculator } from "@/components/FinancialCalculator";
import { ActionPlan } from "@/components/ActionPlan";
import { BusinessProfile, SwotData, TowsData, RoadmapItem, FinancialData, FinancialResult } from "@/utils/aiEngine";

export default function Home() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [swot, setSwot] = useState<SwotData | null>(null);
  const [tows, setTows] = useState<TowsData | null>(null);
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [financialResult, setFinancialResult] = useState<FinancialResult | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapItem[] | null>(null);

  // API Key State
  const [apiKey, setApiKey] = useState("");
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Load API Key on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("hestia_gemini_key") || "";
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (typeof window !== "undefined") {
      localStorage.setItem("hestia_gemini_key", key);
    }
  };

  const handleSaveProfile = (newProfile: BusinessProfile, initialSwot: SwotData) => {
    setProfile(newProfile);
    setSwot(initialSwot);
    // Clear subsequent steps since profile has changed
    setTows(null);
    setFinancialData(null);
    setFinancialResult(null);
    setRoadmap(null);
    setStep(2);
  };

  const handleSaveSwot = (finalSwot: SwotData) => {
    setSwot(finalSwot);
    setStep(3);
  };

  const handleSaveTows = (finalTows: TowsData) => {
    setTows(finalTows);
    setStep(4);
  };

  const handleSaveFinancials = (finalFinancialData: FinancialData, finalFinancialResult: FinancialResult) => {
    setFinancialData(finalFinancialData);
    setFinancialResult(finalFinancialResult);
    setStep(5);
  };

  const handleSaveRoadmap = (finalRoadmap: RoadmapItem[]) => {
    setRoadmap(finalRoadmap);
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-ink">
      <Header
        currentStep={step}
        setStep={setStep}
        isApiKeyConfigured={!!apiKey}
        onOpenApiModal={() => setIsApiModalOpen(true)}
        isProfileReady={!!profile}
        isSwotReady={!!swot}
        isTowsReady={!!tows}
        isFinancialReady={!!financialData}
      />

      <main className="flex-grow">
        {step === 1 && (
          <BusinessBrief
            onSaveProfile={handleSaveProfile}
            savedProfile={profile}
            apiKey={apiKey}
          />
        )}

        {step === 2 && swot && (
          <SwotMatrix
            initialSwot={swot}
            onSaveSwot={handleSaveSwot}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && profile && swot && (
          <TowsAnalysis
            profile={profile}
            swot={swot}
            initialTows={tows}
            onSaveTows={handleSaveTows}
            onBack={() => setStep(2)}
            apiKey={apiKey}
          />
        )}

        {step === 4 && profile && swot && tows && (
          <FinancialCalculator
            profile={profile}
            initialData={financialData}
            onSaveFinancials={handleSaveFinancials}
            onBack={() => setStep(3)}
            apiKey={apiKey}
          />
        )}

        {step === 5 && profile && swot && tows && (
          <ActionPlan
            profile={profile}
            tows={tows}
            swot={swot}
            initialRoadmap={roadmap}
            onSaveRoadmap={handleSaveRoadmap}
            onBack={() => setStep(4)}
            apiKey={apiKey}
            financialData={financialData}
            financialResult={financialResult}
          />
        )}
      </main>

      <ApiKeyModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        onSave={handleSaveApiKey}
        currentKey={apiKey}
      />
    </div>
  );
}
