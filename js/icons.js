/* ============================ ICONS ================================== */
function I({ children, size = 16, color = "currentColor", style, ...r }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", ...style }} {...r}>{children}</svg>;
}
const Lock = (p) => <I {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></I>;
const ChevRight = (p) => <I {...p}><polyline points="9 18 15 12 9 6" /></I>;
const ChevLeft = (p) => <I {...p}><polyline points="15 18 9 12 15 6" /></I>;
const XIcon = (p) => <I {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></I>;
const CheckIcon = (p) => <I {...p}><polyline points="20 6 9 17 4 12" /></I>;
const HomeIcon = (p) => <I {...p}><path d="M3 11 12 3l9 8" /><path d="M5 10v10h14V10" /></I>;
const BookmarkIcon = ({ filled, ...p }) => <I {...p}><path d="M6 3h12v18l-6-5-6 5z" fill={filled ? "currentColor" : "none"} /></I>;
const LayersIcon = (p) => <I {...p}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></I>;
const LinkIcon = (p) => <I {...p}><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" y1="12" x2="16" y2="12" /></I>;
const ClockIcon = (p) => <I {...p}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></I>;
const InfoIcon = (p) => <I {...p}><circle cx="12" cy="12" r="9" /><line x1="12" y1="16" x2="12" y2="11" /><line x1="12" y1="8" x2="12" y2="8.01" /></I>;
const ScrollIcon = (p) => <I {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><line x1="8" y1="8" x2="16" y2="8" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="16" x2="12" y2="16" /></I>;
const CodeIcon = (p) => <I {...p}><polyline points="10 9 4 12 10 15" /><polyline points="14 9 20 12 14 15" /></I>;
const ArrowRight = (p) => <I {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></I>;
const Star = ({ size = 16, color = "currentColor", style, ...r }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: "inline-block", verticalAlign: "middle", ...style }} {...r}>
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" /></svg>);
const SwordsIcon = (p) => <I {...p}><path d="M14 4l6 6-8 8-6-6z" /><line x1="3" y1="21" x2="8" y2="16" /><line x1="16" y1="21" x2="21" y2="16" /></I>;
const MapIcon = (p) => <I {...p}><polygon points="2 6 9 3 15 6 22 3 22 18 15 21 9 18 2 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></I>;
const ChartIcon = (p) => <I {...p}><line x1="4" y1="20" x2="4" y2="12" /><line x1="10" y1="20" x2="10" y2="5" /><line x1="16" y1="20" x2="16" y2="14" /><line x1="21" y1="20" x2="21" y2="9" /></I>;
