"use client";

import React, { useState, useEffect } from "react";
import { 
  InsightArticle, 
  getInsightsArticles, 
  saveInsightsArticle, 
  deleteInsightsArticle 
} from "@/lib/db";

export default function InsightsCMSPage() {
  const [articles, setArticles] = useState<InsightArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    id: "",
    date: "",
    category_en: "",
    category_ar: "",
    title_en: "",
    title_ar: "",
    read_time_en: "",
    read_time_ar: "",
    paragraphs_en: "",
    paragraphs_ar: ""
  });

  const loadArticles = async () => {
    try {
      const data = await getInsightsArticles();
      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleSelect = (art: InsightArticle) => {
    setSelectedArticle(art);
    setForm({
      id: art.id,
      date: art.date,
      category_en: art.category_en,
      category_ar: art.category_ar,
      title_en: art.title_en,
      title_ar: art.title_ar,
      read_time_en: art.read_time_en,
      read_time_ar: art.read_time_ar,
      paragraphs_en: art.paragraphs_en.join("\n\n"),
      paragraphs_ar: art.paragraphs_ar.join("\n\n")
    });
  };

  const handleCreateNew = () => {
    setSelectedArticle(null);
    setForm({
      id: "",
      date: new Date().toISOString().slice(0, 10),
      category_en: "",
      category_ar: "",
      title_en: "",
      title_ar: "",
      read_time_en: "",
      read_time_ar: "",
      paragraphs_en: "",
      paragraphs_ar: ""
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title_en || !form.title_ar || !form.paragraphs_en || !form.paragraphs_ar) {
      setErrorMsg("REQUIRED: ENGLISH AND ARABIC TITLES AND PARAGRAPHS.");
      return;
    }

    try {
      // Split paragraphs by double line breaks
      const paragraphs_en = form.paragraphs_en
        .split(/\n\n+/)
        .map(p => p.trim())
        .filter(p => p.length > 0);
      const paragraphs_ar = form.paragraphs_ar
        .split(/\n\n+/)
        .map(p => p.trim())
        .filter(p => p.length > 0);

      const toSave: Omit<InsightArticle, "id"> & { id?: string } = {
        date: form.date || new Date().toISOString().slice(0, 10),
        category_en: form.category_en || "EDITORIAL",
        category_ar: form.category_ar || "افتتاحية",
        title_en: form.title_en,
        title_ar: form.title_ar,
        read_time_en: form.read_time_en || "5 Min",
        read_time_ar: form.read_time_ar || "٥ دقائق",
        paragraphs_en,
        paragraphs_ar
      };

      if (form.id) {
        toSave.id = form.id;
      }

      const saved = await saveInsightsArticle(toSave);
      setMsg("TACTICAL BRIEFING ARTICLE SECURED IN CMS.");
      loadArticles();
      setSelectedArticle(saved);
      setForm(prev => ({ ...prev, id: saved.id }));
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("FAILED TO SAVE INSIGHT ARTICLE.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("CONFIRM COMMAND: PURGE INSIGHTS ARTICLE?")) return;
    try {
      await deleteInsightsArticle(id);
      setMsg("INSIGHTS ARTICLE PURGED FROM CMS FEED.");
      loadArticles();
      handleCreateNew();
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("FAILED TO DELETE INSIGHTS ARTICLE.");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center font-mono text-xs text-kompass-teal animate-pulse">
        CONNECTING SECURE INSIGHTS FEED...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-kompass-border/30 pb-4 text-left">
        <h2 className="font-condensed text-xl font-extrabold text-[#E6E6E6] uppercase tracking-wider">
          Insights & Briefings CMS
        </h2>
        <p className="text-xs text-kompass-text/60 mt-1 uppercase font-mono">
          Bilingual Publishing Engine for Modern Tactical Bulletins
        </p>
      </div>

      {msg && (
        <div className="p-3 bg-intel-green/10 border border-intel-green/20 text-intel-green font-mono text-[10px] uppercase text-left">
          {msg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-intel-orange/10 border border-intel-orange/20 text-intel-orange font-mono text-[10px] uppercase text-left">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Article List */}
        <div className="md:col-span-4 space-y-4">
          <button 
            onClick={handleCreateNew}
            className="w-full bg-[#00D6C6] border border-[#00D6C6] text-[#0B0F16] py-2 font-condensed text-xs uppercase tracking-widest font-extrabold hover:bg-transparent hover:text-[#00D6C6] transition-all"
          >
            + Publish New Article
          </button>
          
          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
            {articles.map((art) => (
              <button 
                key={art.id}
                onClick={() => handleSelect(art)}
                className={`w-full text-left p-3 border font-mono text-xs transition-all ${
                  selectedArticle?.id === art.id 
                    ? "bg-[#00D6C6]/10 border-[#00D6C6] text-kompass-teal font-bold"
                    : "bg-[#0B0F16]/50 border-kompass-border/30 hover:border-kompass-teal/40 text-kompass-text/80"
                }`}
              >
                <span className="block font-sans font-bold text-sm text-[#E6E6E6]">{art.title_en}</span>
                <span className="text-[10px] text-kompass-text/45 uppercase mt-1 block">
                  {art.category_en} · {art.read_time_en} · {art.date}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className="md:col-span-8 bg-[#0B0F16]/40 border border-kompass-border/30 p-6">
          <h3 className="font-condensed text-sm font-bold uppercase tracking-wider text-kompass-teal border-b border-kompass-border/30 pb-2 mb-4 text-left">
            {selectedArticle ? `EDIT ARTICLE: ${selectedArticle.title_en}` : "PUBLISH NEW BRIEFING"}
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Category EN */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  CATEGORY (EN)
                </label>
                <input 
                  type="text"
                  value={form.category_en}
                  onChange={(e) => setForm(prev => ({ ...prev, category_en: e.target.value }))}
                  placeholder="e.g. METHOD"
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
                />
              </div>

              {/* Category AR */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  CATEGORY (AR)
                </label>
                <input 
                  type="text"
                  value={form.category_ar}
                  onChange={(e) => setForm(prev => ({ ...prev, category_ar: e.target.value }))}
                  placeholder="e.g. منهجية"
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
                />
              </div>

              {/* Publish Date */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  PUBLISH DATE
                </label>
                <input 
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title EN */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  ARTICLE TITLE (EN) *
                </label>
                <input 
                  type="text"
                  required
                  value={form.title_en}
                  onChange={(e) => setForm(prev => ({ ...prev, title_en: e.target.value }))}
                  placeholder="Inside the KID Framework..."
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
                />
              </div>

              {/* Title AR */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  ARTICLE TITLE (AR) *
                </label>
                <input 
                  type="text"
                  required
                  value={form.title_ar}
                  onChange={(e) => setForm(prev => ({ ...prev, title_ar: e.target.value }))}
                  placeholder="داخل إطار عمل KID..."
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Read Time EN */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  READ TIME (EN)
                </label>
                <input 
                  type="text"
                  value={form.read_time_en}
                  onChange={(e) => setForm(prev => ({ ...prev, read_time_en: e.target.value }))}
                  placeholder="e.g. 6 Min"
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
                />
              </div>

              {/* Read Time AR */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  READ TIME (AR)
                </label>
                <input 
                  type="text"
                  value={form.read_time_ar}
                  onChange={(e) => setForm(prev => ({ ...prev, read_time_ar: e.target.value }))}
                  placeholder="e.g. ٦ دقائق"
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
                />
              </div>
            </div>

            {/* Paragraphs EN */}
            <div className="flex flex-col gap-1.5">
              <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                PARAGRAPHS (EN) - DOUBLE LINE BREAK SEPARATED *
              </label>
              <textarea 
                required
                value={form.paragraphs_en}
                onChange={(e) => setForm(prev => ({ ...prev, paragraphs_en: e.target.value }))}
                rows={5}
                placeholder="Write the article paragraphs in English here. Use a blank line (double enter) to separate paragraphs."
                className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full font-sans leading-relaxed"
              />
            </div>

            {/* Paragraphs AR */}
            <div className="flex flex-col gap-1.5">
              <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                PARAGRAPHS (AR) - DOUBLE LINE BREAK SEPARATED *
              </label>
              <textarea 
                required
                value={form.paragraphs_ar}
                onChange={(e) => setForm(prev => ({ ...prev, paragraphs_ar: e.target.value }))}
                rows={5}
                placeholder="اكتب فقرات المقال باللغة العربية هنا. استخدم سطراً فارغاً للفصل بين الفقرات."
                className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full font-sans leading-relaxed text-right"
                dir="rtl"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-2 font-sans">
              {selectedArticle ? (
                <button
                  type="button"
                  onClick={() => handleDelete(selectedArticle.id)}
                  className="border border-intel-orange text-intel-orange hover:bg-intel-orange/10 px-4 py-2 font-condensed text-[10px] uppercase font-extrabold tracking-wider transition-all"
                >
                  Purge Article
                </button>
              ) : (
                <div />
              )}
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="border border-kompass-border text-kompass-text/60 hover:text-kompass-text px-4 py-2 font-condensed text-[10px] uppercase font-extrabold tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#00D6C6] border border-[#00D6C6] text-[#0B0F16] px-6 py-2 font-condensed text-[10px] uppercase tracking-widest font-extrabold hover:bg-transparent hover:text-[#00D6C6] transition-all"
                >
                  Secure Publication
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
