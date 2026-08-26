"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface Article {
  title: string;
  readTime: string;
  category: string;
  paragraphs: string[];
}

const ARTICLES_DATA: Record<"en" | "ar", Record<string, Article>> = {
  en: {
    "1": {
      title: "Inside the KID Framework: The Science of Stance Telemetry",
      readTime: "6 Min",
      category: "METHOD",
      paragraphs: [
        "In the high-velocity domain of elite WKF kumite, waiting for an opponent to initiate a strike is a high-risk gamble. The Karate Intelligence Data (KID) framework operates on the premise that physical actions do not happen in isolation; they are preceded by micro-adjustments in stance, load, and muscle tension. Stance telemetry is the systematic capture and analysis of these pre-ignition signals.",
        "By focusing on the center of gravity and foot loading distribution, our telemetry models map how WKF athletes anchor themselves before launching high-point techniques. For example, a stance bias analysis of top-tier athletes indicates that individuals who favor lead-foot attacks often micro-compress their knees or shift 5% more weight to the rear foot exactly 200ms to 300ms before release. These tells are invisible to the naked eye but become distinct, actionable signals under frame-level expert verification.",
        "Understanding these mechanics allows coaches and athletes to decode MA-AI (combat distance) dynamically. Instead of guessing when a rival will strike, tactical corners can read physical alignment in real-time, structuring sparring models around real, physical indicators rather than speculative guess work."
      ]
    },
    "2": {
      title: "What a 300ms Gaze Tell Actually Means on the International Circuit",
      readTime: "4 Min",
      category: "TELLS LOG",
      paragraphs: [
        "At the WKF Premier League level, split-second tells make the difference between a podium finish and early elimination. Among the physical cues tracked in our secure inventory, gaze locks are highly reliable predictors of combat technique. A gaze lock occurs when an athlete fixes their focus on a specific zone—often the chest or midsection—just before launching a targeted attack.",
        "Statistical telemetry indicates that a gaze lock lasting between 250ms and 350ms exhibits a 85% correlation with foot sweeps (Ashi-Barai) or low-line kicks. This brief visual lock represents a subconscious target validation window where the competitor aligns their distance before committing. When caught on frame-verified match tape, it serves as an immediate trigger for a preemptive counter.",
        "To utilize this on the mat, athletes are trained to recognize the sequence: the rival's gaze locks, their rear heel lifts, and the balance shifts. By understanding the timing of these sub-second tells, athletes can execute their exit vectors or launch counter-strikes before the opponent's technique has even cleared the floor."
      ]
    },
    "3": {
      title: "Reading the Samdan Formula: Countering Heavy Front-Foot Aggressors",
      readTime: "8 Min",
      category: "TACTICAL",
      paragraphs: [
        "The 'Samdan Formula' represents one of the most challenging tactical styles in modern Kumite: the heavy front-foot aggressor. These athletes apply continuous forward pressure, using their lead stance to occupy the critical MA-AI zone and deny their opponents the space needed to structure clean attacks.",
        "Countering this style requires precise spatial discipline. Our tactical blueprints emphasize the use of lateral right-side escapes to bypass the linear path of the aggressor. By executing a high feint (Kizami-Zuki trajectory) to force the aggressor into a premature counter-block, the defending athlete can instantly break their balance. The locked front-foot alignment of the aggressor prevents them from adjusting their hips, leaving them highly vulnerable to low-line sweeps.",
        "By studying sequence timelines of front-foot athletes, coaches can build specific sparring simulations. The goal is to draw the rival's heavy commitment forward, trigger their predictable tell, and execute the counter-technique at the exact moment their weight distribution locks."
      ]
    },
    "4": {
      title: "Why Automated AI Isn't the Product: The Power of Human Audit",
      readTime: "5 Min",
      category: "EDITORIAL",
      paragraphs: [
        "In the rush to integrate artificial intelligence into sports analytics, many providers have opted for fully automated solutions. Raw computer-vision models are programmed to track skeletal movement and output automated predictions. However, on the elite international karate circuit, automated AI alone is not only insufficient—it is dangerous.",
        "WKF Kumite is defined by rapid exchanges, micro-feints, and complex spatial dynamics. Standard automated models cannot differentiate between a genuine preparatory stance adjust and a deliberate tactical feint designed to feed false data. This results in high error rates and unreliable tells that can lead to tactical failure in high-stakes matches.",
        "This is why the KOMPASS pipeline mandates a hybrid expert-in-the-loop workflow. First-pass computer-vision data is audited frame-by-frame by international champions. Our analysts verify every muscle tell and spatial change manually, guaranteeing that the intelligence delivered to national federations is 100% accurate and actionable. We don't ship automated guesswork; we deliver human-signed tactical direction."
      ]
    }
  },
  ar: {
    "1": {
      title: "Inside the KID Framework: The Science of Stance Telemetry",
      readTime: "٦ دقائق",
      category: "منهجية",
      paragraphs: [
        "في بطولات الكوميتيه النخبوية التابعة لـ WKF، يعد انتظار هجوم الخصم مجازفة عالية المخاطر. يعتمد إطار عمل Karate Intelligence Data (KID) على فرضية أن الحركات القتالية لا تحدث بشكل منفصل، بل تسبقها تعديلات دقيقة في الارتكاز، والوزن، وتوتر العضلات. استخبارات تمركز اللاعبين هي الاستخراج المنهجي والتحليل الفني لهذه الإشارات المبكرة.",
        "من خلال التركيز على مركز الجاذبية وتوزيع الأحمال على القدمين، ترسم نماذجنا التكتيكية كيفية تمركز لاعبي WKF قبل إطلاق الضربات عالية النقاط. على سبيل المثال، يوضح تحليل تمركز اللاعبين النخبة أن أولئك الذين يفضلون هجمات القدم الأمامية غالباً ما يقومون بثني الركبة قليلاً أو نقل 5% من وزنهم إلى القدم الخلفية قبل 200 إلى 300 ملّي ثانية من الهجوم. هذه المؤشرات غير مرئية بالعين المجردة ولكنها تصبح واضحة وموثوقة تحت تدقيق بطل العالم.",
        "يتيح فهم هذه الميكانيكيات للمدربين واللاعبين فك شفرة مسافة المواجهة (Ma-ai) بشكل ديناميكي. وبدلاً من تخمين توقيت ضربة الخصم، يمكن للمنتخبات قراءة محاذاة الخصم الجسدية في الوقت الفعلي، وتصميم تدريبات المحاكاة بناءً على مؤشرات حقيقية بدلاً من التخمين."
      ]
    },
    "2": {
      title: "ماذا تعني قرينة النظر التي تستغرق 300 ملّي ثانية في النزالات الدولية؟",
      readTime: "٤ دقائق",
      category: "قرائن الحركة",
      paragraphs: [
        "على مستوى الدوري الممتاز WKF، تحدد أجزاء من الثانية الفارق بين الفوز بالميدالية والخروج المبكر. ومن بين المؤشرات الجسدية التي نتتبعها في سجلنا الآمن، تعتبر قرائن النظر مؤشرات دقيقة للتنبؤ بالحركات القتالية. تحدث قرينة النظر عندما يركز اللاعب نظره على منطقة معينة—غالباً الصدر أو البطن—قبل إطلاق الهجوم مباشرة.",
        "تشير البيانات التحليلية إلى أن تركيز النظر الذي يستمر ما بين 250 إلى 350 ملّي ثانية يرتبط بنسبة 85% بركلات القدم (Ashi-Barai) أو الركلات السفلية. يمثل هذا التركيز البصري القصير نافذة تحقق لا واعية يقوم فيها المنافس بضبط المسافة قبل الهجوم. وعند التقاطه بالفيديو الموثق إطاراً بإطار، فإنه يوفر فرصة فورية لشن هجوم مضاد استباقي.",
        "لاستغلال ذلك على البساط، يتم تدريب اللاعبين على التعرف على التسلسل الحركي للخصم: تركيز النظر، ثم رفع الكعب الخلفي، ثم تحول الوزن. من خلال فهم هذا التسلسل التكتيكي، يمكن للاعب تنفيذ مسار الهروب الجانبي أو شن ضربات مضادة قبل أن تكتمل حركة الخصم."
      ]
    },
    "3": {
      title: "قراءة معادلة سمدان التكتيكية: مواجهة المهاجمين ذوي الارتكاز الأمامي الثقيل",
      readTime: "٨ دقائق",
      category: "تكتيكي",
      paragraphs: [
        "تتطلب مواجهة هذا الأسلوب انضباطاً حركياً دقيقاً. تؤكد مخططاتنا التكتيكية على استخدام الهروب الجانبي الأيمن لتجاوز المسار الخطي للمهاجم. ومن خلال تنفيذ حركة تمويهية علوية (على خط لكمة Kizami-Zuki) لإجبار المهاجم على شن ضربة مضادة متسرعة، يمكن للاعب المدافع كسر توازن الخصم فوراً. يمنعه الارتكاز الثقيل على قدمه الأمامية من تعديل وركيه، مما يجعله عرضة تماماً لكنس القدم السفلي.",
        "من خلال دراسة الجدول الزمني لتسلسل حركات لاعبي الارتكاز الأمامي، يمكن للمدربين بناء تدريبات محاكاة محددة. الهدف هو استدراج الخصم للاندفاع الكامل للأمام، وتحفيز إشاراته الحركية المتوقعة، وتنفيذ الضربات المضادة في اللحظة التي يقفل فيها وزنه."
      ]
    },
    "4": {
      title: "لماذا لا يكون الذكاء الاصطناعي التلقائي هو المنتج النهائي: قوة التدقيق البشري",
      readTime: "٥ دقائق",
      category: "افتتاحية",
      paragraphs: [
        "في السباق نحو دمج الذكاء الاصطناعي في التحليلات الرياضية، اختار العديد من مقدمي الخدمة الحلول التلقائية بالكامل. يتم برمجة نماذج الرؤية الحاسوبية البسيطة لتتبع الهيكل الحركي وتصدير تنبؤات آلية. ومع ذلك، على مستوى بطولات الكاراتيه الدولية النخبوية، فإن الاعتماد على الذكاء الاصطناعي التلقائي وحده ليس غير كافٍ فحسب، بل هو أمر خطير.",
        "تتميز نزالات الكوميتيه بالسرعة الفائقة، والتمويهات الحركية الدقيقة، والديناميكيات المكانية المعقدة. لا تستطيع النماذج التلقائية التمييز بين تعديل التمركز الفعلي والحركة التمويهية المتعمدة لتغذية النموذج ببيانات خاطئة. يؤدي هذا إلى معدلات خطأ عالية وإشارات غير موثوقة قد تتسبب في الفشل التكتيكي خلال المباريات الحاسمة.",
        "هذا هو السبب في أن كومباس تعتمد على مسار عمل هجين يضع الخبير البشري في صلب العملية. يتم تدقيق بيانات الذكاء الاصطناعي إطاراً بإطار بواسطة أبطال العالم لـ WKF. يتحقق محللونا يدوياً من كل إشارة عضلية وتغير مكاني، مما يضمن أن الاستخبارات المقدمة للاتحادات الوطنية دقيقة بنسبة 100% وقابلة للتنفيذ المباشر."
      ]
    }
  }
};

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { locale } = useLanguage();
  
  const id = params.id as string;
  const isArabic = locale === "ar";
  
  // Fetch article
  const currentLang = isArabic ? "ar" : "en";
  const article = ARTICLES_DATA[currentLang][id];

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
              {article.category}
            </span>
            <h1 className="font-condensed text-3xl sm:text-4xl font-extrabold tracking-wide text-kompass-text uppercase leading-tight">
              {article.title}
            </h1>
            <div className="mt-3 flex items-center gap-4 font-mono text-[10px] text-kompass-text/40">
              <span>{isArabic ? `وقت القراءة: ${article.readTime}` : `READING TIME: ${article.readTime}`}</span>
              <span>·</span>
              <span>{isArabic ? "مستوى السرية: آمن" : "CONFIDENTIALITY: SECURED"}</span>
            </div>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-6 text-sm sm:text-base text-kompass-text/80 leading-relaxed font-sans">
            {article.paragraphs.map((p, idx) => (
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
