"use client";

/* ─── Molecule types ──────────────────────────────────────────────────── */

export type MolNode = [number, number, string]; // [x, y, element]
export type MolBond = [number, number];

export interface MoleculeData {
  nodes: MolNode[];
  bonds: MolBond[];
  doubleBonds?: number[]; // indices into bonds[] to render as parallel lines
  rings?: number[][];     // arrays of node indices for subtle polygon fills
}

/* ─── Molecule SVG renderer ───────────────────────────────────────────── */

export function Molecule({
  data,
  className,
  id,
  accentOverride,
}: {
  data: MoleculeData;
  className?: string;
  id?: string;
  accentOverride?: string;
}) {
  const pad = 16;
  const xs = data.nodes.map((n) => n[0]);
  const ys = data.nodes.map((n) => n[1]);
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const w = Math.max(...xs) - Math.min(...xs) + pad * 2;
  const h = Math.max(...ys) - Math.min(...ys) + pad * 2;

  const color = (el: string) => {
    if (accentOverride && el === "C") return `${accentOverride}50`;
    switch (el) {
      case "N": return "#22d3ee";
      case "O": return "#f87171";
      case "P": return "#fbbf24";
      case "Co": return "#a78bfa";
      default: return "rgba(255,255,255,0.3)";
    }
  };

  const r = (el: string) => {
    switch (el) {
      case "Co": return 5;
      case "P": return 4;
      case "N": case "O": return 3.2;
      default: return 2.5;
    }
  };

  const isSpecial = (el: string) => ["N", "O", "P", "Co"].includes(el);
  const glows = (el: string) => ["N", "P", "Co"].includes(el);
  const uid = id || "mol";
  const doubleBondSet = new Set(data.doubleBonds || []);

  return (
    <svg viewBox={`${minX} ${minY} ${w} ${h}`} className={className} fill="none">
      <defs>
        {/* Radial gradient glows for special atoms */}
        {data.nodes.map(([, , el], i) =>
          glows(el) ? (
            <radialGradient key={`rg${i}`} id={`${uid}-glow-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={color(el)} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color(el)} stopOpacity="0" />
            </radialGradient>
          ) : null,
        )}
      </defs>

      {/* Ring fills — subtle polygon fills before bonds */}
      {data.rings?.map((ring, ri) => {
        const points = ring.map((ni) => `${data.nodes[ni][0]},${data.nodes[ni][1]}`).join(" ");
        return (
          <polygon
            key={`ring${ri}`}
            points={points}
            fill={accentOverride || "#22d3ee"}
            opacity={0.06}
          />
        );
      })}

      {/* Bonds */}
      {data.bonds.map(([a, b], i) => {
        const x1 = data.nodes[a][0];
        const y1 = data.nodes[a][1];
        const x2 = data.nodes[b][0];
        const y2 = data.nodes[b][1];

        if (doubleBondSet.has(i)) {
          // Double bond — two parallel lines with perpendicular offset
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const offset = 2;
          const nx = (-dy / len) * offset;
          const ny = (dx / len) * offset;

          return (
            <g key={`b${i}`}>
              <line
                x1={x1 + nx} y1={y1 + ny}
                x2={x2 + nx} y2={y2 + ny}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5"
              />
              <line
                x1={x1 - nx} y1={y1 - ny}
                x2={x2 - nx} y2={y2 - ny}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5"
              />
            </g>
          );
        }

        return (
          <line
            key={`b${i}`}
            x1={x1} y1={y1}
            x2={x2} y2={y2}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Glow halos on special atoms — radial gradient version */}
      {data.nodes.map(([x, y, el], i) =>
        glows(el) ? (
          <circle
            key={`g${i}`}
            cx={x}
            cy={y}
            r={r(el) * 4}
            fill={`url(#${uid}-glow-${i})`}
            className="animate-molecule-pulse"
          />
        ) : null,
      )}

      {/* Atoms */}
      {data.nodes.map(([x, y, el], i) => (
        <circle
          key={`a${i}`}
          cx={x}
          cy={y}
          r={r(el)}
          fill={color(el)}
          opacity={glows(el) ? 0.9 : isSpecial(el) ? 0.7 : 0.6}
        />
      ))}

      {/* Element labels on non-carbon atoms */}
      {data.nodes.map(([x, y, el], i) =>
        isSpecial(el) ? (
          <text
            key={`lbl${i}`}
            x={x}
            y={y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={color(el)}
            fontSize={el === "Co" ? 5 : 4}
            fontFamily="system-ui, sans-serif"
            fontWeight="600"
            opacity={0.85}
          >
            {el}
          </text>
        ) : null,
      )}
    </svg>
  );
}

/* ─── Molecule definitions (simplified structural formulas) ────────────── */

export const molecules: Record<string, MoleculeData> = {
  // Caffeine — purine scaffold: fused 6-ring + 5-ring, 4×N, 2×O, 3×methyl
  caffeine: {
    nodes: [
      [30, 80, "N"],    // 0  N1
      [52, 48, "C"],    // 1  C2
      [88, 48, "N"],    // 2  N3
      [108, 80, "C"],   // 3  C4
      [88, 112, "C"],   // 4  C5
      [52, 112, "C"],   // 5  C6
      [118, 118, "N"],  // 6  N7
      [148, 98, "C"],   // 7  C8
      [138, 62, "N"],   // 8  N9
      [42, 18, "O"],    // 9  =O (C2)
      [42, 142, "O"],   // 10 =O (C6)
      [8, 92, "C"],     // 11 Me (N1)
      [88, 20, "C"],    // 12 Me (N3)
      [125, 148, "C"],  // 13 Me (N7)
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [3, 8], [8, 7], [7, 6], [6, 4],
      [1, 9], [5, 10],
      [0, 11], [2, 12], [6, 13],
    ],
    doubleBonds: [10, 11], // bonds [1,9] (C2=O) and [5,10] (C6=O)
    rings: [
      [0, 1, 2, 3, 4, 5],     // pyrimidine ring
      [3, 8, 7, 6, 4],         // imidazole ring
    ],
  },

  // L-Theanine — amino acid chain: 2×N, 3×O
  theanine: {
    nodes: [
      [10, 102, "O"],   // 0  =O (COOH)
      [28, 74, "C"],    // 1  COOH
      [10, 48, "O"],    // 2  -OH (COOH)
      [58, 74, "C"],    // 3  alpha-C
      [58, 38, "N"],    // 4  NH2
      [88, 88, "C"],    // 5  beta-C
      [118, 74, "C"],   // 6  gamma-C
      [148, 88, "C"],   // 7  amide C
      [148, 118, "O"],  // 8  amide =O
      [178, 74, "N"],   // 9  amide NH
      [198, 92, "C"],   // 10 ethyl
    ],
    bonds: [
      [0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [5, 6], [6, 7], [7, 8], [7, 9], [9, 10],
    ],
    doubleBonds: [0, 7], // bonds [0,1] (COOH C=O) and [7,8] (amide C=O)
  },

  // Alpha-GPC — choline + phosphate + glycerol: 1×N, 4×O, 1×P
  alphaGPC: {
    nodes: [
      [14, 80, "N"],    // 0  N+ (choline)
      [42, 68, "C"],    // 1  CH2
      [68, 80, "C"],    // 2  CH2
      [94, 66, "O"],    // 3  ester O
      [118, 80, "P"],   // 4  phosphate
      [118, 48, "O"],   // 5  P=O
      [118, 112, "O"],  // 6  P-OH
      [144, 66, "O"],   // 7  glycerol O
      [168, 80, "C"],   // 8  glycerol C
      [192, 66, "C"],   // 9  glycerol C
      [192, 38, "O"],   // 10 -OH
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [4, 7], [7, 8], [8, 9], [9, 10],
    ],
    doubleBonds: [4], // bond [4,5] (P=O)
  },

  // Citicoline — cytosine ring + diphosphate bridge + choline: 4×N, 3×O, 2×P
  citicoline: {
    nodes: [
      [20, 86, "N"],    // 0  N1 (ring)
      [20, 54, "C"],    // 1  C2
      [44, 38, "N"],    // 2  N3
      [66, 54, "C"],    // 3  C4
      [66, 86, "C"],    // 4  C5
      [44, 102, "C"],   // 5  C6
      [4, 38, "O"],     // 6  C2=O
      [82, 38, "N"],    // 7  C4-NH2
      [44, 130, "C"],   // 8  ribose link
      [76, 142, "P"],   // 9  P1
      [76, 168, "O"],   // 10 P1=O
      [108, 142, "P"],  // 11 P2
      [108, 168, "O"],  // 12 P2=O
      [138, 130, "C"],  // 13 CH2
      [162, 142, "C"],  // 14 CH2
      [188, 130, "N"],  // 15 N+ (choline)
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [1, 6], [3, 7],
      [5, 8], [8, 9], [9, 10], [9, 11], [11, 12],
      [11, 13], [13, 14], [14, 15],
    ],
    doubleBonds: [6, 10], // bonds [1,6] (C2=O) and [9,10] (P1=O)
    rings: [
      [0, 1, 2, 3, 4, 5], // cytosine ring
    ],
  },

  // Rhodiola (Salidroside) — phenol ring + glucose ring: 2×O rings
  rhodiola: {
    nodes: [
      [20, 54, "C"],    // 0  ring C1
      [20, 86, "C"],    // 1  ring C2
      [46, 102, "C"],   // 2  ring C3
      [72, 86, "C"],    // 3  ring C4
      [72, 54, "C"],    // 4  ring C5
      [46, 38, "C"],    // 5  ring C6
      [4, 38, "O"],     // 6  phenol -OH
      [98, 98, "C"],    // 7  CH2 linker
      [120, 80, "C"],   // 8  CH linker
      [146, 98, "O"],   // 9  glycosidic O
      [166, 80, "C"],   // 10 glu C1
      [188, 64, "C"],   // 11 glu C2
      [188, 38, "C"],   // 12 glu C3
      [166, 22, "O"],   // 13 ring O
      [144, 38, "C"],   // 14 glu C5
      [144, 64, "C"],   // 15 glu C4
    ],
    bonds: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      [0, 6],
      [3, 7], [7, 8], [8, 9], [9, 10],
      [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 10],
    ],
    rings: [
      [0, 1, 2, 3, 4, 5],          // phenol ring
      [10, 11, 12, 13, 14, 15],     // glucose ring
    ],
  },

  // Vitamin B12 — simplified corrin ring with central Co: 1×Co, 4×N
  b12: {
    nodes: [
      [100, 80, "Co"],  // 0  central cobalt
      [72, 56, "N"],    // 1  N pyrrole A
      [128, 56, "N"],   // 2  N pyrrole B
      [128, 104, "N"],  // 3  N pyrrole C
      [72, 104, "N"],   // 4  N pyrrole D
      [48, 38, "C"],    // 5
      [72, 22, "C"],    // 6
      [100, 26, "C"],   // 7
      [128, 22, "C"],   // 8
      [152, 38, "C"],   // 9
      [164, 60, "C"],   // 10
      [160, 86, "C"],   // 11
      [152, 110, "C"],  // 12
      [128, 126, "C"],  // 13
      [100, 130, "C"],  // 14
      [72, 126, "C"],   // 15
      [48, 110, "C"],   // 16
      [36, 86, "C"],    // 17
      [36, 60, "C"],    // 18
    ],
    bonds: [
      [1, 0], [2, 0], [3, 0], [4, 0],
      [5, 6], [6, 1], [1, 7], [7, 8], [8, 2], [2, 9], [9, 10],
      [10, 11], [11, 3], [3, 12], [12, 13], [13, 14], [14, 4],
      [4, 15], [15, 16], [16, 17], [17, 18], [18, 5],
    ],
    rings: [
      [5, 6, 1, 7, 8, 2, 9, 10, 11, 3, 12, 13, 14, 4, 15, 16, 17, 18], // corrin outer ring
    ],
  },
};

/* ─── Ingredient data ─────────────────────────────────────────────────── */

export interface Ingredient {
  name: string;
  formula: string;
  dose: string;
  benefit: string;
  molecule: string;
}

export const ingredients: Ingredient[] = [
  {
    name: "Caffeine",
    formula: "C\u2088H\u2081\u2080N\u2084O\u2082",
    dose: "100mg",
    benefit: "Locks you in. No jitters, no crash landing.",
    molecule: "caffeine",
  },
  {
    name: "L-Theanine",
    formula: "C\u2087H\u2081\u2084N\u2082O\u2083",
    dose: "200mg",
    benefit: "Takes the edge off caffeine. Smooth, calm focus.",
    molecule: "theanine",
  },
  {
    name: "Alpha-GPC",
    formula: "C\u2088H\u2082\u2080NO\u2086P",
    dose: "150mg",
    benefit: "Sharpens recall. You remember everything.",
    molecule: "alphaGPC",
  },
  {
    name: "Citicoline",
    formula: "C\u2081\u2084H\u2082\u2086N\u2084O\u2081\u2081P\u2082",
    dose: "100mg",
    benefit: "Fuels your brain cells. Long-game compound.",
    molecule: "citicoline",
  },
  {
    name: "Rhodiola Rosea",
    formula: "C\u2081\u2084H\u2082\u2080O\u2087",
    dose: "50mg",
    benefit: "Stress hits different when you\u2019re adapted to it.",
    molecule: "rhodiola",
  },
  {
    name: "Vitamin B12",
    formula: "C\u2086\u2083H\u2088\u2088CoN\u2081\u2084O\u2081\u2084P",
    dose: "500mcg",
    benefit: "The engine behind your cell metabolism.",
    molecule: "b12",
  },
];
