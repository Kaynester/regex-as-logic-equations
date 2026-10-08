import { useEffect, useMemo, useState } from "react";
import { layout, half, GW, GH, R, LH } from "../lib/layout.js";
import NfaTooltip from "./NfaTooltip.jsx";

const SYM = { star: "*", plus: "+", opt: "?" };

export default function Diagram({ tree }) {
  const { nodes, W, H, ox, Y } = useMemo(() => layout(tree), [tree]);
  const [act, setAct] = useState(null); // { n, rect, pinned }
  useEffect(() => setAct(null), [tree]);

  const hover = (n, el) => setAct({ n, rect: el.getBoundingClientRect(), pinned: false });
  const leave = () => setAct(a => (a && a.pinned ? a : null));
  const pin = (e, n) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setAct(a => (a && a.n === n && a.pinned ? null : { n, rect, pinned: true }));
  };

  const edges = nodes.flatMap((n, i) => n.t === "leaf" ? [] : n.kids.map((k, j) => {
    const x1 = n.cx + ox, y1 = Y(n.d) + half(n), x2 = k.cx + ox, y2 = Y(k.d) - half(k), m = (y1 + y2) / 2;
    return <path key={`${i}-${j}`} className="edge" d={`M${x1},${y1} C${x1},${m} ${x2},${m} ${x2},${y2}`} />;
  }));

  const renderNode = (n, i) => {
    const x = n.cx + ox, y = Y(n.d);
    if (n.t === "leaf") return (
      <g key={i}>
        <rect className="leaf" x={x - n.w / 2} y={y - LH / 2} width={n.w} height={LH} rx="9" />
        <text className="leaf-t" x={x} y={y + 1}>{n.label}</text>
      </g>
    );
    if (n.t === "cat") {
      const l = x - GW / 2, t = y - GH / 2;
      return (
        <g key={i}>
          <path className="gate g-and" d={`M${l},${t} H${l + GW - GH / 2} A${GH / 2},${GH / 2} 0 0 1 ${l + GW - GH / 2},${t + GH} H${l} Z`} />
          <text className="t-and" x={x - 6} y={y + 1} fontSize="17" fontWeight="600">∧</text>
        </g>
      );
    }
    if (n.t === "alt") {
      const l = x - GW / 2, t = y - GH / 2;
      return (
        <g key={i}>
          <path className="gate g-or" d={`M${l},${t} C${l + 22},${t} ${l + 56},${t + 4} ${l + GW},${y} C${l + 56},${t + GH - 4} ${l + 22},${t + GH} ${l},${t + GH} C${l + 13},${y + 8} ${l + 13},${y - 8} ${l},${t} Z`} />
          <text className="t-or" x={x - 4} y={y + 1} fontSize="17" fontWeight="600">∨</text>
        </g>
      );
    }
    const rep = n.t === "rep", lbl = rep ? `{${n.n}}` : SYM[n.t];
    const on = act && act.n === n && act.pinned;
    return (
      <g key={i} className={`qn${rep ? " rep" : ""}${on ? " on" : ""}`} tabIndex={0} role="button"
        aria-label={`Show NFA for ${lbl}`}
        onMouseEnter={e => hover(n, e.currentTarget)} onMouseLeave={leave}
        onFocus={e => hover(n, e.currentTarget)} onBlur={leave}
        onClick={e => pin(e, n)}>
        <circle cx={x} cy={y} r={R} />
        <text x={x} y={y + 1}>{lbl}</text>
      </g>
    );
  };

  return (
    <div id="dia" onScroll={() => setAct(null)} onClick={() => setAct(null)}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {edges}
        {nodes.map(renderNode)}
      </svg>
      {act && <NfaTooltip node={act.n} rect={act.rect} />}
    </div>
  );
}
