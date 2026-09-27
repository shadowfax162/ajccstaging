const SITES = [
  { id: "pancreas", name: "Pancreas", edition: "AJCC 8th edition", blurb: "Exocrine carcinoma", swatch: "#d8eadc" },
  { id: "stomach", name: "Stomach", edition: "AJCC 8th edition", blurb: "Gastric adenocarcinoma", swatch: "#f4ddd4" },
  { id: "colon", name: "Colon", edition: "AJCC 8th edition", blurb: "Adenocarcinoma", swatch: "#e3def0" },
  { id: "rectum", name: "Rectum", edition: "AJCC 8th edition", blurb: "Adenocarcinoma", swatch: "#f3ebd3" },
  { id: "oesophagus", name: "Oesophagus", edition: "AJCC 8th edition", blurb: "SCC and adenocarcinoma, including EGJ", swatch: "#d7e5f2" },
  { id: "breast", name: "Breast", edition: "AJCC 8th edition", blurb: "Anatomic TNM stage", swatch: "#f6e4d8" },
  { id: "lung", name: "Lung", edition: "AJCC Version 9 (2025)", blurb: "NSCLC and SCLC", swatch: "#dceee8" },
  { id: "rcc", name: "Kidney (RCC)", edition: "AJCC 8th edition", blurb: "Renal cell carcinoma", swatch: "#eadfef" },
  { id: "headneck", name: "Head and neck", edition: "AJCC 8th + Version 9", blurb: "Oral cavity, pharynx, larynx, salivary", swatch: "#e8d9c9" }
];

