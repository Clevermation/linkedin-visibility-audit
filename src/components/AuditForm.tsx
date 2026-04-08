"use client";

import { useState } from "react";

export interface AuditFormData {
  companyName: string;
  companyUrl: string;
  profileUrl: string;
  email: string;
  industry: string;
}

interface AuditFormProps {
  onSubmit: (data: AuditFormData) => void;
}

const INDUSTRIES = [
  "Maschinenbau & Produktion",
  "IT & Software",
  "Beratung & Dienstleistung",
  "Handel & E-Commerce",
  "Bau & Immobilien",
  "Gesundheit & Pharma",
  "Energie & Umwelt",
  "Logistik & Transport",
  "Andere",
];

export default function AuditForm({ onSubmit }: AuditFormProps) {
  const [form, setForm] = useState<AuditFormData>({
    companyName: "",
    companyUrl: "",
    profileUrl: "",
    email: "",
    industry: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const update = (field: keyof AuditFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    form.companyName && form.companyUrl && form.profileUrl && form.email;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">
          Kostenloser Visibility Check
        </h3>
        <p className="text-sm text-gray mb-6">
          Keine Anmeldung nötig. Ergebnis in 60 Sekunden.
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray mb-1.5 font-[family-name:var(--font-ui)]">
          Firmenname
        </label>
        <input
          type="text"
          value={form.companyName}
          onChange={(e) => update("companyName", e.target.value)}
          placeholder="z.B. Müller Maschinenbau GmbH"
          className="w-full bg-card-darker border border-accent/15 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-accent/50 transition-colors font-[family-name:var(--font-ui)]"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray mb-1.5 font-[family-name:var(--font-ui)]">
          LinkedIn Company Page
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 text-xs font-bold font-[family-name:var(--font-ui)]">
            in
          </span>
          <input
            type="url"
            value={form.companyUrl}
            onChange={(e) => update("companyUrl", e.target.value)}
            placeholder="linkedin.com/company/..."
            className="w-full bg-card-darker border border-accent/15 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-accent/50 transition-colors font-[family-name:var(--font-ui)]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray mb-1.5 font-[family-name:var(--font-ui)]">
          Ihr LinkedIn Profil
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 text-xs font-bold font-[family-name:var(--font-ui)]">
            in
          </span>
          <input
            type="url"
            value={form.profileUrl}
            onChange={(e) => update("profileUrl", e.target.value)}
            placeholder="linkedin.com/in/..."
            className="w-full bg-card-darker border border-accent/15 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-accent/50 transition-colors font-[family-name:var(--font-ui)]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray mb-1.5 font-[family-name:var(--font-ui)]">
          E-Mail für den ausführlichen Report
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="max@mueller-maschinenbau.de"
          className="w-full bg-card-darker border border-accent/15 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-accent/50 transition-colors font-[family-name:var(--font-ui)]"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray mb-1.5 font-[family-name:var(--font-ui)]">
          Branche
        </label>
        <select
          value={form.industry}
          onChange={(e) => update("industry", e.target.value)}
          className="w-full bg-card-darker border border-accent/15 rounded-lg px-4 py-3 text-sm text-white/25 outline-none focus:border-accent/50 transition-colors font-[family-name:var(--font-ui)] appearance-none cursor-pointer"
          style={form.industry ? { color: "white" } : {}}
        >
          <option value="">Branche auswählen...</option>
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full bg-cta hover:bg-cta-hover disabled:opacity-40 disabled:cursor-not-allowed text-primary font-bold rounded-lg px-6 py-3.5 text-base flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(242,140,130,0.3)] mt-6 cursor-pointer"
      >
        Kostenlose Analyse starten
        <span className="text-lg">&rarr;</span>
      </button>

      <div className="flex justify-center gap-5 pt-2 text-xs text-white/40 font-[family-name:var(--font-ui)]">
        <span className="flex items-center gap-1">&#10003; 100% kostenlos</span>
        <span className="flex items-center gap-1">&#128274; DSGVO-konform</span>
        <span className="flex items-center gap-1">&#9889; 60 Sek.</span>
      </div>
    </form>
  );
}
