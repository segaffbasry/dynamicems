// Everything on the live site that isn't rebuilt here links back to it. Copy is verbatim from dynamic-ems.com.
export const live = "https://dynamic-ems.com";

export type Link = { name: string; href: string; note?: string };
export type MenuGroup = { id: string; label: string; title: string; blurb: string; links: Link[] };

export const contact = {
  company: "Dynamic EMS Ltd",
  address: ["Taxi Way", "Hillend & Donibristle Ind. Est.", "Dunfermline, KY11 9ET, UK"],
  phone: "+44 (0)1383 822911",
  phoneHref: "tel:+441383822911",
  fax: "+44 (0)1383 824740",
  email: "info@dynamic-ems.com",
};

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/dynamic-ems", icon: "linkedin" },
  { name: "X", href: "https://twitter.com/DynamicEMS_News", icon: "x" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCqyrBg6r_Ost7J5TWw62eEA", icon: "youtube" },
] as const;

export const film = "https://www.youtube.com/watch?v=dSeZ2lLXWi4";

/* The live site's six "Dynamic" pillars, in the order its hero rotator shows them. */
export const pillars: Link[] = [
  { name: "Dynamic EMS", href: `${live}/electronics-manufacturing/`, note: "Electronics manufacturing" },
  { name: "Dynamic Development", href: `${live}/development/`, note: "Design to development" },
  { name: "Dynamic Supply Chain", href: `${live}/supply-chain/`, note: "Sourcing & logistics" },
  { name: "Dynamic Markets", href: `${live}/market-sectors/`, note: "Seven market sectors" },
  { name: "Dynamic Quality", href: `${live}/about-us/our-quality/`, note: "Accreditations & QMS" },
  { name: "Dynamic People", href: `${live}/about-us/our-people/`, note: "The team" },
];

export const sectors = [
  { name: "Defence & Security", href: `${live}/market-sectors/defence-security/`, image: "/brand/defence_home.webp", text: "Defence programmes demand quality, reliability, and complete confidence in the supply chain. Dynamic EMS delivers high-reliability electronics manufacturing services for defence and security OEMs, supporting everything from prototype development through to full-scale production. With robust quality systems, full traceability, and JOSCAR Registered status, we provide the assurance customers need when failure is not an option." },
  { name: "Aviation", href: `${live}/market-sectors/aviation/`, image: "/brand/Aviation-cover.jpg", text: "We operate at both ends of the market. From supplying the commercial airline sector with electronic content in six major airports, to instrumentation in light aircraft, Dynamic EMS manufactures products that deliver peak performance in the harshest of environments…" },
  { name: "Communications & Computing", href: `${live}/market-sectors/communications-computing/`, image: "/brand/Computing-cover.jpg", text: "Our investment in technology and our commitment to the Communications and Computing markets has strengthened our market segment portfolio of major blue chip and developmental technology companies…" },
  { name: "Energy", href: `${live}/market-sectors/energy-environmental/`, image: "/brand/Energy-cover.jpg", text: "As a market leader in providing the electronic content for fuel dispensing systems for over 15 years, we truly understand the need for reliability in the field. We are experts in delivering world-class solutions, tailored to meet your needs, whether you are drilling or dispensing…" },
  { name: "Industrial", href: `${live}/market-sectors/industrial-instrumentation/`, image: "/brand/Industrial-cover.jpg", text: "Dynamic EMS has been operating in the Industrial and Instrumentation sector since conception. Working with large multinationals to niche market specialists, we support customers with a widely diverse range of product portfolios through our agile and flexible approach to doing business…" },
  { name: "Healthcare & Life Sciences", href: `${live}/market-sectors/healthcare-life-sciences/`, image: "/brand/Health-cover.jpg", text: "Working in high-reliability market segments means quality and reliability are paramount. Our in-house QMS system ensures our customers have complete traceability throughout the product build and conformity to required industry certifications…" },
  { name: "Safety & Security", href: `${live}/market-sectors/homeland-security/`, image: "/brand/Security-cover.jpg", text: "As this market evolves to meet the challenges and threats to personal, organisational and global security, Dynamic EMS stays ahead of the curve, meeting the needs of newer markets in counter-terrorism and wearable technology. Providing industry solutions to OEMs operating in secure and confidential environments…" },
];

export const menu: MenuGroup[] = [
  {
    id: "what-we-do", label: "What we do", title: "We are your product solutions architect",
    blurb: "From design to distribution, we enable our customers to be more competitive by bringing innovative solutions to market faster.",
    links: [
      { name: "Dynamic EMS", href: `${live}/electronics-manufacturing/` },
      { name: "Dynamic Development", href: `${live}/development/` },
      { name: "Dynamic Supply Chain", href: `${live}/supply-chain/` },
      { name: "Dynamic Quality", href: `${live}/about-us/our-quality/` },
      { name: "Test", href: `${live}/test/` },
      { name: "Inspection", href: `${live}/inspection/` },
      { name: "Conformal Coating", href: `${live}/conformal-coating/` },
      { name: "Logistics", href: `${live}/logistics/` },
      { name: "Maintenance", href: `${live}/maintenance/` },
    ],
  },
  {
    id: "markets", label: "Markets", title: "Enabling scale, scope & speed",
    blurb: "Quite simply, we dynamically enable all types of technology companies to optimise their performance.",
    links: [{ name: "All market sectors", href: `${live}/market-sectors/` }, ...sectors.map(({ name, href }) => ({ name, href }))],
  },
  {
    id: "media", label: "Media Hub", title: "Dynamic news",
    blurb: "News, press releases, case studies, technical papers, films and podcasts from Dynamic EMS.",
    links: [
      { name: "All news", href: "/news" },
      { name: "Press Releases", href: "/news?category=press-releases" },
      { name: "Case Studies", href: "/news?category=case-studies" },
      { name: "Technical Papers", href: "/news?category=technical-papers" },
      { name: "Blog", href: "/news?category=blog" },
      { name: "Corporate Videos", href: "/news?category=corporate-videos" },
      { name: "Careers News", href: "/news?category=careers-news" },
      { name: "Podcasts", href: "/news?category=podcasts" },
    ],
  },
  {
    id: "about", label: "About", title: "We are Dynamic.",
    blurb: "At Dynamic EMS we understand that no two customers are the same.",
    links: [
      { name: "About us", href: `${live}/about-us/` },
      { name: "Our profile", href: `${live}/about-us/our-profile/` },
      { name: "Our history", href: `${live}/about-us/our-history/` },
      { name: "Our people", href: `${live}/about-us/our-people/` },
      { name: "Our quality", href: `${live}/about-us/our-quality/` },
      { name: "Careers", href: `${live}/careers/` },
    ],
  },
  {
    id: "contact", label: "Contact", title: "Talk to Dynamic EMS",
    blurb: "Taxi Way, Hillend & Donibristle Ind. Est., Dunfermline, KY11 9ET, UK",
    links: [
      { name: "Contact us", href: `${live}/contact/` },
      { name: contact.phone, href: contact.phoneHref },
      { name: contact.email, href: `mailto:${contact.email}` },
      { name: "Careers", href: `${live}/careers/` },
    ],
  },
];

export const footerColumns: { title: string; links: Link[] }[] = [
  { title: "Navigation", links: [
    { name: "Home", href: "/" },
    { name: "Media Hub", href: "/news" },
    { name: "About", href: `${live}/about-us/` },
    { name: "Careers", href: `${live}/careers/` },
    { name: "Contact", href: `${live}/contact/` },
  ] },
  { title: "Dynamic", links: pillars.slice(0, 5).map(({ name, href }) => ({ name, href })) },
];