const OPTIONS = {
  pancreas: {
    extra: [],
    t: [
      ["Tis", "Carcinoma in situ / HGD"],
      ["T1a", "≤ 0.5 cm"],
      ["T1b", "> 0.5–1 cm"],
      ["T1c", "> 1–2 cm"],
      ["T2", "> 2–4 cm"],
      ["T3", "> 4 cm"],
      ["T4", "Celiac axis, SMA, and/or CHA"]
    ],
    n: [
      ["N0", "No regional nodes"],
      ["N1", "1–3 regional nodes"],
      ["N2", "≥ 4 regional nodes"]
    ],
    m: [
      ["M0", "No distant metastasis"],
      ["M1", "Distant metastasis"]
    ]
  },
  stomach: {
    extra: [
      {
        id: "context",
        label: "Staging context",
        options: [
          ["pathologic", "Pathologic (pTNM)"],
          ["clinical", "Clinical (cTNM)"]
        ]
      }
    ],
    t: [
      ["Tis", "Intraepithelial / lamina propria without invasion"],
      ["T1a", "Lamina propria or muscularis mucosae"],
      ["T1b", "Submucosa"],
      ["T2", "Muscularis propria"],
      ["T3", "Subserosa"],
      ["T4a", "Serosa / visceral peritoneum"],
      ["T4b", "Adjacent structures"]
    ],
    n: [
      ["N0", "No regional nodes"],
      ["N1", "1–2 nodes"],
      ["N2", "3–6 nodes"],
      ["N3a", "7–15 nodes"],
      ["N3b", "≥ 16 nodes"]
    ],
    m: [
      ["M0", "No distant metastasis"],
      ["M1", "Distant metastasis"]
    ]
  },
  colon: colorectalOptions(),
  rectum: colorectalOptions(),
  oesophagus: {
    extra: [
      {
        id: "histology",
        label: "Histology",
        options: [
          ["adeno", "Adenocarcinoma"],
          ["scc", "Squamous cell carcinoma"]
        ]
      },
      {
        id: "context",
        label: "Staging context",
        options: [
          ["clinical", "Clinical (cTNM)"],
          ["pathologic", "Pathologic (pTNM)"],
          ["yp", "Post-neoadjuvant (ypTNM)"]
        ]
      },
      {
        id: "grade",
        label: "Grade (needed for pathologic stage I–II)",
        options: [
          ["G1", "G1 well differentiated"],
          ["G2", "G2 moderately differentiated"],
          ["G3", "G3 poorly differentiated"],
          ["GX", "GX unknown"]
        ]
      },
      {
        id: "location",
        label: "Location (pathologic SCC)",
        options: [
          ["lower", "Lower thoracic / EGJ"],
          ["upper", "Upper or middle thoracic"],
          ["unknown", "Unknown"]
        ]
      }
    ],
    t: [
      ["Tis", "High-grade dysplasia"],
      ["T1a", "Lamina propria or muscularis mucosae"],
      ["T1b", "Submucosa"],
      ["T2", "Muscularis propria"],
      ["T3", "Adventitia"],
      ["T4a", "Pleura, pericardium, azygos, diaphragm, or peritoneum"],
      ["T4b", "Other adjacent structures (aorta, vertebra, airway)"]
    ],
    n: [
      ["N0", "No regional nodes"],
      ["N1", "1–2 regional nodes"],
      ["N2", "3–6 regional nodes"],
      ["N3", "≥ 7 regional nodes"]
    ],
    m: [
      ["M0", "No distant metastasis"],
      ["M1", "Distant metastasis"]
    ]
  },
  breast: {
    extra: [],
    t: [
      ["Tis", "DCIS / Paget without invasion"],
      ["T1mi", "≤ 1 mm"],
      ["T1a", "> 1–5 mm"],
      ["T1b", "> 5–10 mm"],
      ["T1c", "> 10–20 mm"],
      ["T2", "> 20–50 mm"],
      ["T3", "> 50 mm"],
      ["T4a", "Chest wall (ribs, intercostals, serratus)"],
      ["T4b", "Skin ulceration, satellite nodules, or oedema"],
      ["T4c", "T4a + T4b"],
      ["T4d", "Inflammatory carcinoma"]
    ],
    n: [
      ["N0", "No regional nodes"],
      ["N1mi", "Micrometastasis (> 0.2–2 mm)"],
      ["N1", "1–3 axillary, or IM sentinel"],
      ["N2", "4–9 axillary, or clinically detected IM without axillary"],
      ["N3", "≥ 10 axillary, infraclavicular, IM + axillary, or supraclavicular"]
    ],
    m: [
      ["M0", "No distant metastasis"],
      ["M1", "Distant metastasis"]
    ]
  },
  lung: {
    extra: [],
    t: [
      ["Tis", "Carcinoma in situ / AIS"],
      ["T1mi", "Minimally invasive adenocarcinoma"],
      ["T1a", "≤ 1 cm"],
      ["T1b", "> 1–2 cm"],
      ["T1c", "> 2–3 cm"],
      ["T2a", "> 3–4 cm, or visceral pleura, main bronchus, or atelectasis"],
      ["T2b", "> 4–5 cm"],
      ["T3", "> 5–7 cm, chest wall/parietal pleura, or same-lobe nodule"],
      ["T4", "> 7 cm, mediastinum/diaphragm/heart/great vessels, or ipsilateral different-lobe nodule"]
    ],
    n: [
      ["N0", "No regional nodes"],
      ["N1", "Ipsilateral peribronchial / hilar / intrapulmonary"],
      ["N2a", "Single ipsilateral mediastinal or subcarinal station"],
      ["N2b", "Multiple ipsilateral mediastinal and/or subcarinal stations"],
      ["N3", "Contralateral mediastinal/hilar, or scalene/supraclavicular"]
    ],
    m: [
      ["M0", "No distant metastasis"],
      ["M1a", "Contralateral lung nodule, or pleural/pericardial nodules or effusion"],
      ["M1b", "Single extrathoracic metastasis in one organ system"],
      ["M1c1", "Multiple metastases in one organ system"],
      ["M1c2", "Multiple metastases in more than one organ system"]
    ]
  },
  rcc: {
    extra: [],
    t: [
      ["T1a", "≤ 4 cm, limited to kidney"],
      ["T1b", "> 4–7 cm, limited to kidney"],
      ["T2a", "> 7–10 cm, limited to kidney"],
      ["T2b", "> 10 cm, limited to kidney"],
      ["T3a", "Renal vein / pelvicalyceal system / perirenal or sinus fat"],
      ["T3b", "IVC below the diaphragm"],
      ["T3c", "IVC above the diaphragm, or invades IVC wall"],
      ["T4", "Beyond Gerota fascia, including contiguous adrenal"]
    ],
    n: [
      ["N0", "No regional nodes"],
      ["N1", "Regional node(s)"]
    ],
    m: [
      ["M0", "No distant metastasis"],
      ["M1", "Distant metastasis"]
    ]
  },
  headneck: {
    extra: [
      {
        id: "subsite",
        label: "Subsite",
        options: [
          ["oral", "Oral cavity"],
          ["opc_hpv", "Oropharynx, HPV-associated"],
          ["opc_neg", "Oropharynx, HPV-negative"],
          ["hypo", "Hypopharynx"],
          ["larynx", "Larynx"],
          ["npc", "Nasopharynx"],
          ["salivary", "Salivary glands"]
        ]
      },
      {
        id: "context",
        label: "Staging context",
        options: [
          ["clinical", "Clinical (cTNM)"],
          ["pathologic", "Pathologic (pTNM)"]
        ]
      }
    ],
    t: [],
    n: [],
    m: []
  }
};

function colorectalOptions() {
  return {
    extra: [],
    t: [
      ["Tis", "Intraepithelial or lamina propria"],
      ["T1", "Submucosa"],
      ["T2", "Muscularis propria"],
      ["T3", "Pericolorectal tissues"],
      ["T4a", "Visceral peritoneum"],
      ["T4b", "Adjacent organs or structures"]
    ],
    n: [
      ["N0", "No regional nodes or tumour deposits"],
      ["N1a", "1 node"],
      ["N1b", "2–3 nodes"],
      ["N1c", "Tumour deposit(s), nodes negative"],
      ["N2a", "4–6 nodes"],
      ["N2b", "≥ 7 nodes"]
    ],
    m: [
      ["M0", "No distant metastasis"],
      ["M1a", "One distant site/organ, no peritoneum"],
      ["M1b", "Two or more sites/organs, no peritoneum"],
      ["M1c", "Peritoneal metastasis"]
    ]
  };
}

