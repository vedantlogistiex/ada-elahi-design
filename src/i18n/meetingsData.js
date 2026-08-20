export const meetingsData = {
  ops: {
    id: "ADA-ELT-2026-08-042",
    title: { en: "Operational Performance Review", ar: "مراجعة الأداء التشغيلي" },
    subtitle: { en: "Today 10:30 AM · 45 min audio · Synthesized in 42s", ar: "اليوم 10:30 صباحاً · 45 دقيقة صوتية · تم التلخيص في 42 ثانية" },
    status: "draft",
    summary: {
      en: "ELT addressed afternoon South Apron turnaround compression and GCAA runway noise abatement compliance. Elahi automatically reconciled live slot data and dispatched binding baseline instructions.",
      ar: "ناقش فريق القيادة انكماش هوامش استدارة الساحة الجنوبية والامتثال لتوجيه خفض الضوضاء. قام إلهي تلقائياً بتحديث مصفوفة الفترات وإرسال تعليمات ملزمة."
    },
    decisions: [
      {
        title: { en: "Automated Stand 24–28 Buffer Extension (+12 min)", ar: "التمديد الآلي لهامش استدارة المواقف 24-28 (+12 دقيقة)" },
        desc: { en: "Based on minute 18 consensus, Agent dynamically adjusted South Apron turnaround buffers in AODB to mitigate AUH-LHR & AUH-BOM cascading delays.", ar: "استناداً لتوافق الدقيقة 18، قام الوكيل بتعديل هوامش الساحة الجنوبية في نظام AODB لمنع تراكم تأخير رحلات لندن وبومباي." }
      },
      {
        title: { en: "GCAA Compliance Declaration Formatted", ar: "صياغة إقرار الامتثال لهيئة الطيران المدني (GCAA)" },
        desc: { en: "Extracted agreed peak noise abatement parameters and synthesized Level 1 authorization packet for COO ratification.", ar: "تم استخراج معايير خفض الضوضاء في أوقات الذروة وتجهيز حزمة تفويض المستوى الأول لتوقيع رئيس العمليات." }
      },
      {
        title: { en: "Ground Handling Pre-Authorization Dispatched", ar: "إرسال التفويض المسبق لعمليات المناولة الأرضية" },
        desc: { en: "Notified VP Airport Operations and Etihad Network Command of revised tug crew positioning benchmarks.", ar: "تم إخطار نائب رئيس العمليات ومركز قيادة شبكة الاتحاد للطيران بالمعايير المعدلة لتمركز طواقم الجرارات." }
      }
    ],
    actions: [
      {
        title: { en: "Ratify GCAA Runway Noise Declaration", ar: "اعتماد إقرار خفض ضوضاء المدارج (GCAA)" },
        meta: { en: "Owner: CEO / COO · Due Today 14:00 (Critical)", ar: "المسؤول: الرئيس التنفيذي / رئيس العمليات · الموعد: اليوم 14:00 (حرج)" },
        type: "sign"
      },
      {
        title: { en: "Deploy Stand 24–28 Tug Crew Rebalancing", ar: "إعادة موازنة طواقم جرارات المواقف 24-28" },
        meta: { en: "Owner: VP Airport Operations · Due Today 16:30", ar: "المسؤول: نائب رئيس العمليات · الموعد: اليوم 16:30" },
        type: "ping"
      },
      {
        title: { en: "Model Net Yield EBITDA Overtime Impact", ar: "نمذجة أثر العمل الإضافي على أرباح EBITDA" },
        meta: { en: "Owner: Chief Financial Officer · Due Aug 22", ar: "المسؤول: المدير المالي · الموعد: 22 أغسطس" },
        type: "status"
      }
    ],
    transcripts: [
      { speaker: "H.E. Executive Leadership (CEO / COO)", time: "10:30:15", quote: { en: "Good morning team. Let's focus on the South Apron turnaround pressure following Stand 22 maintenance, and finalize the GCAA noise abatement declaration required by 14:00.", ar: "صباح الخير جميعاً. دعونا نركز على ضغط استدارة الساحة الجنوبية بعد صيانة الموقف 22، وإنهاء إقرار خفض الضوضاء المطلوب قبل الساعة 14:00." } },
      { speaker: "VP Airport Operations", time: "10:33:40", quote: { en: "Stand 22 maintenance has reduced buffer resilience by 14%. We propose adding a 12-minute buffer across Stands 24 to 28 to safeguard our 15:00 Etihad arrival wave and protect AUH-LHR slot integrity.", ar: "صيانة الموقف 22 قللت مرونة الهامش بنسبة 14%. نقترح إضافة 12 دقيقة للمواقف 24 إلى 28 لحماية موجة وصول الاتحاد 15:00 وحماية مسار لندن." } },
      { speaker: "Chief Financial Officer", time: "10:36:20", quote: { en: "The overtime cost for ground support equipment crews is roughly 45,000 AED. This is well within our Q3 contingency envelope, and far cheaper than slot delay penalties.", ar: "تكلفة العمل الإضافي لطواقم المناولة الأرضية تبلغ 45 ألف درهم تقريباً، وهي ضمن ميزانية طوارئ الربع الثالث وأقل بكثير من غرامات تأخير الفترات." } },
      { speaker: "Legal & Regulatory Director", time: "10:39:10", quote: { en: "The GCAA noise abatement compliance declaration is fully drafted. It simply requires Level 1 executive sign-off prior to the 14:00 deadline.", ar: "إقرار الامتثال لخفض الضوضاء مكتمل الصياغة تماماً، ويتطلب فقط توقيع المستوى التنفيذي الأول قبل موعد 14:00." } },
      { speaker: "H.E. Executive Leadership (CEO / COO)", time: "10:42:00", quote: { en: "Approved. Elahi, please update the operating baseline in AODB, prepare the GCAA sign-off packet, and notify Ground Handling command.", ar: "معتمد. إلهي، يرجى تحديث خط الأساس في نظام AODB، وتجهيز حزمة توقيع هيئة الطيران، وإخطار قيادة المناولة." } },
      { speaker: "Elahi AI Agent (Real-Time Action)", time: "10:42:30", quote: { en: "✓ Protocol executed. Stand 24–28 buffer updated (+12m) in AODB. GCAA authorization packet prepared for signature.", ar: "✓ تم تنفيذ البروتوكول. تم تحديث هامش المواقف 24-28 (+12 دقيقة) في AODB. حزمة اعتماد هيئة الطيران جاهزة للتوقيع." }, isAi: true }
    ]
  },
  retail: {
    id: "ADA-COM-2026-08-039",
    title: { en: "Terminal A Concessionaire & Retail Strategy", ar: "مراجعة عقود الامتياز التجاري بمبنى الركاب (A)" },
    subtitle: { en: "Yesterday 14:00 · 32 min audio · Synthesized in 38s", ar: "أمس 14:00 · 32 دقيقة صوتية · تم التلخيص في 38 ثانية" },
    status: "approved",
    summary: {
      en: "ELT agreed to adjust retail concession minimum guarantees in alignment with Q3 passenger surge forecasts, maintaining ADA revenue targets while ensuring luxury tenant stability.",
      ar: "وافق فريق القيادة على تعديل الحد الأدنى لضمانات الإيجار لمتاجر التجزئة بما يتماشى مع توقعات زيادة حركة المسافرين في الربع الثالث مع ضمان استقرار الشركاء التجاريين."
    },
    decisions: [
      {
        title: { en: "Approved 4.2% Threshold Adjustment for Pier B", ar: "اعتماد تعديل نسبة 4.2% للرصيف (B)" },
        desc: { en: "Dynamic concessionaire pricing tied to monthly international transit passenger index adopted through Q4.", ar: "اعتماد تسعير ديناميكي مرتبط بمؤشر مسافري الترانزيت الدوليين خلال الربع الرابع." }
      },
      {
        title: { en: "Prime Duty-Free Reallocation to Heritage Brands", ar: "إعادة تخصيص مساحات السوق الحرة للعلامات التراثية" },
        desc: { en: "Reallocated 180 sqm prime central promotional concourse to UAE national heritage brands.", ar: "إعادة تخصيص 180 متراً مربعاً في بهو الترويج المركزي للعلامات التجارية التراثية الإماراتية." }
      }
    ],
    actions: [
      {
        title: { en: "VP Commercial to Issue Revised Tenant Addenda", ar: "إصدار ملاحق العقود المعدلة للمستأجرين" },
        meta: { en: "Owner: VP Commercial · Due Aug 25", ar: "المسؤول: نائب الرئيس التجاري · الموعد: 25 أغسطس" },
        type: "status"
      },
      {
        title: { en: "Finance Director Net Yield Impact Audit", ar: "تدقيق أثر العائد الصافي على أرباح EBITDA" },
        meta: { en: "Owner: Finance Director · Due Aug 28", ar: "المسؤول: المدير المالي · الموعد: 28 أغسطس" },
        type: "status"
      },
      {
        title: { en: "Legal Standardization of Guarantee Framework", ar: "اعتماد إطار الضمانات الموحد قانونياً" },
        meta: { en: "Owner: Legal Affairs · Completed 19 Aug", ar: "المسؤول: الشؤون القانونية · اكتمل 19 أغسطس" },
        type: "status"
      }
    ],
    transcripts: [
      { speaker: "Chief Commercial Officer", time: "14:02:10", quote: { en: "Passenger spend per head in Pier B luxury sector has outperformed projections by 8.4%, but luxury tenants request threshold stabilization.", ar: "متوسط إنفاق المسافر في قطاع التجزئة الفاخرة بالرصيف B تجاوز التوقعات بنسبة 8.4%، لكن المستأجرين يطلبون تثبيت سقف العتبة." } },
      { speaker: "Chief Financial Officer", time: "14:08:45", quote: { en: "A 4.2% threshold adjustment preserves our 100% net revenue target while preventing lease default risks.", ar: "تعديل بنسبة 4.2% يحافظ على تحقيق 100% من هدف الإيرادات الصافية ويمنع مخاطر التعثر الإيجاري." } },
      { speaker: "H.E. Executive Leadership (CEO / COO)", time: "14:15:30", quote: { en: "Approved. Ensure local heritage brands get prime duty-free prominence as part of the overall commercial mix.", ar: "معتمد. تأكدوا من منح العلامات التراثية الوطنية مكانة متميزة في السوق الحرة كجزء من المزيج التجاري العام." } },
      { speaker: "Elahi AI Agent (Real-Time Action)", time: "14:16:00", quote: { en: "✓ Minute registered. Formal resolution ADA-COM-2026-08-039 generated and archived in Institutional Memory.", ar: "✓ تم قيد المحضر. تم إصدار القرار الرسمي وتوثيقه في الذاكرة المؤسسية." }, isAi: true }
    ]
  },
  runway: {
    id: "ADA-GCAA-2026-08-035",
    title: { en: "Q3 Runway Capacity & Noise Abatement Verification", ar: "التحقق من سعة المدارج وخفض الضوضاء للربع الثالث" },
    subtitle: { en: "18 Aug 2026 · 48 min audio · Synthesized in 44s", ar: "18 أغسطس 2026 · 48 دقيقة صوتية · تم التلخيص في 44 ثانية" },
    status: "approved",
    summary: {
      en: "Multi-agency review with GCAA validating Runway 13L/31R maintenance slot buffers and establishing mandatory noise abatement departure profiles.",
      ar: "مراجعة مشتركة مع هيئة الطيران المدني للتحقق من هوامش صيانة المدرج 13L/31R واعتماد بروفايلات الإقلاع الإلزامية لخفض الضوضاء."
    },
    decisions: [
      {
        title: { en: "Adopted Dynamic Continuous Descent Approach (CDA)", ar: "اعتماد أسلوب الهبوط المستمر الديناميكي (CDA)" },
        desc: { en: "Mandated continuous descent approach during 23:00–06:00 to reduce noise footprint over Khalifa City by 3.2 dB.", ar: "إلزام تطبيق الهبوط المستمر بين 23:00 و06:00 لخفض البصمة الصوتية فوق مدينة خليفة بمقدار 3.2 ديسيبل." }
      },
      {
        title: { en: "Runway 13L Maintenance Window Locked", ar: "تثبيت نافذة صيانة المدرج 13L" },
        desc: { en: "Approved 01:30–05:00 window with single-runway high-intensity runway operations (HIRO) protocol.", ar: "اعتماد نافذة 01:30 إلى 05:00 مع بروتوكول العمليات المكثفة على المدرج المفرد." }
      }
    ],
    actions: [
      {
        title: { en: "Publish NOTAM for Runway 13L Window", ar: "إصدار إخطار الملاحة الجوية (NOTAM) للمدرج 13L" },
        meta: { en: "Owner: Airfield Safety · Completed 19 Aug", ar: "المسؤول: سلامة الساحة الجوية · مكتمل 19 أغسطس" },
        type: "status"
      },
      {
        title: { en: "GCAA Airspace Working Group Ratification", ar: "تصديق مجموعة عمل المجال الجوي بالهيئة" },
        meta: { en: "Owner: Regulatory Affairs · Completed 19 Aug", ar: "المسؤول: الشؤون التنظيمية · مكتمل 19 أغسطس" },
        type: "status"
      }
    ],
    transcripts: [
      { speaker: "Director General, GCAA", time: "09:05:20", quote: { en: "Abu Dhabi Airports' noise mitigation compliance has met ICAO Balanced Approach standards for Q3.", ar: "امتثال مطارات أبوظبي لخفض الضوضاء حقق معايير النهج المتوازن لمنظمة الطيران المدني الدولي للربع الثالث." } },
      { speaker: "VP Airfield Operations", time: "09:18:40", quote: { en: "HIRO protocol maintains 34 movements per hour even with 13L offline during night maintenance.", ar: "بروتوكول العمليات المكثفة يحافظ على 34 حركة في الساعة حتى أثناء إغلاق المدرج 13L للصيانة الليلية." } },
      { speaker: "Elahi AI Agent (Real-Time Action)", time: "09:48:00", quote: { en: "✓ GCAA Compliance packet sealed. Registered as official aviation safety directive.", ar: "✓ تم توثيق حزمة الامتثال. قُيدت كتوجيه رسمي لسلامة الطيران." }, isAi: true }
    ]
  },
  etihad: {
    id: "ADA-EY-2026-08-028",
    title: { en: "Etihad Joint Operations SLA Alignment", ar: "مواءمة مستوى الخدمة للعمليات المشتركة مع الاتحاد للطيران" },
    subtitle: { en: "15 Aug 2026 · 38 min audio · Synthesized in 35s", ar: "15 أغسطس 2026 · 38 دقيقة صوتية · تم التلخيص في 35 ثانية" },
    status: "approved",
    summary: {
      en: "Executive bilateral sync between ADA and Etihad Network Operations establishing 45-minute inter-terminal baggage transfer and joint slot recovery protocol.",
      ar: "اجتماع تنفيذي ثنائي بين مطارات أبوظبي ومركز عمليات شبكة الاتحاد للطيران لاعتماد زمن 45 دقيقة لنقل أمتعة الترانزيت وبروتوكول استعادة الفترات."
    },
    decisions: [
      {
        title: { en: "Guaranteed 45-minute Minimum Connect Time (MCT)", ar: "ضمان 45 دقيقة كحد أدنى لزمن اتصال الترانزيت (MCT)" },
        desc: { en: "Dedicated high-speed automated baggage tug route established between Terminal A Pier B and South Apron.", ar: "إنشاء مسار جرارات آلي فائق السرعة مخصص لنقل الأمتعة بين الرصيف B والساحة الجنوبية." }
      },
      {
        title: { en: "Joint Slot Recovery War Room Protocol", ar: "بروتوكول غرفة طوارئ استعادة الفترات المشتركة" },
        desc: { en: "Authorized automated slot swapping mechanism during regional convective weather alerts.", ar: "تفويض آلية التبادل الآلي للفترات الزمنية عند صدور تنبيهات الأحوال الجوية الإقليمية." }
      }
    ],
    actions: [
      {
        title: { en: "Deploy Dedicated Baggage Transfer Tug Fleet", ar: "نشر أسطول جرارات مخصص لنقل الأمتعة" },
        meta: { en: "Owner: VP Ground Handling · Completed 17 Aug", ar: "المسؤول: نائب رئيس المناولة الأرضية · مكتمل 17 أغسطس" },
        type: "status"
      },
      {
        title: { en: "Quarterly Joint SLA Review Benchmark Setup", ar: "إعداد مؤشرات المراجعة الربعية لمستوى الخدمة" },
        meta: { en: "Owner: Joint Taskforce · Due Sep 15", ar: "المسؤول: فريق العمل المشترك · الموعد: 15 سبتمبر" },
        type: "status"
      }
    ],
    transcripts: [
      { speaker: "SVP Network Operations, Etihad", time: "11:18:00", quote: { en: "Our connection bank at 15:00 requires absolute baggage transfer reliability under 45 minutes.", ar: "موجة رحلات الربط لدينا الساعة 15:00 تتطلب موثوقية تامة لنقل الأمتعة في أقل من 45 دقيقة." } },
      { speaker: "VP Airport Operations", time: "11:24:30", quote: { en: "The dedicated South Apron bypass lane achieves 38-minute average transfer time in simulation.", ar: "المسار المخصص الملتف حول الساحة الجنوبية يحقق متوسط نقل يبلغ 38 دقيقة في نماذج المحاكاة." } },
      { speaker: "Elahi AI Agent (Real-Time Action)", time: "11:38:00", quote: { en: "✓ SLA baseline updated and published to both ADA and Etihad dispatch dashboards.", ar: "✓ تم تحديث خط أساس مستوى الخدمة ونشره في لوحات تحكم مطارات أبوظبي والاتحاد." }, isAi: true }
    ]
  }
};
