export type Answer = {
  id: number;
  question: string;
  keywords: string[];
  doctor: string;
  causes: string;
  cureTitle: string;
  cure: string[];
  redFlags: string;
  threat: string;
};

export const NOT_TRAINED = "Ai is not Trained full yet.";

export const answers: Answer[] = [
  {
    id: 1,
    question: "Mere pet me teen din se dard hai.",
    keywords: ["pet", "dard", "stomach", "abdomen", "pet dard", "gas", "acidity", "kabz"],
    doctor:
      "Dard kis jagah hai—upar, niche, right side ya left? Kya bukhar, ulti, gas, pet phoolna, kabz ya jalan bhi hai? Kabhi pet ki surgery ya chot lagi thi?",
    causes: "Gas/acidity, constipation, gastritis, food infection; kabhi-kabhi appendicitis/ulcer.",
    cureTitle: "Cure / Ghar par care",
    cure: [
      "Halka khana khayein: khichdi, dahi-chawal, banana.",
      "Oily, spicy, bahar ka khana avoid karein.",
      "Thoda-thoda garam paani piyen; ajwain/saunf chabha sakte hain.",
      "Gas/acidity lagne par OTC antacid doctor ki salah se le sakte hain.",
      "3 din se dard hai to doctor ko dikhayein; ultrasound/blood test ho sakta hai.",
    ],
    redFlags:
      "Tez dard jo badhta jaye, right lower side dard, pet hard ho, bar-bar ulti, bukhar, khoon, chakkar.",
    threat: "🟡 Moderate — agar upar ke red flags dikhe to 🔴 High/Emergency.",
  },
  {
    id: 2,
    question: "Mujhe kal raat se sar dard hai.",
    keywords: ["sar", "sir", "head", "headache", "sar dard", "migraine", "sirdard"],
    doctor:
      "Dard kitna tez hai (1-10)? Neend poori hui? Pani kam piya, screen zyada dekha ya stress? Bukhar, ulti, chakkar, gardan akadna, aankhon ke aage chamak ya weakness?",
    causes: "Tension headache, migraine, dehydration, eye strain, sinus, high BP.",
    cureTitle: "Cure / Ghar par care",
    cure: [
      "Aankhein band karke aaram karein; mobile/laptop break.",
      "Pani achchi tarah piyen; hunger avoid karein.",
      "Sar par cold/warm compress; halka head massage.",
      "Temporary relief ke liye Paracetamol (Crocin/Dolo 650) after food — dose label/doctor ke hisaab se. Bar-bar painkiller na lein.",
    ],
    redFlags:
      "Achaanak “zindagi ka sabse tez dard”, bukhar + gardan akadna, ulti, fits, weakness/numbness, speech/vision change, head injury.",
    threat: "🟢 Low to Moderate — red flags me 🔴 High/Emergency.",
  },
  {
    id: 3,
    question: "Mere hath me subah se jalan ho rahi hai.",
    keywords: ["hath", "haath", "hand", "jalan", "jhanjhni", "numbness", "kalai", "ungli"],
    doctor:
      "Jalan kahan hai—pura hath, ungliyan, kalai? Koi jhanjhni, sunn padna ya kamzori? Gardan dard? Kal raat heavy mobile/laptop/lifting kiya? Koi rash, laali ya sujjan?",
    causes:
      "Nerve compression (cervical spondylosis/carpal tunnel), Vitamin B12/D deficiency, allergy/contact dermatitis, repetitive strain.",
    cureTitle: "Cure / Ghar par care",
    cure: [
      "Hath/kalai ko aaram dein; baar-baar typing/lifting avoid.",
      "Sahi posture rakhein; light neck/hand stretching.",
      "Warm ya cold compress de sakte hain.",
      "Rash/itching ho to calamine lotion ya antihistamine — doctor ki salah se.",
      "B12/iron deficiency test karayein; supplements sirf test ke baad.",
    ],
    redFlags: "Hath me weakness, control loss, numbness badhna, fever, laali failna/infection.",
    threat: "🟢 Low (mild) — 🟡 Moderate (nerve/deficiency) — infection signs me 🔴 High.",
  },
  {
    id: 4,
    question: "Mujhe dil me dard ho raha hai.",
    keywords: ["dil", "heart", "seena", "chest", "chest pain", "dil me dard"],
    doctor:
      "Dard kab se? Kaisa hai—dabav, bhaaripan, jalan ya chubhan? Kya left arm, kandha, gardan, jabde ya peeth me jaa raha hai? Pasina, saans phoolna, ulti, chakkar, dhadkan tez? Pehle BP/sugar/heart problem?",
    causes:
      "Acidity/gas, muscle pull, anxiety — but heart-related (angina/heart attack) bhi ho sakta hai.",
    cureTitle: "Action / “Cure”",
    cure: [
      "Turant kaam band karke baith jayein ya aaram se let jayein; khud gaadi na chalayein.",
      "Agar doctor ne pehle heart ke liye Sorbitrate/GTN/Aspirin likha ho, to wahi prescribed medicine lein. Naye patient self-medication bilkul na karein.",
      "Emergency: 108/112 ya ambulance bulayein; ER me ECG, blood test, oxygen.",
      "Acidity lagne par bhi pehle heart cause rule out karwana zaroori hai.",
    ],
    redFlags:
      "Seene me dabav/bhaaripan, pasina, saans phoolna, dard 15-20 min se zyada, arm/jaw me failna.",
    threat: "🔴 HIGH / Emergency — jab tak cardiac cause rule out na ho.",
  },
  {
    id: 5,
    question: "Mujhe 2 din se bukhar hai, lagbhag 101-102°F.",
    keywords: ["bukhar", "fever", "temperature", "dengue", "malaria", "kanpkanpi"],
    doctor:
      "Bukhar kitna? Thand lagna/kanpkanpi, body ache, cough, ulti, loose motion, rash, peshab me jalan? Dengue/malaria season chal raha hai?",
    causes: "Viral fever, flu, dengue/malaria, bacterial infection.",
    cureTitle: "Cure / Ghar par care",
    cure: [
      "Pani, ORS, nariyal paani achchi tarah piyen.",
      "Halka khana; kapde halkay rakhein.",
      "Paracetamol (label/doctor ke dose par) bukhar/body pain ke liye. Bachchon ko aspirin na dein.",
      "3 din se upar bukhar rahe to CBC, malaria, dengue test karayein.",
    ],
    redFlags:
      "Bukhar 103°F+, rash, khoon aana (naak/masoodon se), pet dard, ulti, behoshi, saans phoolna.",
    threat: "🟡 Moderate — red flags me 🔴 High.",
  },
  {
    id: 6,
    question: "Mujhe 3 din se gala kharash hai aur khansi ho rahi hai.",
    keywords: ["gala", "kharash", "khansi", "cough", "throat", "tonsil", "balgam"],
    doctor:
      "Bukhar kitna? Khansi dry hai ya balgam wali? Saans lene me dikkat, seena dard, awaaz baithna? Koi COVID/flu exposure?",
    causes: "Viral sore throat, tonsillitis, allergy, post-nasal drip.",
    cureTitle: "Cure / Ghar par care",
    cure: [
      "Garam namak paani se 2-3 baar gargle.",
      "Steam lein; shahad + adrak ki chai (1 saal se chhote bachche ko shahad na dein).",
      "Garam paani piyen; thandi/fried/spicy cheezein avoid.",
      "Voice rest; throat lozenges doctor salah se.",
      "Bacterial infection (tonsils me pus) ho to doctor antibiotics denge; khud antibiotics na lein.",
    ],
    redFlags: "Saans phoolna, seena dard, high fever, khoon wali balgam, gala band hona.",
    threat: "🟢 Low (mostly viral) — complications me 🟡/🔴.",
  },
  {
    id: 7,
    question: "Kal raat se ulti aur loose motion ho rahe hain.",
    keywords: ["ulti", "vomit", "loose motion", "dast", "diarrhea", "food poisoning", "motion"],
    doctor:
      "Kitni baar hua? Bahar ka khana khaya? Pet me marod? Bukhar? Muh sukh raha, chakkar, peshab kam?",
    causes: "Viral gastroenteritis / food poisoning.",
    cureTitle: "Cure / Ghar par care",
    cure: [
      "ORS chhote-chhote ghoot piyen; nimbu-pani + chutki namak + cheeni.",
      "Khichdi, dahi-chawal, banana; doodh/oily/spicy avoid.",
      "Probiotic dahi; rest.",
      "Anti-emetic/diarrhea medicine sirf doctor ke prescription par.",
    ],
    redFlags: "Dehydration (kam peshab, sukha muh, chakkar), khoon/mucus, tez pet dard, high fever.",
    threat: "🟡 Moderate — dehydration/red signs me 🔴 High.",
  },
  {
    id: 8,
    question: "Peshab karte waqt jalan hoti hai aur baar baar lagta hai.",
    keywords: ["peshab", "urine", "uti", "jalan peshab", "urinary", "baar baar peshab"],
    doctor: "Bukhar? Kamar/peeth me dard? Peshab me khoon? Pregnant ho? Diabetes?",
    causes: "Urinary Tract Infection (UTI).",
    cureTitle: "Cure / Ghar par care",
    cure: [
      "Din me 2-3 litre paani piyen (agar kidney/heart problem na ho).",
      "Peshab rokein nahi; hygiene rakhein.",
      "Urine routine/microscopy + culture karayein; antibiotics course doctor hi likhenge, poora karein.",
      "Jalan ke liye doctor urinary alkalizer/sharbat de sakte hain.",
    ],
    redFlags: "Bukhar + kamjori, kidney/flank area dard, ulti, khoon, pregnancy.",
    threat: "🟡 Moderate — fever/flank pain me 🔴 High.",
  },
  {
    id: 9,
    question: "Mujhe kamar me 1 hafte se dard hai.",
    keywords: ["kamar", "back", "back pain", "sciatica", "slip disc", "peeth"],
    doctor:
      "Dard kahan hai? Pair/sciatica me jaa raha? Koi lifting/chot? Sunn padna, kamzori, peshab/pakhane me control change?",
    causes: "Muscle strain, slip disc, posture problem, weakness.",
    cureTitle: "Cure / Ghar par care",
    cure: [
      "Heavy lifting/bending avoid.",
      "1-2 din aaram ke baad halki walk aur stretching.",
      "Hot/cold compress; sahi mattress/posture.",
      "Painkiller/ointment doctor salah se; physiotherapy agar dard rahe.",
    ],
    redFlags:
      "Pair me kamzori/sunn, peshab/pakhane ka control kharab, saddle area numbness → emergency.",
    threat: "🟢 Low — red flags me 🔴 High (Emergency).",
  },
  {
    id: 10,
    question: "Mujhe chakkar aa rahe hain aur sar halka lag raha hai.",
    keywords: ["chakkar", "dizzy", "vertigo", "low bp", "behoshi", "sar halka"],
    doctor:
      "Khada hote hi? Khaali pet? Pani kam? BP/sugar? Kaan me ghoomna (vertigo)? Seena dard, dhadkan, behoshi, ek taraf kamzori?",
    causes: "Low BP, dehydration, low sugar, anemia, vertigo, heart rhythm issue.",
    cureTitle: "Cure / Ghar par care",
    cure: [
      "Turant baith jayein/let jayein; girne se bachein.",
      "Pani/ORS piyen; halka namkeen/khana.",
      "Aahista uthen; BP aur sugar check karayein.",
      "CBC, thyroid, B12 test karwa sakte hain.",
    ],
    redFlags:
      "Seena dard, saans phoolna, behoshi, ek taraf weak/numb, bolne me dikkat, tez dard → stroke/heart emergency.",
    threat: "🟡 Moderate — neuro/cardiac signs me 🔴 High/Emergency.",
  },
];

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

export function findAnswer(input: string): Answer | null {
  const query = normalize(input);
  if (!query) return null;
  let best: Answer | null = null;
  let bestScore = 0;

  for (const entry of answers) {
    let score = 0;
    if (query === normalize(entry.question)) score += 10;
    for (const keyword of entry.keywords) {
      if (query.includes(normalize(keyword))) score += normalize(keyword).includes(" ") ? 3 : 2;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 2 ? best : null;
}