function conventionalHnN(context) {
  if (context === "pathologic") {
    return [
      ["N0", "No regional nodes"],
      ["N1", "Single ipsilateral ≤ 3 cm, ENE−"],
      ["N2a", "Single ipsilateral ≤ 3 cm ENE+, or > 3–6 cm ENE−"],
      ["N2b", "Multiple ipsilateral ≤ 6 cm, ENE−"],
      ["N2c", "Bilateral or contralateral ≤ 6 cm, ENE−"],
      ["N3a", "> 6 cm, ENE−"],
      ["N3b", "ENE+ (except the limited pN2a single-node pattern)"]
    ];
  }
  return [
    ["N0", "No regional nodes"],
    ["N1", "Single ipsilateral ≤ 3 cm, no clinical ENE"],
    ["N2a", "Single ipsilateral > 3–6 cm, no clinical ENE"],
    ["N2b", "Multiple ipsilateral ≤ 6 cm, no clinical ENE"],
    ["N2c", "Bilateral or contralateral ≤ 6 cm, no clinical ENE"],
    ["N3a", "> 6 cm, no clinical ENE"],
    ["N3b", "Clinically overt ENE"]
  ];
}

function conventionalHnM() {
  return [
    ["M0", "No distant metastasis"],
    ["M1", "Distant metastasis"]
  ];
}

function getHnOptions(subsite, context) {
  const oralT = [
    ["Tis", "Carcinoma in situ"],
    ["T1", "≤ 2 cm and DOI ≤ 5 mm"],
    ["T2", "≤ 2 cm with DOI > 5–10 mm, or > 2–4 cm with DOI ≤ 10 mm"],
    ["T3", "> 4 cm, or any size with DOI > 10 mm"],
    ["T4a", "Moderately advanced: cortical bone, deep tongue muscle, maxillary sinus, or skin"],
    ["T4b", "Very advanced: masticator space, pterygoid plates, skull base, or carotid"]
  ];
  const opcNegT = [
    ["Tis", "Carcinoma in situ"],
    ["T1", "≤ 2 cm"],
    ["T2", "> 2–4 cm"],
    ["T3", "> 4 cm, or extension to lingual surface of epiglottis"],
    ["T4a", "Larynx, deep tongue muscle, medial pterygoid, hard palate, or mandible"],
    ["T4b", "Lateral pterygoid, pterygoid plates, nasopharynx, skull base, or carotid"]
  ];
  const hypoT = [
    ["Tis", "Carcinoma in situ"],
    ["T1", "One subsite, ≤ 2 cm"],
    ["T2", "More than one subsite or adjacent site, or > 2–4 cm, hemilarynx not fixed"],
    ["T3", "> 4 cm, or hemilarynx fixation, or oesophageal invasion"],
    ["T4a", "Thyroid/cricoid cartilage, hyoid, thyroid gland, or central compartment"],
    ["T4b", "Prevertebral fascia, carotid, or mediastinal structures"]
  ];
  const larynxT = [
    ["Tis", "Carcinoma in situ"],
    ["T1", "Limited to one subsite; glottis: cord(s) with normal mobility"],
    ["T2", "More than one larynx subsite, or impaired cord mobility"],
    ["T3", "Cord fixation, inner cortex of thyroid cartilage, paraglottic or pre-epiglottic space"],
    ["T4a", "Through thyroid cartilage, or extralaryngeal spread"],
    ["T4b", "Prevertebral space, carotid, or mediastinal structures"]
  ];

  if (subsite === "opc_hpv") {
    const t = [
      ["Tis", "Carcinoma in situ"],
      ["T0", "HPV-associated nodal disease, no identifiable primary"],
      ["T1", "≤ 2 cm"],
      ["T2", "> 2–4 cm"],
      ["T3", "> 4 cm, or lingual surface of epiglottis"],
      ["T4", "Larynx, deep tongue muscle, medial pterygoid, hard palate, mandible, or beyond"]
    ];
    const n =
      context === "pathologic"
        ? [
            ["N0", "No regional nodes"],
            ["N1a", "1 node, no pathologic ENE"],
            ["N1b", "2–4 nodes, no pathologic ENE"],
            ["N2", "> 4 nodes without ENE, or 1–4 nodes with ENE"],
            ["N3", "> 4 nodes with pathologic ENE"]
          ]
        : [
            ["N0", "No regional nodes"],
            ["N1", "Ipsilateral node(s) ≤ 6 cm, no ENE"],
            ["N2", "Contralateral/bilateral ≤ 6 cm, or ipsilateral with ENE"],
            ["N3", "> 6 cm, or contralateral/bilateral with ENE"]
          ];
    return { t, n, m: conventionalHnM() };
  }

  if (subsite === "npc") {
    return {
      t: [
        ["T0", "EBV-positive nodes, no nasopharyngeal primary"],
        ["T1", "Nasopharynx, or nasal cavity / oropharynx without adjacent invasion"],
        ["T2", "Parapharyngeal space, or medial/lateral pterygoid or prevertebral muscle"],
        ["T3", "Unequivocal bone invasion (skull base, pterygoid, sinuses, cervical vertebrae)"],
        ["T4", "Intracranial, cranial nerve, hypopharynx, orbit (incl. IOF), parotid, or beyond lateral pterygoid"]
      ],
      n: [
        ["N0", "No regional nodes"],
        ["N1", "Unilateral cervical and/or uni/bilateral retropharyngeal, ≤ 6 cm, above cricoid, no advanced ENE"],
        ["N2", "Bilateral cervical, ≤ 6 cm, above cricoid, no advanced ENE"],
        ["N3", "> 6 cm, below cricoid, or advanced ENE into muscle/skin/neurovascular"]
      ],
      m: [
        ["M0", "No distant metastasis"],
        ["M1a", "Distant metastasis, ≤ 3 lesions"],
        ["M1b", "Distant metastasis, > 3 lesions"]
      ]
    };
  }

  if (subsite === "salivary") {
    return {
      t: [
        ["Tis", "Carcinoma in situ"],
        ["T1", "≤ 2 cm, no extraparenchymal extension"],
        ["T2", "> 2–4 cm, no extraparenchymal extension"],
        ["T3", "> 4 cm and/or extraparenchymal extension"],
        ["T4a", "Skin, mandible, ear canal, and/or facial nerve"],
        ["T4b", "Skull base, pterygoid plates, and/or carotid"]
      ],
      n: [
        ["N0", "No regional nodes"],
        ["N1", "1–3 nodes, no ENE"],
        ["N2", "> 3 nodes, or any node with ENE"]
      ],
      m: conventionalHnM()
    };
  }

  const t =
    subsite === "oral" ? oralT : subsite === "hypo" ? hypoT : subsite === "larynx" ? larynxT : opcNegT;
  return { t, n: conventionalHnN(context), m: conventionalHnM() };
}

