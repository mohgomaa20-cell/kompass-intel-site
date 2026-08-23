"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const ProcessStrip: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { num: "01", label: t.p_step1, desc: "Extract high-frequency combative signals and raw telemetry logs." },
    { num: "02", label: t.p_step2, desc: "Process combat profiles through champion-audited tactical scenario matrices." },
    { num: "03", label: t.p_step3, desc: "Synthesize target tells into distilled, sub-second execution blueprints." },
    { num: "04", label: t.p_step4, desc: "Secure the first-move advantage on the mat and execute key point counters." }
  ];

  return (
    <section className="bg-kompass-bg py-16 border-b border-kompass-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-kompass-teal">
            {t.process_title}
          </span>
          <h2 className="font-condensed text-3xl font-extrabold tracking-wider text-kompass-text mt-1 uppercase">
            Operational Workflow
          </h2>
        </div>

        {/* Process Steps Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative flex flex-col items-center text-center p-6 bg-kompass-card border border-kompass-border group hover:border-kompass-teal/40 transition-colors">
              
              {/* Corner brackets */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-kompass-border group-hover:border-kompass-teal/40" />
              <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-kompass-border group-hover:border-kompass-teal/40" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-kompass-border group-hover:border-kompass-teal/40" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-kompass-border group-hover:border-kompass-teal/40" />

              {/* Step Circle Badge */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-kompass-border bg-kompass-bg font-condensed text-base font-bold text-kompass-text group-hover:border-kompass-teal group-hover:text-kompass-teal group-hover:shadow-md group-hover:shadow-kompass-teal/5 transition-all">
                {step.num}
              </div>

              {/* Step Label */}
              <h3 className="mt-4 font-condensed text-base font-extrabold tracking-wider text-kompass-text group-hover:text-kompass-teal transition-colors">
                {step.label}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs text-kompass-text/60 leading-relaxed">
                {step.desc}
              </p>

              {/* Connecting Arrow for larger screens (except last step) */}
              {idx < 3 && (
                <div className="hidden lg:block absolute top-[44px] -right-4 z-10 text-kompass-border font-mono text-sm pointer-events-none">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default ProcessStrip;
