import { supabase, isSupabaseConfigured } from "./supabase";

export interface Lead {
  id: string;
  name: string;
  contact: string;
  role: string;
  division: string;
  weight: string;
  notes: string;
  status: "New" | "Contacted" | "Proposal Sent" | "Closed";
  created_at: string;
}

export interface CompetitorProfile {
  id: string;
  name: string;
  country: string;
  weight: string;
  style: string;
  strengths: string;
  vulnerabilities: string;
  tendencies: string;
  created_at?: string;
}

// Initial mock data for fallback
const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Malek Gomaa",
    contact: "malek.gomaa@wkf-egypt.org",
    role: "National Team Coach",
    division: "seniors_male",
    weight: "Male Kumite: -75 kg",
    notes: "Requesting full tactical briefing roster for three main rivals prior to World Championships in Budapest.",
    status: "Proposal Sent",
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "lead-2",
    name: "Aisha Al-Sayed",
    contact: "+971 50 123 4567",
    role: "Athlete",
    division: "seniors_female",
    weight: "Female Kumite: -61 kg",
    notes: "Interested in the EDGE match-day card subscription for WKF Premier League Cairo.",
    status: "New",
    created_at: new Date(Date.now() - 36000000).toISOString()
  }
];

const INITIAL_PROFILES: CompetitorProfile[] = [
  {
    id: "profile-1",
    name: "Kenji Sato",
    country: "Japan",
    weight: "Male Kumite -75kg",
    style: "Counter-Striker / Ma-ai Controller",
    strengths: "Chudan Gyaku-Zuki counters (92% accuracy), lateral right escape route.",
    vulnerabilities: "Unconscious lead shoulder drop before Kizami-Zuki; rear heel lift before Gyaku-Zuki.",
    tendencies: "Draws opponents into mid-zone, commits to warning sequences in the final 30 seconds if score is level."
  },
  {
    id: "profile-2",
    name: "Rafael Aghayev",
    country: "Azerbaijan",
    weight: "Male Kumite -75kg",
    style: "In-fighter / Tactical Equalizer",
    strengths: "Elite close-range sweep (Ashi-Barai), rapid head-line Mawashi-Geri hooks.",
    vulnerabilities: "Gaze lock bias right before launching sweep, slight hip rotation drop under double feints.",
    tendencies: "Uses high lateral pressure to trap opponents against boundary line, initiates clinches immediately."
  }
];

// Helper to access localStorage safely
const getStorageItem = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};

const setStorageItem = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
};

/* ============================================================================
   LEADS API
   ============================================================================ */
export async function getLeads(): Promise<Lead[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as Lead[];
    console.error("Supabase leads error:", error);
  }

  // Fallback
  const stored = getStorageItem("kompass_leads");
  if (!stored) {
    setStorageItem("kompass_leads", JSON.stringify(INITIAL_LEADS));
    return INITIAL_LEADS;
  }
  return JSON.parse(stored);
}

export async function saveLead(lead: Omit<Lead, "id" | "status" | "created_at">): Promise<Lead> {
  const newLead: Lead = {
    ...lead,
    id: "lead-" + Math.random().toString(36).substr(2, 9),
    status: "New",
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("leads")
      .insert([newLead])
      .select();
    if (!error && data && data[0]) return data[0] as Lead;
    console.error("Supabase save lead error:", error);
  }

  // Fallback
  const leads = await getLeads();
  leads.unshift(newLead);
  setStorageItem("kompass_leads", JSON.stringify(leads));
  return newLead;
}

export async function updateLeadStatus(id: string, status: Lead["status"]): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);
    if (!error) return true;
    console.error("Supabase update status error:", error);
  }

  // Fallback
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index !== -1) {
    leads[index].status = status;
    setStorageItem("kompass_leads", JSON.stringify(leads));
    return true;
  }
  return false;
}

/* ============================================================================
   SITE CONTENT OVERRIDES API
   ============================================================================ */
export async function getSiteContentOverrides(): Promise<Record<string, string>> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value");
    if (!error && data) {
      const overrides: Record<string, string> = {};
      data.forEach((item: { key: string; value: string }) => {
        overrides[item.key] = item.value;
      });
      return overrides;
    }
    console.error("Supabase site content error:", error);
  }

  // Fallback
  const stored = getStorageItem("kompass_site_content");
  return stored ? JSON.parse(stored) : {};
}

