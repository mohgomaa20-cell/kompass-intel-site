export interface ContentTranslation {
  // Navigation
  nav_idea: string;
  nav_founders: string;
  nav_ecosystem: string;
  nav_method: string;
  nav_insight: string;
  nav_pricing: string;
  nav_contact: string;
  btn_cta_sample: string;
  btn_login: string;
  btn_request_access: string;

  // Hero
  hero_tagline: string;
  hero_title: string;
  hero_desc: string;
  btn_cta_hero: string;
  btn_cta_sec: string;
  hero_credentials: string;

  // Process Flow Strip
  process_title: string;
  p_step1: string;
  p_step2: string;
  p_step3: string;
  p_step4: string;

  // Product Showcase (Ecosystem)
  products_subtitle: string;
  products_title: string;
  products: {
    id: string;
    badge: string;
    title: string;
    desc: string;
    link_text: string;
    metric_label: string;
    metric_value: string;
  }[];

  // Connected Solutions
  solutions_subtitle: string;
  solutions_title: string;
  solutions_desc: string;
  solutions_learn_more: string;

  // Telemetry Dashboard Demo
  demo_subtitle: string;
  demo_title: string;
  tab_profile: string;
  tab_telemetry: string;
  tab_tells: string;
  prof_name: string;
  prof_cat: string;
  prof_lbl1: string;
  prof_val1: string;
  prof_lbl2: string;
  prof_val2: string;
  prof_lbl3: string;
  prof_val3: string;
  prof_lbl4: string;
  prof_val4: string;
  m_val1: string;
  m_lbl1: string;
  m_val2: string;
  m_lbl2: string;
  insight_p: string;
  chart_t1: string;
  leg_c1: string;
  leg_c2: string;
  leg_c3: string;
  stat_t1: string;
  lbl_d1: string;
  lbl_d2: string;
  lbl_d3: string;
  tells_p: string;
  th_tell: string;
  th_trigger: string;
  th_timing: string;
  th_reliability: string;
  tells_list: {
    tell: string;
    trigger: string;
    timing: string;
    reliability: string;
    rating: "high" | "medium";
  }[];

  // Proof Strip
  proof_items: {
    value: string;
    label: string;
    tag: string;
  }[];

  // Testimonials
  testimonials_subtitle: string;
  testimonials_title: string;
  testimonials: {
    quote: string;
    author: string;
    role: string;
    tag: string;
  }[];
  testimonials_fallback: string;

  // Insights / News Grid
  insights_subtitle: string;
  insights_title: string;
  insights: {
    date: string;
    title: string;
    category: string;
    read_time: string;
  }[];

  // Closing CTA
  closing_title: string;
  closing_desc: string;
  closing_btn: string;

  // Contact / Lead Form
  contact_subtitle: string;
  contact_title: string;
  contact_disclaimer: string;
  c_lbl_phone: string;
  c_val_phone: string;
  c_lbl_email: string;
  c_val_email: string;
  c_lbl_loc: string;
  c_val_loc: string;
  f_lbl_name: string;
  f_lbl_contact: string;
  f_lbl_role: string;
  f_lbl_age: string;
  f_lbl_cat: string;
  f_lbl_other: string;
  f_lbl_notes: string;
  f_opt_role_select: string;
  f_opt_age_select: string;
  f_opt_cat_select: string;
  btn_submit: string;
  msg_success: string;
  msg_error: string;

  // Footer
  foot_desc: string;
  foot_rights: string;
  foot_col_reports: string;
  foot_col_solutions: string;
  foot_col_company: string;
  foot_col_legal: string;
}

