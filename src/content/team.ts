/**
 * Leadership roster, in display order. Bios are the client's own copy —
 * reproduce verbatim.
 */

export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  image: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    slug: "elle-aviv",
    name: "Ayellet (Elle) Aviv",
    title: "Founder",
    image: "/assets/team/elle-aviv.webp",
    bio: "Elle brings a strong background in national security, strategic defense, and counterterrorism shaped by her service in an elite fighter squadron of the Israeli Air Force. In the wake of the October 7 attacks, she led viral campaigns highlighting the hostage crisis and keeping international attention on those affected. She has organized high-impact events featuring diplomats, military experts, and activists, with a proven ability to mobilize people, resources, and attention in support of critical causes. She also serves as Head of the Israeli Desk for the International Freedom Coalition.",
  },
  {
    slug: "mia-vaile",
    name: "Mia Vaile",
    title: "Executive Vice President",
    image: "/assets/team/mia-vaile.webp",
    bio: "A research-driven strategist focused on investigating extremist networks, anti-Western ideologies, and the narratives that enable radicalization. Known for a sharp analytical approach, Mia specializes in investigative articles, detailed reports, and public-facing exposés that translate complex issues into clear, actionable insights. Drawing on a background in psychology, media engagement, and public debate, she contributes to educational initiatives that counter false narratives and strengthen public understanding.",
  },
  {
    slug: "greta-elias",
    name: "Greta Elias",
    title: "Global Relations & Communications Liaison",
    image: "/assets/team/greta-elias.webp",
    bio: "Greta brings a rare firsthand perspective shaped by family history and lived experience; her Iraqi Jewish family survived the 1941 Farhud pogrom and was forced to flee. A former IDF soldier fluent in English, Hebrew, and Arabic, she is uniquely positioned to engage across cultures, communities, and regions, combining resilience, authenticity, and strategic outreach to strengthen partnerships and advance the defense of democratic values.",
  },
  {
    slug: "itai-reuveni",
    name: "Itai Reuveni",
    title: "Strategic Advisor",
    image: "/assets/team/itai-reuveni.webp",
    bio: "An expert on international NGO networks, political advocacy campaigns, and the mechanisms through which narratives shape public policy and international discourse. A former IDF combat soldier who completed multiple periods of reserve duty during recent conflicts, he has developed expertise at the intersection of security, public diplomacy, media narratives, and international advocacy, and lectures regularly on anti-Israel campaigns and strategic communications.",
  },
  {
    slug: "charles-jacobs",
    name: "Dr. Charles Jacobs",
    title: "Sr. Advisor on Counter-Jihadism",
    image: "/assets/team/charles-jacobs.webp",
    bio: "A Harvard-educated human rights activist who has spent nearly 40 years fighting persecution and injustice worldwide. In 1993, Dr. Jacobs co-founded the American Anti-Slavery Group, which raised money to liberate tens of thousands of enslaved African Christians in Sudan, himself flying there illegally in 2001 and 2011 to witness slave liberations. For that work, he received the Boston Freedom Award from Coretta Scott King in 2000. That same year, the AASG's activism helped force New York City to no longer invest public employees' pensions in Talisman, a Canadian energy company which extracted oil from southern Sudan. He has testified before Congress multiple times and, after nearly two years of intense lobbying, was present at the White House for the signing of the 2002 Sudan Peace Act. He has since founded or co-founded several major organizations combating anti-Semitism, terrorism, and threats to democratic values. In 2007, The Forward recognized him as one of America's top 50 Jewish leaders. He is the co-editor of the book Betrayal: The Failure of American Jewish Leadership (Wicked Son, 2023).",
  },
  {
    slug: "sandra-alfonsi",
    name: "Dr. Sandra Alfonsi",
    title: "Academic Advisor & Researcher",
    image: "/assets/team/sandra-alfonsi.webp",
    bio: "Born and educated in Washington, D.C., Dr. Alfonsi earned her Ph.D. in French Language and Literature and taught at colleges including Baruch (CUNY), Fordham, and St. John's. She dedicates most of her energy to U.S. textbook and curriculum review; her expertise spans Judaism as a world religion, the Holocaust, the history of Israel, and the portrayal of terrorism and October 7 in U.S. textbooks. She serves as Academic Advisor to Proclaiming Justice to the Nations and Director of Truth in Textbooks, and lives in Jerusalem.",
  },
  {
    slug: "emanuel-rund",
    name: "Emanuel Rund",
    title: "Academic Advisor on the Holocaust",
    image: "/assets/team/emanuel-rund.webp",
    bio: "Internationally acclaimed producer-director-writer of 240 films and TV programs on Jewish topics, social justice, and Tikkun Olam, including 30 films on the Holocaust (“All Jews Out!”, an Oscar nominee). Creator of a major archive of historical, cultural, and religious content across the USA, Israel, and Europe. In 1996 he initiated the January 27th German Memorial Day to the Holocaust, adopted by the UN in 2005 as International Holocaust Remembrance Day.",
  },
  {
    slug: "deborah-statman",
    name: "Deborah Statman",
    title: "Civil & Human Rights Policy Strategist",
    image: "/assets/team/deborah-statman.webp",
    bio: "A seasoned New York State attorney whose career spans top firms including Kelley Drye & Warren and Milbank. As Chief of Digital Activism and Director of Strategy Advocacy, she designs high-impact initiatives combating antisemitism, documenting civil rights violations, and addressing threats to education at the university and K-12 levels. She has spearheaded investigative and advocacy efforts submitted to policymakers, members of Congress, and civil rights agencies.",
  },
  {
    slug: "ali-marks",
    name: "Ali Marks",
    title: "Education Systems & Institutional Accountability Strategist",
    image: "/assets/team/ali-marks.webp",
    bio: "A veteran New York City public school educator with over two decades of classroom experience. She developed The EMET Project, a research and accountability model designed to identify gaps between intention and impact in education systems, particularly around misinformation, antisemitism, and ideological bias. She connects classroom-level experience with systems-level analysis to strengthen transparency and oversight across K-12 education.",
  },
  {
    slug: "samantha-nassimi",
    name: "Samantha Nassimi",
    title: "Digital Strategist & Community Organizer",
    image: "/assets/team/samantha-nassimi.webp",
    bio: "A political strategist and social media consultant with a strong background in digital communications, civic education, advocacy, and community engagement. Raised within both Iranian and Israeli cultures and fluent in Hebrew and Farsi, she founded Nassimi Media and co-founded Stop The Squad, a civic engagement platform grown to over 21,000 followers in under a year. She is passionate about building connections and advancing civic education through strategic communication and grassroots engagement.",
  },
];

/** The four members shown in the home page leadership preview. */
export const teamPreview = [
  { name: "Ayellet (Elle) Aviv", role: "Founder", image: "/assets/team/elle-aviv.webp" },
  { name: "Mia Vaile", role: "Executive Vice President", image: "/assets/team/mia-vaile.webp" },
  {
    name: "Greta Elias",
    role: "Global Relations & Communications",
    image: "/assets/team/greta-elias.webp",
  },
  { name: "Itai Reuveni", role: "Strategic Advisor", image: "/assets/team/itai-reuveni.webp" },
] as const;
