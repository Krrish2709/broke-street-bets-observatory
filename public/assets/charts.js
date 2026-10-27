/* Self-contained SVG charts. All displayed values come from the packaged study. */
const NS='http://www.w3.org/2000/svg';
export const finite=x=>typeof x==='number'&&Number.isFinite(x);
export function palette(){const s=getComputedStyle(document.documentElement);const v=k=>s.getPropertyValue('--'+k).trim();return{bg:v('chart-bg'),text:v('text'),muted:v('muted'),grid:v('plot-grid'),accent:v('accent'),blue:v('blue'),gold:v('gold'),red:v('red'),purple:v('purple'),line:v('line'),stock:v('graph-stock'),missing:v('line')}}
const el=(tag,attrs={},text)=>{const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n};
const fnum=(n,d=3)=>finite(n)?n.toLocaleString('en-US',{maximumFractionDigits:d,minimumFractionDigits:d}):'—';
const fmtDate=d=>new Date(d+'T00:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
const dateTick=d=>new Date(d+'T00:00:00').toLocaleDateString('en-GB',{month:'short',year:'2-digit'});
function nearest(a,v){let lo=0,hi=a.length-1;while(lo<hi){const m=Math.floor((lo+hi)/2);if(a[m]<v)lo=m+1;else hi=m}return lo>0&&Math.abs(a[lo-1]-v)<Math.abs(a[lo]-v)?lo-1:lo}
function root(container,height,label){container.replaceChildren();const p=palette();const svg=el('svg',{viewBox:`0 0 1000 ${height}`,class:'chart-svg',role:'img','aria-label':label});svg.append(el('rect',{x:0,y:0,width:1000,height,fill:p.bg}));container.append(svg);return{svg,p}}
function tooltip(container){const tip=document.createElement('div');tip.className='chart-tooltip';container.append(tip);return tip}
function positionTip(tip,container,clientX,clientY){const box=container.getBoundingClientRect();tip.style.display='block';const width=tip.offsetWidth;tip.style.left=Math.max(5,Math.min(box.width-width-8,clientX-box.left+16))+'px';tip.style.top=Math.max(3,Math.min(box.height-tip.offsetHeight-5,clientY-box.top-18))+'px'}
function contentTip(tip,date,items){tip.replaceChildren();const h=document.createElement('strong');h.textContent=fmtDate(date);tip.append(h);for(const row of items){const div=document.createElement('div');div.className='tooltip-row';const label=document.createElement('span');label.textContent=row.name;const value=document.createElement('b');value.textContent=row.value;if(row.color)label.style.color=row.color;div.append(label,value);tip.append(div)}}

export function line(container,{dates,positions,series,label='Research time series',unit='',baseline=null,probability=false}){
  const {svg,p}=root(container,350,label);const left=65,right=978,top=16,bottom=301;
  const valid=series.flatMap(s=>s.values.filter(finite));
  if(!dates.length||!valid.length){svg.append(el('text',{x:500,y:163,'text-anchor':'middle',fill:p.muted,'font-size':14},'No measured values in this interval.'));return svg}
  const times=dates.map(d=>Date.parse(d+'T00:00:00Z'));let xmin=times[0],xmax=times.at(-1);if(xmin===xmax)xmax=xmin+86400000;
  let ymin=probability?0:Math.min(...valid),ymax=probability?1:Math.max(...valid);
  if(baseline!==null){ymin=Math.min(ymin,baseline);ymax=Math.max(ymax,baseline)}
  let pad=(ymax-ymin)*.12||Math.max(Math.abs(ymax)*.1,.01);if(!probability){ymin-=pad;ymax+=pad}
  const x=t=>left+(t-xmin)/(xmax-xmin)*(right-left),y=v=>bottom-(v-ymin)/(ymax-ymin)*(bottom-top);
  for(let i=0;i<5;i++){const val=ymin+(ymax-ymin)*i/4;svg.append(el('line',{x1:left,y1:y(val),x2:right,y2:y(val),stroke:p.grid,'stroke-width':1}));svg.append(el('text',{x:left-10,y:y(val)+4,'text-anchor':'end',fill:p.muted,'font-size':11},probability?val.toFixed(2):Math.abs(ymax)<.1?val.toFixed(3):Math.abs(ymax)>100?Math.round(val).toLocaleString():val.toFixed(2)))}
  const tickIndices=[...new Set(Array.from({length:6},(_,i)=>Math.round(i*(dates.length-1)/5)))];
  for(const i of tickIndices){svg.append(el('text',{x:x(times[i]),y:bottom+24,'text-anchor':i===0?'start':i===dates.length-1?'end':'middle',fill:p.muted,'font-size':10},dateTick(dates[i])))}
  if(unit)svg.append(el('text',{x:left,y:345,fill:p.muted,'font-size':10},unit));
  if(baseline!==null&&baseline>=ymin&&baseline<=ymax)svg.append(el('line',{x1:left,y1:y(baseline),x2:right,y2:y(baseline),stroke:p.muted,'stroke-dasharray':'4 5',opacity:.45}));
  const clipId='plot-clip-'+Math.random().toString(36).slice(2);const defs=el('defs');const clip=el('clipPath',{id:clipId});clip.append(el('rect',{x:left,y:top,width:right-left,height:bottom-top}));defs.append(clip);svg.append(defs);
  const group=el('g',{'clip-path':`url(#${clipId})`});svg.append(group);
  for(const s of series){let path='',active=false,last=-1;for(let i=0;i<dates.length;i++){const v=s.values[i];if(!finite(v)){active=false;continue}if(last>=0&&positions&&positions[i]-positions[last]!==1)active=false;path+=(active?'L':'M')+x(times[i]).toFixed(2)+','+y(v).toFixed(2);active=true;last=i}group.append(el('path',{d:path,fill:'none',stroke:s.color||p.accent,'stroke-width':s.width||2.3,'stroke-linejoin':'round','stroke-linecap':'round',...(s.dashed?{'stroke-dasharray':'5 4'}:{})}))}
  const guide=el('line',{x1:0,y1:top,x2:0,y2:bottom,stroke:p.muted,'stroke-width':1,'stroke-dasharray':'3 4',visibility:'hidden'});svg.append(guide);
  const dots=series.map(s=>{const n=el('circle',{r:3.8,fill:s.color||p.accent,stroke:p.bg,'stroke-width':2,visibility:'hidden'});svg.append(n);return n});
  const tip=tooltip(container);let selected=0;
  function show(i,cx,cy){selected=i;guide.setAttribute('x1',x(times[i]));guide.setAttribute('x2',x(times[i]));guide.setAttribute('visibility','visible');series.forEach((s,j)=>{const v=s.values[i];dots[j].setAttribute('visibility',finite(v)?'visible':'hidden');if(finite(v)){dots[j].setAttribute('cx',x(times[i]));dots[j].setAttribute('cy',y(v))}});contentTip(tip,dates[i],series.map(s=>({name:s.name,value:finite(s.values[i])?fnum(s.values[i],probability?3:4):'Unavailable',color:s.color})));positionTip(tip,container,cx,cy)}
  const hit=el('rect',{x:left,y:top,width:right-left,height:bottom-top,fill:'transparent',tabindex:0,'aria-label':'Time-series chart. Use left and right arrow keys to inspect observed dates.'});svg.append(hit);
  hit.addEventListener('pointermove',e=>{const b=svg.getBoundingClientRect();const px=(e.clientX-b.left)/b.width*1000;const time=xmin+(px-left)/(right-left)*(xmax-xmin);show(nearest(times,time),e.clientX,e.clientY)});
  hit.addEventListener('pointerleave',()=>{tip.style.display='none';guide.setAttribute('visibility','hidden');dots.forEach(n=>n.setAttribute('visibility','hidden'))});
  hit.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const i=e.key==='Home'?0:e.key==='End'?dates.length-1:Math.max(0,Math.min(dates.length-1,selected+(e.key==='ArrowRight'?1:-1)));const b=svg.getBoundingClientRect();show(i,b.left+x(times[i])/1000*b.width,b.top+70)});
  return svg;
}