export const content: Record<"en" | "ar", ContentTranslation> = {
  en: {
    nav_idea: "The Concept",
    nav_founders: "Founders",
    nav_ecosystem: "Ecosystem",
    nav_method: "Method",
    nav_insight: "Insights",
    nav_pricing: "Ecosystem Plans",
    nav_contact: "Contact",
    btn_cta_sample: "Request Sample",
    btn_login: "Log In",
    btn_request_access: "Request Access",

    hero_tagline: "FIRST-MOVE INTELLIGENCE · WKF COMPETITOR ANALYSIS",
    hero_title: "WIN BEFORE IT HAPPENS.",
    hero_desc: "FROM DATA TO DIRECTION. Frame-level, video-verified opponent intelligence dossiers for national federations, elite coaches, and athletes competing at the WKF Premier League level.",
    btn_cta_hero: "Request a Sample Report",
    btn_cta_sec: "See the Method",
    hero_credentials: "Founded by WKF World Champions. Validated by WKF World Champions. Built from inside elite competition.",

    process_title: "PROCESS FLOW",
    p_step1: "ANALYZE",
    p_step2: "DECIDE",
    p_step3: "ACT",
    p_step4: "WIN",

    products_subtitle: "ECOSYSTEM MAPPING",
    products_title: "Ecosystem Tiers",
    products: [
      {
        id: "kompass",
        badge: "01 / NAVIGATES YOU",
        title: "KOMPASS",
        desc: "Competitor video dossiers & high-precision opponent mapping. Get frame-level tactical footprints of international rivals.",
        link_text: "Learn More",
        metric_label: "Average Lead Time Surfaced",
        metric_value: "133ms"
      },
      {
        id: "kontrol",
        badge: "02 / PREPARES YOU",
        title: "KONTROL",
        desc: "The complete strategic preparation platform. Translate reports into custom counter drills, sparring blueprints, and routines.",
        link_text: "Learn More",
        metric_label: "Verification Level",
        metric_value: "Frame-by-Frame"
      },
      {
        id: "edge",
        badge: "03 / ARMS YOU",
        title: "EDGE",
        desc: "The match-day intelligence card. Distilled, sub-second tactical tells and actions to review 10 minutes before stepping onto the mat.",
        link_text: "Learn More",
        metric_label: "Verified Indicators",
        metric_value: "3 Tells/Rival"
      }
    ],

    solutions_subtitle: "CONNECTED SOLUTIONS",
    solutions_title: "One method. Every level of competition.",
    solutions_desc: "We process frame-verified match data through a hybrid expert-in-the-loop workflow. Our proprietary intelligence pipeline combines advanced video analysis technology with frame-level expert validation by international champions. No automated guesswork — only verified tactical instructions designed to be memorized in the prep room and applied in the corner.",
    solutions_learn_more: "Explore Method & System",

    demo_subtitle: "LIVE DEMO",
    demo_title: "Sample Opponent Dossier",
    tab_profile: "Opponent Profile",
    tab_telemetry: "Distance & Footwork",
    tab_tells: "Signals & Tells",
    prof_name: "Kenji Sato (JPN)",
    prof_cat: "Senior Male Kumite -75kg",
    prof_lbl1: "Tactical Style",
    prof_val1: "Counter-Striker / Ma-ai Controller",
    prof_lbl2: "Preferred Technique",
    prof_val2: "Chudan Gyaku-Zuki (Rear fist punch to body)",
    prof_lbl3: "Stance Bias",
    prof_val3: "Left-side forward (Hidari Shizentai) - 82%",
    prof_lbl4: "Critical Danger Time",
    prof_val4: "Final 30 seconds of the match (under score pressure)",
    m_val1: "86%",
    m_lbl1: "Tactical Index",
    m_val2: "92%",
    m_lbl2: "Counter Accuracy",
    insight_p: "Kenji Sato uses high lateral movement to draw opponents into the mid-zone before launching a rapid rear-hand body thrust. Direct lunges without preparatory feints exhibit a 92% counter-success rate for him. Recommended strategy: Feint high to force a premature back-step, then execute low-line sweep.",
    chart_t1: "Spatial Zone Entry Distribution (Ma-ai)",
    leg_c1: "Safe (To-ma)",
    leg_c2: "Critical Strike (Ma)",
    leg_c3: "Clinch (Chika-ma)",
    stat_t1: "Movement Direction Vectors",
    lbl_d1: "Lateral Right Escapes",
    lbl_d2: "Backward Retreats",
    lbl_d3: "Direct Forward Pressure",
    tells_p: "Our signature tells inventory logs sub-second physical tells captured by video telemetry, validated by champion-level analysis.",
    th_tell: "Physical Signal / Tell",
    th_trigger: "Associated Technique",
    th_timing: "Timing Window",
    th_reliability: "Reliability Rating",
    tells_list: [
      {
        tell: "Subtle drop of lead shoulder",
        trigger: "Kizami-Zuki (Lead jab)",
        timing: "0.22s before release",
        reliability: "High (88%)",
        rating: "high"
      },
      {
        tell: "Rear heel lift & hip rotation lock",
        trigger: "Gyaku-Zuki (Rear punch)",
        timing: "0.31s before release",
        reliability: "High (94%)",
        rating: "high"
      },
      {
        tell: "Small step outward with lead foot",
        trigger: "Mawashi-Geri (Roundhouse kick)",
        timing: "0.45s before sweep/kick",
        reliability: "Medium (72%)",
        rating: "medium"
      }
    ],

    proof_items: [
      { value: "133ms", label: "Average signal lead time surfaced per report", tag: "TIMING VERIFIED" },
      { value: "7", label: "Analytical sections per full competitor profile", tag: "KID FRAMEWORK" },
      { value: "4-match", label: "Minimum cross-analysis before a finding is confirmed", tag: "CONFIRMED — MULTI-MATCH" }
    ],

    testimonials_subtitle: "VALIDATORS",
    testimonials_title: "In-Corner Verification",
    testimonials: [],
    testimonials_fallback: "KOMPASS is currently partnering with national federations preparing for the 2026 WKF competition cycle. Client references available upon request.",

    insights_subtitle: "INTELLIGENCE GRID",
    insights_title: "Tactical Briefings & Insights",
    insights: [
      { date: "2026-08-15", title: "Inside the KID Framework: The Science of Stance Telemetry", category: "METHOD", read_time: "6 Min" },
      { date: "2026-08-01", title: "What a 300ms Gaze Tell Actually Means on the International Circuit", category: "TELLS LOG", read_time: "4 Min" },
      { date: "2026-07-22", title: "Reading the Samdan Formula: Countering Heavy Front-Foot Aggressors", category: "TACTICAL", read_time: "8 Min" },
      { date: "2026-07-10", title: "Why Automated AI Isn't the Product: The Power of Human Audit", category: "EDITORIAL", read_time: "5 Min" }
    ],

    closing_title: "Ready to see what your opponent isn't showing you?",
    closing_desc: "Get in touch with an analyst to request a redacted sample dossier or setup team-wide WKF competitor tracking.",
    closing_btn: "Request a Sample Report",

    contact_subtitle: "SECURE ACCESS",
    contact_title: "Initiate Tactical Consultation",
    contact_disclaimer: "All consultation requests are handled confidentially. Intelligence deliverables are prepared exclusively for the requesting federation or coaching staff and are not shared with third parties.",
    c_lbl_phone: "Analyst Secure Line",
    c_val_phone: "+20 120 123 4567",
    c_lbl_email: "Secure Inquiries",
    c_val_email: "intel@kompass-analysis.com",
    c_lbl_loc: "Operations",
    c_val_loc: "Cairo, Egypt / Dubai, UAE",
    f_lbl_name: "Full Name",
    f_lbl_contact: "Email / Secure Phone",
    f_lbl_role: "Tactical Role",
    f_lbl_age: "Competition Division",
    f_lbl_cat: "Weight Category",
    f_lbl_other: "Specify Category / Other Details",
    f_lbl_notes: "Additional Athlete or Federation Context",
    f_opt_role_select: "Select your role...",
    f_opt_age_select: "Select division...",
    f_opt_cat_select: "Select weight category...",
    btn_submit: "Request Tactical Consultation",
    msg_success: "Tactical request submitted successfully. A lead analyst will contact you within 12 hours.",
    msg_error: "Please complete all required fields correctly.",

    foot_desc: "KOMPASS is a karate performance intelligence brand turning raw competitive match data into clear tactical direction.\n\nFounded by Malek Salama — WKF World Champion and architectural engineer — alongside a world champion technical validator. Every report carries expert sign-off before delivery.",
    foot_rights: "All Rights Reserved.",
    foot_col_reports: "ECOSYSTEM",
    foot_col_solutions: "SOLUTIONS",
    foot_col_company: "COMPANY",
    foot_col_legal: "LEGAL"
  },
  ar: {
    nav_idea: "الفكرة",
    nav_founders: "المؤسسون",
    nav_ecosystem: "النظام المتكامل",
    nav_method: "المنهجية",
    nav_insight: "التحليلات",
    nav_pricing: "باقات المنظومة",
    nav_contact: "اتصل بنا",
    btn_cta_sample: "طلب عينة تقرير",
    btn_login: "تسجيل الدخول",
    btn_request_access: "طلب الوصول",

    hero_tagline: "استخبارات الخطوة الأولى · تحليل منافسي WKF",
    hero_title: "الفوز قبل أن يحدث.",
    hero_desc: "من البيانات إلى الاتجاه. ملفات استخباراتية تفصيلية وموثقة بالفيديو لخصومك على مستوى الإطار، مخصصة للاتحادات الوطنية، والمدربين النخبة، والرياضيين المنافسين في الدوري الممتاز WKF.",
    btn_cta_hero: "اطلب عينة تقرير مجانية",
    btn_cta_sec: "استكشف المنهجية",
    hero_credentials: "تأسست على يد أبطال العالم لـ WKF. تم التحقق منها بواسطة أبطال العالم لـ WKF. بنيت من داخل المنافسة النخبوية.",

    process_title: "خطوات العملية التكتيكية",
    p_step1: "حلل",
    p_step2: "قرر",
    p_step3: "نفذ",
    p_step4: "افوز",

    products_subtitle: "منظومة الأداء المتكاملة",
    products_title: "أقسام المنظومة",
    products: [
      {
        id: "kompass",
        badge: "٠١ / يوجهك تكتيكياً",
        title: "KOMPASS",
        desc: "تقارير تكتيكية تفصيلية ومطابقة لملف الخصوم بالفيديو. احصل على البصمة التكتيكية إطاراً بإطار لمنافسيك الدوليين.",
        link_text: "اقرأ المزيد",
        metric_label: "متوسط وقت التنبؤ المستخرج",
        metric_value: "١٣٣ ملّي ثانية"
      },
      {
        id: "kontrol",
        badge: "٠٢ / يهيئك للمواجهة",
        title: "KONTROL",
        desc: "المنصة الاستراتيجية المتكاملة للتحضير. ترجم التقارير التكتيكية إلى تدريبات محاكاة ومخططات حركية مخصصة.",
        link_text: "اقرأ المزيد",
        metric_label: "مستوى التحقق الفني",
        metric_value: "إطار بإطار بالفيديو"
      },
      {
        id: "edge",
        badge: "٠٣ / يسلحك بالنزال",
        title: "EDGE",
        desc: "بطاقة تكتيكية مكثفة في يوم المباراة. إشارات وحوافز تكتيكية سريعة للمراجعة قبل ١٠ دقائق من الصعود للبساط.",
        link_text: "اقرأ المزيد",
        metric_label: "مؤشرات معتمدة لكل خصم",
        metric_value: "٣ إشارات حركية"
      }
    ],

    solutions_subtitle: "الحلول المتكاملة",
    solutions_title: "منهجية موحدة. لكل مستويات التنافس.",
    solutions_desc: "نعالج بيانات المباريات المعتمدة إطاراً بإطار عبر مسار عمل هجين. يجمع مسار عملنا الاستقصائي المبتكر بين تقنيات تحليل الفيديو المتقدمة والتدقيق البشري عالي الدقة إطاراً بإطار بواسطة أبطال دوليين. لا تخمين تلقائي — نوفر توجيهات تكتيكية دقيقة وموثقة يتم دراستها في غرفة الإعداد وتطبيقها في الكورنر.",
    solutions_learn_more: "استكشف المنهجية والنظام",

    demo_subtitle: "عرض تجريبي",
    demo_title: "نموذج لملف الخصم التكتيكي",
    tab_profile: "ملف الخصم",
    tab_telemetry: "المسافة وحركة القدمين",
    tab_tells: "الإشارات والقرائن",
    prof_name: "كينجي ساتو (اليابان)",
    prof_cat: "كوميتيه كبار - وزن تحت 75 كجم",
    prof_lbl1: "الأسلوب التكتيكي",
    prof_val1: "مدافع مضاد / متحكم بمسافة المواجهة (Ma-ai)",
    prof_lbl2: "التقنية المفضلة",
    prof_val2: "تشودان غياكو-زوكي (لكمة قبضة خلفية للمعدة)",
    prof_lbl3: "انحياز الارتكاز",
    prof_val3: "القدم اليسرى للأمام (هيداري شيزنتاي) - بنسبة 82%",
    prof_lbl4: "التوقيت الحرج للخطورة",
    prof_val4: "آخر 30 ثانية من النزال (تحت ضغط التأخر بالنقاط)",
    m_val1: "86%",
    m_lbl1: "مؤشر التكتيك",
    m_val2: "92%",
    m_lbl2: "دقة الضربات المضادة",
    insight_p: "يعتمد كينجي ساتو على الحركة الجانبية العالية لجذب المنافس إلى المنطقة المتوسطة قبل إطلاق لكمة قوية وسريعة باليد الخلفية. الاندفاع المباشر نحوه دون حركات تمويهية مسبقة يمنحه نسبة نجاح بالهجوم المضاد تبلغ 92%. الاستراتيجية المقترحة: تمويه بالهجوم العلوي لإجباره على التراجع، ثم تنفيذ كنس للقدم على الخط السفلي.",
    chart_t1: "توزيع مناطق التموضع المكاني (Ma-ai)",
    leg_c1: "آمن (To-ma)",
    leg_c2: "مسافة الضربة (Ma)",
    leg_c3: "الالتحام (Chika-ma)",
    stat_t1: "نواقل حركة القدمين والاتجاهات",
    lbl_d1: "الهروب الجانبي الأيمن",
    lbl_d2: "التراجع للخلف",
    lbl_d3: "الضغط المباشر للأمام",
    tells_p: "سجل قرائننا الحركية المميز يوثق الإشارات الجسدية التي تستغرق أجزاء من الثانية والمحسوبة بدقة عبر الفيديو الموثق بتدقيق بطل العالم.",
    th_tell: "البيان الحركي / القرينة",
    th_trigger: "التقنية المرتبطة بها",
    th_timing: "نافذة التوقيت",
    th_reliability: "مستوى الموثوقية",
    tells_list: [
      {
        tell: "انخفاض طفيف في كتف القيادة",
        trigger: "كيزامي-زوكي (لكمة خاطفة قيادية)",
        timing: "0.22 ثانية قبل الانطلاق",
        reliability: "مرتفع (88%)",
        rating: "high"
      },
      {
        tell: "رفع الكعب الخلفي وتثبيت دوران الحوض",
        trigger: "غياكو-زوكي (لكمة خلفية)",
        timing: "0.31 ثانية قبل الانطلاق",
        reliability: "مرتفع (94%)",
        rating: "high"
      },
      {
        tell: "خطوة صغيرة للخارج بالقدم الأمامية",
        trigger: "مواشي-جيري (ركلة دائرية)",
        timing: "0.45 ثانية قبل الركلة/الكنس",
        reliability: "متوسط (72%)",
        rating: "medium"
      }
    ],

    proof_items: [
      { value: "١٣٣ ملّي ثانية", label: "متوسط وقت التنبؤ التكتيكي المستخرج في كل تقرير", tag: "توقيت دقيق" },
      { value: "٧ أقسام", label: "الأقسام التحليلية المعتمدة لكل ملف خصم متكامل", tag: "إطار عمل KID" },
      { value: "٤ مباريات", label: "الحد الأدنى للمباريات المحللة قبل اعتماد أي استنتاج", tag: "مقارنات متعددة" }
    ],

    testimonials_subtitle: "شهادات المدربين واللاعبين",
    testimonials_title: "التحقق الميداني في الكورنر",
    testimonials: [],
    testimonials_fallback: "تتعاون كومباس حالياً مع اتحادات وطنية تستعد لدورة بطولات WKF لعام 2026. مراجع العملاء متاحة عند الطلب.",

    insights_subtitle: "شبكة الاستخبارات",
    insights_title: "إيجازات تكتيكية ومقالات تحليلية",
    insights: [
      { date: "2026-08-15", title: "داخل إطار عمل KID: علم قياس حركة وتمركز اللاعبين", category: "منهجية", read_time: "٦ دقائق" },
      { date: "2026-08-01", title: "ماذا تعني قرينة النظر التي تستغرق 300 ملّي ثانية في النزالات الدولية؟", category: "قرائن الحركة", read_time: "٤ دقائق" },
      { date: "2026-07-22", title: "قراءة معادلة سمدان التكتيكية: مواجهة المهاجمين ذوي الارتكاز الأمامي الثقيل", category: "تكتيكي", read_time: "٨ دقائق" },
      { date: "2026-07-10", title: "لماذا لا يكون الذكاء الاصطناعي التلقائي هو المنتج النهائي: قوة التدقيق البشري", category: "افتتاحية", read_time: "٥ دقائق" }
    ],

    closing_title: "هل أنت مستعد لرؤية ما يخفيه خصمك؟",
    closing_desc: "تواصل مع أحد المحللين التكتيكيين لطلب عينة تقرير سرية أو إعداد تتبع متكامل للاعبي WKF.",
    closing_btn: "اطلب عينة تقرير مجانية",

    contact_subtitle: "طلب الوصول الآمن",
    contact_title: "ابدأ استشارتك التكتيكية",
    contact_disclaimer: "يتم التعامل مع جميع طلبات الاستشارة بسرية تامة. يتم إعداد التقارير التكتيكية خصيصاً للاتحاد الرياضي أو الطاقم التدريبي مقدم الطلب، ولا يتم مشاركتها مع أي أطراف ثالثة.",
    c_lbl_phone: "خط المحلل الآمن",
    c_val_phone: "+20 120 123 4567",
    c_lbl_email: "الاستفسارات الآمنة",
    c_val_email: "intel@kompass-analysis.com",
    c_lbl_loc: "العمليات تكتيكية",
    c_val_loc: "القاهرة، مصر / دبي، الإمارات",
    f_lbl_name: "الاسم الكامل",
    f_lbl_contact: "البريد الإلكتروني / الهاتف الآمن",
    f_lbl_role: "الدور الرياضي",
    f_lbl_age: "الفئة السنية للتنافس",
    f_lbl_cat: "فئة الوزن الكوميتيه",
    f_lbl_other: "حدد الفئة أو تفاصيل أخرى",
    f_lbl_notes: "سياق إضافي عن اللاعب أو الاتحاد",
    f_opt_role_select: "اختر دورك الرياضي...",
    f_opt_age_select: "اختر الفئة السنية...",
    f_opt_cat_select: "اختر فئة الوزن...",
    btn_submit: "طلب استشارة تكتيكية",
    msg_success: "تم إرسال طلبك التكتيكي بنجاح. سيتصل بك كبير محللينا خلال 12 ساعة.",
    msg_error: "يرجى ملء جميع الحقول المطلوبة بشكل صحيح.",

    foot_desc: "كومباس هي علامة ذكاء أداء الكاراتيه الرائدة التي تحول بيانات المباريات المعتمدة إطاراً بإطار إلى اتجاه وتوجيه تكتيكي دقيق.\n\nتأسست على يد مالك سلامة — بطل العالم لـ WKF ومهندس معماري — إلى جانب مدقق فني بطل عالمي. كل تقرير يحمل موافقة الخبير قبل التسليم.",
    foot_rights: "جميع الحقوق محفوظة.",
    foot_col_reports: "المنظومة المتكاملة",
    foot_col_solutions: "الحلول",
    foot_col_company: "الشركة",
    foot_col_legal: "الشؤون القانونية"
  }
};

