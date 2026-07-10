import{r as o,j as $}from"./index-B2FGBcnX.js";import{R as H,T as N,P as k,M as J}from"./Triangle-GlFcswsc.js";const w=c=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);return n?[parseInt(n[1],16)/255,parseInt(n[2],16)/255,parseInt(n[3],16)/255]:[1,1,1]},X=c=>{switch(c){case"top-left":return[1,0];case"bottom-right":return[0,1];case"bottom-left":return[1,1];default:return[0,0]}};function Z({speed:c=2.5,rayColor1:n="#EAB308",rayColor2:d="#96c8ff",intensity:v=2,spread:m=2,origin:g="top-right",tilt:y=0,saturation:p=1.5,blend:h=.75,falloff:R=1.6,opacity:x=1,maxFps:I=30,className:Y=""}){const r=o.useRef(null),f=o.useRef(null),S=o.useRef(null),t=o.useRef(null),A=o.useRef(null),a=o.useRef(null),C=o.useRef(null),[P,O]=o.useState(!1);return o.useEffect(()=>{if(r.current)return C.current=new IntersectionObserver(([e])=>O(e.isIntersecting),{threshold:.1}),C.current.observe(r.current),()=>{var e;(e=C.current)==null||e.disconnect(),C.current=null}},[]),o.useEffect(()=>{var z;if(!P||!r.current)return;(z=a.current)==null||z.call(a),a.current=null;let e=!1,s=!document.hidden,b=0;const _=1e3/Math.max(I,1);return(async()=>{if(e||!r.current)return;const i=new H({dpr:Math.min(window.devicePixelRatio,1.5),alpha:!0});S.current=i;const u=i.gl;for(u.canvas.style.width="100%",u.canvas.style.height="100%";r.current.firstChild;)r.current.removeChild(r.current.firstChild);r.current.appendChild(u.canvas);const q=`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`,M=`precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  return clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0) *
    clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
  if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad);
  float sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

  float halfSpread = iSpread * 0.275;
  vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
  vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

  vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
  vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);
  vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

  float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
  color.rgb *= brightness;

  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);
  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`,[V,W]=X(g),T={iTime:{value:0},iResolution:{value:[1,1]},iSpeed:{value:c},iRayColor1:{value:w(n)},iRayColor2:{value:w(d)},iIntensity:{value:v},iSpread:{value:m},iFlipX:{value:V},iFlipY:{value:W},iTilt:{value:y},iSaturation:{value:p},iBlend:{value:h},iFalloff:{value:R},iOpacity:{value:x}};f.current=T;const j=new N(u),G=new k(u,{vertex:q,fragment:M,uniforms:T}),B=new J(u,{geometry:j,program:G});A.current=B;const E=()=>{if(!r.current||!S.current)return;const{clientWidth:l,clientHeight:D}=r.current;i.setSize(l,D),T.iResolution.value=[l*i.dpr,D*i.dpr]},F=l=>{if(!(!S.current||!f.current||!A.current||!s)){if(l-b<_){t.current=requestAnimationFrame(F);return}b=l,T.iTime.value=l*.001,i.render({scene:B}),t.current=requestAnimationFrame(F)}},L=()=>{if(s=!document.hidden,!s&&t.current){cancelAnimationFrame(t.current),t.current=null;return}s&&!t.current&&(t.current=requestAnimationFrame(F))};window.addEventListener("resize",E),document.addEventListener("visibilitychange",L),E(),t.current=requestAnimationFrame(F),a.current=()=>{var l;window.removeEventListener("resize",E),document.removeEventListener("visibilitychange",L),t.current&&cancelAnimationFrame(t.current),t.current=null;try{(l=i.gl.getExtension("WEBGL_lose_context"))==null||l.loseContext(),i.gl.canvas.remove()}catch{}S.current=null,f.current=null,A.current=null}})(),()=>{var i;e=!0,(i=a.current)==null||i.call(a),a.current=null}},[P,c,n,d,v,m,g,y,p,h,R,x,I]),o.useEffect(()=>{if(!f.current)return;const e=f.current;e.iSpeed.value=c,e.iRayColor1.value=w(n),e.iRayColor2.value=w(d),e.iIntensity.value=v,e.iSpread.value=m;const[s,b]=X(g);e.iFlipX.value=s,e.iFlipY.value=b,e.iTilt.value=y,e.iSaturation.value=p,e.iBlend.value=h,e.iFalloff.value=R,e.iOpacity.value=x},[c,n,d,v,m,g,y,p,h,R,x]),$.jsx("div",{ref:r,className:`side-rays-container ${Y}`.trim()})}export{Z as default};
