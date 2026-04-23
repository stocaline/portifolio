import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, CheckCircle2 } from "lucide-react";

export default function RadialOrbitalTimeline({ timelineData, isDarkMode, effortLabel = "Nível de esforço", fullHeight = false }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  // ── Theme tokens ──────────────────────────────────────────────────
  const accent = "var(--accent)";
  const bg = isDarkMode ? "#030712" : "#f9fafb";
  const text = isDarkMode ? "#f9fafb" : "#111827";
  const sub = isDarkMode ? "#9ca3af" : "#6b7280";
  const card = isDarkMode ? "rgba(255,255,255,0.04)" : "#ffffff";
  const cardBorder = isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const orbitRing = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  // ── Interaction handlers ──────────────────────────────────────────
  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => { newPulseEffect[relId] = true; });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    if (!autoRotate) return;
    const t = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(t);
  }, [autoRotate]);

  const centerViewOnNode = (nodeId) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    setRotationAngle(270 - (nodeIndex / totalNodes) * 360);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const cur = timelineData.find((item) => item.id === itemId);
    return cur ? cur.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  // ── Status badge label + colour ───────────────────────────────────
  const statusLabel = (s) =>
    s === "completed" ? "Dominado" : s === "in-progress" ? "Em evolução" : "Aprendendo";

  const statusStyle = (s) => ({
    padding: "2px 10px", borderRadius: 100, fontSize: 10, fontWeight: 600,
    letterSpacing: "0.07em", textTransform: "uppercase",
    background:
      s === "completed" ? "rgba(34,197,94,0.15)" :
        s === "in-progress" ? "rgba(59,130,246,0.15)" :
          "rgba(168,85,247,0.15)",
    color:
      s === "completed" ? "#22c55e" :
        s === "in-progress" ? "var(--accent)" :
          "#a855f7",
    border: `1px solid ${s === "completed" ? "rgba(34,197,94,0.3)" :
      s === "in-progress" ? "rgba(59,130,246,0.3)" :
        "rgba(168,85,247,0.3)"}`,
  });

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      style={{
        width: "100%", height: fullHeight ? "100%" : "80vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: fullHeight ? "transparent" : bg,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient blobs */}
      <div style={{
        position: "absolute", top: "10%", right: "15%",
        width: 400, height: 400, borderRadius: "50%",
        background: "var(--accent)", opacity: isDarkMode ? 0.05 : 0.04,
        filter: "blur(90px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "10%",
        width: 280, height: 280, borderRadius: "50%",
        background: "#a855f7", opacity: isDarkMode ? 0.05 : 0.03,
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", width: "100%", maxWidth: 900, height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          ref={orbitRef}
          style={{
            position: "absolute", width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            perspective: "1000px",
          }}
        >
          {/* Center orb */}
          <div style={{
            position: "absolute", width: 56, height: 56, borderRadius: "50%",
            background: `linear-gradient(135deg, var(--accent), #a855f7)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 10, boxShadow: "0 0 40px rgba(59,130,246,0.35)",
            animation: "orbPulse 3s ease-in-out infinite",
          }}>
            <div style={{
              position: "absolute", width: 72, height: 72, borderRadius: "50%",
              border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(59,130,246,0.2)"}`,
              animation: "orbPing 1.5s cubic-bezier(0,0,0.2,1) infinite",
            }} />
            <div style={{
              position: "absolute", width: 88, height: 88, borderRadius: "50%",
              border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(59,130,246,0.1)"}`,
              animation: "orbPing 1.5s 0.5s cubic-bezier(0,0,0.2,1) infinite",
            }} />
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: isDarkMode ? "rgba(255,255,255,0.9)" : "white",
            }} />
          </div>

          {/* Orbit ring */}
          <div style={{
            position: "absolute", width: 400, height: 400, borderRadius: "50%",
            border: `1px solid ${orbitRing}`,
          }} />

          {/* ── Nodes ── */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = !!expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = !!pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              position: "absolute",
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
              transition: "transform 0.1s linear, opacity 0.3s ease",
              cursor: "pointer",
            };

            // Node circle style
            const dotStyle = {
              width: 44, height: 44, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s ease",
              transform: isExpanded ? "scale(1.5)" : "scale(1)",
              background: isExpanded
                ? "var(--accent)"
                : isRelated
                  ? isDarkMode ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.15)"
                  : card,
              border: `2px solid ${isExpanded ? "var(--accent)" :
                isRelated ? "var(--accent)" :
                  cardBorder
                }`,
              color: isExpanded ? "white" : isRelated ? "var(--accent)" : sub,
              boxShadow: isExpanded
                ? "0 0 24px rgba(59,130,246,0.5)"
                : isRelated
                  ? "0 0 12px rgba(59,130,246,0.25)"
                  : "none",
              animation: isPulsing ? "orbPulse 1.2s ease-in-out infinite" : "none",
            };

            // Expanded popup card
            const cardStyle = {
              position: "absolute", top: 56, left: "50%", transform: "translateX(-50%)",
              width: 360, background: card, border: `1px solid ${cardBorder}`,
              borderRadius: 16, padding: "16px 18px",
              backdropFilter: "blur(16px)",
              boxShadow: isDarkMode
                ? "0 20px 60px rgba(0,0,0,0.6)"
                : "0 20px 60px rgba(0,0,0,0.12)",
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                style={nodeStyle}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Energy aura */}
                <div style={{
                  position: "absolute",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${isDarkMode ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.10)"
                    } 0%, transparent 70%)`,
                  width: `${item.energy * 0.4 + 44}px`,
                  height: `${item.energy * 0.4 + 44}px`,
                  left: `-${(item.energy * 0.4) / 2}px`,
                  top: `-${(item.energy * 0.4) / 2}px`,
                  pointerEvents: "none",
                }} />

                {/* Node dot */}
                <div style={dotStyle}>
                  <Icon size={17} />
                </div>

                {/* Label */}
                <div style={{
                  position: "absolute",
                  top: 52,
                  left: "50%",
                  transform: isExpanded ? "translateX(-50%) scale(1.1)" : "translateX(-50%)",
                  whiteSpace: "nowrap",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  color: isExpanded ? "var(--accent)" : sub,
                  transition: "all 0.3s ease",
                  pointerEvents: "none",
                }}>
                  {item.title}
                </div>

                {/* Expanded popup */}
                {isExpanded && (
                  <div style={cardStyle}>
                    {/* Connector line */}
                    <div style={{
                      position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                      width: 1, height: 10,
                      background: `linear-gradient(to bottom, var(--accent), transparent)`,
                    }} />

                    {/* Mindset badge + phase label */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{
                        padding: "2px 10px", borderRadius: 100, fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        background: "rgba(59,130,246,0.12)",
                        color: "var(--accent)",
                        border: "1px solid rgba(59,130,246,0.25)",
                      }}>
                        {item.mindset || item.date}
                      </span>
                      <span style={{
                        fontSize: 11, color: sub, fontFamily: "'DM Sans', sans-serif", fontWeight: 500
                      }}>
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <div style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 700,
                      fontSize: 16, color: text, marginBottom: 8,
                    }}>
                      {item.title}
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: 13, color: sub, lineHeight: 1.6,
                      fontWeight: 300, fontFamily: "'DM Sans', sans-serif",
                      marginBottom: 14,
                    }}>
                      {item.content}
                    </p>

                    {/* Deliverables */}
                    {item.deliverables?.length > 0 && (
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                          <CheckCircle2 size={10} style={{ color: "var(--accent)" }} />
                          <span style={{
                            fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em",
                            color: sub, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                          }}>
                            Entregáveis Chave
                          </span>
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 5 }}>
                          {item.deliverables.map((d, idx) => (
                            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                              <span style={{
                                display: "inline-block", width: 4, height: 4, borderRadius: "50%",
                                background: "var(--accent)", flexShrink: 0, marginTop: 5,
                              }} />
                              <span style={{ fontSize: 12, color: sub, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>
                                {d}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Related nodes */}
                    {item.relatedIds.length > 0 && (
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                          <Link size={10} style={{ color: sub }} />
                          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: sub, fontWeight: 600 }}>
                            Relacionados
                          </span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {item.relatedIds.map((relatedId) => {
                            const rel = timelineData.find((i) => i.id === relatedId);
                            return (
                              <button
                                key={relatedId}
                                onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                style={{
                                  display: "inline-flex", alignItems: "center", gap: 4,
                                  padding: "4px 10px", borderRadius: 100, border: `1px solid ${cardBorder}`,
                                  background: "transparent", cursor: "pointer",
                                  fontSize: 11, fontWeight: 500, color: sub,
                                  fontFamily: "'DM Sans', sans-serif",
                                  transition: "all 0.2s ease",
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.borderColor = "var(--accent)";
                                  e.currentTarget.style.color = "var(--accent)";
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.borderColor = cardBorder;
                                  e.currentTarget.style.color = sub;
                                }}
                              >
                                {rel?.title}
                                <ArrowRight size={8} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hint text */}
      <p style={{
        position: "absolute", bottom: 24,
        fontSize: 12, color: sub, fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.08em", textTransform: "uppercase",
        pointerEvents: "none",
      }}>
        Clique em um nó para explorar · clique no fundo para fechar
      </p>

      {/* Inline keyframes */}
      <style>{`
        @keyframes orbPulse {
          0%,100% { box-shadow: 0 0 30px rgba(59,130,246,0.3); }
          50%      { box-shadow: 0 0 55px rgba(59,130,246,0.55); }
        }
        @keyframes orbPing {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