export function heatmap(container,{dates,positions,rows,stateDefinitions,dimensionNames,label}){
  const height=350,{svg,p}=root(container,height,label||'Regime classifications');const left=137,right=978,top=15,bottom=300;
  if(!dates.length)return svg;
  const times=dates.map(d=>Date.parse(d+'T00:00:00Z'));const min=times[0],intervals=times.slice(1).map((v,i)=>(v-times[i])/Math.max(1,positions[i+1]-positions[i])).sort((a,b)=>a-b),step=intervals.length?intervals[Math.floor(intervals.length/2)]:86400000,max=times.at(-1)+step;
  const x=t=>left+(t-min)/(max-min||1)*(right-left);const rowHeight=(bottom-top)/rows.length;
  const colors=[p.accent,p.gold,p.red],tip=tooltip(container);
  rows.forEach((row,r)=>{const cy=top+r*rowHeight;svg.append(el('text',{x:left-11,y:cy+rowHeight*.62,'text-anchor':'end',fill:p.muted,'font-size':10},dimensionNames[row.id]||row.id));svg.append(el('rect',{x:left,y:cy+2,width:right-left,height:rowHeight-5,fill:p.missing,opacity:.65}));
    let start=0;for(let i=1;i<=dates.length;i++){const end=i===dates.length;if(!end&&row.values[i]===row.values[start]&&positions[i]-positions[i-1]===1)continue;const code=row.values[start],gap=!end&&positions[i]-positions[i-1]!==1,endTime=end?max:gap?Math.min(times[i],times[i-1]+step):times[i];if(code>=0)svg.append(el('rect',{x:x(times[start]),y:cy+2,width:Math.max(.5,x(endTime)-x(times[start])),height:rowHeight-5,fill:colors[Math.min(code,2)]}));start=i}
  });
  for(let k=0;k<6;k++){const i=Math.round(k*(dates.length-1)/5);svg.append(el('text',{x:x(times[i]),y:326,'text-anchor':k===0?'start':k===5?'end':'middle',fill:p.muted,'font-size':10},dateTick(dates[i])))}
  const hit=el('rect',{x:left,y:top,width:right-left,height:bottom-top,fill:'transparent'});svg.append(hit);
  hit.addEventListener('pointermove',e=>{const b=svg.getBoundingClientRect(),px=(e.clientX-b.left)/b.width*1000,py=(e.clientY-b.top)/b.height*height;const i=nearest(times,min+(px-left)/(right-left)*(max-min));const r=Math.max(0,Math.min(rows.length-1,Math.floor((py-top)/rowHeight)));const row=rows[r],code=row.values[i];contentTip(tip,dates[i],[{name:dimensionNames[row.id]||row.id,value:code<0?'Unavailable':(stateDefinitions[row.id][code]||'Unavailable').replaceAll('_',' ')}]);positionTip(tip,container,e.clientX,e.clientY)});
  hit.addEventListener('pointerleave',()=>tip.style.display='none');return svg;
}

