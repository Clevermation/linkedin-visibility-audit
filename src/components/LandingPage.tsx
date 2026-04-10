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
      <div className="absolute -top-48 -right-48 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(148,88,245,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-[radial-gradient(circle,rgba(242,140,130,0.08)_0%,transparent_70%)] pointer-events-none" />

      <Navbar />

      {/* Hero */}
      <div className="max-w-2xl mx-auto text-center pt-12 md:pt-24 px-4 md:px-6 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-5 py-2 text-sm font-semibold text-accent mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
          Kostenloser AI-Audit
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-[52px] font-extrabold leading-[1.1] tracking-tight mb-6">
          Wie sichtbar ist Ihr
          <br />
          Unternehmen auf{" "}
          <span className="gradient-text">LinkedIn?</span>
        </h1>

        <p className="text-base md:text-lg leading-relaxed text-gray max-w-xl mx-auto mb-8 md:mb-12">
          Finden Sie in 60 Sekunden heraus, wie Sie im Vergleich zu Ihrer Branche
          abschneiden, und was Sie morgen konkret verbessern können.
        </p>

        {/* Form Card */}
        <div className="bg-card-dark border border-accent/20 rounded-2xl p-5 md:p-8 lg:p-10 max-w-lg mx-auto text-left">
          <AuditForm onSubmit={onSubmit} />
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-10 md:mt-16 pb-12 md:pb-20 border-t border-white/5 pt-6 md:pt-8">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-extrabold gradient-text">847</div>
            <div className="text-xs md:text-sm text-white/40 mt-1">
              Audits durchgeführt
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-extrabold gradient-text">34</div>
            <div className="text-xs md:text-sm text-white/40 mt-1">
              Punkte Ø Score
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-extrabold gradient-text">92%</div>
            <div className="text-xs md:text-sm text-white/40 mt-1">
              nutzen &lt;5% ihres Potenzials
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
