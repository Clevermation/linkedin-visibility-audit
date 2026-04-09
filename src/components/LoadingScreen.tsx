"use client";

import { useEffect, useState, useRef } from "react";
import { AuditFormData } from "./AuditForm";

export interface AudienceResult {
  estimatedSize: string;
  sizeContext: string;
  topJobTitles: { title: string; percentage: string }[];
  reachability: "hoch" | "mittel" | "niedrig";
  reachabilityReason: string;
  recommendation: string;
}

interface LoadingScreenProps {
  formData: AuditFormData;
  onComplete: (audienceResult: AudienceResult | null) => void;
}

const STEPS = [
  { label: "Unternehmensprofil gefunden", duration: 1200 },
  { label: "Persönliches Profil analysiert", duration: 1800 },
  { label: "Zielgruppe auf LinkedIn analysiert", duration: 2500 },
  { label: "Sichtbarkeits-Score berechnet", duration: 2000 },
  { label: "Handlungsempfehlungen abgeleitet", duration: 1500 },
];

export default function LoadingScreen({
  formData,
  onComplete,
}: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const apiResult = useRef<AudienceResult | null>(null);
  const apiDone = useRef(false);
  const stepsFinished = useRef(false);

  // Fire API call on mount
  useEffect(() => {
    if (!formData.targetAudience) {
      apiDone.current = true;
      return;
    }

    fetch("/api/audience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetAudience: formData.targetAudience,
        industry: formData.industry,
        companyName: formData.companyName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          apiResult.current = data;
        }
        apiDone.current = true;
        if (stepsFinished.current) {
          onComplete(apiResult.current);
        }
      })
      .catch(() => {
        apiDone.current = true;
        if (stepsFinished.current) {
          onComplete(null);
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Step animation
  useEffect(() => {
    if (currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, STEPS[currentStep].duration);
      return () => clearTimeout(timer);
    } else {
      stepsFinished.current = true;
      if (apiDone.current) {
        const finish = setTimeout(() => onComplete(apiResult.current), 800);
        return () => clearTimeout(finish);
      }
    }
  }, [currentStep, onComplete]);

  const progress = Math.min((currentStep / STEPS.length) * 100, 100);
  const initial = formData.companyName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6">
      {/* Company info */}
      <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl md:text-2xl font-extrabold text-white">
          {initial}
        </div>
        <div>
          <div className="text-lg md:text-xl font-bold text-white">
            {formData.companyName}
          </div>
          <div className="text-sm text-white/40">Analyse läuft...</div>
        </div>
      </div>

      {/* Steps */}
      <div className="w-full max-w-md space-y-1">
        {STEPS.map((step, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          const isPending = i > currentStep;

          return (
            <div
              key={step.label}
              className="flex items-center gap-4 py-4 border-b border-white/5"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  isDone
                    ? "bg-success/15 text-success"
                    : isActive
                    ? "bg-accent/15 text-accent animate-pulse-dot"
                    : "bg-white/5 text-white/20"
                }`}
              >
                {isDone ? "✓" : isActive ? "●" : "○"}
              </div>
              <span
                className={`text-[15px] font-medium ${
                  isPending ? "text-white/20" : "text-white"
                }`}
              >
                {step.label}
              </span>
              {isDone && (
                <span className="ml-auto text-xs text-white/20 font-[family-name:var(--font-ui)]">
                  {(STEPS[i].duration / 1000).toFixed(0)}s
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mt-8">
        <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-cta rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center text-sm text-white/30 mt-3">
          {currentStep < STEPS.length
            ? `Noch ca. ${Math.max(5, 25 - currentStep * 5)} Sekunden...`
            : apiDone.current
            ? "Fertig!"
            : "AI analysiert Ihre Zielgruppe..."}
        </div>
      </div>
    </div>
  );
}