export async function saveSiteContentOverride(key: string, value: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value }, { onConflict: "key" });
    if (!error) return true;
    console.error("Supabase save site content error:", error);
  }

  // Fallback
  const overrides = await getSiteContentOverrides();
  overrides[key] = value;
  setStorageItem("kompass_site_content", JSON.stringify(overrides));
  return true;
}

/* ============================================================================
   COMPETITOR DOSSIERS CRUD API
   ============================================================================ */
export async function getCompetitorProfiles(): Promise<CompetitorProfile[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("competitor_profiles")
      .select("*")
      .order("name", { ascending: true });
    if (!error && data) return data as CompetitorProfile[];
    console.error("Supabase profiles error:", error);
  }

  // Fallback
  const stored = getStorageItem("kompass_profiles");
  if (!stored) {
    setStorageItem("kompass_profiles", JSON.stringify(INITIAL_PROFILES));
    return INITIAL_PROFILES;
  }
  return JSON.parse(stored);
}

export async function saveCompetitorProfile(profile: Omit<CompetitorProfile, "id"> & { id?: string }): Promise<CompetitorProfile> {
  const isEdit = !!profile.id;
  const targetProfile: CompetitorProfile = {
    ...profile,
    id: isEdit ? (profile.id as string) : "profile-" + Math.random().toString(36).substr(2, 9),
    created_at: profile.created_at || new Date().toISOString()
  } as CompetitorProfile;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = isEdit
      ? await supabase.from("competitor_profiles").update(targetProfile).eq("id", profile.id).select()
      : await supabase.from("competitor_profiles").insert([targetProfile]).select();
    if (!error && data && data[0]) return data[0] as CompetitorProfile;
    console.error("Supabase profile save error:", error);
  }

  // Fallback
  const profiles = await getCompetitorProfiles();
  if (isEdit) {
    const index = profiles.findIndex((p) => p.id === profile.id);
    if (index !== -1) {
      profiles[index] = targetProfile;
    }
  } else {
    profiles.push(targetProfile);
  }
  setStorageItem("kompass_profiles", JSON.stringify(profiles));
  return targetProfile;
}

export async function deleteCompetitorProfile(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("competitor_profiles")
      .delete()
      .eq("id", id);
    if (!error) return true;
    console.error("Supabase profile delete error:", error);
  }

  // Fallback
  const profiles = await getCompetitorProfiles();
  const filtered = profiles.filter((p) => p.id !== id);
  setStorageItem("kompass_profiles", JSON.stringify(filtered));
  return true;
}

/* ============================================================================
   INSIGHTS ARTICLES CMS API
   ============================================================================ */
export interface InsightArticle {
  id: string;
  date: string;
  category_en: string;
  category_ar: string;
  title_en: string;
  title_ar: string;
  read_time_en: string;
  read_time_ar: string;
  paragraphs_en: string[];
  paragraphs_ar: string[];
  created_at?: string;
}

