import type { CategorySlug } from "@/lib/types";

type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

const paths: Record<CategorySlug, React.ReactNode> = {
  sale: <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />,
  muzika: (
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </>
  ),
  fotografi: (
    <>
      <path d="M4 7h3l2-3h6l2 3h3v13H4z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  "vencanice-i-odela": <path d="M12 3a2 2 0 0 0-2 2c0 1 2 1.5 2 3M12 8 4 13h16zM6 13l-2 8h16l-2-8" />,
  "cvece-i-dekoracija": (
    <>
      <circle cx="12" cy="8" r="2.5" />
      <path d="M12 5.5C12 3 14 2 15 3.5s-1 3-3 2M12 5.5C12 3 10 2 9 3.5s1 3 3 2M14.5 8c2.5 0 3.5 2 2 3s-3-1-2-3M9.5 8C7 8 6 10 7.5 11s3-1 2-3M12 10.5V21M12 16c-2-2-5-1.5-5-1.5s0 3 5 3M12 16c2-2 5-1.5 5-1.5" />
    </>
  ),
  organizatori: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M9 10l1.5 1.5L14 8M9 16h6" />
    </>
  ),
};

export function CategoryIcon({ slug, className = "h-7 w-7" }: P & { slug: CategorySlug }) {
  return (
    <svg {...base} className={className}>
      {paths[slug]}
    </svg>
  );
}

export const IconCheck = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><path d="m5 12 4.5 4.5L19 7" /></svg>
);
export const IconPin = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const IconUsers = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .7 3.2 2.4 3.5 5.2" /></svg>
);
export const IconShield = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>
);
export const IconMenu = ({ className = "h-6 w-6" }: P) => (
  <svg {...base} className={className}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconClose = ({ className = "h-6 w-6" }: P) => (
  <svg {...base} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const IconFilter = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><path d="M4 6h16M7 12h10M10 18h4" /></svg>
);
export const IconArrow = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconPhone = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const IconGlobe = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.8 3.5 5.8 3.5 9s-1 6.2-3.5 9c-2.5-2.8-3.5-5.8-3.5-9s1-6.2 3.5-9" /></svg>
);
export const IconInstagram = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></svg>
);
export const IconMail = ({ className = "h-4 w-4" }: P) => (
  <svg {...base} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>
);
