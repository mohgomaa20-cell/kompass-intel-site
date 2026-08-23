"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { wkfCategories } from "@/data/content";

export const ContactForm: React.FC = () => {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    role: "",
    division: "",
    weight: "",
    otherDetails: "",
    notes: ""
  });

  const [weightOptions, setWeightOptions] = useState<string[]>([]);
  const [showOtherDetails, setShowOtherDetails] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });
  const [loading, setLoading] = useState(false);

  // Cascade effect for weight classes based on division select
  useEffect(() => {
    if (!formData.division) {
      setWeightOptions([]);
      return;
    }

    const divisionKey = formData.division as keyof typeof wkfCategories.en;
    const options = wkfCategories[locale][divisionKey] || [];
    setWeightOptions(options);

    // Reset weight selection if it's not valid for the new division
    setFormData((prev) => ({ ...prev, weight: "" }));
  }, [formData.division, locale]);

  // Watch role selection to show other details if needed
  useEffect(() => {
    if (formData.weight.includes("Other") || formData.weight.includes("أخرى")) {
      setShowOtherDetails(true);
    } else {
      setShowOtherDetails(false);
    }
  }, [formData.weight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const field = id.replace("form-", "");
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.role || !formData.division || (!formData.weight && !showOtherDetails)) {
      setStatusMsg({ type: "error", text: t.msg_error });
      return;
    }

    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setStatusMsg({ type: "success", text: t.msg_success });
      // Reset form
      setFormData({
        name: "",
        contact: "",
        role: "",
        division: "",
        weight: "",
        otherDetails: "",
        notes: ""
      });
    }, 1000);
  };

  return (
    <section id="contact" className="bg-[#0B0F16] py-20 border-b border-kompass-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact details and direct analyst secure communication channel */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-kompass-teal">
                {t.contact_subtitle}
              </span>
              <h2 className="font-condensed text-3xl sm:text-4xl font-extrabold tracking-tight text-kompass-text mt-1 uppercase leading-none">
                {t.contact_title}
              </h2>
            </div>

            <div className="space-y-6">
              {/* Phone secure channel */}
              <div className="flex gap-4 border border-kompass-border bg-kompass-card p-4">
                <div className="h-10 w-10 border border-kompass-border bg-[#0B0F16] flex items-center justify-center text-kompass-teal">
                  ☎
                </div>
                <div>
                  <h4 className="font-condensed text-xs font-bold uppercase text-kompass-text/60">
                    {t.c_lbl_phone}
                  </h4>
                  <p className="font-mono text-sm font-bold text-kompass-text mt-1">
                    {t.c_val_phone}
                  </p>
                </div>
              </div>

              {/* Email secure channel */}
              <div className="flex gap-4 border border-kompass-border bg-kompass-card p-4">
                <div className="h-10 w-10 border border-kompass-border bg-[#0B0F16] flex items-center justify-center text-kompass-teal">
                  ✉
                </div>
                <div>
                  <h4 className="font-condensed text-xs font-bold uppercase text-kompass-text/60">
                    {t.c_lbl_email}
                  </h4>
                  <p className="font-mono text-sm font-bold text-kompass-text mt-1">
                    {t.c_val_email}
                  </p>
                </div>
              </div>

              {/* HQ locations */}
              <div className="flex gap-4 border border-kompass-border bg-kompass-card p-4">
                <div className="h-10 w-10 border border-kompass-border bg-[#0B0F16] flex items-center justify-center text-kompass-teal">
                  ⚲
                </div>
                <div>
                  <h4 className="font-condensed text-xs font-bold uppercase text-kompass-text/60">
                    {t.c_lbl_loc}
                  </h4>
                  <p className="font-condensed text-sm font-bold text-kompass-text mt-1">
                    {t.c_val_loc}
                  </p>
                </div>
              </div>
            </div>

            {/* Redacted watermark text */}
            <div className="border border-dashed border-kompass-border/40 p-4 font-mono text-[9px] text-kompass-text/35 uppercase leading-relaxed">
              WARNING: STANCE TELEMETRY REQUEST DATA IS LOGGED SECURELY IN OUR ENCRYPTED HOSTING PIPELINE. INTEL BRIEFINGS WILL BE ISSUED ONCE ATHLETE CREDENTIALS ARE COMPLETED.
            </div>
          </div>

          {/* Right Column: Cascading Request Form */}
          <div className="lg:col-span-7 bg-kompass-card border border-kompass-border p-6 sm:p-8 relative shadow-lg shadow-kompass-teal/5">
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-kompass-border/60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-kompass-border/60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-kompass-border/60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-kompass-border/60" />

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="form-name" className="font-condensed text-xs uppercase tracking-wider text-kompass-text/75 font-semibold">
                    {t.f_lbl_name} *
                  </label>
                  <input 
                    type="text" 
                    id="form-name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-kompass-text placeholder-kompass-text/30 focus:border-kompass-teal focus:outline-none rounded-none"
                    placeholder="Malek Gomaa"
                  />
                </div>

                {/* Contact Email/Phone */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="form-contact" className="font-condensed text-xs uppercase tracking-wider text-kompass-text/75 font-semibold">
                    {t.f_lbl_contact} *
                  </label>
                  <input 
                    type="text" 
                    id="form-contact" 
                    required 
                    value={formData.contact}
                    onChange={handleChange}
                    className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-kompass-text placeholder-kompass-text/30 focus:border-kompass-teal focus:outline-none rounded-none"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              {/* Role Select Dropdown */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="form-role" className="font-condensed text-xs uppercase tracking-wider text-kompass-text/75 font-semibold">
                  {t.f_lbl_role} *
                </label>
                <select 
                  id="form-role" 
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-kompass-text focus:border-kompass-teal focus:outline-none rounded-none appearance-none"
                >
                  <option value="" disabled>{t.f_opt_role_select}</option>
                  <option value="Athlete">{locale === "en" ? "Athlete" : "لاعب رياضي"}</option>
                  <option value="National Team Coach">{locale === "en" ? "National Team Coach" : "مدرب منتخب وطني"}</option>
                  <option value="Private Coach">{locale === "en" ? "Private Coach" : "مدرب خاص"}</option>
                  <option value="Federation Official">{locale === "en" ? "Federation Official" : "مسؤول اتحاد رياضي"}</option>
                  <option value="Academy Director">{locale === "en" ? "Academy Director / Club Manager" : "مدير أكاديمية / مدير نادي"}</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Division (Parent Select) */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="form-division" className="font-condensed text-xs uppercase tracking-wider text-kompass-text/75 font-semibold">
                    {t.f_lbl_age} *
                  </label>
                  <select 
                    id="form-division" 
                    required
                    value={formData.division}
                    onChange={handleChange}
                    className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-kompass-text focus:border-kompass-teal focus:outline-none rounded-none"
                  >
                    <option value="" disabled>{t.f_opt_age_select}</option>
                    <option value="seniors_male">{locale === "en" ? "Seniors Male" : "كبار رجال"}</option>
                    <option value="seniors_female">{locale === "en" ? "Seniors Female" : "كبار سيدات"}</option>
                    <option value="u21_male">{locale === "en" ? "U21 Male" : "تحت 21 شباب"}</option>
                    <option value="u21_female">{locale === "en" ? "U21 Female" : "تحت 21 شابات"}</option>
                    <option value="juniors_male">{locale === "en" ? "Juniors Male" : "ناشئين بنين"}</option>
                    <option value="juniors_female">{locale === "en" ? "Juniors Female" : "ناشئات بنات"}</option>
                    <option value="team">{locale === "en" ? "Team Kumite" : "كوميتيه جماعي"}</option>
                    <option value="other">{locale === "en" ? "Other / Open Category" : "أخرى / فئة مفتوحة"}</option>
                  </select>
                </div>

                {/* Weight Class (Child Select) */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="form-weight" className="font-condensed text-xs uppercase tracking-wider text-kompass-text/75 font-semibold">
                    {t.f_lbl_cat} *
                  </label>
                  <select 
                    id="form-weight" 
                    required
                    value={formData.weight}
                    onChange={handleChange}
                    disabled={!formData.division}
                    className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-kompass-text focus:border-kompass-teal focus:outline-none rounded-none disabled:opacity-40"
                  >
                    <option value="" disabled>{t.f_opt_cat_select}</option>
                    {weightOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Specified category input (Shown if division is 'other' or category is 'other') */}
              {(showOtherDetails || formData.division === "other") && (
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="form-otherDetails" className="font-condensed text-xs uppercase tracking-wider text-kompass-text/75 font-semibold">
                    {t.f_lbl_other}
                  </label>
                  <input 
                    type="text" 
                    id="form-otherDetails" 
                    value={formData.otherDetails}
                    onChange={handleChange}
                    className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-kompass-text placeholder-kompass-text/30 focus:border-kompass-teal focus:outline-none rounded-none"
                    placeholder="e.g. Traditional Kata, Open Grand Prix"
                  />
                </div>
              )}

              {/* Notes Context */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="form-notes" className="font-condensed text-xs uppercase tracking-wider text-kompass-text/75 font-semibold">
                  {t.f_lbl_notes}
                </label>
                <textarea 
                  id="form-notes" 
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-kompass-text placeholder-kompass-text/30 focus:border-kompass-teal focus:outline-none rounded-none resize-none"
                  placeholder={locale === "en" ? "e.g. Preparing for WKF World Championships. Focused on three main rivals in -75kg." : "مثال: الاستعداد لبطولة العالم للكاراتيه WKF. التركيز على ثلاثة منافسين في وزن -75 كجم."}
                />
              </div>

              {/* Feedback messages */}
              {statusMsg.type && (
                <div className={`p-3 font-mono text-xs text-left ${statusMsg.type === "success" ? "bg-intel-green/10 text-intel-green border border-intel-green/20" : "bg-intel-orange/10 text-intel-orange border border-intel-orange/20"}`}>
                  {statusMsg.text}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 text-left">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full sm:w-auto bg-kompass-teal border border-kompass-teal text-kompass-bg px-6 py-3 font-condensed text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-kompass-teal transition-all disabled:opacity-50"
                >
                  {loading ? "PROCESSING..." : t.btn_submit}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
export default ContactForm;
