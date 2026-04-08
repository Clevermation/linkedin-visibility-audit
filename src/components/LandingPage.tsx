"use client";

import AuditForm, { AuditFormData } from "./AuditForm";
import Navbar from "./Navbar";

interface LandingPageProps {
  onSubmit: (data: AuditFormData) => void;
}

export default function LandingPage({ onSubmit }: LandingPageProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(148,88,245,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(242,140,130,0.08)_0%,transparent_70%)] pointer-events-none" />

      <Navbar />

      {/* Hero */}
      <div className="max-w-2xl mx-auto text-center pt-16 md:pt-24 px-6 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-5 py-2 text-sm font-semibold text-accent mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
          Kostenloser AI-Audit
        </div>

        <h1 className="text-4xl md:text-[52px] font-extrabold leading-[1.1] tracking-tight mb-6">
          Wie sichtbar ist Ihr
          <br />
          Unternehmen auf{" "}
          <span className="gradient-text">LinkedIn?</span>
        </h1>

        <p className="text-lg leading-relaxed text-gray max-w-xl mx-auto mb-12">
          Finden Sie in 60 Sekunden heraus, wie Sie im Vergleich zu Ihrer Branche
          abschneiden — und was Sie morgen konkret verbessern können.
        </p>

        {/* Form Card */}
        <div className="bg-card-dark border border-accent/20 rounded-2xl p-8 md:p-10 max-w-lg mx-auto text-left">
          <AuditForm onSubmit={onSubmit} />
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap justify-center gap-12 mt-16 pb-20 border-t border-white/5 pt-8">
          <div className="text-center">
            <div className="text-3xl font-extrabold gradient-text">847</div>
            <div className="text-sm text-white/40 mt-1">
              Audits durchgeführt
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold gradient-text">34</div>
            <div className="text-sm text-white/40 mt-1">
              Punkte Ø Score
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold gradient-text">92%</div>
            <div className="text-sm text-white/40 mt-1">
              nutzen &lt;5% ihres Potenzials
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
