/**
 * Supporting data for the Charlie Kirk report and the Rama Duwaji article.
 *
 * The report's three charts existed only as prose in the source PDF; these are
 * the figures behind the bar visualizations on the article page. The reference
 * list is the article's own source URLs.
 */

export type ChartRow = { label: string; value: number; display: string };

export type Chart = {
  title: string;
  subtitle: string;
  rows: ChartRow[];
  max: number;
  note: string;
};

export const charlieKirkCharts: Chart[] = [
  {
    "title": "Chart 1 · Immediate reach on X after Kirk's assassination",
    "subtitle": "Reported reach of high-risk content in the immediate aftermath of the September 10, 2025 killing.",
    "rows": [
      {
        "label": "Viral antisemitic posts blaming Jews or Israel (CCDH)",
        "value": 139,
        "display": "139M views"
      },
      {
        "label": "Posts calling for retaliatory violence (AP)",
        "value": 43,
        "display": "43M views"
      }
    ],
    "max": 139,
    "note": "Within days of Charlie Kirk's murder, antisemitic and retaliatory narratives reached massive audiences on X, showing how quickly the assassination became a vehicle for online extremism."
  },
  {
    "title": "Chart 2 · Documented volume of antisemitic conspiracy content",
    "subtitle": "Reported post counts from separate watchdog and media analyses after Kirk's murder.",
    "rows": [
      {
        "label": "Antisemitic conspiracy posts in 3 days (SPLC sample)",
        "value": 18000,
        "display": "18,000+ posts"
      },
      {
        "label": "Posts using \\u201CIsrael killed Charlie Kirk\\u201D (Jerusalem Post / ADL)",
        "value": 10000,
        "display": "10,000+ posts"
      }
    ],
    "max": 18000,
    "note": "Separate analyses documented thousands of antisemitic posts within days of Kirk's assassination, with narratives repeatedly blaming Israel, Jews, Mossad, or Zionists."
  },
  {
    "title": "Chart 3 · Foreign propaganda and the broader conspiracy environment",
    "subtitle": "Reported volume of foreign-state media mentions and related conspiracy narratives after the assassination.",
    "rows": [
      {
        "label": "X posts containing \\u201Ctrans\\u201D (CIS / ISD)",
        "value": 46000,
        "display": "46,000+ posts"
      },
      {
        "label": "Posts about civil war (CIS / ISD)",
        "value": 26000,
        "display": "~26,000 posts"
      },
      {
        "label": "Russian, Chinese, Iranian state media mentions of Kirk, Sept 10\\u201317 (NewsGuard)",
        "value": 6200,
        "display": "6,200 mentions"
      }
    ],
    "max": 46000,
    "note": "Foreign propaganda and domestic conspiracy narratives flooded the information space after Kirk's murder. Russia amplified instability and Ukraine-related claims, while pro-Iranian networks more directly pushed Israel/Mossad conspiracy narratives."
  }
];

/** Source list for the Charlie Kirk report. Each entry carries inline markup. */
export const charlieKirkSources: string[] = [
  "<strong>Center for Countering Digital Hate</strong> — Reported 126 viral antisemitic X posts blaming Jews or Israel for Kirk's assassination, totaling nearly 140 million views.",
  "<strong>Associated Press</strong> — Reported that Russia, China, and pro-Iranian groups exploited Kirk's killing to widen U.S. divisions; AP also reported 43 million X views on posts calling for retaliatory violence.",
  "<strong>Jerusalem Post / ADL</strong> — Reported more than 10,000 X posts using the phrase “Israel killed Charlie Kirk” after September 10, and documented the rapid spread of Israel/Jewish conspiracy claims.",
  "<strong>Southern Poverty Law Center</strong> — Reported that hard-right actors pushed antisemitic conspiracy theories after Kirk's killing and cited a sample showing over 18,000 antisemitic conspiracy posts in the three days after the murder.",
  "<strong>Combat Antisemitism Movement</strong> — Documented early antisemitic claims blaming Jews and Israel for Kirk's murder and framed them as part of a recurring scapegoating pattern after major tragedies.",
  "<strong>ADL backgrounder on Candace Owens</strong> — Described Owens as a major broadcaster of conspiratorial antisemitism and said her conspiracy theories extended to Kirk's September 2025 assassination.",
  "<strong>Al-Monitor / NewsGuard</strong> — Reported that Russian, Chinese, and Iranian state media mentioned Kirk 6,200 times from September 10–17 and that Iranian state media pushed Israel/Mossad claims.",
  "<strong>ABC News / CIS / ISD</strong> — Reported Russian-backed misinformation after Kirk's shooting and cited roughly 26,000 posts about civil war and more than 46,000 X posts containing “trans.”",
  "<strong>Moment Magazine</strong> — Explained “goyslop” as an antisemitic term tied to conspiracy claims that Jews are corrupting or weakening non-Jews through food, culture, or programming.",
  "<strong>Blue Square Alliance</strong> — Explained how extremists weaponize “goy,” “good goy,” “Shabbos goy,” and “goyslop” to push claims of Jewish control, contempt, or manipulation."
];

/** Reference URLs cited by "A Pattern in Plain Sight". */
export const duwajiReferences: string[] = [
  "https://www.thefp.com/p/nyc-first-lady-liked-post-oct-7-rape-hoax",
  "https://longisland.news12.com/mamdanis-wife-liked-posts-that-referred-to-mass-rape-hoax-during-oct-7-attack-in-israel-report",
  "https://jewishinsider.com/2026/03/zohran-mamdani-wife-rama-duwaji-social-media-oct-7/",
  "https://www.nytimes.com/2026/03/06/nyregion/mamdani-rama-wife-israel.html",
  "https://en.wikipedia.org/wiki/Bassel_al-Araj",
  "https://www.fdd.org/analysis/2023/12/04/7-things-to-know-about-campus-support-for-hamas-and-antisemitism/",
  "https://nypost.com/2026/03/09/us-news/mamdani-hosts-anti-israel-activist-mahmoud-khalil-at-gracie-mansion-for-ramadan/",
  "https://www.justice.gov/archives/opa/pr/federal-judge-hands-downs-sentences-holy-land-foundation-case",
  "https://ngo-monitor.org/reports/medical_aid_for_palestinians_politicizing_medicine_inflaming_conflict/",
  "https://ngo-monitor.org/ngos/medical_aid_for_palestinians_map_/",
  "https://www.flgov.com/eog/sites/default/files/executive-orders/2025/EO%2025-244.pdf",
  "https://gov.texas.gov/news/post/governor-abbott-designates-muslim-brotherhood-cair-as-foreign-terrorist-organizations",
  "https://www.foxnews.com/politics/nyc-mayor-mamdanis-wife-glorified-terrorists-online-posts-criticized-us-military",
  "https://nypost.com/2026/04/15/us-news/nyc-first-lady-rama-duwaji-apologizes-for-past-harmful-social-media-content/",
  "https://nypost.com/2026/05/14/us-news/nyc-first-lady-rama-duwaji-takes-aim-at-israel-thru-spotify-account-report",
  "https://www.dailywire.com/news/mamdanis-wife-co-hosts-all-female-retreat-that-rewrites-history-about-jesus-mother"
];