const INITIAL_ARTICLES: InsightArticle[] = [
  {
    id: "1",
    date: "2026-08-15",
    category_en: "METHOD",
    category_ar: "منهجية",
    title_en: "Inside the KID Framework: The Science of Stance Telemetry",
    title_ar: "داخل إطار عمل KID: علم قياس حركة وتمركز اللاعبين",
    read_time_en: "6 Min",
    read_time_ar: "٦ دقائق",
    paragraphs_en: [
      "In the high-velocity domain of elite WKF kumite, waiting for an opponent to initiate a strike is a high-risk gamble. The Karate Intelligence Data (KID) framework operates on the premise that physical actions do not happen in isolation; they are preceded by micro-adjustments in stance, load, and muscle tension. Stance telemetry is the systematic capture and analysis of these pre-ignition signals.",
      "By focusing on the center of gravity and foot loading distribution, our telemetry models map how WKF athletes anchor themselves before launching high-point techniques. For example, a stance bias analysis of top-tier athletes indicates that individuals who favor lead-foot attacks often micro-compress their knees or shift 5% more weight to the rear foot exactly 200ms to 300ms before release. These tells are invisible to the naked eye but become distinct, actionable signals under frame-level expert verification.",
      "Understanding these mechanics allows coaches and athletes to decode MA-AI (combat distance) dynamically. Instead of guessing when a rival will strike, tactical corners can read physical alignment in real-time, structuring sparring models around real, physical indicators rather than speculative guess work."
    ],
    paragraphs_ar: [
      "في بطولات الكوميتيه النخبوية التابعة لـ WKF، يعد انتظار هجوم الخصم مجازفة عالية المخاطر. يعتمد إطار عمل Karate Intelligence Data (KID) على فرضية أن الحركات القتالية لا تحدث بشكل منفصل، بل تسبقها تعديلات دقيقة في الارتكاز، والوزن، وتوتر العضلات. استخبارات تمركز اللاعبين هي الاستخراج المنهجي والتحليل الفني لهذه الإشارات المبكرة.",
      "من خلال التركيز على مركز الجاذبية وتوزيع الأحمال على القدمين، ترسم نماذجنا التكتيكية كيفية تمركز لاعبي WKF قبل إطلاق الضربات عالية النقاط. على سبيل المثال، يوضح تحليل تمركز اللاعبين النخبة أن أولئك الذين يفضلون هجمات القدم الأمامية غالباً ما يقومون بثني الركبة قليلاً أو نقل 5% من وزنهم إلى القدم الخلفية قبل 200 إلى 300 ملّي ثانية من الهجوم. هذه المؤشرات غير مرئية بالعين المجردة ولكنها تصبح واضحة وموثوقة تحت تدقيق بطل العالم.",
      "يتيح فهم هذه الميكانيكيات للمدربين واللاعبين فك شفرة مسافة المواجهة (Ma-ai) بشكل ديناميكي. وبدلاً من تخمين توقيت ضربة الخصم، يمكن للمنتخبات قراءة محاذاة الخصم الجسدية في الوقت الفعلي، وتصميم تدريبات المحاكاة بناءً على مؤشرات حقيقية بدلاً من التخمين."
    ]
  },
  {
    id: "2",
    date: "2026-08-01",
    category_en: "TELLS LOG",
    category_ar: "قرائن الحركة",
    title_en: "What a 300ms Gaze Tell Actually Means on the International Circuit",
    title_ar: "ماذا تعني قرينة النظر التي تستغرق 300 ملّي ثانية في النزالات الدولية؟",
    read_time_en: "4 Min",
    read_time_ar: "٤ دقائق",
    paragraphs_en: [
      "At the WKF Premier League level, split-second tells make the difference between a podium finish and early elimination. Among the physical cues tracked in our secure inventory, gaze locks are highly reliable predictors of combat technique. A gaze lock occurs when an athlete fixes their focus on a specific zone—often the chest or midsection—just before launching a targeted attack.",
      "Statistical telemetry indicates that a gaze lock lasting between 250ms and 350ms exhibits a 85% correlation with foot sweeps (Ashi-Barai) or low-line kicks. This brief visual lock represents a subconscious target validation window where the competitor aligns their distance before committing. When caught on frame-verified match tape, it serves as an immediate trigger for a preemptive counter.",
      "To utilize this on the mat, athletes are trained to recognize the sequence: the rival's gaze locks, their rear heel lifts, and the balance shifts. By understanding the timing of these sub-second tells, athletes can execute their exit vectors or launch counter-strikes before the opponent's technique has even cleared the floor."
    ],
    paragraphs_ar: [
      "على مستوى الدوري الممتاز WKF، تحدد أجزاء من الثانية الفارق بين الفوز بالميدالية والخروج المبكر. ومن بين المؤشرات الجسدية التي نتتبعها في سجلنا الآمن، تعتبر قرائن النظر مؤشرات دقيقة للتنبؤ بالحركات القتالية. تحدث قرينة النظر عندما يركز اللاعب نظره على منطقة معينة—غالباً الصدر أو البطن—قبل إطلاق الهجوم مباشرة.",
      "تشير البيانات التحليلية إلى أن تركيز النظر الذي يستمر ما بين 250 إلى 350 ملّي ثانية يرتبط بنسبة 85% بركلات القدم (Ashi-Barai) أو الركلات السفلية. يمثل هذا التركيز البصري القصير نافذة تحقق لا واعية يقوم فيها المنافس بضبط المسافة قبل الهجوم. وعند التقاطه بالفيديو الموثق إطاراً بإطار، فإنه يوفر فرصة فورية لشن هجوم مضاد استباقي.",
      "لاستغلال ذلك على البساط، يتم تدريب اللاعبين على التعرف على التسلسل الحركي للخصم: تركيز النظر، ثم رفع الكعب الخلفي، ثم تحول الوزن. من خلال فهم هذا التسلسل التكتيكي، يمكن للاعب تنفيذ مسار الهروب الجانبي أو شن ضربات مضادة قبل أن تكتمل حركة الخصم."
    ]
  },
  {
    id: "3",
    date: "2026-07-22",
    category_en: "TACTICAL",
    category_ar: "تكتيكي",
    title_en: "Reading the Samdan Formula: Countering Heavy Front-Foot Aggressors",
    title_ar: "قراءة معادلة سمدان التكتيكية: مواجهة المهاجمين ذوي الارتكاز الأمامي الثقيل",
    read_time_en: "8 Min",
    read_time_ar: "٨ دقائق",
    paragraphs_en: [
      "The 'Samdan Formula' represents one of the most challenging tactical styles in modern Kumite: the heavy front-foot aggressor. These athletes apply continuous forward pressure, using their lead stance to occupy the critical MA-AI zone and deny their opponents the space needed to structure clean attacks.",
      "Countering this style requires precise spatial discipline. Our tactical blueprints emphasize the use of lateral right-side escapes to bypass the linear path of the aggressor. By executing a high feint (Kizami-Zuki trajectory) to force the aggressor into a premature counter-block, the defending athlete can instantly break their balance. The locked front-foot alignment of the aggressor prevents them from adjusting their hips, leaving them highly vulnerable to low-line sweeps.",
      "By studying sequence timelines of front-foot athletes, coaches can build specific sparring simulations. The goal is to draw the rival's heavy commitment forward, trigger their predictable tell, and execute the counter-technique at the exact moment their weight distribution locks."
    ],
    paragraphs_ar: [
      "تتطلب مواجهة هذا الأسلوب انضباطاً حركياً دقيقاً. تؤكد مخططاتنا التكتيكية على استخدام الهروب الجانبي الأيمن لتجاوز المسار الخطي للمهاجم. ومن خلال تنفيذ حركة تمويهية علوية (على خط لكمة Kizami-Zuki) لإجبار المهاجم على شن ضربة مضادة متسرعة، يمكن للاعب المدافع كسر توازن الخصم فوراً. يمنعه الارتكاز الثقيل على قدمه الأمامية من تعديل وركيه، مما يجعله عرضة تماماً لكنس القدم السفلي.",
      "من خلال دراسة الجدول الزمني لتسلسل حركات لاعبي الارتكاز الأمامي، يمكن للمدربين بناء تدريبات محاكاة محددة. الهدف هو استدراج الخصم للاندفاع الكامل للأمام، وتحفيز إشاراته الحركية المتوقعة، وتنفيذ الضربات المضادة في اللحظة التي يقفل فيها وزنه."
    ]
  },
  {
    id: "4",
    date: "2026-07-10",
    category_en: "EDITORIAL",
    category_ar: "افتتاحية",
    title_en: "Why Automated AI Isn't the Product: The Power of Human Audit",
    title_ar: "لماذا لا يكون الذكاء الاصطناعي التلقائي هو المنتج النهائي: قوة التدقيق البشري",
    read_time_en: "5 Min",
    read_time_ar: "٥ دقائق",
    paragraphs_en: [
      "In the rush to integrate artificial intelligence into sports analytics, many providers have opted for fully automated solutions. Raw computer-vision models are programmed to track skeletal movement and output automated predictions. However, on the elite international karate circuit, automated AI alone is not only insufficient—it is dangerous.",
      "WKF Kumite is defined by rapid exchanges, micro-feints, and complex spatial dynamics. Standard automated models cannot differentiate between a genuine preparatory stance adjust and a deliberate tactical feint designed to feed false data. This results in high error rates and unreliable tells that can lead to tactical failure in high-stakes matches.",
      "This is why the KOMPASS pipeline mandates a hybrid expert-in-the-loop workflow. First-pass computer-vision data is audited frame-by-frame by international champions. Our analysts verify every muscle tell and spatial change manually, guaranteeing that the intelligence delivered to national federations is 100% accurate and actionable. We don't ship automated guesswork; we deliver human-signed tactical direction."
    ],
    paragraphs_ar: [
      "في السباق نحو دمج الذكاء الاصطناعي في التحليلات الرياضية، اختار العديد من مقدمي الخدمة الحلول التلقائية بالكامل. يتم برمجة نماذج الرؤية الحاسوبية البسيطة لتتبع الهيكل الحركي وتصدير تنبؤات آلية. ومع ذلك، على مستوى بطولات الكاراتيه الدولية النخبوية، فإن الاعتماد على الذكاء الاصطناعي التلقائي وحده ليس غير كافٍ فحسب، بل هو أمر خطير.",
      "تتميز نزالات الكوميتيه بالسرعة الفائقة، والتمويهات الحركية الدقيقة، والديناميكيات المكانية المعقدة. لا تستطيع النماذج التلقائية التمييز بين تعديل التمركز الفعلي والحركة التمويهية المتعمدة لتغذية النموذج ببيانات خاطئة. يؤدي هذا إلى معدلات خطأ عالية وإشارات غير موثوقة قد تتسبب في الفشل التكتيكي خلال المباريات الحاسمة.",
      "هذا هو السبب في أن كومباس تعتمد على مسار عمل هجين يضع الخبير البشري في صلب العملية. يتم تدقيق بيانات الذكاء الاصطناعي إطاراً بإطار بواسطة أبطال العالم لـ WKF. يتحقق محللونا يدوياً من كل إشارة عضلية وتغير مكاني، مما يضمن أن الاستخبارات المقدمة للاتحادات الوطنية دقيقة بنسبة 100% وقابلة للتنفيذ المباشر."
    ]
  }
];

