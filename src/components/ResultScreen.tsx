"use client";

import { AuditResult, AudienceResult, MetricData, Recommendation } from "./LoadingScreen";

type BadgeColor = "good" | "warning" | "critical";

// Dummy data, used as fallback when API fails
const DUMMY_COMPANY_METRICS: MetricData[] = [
  { icon: "👥", value: "-", label: "Follower", badge: "Keine Daten", badgeColor: "warning", iconBg: "bg-accent/15" },
  { icon: "📝", value: "-", label: "Posts / Monat", badge: "Keine Daten", badgeColor: "warning", iconBg: "bg-cta/15" },
  { icon: "📊", value: "-", label: "Engagement-Rate", badge: "Keine Daten", badgeColor: "warning", iconBg: "bg-warning/15" },
  { icon: "🚀", value: "-", label: "Reichweiten-Potenzial", badge: "Keine Daten", badgeColor: "warning", iconBg: "bg-success/15" },
];

const DUMMY_PROFILE_METRICS: MetricData[] = [
  { icon: "👤", value: "-", label: "Profil-Optimierung", badge: "Keine Daten", badgeColor: "warning", iconBg: "bg-accent/15" },
  { icon: "✍️", value: "-", label: "Posts / Monat", badge: "Keine Daten", badgeColor: "warning", iconBg: "bg-cta/15" },
  { icon: "🤝", value: "-", label: "Kontakte", badge: "Keine Daten", badgeColor: "warning", iconBg: "bg-warning/15" },
  { icon: "💬", value: "-", label: "Engagement-Rate", badge: "Keine Daten", badgeColor: "warning", iconBg: "bg-success/15" },
];

const BADGE_STYLES: Record<BadgeColor, string> = {
  good: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  critical: "bg-danger/15 text-danger",
};

const REACHABILITY_STYLES = {
  hoch: { label: "Hoch", style: "bg-success/15 text-success" },
  mittel: { label: "Mittel", style: "bg-warning/15 text-warning" },
  niedrig: { label: "Niedrig", style: "bg-danger/15 text-danger" },
};

