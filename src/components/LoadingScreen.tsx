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

type BadgeColor = "good" | "warning" | "critical";

export interface MetricData {
  icon: string;
  value: string;
  label: string;
  badge: string;
  badgeColor: BadgeColor;
  iconBg: string;
}

export interface AuditResult {
  score: number;
  scoreLabel: string;
  companyMetrics: MetricData[];
  profileMetrics: MetricData[];
  strength: string;
  potential: string;
  audienceAnalysis: AudienceResult | null;
  categoryScores: {
    companyPage: number;
    postingFrequency: number;
    contentQuality: number;
    engagementRate: number;
    personalProfile: number;
    personalActivity: number;
    employeeVisibility: number;
  };
}

interface LoadingScreenProps {
  formData: AuditFormData;
  onComplete: (result: AuditResult | null) => void;
}

const STEPS = [
  { label: "LinkedIn-Daten werden abgerufen", duration: 3000 },
  { label: "Unternehmensprofil analysiert", duration: 4000 },
  { label: "Persönliches Profil analysiert", duration: 4000 },
  { label: "Posts & Engagement ausgewertet", duration: 5000 },
  { label: "AI erstellt Ihre Analyse", duration: 6000 },
];

// Total animation time: 22s, but API may take longer — steps loop if needed
const TOTAL_STEP_TIME = STEPS.reduce((sum, s) => sum + s.duration, 0);

export default function LoadingScreen({
  formData,
  onComplete,
}: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [waitingForApi, setWaitingForApi] = useState(false);
  const apiResult = useRef<AuditResult | null>(null);
  const apiDone = useRef(false);

  // Fire API call on mount
  useEffect(() => {
    fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          apiResult.current = data;
        }
        apiDone.current = true;
      })
      .catch(() => {
        apiDone.current = true;
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Step animation
  useEffect(() => {
    if (currentStep < STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, STEPS[currentStep].duration);
      return () => clearTimeout(timer);
    } else if (apiDone.current) {
      // Steps done and API done — proceed
      const finish = setTimeout(() => onComplete(apiResult.current), 800);
      return () => clearTimeout(finish);
    } else {
      // Steps done but API still running — show waiting state
      setWaitingForApi(true);
      const poll = setInterval(() => {
        if (apiDone.current) {
          clearInterval(poll);
          onComplete(apiResult.current);
        }
      }, 500);
      return () => clearInterval(poll);
    }
  }, [currentStep, onComplete]);

  const progress = apiDone.current
    ? 100
    : Math.min((currentStep / STEPS.length) * 95, 95);
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
          {waitingForApi
            ? "Fast fertig — Ihre Daten werden noch verarbeitet..."
            : currentStep < STEPS.length
            ? "LinkedIn-Daten werden analysiert..."
            : "Fertig!"}
        </div>
      </div>
    </div>
  );
}
