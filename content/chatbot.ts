// Free, local FAQ assistant. Camp facts stay in camp.ts.
import { camp, campFacts, programs, schedules, footer } from "./camp";

export const chatbot = {
  title: "Asistenti i kampit",
  subtitle: "Pyetje dhe përgjigje për kampin",
  openLabel: "Pyet për kampin",
  closeLabel: "Mbyll asistentin",
  placeholder: "Shkruaj një pyetje…",
  inputLabel: "Mesazhi yt",
  sendLabel: "Dërgo mesazhin",
  greeting:
    "Përshëndetje! Të ndihmoj me datat, çmimin, oraret, programet dhe regjistrimin. Për cilën moshë po interesohesh?",
  quickQuestions: ["Aktivitetet", "Datat", "Regjistrimi"],
  fallback:
    "Nuk e kuptova plotësisht. Për pyetje të tjera, na kontakto në " +
    footer.phone +
    ".",
};

export const chatbotTopics = [
  {
    id: "price",
    keywords: [
      "cmim",
      "cmimi",
      "cmimin",
      "kushton",
      "kushtojne",
      "pagese",
      "pagesa",
      "falas",
      "price",
      "cost",
      "free",
      "sa pare",
    ],
    answer: `Pjesëmarrja është ${campFacts.price}.`,
  },
  {
    id: "dates",
    keywords: ["data", "datat", "kur", "fillon", "mbaron", "date", "when"],
    answer: `Kampi mbahet më ${campFacts.dates} ${camp.year}. Kohëzgjatja: ${campFacts.duration}.`,
  },
  {
    id: "schedule",
    keywords: [
      "orar",
      "orarin",
      "orari",
      "oraret",
      "ora",
      "zgjat",
      "kohezgjatje",
      "schedule",
      "time",
      "sa ore",
    ],
    answer: `Kohëzgjatja: ${campFacts.duration}. Oraret e preferuara në formular janë: ${schedules.join(", ")}. Ekipi konfirmon disponueshmërinë pas aplikimit.`,
  },
  {
    id: "age",
    keywords: [
      "mosha",
      "moshat",
      "moshe",
      "moshen",
      "moshes",
      "vjec",
      "vjecar",
      "age",
      "years",
    ],
    answer: `Programet janë për moshat ${campFacts.ages}. ${programs.map((p) => `${p.title}: ${p.ages}`).join("; ")}. Sa vjeç është fëmija?`,
  },
  {
    id: "registration",
    keywords: [
      "regjistr",
      "aplik",
      "rezerv",
      "formular",
      "register",
      "signup",
      "sign up",
    ],
    answer:
      "Plotëso formularin e regjistrimit në faqe me të dhënat e prindit dhe fëmijës, moshën, shkollën dhe orarin e preferuar. Pas dërgimit me sukses, ekipi të kontakton për konfirmim. Biseda këtu nuk rezervon vend.",
  },
  {
    id: "activities",
    keywords: [
      "aktivitet",
      "program",
      "mesoj",
      "meso",
      "meson",
      "mesohet",
      "mesojne",
      "bej",
      "bejne",
      "activities",
      "learn",
      "lego",
      "robot",
      "robotike",
      "kodim",
      "programim",
    ],
    answer: programs
      .map((p) => `${p.title} (${p.ages}): ${p.features.join(", ")}.`)
      .join("\n\n"),
  },
  {
    id: "contact",
    keywords: [
      "kontakt",
      "kontaktoj",
      "telefon",
      "numri",
      "email",
      "whatsapp",
      "contact",
      "phone",
    ],
    answer: `Na kontakto në ${footer.phone} ose ${footer.email}. Mund të na shkruash edhe në WhatsApp në të njëjtin numër.`,
  },
  {
    id: "location",
    keywords: ["ku", "adresa", "adres", "lokacion", "vendndodh", "location", "where"],
    answer: `Adresa e saktë e kampit nuk është publikuar në këtë faqe. Kontakto ${camp.organizer} në ${footer.phone} për konfirmim.`,
  },
  {
    id: "availability",
    keywords: ["vende", "vend", "disponuesh", "mbetur", "plote", "available", "spots"],
    answer: `Vendet janë të limituara. Nuk mund të kontrolloj vendet e lira nga biseda; plotëso formularin ose kontakto ${footer.phone}. Ekipi konfirmon disponueshmërinë.`,
  },
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("sq")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Allow a single insertion, deletion, substitution or adjacent transposition.
function nearWord(a: string, b: string) {
  if (a.length < 5 || b.length < 5 || Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (a[i] && a[i] === b[i]) i++;
  return (
    a.slice(i + 1) === b.slice(i + 1) ||
    a.slice(i + 1) === b.slice(i) ||
    a.slice(i) === b.slice(i + 1) ||
    (a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2))
  );
}

export type ChatContext = { age?: number; awaitingAge?: boolean };

export function getReply(
  question: string,
  context: ChatContext = {},
): { text: string; context: ChatContext } {
  const normalized = normalize(question);
  const words = normalized.split(" ");
  const matches = chatbotTopics.filter((topic) =>
    topic.keywords.some((keyword) => {
      const key = normalize(keyword);
      if (key.includes(" ")) return ` ${normalized} `.includes(` ${key} `);
      return words.some(
        (word) =>
          word === key ||
          (key.length >= 5 && word.startsWith(key)) ||
          nearWord(word, key),
      );
    }),
  );
  const ageMatch =
    normalized.match(/\b(\d{1,2})\s*(?:vjec\w*|years?(?: old)?)\b/) ??
    normalized.match(/\b(?:mosha|moshe|age)\s+(\d{1,2})\b/) ??
    (context.awaitingAge ? normalized.match(/^(\d{1,2})$/) : null);
  const age = ageMatch ? Number(ageMatch[1]) : undefined;
  const wantsProgram =
    matches.some((t) => t.id === "activities" || t.id === "age") ||
    /^(po|yes)$/.test(normalized);
  const selectedAge = age ?? (wantsProgram ? context.age : undefined);
  const answers: string[] = [];
  if (selectedAge !== undefined) {
    const program = programs.find((p) => {
      const range = p.ages.match(/(\d+)\D+(\d+)/);
      return range && selectedAge >= Number(range[1]) && selectedAge <= Number(range[2]);
    });
    answers.push(
      program
        ? `Për ${selectedAge} vjeç, programi është ${program.title}${program.subtitle ? " / " + program.subtitle : ""}: ${program.features.join(", ")}. Për të aplikuar, plotëso formularin në faqe; ekipi konfirmon vendin dhe orarin.`
        : `Programet e publikuara janë për moshat ${campFacts.ages}. Për moshën ${selectedAge} vjeç, kontakto ${footer.phone} që ekipi të konfirmojë nëse ka mundësi pjesëmarrjeje.`,
    );
  }
  for (const topic of matches) {
    if (selectedAge !== undefined && ["age", "activities"].includes(topic.id)) continue;
    answers.push(topic.answer);
  }
  const nextContext = {
    age: age ?? context.age,
    awaitingAge:
      selectedAge === undefined &&
      matches.some((t) => ["age", "activities"].includes(t.id)),
  };
  if (answers.length) return { text: answers.join("\n\n"), context: nextContext };
  if (/^(pershendetje|tung|tungjatjeta|hello|hi|hej|miredita)\b/.test(normalized))
    return { text: chatbot.greeting, context: { ...context, awaitingAge: true } };
  if (/^(faleminderit|flm|rrofsh|thanks|thank you)\b/.test(normalized))
    return { text: "Me kënaqësi! A ke ndonjë pyetje tjetër për kampin?", context };
  if (/^(me shume|po|yes|si|cfare|a mundesh|ndihme)$/.test(normalized))
    return {
      text: "Për çfarë dëshiron më shumë informacion: programin sipas moshës, oraret apo regjistrimin?",
      context,
    };
  return { text: chatbot.fallback, context };
}
