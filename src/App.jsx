import { useMemo, useRef, useState } from "react";
import { parse } from "./lib/parser.js";
import PatternInput from "./components/PatternInput.jsx";
import Equation from "./components/Equation.jsx";
import Legend from "./components/Legend.jsx";
import Diagram from "./components/Diagram.jsx";

export default function App() {
  const [pattern, setPattern] = useState("[A-Z][a-z]*");
  const lastGood = useRef(null);
  const { tree, error } = useMemo(() => {
    try { return { tree: parse(pattern), error: "" }; }
    catch (e) { return { tree: null, error: e.message }; }
  }, [pattern]);
  if (tree) lastGood.current = tree;
  const shown = tree || lastGood.current;

  return (
    <main>
      <h1><b>The Logic of</b> Regular Expressions</h1>
      <PatternInput value={pattern} error={error} onChange={setPattern} />
      <div className="cols">
        <section className="sec">
          <div className="lab">01 — Equation</div>
          {shown && <Equation tree={shown} />}
          <Legend />
        </section>
        <section className="sec">
          <div className="lab">02 — Diagram</div>
          {shown && <Diagram tree={shown} />}
          <div className="hint">Hover the * + ? and {"{n}"} nodes to inspect their NFA fragments.</div>
        </section>
      </div>
    </main>
  );
}
