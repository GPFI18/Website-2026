/**
 * The nine programs, and the eight International Freedom Coalition desks that
 * make up program 08.
 */

export type Program = {
  number: string;
  title: string;
  description: string;
};

/** Programs 01–07. 08 (the desk grid) and 09 are laid out separately. */
export const programs: Program[] = [
  {
    number: "01",
    title: "Language & Communication",
    description:
      "Developing strategic language and communication training for leaders, creators, and media professionals, so those defending democratic values can speak with clarity, precision, and impact.",
  },
  {
    number: "02",
    title: "K-12 & Higher Education",
    description:
      "Countering Islamist infiltration and ideological bias within K–12 and higher education, and standing with educators and students facing antisemitism, intimidation, and organized misinformation on campuses and in classrooms.",
  },
  {
    number: "03",
    title: "CAIR, Muslim Brotherhood & NGOs",
    description:
      "Exposing and confronting the Islamist networks behind CAIR, the Muslim Brotherhood, and their affiliated NGOs, mapping the influence operations, front groups, and funding structures they use to shape public policy and discourse.",
  },
  {
    number: "04",
    title: "BDS & Protecting Your Cities",
    description:
      "Advancing municipal and state-level strategies to counter BDS initiatives and protect local governments and institutions from ideological capture.",
  },
  {
    number: "05",
    title: "Technology Hub",
    description:
      "Leveraging technology, data, and digital platforms to identify jihadist funding streams, online radicalization pipelines, and coordinated Islamist activity before it reaches communities.",
  },
  {
    number: "06",
    title: "Building Bridges With Allies",
    description:
      "Building durable alliances across faiths, ethnic communities, and political backgrounds, including Muslim reformers and victims of jihad, grounded in shared Western values and national security.",
  },
  {
    number: "07",
    title: "National Voter Registration Program",
    description:
      "Registering and mobilizing voters nationwide so that communities who care about security, truth, and democratic values are represented at every level of government, from school boards and city councils to Congress.",
  },
];

export const coalitionProgram = {
  number: "08",
  title: "International Freedom Coalition Desks",
  description:
    "A standing coalition of eight regional desks, each led by a dissident, survivor, or advocate with firsthand authority on persecution in their region. Together they share intelligence, coordinate advocacy, and give voice to communities targeted by Islamist and jihadist violence.",
};

export const internProgram = {
  number: "09",
  title: "Intern Program",
  description:
    "Training the next generation of researchers, writers, and advocates. Interns work directly with our think tank leads and coalition desks on live research, investigations, and campaigns, gaining real experience in policy, media, education, and coalition-building.",
};

export type Desk = {
  region: string;
  name: string;
  role: string;
  /** Portrait slug, including the -v3 suffix carried by the source crops. */
  slug: string;
};

export const desks: Desk[] = [
  {
    region: "Druze",
    name: "Rania Dean",
    role: "Founder, Covenant · Board Member, ICAN",
    slug: "rania-dean-v3",
  },
  {
    region: "Iran",
    name: "Gazelle Sharmahd",
    role: "Human rights activist · Founder, #CutTheRope campaign",
    slug: "gazelle-sharmahd-v3",
  },
  {
    region: "Israel",
    name: "Ayellet (Elle) Aviv",
    role: "Founder, Global Peace for Israel · Israeli Air Force veteran",
    slug: "elle-aviv-ifc-v3",
  },
  {
    region: "Nigeria",
    name: "Stephen Enada",
    role: "Executive President & Co-Founder, ICON",
    slug: "stephen-enada-v3",
  },
  {
    region: "Syria",
    name: "Sarah Abbas",
    role: "Co-Founder & Vice President, Western Syria Alliance",
    slug: "sarah-abbas-v3",
  },
  {
    region: "Africa",
    name: "Prof. Chioma Okeoma",
    role: "Dossier Leader · West Africa Desk",
    slug: "chioma-okeoma-v3",
  },
  {
    region: "Sudan",
    name: "Francis Bok",
    role: "Author, Escape from Slavery · Anti-slavery advocate",
    slug: "francis-bok-v3",
  },
  {
    region: "Iraq",
    name: "Juliana Taimoorazy",
    role: "Founder, Iraqi Christian Relief Council · Nobel Peace Prize nominee",
    slug: "juliana-taimoorazy-v3",
  },
];

/** The six strategy think tanks shown on the home page. `icon` is an SVG path. */
export const thinkTanks = [
  {
    title: "Language & Communication",
    description:
      "Developing strategic language and communication training for leaders, creators, and media professionals.",
    icon: "M8 10h8M8 14h5M21 12a9 9 0 0 1-9 9l-4 2 1-4a9 9 0 1 1 12-7z",
  },
  {
    title: "K-12 & Higher Education",
    description:
      "Countering Islamist infiltration and ideological bias across education, and standing with educators and students facing intimidation, antisemitism, and misinformation.",
    icon: "M3 9l9-5 9 5-9 5-9-5zM7 11v5c0 1 2 3 5 3s5-2 5-3v-5M21 9v5",
  },
  {
    title: "CAIR, Muslim Brotherhood & NGOs",
    description:
      "Exposing and confronting the Islamist networks that launder extremism through respectable institutions, including CAIR, the Muslim Brotherhood, and affiliated NGOs.",
    icon: "M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z M9 12l2 2 4-4",
  },
  {
    title: "BDS & Protecting Your Cities",
    description:
      "Advancing municipal and state-level strategies to counter BDS initiatives and protect local governments from ideological capture.",
    icon: "M3 20h18M6 20V9l6-4 6 4v11M10 20v-5h4v5",
  },
  {
    title: "Technology Hub",
    description:
      "Leveraging technology, data, and digital platforms to identify funding streams, online radicalization, and coordinated activity.",
    icon: "M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M6 6h12v12H6z M10 10h4v4h-4z",
  },
  {
    title: "Building Bridges With Allies",
    description:
      "Building durable alliances across faiths, ethnic communities, and political backgrounds grounded in shared values.",
    icon: "M4 18v-4a2 2 0 0 1 2-2h3M20 18v-4a2 2 0 0 0-2-2h-3M9 12V8a3 3 0 0 1 6 0v4M8 21h8",
  },
] as const;