function hnEdition(subsite) {
  if (subsite === "opc_hpv" || subsite === "salivary") return "AJCC Version 9 (2026)";
  if (subsite === "npc") return "AJCC Version 9 (2025)";
  return "AJCC 8th edition";
}

function hnSubsiteLabel(subsite) {
  const map = {
    oral: "Oral cavity",
    opc_hpv: "Oropharynx, HPV-associated",
    opc_neg: "Oropharynx, HPV-negative",
    hypo: "Hypopharynx",
    larynx: "Larynx",
    npc: "Nasopharynx",
    salivary: "Salivary glands"
  };
  return map[subsite] || "Head and neck";
}

function nFamily(n) {
  if (!n) return "";
  return n.replace(/[abc]$/i, "").replace("mi", "");
}

function tFamily(t) {
  if (!t) return "";
  return t.replace(/[abcd]$/i, "").replace("mi", "");
}

function stagePancreas(s) {
  if (s.m === "M1") return "IV";
  if (s.t === "Tis") return s.n === "N0" ? "0" : "—";
  if (s.t === "T4") return "III";
  if (s.n === "N2") return "III";
  if (s.n === "N1") return "IIB";
  if (["T1a", "T1b", "T1c"].includes(s.t) && s.n === "N0") return "IA";
  if (s.t === "T2" && s.n === "N0") return "IB";
  if (s.t === "T3" && s.n === "N0") return "IIA";
  return "—";
}

function stageStomach(s) {
  if (s.m === "M1") return "IV";
  if (s.context === "clinical") {
    if (s.t === "Tis") return s.n === "N0" ? "0" : "—";
    if (s.t === "T4b") return "III";
    const earlyT = ["T1a", "T1b", "T2"].includes(s.t);
    const lateT = ["T3", "T4a"].includes(s.t);
    const nodePos = s.n !== "N0";
    if (earlyT && s.n === "N0") return "I";
    if ((earlyT && nodePos) || (lateT && s.n === "N0")) return "IIA";
    if (lateT && nodePos) return "IIB";
    return "—";
  }
  if (s.t === "Tis") return "0";
  const t = s.t;
  const n = s.n;
  const key = `${tFamily(t) === "T1" ? "T1" : t}|${n}`;
  const map = {
    "T1|N0": "IA",
    "T1|N1": "IB",
    "T2|N0": "IB",
    "T1|N2": "IIA",
    "T2|N1": "IIA",
    "T3|N0": "IIA",
    "T1|N3a": "IIB",
    "T2|N2": "IIB",
    "T3|N1": "IIB",
    "T4a|N0": "IIB",
    "T1|N3b": "IIIA",
    "T2|N3a": "IIIA",
    "T3|N2": "IIIA",
    "T4a|N1": "IIIA",
    "T4b|N0": "IIIA",
    "T2|N3b": "IIIB",
    "T3|N3a": "IIIB",
    "T4a|N2": "IIIB",
    "T4a|N3a": "IIIB",
    "T4b|N1": "IIIB",
    "T4b|N2": "IIIB",
    "T3|N3b": "IIIC",
    "T4a|N3b": "IIIC",
    "T4b|N3a": "IIIC",
    "T4b|N3b": "IIIC"
  };
  return map[key] || "—";
}

function stageColorectal(s) {
  if (s.m === "M1a") return "IVA";
  if (s.m === "M1b") return "IVB";
  if (s.m === "M1c") return "IVC";
  if (s.t === "Tis") return "0";
  const t = s.t;
  const n = s.n;
  if (n === "N0") {
    if (t === "T1" || t === "T2") return "I";
    if (t === "T3") return "IIA";
    if (t === "T4a") return "IIB";
    if (t === "T4b") return "IIC";
  }
  const n1 = ["N1a", "N1b", "N1c"].includes(n);
  if (n1 && (t === "T1" || t === "T2")) return "IIIA";
  if (n === "N2a" && t === "T1") return "IIIA";
  if (n1 && (t === "T3" || t === "T4a")) return "IIIB";
  if (n === "N2a" && (t === "T2" || t === "T3")) return "IIIB";
  if (n === "N2b" && (t === "T1" || t === "T2")) return "IIIB";
  if (n === "N2a" && t === "T4a") return "IIIC";
  if (n === "N2b" && (t === "T3" || t === "T4a")) return "IIIC";
  if (t === "T4b" && n !== "N0") return "IIIC";
  return "—";
}

