"use client";

import { useState, useCallback } from "react";
import LandingPage from "@/components/LandingPage";
import LoadingScreen from "@/components/LoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import { AuditFormData } from "@/components/AuditForm";
import Footer from "@/components/Footer";

type Screen = "landing" | "loading" | "result";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [formData, setFormData] = useState<AuditFormData | null>(null);

  const handleSubmit = (data: AuditFormData) => {
    setFormData(data);
    setScreen("loading");
    // TODO: Fire n8n webhook here
  };

  const handleLoadingComplete = useCallback(() => {
    setScreen("result");
  }, []);

  return (
    <main className="min-h-screen bg-dark-bg">
      {screen === "landing" && <LandingPage onSubmit={handleSubmit} />}
      {screen === "loading" && formData && (
        <LoadingScreen
          companyName={formData.companyName}
          onComplete={handleLoadingComplete}
        />
      )}
      {screen === "result" && formData && (
        <ResultScreen companyName={formData.companyName} />
      )}
      <Footer />
    </main>
  );
}
