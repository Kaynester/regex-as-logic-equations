const QS={star:"*",plus:"⁺",opt:"?"};
export function eq(n){
  if(n.t==="leaf")return n.label;
  if(n.t==="cat"||n.t==="alt"){const s=n.kids.map(eq).join(n.t==="cat"?" ∧ ":" ∨ ");return n.paren?"("+s+")":s}
  const k=n.kids[0];let c=eq(k);
  if((k.t==="cat"||k.t==="alt")&&!k.paren)c="("+c+")";
  return c+(n.t==="rep"?"{"+n.n+"}":QS[n.t])}

