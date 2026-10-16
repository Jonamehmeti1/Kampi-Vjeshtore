// EDIT THE WEBSITE INFORMATION HERE.
// Change the text between quotes. Keep commas, property names, and brackets.
// Camp information and branding for Young Engineers Prishtina.

export const camp = {
  name: "Kampi Vjeshtor",
  year: "2026",
  organizer: "Young Engineers Prishtina",
  pageTitle: "Kampi Vjeshtor | Young Engineers Prishtina",
  description:
    "Kampi Vjeshtor me Inteligjencë Artificiale — tri ditë mësimi, lojërash dhe krijimi.",
  headerLogo: "/images/logo.png",
  footerLogo: "/images/footerLogo.png",
  applyButton: "Apliko Tani",
};

export const hero = {
  badge: "Kampi Vjeshtor",
  title: "Kampi",
  highlightedTitle: "Vjeshtor",
  subtitle: "INXHINIERI • SHKENCË • TEKNOLOGJI",
  lead: "3 ditë plot zbulime, eksperimente dhe kreativitet!",
  description:
    "Gjatë tri ditëve të kampit, fëmijët do të zbulojnë botën e inxhinierisë, shkencës dhe teknologjisë përmes aktiviteteve interaktive, ndërtimeve kreative dhe sfidave të programimit. Një eksperiencë ku kurioziteti shndërrohet në kreativitet dhe çdo ide merr jetë!",
  image: "/images/background.jpg",
  imageAlt: "Nxënës të Young Engineers Prishtina duke mësuar me laptop",
};

// Used in both the hero and the lower registration section.
export const campFacts = {
  dates: "27-29 tetor",
  ages: "4-15 vjeç",
  duration: "1.5 orë / ditë",
  price: "Falas",
};

export const programsSection = {
  title: "Programet",
  description:
    "Zgjidh grupin dhe zbulo programin e duhur për fëmijën tuaj.",
};

// Each card: age badge, title, three features, and button label.
// artwork picks a scene from /images/program-illustrations.png.
export const programs = [
  {
    ages: "4–6 vjeç",
    title: "Big Builders",
    subtitle: "",
    features: ["Modele 3D me K'NEX", "Aftësi motorike", "Mendim kritik"],
    buttonLabel: "Regjistrohu",
    artwork: "builders",
    color: "orange",
  },
  {
    ages: "7–10 vjeç",
    title: "Bricks Challenge",
    subtitle: "Young Coders",
    features: [
      "Ndërtime LEGO & STEM",
      "Bazat e programimit",
      "Logjikë & zgjidhje problemesh",
    ],
    buttonLabel: "Regjistrohu",
    artwork: "robotics",
    color: "gold",
  },
  {
    ages: "11–15 vjeç",
    title: "Algo Play",
    subtitle: "Junior Coders",
    features: ["Robotikë me Algobrix", "Algoritme & planifikim", "Krijimi i faqeve web"],
    buttonLabel: "Regjistrohu",
    artwork: "coding",
    color: "lime",
  },
];

export const registration = {
  eyebrow: "Regjistrimi është i hapur",
  title: "Rezervo vendin e fëmijës",
  preposition: "në",
  highlightedTitle: "Kampin Vjeshtor",
  description:
    "Zgjidh programin sipas grupmoshës dhe bëhu pjesë e 3 ditëve plot zbulime, eksperimente dhe kreativitet.",
  dateNote: "3 ditë · 1.5 orë në ditë",
  ageNote: "Programe sipas grupmoshave",
  priceNote: "Vendet janë të limituara",
  limitedPlaces: "Vendet janë të limituara,",
  limitedPlacesAction: "rezervo sot!",
};

// The form is a local preview. It does not send, store, or reserve anything.
export const formText = {
  heroTitle: "Regjistro fëmijën tani",
  heroDescription: "Plotëso të dhënat për të rezervuar vendin.",
  lowerTitle: "Regjistro fëmijën",
  parentLabel: "Emri dhe mbiemri i prindit",
  parentPlaceholder: "p.sh. Arben Gashi",
  phoneLabel: "Telefoni",
  phonePlaceholder: "+383 4X XXX XXX",
  childLabel: "Emri dhe mbiemri i fëmijës",
  childPlaceholder: "p.sh. Zana Gashi",
  ageLabel: "Mosha",
  agePlaceholder: "Zgjidh moshën",
  ageSuffix: "vjeç",
  scheduleLabel: "Orari i preferuar",
  schedulePlaceholder: "Zgjidh orarin",
  schoolLabel: "Shkolla e fëmijës",
  schoolPlaceholder: "Zgjidh shkollën",
  otherSchool: "Tjetër",
  otherSchoolLabel: "Emri i shkollës",
  otherSchoolPlaceholder: "Shkruaj emrin e shkollës",
  submitButton: "Regjistrohu",
  demoFeedback:
    "Formulari u provua me sukses. Ky është një demonstrim; nuk u dërguan të dhëna dhe nuk u rezervua vend.",
};

// Options shown in the registration forms.
export const ages = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
export const schedules = [
  "09:00–10:30",
  "10:45–12:15",
  "13:30–15:00",
  "15:30–17:00",
  "17:30–19:00",
];

export const footer = {
  tagline: "Ndërto aftësitë. Ndërto të ardhmen.",
  email: "yeprishtina@gmail.com",
  phone: "+383 48 108 128",
  phoneLink: "+38348108128",
  socialLinks: [
    {
      name: "Facebook",
      icon: "facebook",
      url: "https://www.facebook.com/yeprishtina",
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://www.instagram.com/yeprishtina/",
    },
    { name: "WhatsApp", icon: "whatsapp", url: "https://wa.me/38348108128" },
    { name: "Viber", icon: "viber", url: "viber://chat?number=38348108128" },
  ],
};