function stageOesophagus(s) {
  if (s.m === "M1") return "IVB";
  const t = s.t;
  const n = s.n;
  const tF = tFamily(t);
  const adeno = s.histology !== "scc";

  if (s.context === "yp") {
    if (t === "Tis") return "0";
    if (["T1a", "T1b", "T2"].includes(t) && n === "N0") return "I";
    if (t === "T3" && n === "N0") return "II";
    if (["T1a", "T1b", "T2"].includes(t) && n === "N1") return "IIIA";
    if ((t === "T4a" && n === "N0") || (t === "T3" && n === "N1") || (["Tis", "T1a", "T1b", "T2", "T3"].includes(t) && n === "N2")) return "IIIB";
    if ((t === "T4a" && ["N1", "N2"].includes(n)) || t === "T4b" || n === "N3") return "IVA";
    return "—";
  }

  if (s.context === "clinical") {
    if (t === "Tis") return "0";
    if (adeno) {
      if (tF === "T1" && n === "N0") return "I";
      if (tF === "T1" && n === "N1") return "IIA";
      if (t === "T2" && n === "N0") return "IIB";
      if ((t === "T2" && n === "N1") || (["T3", "T4a"].includes(t) && ["N0", "N1"].includes(n))) return "III";
      if (t === "T4b" || ["N2", "N3"].includes(n)) return "IVA";
    } else {
      if (tF === "T1" && ["N0", "N1"].includes(n)) return "I";
      if ((t === "T2" && ["N0", "N1"].includes(n)) || (t === "T3" && n === "N0")) return "II";
      if ((t === "T3" && n === "N1") || (["T1a", "T1b", "T2", "T3"].includes(t) && n === "N2")) return "III";
      if (tF === "T4" || n === "N3") return "IVA";
    }
    return "—";
  }

  if (t === "Tis") return "0";
  const g = s.grade || "GX";
  const loc = s.location || "unknown";

  if (adeno) {
    if (t === "T1a" && n === "N0" && g === "G1") return "IA";
    if (t === "T1a" && n === "N0" && (g === "G2" || g === "GX")) return g === "GX" ? "IA–IC" : "IB";
    if (t === "T1b" && n === "N0" && (g === "G1" || g === "G2" || g === "GX")) return "IB";
    if ((tF === "T1" && n === "N0" && g === "G3") || (t === "T2" && n === "N0" && (g === "G1" || g === "G2"))) return "IC";
    if (t === "T2" && n === "N0" && (g === "G3" || g === "GX")) return g === "GX" ? "IC–IIA" : "IIA";
    if ((tF === "T1" && n === "N1") || (t === "T3" && n === "N0")) return "IIB";
    if ((tF === "T1" && n === "N2") || (t === "T2" && n === "N1")) return "IIIA";
    if ((t === "T2" && n === "N2") || (t === "T3" && ["N1", "N2"].includes(n)) || (t === "T4a" && ["N0", "N1"].includes(n))) return "IIIB";
    if ((t === "T4a" && n === "N2") || t === "T4b" || n === "N3") return "IVA";
    return "—";
  }

  if (t === "T1a" && n === "N0" && g === "G1") return "IA";
  if (t === "T1a" && n === "N0" && ["G2", "G3", "GX"].includes(g)) return "IB";
  if (t === "T1b" && n === "N0") return "IB";
  if (t === "T2" && n === "N0" && g === "G1") return "IB";
  if (t === "T2" && n === "N0" && ["G2", "G3", "GX"].includes(g)) return "IIA";
  if (t === "T3" && n === "N0") {
    if (loc === "lower") return "IIA";
    if (loc === "upper") return g === "G1" ? "IIA" : "IIB";
    return "IIA–IIB";
  }
  if ((tF === "T1" || t === "T2") && n === "N1") return "IIB";
  if ((tF === "T1" && n === "N2") || (t === "T2" && n === "N2") || (t === "T3" && n === "N1") || (t === "T4a" && n === "N0")) return "IIIA";
  if ((t === "T3" && n === "N2") || (t === "T4a" && ["N1", "N2"].includes(n)) || (t === "T4b" && n === "N0")) return "IIIB";
  if ((t === "T4b" && ["N1", "N2"].includes(n)) || n === "N3") return "IVA";
  return "—";
}

function stageBreast(s) {
  if (s.m === "M1") return "IV";
  if (s.t === "Tis") return s.n === "N0" ? "0" : "—";
  const tF = tFamily(s.t);
  const n = s.n;
  const t1 = ["T1mi", "T1a", "T1b", "T1c"].includes(s.t);
  const n1 = n === "N1" || n === "N1mi";
  if (t1 && n === "N0") return "IA";
  if (t1 && n === "N1mi") return "IB";
  if (tF === "T4" && ["N0", "N1", "N1mi", "N2"].includes(n)) return "IIIB";
  if (n === "N3") return "IIIC";
  if ((t1 && n === "N1") || (s.t === "T2" && n === "N0")) return "IIA";
  if ((s.t === "T2" && n1) || (s.t === "T3" && n === "N0")) return "IIB";
  if ((t1 || s.t === "T2") && n === "N2") return "IIIA";
  if (s.t === "T3" && (n1 || n === "N2")) return "IIIA";
  return "—";
}

