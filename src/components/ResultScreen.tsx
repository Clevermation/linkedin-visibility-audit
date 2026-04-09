"use client";

import { AudienceResult } from "./LoadingScreen";

// Dummy data — will be replaced by API response later
const DUMMY_RESULT = {
  score: 34,
  scoreLabel: "Starter",
  metrics: [
    {
      icon: "👥",
      value: "1.247",
      label: "Follower",
      badge: "Ausbaufähig",
      badgeColor: "warning" as const,
      iconBg: "bg-accent/15",
    },
    {
      icon: "📝",
      value: "2x",
      label: "Posts / Monat",
      badge: "Kritisch",
      badgeColor: "critical" as const,
      iconBg: "bg-cta/15",
    },
    {
      icon: "👤",
      value: "45%",
      label: "Profil-Optimierung",
      badge: "Ausbaufähig",
      badgeColor: "warning" as const,
      iconBg: "bg-success/15",
    },
    {
      icon: "🚀",
      value: "85k",
      label: "Reichweiten-Potenzial",
      badge: "Stark",
      badgeColor: "good" as const,
      iconBg: "bg-warning/15",
    },
  ],
  strength:
    'Eure Company Page hat eine <strong>klare Positionierung</strong> und professionelle Beschreibung. Das ist eine solide Basis, auf der ihr aufbauen könnt.',
  potential:
    'Mit <strong>120 Mitarbeitern</strong> könntet ihr <strong>85.000+ Impressionen/Monat</strong> erreichen — aktuell nutzt ihr weniger als 4% davon.',
};

const BADGE_STYLES = {
  good: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  critical: "bg-danger/15 text-danger",
};

const REACHABILITY_STYLES = {
  hoch: { label: "Hoch", style: "bg-success/15 text-success" },
  mittel: { label: "Mittel", style: "bg-warning/15 text-warning" },
  niedrig: { label: "Niedrig", style: "bg-danger/15 text-danger" },
};

interface ResultScreenProps {
  companyName: string;
  audienceResult: AudienceResult | null;
}

