import React, { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const LazyGrainient = lazy(() => import("./Grainient"));
const LazySideRays = lazy(() => import("./SideRays"));
const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;
const absoluteAsset = (path) => new URL(asset(path), document.baseURI).href;

const projects = [
  {
    no: "01",
    title: "心里美酒店预订app",
    en: "XINLIMEI HOTEL BOOKING APP",
    category: "PRODUCT DESIGN · DESIGN LEAD",
    image: asset("projects/xinlimei/cover-card.jpg"),
    route: "#project/xinlimei",
    note: "从品牌重塑到核心预定、支付与入住流程，构建更清晰、更高效，也更有温度的酒店服务体验。",
    scope: ["USER RESEARCH", "UX / UI", "DESIGN SYSTEM", "DELIVERY"],
    detail: "面向酒店数智化场景，梳理多角色、高频任务与复杂数据关系。从核心路径、信息架构到视觉规范，建立可持续迭代的产品体验。",
  },
  {
    no: "02",
    title: "在线学习体验重塑",
    en: "CCTALK EXPERIENCE REDESIGN",
    category: "MOBILE · WEB · DESIGN SYSTEM",
    image: asset("projects/cctalk/cover-generated.jpg"),
    route: "#project/cctalk",
    note: "围绕 CCtalk 等学习产品，持续优化核心功能、内容层级与跨端体验。",
    scope: ["MOBILE", "WEB", "LIVE CLASS", "GROWTH"],
    detail: "围绕学习、直播、课程与社区等核心场景，优化跨端信息层级和操作效率，并通过组件化设计提升版本迭代与协作效率。",
  },
  {
    no: "03",
    title: "电商增长设计系统",
    en: "COMMERCE GROWTH SYSTEM",
    category: "VISUAL DESIGN · CONVERSION",
    image: asset("project-commerce.jpg"),
    note: "以业务目标和用户行为为起点，构建兼顾品牌一致性与转化效率的设计语言。",
    scope: ["VISUAL", "COMMERCE", "CONVERSION", "BRANDING"],
    detail: "结合用户行为与业务目标，统一活动、商品与营销触点的视觉表达，让设计在品牌辨识度、内容效率和转化目标之间取得平衡。",
  },
];

const strengths = [
  {
    index: "A",
    title: "全链路产品设计",
    en: "END-TO-END PRODUCT",
    text: "从需求分析、原型到视觉交互与上线验收，完整把控设计质量。",
    icon: "↗",
  },
  {
    index: "B",
    title: "交互与体验优化",
    en: "INTERACTION DESIGN",
    text: "拆解用户任务与操作路径，让复杂功能更直觉、更高效、更有反馈。",
    icon: "⌁",
  },
  {
    index: "C",
    title: "设计系统构建",
    en: "DESIGN SYSTEM",
    text: "建立可复用的组件、规范与协作语言，兼顾一致性和迭代效率。",
    icon: "⊞",
  },
  {
    index: "D",
    title: "视觉与品牌表达",
    en: "BRAND & VISUAL",
    text: "在复杂信息中建立清晰秩序，同时保留品牌辨识度与视觉记忆点。",
    icon: "✦",
  },
  {
    index: "E",
    title: "业务与增长意识",
    en: "PRODUCT THINKING",
    text: "关注用户行为、转化效率与落地成本，让设计真正服务商业目标。",
    icon: "◎",
  },
  {
    index: "F",
    title: "动态视觉表达",
    en: "MOTION DESIGN",
    text: "使用节奏、转场与反馈增强信息层级，为界面建立自然的呼吸感。",
    icon: "◌",
  },
];

const experiences = [
  {
    period: "2023.07 — 2025.05",
    role: "资深 UI 设计师 / 设计 Leader",
    company: "青岛尚美数智科技集团有限公司",
    groups: [
      {
        title: "核心职责",
        items: [
          "完成从用户需求分析、原型设计到视觉设计、交互优化的全流程工作，把控设计质量，确保设计方案落地效果达到预期。",
          "深入研究电商行业用户行为与设计趋势，结合公司业务目标，提出创新性的设计理念与方案，提升产品的用户吸引力和转化率。",
          "与产品、开发、运营等跨部门团队紧密协作，推动设计方案的实施，解决设计过程中出现的问题，确保项目顺利推进。",
        ],
      },
      {
        title: "主要负责项目",
        items: [
          "负责 B 端 / 店长端 PMS、CRS 的 UI 设计、功能梳理与产出。",
          "负责移动端超级系列、酒店后台综合平台的设计。",
          "负责心里美 App 的部分 C 端 UI 设计。",
          "负责酒店智能化大屏、自助机等终端的 UI 设计。",
        ],
      },
    ],
  },
  {
    period: "2021.08 — 2023.04",
    role: "资深 UI 设计师",
    company: "上海沪江教育",
    groups: [
      {
        title: "工作内容",
        items: [
          "负责移动端产品 CCtalk 的功能设计、更新迭代与产品视觉排版优化。",
          "负责 CCtalk 网师后台功能完善、三合一页面设计，并针对产品经理提出的需求进行线上落地。",
          "负责新产品绯凡的整体 UI 产出、视觉规范等。",
          "负责运营部门提出的节假日首页氛围设计及用户营销类小部件设计。",
        ],
      },
    ],
  },
  {
    period: "2019.07 — 2021.08",
    role: "运营设计师",
    company: "北京持柔科技有限公司",
    groups: [
      {
        title: "工作内容",
        items: [
          "负责校园代理业务的活动设计：海报、落地页、详情页，以及领袖家长团公众号的物料设计。",
          "负责电商渠道设计：京东、淘宝的宝贝头图、详情页与海报。",
          "负责 BD 渠道的海报、详情页、Banner 等。",
          "负责新媒体课包及 AB 测试相关设计。",
        ],
      },
    ],
  },
];

const xinlimeiFlowImages = [
  { src: asset("projects/xinlimei/home.jpg"), alt: "心里美酒店预订首页设计", label: "预订首页" },
  { src: asset("projects/xinlimei/hourly-home.jpg"), alt: "心里美钟点房首页设计", label: "钟点房首页" },
  { src: asset("projects/xinlimei/hotel-list.jpg"), alt: "心里美酒店列表页设计", label: "酒店列表" },
  { src: asset("projects/xinlimei/order.jpg"), alt: "心里美下单与权益页面设计", label: "下单与权益" },
  { src: asset("projects/xinlimei/coupon.jpg"), alt: "心里美优惠券页面设计", label: "优惠券" },
  { src: asset("projects/xinlimei/payment-success.jpg"), alt: "心里美支付成功与自助入住页面设计", label: "支付与入住" },
  { src: asset("projects/xinlimei/order-detail.jpg"), alt: "心里美订单详情页面设计", label: "订单详情" },
  { src: asset("projects/xinlimei/membership.jpg"), alt: "心里美联名会员页面设计", label: "联名会员" },
  { src: asset("projects/xinlimei/profile.jpg"), alt: "心里美个人中心页面设计", label: "个人中心" },
  { src: asset("projects/xinlimei/campaign.jpg"), alt: "心里美酒店活动专题页面设计", label: "活动专题" },
];

const xinlimeiLobbyImages = Array.from({ length: 5 }, (_, index) => ({
  src: asset(`projects/xinlimei/lobby-0${index + 1}.jpg`),
  alt: `尚美数智大堂长屏视觉设计 ${index + 1}`,
}));

const cctalkImages = Array.from({ length: 26 }, (_, index) => ({
  src: asset(`projects/cctalk/${index + 1}.jpg`),
  alt: `CCtalk 产品体验重塑项目展示 ${index + 1}`,
}));

const cctalkGroups = [
  {
    no: "01",
    label: "PROJECT FOUNDATION",
    title: "从产品定位出发，建立年轻、清晰且有记忆点的品牌体验。",
    images: cctalkImages.slice(0, 7),
  },
  {
    no: "02",
    label: "CORE EXPERIENCE",
    title: "重构移动端与桌面端的学习、直播和内容浏览体验。",
    images: cctalkImages.slice(7, 16),
  },
  {
    no: "03",
    label: "COURSE CONVERSION",
    title: "围绕课程售卖与决策路径，让信息更完整、转化更顺畅。",
    images: cctalkImages.slice(16, 21),
  },
  {
    no: "04",
    label: "GROWTH & RETENTION",
    title: "用积分、活动与荣誉体系连接活跃、留存和长期价值。",
    images: cctalkImages.slice(21),
  },
];

function canUseFinePointer() {
  return typeof window !== "undefined"
    && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function canUseEnhancedEffects() {
  return typeof window !== "undefined"
    && window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (min-width: 721px)").matches;
}

function useDeferredVisualEnabled(delay = 320) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!canUseEnhancedEffects()) return undefined;

    let timeoutId = 0;
    let idleId = 0;
    const activate = () => setEnabled(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(activate, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(activate, delay);
    }

    return () => {
      if (idleId) window.cancelIdleCallback?.(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [delay]);

  return enabled;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function getTiltProps() {
  return {
    onMouseMove: (event) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
      card.style.setProperty("--mouse-x", `${x * 100}%`);
      card.style.setProperty("--mouse-y", `${y * 100}%`);
    },
    onMouseLeave: (event) => {
      event.currentTarget.style.setProperty("--tilt-x", "0deg");
      event.currentTarget.style.setProperty("--tilt-y", "0deg");
    },
  };
}

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!canUseFinePointer() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame;
    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      dot.current?.style.setProperty("transform", `translate3d(${x}px,${y}px,0)`);
    };
    const render = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      ring.current?.style.setProperty("transform", `translate3d(${rx}px,${ry}px,0)`);
      frame = requestAnimationFrame(render);
    };
    const hover = (event) => {
      const active = event.target.closest("a, button, .glow-frame");
      ring.current?.classList.toggle("is-hovering", Boolean(active));
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", hover);
    render();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", hover);
    };
  }, []);

  return (
    <>
      <span className="cursor-dot" ref={dot} />
      <span className="cursor-ring" ref={ring} />
    </>
  );
}

