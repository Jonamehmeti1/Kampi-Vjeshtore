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

// Each card: age badge, title, description, three features, and button label.
// artwork picks a scene from /images/program-illustrations.png.
export const programs = [
  {
    ages: "4–6 vjeç",
    title: "Big Builders",
    subtitle: "",
    descriptions: [
      {
        title: "",
        text: "Hapat e parë në botën e inxhinierisë! Përmes ndërtimit të modeleve 3D me kitet K'NEX, fëmijët zhvillojnë kreativitetin, aftësitë motorike dhe mësojnë të mendojnë në mënyrë kritike e të pavarur.",
      },
    ],
    features: [
      "Ndërtimi i modeleve 3D",
      "Zhvillimi i aftësive motorike",
      "Mendim kritik dhe i pavarur",
    ],
    buttonLabel: "Zbulo programin",
    artwork: "builders",
    color: "orange",
  },
  {
    ages: "7–10 vjeç",
    title: "Bricks Challenge",
    subtitle: "Young Coders",
    descriptions: [
      {
        title: "Bricks Challenge",
        text: "Përmes ndërtimit të modeleve me LEGO, fëmijët eksplorojnë parimet e matematikës, fizikës, inxhinierisë dhe robotikës, duke zhvilluar kreativitetin, aftësitë e planifikimit, menaxhimin e kohës dhe mendimin e pavarur.",
      },
      {
        title: "Young Coders",
        text: "Fëmijët hedhin hapat e parë në botën e programimit, duke mësuar konceptet themelore të kodimit dhe duke zhvilluar mendimin logjik përmes aktiviteteve interaktive.",
      },
    ],
    features: [
      "Ndërtime kreative me LEGO dhe njohuri STEM",
      "Njohja me bazat e programimit",
      "Mendim logjik, kreativitet dhe zgjidhje problemesh",
    ],
    buttonLabel: "Shiko më shumë",
    artwork: "robotics",
    color: "gold",
  },
  {
    ages: "11–15 vjeç",
    title: "Algo Play",
    subtitle: "Junior Coders",
    descriptions: [
      {
        title: "Algo Play",
        text: "Kodimi takohet me robotikën! Përmes platformës Algobrix dhe ndërtimeve praktike me LEGO, pjesëmarrësit eksplorojnë bazat e kodimit, algoritmeve dhe planifikimit të projekteve në mënyrë kreative.",
      },
      {
        title: "Junior Coders",
        text: "Nga ideja te website-i! Pjesëmarrësit zbulojnë botën e zhvillimit të faqeve web, mësojnë si ndërtohet një website dhe përdorin kreativitetin për t'i kthyer idetë e tyre në faqe funksionale.",
      },
    ],
    features: [
      "Kodim dhe robotikë me Algobrix",
      "Algoritme dhe planifikim projektesh",
      "Krijimi i faqeve web",
    ],
    buttonLabel: "Eksploro programin",
    artwork: "coding",
    color: "lime",
  },
];

export const registration = {
  eyebrow: "Regjistrimi është i hapur",
  title: "Rezervo vendin e fëmijës në",
  highlightedTitle: "Kampin Vjeshtor",
  description:
    "shkruj diqka",
  dateNote: "3 ditë · 1.5 orë në ditë",
  ageNote: "Programe sipas grupmoshave",
  priceNote: "Falas",
  limitedPlaces: "Vendet janë të limituara, rezervo sot!",
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