export async function getInsightsArticles(): Promise<InsightArticle[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("insights_articles")
      .select("*")
      .order("date", { ascending: false });
    if (!error && data) return data as InsightArticle[];
    console.error("Supabase insights error:", error);
  }

  // Fallback
  const stored = getStorageItem("kompass_insights_articles");
  if (!stored) {
    setStorageItem("kompass_insights_articles", JSON.stringify(INITIAL_ARTICLES));
    return INITIAL_ARTICLES;
  }
  return JSON.parse(stored);
}

export async function saveInsightsArticle(article: Omit<InsightArticle, "id"> & { id?: string }): Promise<InsightArticle> {
  const isEdit = !!article.id;
  const targetArticle: InsightArticle = {
    ...article,
    id: isEdit ? (article.id as string) : "article-" + Math.random().toString(36).substr(2, 9),
    created_at: article.created_at || new Date().toISOString()
  } as InsightArticle;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = isEdit
      ? await supabase.from("insights_articles").update(targetArticle).eq("id", article.id).select()
      : await supabase.from("insights_articles").insert([targetArticle]).select();
    if (!error && data && data[0]) return data[0] as InsightArticle;
    console.error("Supabase article save error:", error);
  }

  // Fallback
  const articles = await getInsightsArticles();
  if (isEdit) {
    const index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      articles[index] = targetArticle;
    }
  } else {
    articles.unshift(targetArticle);
  }
  setStorageItem("kompass_insights_articles", JSON.stringify(articles));
  return targetArticle;
}

export async function deleteInsightsArticle(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("insights_articles")
      .delete()
      .eq("id", id);
    if (!error) return true;
    console.error("Supabase article delete error:", error);
  }

  // Fallback
  const articles = await getInsightsArticles();
  const filtered = articles.filter((a) => a.id !== id);
  setStorageItem("kompass_insights_articles", JSON.stringify(filtered));
  return true;
}