function stageLung(s) {
  if (["M1a", "M1b"].includes(s.m)) return "IVA";
  if (["M1c1", "M1c2"].includes(s.m)) return "IVB";
  if (s.t === "Tis") return "0";
  const t = s.t;
  const n = s.n;
  const t1 = ["T1mi", "T1a", "T1b", "T1c"].includes(t);

  if (n === "N0") {
    if (t === "T1mi" || t === "T1a") return "IA1";
    if (t === "T1b") return "IA2";
    if (t === "T1c") return "IA3";
    if (t === "T2a") return "IB";
    if (t === "T2b") return "IIA";
    if (t === "T3") return "IIB";
    if (t === "T4") return "IIIA";
  }
  if (n === "N1") {
    if (t1) return "IIA";
    if (t === "T2a" || t === "T2b") return "IIB";
    if (t === "T3" || t === "T4") return "IIIA";
  }
  if (n === "N2a") {
    if (t1) return "IIB";
    if (t === "T2a" || t === "T2b" || t === "T3") return "IIIA";
    if (t === "T4") return "IIIB";
  }
  if (n === "N2b") {
    if (t1) return "IIIA";
    if (["T2a", "T2b", "T3", "T4"].includes(t)) return "IIIB";
  }
  if (n === "N3") {
    if (t1 || t === "T2a" || t === "T2b") return "IIIB";
    if (t === "T3" || t === "T4") return "IIIC";
  }
  return "—";
}

function stageRcc(s) {
  if (s.m === "M1") return "IV";
  if (s.t === "T4") return "IV";
  if (s.n === "N1") return "III";
  if (["T3a", "T3b", "T3c"].includes(s.t)) return "III";
  if (["T1a", "T1b"].includes(s.t) && s.n === "N0") return "I";
  if (["T2a", "T2b"].includes(s.t) && s.n === "N0") return "II";
  return "—";
}

function stageHeadNeck(s) {
  const t = s.t;
  const n = s.n;
  const m = s.m;
  const tF = tFamily(t);
  const nF = nFamily(n);
  const subsite = s.subsite;

  if (subsite === "npc") {
    if (m === "M1a") return "IVA";
    if (m === "M1b" || m === "M1") return "IVB";
    if (tF === "T4" || nF === "N3") return "III";
    if (tF === "T3" || nF === "N2") return "II";
    if ((tF === "T1" || tF === "T2" || t === "T0") && nF === "N1") return "IB";
    if ((tF === "T1" || tF === "T2" || t === "T0") && n === "N0") return "IA";
    return "—";
  }

  if (subsite === "salivary") {
    if (m === "M1") return "IV";
    if (t === "Tis") return n === "N0" ? "0" : "—";
    if (nF === "N2" || (["T3", "T4a", "T4b"].includes(t) && nF === "N1")) return "IIIB";
    if ((["T1", "T2"].includes(t) && nF === "N1") || (["T3", "T4a", "T4b"].includes(t) && n === "N0")) return "IIIA";
    if (t === "T2" && n === "N0") return "II";
    if (t === "T1" && n === "N0") return "I";
    return "—";
  }

  if (subsite === "opc_hpv") {
    if (m === "M1") return "IV";
    if (t === "Tis") return n === "N0" ? "0" : "—";
    const earlyT = ["T0", "T1", "T2"].includes(t);
    if (s.context === "pathologic") {
      const n0n1 = n === "N0" || n === "N1a" || n === "N1b";
      if (earlyT && n0n1) return "I";
      if ((earlyT && ["N2", "N3"].includes(n)) || (t === "T3" && ["N0", "N1a", "N1b", "N2"].includes(n))) return "II";
      if ((t === "T3" && n === "N3") || t === "T4") return "III";
      return "—";
    }
    if (earlyT && ["N0", "N1"].includes(n)) return "I";
    if (earlyT && n === "N2") return "II";
    if ((earlyT && n === "N3") || t === "T3" || t === "T4") return "III";
    return "—";
  }

  if (m === "M1") return "IVC";
  if (t === "Tis") return n === "N0" ? "0" : "—";
  if (t === "T4b" || nF === "N3") return "IVB";
  if (t === "T4a" || nF === "N2") return "IVA";
  if (t === "T3" || nF === "N1") return "III";
  if (t === "T2" && n === "N0") return "II";
  if (t === "T1" && n === "N0") return "I";
  return "—";
}

const STAGE_FNS = {
  pancreas: stagePancreas,
  stomach: stageStomach,
  colon: stageColorectal,
  rectum: stageColorectal,
  oesophagus: stageOesophagus,
  breast: stageBreast,
  lung: stageLung,
  rcc: stageRcc,
  headneck: stageHeadNeck
};

const SIZE_SITES = {
  pancreas: { unit: "cm", hint: "Greatest dimension. T4 still needs arterial involvement." },
  breast: { unit: "mm", hint: "Invasive component. Skin or chest-wall findings can raise T independently." },
  lung: { unit: "cm", hint: "Invasive / solid component. Invasion or satellite nodules can raise T independently." },
  rcc: { unit: "cm", hint: "Limited to kidney until fat, vein, or Gerota involvement." }
};

