import { useLayoutEffect, useRef, useState } from "react";
import { nfaSVG, CAP } from "../lib/nfa.js";

export default function NfaTooltip({ node, rect }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const name = { star: "Star *", plus: "Plus +", opt: "Optional ?", rep: `Repeat {${node.n}}` }[node.t];

  useLayoutEffect(() => {
    const { offsetWidth: w, offsetHeight: h } = ref.current;
    const x = Math.min(Math.max(8, rect.left + rect.width / 2 - w / 2), innerWidth - w - 8);
    let y = rect.bottom + 10;
    if (y + h > innerHeight - 8) y = Math.max(8, rect.top - h - 10);
    setPos({ x, y });
  }, [node, rect]);

  return (
    <div ref={ref} id="tip" className="show" role="tooltip" style={{ left: pos.x, top: pos.y }}>
      <h4>Thompson NFA · {name}</h4>
      <div dangerouslySetInnerHTML={{ __html: nfaSVG(node) }} />
      <p>{CAP[node.t]}</p>
    </div>
  );
}
