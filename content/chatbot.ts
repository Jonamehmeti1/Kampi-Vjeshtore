// Chatbot words and answers live here. This is a preset FAQ demo, not AI.
// Camp facts come from camp.ts so they stay consistent with the page.
import { camp, campFacts } from "./camp";

export const chatbot = {
  title: "Asistenti i kampit",
  subtitle: "Demo · përgjigje të paracaktuara",
  openLabel: "Pyet për kampin",
  closeLabel: "Mbyll asistentin",
  placeholder: "Shkruaj një pyetje…",
  inputLabel: "Mesazhi yt",
  sendLabel: "Dërgo mesazhin",
  greeting:
    "Përshëndetje! Mund të të ndihmoj me informacion për kampin. Ky është një demonstrim me përgjigje të paracaktuara.",
  quickQuestions: ["Aktivitetet", "Datat", "Regjistrimi"],
  fallback: "Mund të më pyesësh për aktivitetet, datat, moshat dhe regjistrimin.",
};

export const chatbotTopics = [
  {
    keywords: ["çmim", "cmim", "kusht", "pages", "falas"],
    answer: "Pjesëmarrja është " + campFacts.price + ".",
  },
  {
    keywords: ["dat", "kur", "orar"],
    answer:
      "Kampi mbahet më " +
      campFacts.dates +
      ", me kohëzgjatje " +
      campFacts.duration +
      ".",
  },
  {
    keywords: ["mosh", "vjeç", "vjec"],
    answer: "Programet në këtë draft janë për moshat " + campFacts.ages + ".",
  },
  {
    keywords: ["regjistr", "aplik"],
    answer:
      "Mund të provosh formularët në faqe. Ata janë demonstrues: asnjë e dhënë nuk dërgohet ose ruhet dhe asnjë vend nuk rezervohet.",
  },
  {
    keywords: ["aktiv", "program", "mëso", "meso", "kamp"],
    answer:
      camp.name +
      " nga " +
      camp.organizer +
      " prezanton AI, lojëra, dizajn dhe projekte praktike.",
  },
];