export function downloadSVG(container,filename,{title='',subtitle='',legend=[]}={}){const svg=container.querySelector('svg');if(!svg)return false;const p=palette(),outer=el('svg',{xmlns:NS,viewBox:'0 0 1000 420',width:1400,height:588});outer.append(el('rect',{x:0,y:0,width:1000,height:420,fill:p.bg}));outer.append(el('text',{x:25,y:25,fill:p.text,'font-size':15,'font-family':'Arial, sans-serif'},title));outer.append(el('text',{x:25,y:44,fill:p.muted,'font-size':10,'font-family':'Arial, sans-serif'},subtitle));let lx=25;for(const row of legend){outer.append(el('line',{x1:lx,y1:60,x2:lx+17,y2:60,stroke:row.color,'stroke-width':3}));outer.append(el('text',{x:lx+23,y:63,fill:p.muted,'font-size':9,'font-family':'Arial, sans-serif'},row.name));lx+=row.name.length*5+48}const clone=svg.cloneNode(true);clone.setAttribute('x','0');clone.setAttribute('y','70');clone.setAttribute('width','1000');clone.setAttribute('height','350');clone.querySelectorAll('[tabindex]').forEach(n=>n.removeAttribute('tabindex'));outer.append(clone);const blob=new Blob([new XMLSerializer().serializeToString(outer)],{type:'image/svg+xml'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);return true}

export function metrics(returns,annualization,minimum){const r=returns.filter(finite);if(!r.length)return{n:0,sharpe:null,growth:null,cagr:null,mdd:null,bankrupt:false};let wealth=1,peak=1,dd=0,bankrupt=false;for(const v of r){if(bankrupt||v<=-1){wealth=0;bankrupt=true}else wealth*=1+v;peak=Math.max(peak,wealth);dd=Math.min(dd,wealth/peak-1)}const mean=r.reduce((a,b)=>a+b,0)/r.length;const sd=r.length>1?Math.sqrt(r.reduce((a,b)=>a+(b-mean)**2,0)/(r.length-1)):0;return{n:r.length,sharpe:!bankrupt&&r.length>=minimum&&sd>0?Math.sqrt(annualization)*mean/sd:null,growth:wealth,cagr:r.length>=minimum?(bankrupt?-1:wealth**(annualization/r.length)-1):null,mdd:dd,bankrupt}}
export function wealth(returns){let value=1,dead=false;return returns.map(r=>{if(!finite(r))return null;if(dead||r<=-1){dead=true;value=0}else value*=1+r;return value})}