export const wkfCategories = {
  en: {
    seniors_male: ["Male Kumite: -60 kg", "Male Kumite: -67 kg", "Male Kumite: -75 kg", "Male Kumite: -84 kg", "Male Kumite: +84 kg"],
    seniors_female: ["Female Kumite: -50 kg", "Female Kumite: -55 kg", "Female Kumite: -61 kg", "Female Kumite: -68 kg", "Female Kumite: +68 kg"],
    u21_male: ["Male Kumite: -60 kg", "Male Kumite: -67 kg", "Male Kumite: -75 kg", "Male Kumite: -84 kg", "Male Kumite: +84 kg"],
    u21_female: ["Female Kumite: -50 kg", "Female Kumite: -55 kg", "Female Kumite: -61 kg", "Female Kumite: -68 kg", "Female Kumite: +68 kg"],
    juniors_male: ["Male Kumite: -55 kg", "Male Kumite: -61 kg", "Male Kumite: -68 kg", "Male Kumite: -76 kg", "Male Kumite: +76 kg"],
    juniors_female: ["Female Kumite: -48 kg", "Female Kumite: -53 kg", "Female Kumite: -59 kg", "Female Kumite: -66 kg", "Female Kumite: +66 kg"],
    cadets_male: ["Male Kumite: -52 kg", "Male Kumite: -57 kg", "Male Kumite: -63 kg", "Male Kumite: -70 kg", "Male Kumite: +70 kg"],
    cadets_female: ["Female Kumite: -47 kg", "Female Kumite: -54 kg", "Female Kumite: -61 kg", "Female Kumite: +61 kg"],
    u14_male: ["Male Kumite: -40 kg", "Male Kumite: -45 kg", "Male Kumite: -50 kg", "Male Kumite: -55 kg", "Male Kumite: +55 kg"],
    u14_female: ["Female Kumite: -42 kg", "Female Kumite: -47 kg", "Female Kumite: -52 kg", "Female Kumite: +52 kg"],
    team: ["Male Team Kumite", "Female Team Kumite"],
    other: ["Other / Open Category"]
  },
  ar: {
    seniors_male: ["كوميتيه رجال: -60 كجم", "كوميتيه رجال: -67 كجم", "كوميتيه رجال: -75 كجم", "كوميتيه رجال: -84 كجم", "كوميتيه رجال: +84 كجم"],
    seniors_female: ["كوميتيه سيدات: -50 كجم", "كوميتيه سيدات: -55 كجم", "كوميتيه سيدات: -61 كجم", "كوميتيه سيدات: -68 كجم", "كوميتيه سيدات: +68 كجم"],
    u21_male: ["كوميتيه رجال تحت 21: -60 كجم", "كوميتيه رجال تحت 21: -67 كجم", "كوميتيه رجال تحت 21: -75 كجم", "كوميتيه رجال تحت 21: -84 كجم", "كوميتيه رجال تحت 21: +84 كجم"],
    u21_female: ["كوميتيه سيدات تحت 21: -50 كجم", "كوميتيه سيدات تحت 21: -55 كجم", "كوميتيه سيدات تحت 21: -61 كجم", "كوميتيه سيدات تحت 21: -68 كجم", "كوميتيه سيدات تحت 21: +68 كجم"],
    juniors_male: ["كوميتيه شباب: -55 كجم", "كوميتيه شباب: -61 كجم", "كوميتيه شباب: -68 كجم", "كوميتيه شباب: -76 كجم", "كوميتيه شباب: +76 كجم"],
    juniors_female: ["كوميتيه شابات: -48 كجم", "كوميتيه شابات: -53 كجم", "كوميتيه شابات: -59 كجم", "كوميتيه شابات: -66 كجم", "كوميتيه شابات: +66 كجم"],
    cadets_male: ["كوميتيه ناشئين: -52 كجم", "كوميتيه ناشئين: -57 كجم", "كوميتيه ناشئين: -63 كجم", "كوميتيه ناشئين: -70 كجم", "كوميتيه ناشئين: +70 كجم"],
    cadets_female: ["كوميتيه ناشئات: -47 كجم", "كوميتيه ناشئات: -54 كجم", "كوميتيه ناشئات: -61 كجم", "كوميتيه ناشئات: +61 كجم"],
    u14_male: ["كوميتيه بنين تحت 14: -40 كجم", "كوميتيه بنين تحت 14: -45 كجم", "كوميتيه بنين تحت 14: -50 كجم", "كوميتيه بنين تحت 14: -55 كجم", "كوميتيه بنين تحت 14: +55 كجم"],
    u14_female: ["كوميتيه بنات تحت 14: -42 كجم", "كوميتيه بنات تحت 14: -47 كجم", "كوميتيه بنات تحت 14: -52 كجم", "كوميتيه بنات تحت 14: +52 كجم"],
    team: ["كوميتيه جماعي رجال", "كوميتيه جماعي سيدات"],
    other: ["أخرى / فئة مفتوحة"]
  }
};