function AmbientBloom() {
  return <span className="ambient-bloom" aria-hidden="true" />;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let current = false;

    const update = () => {
      frame = 0;
      const next = window.scrollY > 24;
      if (next !== current) {
        current = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav aria-label="主导航">
        <a href="#about">关于</a>
        <a href="#work">项目</a>
        <a href="#strengths">优势</a>
      </nav>
    </header>
  );
}

function SectionLabel({ no, children }) {
  return (
    <div className="section-label">
      <span>{no}</span>
      <p>{children}</p>
    </div>
  );
}

function Hero() {
  const showSideRays = useDeferredVisualEnabled(420);

  return (
    <section className="hero" id="top" style={{ "--hero-clouds-url": `url("${absoluteAsset("hero-clouds-v2.jpg")}")` }}>
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="hero-wash" />
      <div className="hero-grain" />
      <div className="hero-side-rays" aria-hidden="true">
        {showSideRays ? (
          <Suspense fallback={null}>
            <LazySideRays
              speed={1.15}
              rayColor1="#fff2e9"
              rayColor2="#ff5f32"
              intensity={1.3}
              spread={1.5}
              origin="top-right"
              tilt={-8}
              saturation={1.25}
              blend={0.7}
              falloff={1.8}
              opacity={0.62}
              maxFps={24}
            />
          </Suspense>
        ) : null}
      </div>
      <div className="beam-scene" aria-hidden="true">
        <div className="hero-beam">
          <i className="beam-aura" />
          <i className="beam-core" />
        </div>
      </div>
      <div className="hero-foreground" aria-hidden="true" />
      <div className="hero-content page-shell">
        <h1 aria-label="UX Designer Personal Site">
          <span>UX DESIGNER</span>
          <span>PERSONAL SITE</span>
        </h1>
        <div className="data-scene" aria-hidden="true">
          <div className="beam-stat stat-left">
            <strong>7+</strong>
            <span>YEARS EXPERIENCE</span>
          </div>
          <div className="beam-stat stat-right">
            <strong>100w</strong>
            <span>TEAM REVENUE</span>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>SCROLL TO EXPLORE</span>
        <i />
      </div>
    </section>
  );
}

function About() {
  const [openExperience, setOpenExperience] = useState(null);

  return (
    <section className="section about page-shell" id="about">
      <SectionLabel no="01">ABOUT / 关于我</SectionLabel>
      <div className="about-grid" data-reveal>
        <div className="portrait-wrap">
          <img src={asset("profile-portrait-v2.jpg")} alt="殷鹏个人肖像" loading="lazy" decoding="async" />
          <div className="portrait-overlay">
            <div className="profile-name-line">
              <h3>殷鹏</h3>
              <span className="verified-badge">
                <img src={asset("verified-badge.png")} alt="" aria-hidden="true" />
                花瓣认证UI设计师
              </span>
            </div>
            <p className="profile-role">UI/UX设计师｜6年工作经验｜专业科班</p>
            <div className="profile-info">
              <div className="profile-collection">
                <strong>20,000+</strong>
                <span>原创作品采集数</span>
              </div>
              <dl>
                <div><dt>学校</dt><dd>首都师范大学｜视觉传达与艺术</dd></div>
                <div><dt>电话/微信</dt><dd>17601241637 / Eric-destiny</dd></div>
                <div><dt>邮箱</dt><dd><a href="mailto:yp1366369926@gmail.com">yp1366369926@gmail.com</a></dd></div>
                <div><dt>社交媒体</dt><dd>Eric</dd></div>
              </dl>
            </div>
          </div>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            我是殷鹏，一名擅长把<span>复杂问题转化为清晰体验</span>的 UI / 视觉设计师。
          </p>
          <div className="about-columns">
            <p>
              拥有 6 年互联网产品设计经验的资深 UI / 视觉设计师，兼具产品经理思维与前沿 AIGC 流体化协作能力。主导过多个后台管理系统、移动端 App 及小程序、品牌视觉体系从 0 到 1 的建设。擅长将商业策略转化为高品质、高转化率的用户界面，能够深度参与产品全生命周期（需求定义、原型设计、交互体系、视觉还原）。深耕 UI 设计、系统化组件库（Design System），具备极强的自驱力与前沿技术敏锐度，熟练运用 AI 工具实现设计资产的高效产出与创意突破。
            </p>
          </div>
        </div>
      </div>
      <div className="metrics" data-reveal>
        <div><strong>07<sup>+</sup></strong><span>YEARS OF<br />EXPERIENCE</span></div>
        <div><strong>03</strong><span>INDUSTRIES<br />IN DEPTH</span></div>
        <div><strong>01<sup>M</sup></strong><span>TEAM REVENUE<br />APPROACHING</span></div>
        <div><strong>∞</strong><span>CURIOSITY<br />FOR DESIGN</span></div>
      </div>
      <div className="experience-list" data-reveal>
        {experiences.map((item, index) => (
          <div className={`experience-item ${openExperience === index ? "is-open" : ""}`} key={item.period}>
            <button
              className="experience-row"
              type="button"
              aria-expanded={openExperience === index}
              onClick={() => setOpenExperience(openExperience === index ? null : index)}
            >
              <span>{item.period}</span>
              <strong>{item.role}</strong>
              <p>{item.company}</p>
              <i>{openExperience === index ? "−" : "+"}</i>
            </button>
            <div className="experience-detail" aria-hidden={openExperience !== index}>
              <div className="experience-detail-inner">
                {item.groups.map((group) => (
                  <div className="experience-group" key={group.title}>
                    <h4>{group.title}</h4>
                    <ol>
                      {group.items.map((detail) => <li key={detail}>{detail}</li>)}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Work() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const close = (event) => event.key === "Escape" && setActiveProject(null);
    window.addEventListener("keydown", close);
    document.body.classList.toggle("modal-open", Boolean(activeProject));
    return () => {
      window.removeEventListener("keydown", close);
      document.body.classList.remove("modal-open");
    };
  }, [activeProject]);

  return (
    <section className="section work" id="work">
      <div className="page-shell">
        <SectionLabel no="02">SELECTED WORK / 精选项目</SectionLabel>
        <div className="section-heading" data-reveal>
          <h2>让作品自己<br />建立说服力。</h2>
          <p>SELECTED WORKS<br />2019 — 2025</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="glow-frame project-frame" key={project.no} data-reveal {...getTiltProps()}>
              {project.route ? (
              <a className="project-card project-card--native" href={project.route} aria-label={`查看${project.title}完整项目`}>
                <img src={project.image} alt="" loading="lazy" decoding="async" />
                <div className="project-shade" />
                <div className="project-top">
                  <span>{project.no}</span>
                  <p>{project.category}</p>
                </div>
                <div className="project-meta">
                  <div>
                    <p>{project.en}</p>
                    <h3>{project.title}</h3>
                    <span>{project.note}</span>
                  </div>
                  <i className="project-arrow" aria-hidden="true">
                    <ArrowIcon />
                  </i>
                </div>
              </a>
              ) : (
                <div className="project-card">
                  <img src={project.image} alt="" loading="lazy" decoding="async" />
                  <div className="project-shade" />
                  <div className="project-top">
                    <span>{project.no}</span>
                    <p>{project.category}</p>
                  </div>
                  <div className="project-meta">
                    <div>
                      <p>{project.en}</p>
                      <h3>{project.title}</h3>
                      <span>{project.note}</span>
                    </div>
                    <button aria-label={`查看${project.title}项目`} onClick={() => setActiveProject(project)}>
                      <ArrowIcon />
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
      {activeProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${activeProject.title}项目详情`}>
          <button className="modal-backdrop" aria-label="关闭项目详情" onClick={() => setActiveProject(null)} />
          <div className="modal-panel">
            <div className="modal-bar">
              <span>CASE STUDY / {activeProject.no}</span>
              <button onClick={() => setActiveProject(null)} aria-label="关闭">CLOSE ×</button>
            </div>
            <img src={activeProject.image} alt="" />
            <div className="modal-content">
              <p>{activeProject.en}</p>
              <h3>{activeProject.title}</h3>
              <div className="modal-grid">
                <span>{activeProject.detail}</span>
                <ul>
                  {activeProject.scope.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Strengths() {
  return (
    <section className="section strengths page-shell" id="strengths">
      <SectionLabel no="03">CAPABILITIES / 个人优势</SectionLabel>
      <div className="section-heading" data-reveal>
        <h2>有审美，也有<br />解决问题的能力。</h2>
        <p>DESIGN IS NOT A LAYER.<br />IT IS HOW THINGS WORK.</p>
      </div>
      <div className="strength-grid">
        {strengths.map((item) => (
          <article className="glow-frame strength-frame" key={item.index} data-reveal {...getTiltProps()}>
            <div className="strength-card">
              <div className="strength-top">
                <span>{item.index}</span>
                <i>{item.icon}</i>
              </div>
              <div>
                <p>{item.en}</p>
                <h3>{item.title}</h3>
                <span>{item.text}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="tool-line">
        <span>TOOLS</span>
        <p>FIGMA</p><i>·</i><p>PHOTOSHOP</p><i>·</i><p>SKETCH</p><i>·</i><p>DAVINCI RESOLVE</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="contact-noise" />
      <div className="page-shell contact-inner">
        <p className="eyebrow" data-reveal>AVAILABLE FOR SELECTED PROJECTS · 2026</p>
        <h2>LET'S CREATE<br /><span>SOMETHING</span><br />MEANINGFUL.</h2>
        <div className="contact-footer">
          <a className="contact-email" href="mailto:17600043819@163.com">
            <span>START A CONVERSATION</span>
            <strong>17600043819@163.com</strong>
            <ArrowIcon />
          </a>
          <div>
            <p>BASED IN CHINA</p>
            <p>UI / VISUAL / PRODUCT</p>
          </div>
        </div>
        <div className="contact-links">
          <a href="https://huaban.com/" target="_blank" rel="noreferrer">HUABAN ↗</a>
          <a href="tel:17601241637">PHONE</a>
          <a href={asset("yin-peng-resume.pdf")} download>DOWNLOAD RESUME ↓</a>
        </div>
        <div className="copyright">
          <span>© 2026 YIN PENG</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}

function CaseImage({ src, alt, className = "", loading = "lazy", onOpen }) {
  return (
    <button className={`case-image-button ${className}`} type="button" onClick={() => onOpen({ src, alt })}>
      <img src={src} alt={alt} loading={loading} decoding="async" />
      <span>VIEW +</span>
    </button>
  );
}

function XinlimeiCase() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(lightbox));
    const close = (event) => event.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
      document.body.classList.remove("modal-open");
    };
  }, [lightbox]);

  return (
    <>
      <header className="case-header">
        <a href="#work">← 返回项目</a>
        <span>CASE STUDY / 01</span>
        <p>YIN PENG · UX / UI DESIGN</p>
      </header>
      <main className="case-page">
        <section className="case-hero">
          <img src={asset("projects/xinlimei/cover-generated.jpg")} alt="" loading="eager" fetchPriority="high" decoding="async" />
          <div className="case-hero-shade" />
          <div className="case-hero-copy">
            <p>APP · MINI PROGRAM · 2025</p>
            <h1>心里美酒店预订app</h1>
            <span>从品牌重塑到核心预定、支付与入住流程，构建更清晰、更高效，也更有温度的酒店服务体验。</span>
            <div>
              <i>PRODUCT DESIGN</i>
              <i>UX / UI</i>
              <i>VISUAL SYSTEM</i>
              <i>DELIVERY</i>
            </div>
          </div>
        </section>

        <section className="case-section case-shell" data-reveal>
          <div className="case-section-head">
            <span>01 / PROJECT OVERVIEW</span>
            <h2>从品牌焕新，走向完整的预订体验。</h2>
          </div>
          <CaseImage
            src={asset("projects/xinlimei/overview.jpg")}
            alt="心里美酒店预订入住 App 体验升级项目概览"
            className="case-board"
            loading="eager"
            onOpen={setLightbox}
          />
        </section>

        <section className="case-section case-shell" data-reveal>
          <div className="case-section-head case-section-head--split">
            <span>02 / STRATEGY</span>
            <h2>重新梳理专业性、效率与品牌温度之间的关系。</h2>
          </div>
          <CaseImage
            src={asset("projects/xinlimei/strategy.jpg")}
            alt="心里美产品改版背景、问题与体验目标"
            className="case-board case-board--tall"
            onOpen={setLightbox}
          />
        </section>

        <section className="case-section case-shell" data-reveal>
          <div className="case-section-head">
            <span>03 / INTERFACE SYSTEM</span>
            <h2>让核心页面在统一规则下保持清晰和可识别。</h2>
          </div>
          <div className="case-board-stack">
            <CaseImage src={asset("projects/xinlimei/interface-a.jpg")} alt="心里美核心页面展示一" className="case-board" onOpen={setLightbox} />
            <CaseImage src={asset("projects/xinlimei/interface-b.jpg")} alt="心里美核心页面展示二" className="case-board" onOpen={setLightbox} />
          </div>
        </section>

        <section className="case-section case-shell" data-reveal>
          <div className="case-section-head case-section-head--split">
            <span>04 / EXPERIENCE FLOW</span>
            <h2>连接搜索、预订、支付、入住与会员权益。</h2>
          </div>
          <CaseImage
            src={asset("projects/xinlimei/case-overview.jpg")}
            alt="心里美项目全景与业务数据"
            className="case-board case-board--tall"
            onOpen={setLightbox}
          />
          <div className="case-flow-grid">
            {xinlimeiFlowImages.map((image) => (
              <article className="case-flow-item" key={image.src}>
                <CaseImage src={image.src} alt={image.alt} onOpen={setLightbox} />
                <p>{image.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section case-shell case-lobby" data-reveal>
          <div className="case-section-head">
            <span>05 / BRAND EXTENSION</span>
            <h2>把数字体验延伸到酒店空间与品牌触点。</h2>
          </div>
          <div className="lobby-grid">
            {xinlimeiLobbyImages.map((image) => (
              <CaseImage key={image.src} src={image.src} alt={image.alt} onOpen={setLightbox} />
            ))}
          </div>
        </section>

        <section className="case-ending">
          <p>END OF CASE / 01</p>
          <h2>让每一次预订，<br />都更简单，也更有人情味。</h2>
          <a href="#work">返回精选项目 <ArrowIcon /></a>
        </section>
      </main>

      {lightbox && (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label="作品大图预览">
          <button className="case-lightbox-backdrop" type="button" aria-label="关闭预览" onClick={() => setLightbox(null)} />
          <div>
            <button type="button" onClick={() => setLightbox(null)} aria-label="关闭">CLOSE ×</button>
            <img src={lightbox.src} alt={lightbox.alt} />
          </div>
        </div>
      )}
    </>
  );
}

function CctalkCase() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(lightbox));
    const close = (event) => event.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
      document.body.classList.remove("modal-open");
    };
  }, [lightbox]);

  return (
    <>
      <header className="case-header cctalk-case-header">
        <a href="#work">← 返回项目</a>
        <span>CASE STUDY / 02</span>
        <p>YIN PENG · PRODUCT / UX / UI</p>
      </header>
      <main className="case-page cctalk-page">
        <section className="case-hero cctalk-case-hero">
          <img
            src={asset("projects/cctalk/cover-generated.jpg")}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="case-hero-shade" />
          <div className="case-hero-copy">
            <p>ONLINE EDUCATION · MOBILE · DESKTOP</p>
            <h1>CCtalk<br />体验重塑</h1>
            <span>围绕学习、直播、课程与社区等核心场景，重构跨端信息层级、品牌语言和关键转化路径。</span>
            <div>
              <i>PRODUCT STRATEGY</i>
              <i>UX / UI</i>
              <i>VISUAL SYSTEM</i>
              <i>GROWTH DESIGN</i>
            </div>
          </div>
        </section>

        {cctalkGroups.map((group, groupIndex) => (
          <section className="case-section case-shell cctalk-section" data-reveal key={group.no}>
            <div className="case-section-head">
              <span>{group.no} / {group.label}</span>
              <h2>{group.title}</h2>
            </div>
            <div className="cctalk-gallery">
              {group.images.map((image, imageIndex) => (
                <CaseImage
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  loading={groupIndex === 0 && imageIndex === 0 ? "eager" : "lazy"}
                  onOpen={setLightbox}
                />
              ))}
            </div>
          </section>
        ))}

        <section className="case-ending cctalk-ending">
          <p>END OF CASE / 02</p>
          <h2>让学习更快乐，<br />也让体验更有价值。</h2>
          <a href="#work">返回精选项目 <ArrowIcon /></a>
        </section>
      </main>

      {lightbox && (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label="作品大图预览">
          <button className="case-lightbox-backdrop" type="button" aria-label="关闭预览" onClick={() => setLightbox(null)} />
          <div>
            <button type="button" onClick={() => setLightbox(null)} aria-label="关闭">CLOSE ×</button>
            <img src={lightbox.src} alt={lightbox.alt} />
          </div>
        </div>
      )}
    </>
  );
}

function GlobalBackground() {
  const showBackground = useDeferredVisualEnabled(260);

  return (
    <div className="site-grainient" aria-hidden="true">
      {showBackground ? (
        <Suspense fallback={null}>
          <LazyGrainient
            color1="#ff6b36"
            color2="#170704"
            color3="#030303"
            timeSpeed={0.12}
            colorBalance={0.08}
            warpStrength={1.65}
            warpFrequency={3.8}
            warpSpeed={0.75}
            warpAmplitude={68}
            blendAngle={18}
            blendSoftness={0.28}
            rotationAmount={240}
            noiseScale={1.45}
            grainAmount={0.055}
            grainScale={2.2}
            contrast={1.35}
            gamma={0.9}
            saturation={0.72}
            centerX={0.08}
            centerY={-0.06}
            zoom={0.82}
            maxFps={18}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onRouteChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onRouteChange);
    return () => window.removeEventListener("hashchange", onRouteChange);
  }, []);

  useLayoutEffect(() => {
    if (route === "#project/xinlimei" || route === "#project/cctalk") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const target = route && document.querySelector(route);
    target?.scrollIntoView({ block: "start", behavior: "auto" });
  }, [route]);

  useEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    elements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [route]);

  if (route === "#project/xinlimei") {
    return (
      <>
        <GlobalBackground />
        <AmbientBloom />
        <Cursor />
        <XinlimeiCase />
      </>
    );
  }

  if (route === "#project/cctalk") {
    return (
      <>
        <GlobalBackground />
        <AmbientBloom />
        <Cursor />
        <CctalkCase />
      </>
    );
  }

  return (
    <>
      <GlobalBackground />
      <AmbientBloom />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Strengths />
      </main>
      <Contact />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
