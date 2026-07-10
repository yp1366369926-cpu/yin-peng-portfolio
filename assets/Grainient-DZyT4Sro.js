import{r as p,j as J}from"./index-B2FGBcnX.js";import{R as K,T as Q,P as Y,M as ee}from"./Triangle-GlFcswsc.js";const g=r=>{const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return n?[parseInt(n[1],16)/255,parseInt(n[2],16)/255,parseInt(n[3],16)/255]:[1,1,1]},ae=`#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`,oe=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);
  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;
  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  float blendX=(tuv*Rot(radians(uBlendAngle))).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  vec3 layer1=mix(uColor3,uColor2,S(edge0,edge1,blendX));
  vec3 layer2=mix(uColor2,uColor1,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(0.5-b+s,-0.3-b-s,tuv.y));
  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;
  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  o=vec4(clamp(col,0.0,1.0),1.0);
}
void main(){vec4 o=vec4(0.0);mainImage(o,gl_FragCoord.xy);fragColor=o;}
`,h=new WeakMap;function ue({timeSpeed:r=.25,colorBalance:n=0,warpStrength:y=1,warpFrequency:x=5,warpSpeed:C=2,warpAmplitude:w=50,blendAngle:A=0,blendSoftness:S=.05,rotationAmount:F=500,noiseScale:b=2,grainAmount:R=.1,grainScale:W=2,grainAnimated:G=!1,contrast:T=1.5,gamma:B=1,saturation:M=1,centerX:q=0,centerY:O=0,zoom:I=.9,color1:E="#FF9FFC",color2:N="#5227FF",color3:j="#B497CF",className:_="",maxFps:P=24}){const l=p.useRef(null);return p.useEffect(()=>{const a=l.current;if(!a)return;const e=new K({webgl:2,alpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,1.25)}),u=e.gl,s=u.canvas;Object.assign(s.style,{width:"100%",height:"100%",display:"block"}),a.appendChild(s);const $=new Q(u),i=new Y(u,{vertex:ae,fragment:oe,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uTimeSpeed:{value:.25},uColorBalance:{value:0},uWarpStrength:{value:1},uWarpFrequency:{value:5},uWarpSpeed:{value:2},uWarpAmplitude:{value:50},uBlendAngle:{value:0},uBlendSoftness:{value:.05},uRotationAmount:{value:500},uNoiseScale:{value:2},uGrainAmount:{value:.1},uGrainScale:{value:2},uGrainAnimated:{value:0},uContrast:{value:1.5},uGamma:{value:1},uSaturation:{value:1},uCenterOffset:{value:new Float32Array([0,0])},uZoom:{value:.9},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])}}}),Z=new ee(u,{geometry:$,program:i});h.set(a,i);const z=()=>{const t=a.getBoundingClientRect();e.setSize(Math.max(1,Math.floor(t.width)),Math.max(1,Math.floor(t.height))),i.uniforms.iResolution.value.set([u.drawingBufferWidth,u.drawingBufferHeight]),e.render({scene:Z})},U=new ResizeObserver(z);U.observe(a),z();let o=0,V=0,c=!0,f=!document.hidden;const H=performance.now(),k=window.matchMedia("(prefers-reduced-motion: reduce)").matches,D=1e3/Math.max(P,1),v=t=>{if(t-V<D){o=requestAnimationFrame(v);return}V=t,i.uniforms.iTime.value=k?0:(t-H)*.001,e.render({scene:Z}),k?o=0:o=requestAnimationFrame(v)},m=()=>{c&&f&&o===0&&(o=requestAnimationFrame(v))},d=()=>{o&&cancelAnimationFrame(o),o=0},L=new IntersectionObserver(([t])=>{c=t.isIntersecting,c?m():d()});L.observe(a);const X=()=>{f=!document.hidden,f?m():d()};return document.addEventListener("visibilitychange",X),m(),()=>{d(),U.disconnect(),L.disconnect(),document.removeEventListener("visibilitychange",X),h.delete(a),s.remove()}},[]),p.useEffect(()=>{const a=h.get(l.current);if(!a)return;const e=a.uniforms;e.uTimeSpeed.value=r,e.uColorBalance.value=n,e.uWarpStrength.value=y,e.uWarpFrequency.value=x,e.uWarpSpeed.value=C,e.uWarpAmplitude.value=w,e.uBlendAngle.value=A,e.uBlendSoftness.value=S,e.uRotationAmount.value=F,e.uNoiseScale.value=b,e.uGrainAmount.value=R,e.uGrainScale.value=W,e.uGrainAnimated.value=G?1:0,e.uContrast.value=T,e.uGamma.value=B,e.uSaturation.value=M,e.uCenterOffset.value=new Float32Array([q,O]),e.uZoom.value=I,e.uColor1.value=new Float32Array(g(E)),e.uColor2.value=new Float32Array(g(N)),e.uColor3.value=new Float32Array(g(j))},[r,n,y,x,C,w,A,S,F,b,R,W,G,T,B,M,q,O,I,E,N,j,P]),J.jsx("div",{ref:l,className:`grainient-container ${_}`.trim()})}export{ue as default};
