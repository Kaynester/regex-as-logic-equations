import {eq} from "./equation.js";
const NS="http://www.w3.org/2000/svg";
const esc=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
export function nfaSVG(n){
  const L=eq(n.kids[0]),lab=L.length>16?L.slice(0,15)+"…":L;
  const items=n.t==="rep"?(n.n<=4?Array(n.n).fill("c"):["c","c","d","c"]):["c"];
  const EW=44,TW=Math.max(70,lab.length*7+26),Yc=64;let x=26,els="",q=0;const pos={};
  const st=(x,name,acc)=>`<circle class="st" cx="${x}" cy="${Yc}" r="12"/>${acc?`<circle class="st2" cx="${x}" cy="${Yc}" r="16"/>`:""}<text class="sn" x="${x}" y="${Yc+1}">${name}</text>`;
  const ar=(a,b,l,eps)=>`<line class="ed" x1="${a+13}" y1="${Yc}" x2="${b-13}" y2="${Yc}" marker-end="url(#ar)"/><text class="${eps?"eps":"el"}" x="${(a+b)/2}" y="${Yc-11}">${esc(l)}</text>`;
  els+=`<line class="ed" x1="2" y1="${Yc}" x2="${x-13}" y2="${Yc}" marker-end="url(#ar)"/>`;
  const seq=[{x,n:"q"+q++}];pos.s=x;
  items.forEach((it,k)=>{
    if(it==="d"){const a=x;x+=EW;els+=`<text class="eps" x="${(a+x)/2}" y="${Yc}">⋯</text>`;return}
    let a=x;x+=EW;seq.push({x,n:"q"+q++});els+=ar(a,x,"ε",1);if(k===0)pos.i=x;
    a=x;x+=TW;seq.push({x,n:"q"+q++});els+=ar(a,x,lab);pos.o=x});
  const a=x;x+=EW;els+=ar(a,x,"ε",1);const fx=x;
  let pre="";
  seq.forEach(o=>pre+=st(o.x,o.n));pre+=st(fx,"q"+q,1);
  const fo=seq[seq.length-1].x; // last 'o'
  const lp=(from,to)=>`<path class="ed" d="M${from},${Yc-12} C${from},${Yc-56} ${to},${Yc-56} ${to},${Yc-13}" marker-end="url(#ar)"/><text class="eps" x="${(from+to)/2}" y="${Yc-46}">ε</text>`;
  const sk=`<path class="ed" d="M${pos.s},${Yc+12} C${pos.s},${Yc+64} ${fx},${Yc+64} ${fx},${Yc+13}" marker-end="url(#ar)"/><text class="eps" x="${(pos.s+fx)/2}" y="${Yc+49}">ε</text>`;
  if(n.t==="star"||n.t==="plus")els+=lp(fo,pos.i-EW<0?pos.i:pos.i);
  if(n.t==="star"||n.t==="opt")els+=sk;
  const W=fx+30,H=Yc+70;
  return `<svg class="nfa" xmlns="${NS}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0L10,5L0,10z" fill="currentColor"/></marker></defs>${els}${pre}</svg>`}
export const CAP={star:"Zero or more: loop back to repeat, or skip straight to the end.",plus:"One or more: match once, then optionally loop back to repeat.",opt:"Zero or one: match once, or skip with an ε-move.",rep:"Exactly n: the fragment is chained n times in sequence."};
