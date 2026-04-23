import { useTheme } from "../context/ThemeContext";

const TECH_MARQUEE = [
  "React","Node.js","TypeScript","Next.js","Spring Boot","PostgreSQL",
  "Tailwind","Figma","Python","Java","MongoDB","Supabase","Docker","GSAP","Bubble","N8N"
];

const MarqueeSection = () => {
  const { isDarkMode } = useTheme();
  const bg = isDarkMode ? "#0d1117" : "#f1f5f9";
  const textColor = isDarkMode ? "#9ca3af" : "#6b7280";
  const accent = "var(--accent)";
  const items = [...TECH_MARQUEE, ...TECH_MARQUEE];

  return (
    <div style={{
      background: bg,
      borderTop: `1px solid ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
      borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
      padding: "18px 0",
      overflow: "hidden"
    }}>
      <div style={{
        display: "flex",
        gap: 48,
        animation: "marquee 30s linear infinite",
        width: "max-content"
      }}>
        {items.map((t, i) => (
          <span key={i} style={{
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: textColor,
            fontWeight: 500,
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 48,
            fontFamily: "'DM Sans', sans-serif"
          }}>
            {t} <span style={{ color: accent, opacity: 0.5 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
