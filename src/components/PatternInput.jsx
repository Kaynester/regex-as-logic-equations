import { PRESETS } from "../lib/presets.js";

export default function PatternInput({ value, error, onChange }) {
  return (
    <>
      <div className="lab">Pattern</div>
      <input id="pat" value={value} spellCheck={false} autoComplete="off" autoCapitalize="off"
        aria-label="Regular expression" onChange={e => onChange(e.target.value)} />
      <div id="err" role="status">{error}</div>
      <div className="try">
        try:
        {Object.keys(PRESETS).map(k => (
          <button key={k} onClick={() => onChange(PRESETS[k])}>{k}</button>
        ))}
      </div>
    </>
  );
}