export default function ResultScreen({ companyName, audienceResult }: ResultScreenProps) {
  const result = DUMMY_RESULT;
  const scoreAngle = (result.score / 100) * 360;

  return (
    <div className="min-h-screen px-6 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-sm font-semibold text-gray mb-2 font-[family-name:var(--font-ui)] uppercase tracking-wider">
          LinkedIn Visibility Audit
        </h2>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          {companyName}
        </h1>
      </div>

      {/* Score Ring */}
      <div className="flex flex-col items-center mb-12 animate-fade-in-up delay-200 opacity-0">
        <div
          className="score-ring w-48 h-48 rounded-full flex items-center justify-center"
          style={
            { "--score-angle": `${scoreAngle}deg` } as React.CSSProperties
          }
        >
          <div className="w-[156px] h-[156px] rounded-full bg-dark-bg flex flex-col items-center justify-center">
            <span className="text-6xl font-extrabold gradient-text leading-none">
              {result.score}
            </span>
            <span className="text-lg text-white/30 mt-0.5">/100</span>
          </div>
        </div>
        <div className="mt-5 inline-flex items-center gap-2 bg-cta/12 text-cta rounded-full px-5 py-2 text-sm font-semibold">
          ⚠️ {result.scoreLabel} — Großes ungenutztes Potenzial
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto mb-12 animate-fade-in-up delay-400 opacity-0">
        {result.metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-card-dark border border-accent/10 rounded-xl p-5 text-center"
          >
            <div
              className={`w-10 h-10 rounded-lg ${metric.iconBg} flex items-center justify-center mx-auto mb-3 text-lg`}
            >
              {metric.icon}
            </div>
            <div className="text-2xl font-extrabold text-white mb-1">
              {metric.value}
            </div>
            <div className="text-xs text-white/40 mb-2">{metric.label}</div>
            <span
              className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full font-[family-name:var(--font-ui)] ${
                BADGE_STYLES[metric.badgeColor]
              }`}
            >
              {metric.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12 animate-fade-in-up delay-500 opacity-0">
        <div className="bg-card-dark border border-accent/10 rounded-xl p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xl">✅</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Eure Stärke
            </span>
          </div>
          <p
            className="text-[15px] leading-relaxed text-gray [&>strong]:text-white [&>strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: result.strength }}
          />
        </div>
        <div className="bg-card-dark border border-accent/10 rounded-xl p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xl">⚡</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Größtes Potenzial
            </span>
          </div>
          <p
            className="text-[15px] leading-relaxed text-gray [&>strong]:text-white [&>strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: result.potential }}
          />
        </div>
      </div>

      {/* Audience Analysis */}
      {audienceResult && (
        <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up delay-500 opacity-0">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-xl">🎯</span>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Ihre Zielgruppe auf LinkedIn
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {/* Estimated Size */}
            <div className="bg-card-dark border border-accent/10 rounded-xl p-5 text-center">
              <div className="text-3xl font-extrabold gradient-text mb-1">
                {audienceResult.estimatedSize}
              </div>
              <div className="text-xs text-white/40 mb-2">Profile auf LinkedIn</div>
              <p className="text-xs text-gray">{audienceResult.sizeContext}</p>
            </div>

            {/* Top Job Titles */}
            <div className="bg-card-dark border border-accent/10 rounded-xl p-5">
              <div className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-wider">
                Top Job-Titles
              </div>
              <div className="space-y-2">
                {audienceResult.topJobTitles.map((job) => (
                  <div key={job.title} className="flex items-center justify-between">
                    <span className="text-sm text-white truncate mr-2">{job.title}</span>
                    <span className="text-xs text-accent font-semibold flex-shrink-0">
                      {job.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reachability + Recommendation */}
            <div className="bg-card-dark border border-accent/10 rounded-xl p-5">
              <div className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-wider">
                Erreichbarkeit
              </div>
              <span
                className={`inline-block text-sm font-semibold px-3 py-1 rounded-full mb-3 ${
                  REACHABILITY_STYLES[audienceResult.reachability].style
                }`}
              >
                {REACHABILITY_STYLES[audienceResult.reachability].label}
              </span>
              <p className="text-xs text-gray mb-3">
                {audienceResult.reachabilityReason}
              </p>
              <div className="border-t border-white/5 pt-3">
                <div className="text-xs font-semibold text-white/40 mb-1 uppercase tracking-wider">
                  Tipp
                </div>
                <p className="text-xs text-gray">{audienceResult.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Teaser */}
      <div className="bg-gradient-to-br from-primary to-accent/40 rounded-2xl p-8 md:p-10 max-w-3xl mx-auto mb-8 text-center animate-fade-in-up delay-600 opacity-0">
        <div className="text-3xl mb-4">📧</div>
        <h3 className="text-xl font-bold text-white mb-2">
          Ihr ausführlicher Report ist unterwegs
        </h3>
        <p className="text-[15px] text-gray mb-6">
          In wenigen Minuten erhalten Sie eine detaillierte Analyse mit konkreten
          Handlungsempfehlungen per Mail.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-7">
          {[
            "Top-Post Analyse",
            "Themen-Gaps",
            "Mitarbeiter-Potenzial",
            "5 Quick Wins",
          ].map((feature) => (
            <span
              key={feature}
              className="flex items-center gap-1.5 text-sm text-gray"
            >
              <span className="text-success">✓</span>
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Calendly CTA */}
      <div className="max-w-3xl mx-auto text-center py-6 animate-fade-in-up delay-700 opacity-0">
        <p className="text-[15px] text-white/40 mb-4">
          Sie wollen das Problem direkt lösen — nicht nur kennen?
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-transparent text-white border border-accent/40 hover:border-accent hover:bg-accent/8 rounded-lg px-8 py-3.5 font-semibold text-[15px] transition-all"
        >
          Kostenloses Strategiegespräch buchen &rarr;
        </a>
      </div>
    </div>
  );
}
