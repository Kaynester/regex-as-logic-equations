const GAP=18,LH=38,GW=84,GH=44,R=27,DY=104;
const lw=l=>Math.max(64,l.length*9+28);
function measure(n){
  if(n.t==="leaf")n.w=lw(n.label);
  else if(n.t==="cat"||n.t==="alt"){n.kids.forEach(measure);n.w=Math.max(GW,n.kids.reduce((a,k)=>a+k.w,0)+GAP*(n.kids.length-1))}
  else{measure(n.kids[0]);n.w=Math.max(2*R,n.kids[0].w)}}
function place(n,x0,d){
  n.d=d;n.cx=x0+n.w/2;
  if(n.t==="cat"||n.t==="alt"){const tot=n.kids.reduce((a,k)=>a+k.w,0)+GAP*(n.kids.length-1);let x=x0+(n.w-tot)/2;
    n.kids.forEach(k=>{place(k,x,d+1);x+=k.w+GAP})}
  else if(n.t!=="leaf"){const k=n.kids[0];place(k,x0+(n.w-k.w)/2,d+1);k.cx=n.cx;shift(k,n.cx-(x0+(n.w-k.w)/2+k.w/2))}}
function shift(n,dx){if(!dx)return;n.cx+=dx;if(n.kids&&n.t!=="leaf")n.kids.forEach(k=>shift(k,dx))}
const half=n=>n.t==="leaf"?LH/2:(n.t==="cat"||n.t==="alt")?GH/2:R;

export {GW,GH,R,LH,half};
export function layout(root){
  measure(root);place(root,0,0);
  const nodes=[];(function w(n){nodes.push(n);if(n.t!=="leaf"&&n.kids)n.kids.forEach(w)})(root);
  let minX=1e9,maxX=-1e9,maxD=0;
  nodes.forEach(n=>{const hw=n.t==="leaf"?n.w/2:(n.t==="cat"||n.t==="alt")?GW/2:R;minX=Math.min(minX,n.cx-hw);maxX=Math.max(maxX,n.cx+hw);maxD=Math.max(maxD,n.d)});
  const P=14;
  return {nodes,W:Math.ceil(maxX-minX+2*P),H:Math.ceil(maxD*DY+2*R+2*P),ox:P-minX,Y:d=>P+R+d*DY};
}
