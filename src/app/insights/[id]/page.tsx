"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { InsightArticle, getInsightsArticles } from "@/lib/db";

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { locale } = useLanguage();
  
  const id = params.id as string;
  const isArabic = locale === "ar";

  const [article, setArticle] = useState<InsightArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await getInsightsArticles();
        const found = list.find((a) => a.id === id);
        if (found) {
          setArticle(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-kompass-bg text-kompass-text flex flex-col justify-between selection:bg-kompass-teal selection:text-kompass-bg">
        <Navbar />
        <main className="flex-grow py-20 text-center font-mono text-xs uppercase tracking-wider text-kompass-teal animate-pulse">
          Retrieving secure intel briefing...
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-kompass-bg text-kompass-text flex flex-col justify-between selection:bg-kompass-teal selection:text-kompass-bg">
        <Navbar />
        <main className="flex-grow py-20 text-center font-mono text-xs uppercase tracking-wider">
          {isArabic ? "المقالة غير موجودة" : "Article Not Found"}
          <div className="mt-4">
            <button onClick={() => router.push("/")} className="text-kompass-teal underline">
              {isArabic ? "العودة إلى لوحة القيادة" : "Return to Control Panel"}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const category = isArabic ? article.category_ar : article.category_en;
  const title = isArabic ? article.title_ar : article.title_en;
  const readTime = isArabic ? article.read_time_ar : article.read_time_en;
  const paragraphs = isArabic ? article.paragraphs_ar : article.paragraphs_en;

  return (
    <div className="min-h-screen bg-kompass-bg text-kompass-text flex flex-col justify-between selection:bg-kompass-teal selection:text-kompass-bg">
      <Navbar />

      <main className="flex-grow py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Breadcrumb / Back Link */}
          <div className="mb-8 font-sans">
            <button 
              onClick={() => router.push("/")} 
              className="font-mono text-xs text-kompass-text/50 hover:text-kompass-teal transition-colors flex items-center gap-1.5 uppercase"
            >
              ← {isArabic ? "العودة إلى لوحة القيادة" : "Back to Dashboard"}
            </button>
          </div>

          {/* Article Header */}
          <div className="border-b border-kompass-border/60 pb-6 mb-8">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-kompass-teal bg-kompass-card border border-kompass-border px-2 py-0.5 inline-block mb-3">
              {category}
            </span>
            <h1 className="font-condensed text-3xl sm:text-4xl font-extrabold tracking-wide text-kompass-text uppercase leading-tight">
              {title}
            </h1>
            <div className="mt-3 flex items-center gap-4 font-mono text-[10px] text-kompass-text/40">
              <span>{isArabic ? `وقت القراءة: ${readTime}` : `READING TIME: ${readTime}`}</span>
              <span>·</span>
              <span>{isArabic ? "مستوى السرية: آمن" : "CONFIDENTIALITY: SECURED"}</span>
            </div>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-6 text-sm sm:text-base text-kompass-text/80 leading-relaxed font-sans">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="text-justify whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>

          {/* Contact CTA box below article */}
          <div className="border border-kompass-border bg-kompass-card p-6 rounded-lg mt-12 relative overflow-hidden text-center">
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-kompass-teal/30" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-kompass-teal/30" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-kompass-teal/30" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-kompass-teal/30" />

            <h3 className="font-condensed text-base font-extrabold tracking-wider text-kompass-text uppercase">
              {isArabic ? "هل تحتاج إلى استخبارات مخصصة لمنتخبك؟" : "Require Target Intelligence for Your National Team?"}
            </h3>
            <p className="text-xs text-kompass-text/60 mt-2 max-w-lg mx-auto">
              {isArabic 
                ? "تواصل مع كبير محللينا لإعداد تتبع المنافسين لعام 2026." 
                : "Initiate contact with a lead analyst to configure opponent tracking for the 2026 cycle."}
            </p>
            <div className="mt-4">
              <button 
                onClick={() => router.push("/#contact")} 
                className="bg-kompass-teal border border-kompass-teal text-kompass-bg px-6 py-2 font-condensed text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-kompass-teal transition-all"
              >
                {isArabic ? "طلب استشارة تكتيكية" : "Request Tactical Consultation"}
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