function MetricCard({ metric }: { metric: MetricData }) {
  return (
    <div className="bg-card-dark border border-accent/10 rounded-xl p-5 md:p-7 text-center">
      <div
        className={`w-9 h-9 md:w-10 md:h-10 rounded-lg ${metric.iconBg} flex items-center justify-center mx-auto mb-3 md:mb-4 text-base md:text-lg`}
      >
        {metric.icon}
      </div>
      <div className="text-xl md:text-2xl font-extrabold text-white mb-1">
        {metric.value}
      </div>
      <div className="text-xs text-white/40 mb-3">{metric.label}</div>
      <span
        className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full font-[family-name:var(--font-ui)] ${
          BADGE_STYLES[metric.badgeColor]
        }`}
      >
        {metric.badge}
      </span>
    </div>
  );
}

function MetricSection({
  title,
  icon,
  metrics,
}: {
  title: string;
  icon: string;
  metrics: MetricData[];
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2.5 mb-4 max-w-3xl mx-auto">
        <span className="text-xl">{icon}</span>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 max-w-2xl mx-auto">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </div>
  );
}

function AudienceSection({ data }: { data: AudienceResult }) {
  return (
    <div className="max-w-3xl mx-auto mb-8 md:mb-12 animate-fade-in-up delay-500 opacity-0">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-xl">🌐</span>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
          Ihre Zielgruppe auf LinkedIn
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-3 md:gap-4 mb-4">
        <div className="bg-card-dark border border-accent/10 rounded-xl p-6 text-center">
          <div className="text-3xl font-extrabold gradient-text mb-2">
            {data.estimatedSize}
          </div>
          <div className="text-xs text-white/40 mb-3">Profile auf LinkedIn</div>
          <p className="text-xs text-gray">{data.sizeContext}</p>
        </div>

        <div className="bg-card-dark border border-accent/10 rounded-xl p-6">
          <div className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-wider">
            Top Job-Titles
          </div>
          <div className="space-y-2.5">
            {data.topJobTitles.map((job) => (
              <div key={job.title} className="flex items-center justify-between">
                <span className="text-sm text-white truncate mr-2">{job.title}</span>
                <span className="text-xs text-accent font-semibold flex-shrink-0">
                  {job.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card-dark border border-accent/10 rounded-xl p-6">
          <div className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-wider">
            Erreichbarkeit
          </div>
          <span
            className={`inline-block text-sm font-semibold px-3 py-1 rounded-full mb-3 ${
              REACHABILITY_STYLES[data.reachability].style
            }`}
          >
            {REACHABILITY_STYLES[data.reachability].label}
          </span>
          <p className="text-xs text-gray mb-4">{data.reachabilityReason}</p>
          <div className="border-t border-white/5 pt-4">
            <div className="text-xs font-semibold text-white/40 mb-1 uppercase tracking-wider">
              Tipp
            </div>
            <p className="text-xs text-gray">{data.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResultScreenProps {
  companyName: string;
  hasCompany: boolean;
  hasProfile: boolean;
  auditResult: AuditResult | null;
}

export default function ResultScreen({
  companyName,
  hasCompany,
  hasProfile,
  auditResult,
}: ResultScreenProps) {
  const score = auditResult?.score ?? 0;
  const scoreLabel = auditResult?.scoreLabel ?? "Keine Daten";
  const strength = auditResult?.strength ?? "Die Analyse konnte nicht durchgeführt werden. Bitte versuchen Sie es erneut.";
  const potential = auditResult?.potential ?? "Bitte versuchen Sie es erneut oder kontaktieren Sie uns für eine manuelle Analyse.";
  const companyMetrics = auditResult?.companyMetrics ?? DUMMY_COMPANY_METRICS;
  const profileMetrics = auditResult?.profileMetrics ?? DUMMY_PROFILE_METRICS;
  const recommendations = auditResult?.recommendations ?? [];
  const audienceData = auditResult?.audienceAnalysis ?? null;

  const scoreAngle = (score / 100) * 360;

  return (
    <div className="min-h-screen px-4 md:px-6 py-8 md:py-16">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-sm font-semibold text-gray mb-2 font-[family-name:var(--font-ui)] uppercase tracking-wider">
          LinkedIn Visibility Audit
        </h2>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
          {companyName}
        </h1>
      </div>

      {/* Score Ring */}
      <div className="flex flex-col items-center mb-12 animate-fade-in-up delay-200 opacity-0">
        <div
          className="score-ring w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center"
          style={
            { "--score-angle": `${scoreAngle}deg` } as React.CSSProperties
          }
        >
          <div className="w-[116px] h-[116px] sm:w-[130px] sm:h-[130px] md:w-[156px] md:h-[156px] rounded-full bg-dark-bg flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text leading-none">
              {score}
            </span>
            <span className="text-lg text-white/30 mt-0.5">/100</span>
          </div>
        </div>
        <div className="mt-5 inline-flex items-center gap-2 bg-cta/12 text-cta rounded-full px-5 py-2 text-sm font-semibold">
          {score >= 70 ? "🏆" : score >= 40 ? "📈" : "⚠️"} {scoreLabel}
          {score < 70 && ". Großes ungenutztes Potenzial"}
        </div>
      </div>

      {/* Metric Cards, split by type */}
      <div className="animate-fade-in-up delay-400 opacity-0">
        {hasCompany && hasProfile ? (
          <>
            <MetricSection title="Company Page" icon="🏢" metrics={companyMetrics} />
            <MetricSection title="Persönliches Profil" icon="👤" metrics={profileMetrics} />
          </>
        ) : hasCompany ? (
          <MetricSection title="Company Page" icon="🏢" metrics={companyMetrics} />
        ) : (
          <MetricSection title="Persönliches Profil" icon="👤" metrics={profileMetrics} />
        )}
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto mb-8 md:mb-12 animate-fade-in-up delay-500 opacity-0">
        <div className="bg-card-dark border border-accent/10 rounded-xl p-5 md:p-7">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xl">✅</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Ihre Stärke
            </span>
          </div>
          <p
            className="text-[15px] leading-relaxed text-gray [&>strong]:text-white [&>strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: strength }}
          />
        </div>
        <div className="bg-card-dark border border-accent/10 rounded-xl p-5 md:p-7">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xl">⚡</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Größtes Potenzial
            </span>
          </div>
          <p
            className="text-[15px] leading-relaxed text-gray [&>strong]:text-white [&>strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: potential }}
          />
        </div>
      </div>

      {/* Audience Analysis (before Recommendations) */}
      {audienceData && <AudienceSection data={audienceData} />}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="max-w-3xl mx-auto mb-8 md:mb-12 animate-fade-in-up delay-500 opacity-0">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-xl">🎯</span>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Handlungsempfehlungen nach Priorität
            </h3>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, i) => {
              const priorityStyles = {
                hoch: { bg: "border-danger/30 bg-danger/5", badge: "bg-danger/15 text-danger", label: "Dringend" },
                mittel: { bg: "border-warning/30 bg-warning/5", badge: "bg-warning/15 text-warning", label: "Wichtig" },
                niedrig: { bg: "border-accent/20 bg-accent/5", badge: "bg-accent/15 text-accent", label: "Nice-to-have" },
              };
              const style = priorityStyles[rec.priority] || priorityStyles.mittel;
              return (
                <div
                  key={i}
                  className={`border rounded-xl p-5 md:p-6 ${style.bg}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg font-bold text-white/30 mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-[15px] font-bold text-white">
                          {rec.title}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${style.badge}`}
                        >
                          {style.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray leading-relaxed mb-3">
                        {rec.description}
                      </p>
                      <p className="text-xs text-accent font-medium">
                        Impact: {rec.impact}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Report Teaser */}
      <div className="bg-gradient-to-br from-primary to-accent/40 rounded-2xl p-5 md:p-8 lg:p-10 max-w-3xl mx-auto mb-8 text-center animate-fade-in-up delay-600 opacity-0">
        <div className="text-2xl md:text-3xl mb-3 md:mb-4">📧</div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">
          Ihr ausführlicher Report ist unterwegs
        </h3>
        <p className="text-sm md:text-[15px] text-gray mb-4 md:mb-6">
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
          Sie wollen das Problem direkt lösen, nicht nur kennen?
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-transparent text-white border border-accent/40 hover:border-accent hover:bg-accent/8 rounded-lg px-5 md:px-8 py-3 md:py-3.5 font-semibold text-sm md:text-[15px] transition-all min-h-[44px]"
        >
          Kostenloses Strategiegespräch buchen &rarr;
        </a>
      </div>
    </div>
  );
}
