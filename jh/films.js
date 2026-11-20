/* 一個詞的重量：三支宣導動畫（腳本＋繪製），網頁播放與 MP4 錄製共用 */
(function(){
const W=1280,H=720,F='font-family="Noto Sans TC,Noto Sans CJK TC,PingFang TC,Microsoft JhengHei,sans-serif"';
const C={bg:"#f2f8ff",ink:"#132a5c",muted:"#5d6782",paper:"#ffffff",sky:"#74c6e4",coral:"#f39a8b",mint:"#7fc395",sun:"#f8c873",sunSoft:"#fdeccb",good:"#2f9a5e",bad:"#d9463b",warn:"#d99000",board:"#2f5d4a",wall:"#f3eee2",floor:"#e6d8c0",skin:"#f6d7b8",blue:"#3b6fc4"};
const ASSET=(typeof window!=="undefined"&&window.FILM_ASSETS)||{film:"paper_film.jpg",tex:"paper_tex.jpg"};
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ez=x=>{x=cl(x);return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2};
const back=x=>{x=cl(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const p=(t,a,d=.5)=>cl((t-a)/d);            // progress 0..1
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
const FS='font-family="Iansui,Noto Sans TC,Noto Sans CJK TC,sans-serif"';
const txt=(x,y,s,o={})=>`<text x="${x}" y="${y}" ${(o.w||700)>=900?FS:F} font-size="${o.size||40}" font-weight="${(o.w||700)>=900?400:(o.w||700)}" fill="${o.fill||C.ink}" ${(o.w||700)>=900?`stroke="${o.fill||C.ink}" stroke-width="1.4" paint-order="stroke"`:""} text-anchor="${o.anchor||"middle"}" ${o.op!=null?`opacity="${o.op}"`:""} ${o.extra||""}>${esc(s)}</text>`;
const g=(inner,{x=0,y=0,s=1,op=1,r=0}={})=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})" opacity="${op}">${inner}</g>`;
const pop=(t,a)=>back(p(t,a,.45));

/* ---------- 共用造型 ---------- */
function confetti(t,seed=0){
  const it=[["x",90,90,C.coral],["ring",1180,110,C.coral],["pill",140,610,C.sun],["half",1150,600,C.sky],["x",1100,330,C.mint],["dot",220,330,C.sky]];
  return it.map(([k,x,y,c],i)=>{const dy=Math.sin(t*1.2+i+seed)*6,r=Math.sin(t*.8+i)*8;
    const sh=k==="x"?`<path d="M-16 -16L16 16M16 -16L-16 16" stroke="${c}" stroke-width="12" stroke-linecap="round"/>`:
      k==="ring"?`<circle r="22" fill="none" stroke="${c}" stroke-width="10"/>`:
      k==="pill"?`<rect x="-34" y="-13" width="68" height="26" rx="13" fill="${c}"/>`:
      k==="half"?`<path d="M-34 10a34 34 0 0 1 68 0z" fill="${c}"/>`:`<circle r="14" fill="${c}"/>`;
    return g(sh,{x,y:y+dy,r});}).join("");
}
function plain(t){const d=Math.sin(t*.4)*14;
  return `<defs><linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dff0ff"/><stop offset="1" stop-color="#f7fbff"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#skyg)"/>
  <g fill="#ffffff" opacity=".9"><g transform="translate(${150+d} 110)"><ellipse rx="90" ry="34"/><ellipse cx="-50" cy="8" rx="50" ry="26"/><ellipse cx="55" cy="10" rx="55" ry="24"/></g>
  <g transform="translate(${1100-d} 150)"><ellipse rx="80" ry="30"/><ellipse cx="-45" cy="8" rx="44" ry="22"/><ellipse cx="50" cy="8" rx="46" ry="22"/></g></g>
  <path d="M0 640 Q320 600 640 640 T1280 630 V720 H0Z" fill="#c9ecd6"/><path d="M0 670 Q360 640 720 672 T1280 662 V720 H0Z" fill="#a8e0bd"/>`}
function classroom(t,txtBoard="36 ÷ 4 = ?",bsize=64){
  return `<rect width="${W}" height="${H}" fill="${C.wall}"/>
  <rect x="300" y="60" width="680" height="230" rx="8" fill="${C.board}"/><rect x="290" y="285" width="700" height="14" rx="4" fill="#b08a5a"/>
  ${txt(640,195,txtBoard,{size:bsize,fill:"#f4f7f2",w:500})}
  <rect x="60" y="80" width="170" height="130" rx="6" fill="${C.sky}" opacity=".5"/><path d="M145 80v130M60 145h170" stroke="${C.paper}" stroke-width="6"/>
  <rect y="500" width="${W}" height="220" fill="${C.floor}"/>`;
}
function home(t){
  return `<rect width="${W}" height="${H}" fill="${C.sunSoft}"/>
  <rect x="880" y="70" width="260" height="210" rx="10" fill="#cfe6f3" stroke="${C.paper}" stroke-width="10"/><path d="M1010 70v210M880 175h260" stroke="${C.paper}" stroke-width="8"/>
  <circle cx="960" cy="130" r="26" fill="${C.sun}"/>
  <rect x="70" y="400" width="330" height="120" rx="34" fill="${C.sky}" opacity=".55"/><rect x="90" y="360" width="290" height="70" rx="26" fill="${C.sky}" opacity=".45"/>
  <rect x="520" y="120" width="120" height="150" rx="6" fill="${C.paper}" stroke="${C.coral}" stroke-width="6"/><path d="M550 230l25-40 20 25 15-15 20 30z" fill="${C.mint}"/>
  <rect y="500" width="${W}" height="220" fill="${C.floor}"/>`;
}
const CAST={zhe:{n:"阿哲",shirt:C.blue,h:1},yu:{n:"小宇",shirt:C.good,h:1},qing:{n:"小晴",shirt:C.sun,h:1,hair:1},an:{n:"小安",shirt:C.coral,h:.78},m1:{n:"同學",shirt:"#9aa3b5",h:.95},m2:{n:"同學",shirt:"#b5a99a",h:.95,hair:1},teacher:{n:"老師",shirt:"#8a6fb0",h:1.22,hair:1,teacher:1,nobub:1}};
const MOUTH={happy:"M-12 -60 Q0 -48 12 -60",laugh:"M-14 -62 Q0 -40 14 -62 Z",sad:"M-12 -52 Q0 -62 12 -52",flat:"M-10 -57 L10 -57",oh:"M-6 -57 a6 7 0 1 0 12 0 a6 7 0 1 0 -12 0",open:"M-9 -59 Q0 -46 9 -59 Z"};
function arms(c,o,m){
  const t=o.t||0,mood=o.mood||"flat";let L,R;
  if(o.cry){L=[-26,10];R=[14,-60]}
  else if(o.talk){L=[-30,10];R=[42,-24+Math.sin(t*7)*10]}
  else if(mood==="laugh"){L=[-30,-4];R=[30,-4]}
  else if(mood==="oh"){L=[-40,-58];R=[40,-58]}
  else if(mood==="sad"){L=[-22,12];R=[22,12]}
  else if(mood==="happy"){L=[-34,6];R=[34,6+Math.sin(t*2)*2]}
  else {L=[-32,10];R=[32,10]}
  const one=(sx,[hx,hy])=>{const mx=(sx+hx)/2+(sx<0?-10:10),my=(-30+hy)/2+4;
    return `<path d="M${sx} -30 Q${mx} ${my} ${hx} ${hy}" stroke="${c.shirt}" stroke-width="13" fill="none" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="8" fill="${C.skin}" stroke="${C.ink}" stroke-width="2.5"/>`};
  return one(-20,L)+one(20,R);
}
function person(id,x,y,o={}){
  const c=CAST[id],s=(o.s||1.75)*c.h,m=o.talk?(Math.floor(o.t*7)%2?"open":"flat"):(o.mood||"flat");
  const bob=o.bob?Math.sin(o.t*14)*4:o.talk?Math.sin(o.t*9)*2:Math.sin(o.t*2+x)*1.5;
  const fill=(m==="laugh"||m==="open")?C.ink:"none";
  const eyes=o.mood==="sad"&&!o.talk?`<path d="M-17 -72q6 4 12 0M5 -72q6 4 12 0" stroke="${C.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`:`<circle cx="-11" cy="-72" r="4" fill="${C.ink}"/><circle cx="11" cy="-72" r="4" fill="${C.ink}"/>`;
  const body=`<g transform="translate(0 ${bob})">
    <rect x="-26" y="-38" width="52" height="62" rx="18" fill="${c.shirt}"/>
    <rect x="-20" y="20" width="15" height="34" rx="7" fill="${C.ink}" opacity=".78"/><rect x="5" y="20" width="15" height="34" rx="7" fill="${C.ink}" opacity=".78"/>
    ${c.hair?`<path d="M-33 -66 q0 -38 33 -38 q33 0 33 38 l0 32 l-9 0 l0 -30 l-48 0 l0 30 l-9 0z" fill="${C.ink}" opacity=".9"/>`:""}
    ${c.teacher?`<circle cx="0" cy="-106" r="13" fill="${C.ink}" opacity=".9"/>`:""}
    <circle cx="0" cy="-68" r="30" fill="${C.skin}" stroke="${C.ink}" stroke-width="2.5"/>
    ${c.hair?"":`<path d="M-30 -76 q4 -24 30 -24 q27 0 30 24 q-15 -9 -30 -7 q-15 -2 -30 7z" fill="${C.ink}" opacity=".9"/>`}
    ${eyes}
    ${c.teacher?`<circle cx="-11" cy="-72" r="9" fill="none" stroke="${C.ink}" stroke-width="2.5"/><circle cx="11" cy="-72" r="9" fill="none" stroke="${C.ink}" stroke-width="2.5"/><path d="M-2 -72h4" stroke="${C.ink}" stroke-width="2.5"/>`:""}
    <circle cx="-19" cy="-58" r="5" fill="${C.coral}" opacity=".45"/><circle cx="19" cy="-58" r="5" fill="${C.coral}" opacity=".45"/>
    <path d="${MOUTH[m]}" stroke="${C.ink}" stroke-width="3" fill="${fill}" stroke-linecap="round" stroke-linejoin="round"/>
    ${arms(c,o,m)}
    ${o.cry?`<path d="M18 -64 q-6 11 0 14 q6 -3 0 -14z" fill="${C.sky}" transform="translate(0 ${(o.t*30)%18})"/>`:""}
    ${o.spot?`<circle cx="0" cy="-68" r="40" fill="none" stroke="${C.sun}" stroke-width="6" opacity="${.6+.4*Math.sin(o.t*4)}"/>`:""}
  </g>`;
  const label=o.label===false?"":`<rect x="-34" y="62" width="68" height="30" rx="15" fill="${C.paper}" opacity=".9"/>${txt(0,84,c.n,{size:18})}`;
  return g(body+label,{x,y,s,op:o.op==null?1:o.op});
}
function bubble(x,y,s,kind,t0){
  const lines=wrap(s,13),w=Math.max(...lines.map(l=>l.length))*34+48,h=lines.length*44+30;
  const bx=cl(x-w/2,20,W-20-w),by=y-h,k=pop(t0,0);
  const st=kind==="hurt"?C.bad:kind==="kind"?C.good:C.ink;
  return `<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">
    <rect x="${bx}" y="${by}" width="${w}" height="${h}" rx="26" fill="${C.paper}" stroke="${st}" stroke-width="${kind?5:3}"/>
    <path d="M${x-14} ${y-2} l14 22 l14 -22z" fill="${C.paper}"/><path d="M${x-14} ${y} l14 22 l14 -22" fill="none" stroke="${st}" stroke-width="${kind?5:3}"/>
    ${lines.map((l,i)=>txt(bx+24,by+52+i*44,l,{size:34,anchor:"start",w:700})).join("")}</g>`;
}
function wrap(s,n){const out=[];let cur="";for(const ch of s){cur+=ch;if(cur.length>=n&&/[，。！？、…]/.test(ch)){out.push(cur);cur=""}else if(cur.length>=n+3){out.push(cur);cur=""}}if(cur)out.push(cur);return out}
function titleCard(t,big,small,col=C.ink){
  const k=pop(t,.1);
  return plain(t)+g(`${txt(0,-10,big,{size:96,w:900,fill:col})}${small?txt(0,70,small,{size:38,w:500,fill:C.muted,op:p(t,.6)}):""}`,{x:640,y:330,s:k});
}
function mascot(x,y,s,t,mood="wonder"){
  const blink=(t%3.2)<.12?.1:1;
  return g(`<rect x="-62" y="-62" width="124" height="124" rx="26" transform="rotate(45)" fill="${C.sky}"/>
   <ellipse cx="-24" cy="0" rx="20" ry="${20*blink}" fill="#fff"/><ellipse cx="24" cy="0" rx="20" ry="${20*blink}" fill="#fff"/>
   <circle cx="-22" cy="3" r="${12*blink}" fill="${C.ink}"/><circle cx="26" cy="3" r="${12*blink}" fill="${C.ink}"/>
   <path d="M-40 -30q12-8 26-2M14 -32q12-6 26 2" stroke="${C.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>
   ${mood==="smile"?`<path d="M-14 34 q14 14 28 0" stroke="${C.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>`:`<circle cx="2" cy="36" r="6" fill="${C.ink}"/>`}`,{x,y:y+Math.sin(t*2.4)*8,s});
}

/* ========== 片一：情境短劇 ========== */
const POS1={zhe:280,yu:450,m1:760,m2:900,qing:1090};
const drama={id:"drama",title:"一句玩笑話",shots:[
 {segs:[["n","特教宣導動畫：一句玩笑話。"]],min:4,draw:(t)=>titleCard(t,"一句玩笑話","特教宣導動畫")},
 {segs:[["n","下課時間，小宇在黑板上算數學，可是他算錯了。"],["zhe","哈哈！你很唐欸！這也不會？","hurt"],["n","教室裡，有幾個同學笑了出來。"]],pos:{zhe:[POS1.zhe,450],yu:[POS1.yu,450]},
  draw:(t,S)=>classroom(t)+["m1","m2","qing"].map(k=>person(k,POS1[k],450,{t,mood:S.seg>=1?"happy":"flat"})).join("")+person("zhe",POS1.zhe,450,{t,mood:"laugh",talk:S.talk("zhe"),bob:S.seg>=1&&!S.talk("zhe")})+person("yu",POS1.yu-60+60*ez(p(t,.3,1)),450,{t,mood:S.seg>=1?"oh":"flat"})},
 {segs:[["n","旁邊的同學也跟著起鬨。"],["m1","唐寶！唐寶！","hurt"],["n","大家笑得好大聲。小宇低下頭，什麼話也沒說。"]],pos:{m1:[POS1.m1,450]},
  draw:(t,S)=>classroom(t)+person("zhe",POS1.zhe,450,{t,mood:"laugh",bob:1})+person("m1",POS1.m1,450,{t,mood:"laugh",talk:S.talk("m1"),bob:!S.talk("m1")})+person("m2",POS1.m2,450,{t,mood:"laugh",bob:1})+person("qing",POS1.qing,450,{t,mood:"flat"})+person("yu",POS1.yu,450+6*ez(p(t,S.at(2),1)),{t,mood:S.seg>=2?"sad":"oh",cry:S.seg>=2})},
 {segs:[["n","可是，有一個人沒有笑。"],["n","那就是小晴。"],["n","她看著低著頭的小宇，心裡很不舒服。"]],
  draw:(t,S)=>{const k=ez(p(t,.6,2.2)),z=1+.7*k,cx=POS1.qing-60,cy=380;
    return `<g transform="translate(${k*(640-cx*z)} ${k*(360-cy*z)}) scale(${z})">`+classroom(t)+person("zhe",POS1.zhe,450,{t,mood:"laugh",bob:1})+person("yu",POS1.yu,456,{t,mood:"sad",cry:1})+person("m1",POS1.m1,450,{t,mood:"laugh",bob:1})+person("m2",POS1.m2,450,{t,mood:"laugh",bob:1})+person("qing",POS1.qing,450,{t,mood:"sad",spot:S.seg>=1})+`</g>`}},
 {segs:[["n","放學回家，小晴的弟弟小安跑了過來。"],["an","姐姐！我今天自己綁好鞋帶了！"],["n","小安是唐氏症者。綁鞋帶這件事，他練習了好幾個月。"]],pos:{an:[0,490]},
  draw:(t,S)=>{const ax=1150-430*ez(p(t,.4,1.8));S.pos.an=[ax,490];return home(t)+person("qing",500,450,{t,mood:"happy"})+person("an",ax,490,{t,mood:"laugh",talk:S.talk("an"),bob:t<2.2})}},
 {segs:[["qing","小安好厲害！"],["n","可是小晴的心裡，一直想著今天教室裡的笑聲。"],["qing","原來大家說的唐寶，是在笑像弟弟這樣的人……"]],pos:{qing:[500,450]},
  draw:(t,S)=>{const think=S.seg>=1?p(t,S.at(1),.6):0;
   return home(t)+person("qing",500,450,{t,mood:S.seg>=1?"sad":"happy",talk:S.talk("qing"),cry:S.seg>=2})+person("an",720,490,{t,mood:"happy"})+
   (think>0&&S.seg===1?g(`<circle cx="-70" cy="60" r="12" fill="${C.paper}"/><circle cx="-40" cy="30" r="18" fill="${C.paper}"/><rect x="-10" y="-120" width="360" height="130" rx="40" fill="${C.paper}" stroke="${C.muted}" stroke-width="3"/>${txt(170,-40,"唐寶！唐寶！",{size:40,fill:C.bad})}`,{x:560,y:220,op:think}):"")}},
 {segs:[["n","第二天，小晴鼓起勇氣，去找阿哲。"],["n","阿哲有點緊張，不知道小晴要說什麼。"],["qing","阿哲，我弟弟是唐氏症者。昨天聽到那些話，我很難過。"]],pos:{qing:[0,450]},
  draw:(t,S)=>{const qx=1090-370*ez(p(t,.3,2.2));S.pos.qing=[qx,450];return classroom(t,"")+person("zhe",440,450,{t,mood:"flat"})+person("qing",qx,450,{t,mood:"flat",talk:S.talk("qing")})}},
 {segs:[["n","阿哲愣住了。"],["zhe","我……我只是覺得好玩，沒想到會讓你難過。對不起。"],["qing","謝謝你願意聽我說。"]],pos:{zhe:[440,450],qing:[720,450]},
  draw:(t,S)=>classroom(t,"")+person("zhe",440,450,{t,mood:"oh",talk:S.talk("zhe")})+person("qing",720,450,{t,mood:S.seg>=2?"happy":"flat",talk:S.talk("qing")})+(S.seg===0?g(txt(0,0,"！",{size:90,fill:C.warn,w:900}),{x:500,y:300,s:pop(t,.2)}):"")},
 {segs:[["n","阿哲走到小宇旁邊。"],["zhe","小宇，昨天對不起。這題我們一起想吧！","kind"],["yu","好啊，謝謝你！","kind"],["n","小宇抬起頭，笑了。"]],pos:{zhe:[0,450],yu:[820,450]},
  draw:(t,S)=>{const zx=300+330*ez(p(t,.3,2));S.pos.zhe=[zx,450];return classroom(t)+person("qing",1080,450,{t,mood:"happy"})+person("zhe",zx,450,{t,mood:"happy",talk:S.talk("zhe")})+person("yu",820,450,{t,mood:S.seg>=1?"happy":"flat",talk:S.talk("yu"),bob:S.seg>=3})}},
 {segs:[["n","隔天上課，老師走進教室。她已經聽說了昨天發生的事。"],
   ["teacher","大家知道嗎？我們常聽到的唐，指的就是唐氏症。"],
   ["teacher","唐氏症的人，第二十一對染色體多了一條。這不是他們選的，也不是誰的錯。"],
   ["teacher","當我們用很唐、唐寶，去笑別人笨、笑別人慢，就是把一群真實存在的人，當成了笑話。"],
   ["teacher","被笑的同學會難過，唐氏症的人和他們的家人聽到，也會很難過。"],
   ["teacher","所以，老師想請大家，不要再用這些詞來開玩笑。"],
   ["teacher","講話之前，先想想：會不會讓人不舒服？"],
   ["teacher","一個詞，也有它的重量。說出口的話，我們要自己負責。"],
   ["m1","老師，我們知道了！","kind"]],pos:{m1:[1060,450]},
  draw:(t,S)=>{const B=["","唐 → 唐氏症","第 21 對染色體多一條","不是笑話","誰會難過？","請不要用來開玩笑","講話前先想想","說出口，要負責","說出口，要負責"][S.seg];
   const tx=-120+320*ez(p(t,.3,2.2));const kidMood=S.seg===4?"sad":S.seg>=8?"happy":"flat";
   return classroom(t,B,B.length>8?52:64)+person("teacher",tx,420,{t,mood:"happy",talk:S.talk("teacher")})+
    [["zhe",600],["yu",750],["qing",900],["m1",1060]].map(([k,x])=>person(k,x,450,{t,mood:k==="m1"&&S.seg>=8?"happy":kidMood,talk:S.talk(k),bob:S.seg>=8})).join("")}},
 {segs:[["n","被笑的人，可能是你的同學，也可能是誰的家人。"],["n","一句玩笑話，受傷的常常不只一個人。"],["n","換一句話，大家都能笑得出來。"],["n","想一想：如果你也在現場，你會怎麼做？"]],
  draw:(t,S)=>plain(t)+(S.seg>=1?g(txt(0,0,"一句玩笑話",{size:70,w:900})+txt(0,90,"受傷的常常不只一個人",{size:52,w:700,fill:C.bad}),{x:640,y:200,op:p(t,S.at(1))}):g(txt(0,0,"同學？家人？",{size:80,w:900,fill:C.coral}),{x:640,y:300,s:pop(t,.3)}))+
   (S.seg>=2?g(txt(0,0,"換一句話，大家都能笑得出來",{size:52,fill:C.good}),{x:640,y:400,s:pop(t,S.at(2))}):"")+
   (S.seg>=3?g(`<rect x="-380" y="-50" width="760" height="90" rx="45" fill="${C.sun}"/>`+txt(0,12,"如果你也在現場，你會怎麼做？",{size:40,w:900}),{x:640,y:530,s:pop(t,S.at(3))}):"")}
]};

/* ========== 片二：認識唐氏症 ========== */
function chromo(t,S,showExtra){
  let s="";const nums=[18,19,20,21,22];
  nums.forEach((n,i)=>{const x=240+i*200,h=n<20?190:140,y=480-h,is=n===21;const col=is?C.blue:"#a7b0c2";
    const k=pop(t,.2+i*.15);
    s+=g(`<rect x="-28" y="${-h}" width="26" height="${h}" rx="13" fill="${col}"/><rect x="8" y="${-h}" width="26" height="${h}" rx="13" fill="${col}"/>${txt(3,50,String(n),{size:34})}`,{x,y:480,s:k});
    if(is&&showExtra!=null){const e=back(p(t,showExtra,.9));const yy=480-260*(1-e);
      s+=`<rect x="${x+44}" y="${yy-h}" width="26" height="${h}" rx="13" fill="${C.sun}" opacity="${cl(e*1.5)}"/>`;
      if(t>showExtra+1)s+=g(txt(0,0,"多了一條！",{size:40,fill:C.bad,w:900}),{x:x+10,y:250,s:pop(t,showExtra+1)});}
  });
  return s;
}
const ICON={
 work:'<rect x="-34" y="-12" width="68" height="46" rx="6"/><path d="M-14 -12v-10h28v10"/>',
 bus:'<rect x="-32" y="-34" width="64" height="58" rx="10"/><path d="M-32 -4h64M-20 24v10M20 24v10"/><circle cx="-18" cy="10" r="4"/><circle cx="18" cy="10" r="4"/>',
 phone:'<rect x="-18" y="-36" width="36" height="72" rx="7"/><path d="M-6 26h12"/>',
 vote:'<rect x="-34" y="0" width="68" height="34" rx="4"/><path d="M-12 0l8 -30 24 10 -8 20"/>',
 ring:'<circle cx="-10" cy="8" r="20"/><circle cx="12" cy="8" r="20"/>',
 grad:'<path d="M-40 -10l40 -20 40 20 -40 20z"/><path d="M-24 0v20c10 10 38 10 48 0v-20"/>'};
const icon=(k,label,x,y,s,t,a)=>g(`<circle r="62" fill="${C.sunSoft}"/><g fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</g>${txt(0,100,label,{size:32})}`,{x,y,s:s*pop(t,a)});
const know={id:"know",title:"認識唐氏症",shots:[
 {segs:[["n","我們常聽到有人說：你很唐、唐寶。"],["n","這些詞，指的就是唐氏症。今天，我們一起來認識唐氏症。"],["n","唐氏症的「唐」，來自英國醫生約翰・朗頓・唐的名字。"],["n","他在 1866 年，第一次詳細描述這個症狀，因此以他的姓氏來命名。"],["n","「唐」只是名字，和「笨」沒有關係。"]],
  draw:(t,S)=>plain(t)+g(txt(0,0,"「很唐」",{size:80,w:900,fill:C.coral})+txt(0,110,"「唐寶」",{size:80,w:900,fill:C.coral}),{x:640,y:280,s:pop(t,.3),op:S.seg>=1?1-p(t,S.at(1),.4):1})+
   (S.seg===1?g(txt(0,0,"認識唐氏症",{size:96,w:900}),{x:640,y:380,s:pop(t,S.at(1)+.3)}):"")+
   (S.seg>=2?g(txt(0,0,"「唐」來自醫生的名字",{size:60,w:900}),{x:640,y:150,s:pop(t,S.at(2))})+
     g(`<rect x="-330" y="-110" width="660" height="230" rx="30" fill="${C.paper}" stroke="${C.blue}" stroke-width="6"/>`+txt(0,-30,"約翰・朗頓・唐",{size:64,w:900})+txt(0,40,"John Langdon Down",{size:40,fill:C.muted})+txt(0,90,"英國醫生",{size:34,fill:C.blue}),{x:640,y:360,s:pop(t,S.at(2)+.3)})+
     (S.seg===3?g(`<rect x="-260" y="-38" width="520" height="74" rx="37" fill="${C.sun}"/>`+txt(0,12,"1866 年 描述這個症狀",{size:38,w:900}),{x:640,y:528,s:pop(t,S.at(3)+.2)}):"")+(S.seg>=4?g(`<rect x="-360" y="-38" width="720" height="74" rx="37" fill="${C.paper}" stroke="${C.good}" stroke-width="5"/>`+txt(0,12,"「唐」只是名字，和「笨」沒有關係",{size:38,w:900,fill:C.good}),{x:640,y:528,s:pop(t,S.at(4)+.1)}):""):"")},
 {segs:[["n","我們的身體裡，有好多好多細胞。每個細胞裡，有二十三對染色體。"],["n","每一對，原本都有兩條。"],["n","唐氏症者的第二十一對染色體，多了一條，變成三條。"],["n","所以，唐氏症也叫做二十一三體症。"]],
  draw:(t,S)=>plain(t)+txt(640,110,S.seg<2?"每一對染色體，原本有 2 條":"第 21 對，有 3 條",{size:48,w:900})+chromo(t,S,S.seg>=2?S.at(2):null)+(S.seg>=3?g(`<rect x="-230" y="-50" width="460" height="80" rx="40" fill="${C.sun}"/>`+txt(0,8,"21 三體症",{size:46,w:900}),{x:640,y:600,s:pop(t,S.at(3))}):"")},
 {segs:[["n","這是寶寶還在媽媽肚子裡，就發生的。"],["n","不是誰做錯了事，也不會傳染。"]],
  draw:(t,S)=>plain(t)+g(`<circle r="150" fill="${C.sunSoft}"/><circle r="70" cx="10" cy="20" fill="${C.skin}" stroke="${C.ink}" stroke-width="4"/><path d="M-20 30q30 20 60 0" stroke="${C.ink}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="-10" cy="5" r="6" fill="${C.ink}"/><circle cx="30" cy="5" r="6" fill="${C.ink}"/>`,{x:360,y:360,s:pop(t,.2)})+
   (S.seg>=1?[["不是誰的錯",0],["不會傳染",1]].map(([s,i])=>g(`<rect x="-230" y="-55" width="460" height="100" rx="24" fill="${C.paper}" stroke="${C.good}" stroke-width="5"/><path d="M-190 -2l18 18 32 -36" stroke="${C.good}" stroke-width="9" fill="none" stroke-linecap="round"/>${txt(30,14,s,{size:46,w:900})}`,{x:860,y:290+i*150,s:pop(t,S.at(1)+i*.5)})).join(""):"")},
 {segs:[["n","在台灣，大約每八百到一千兩百多個新生兒，就有一位是唐氏症寶寶。"],["n","所以，在我們的學校、我們的社區裡，也可能有唐氏症者。"]],
  draw:(t,S)=>{let d="";const cols=40,rows=20;const shown=Math.floor(cl(t/3)*800);
   for(let i=0;i<800;i++){if(i>shown)break;const x=200+(i%cols)*22,y=150+Math.floor(i/cols)*22;d+=`<circle cx="${x}" cy="${y}" r="7" fill="${i===417?C.coral:"#c9d1df"}"/>`}
   return plain(t)+d+(t>3.2?g(`<circle r="${22+Math.sin(t*5)*3}" fill="none" stroke="${C.coral}" stroke-width="5"/>`,{x:200+17*22,y:150+10*22}):"")+txt(640,640,"約每 800～1,200 多名新生兒，就有 1 位",{size:44,w:900,op:p(t,1)})+(S.seg>=1?g(`<rect x="-300" y="-46" width="600" height="80" rx="40" fill="${C.sun}"/>`+txt(0,10,"學校、社區裡也可能有",{size:40}),{x:640,y:90,s:pop(t,S.at(1))}):"")}},
 {segs:[["n","唐氏症者的眼睛可能比較向上斜，臉比較扁平，身材比較矮小。"],["n","不過，就像我們每個人一樣，每個人都長得不一樣。"]],
  draw:(t,S)=>plain(t)+["眼睛向上斜","臉比較扁平","身材較矮小"].map((s,i)=>g(`<rect x="-170" y="-50" width="340" height="100" rx="50" fill="${C.sun}"/>`+txt(0,15,s,{size:44}),{x:280+i*360,y:200,s:pop(t,.4+i*1.1)})).join("")+
   (S.seg>=1?["zhe","qing","an","yu","m2"].map((k,i)=>person(k,240+i*200,560,{t,mood:"happy",label:false,s:1.3,op:p(t,S.at(1)+i*.25)})).join("")+txt(640,700,"每個人，都長得不一樣",{size:40,op:p(t,S.at(1)+1.5)}):"")},
 {segs:[["n","他們的肌肉可能比較軟，學東西需要多練習幾次。"],["n","有些人的心臟、聽力或視力，需要醫生的幫忙。"],["n","唐氏症沒有辦法治好。但是越早開始早期療育、復健和學習，就越能學會照顧自己。"]],
  draw:(t,S)=>plain(t)+[["多練習幾次",C.sky,0],["醫生幫忙",C.coral,1],["早期療育",C.mint,2]].map(([s,c,i])=>S.seg>=i?g(`<circle r="130" fill="${c}"/>`+txt(0,15,s,{size:42,w:900,fill:C.ink}),{x:300+i*340,y:330,s:pop(t,S.at(i))}):"").join("")+
   (S.seg>=2?g(`<path d="M-300 0h560" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/><path d="M250 -22l30 22 -30 22" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>`+txt(-10,70,"越早開始，越有幫助",{size:40}),{x:640,y:560,op:p(t,S.at(2)+1)}):"")},
 {segs:[["n","唐氏症者可以上班工作、自己搭車、使用手機。"],["n","也可以投票、結婚，甚至上大學。"],["n","他們和我們一樣，有喜歡的事，有想完成的夢想，也會開心，也會難過。"]],
  draw:(t,S)=>plain(t)+txt(640,110,"唐氏症者可以做到的事",{size:54,w:900})+
   [["work","上班工作"],["bus","自己搭車"],["phone","使用手機"]].map(([k,l],i)=>icon(k,l,280+i*360,250,1,t,.5+i*.9)).join("")+
   (S.seg>=1?[["vote","投票"],["ring","結婚"],["grad","上大學"]].map(([k,l],i)=>icon(k,l,280+i*360,470,1,t,S.at(1)+i*.7)).join(""):"")+
   (S.seg>=2?`<rect width="${W}" height="${H}" fill="${C.bg}" opacity="${.9*p(t,S.at(2),.6)}"/>`+g(txt(0,0,"和我們一樣",{size:90,w:900})+txt(0,90,"有喜歡的事、有夢想、會開心也會難過",{size:42,w:500,fill:C.muted}),{x:640,y:340,s:pop(t,S.at(2)+.3)}):"")},
 {segs:[["n","每年的三月二十一日，是世界唐氏症日，代表第二十一對染色體有三條。"],["n","這一天，很多人會穿上不成對的襪子，告訴大家：不一樣，也很好。"]],
  draw:(t,S)=>{const sock=(c1,c2,x,r)=>g(`<path d="M-30 -140h60v120c0 20 14 28 32 32l18 4c20 5 22 30 4 42-30 20-86 14-110-14-14-18-10-44-10-64z" fill="${c1}"/><rect x="-30" y="-140" width="60" height="26" fill="${c2}"/><circle cx="0" cy="-60" r="8" fill="${c2}"/><circle cx="-6" cy="-20" r="8" fill="${c2}"/>`,{x,y:440,r:r+Math.sin(t*3)*4,s:pop(t,S.at(1)+.2)});
   return plain(t)+g(txt(0,0,"3 / 21",{size:150,w:900,fill:C.blue})+txt(0,80,"世界唐氏症日",{size:48}),{x:640,y:S.seg>=1?150:330,s:S.seg>=1?.7:pop(t,.2)})+
   (S.seg>=1?sock(C.coral,C.sky,520,-8)+sock(C.sky,C.sun,780,10)+txt(640,590,"不一樣，也很好",{size:56,w:900,op:p(t,S.at(1)+1.2)}):"")}},
 {segs:[["n","很多人會親切地叫他們：唐寶寶。"],["n","可是，當有人用唐寶或很唐，來笑別人笨、笑別人慢，這就變成了傷人的話。"],["n","最好的稱呼，就是叫他的名字。"]],
  draw:(t,S)=>plain(t)+g(`<rect x="-250" y="-120" width="500" height="240" rx="30" fill="${C.paper}" stroke="${C.good}" stroke-width="6"/>`+txt(0,-30,"親切的稱呼",{size:34,fill:C.good})+txt(0,50,"唐寶寶",{size:76,w:900}),{x:340,y:300,s:pop(t,.2)})+
   (S.seg>=1?g(`<rect x="-250" y="-120" width="500" height="240" rx="30" fill="${C.paper}" stroke="${C.bad}" stroke-width="6"/>`+txt(0,-30,"拿來取笑別人",{size:34,fill:C.bad})+txt(0,50,"唐寶！很唐！",{size:68,w:900}),{x:940,y:300,s:pop(t,S.at(1))}):"")+
   (S.seg>=2?g(`<rect x="-360" y="-56" width="720" height="100" rx="50" fill="${C.sun}"/>`+txt(0,12,"最好的稱呼：叫他的名字",{size:48,w:900}),{x:640,y:580,s:pop(t,S.at(2))}):"")}
]};

/* ========== 片三：講話前先想想 ========== */
const light=(x,y,on,s,t,a)=>{const c=[C.bad,C.sun,C.good];return g(`<rect x="-55" y="-130" width="110" height="260" rx="26" fill="${C.paper}" stroke="${C.ink}" stroke-width="7"/>`+[0,1,2].map(i=>`<circle cy="${-78+i*78}" r="30" fill="${i===on?c[i]:"none"}" stroke="${C.ink}" stroke-width="6"/>`).join(""),{x,y,s:s*pop(t,a)})};
const sum={id:"sum",title:"講話前先想想",shots:[
 {segs:[["n","講話之前，先想想。"]],min:4,draw:(t)=>titleCard(t,"講話前先想想","一個詞的重量")},
 {segs:[["n","一句玩笑話說出口，就像一顆石頭丟進水裡。"],["n","漣漪會傳到被笑的同學、唐氏症者本人、他們的家人，還有其他有類似狀況的人。"],["n","說的人可能只是覺得好玩，可是聽的人，卻可能難過很久。"]],
  draw:(t,S)=>{let r="";if(S.seg>=0)for(let i=0;i<3;i++){const ph=((t-1.2)/2.4+i/3)%1;if(t>1.2)r+=`<circle cx="640" cy="360" r="${40+ph*420}" fill="none" stroke="${C.bad}" stroke-width="6" opacity="${1-ph}"/>`}
   const ppl=[["yu",250,210,"被笑的同學"],["an",1030,210,"唐氏症者本人"],["qing",250,470,"家人"],["m2",1030,470,"有類似狀況的人"]];
   return plain(t)+r+g(`<rect x="-150" y="-46" width="300" height="92" rx="46" fill="${C.paper}" stroke="${C.bad}" stroke-width="5"/>`+txt(0,16,"你很唐欸",{size:44}),{x:640,y:360,s:pop(t,.3)})+
   (S.seg>=1?ppl.map(([k,x,y,l],i)=>{const a=S.at(1)+i*1.1;return t>a?person(k,x,y,{t,mood:"sad",cry:t>a+.8,s:1.2,label:false})+txt(x,y+108,l,{size:30}):""}).join(""):"")}},
 {segs:[["n","不只是唐。智障、低能兒、喜憨兒、搞自閉，這些詞的背後，也都是一群真實存在的人。"],["n","每個人的存在，都不應該被當成笑話。"]],
  draw:(t,S)=>{const w=[["喜憨兒",300,330],["智障",640,250],["低能兒",960,380],["搞自閉",560,500]];
   return plain(t)+txt(640,130,"不只是「唐」",{size:72,w:900})+w.map(([s,x,y],i)=>g(txt(0,0,s,{size:84,w:900,fill:C.coral}),{x,y,s:pop(t,1.2+i*.9),op:S.seg>=1?1-.75*p(t,S.at(1),.6):1})).join("")+
   (S.seg>=1?g(`<rect x="-480" y="-60" width="960" height="110" rx="55" fill="${C.ink}"/>`+txt(0,15,"每個人的存在，都不應該被當成笑話",{size:46,fill:C.paper}),{x:640,y:420,s:pop(t,S.at(1)+.2)}):"")}},
 {segs:[["n","同一句玩笑，不同的人，感受可能差很多。"],["n","有人覺得是綠燈，有人卻覺得是紅燈。"],["n","講話之前，先想想：誰可能會不舒服？"]],
  draw:(t,S)=>plain(t)+txt(640,110,"同一句玩笑，不同人感受可能差很多",{size:48,w:900})+light(330,370,2,1,t,.5)+light(640,370,1,1,t,.9)+light(950,370,0,1,t,1.3)+
   txt(330,560,"沒有冒犯",{size:40,fill:C.good})+txt(640,560,"有一點冒犯",{size:40,fill:C.warn})+txt(950,560,"有冒犯",{size:40,fill:C.bad})+
   (S.seg>=2?g(`<rect x="-260" y="-44" width="520" height="80" rx="6" fill="${C.ink}"/>`+txt(0,12,"誰可能不舒服？",{size:42,fill:C.paper}),{x:640,y:650,s:pop(t,S.at(2))}):"")},
 {segs:[["n","我們可以換句話說。"],["n","你很唐欸，可以換成：這題有點難，我們一起想。"],["n","唐寶，快一點啦，可以換成：慢慢來，我等你。"],["n","你是智障喔，可以換成：你剛剛沒聽清楚嗎？我再說一次。"]],
  draw:(t,S)=>{const card=(a,b,y,st)=>{const f=p(t,st+2.2,.5),sx=Math.max(.02,Math.abs(Math.cos(f*Math.PI)));const show=f<.5?a:b,col=f<.5?C.coral:C.mint;
     const inner=`<rect x="-460" y="-56" width="920" height="112" rx="26" fill="${col}"/>`+txt(-430,-20,f<.5?"原本會說":"可以換成",{size:24,anchor:"start",w:700})+txt(0,32,show,{size:44,w:900});
     return g(`<g transform="scale(1 ${sx})">${inner}</g>`,{x:640,y,s:pop(t,st)})};
   return plain(t)+txt(640,110,"換句話說",{size:64,w:900})+(S.seg>=1?card("你很唐欸！","這題有點難，我們一起想。",250,S.at(1)):"")+(S.seg>=2?card("唐寶，快一點啦！","慢慢來，我等你。",385,S.at(2)):"")+(S.seg>=3?card("你是智障喔？","你剛剛沒聽清楚嗎？我再說一次。",520,S.at(3)):"")}},
 {segs:[["n","最後，我們一起做三個約定。"],["n","第一，我不說。不用很唐、唐寶來形容別人。"],["n","第二，我提醒。聽到別人這樣說，溫和地提醒他。"],["n","第三，我陪伴。看到同學被笑，走過去陪他，或告訴老師。"]],
  draw:(t,S)=>plain(t)+txt(640,120,"我們的三個約定",{size:66,w:900})+[["我不說",C.sky,"不用「很唐」「唐寶」形容別人"],["我提醒",C.sun,"溫和地提醒說的人"],["我陪伴",C.mint,"陪被笑的同學，或告訴老師"]].map(([h,c,d],i)=>S.seg>=i+1?g(`<rect x="-180" y="-170" width="360" height="340" rx="30" fill="${C.paper}" stroke="${c}" stroke-width="8"/><circle cy="-80" r="56" fill="${c}"/>${txt(0,-62,String(i+1),{size:56,w:900})}${txt(0,40,h,{size:58,w:900})}${wrap(d,8).map((l,j)=>txt(0,100+j*40,l,{size:28,w:500,fill:C.muted})).join("")}`,{x:240+i*400,y:420,s:pop(t,S.at(i+1))}):"").join("")},
 {segs:[["n","一個詞，看起來很輕。"],["n","可是說出口之後，它會留在別人心裡很久，有時候，還要負上法律責任。"],["n","說錯話的時候，勇敢說對不起，再換一句好話。這就是為自己說的話負責。"]],
  draw:(t,S)=>{const drop=ez(p(t,.6,1.1)),tilt=14*drop;
   const beam=g(`<rect x="-300" y="-8" width="600" height="16" rx="8" fill="${C.ink}"/>
     <g transform="translate(-280 0) rotate(${tilt})"><path d="M0 0 L-70 150 M0 0 L70 150" stroke="${C.ink}" stroke-width="4"/><path d="M-100 150 h200 a100 34 0 0 1 -200 0z" fill="${C.sky}"/></g>
     <g transform="translate(280 0) rotate(${tilt})"><path d="M0 0 L-70 150 M0 0 L70 150" stroke="${C.ink}" stroke-width="4"/><path d="M-100 150 h200 a100 34 0 0 1 -200 0z" fill="${C.sun}"/></g>`,{x:640,y:200,r:-tilt});
   const wy=40+(306-40)*drop+280*Math.sin(tilt*Math.PI/180);
   const word=g(`<rect x="-80" y="-44" width="160" height="88" rx="16" fill="${C.coral}"/>`+txt(0,16,"很唐",{size:48,w:900,fill:"#fff"}),{x:640-280*Math.cos(tilt*Math.PI/180),y:wy});
   return plain(t)+txt(640,110,"一個詞的重量",{size:64,w:900})+`<path d="M640 210 L600 470 H680Z" fill="${C.ink}" opacity=".85"/>`+beam+word+
    (S.seg>=1?g(`<rect x="-300" y="-44" width="600" height="88" rx="44" fill="${C.sun}"/>`+txt(0,16,"說出口的話，要自己負責",{size:44,w:900}),{x:880,y:470,s:pop(t,S.at(1))}):"")+
    (S.seg>=2?`<rect width="${W}" height="${H}" fill="${C.bg}" opacity="${.92*p(t,S.at(2),.5)}"/>`+[["說對不起",C.sky],["換一句好話",C.mint]].map(([s,c],i)=>g(`<rect x="-230" y="-80" width="460" height="160" rx="30" fill="#fff" stroke="${c}" stroke-width="8"/>`+txt(0,18,s,{size:60,w:900}),{x:400+i*480,y:340,s:pop(t,S.at(2)+.3+i*.5)})).join(""):"")}},
 {segs:[["n","講話之前先想想：會不會讓人不舒服？"],["n","讓我們的教室，多一點理解，多一點友善。"],["n","從今天開始，我們一起做到。"]],
  draw:(t,S)=>plain(t)+g(txt(0,0,"講話之前先想想",{size:84,w:900})+txt(0,110,"「會不會讓人不舒服？」",{size:84,w:900}),{x:640,y:260,s:pop(t,.2)})+(S.seg>=1?txt(640,690,"多一點理解，多一點友善",{size:40,fill:C.muted,op:p(t,S.at(1))}):"")}
]};


/* ========== 低年級版 ========== */
const face=(kind,x,y,s,a,t,lab)=>{const col={happy:C.mint,ok:C.sun,sad:C.coral}[kind];
  const mouth=kind==="happy"?`<path d="M-30 18 q30 30 60 0" stroke="${C.ink}" stroke-width="8" fill="none" stroke-linecap="round"/>`:kind==="ok"?`<path d="M-28 26h56" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>`:`<path d="M-30 36 q30 -28 60 0" stroke="${C.ink}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M-40 -34l22 10M40 -34l-22 10" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>`;
  return g(`<circle r="80" fill="${col}" stroke="${C.ink}" stroke-width="6"/><circle cx="-26" cy="-8" r="9" fill="${C.ink}"/><circle cx="26" cy="-8" r="9" fill="${C.ink}"/>${mouth}${lab?txt(0,140,lab,{size:40,w:900}):""}`,{x,y,s:s*pop(t,a)})};
const D=drama.shots,KN=know.shots;
const lodrama={id:"lodrama",title:"一句玩笑話",shots:[
 {segs:[["n","小故事：一句玩笑話。"]],min:4,draw:(t)=>titleCard(t,"一句玩笑話","小故事")},
 {segs:[["n","下課了，小宇在黑板上算數學，他算錯了。"],["zhe","哈哈！你很唐欸！","hurt"],["n","有的同學笑了。"]],pos:D[1].pos,draw:D[1].draw},
 {segs:[["n","旁邊的同學也跟著喊。"],["m1","唐寶！唐寶！","hurt"],["n","小宇低下頭，不說話。"]],pos:D[2].pos,draw:D[2].draw},
 {segs:[["n","可是，有一個人沒有笑。"],["n","那就是小晴。"],["n","她看著小宇，心裡很不舒服。"]],draw:D[3].draw},
 {segs:[["n","回到家，弟弟小安跑了過來。"],["an","姐姐！我自己綁好鞋帶了！"],["n","小安是唐氏症寶寶。綁鞋帶，他練習了好久好久。"]],pos:D[4].pos,draw:D[4].draw},
 {segs:[["qing","小安好棒！"],["n","可是，小晴一直想著教室裡的笑聲。"],["qing","原來大家說的唐寶，是在笑像弟弟這樣的人……"]],pos:D[5].pos,draw:D[5].draw},
 {segs:[["n","第二天，小晴去找阿哲。"],["n","阿哲有點緊張。"],["qing","阿哲，我弟弟是唐氏症。聽到你們那樣說，我很難過。"]],pos:D[6].pos,draw:D[6].draw},
 {segs:[["n","阿哲愣住了。"],["zhe","我只是覺得好玩……對不起。"],["qing","謝謝你聽我說。"]],pos:D[7].pos,draw:D[7].draw},
 {segs:[["n","阿哲走到小宇旁邊。"],["zhe","小宇，對不起。我們一起想這一題！","kind"],["yu","好啊！","kind"],["n","小宇笑了。"]],pos:D[8].pos,draw:D[8].draw},
 {segs:[["n","一句玩笑話，可能讓人很難過。"],["n","講話前，先想一想："],["n","他聽了，會不舒服嗎？"]],
  draw:(t,S)=>plain(t)+(S.seg===0?g(txt(0,0,"一句玩笑話",{size:84,w:900})+txt(0,100,"可能讓人很難過",{size:56,w:900,fill:C.bad}),{x:640,y:260,s:pop(t,.2)})+face("sad",640,520,1,.9,t):"")+
   (S.seg>=1?g(txt(0,0,"講話前，先想一想",{size:72,w:900}),{x:640,y:150,s:pop(t,S.at(1))}):"")+
   (S.seg>=2?g(txt(0,0,"他聽了，會不舒服嗎？",{size:54,w:900,fill:C.blue}),{x:640,y:250,s:pop(t,S.at(2))})+face("happy",380,440,.9,S.at(2)+.3,t,"開心")+face("ok",640,440,.9,S.at(2)+.5,t,"還好")+face("sad",900,440,.9,S.at(2)+.7,t,"不舒服"):"")}
]};
const loknow={id:"loknow",title:"認識唐氏症",shots:[
 {segs:[["n","我們一起來認識唐氏症。"],["n","「唐」，是一位英國醫生的名字。"],["n","跟「笨」沒有關係。"]],
  draw:(t,S)=>plain(t)+(S.seg===0?g(txt(0,0,"認識唐氏症",{size:110,w:900}),{x:640,y:360,s:pop(t,.2)}):"")+
   (S.seg>=1?g(`<rect x="-330" y="-110" width="660" height="230" rx="30" fill="${C.paper}" stroke="${C.blue}" stroke-width="6"/>`+txt(0,-30,"約翰・朗頓・唐",{size:64,w:900})+txt(0,40,"John Langdon Down",{size:40,fill:C.muted})+txt(0,90,"英國醫生",{size:34,fill:C.blue}),{x:640,y:300,s:pop(t,S.at(1))}):"")+
   (S.seg>=2?g(`<rect x="-340" y="-46" width="680" height="88" rx="44" fill="${C.paper}" stroke="${C.good}" stroke-width="5"/>`+txt(0,14,"跟「笨」沒有關係",{size:48,w:900,fill:C.good}),{x:640,y:520,s:pop(t,S.at(2))}):"")},
 {segs:[["n","唐氏症，是寶寶在媽媽肚子裡就有的。"],["n","不是誰的錯，也不會傳染。"]],draw:KN[2].draw},
 {segs:[["n","每個人，都長得不一樣。"],["n","唐氏症的人也是。"]],
  draw:(t,S)=>plain(t)+["zhe","qing","an","yu","m2"].map((k,i)=>person(k,240+i*200,520,{t,mood:"happy",label:false,s:1.3,op:p(t,.3+i*.25)})).join("")+
   g(txt(0,0,"每個人，都長得不一樣",{size:62,w:900}),{x:640,y:150,s:pop(t,.4)})+(S.seg>=1?g(`<rect x="-260" y="-44" width="520" height="84" rx="42" fill="${C.sun}"/>`+txt(0,12,"唐氏症的人也是",{size:44,w:900}),{x:640,y:250,s:pop(t,S.at(1))}):"")},
 {segs:[["n","他們學東西，需要多一點時間，多練習幾次。"],["n","有人幫忙，就能慢慢學會。"]],
  draw:(t,S)=>plain(t)+[["多一點時間",C.sky,0,.3],["多練習幾次",C.mint,0,1.6]].map(([s,c,i,a],k)=>g(`<circle r="130" fill="${c}"/>`+txt(0,15,s,{size:40,w:900}),{x:380+k*520,y:300,s:pop(t,a)})).join("")+
   (S.seg>=1?g(`<rect x="-330" y="-50" width="660" height="96" rx="48" fill="${C.sun}"/>`+txt(0,14,"有人幫忙，慢慢學會",{size:48,w:900}),{x:640,y:560,s:pop(t,S.at(1))}):"")},
 {segs:[["n","他們也會上學、上班、自己搭車。"],["n","也有喜歡的事，會開心，也會難過，跟我們一樣。"]],
  draw:(t,S)=>plain(t)+[["grad","上學"],["work","上班"],["bus","自己搭車"]].map(([k,l],i)=>icon(k,l,280+i*360,280,1.1,t,.4+i*.8)).join("")+
   (S.seg>=1?`<rect width="${W}" height="${H}" fill="${C.bg}" opacity="${.9*p(t,S.at(1),.6)}"/>`+g(txt(0,0,"跟我們一樣",{size:100,w:900})+txt(0,90,"有喜歡的事，會開心，也會難過",{size:44,w:500,fill:C.muted}),{x:640,y:340,s:pop(t,S.at(1)+.3)}):"")},
 {segs:[["n","三月二十一日，是世界唐氏症日。"],["n","很多人會穿不一樣的襪子，告訴大家：不一樣，也很好！"]],draw:KN[7].draw},
 {segs:[["n","叫人的時候，"],["n","最好的方法，就是叫他的名字。"]],
  draw:(t,S)=>plain(t)+person("qing",420,460,{t,mood:"happy",talk:S.seg>=1&&t<S.at(1)+2})+person("an",820,490,{t,mood:"laugh",bob:S.seg>=1})+
   (S.seg>=1?g(`<rect x="-150" y="-60" width="300" height="110" rx="40" fill="${C.paper}" stroke="${C.ink}" stroke-width="5"/>`+txt(0,16,"小安！",{size:56,w:900}),{x:600,y:230,s:pop(t,S.at(1)+.2)})+
     g(`<rect x="-360" y="-46" width="720" height="88" rx="44" fill="${C.sun}"/>`+txt(0,14,"最好的方法：叫他的名字",{size:46,w:900}),{x:640,y:80,s:pop(t,S.at(1)+.8)}):"")}
]};
const FILMS={drama,know,sum,lodrama,loknow};
const LEAD=.9,GAP=.7,TAIL=1.8;
/* 依旁白長度排時間軸 */
function build(film,timing){
  let cur=0;const tl=[];
  film.shots.forEach((sh,si)=>{
    let tt=LEAD;const segs=sh.segs.map((sg,i)=>{const d=timing[film.id][si][i];const o={who:sg[0],text:sg[1],kind:sg[2]||"",start:tt,end:tt+d};tt+=d+GAP;return o});
    const dur=Math.max(sh.min||0,tt-GAP+TAIL);
    tl.push({sh,segs,start:cur,dur});cur+=dur;
  });
  film.tl=tl;film.total=cur;return film;
}
function frame(film,T){
  const tl=film.tl;let k=tl.findIndex(x=>T<x.start+x.dur);if(k<0)k=tl.length-1;
  const sh=tl[k],t=T-sh.start;
  let seg=-1;sh.segs.forEach((s,i)=>{if(t>=s.start)seg=i});
  const act=sh.segs[seg],speaking=act&&t<act.end?act:null;
  const S={seg:Math.max(0,seg),at:i=>sh.segs[i]?sh.segs[i].start:0,talk:id=>!!speaking&&speaking.who===id,pos:Object.assign({},sh.sh.pos||{})};
  let svg=sh.sh.draw(t,S);
  // 對白泡泡
  if(act&&act.who!=="n"&&!CAST[act.who].nobub&&S.pos[act.who]&&t<act.end+.5){const [x,y]=S.pos[act.who];svg+=bubble(x,y-CAST[act.who].h*1.75*112,act.text,act.kind,t-act.start)}
  // 字幕
  const sub=act&&t<act.end+.25?act:null;
  if(sub){const who=sub.who==="n"?"":CAST[sub.who].n+"：";const st=who+sub.text;let lines=[st];if(st.length>30){const mid=st.length/2;let best=-1,bd=99;[...st].forEach((ch,i)=>{if(/[，。！？、]/.test(ch)&&i<st.length-1&&Math.abs(i+1-mid)<bd){bd=Math.abs(i+1-mid);best=i+1}});if(best<0||bd>10)best=Math.ceil(mid);lines=[st.slice(0,best),st.slice(best)]}
    svg+=`<rect x="0" y="${H-34-lines.length*50}" width="${W}" height="${34+lines.length*50}" fill="#22314d" opacity=".82"/>`+lines.map((l,i)=>txt(640,H-30-(lines.length-1-i)*50,l,{size:36,fill:"#fff",w:500})).join("")}
  // 紙張紋理
  // 轉場
  const fin=cl(1-t/.3);if(fin>0&&k>0)svg+=`<rect width="${W}" height="${H}" fill="${C.bg}" opacity="${fin}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" style="display:block">${svg}</svg>`;
}
/* 容易念錯的字：配音用同音字代念，字幕仍顯示原字 */
const PRON=[["1866 年","一八六六年"],["約翰・朗頓・唐","約翰，朗頓，唐"],["做錯了事","做錯勒事"],["人和他們","人漢他們"],["復健和學習","復健漢學習"],["他們和我們","他們漢我們"],["起鬨","起哄"],["長得","掌得"],["差很多","插很多"],["為自己","位自己"],["當成","蕩成"],["……","，"],["：","，"]];
function say(s){let o=s;for(const [a,b] of PRON)o=o.split(a).join(b);return o}
const api={FILMS,build,frame,W,H,PRON,say};
if(typeof module!=="undefined")module.exports=api;else window.FILMKIT=api;
})();
