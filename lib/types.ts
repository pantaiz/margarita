export type ChipVariant = 'blue' | 'pink' | 'green' | 'yellow';

export type CaseTag = {
  label: string;
  variant: ChipVariant;
};

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  tags: CaseTag[];
  inProgress: boolean;
  coverSrc?: string;
};

export type CaseTableColumn = {
  header: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type CaseTableRow = {
  cells: string[];
  labelBold?: boolean;
};

export type CaseRichTextPart =
  | { text: string; href?: undefined; bold?: boolean }
  | { text: string; href: string; bold?: boolean };

export type CaseBulletItem = string | { parts: CaseRichTextPart[] };

export type CaseRichBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'rich-paragraph'; parts: CaseRichTextPart[] }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'ordered-list'; items: string[] }
  | { type: 'link'; label: string; href: string }
  | { type: 'outline-link'; label: string; href: string }
  | { type: 'links'; items: { label: string; href: string }[] }
  | { type: 'image'; src: string; alt: string; width?: number; height?: number }
  | { type: 'callout'; text: string }
  | { type: 'highlight'; text: string }
  | {
      type: 'table';
      caption?: string;
      markerLegend?: boolean;
      columns: CaseTableColumn[];
      rows: CaseTableRow[];
    }
  | { type: 'bullet-list'; items: CaseBulletItem[]; iconSrc?: string };

export type CaseDisclosureItem = {
  id: string;
  title?: string;
  teaser?: string;
  content: CaseRichBlock[];
};

/** @deprecated Use CaseDisclosureItem */
export type CaseAccordionItem = CaseDisclosureItem;

export type CaseDesignImage = {
  src: string;
  alt: string;
};

export type CaseDesignVideo = {
  src: string;
  alt: string;
  poster?: string;
  caption?: string;
};

export type CaseDesignBlock = {
  id: string;
  title: string;
  description: string;
  images?: CaseDesignImage[];
  videos?: CaseDesignVideo[];
};

export type CasePlateData = {
  label: string;
  blocks: CaseRichBlock[];
};

export type CaseSectionData = {
  id: string;
  label: string;
  intro?: CaseRichBlock[];
  plates?: CasePlateData[];
  summary?: CaseRichBlock[];
  body?: CaseRichBlock[];
  disclosures?: CaseDisclosureItem[];
  /** @deprecated Use disclosures */
  accordions?: CaseDisclosureItem[];
  designBlocks?: CaseDesignBlock[];
};

export type CaseStudyMeta = {
  role: string;
  platform: string;
  year: string;
};

export type CaseStudyFull = CaseStudy & {
  meta: CaseStudyMeta;
  sections: CaseSectionData[];
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type ContactLink = {
  label: string;
  href: string;
  icon: string;
  colorClass?: 'blue' | 'yellow' | 'green';
};

export type SkillGroup = {
  id: string;
  variant: ChipVariant;
  skills: string[];
};