function suggestTFromSize(site, size) {
  if (size == null || Number.isNaN(size) || size < 0) return null;
  if (site === "pancreas") {
    if (size <= 0.5) return "T1a";
    if (size <= 1) return "T1b";
    if (size <= 2) return "T1c";
    if (size <= 4) return "T2";
    return "T3";
  }
  if (site === "breast") {
    if (size <= 1) return "T1mi";
    if (size <= 5) return "T1a";
    if (size <= 10) return "T1b";
    if (size <= 20) return "T1c";
    if (size <= 50) return "T2";
    return "T3";
  }
  if (site === "lung") {
    if (size <= 1) return "T1a";
    if (size <= 2) return "T1b";
    if (size <= 3) return "T1c";
    if (size <= 4) return "T2a";
    if (size <= 5) return "T2b";
    if (size <= 7) return "T3";
    return "T4";
  }
  if (site === "rcc") {
    if (size <= 4) return "T1a";
    if (size <= 7) return "T1b";
    if (size <= 10) return "T2a";
    return "T2b";
  }
  return null;
}

const NOTES = {
  pancreas: [
    "Applies to exocrine pancreatic carcinoma, not pancreatic NETs (Version 9 NET pancreas).",
    "T is size-based until T4, which is arterial involvement (celiac, SMA, and/or CHA)."
  ],
  stomach: [
    "Pathologic grouping is shown by default; clinical groups are coarser (I, IIA, IIB, III, IV).",
    "N3a is 7–15 nodes; N3b is 16 or more."
  ],
  colon: [
    "Same TNM groups as rectum in AJCC 8.",
    "N1c is tumour deposits without positive nodes. M1c is peritoneal disease (stage IVC)."
  ],
  rectum: [
    "Same anatomic TNM groups as colon in AJCC 8.",
    "MRF, EMVI, and distance from anal verge are important clinically but are not part of TNM stage group."
  ],
  oesophagus: [
    "Includes oesophagus and Siewert I/II EGJ tumours. Siewert III is staged as stomach.",
    "Clinical, pathologic, and post-neoadjuvant tables differ. Grade and location matter for pathologic SCC."
  ],
  breast: [
    "This calculator returns anatomic stage. AJCC 8 also uses clinical and pathologic prognostic stage (grade, ER, PR, HER2, and sometimes Oncotype DX).",
    "Confirm prognostic stage in the AJCC manual when biomarkers are available."
  ],
  lung: [
    "AJCC / IASLC Version 9 from 1 January 2025. T is unchanged from 8th edition.",
    "N2a vs N2b is by number of mediastinal stations, not number of nodes. M1c1 vs M1c2 is by organ systems."
  ],
  rcc: [
    "Applies to renal cell carcinoma. Urothelial carcinoma of the renal pelvis uses a different chapter.",
    "Contiguous adrenal invasion is T4; non-contiguous adrenal involvement is M1."
  ],
  headneck: [
    "Choose the subsite first. Nasopharynx, HPV-associated oropharynx, and salivary glands use AJCC Version 9.",
    "Oral cavity, HPV-negative oropharynx, hypopharynx, and larynx remain AJCC 8th edition."
  ]
};

const state = {
  site: null,
  values: {}
};

function $(sel) {
  return document.querySelector(sel);
}

function renderHome() {
  const grid = $("#site-grid");
  grid.innerHTML = SITES.map(
    (s) => `
    <button class="site-card" data-site="${s.id}">
      <div class="swatch" style="background:${s.swatch}"></div>
      <h3>${s.name}</h3>
      <p>${s.edition}<br>${s.blurb}</p>
    </button>`
  ).join("");
  grid.querySelectorAll(".site-card").forEach((btn) => {
    btn.addEventListener("click", () => openSite(btn.dataset.site));
  });
}

function chipGroup(id, items, useDescTitle) {
  const current = state.values[id];
  return items
    .map(([value, desc]) => {
      const active = current ? current === value : value === items[0][0];
      const title = useDescTitle ? desc : value;
      const sub = useDescTitle ? "" : `<small>${desc}</small>`;
      return `
      <button type="button" class="chip${active ? " active" : ""}" data-group="${id}" data-value="${value}">
        ${title}${sub}
      </button>`;
    })
    .join("");
}

function currentTnmSpec() {
  if (state.site === "headneck") {
    return getHnOptions(state.values.subsite, state.values.context);
  }
  const spec = OPTIONS[state.site];
  return { t: spec.t, n: spec.n, m: spec.m };
}

function hnNotes(subsite) {
  const extra = {
    oral: "Oral cavity T uses both size and depth of invasion (DOI).",
    opc_hpv: "Version 9: clinical ENE/iENE upstages cN. Pathologic N1 is split into N1a/N1b; ENE upstages pN and can create pN3.",
    opc_neg: "HPV-negative oropharynx uses the conventional mucosal H&N table, including ENE as N3b clinically.",
    hypo: "Same N and stage groups as HPV-negative oropharynx and larynx.",
    larynx: "T1–T3 descriptors differ for glottis, supraglottis, and subglottis; T4a/T4b are shared.",
    npc: "Version 9: T3 needs unequivocal bone invasion. Advanced ENE is N3. Stage IV is M1 only (M1a ≤3 lesions, M1b >3).",
    salivary: "Version 9 includes major and minor glands. N is by node count (1–3 vs >3) plus ENE. There is no N3. Stage IV is M1 only."
  };
  return [
    `${hnSubsiteLabel(subsite)} · ${hnEdition(subsite)}.`,
    extra[subsite],
    "Unknown-primary EBV-positive nodes are staged as nasopharynx T0. Unknown-primary HPV-associated nodes are staged as oropharynx T0."
  ];
}

