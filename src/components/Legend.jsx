const ITEMS = [
  ["∧", "and", "Concatenation (AND)"],
  ["∨", "or", "Alternation (OR)"],
  ["*", "q", "Star — zero or more"],
  ["+", "q", "Plus — one or more"],
  ["?", "q", "Optional — zero or one"],
  ["{n}", "rep", "Repeat exactly n times"],
];

export default function Legend() {
  return (
    <div className="legend">
      {ITEMS.map(([sym, c, text]) => (
        <div key={sym}>
          <i style={{ background: `var(--${c}f)`, color: `var(--${c})` }}>{sym}</i>{text}
        </div>
      ))}
    </div>
  );
}
