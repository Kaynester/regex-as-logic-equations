const ESC={d:"0-9",w:"a-zA-Z0-9_",s:"space",D:"not 0-9",W:"not word",S:"not space",n:"\\n",t:"\\t"};
export function parse(src){
  let i=0;
  const leaf=l=>({t:"leaf",label:l});
  const flat=(t,kids)=>{const o=[];kids.forEach(k=>k.t===t?o.push(...k.kids):o.push(k));return o.length===1?o[0]:{t,kids:o}};
  function alt(){const a=[cat()];while(src[i]==="|"){i++;a.push(cat())}return a.length===1?a[0]:flat("alt",a)}
  function cat(){const a=[];while(i<src.length&&src[i]!=="|"&&src[i]!==")")a.push(quant());
    if(!a.length)throw Error("Empty expression at position "+i+" — add a character or class.");
    return a.length===1?a[0]:flat("cat",a)}
  function quant(){let n=atom();
    for(;;){const c=src[i];
      if(c==="*"){i++;n={t:"star",kids:[n]}}
      else if(c==="+"){i++;n={t:"plus",kids:[n]}}
      else if(c==="?"){i++;n={t:"opt",kids:[n]}}
      else if(c==="{"){const m=/^\{(\d+)\}/.exec(src.slice(i));
        if(!m)throw Error("Only exact repeats like {5} are supported.");
        i+=m[0].length;n={t:"rep",n:+m[1],kids:[n]}}
      else break}
    return n}
  function atom(){const c=src[i++];
    if(c==="("){const n=alt();if(src[i]!==")")throw Error("Missing closing )");i++;return Object.assign({},n,{paren:true})}
    if(c==="["){let j=src.indexOf("]",i+1);if(j<0)throw Error("Missing closing ]");
      let s=src.slice(i,j);i=j+1;const neg=s[0]==="^";if(neg)s=s.slice(1);
      s=s.replace(/\\(.)/g,(_,x)=>ESC[x]||x);return leaf((neg?"not ":"")+s)}
    if(c==="\\"){if(i>=src.length)throw Error("Dangling \\");const x=src[i++];return leaf(ESC[x]||x)}
    if(c===".")return leaf("any");
    if("*+?{".includes(c))throw Error("Nothing to repeat before "+c);
    return leaf(c)}
  if(!src)throw Error("Type a pattern to begin.");
  const r=alt();if(i<src.length)throw Error("Unmatched ) at position "+i);return r}

