"use client";

import { useState, useCallback, useEffect } from "react";
import LandingPage from "@/components/LandingPage";
import LoadingScreen, { AudienceResult } from "@/components/LoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import { AuditFormData } from "@/components/AuditForm";
import Footer from "@/components/Footer";

type Screen = "landing" | "loading" | "result";

const STORAGE_KEY = "audit-state";

function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as {
      screen: Screen;
      formData: AuditFormData;
      audienceResult: AudienceResult | null;
    };
  } catch {
    return null;
  }
}

function saveState(
  screen: Screen,
  formData: AuditFormData | null,
  audienceResult: AudienceResult | null
) {
  if (!formData) return;
  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ screen, formData, audienceResult })
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [formData, setFormData] = useState<AuditFormData | null>(null);
  const [audienceResult, setAudienceResult] = useState<AudienceResult | null>(
    null
  );
  const [hydrated, setHydrated] = useState(false);

  // Restore state from sessionStorage on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setFormData(saved.formData);
      setAudienceResult(saved.audienceResult);
      // If they were on loading, go back to result if we have data, otherwise landing
      setScreen(
        saved.screen === "loading"
          ? saved.audienceResult
            ? "result"
            : "landing"
          : saved.screen
      );
    }
    setHydrated(true);
  }, []);

  // Persist state on changes
  useEffect(() => {
    if (hydrated) {
      saveState(screen, formData, audienceResult);
    }
  }, [screen, formData, audienceResult, hydrated]);

  const handleSubmit = (data: AuditFormData) => {
    setFormData(data);
    setScreen("loading");
    // TODO: Fire n8n webhook here
  };

  const handleLoadingComplete = useCallback(
    (result: AudienceResult | null) => {
      setAudienceResult(result);
      setScreen("result");
    },
    []
  );

  // Don't render until hydrated to avoid flash
  if (!hydrated) {
    return <main className="min-h-screen bg-dark-bg" />;
  }

  return (
    <main className="min-h-screen bg-dark-bg">
      {screen === "landing" && <LandingPage onSubmit={handleSubmit} />}
      {screen === "loading" && formData && (
        <LoadingScreen
          formData={formData}
          onComplete={handleLoadingComplete}
        />
      )}
      {screen === "result" && formData && (
        <ResultScreen
          companyName={formData.companyName}
          hasCompany={!!formData.companyUrl}
          hasProfile={!!formData.profileUrl}
          audienceResult={audienceResult}
        />
      )}
      <Footer />
    </main>
  );
}