function bindExtraChips() {
  $("#form-fields")
    .querySelectorAll(".extra-field .chip")
    .forEach((chip) => {
      chip.addEventListener("click", () => {
        const group = chip.dataset.group;
        state.values[group] = chip.dataset.value;
        chip.parentElement.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        if (state.site === "headneck" && (group === "subsite" || group === "context")) {
          renderTnmFields();
          return;
        }
        updateResult();
      });
    });
}

function renderTnmFields() {
  const spec = currentTnmSpec();
  if (!spec.t.some((item) => item[0] === state.values.t)) state.values.t = spec.t[0][0];
  if (!spec.n.some((item) => item[0] === state.values.n)) state.values.n = spec.n[0][0];
  if (!spec.m.some((item) => item[0] === state.values.m)) state.values.m = spec.m[0][0];
  $("#tnm-fields").innerHTML = `
    <div class="field">
      <label>T — primary tumour</label>
      <div class="chips" data-chips="t">${chipGroup("t", spec.t)}</div>
    </div>
    <div class="field">
      <label>N — regional nodes</label>
      <div class="chips" data-chips="n">${chipGroup("n", spec.n)}</div>
    </div>
    <div class="field">
      <label>M — distant metastasis</label>
      <div class="chips" data-chips="m">${chipGroup("m", spec.m)}</div>
    </div>
  `;
  $("#tnm-fields").querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const group = chip.dataset.group;
      state.values[group] = chip.dataset.value;
      chip.parentElement.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      updateResult();
    });
  });
  updateResult();
}

function openSite(id) {
  state.site = id;
  const site = SITES.find((s) => s.id === id);
  const spec = OPTIONS[id];
  state.values = {};
  spec.extra.forEach((e) => {
    state.values[e.id] = e.options[0][0];
  });
  const tnm = currentTnmSpec();
  state.values.t = tnm.t[0][0];
  state.values.n = tnm.n[0][0];
  state.values.m = tnm.m[0][0];

  $("#home").classList.add("hidden");
  $("#stage-view").classList.remove("hidden");
  $("#site-title").textContent = site.name;
  $("#site-meta").textContent = `${site.edition} · ${site.blurb}`;

  const extra = spec.extra
    .map(
      (e) => `
      <div class="field extra-field" data-extra="${e.id}">
        <label>${e.label}</label>
        <div class="chips" data-chips="${e.id}">${chipGroup(e.id, e.options, true)}</div>
      </div>`
    )
    .join("");

  const size = SIZE_SITES[id]
    ? `<div class="field">
        <label>Size helper (optional, ${SIZE_SITES[id].unit})</label>
        <div class="size-row">
          <input id="size-input" type="number" min="0" step="0.1" placeholder="0.0" />
          <span class="hint" id="size-hint">${SIZE_SITES[id].hint}</span>
        </div>
      </div>`
    : "";

  $("#form-fields").innerHTML = `
    ${extra}
    ${size}
    <div id="tnm-fields"></div>
  `;

  bindExtraChips();
  renderTnmFields();

  const sizeInput = $("#size-input");
  if (sizeInput) {
    sizeInput.addEventListener("input", () => {
      const suggested = suggestTFromSize(id, parseFloat(sizeInput.value));
      if (!suggested) return;
      const chip = document.querySelector(`.chip[data-group="t"][data-value="${suggested}"]`);
      if (chip) chip.click();
    });
  }
}

function syncExtraVisibility() {
  if (state.site !== "oesophagus") return;
  const pathologic = state.values.context === "pathologic";
  const scc = state.values.histology === "scc";
  document.querySelectorAll('[data-extra="grade"]').forEach((el) => {
    el.classList.toggle("hidden", !pathologic);
  });
  document.querySelectorAll('[data-extra="location"]').forEach((el) => {
    el.classList.toggle("hidden", !(pathologic && scc));
  });
}

function updateResult() {
  syncExtraVisibility();
  const site = SITES.find((s) => s.id === state.site);
  const stage = STAGE_FNS[state.site](state.values);
  const tnm = `${state.values.t}${state.values.n}${state.values.m}`;
  $("#stage-out").textContent = stage === "—" ? "Incomplete" : `Stage ${stage}`;
  $("#tnm-out").textContent = tnm;
  const notes = state.site === "headneck" ? hnNotes(state.values.subsite) : NOTES[state.site];
  $("#notes-out").innerHTML = notes.map((n) => `<li>${n}</li>`).join("");
  if (state.site === "headneck") {
    $("#site-title").textContent = hnSubsiteLabel(state.values.subsite);
    $("#site-meta").textContent = `${hnEdition(state.values.subsite)} · Head and neck`;
    $("#copy-text").value = `${hnSubsiteLabel(state.values.subsite)} · ${hnEdition(state.values.subsite)}\n${tnm} · Stage ${stage}`;
  } else {
    $("#copy-text").value = `${site.name} · ${site.edition}\n${tnm} · Stage ${stage}`;
  }
}

function copySummary() {
  const text = $("#copy-text").value;
  navigator.clipboard.writeText(text).then(() => {
    const btn = $("#copy-btn");
    btn.textContent = "Copied";
    setTimeout(() => {
      btn.textContent = "Copy summary";
    }, 1200);
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    renderHome();
    $("#back-btn").addEventListener("click", () => {
      $("#stage-view").classList.add("hidden");
      $("#home").classList.remove("hidden");
    });
    $("#copy-btn").addEventListener("click", copySummary);
    $("#print-btn").addEventListener("click", () => window.print());
  });
} else {
  module.exports = { STAGE_FNS };
}
