import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   EMBEDDED STYLES  (replaces style.css)
───────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:ital,wght@0,400;0,600;1,400&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

  :root {
    --navy:   #0b3c5d;
    --navy2:  #082e4a;
    --green:  #9acd32;
    --gold:   #f9a825;
    --light:  #f4f4f4;
    --white:  #ffffff;
    --text:   #333333;
    --text2:  #444444;
  }

  * { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }
  body { font-family:'Open Sans',sans-serif; line-height:1.6; color:var(--text); }

  /* ── CONTAINER ── */
  .va-container { max-width:1200px; margin:auto; padding:60px 20px; }

  /* ── CONTACT SOCIAL BUTTONS ── */
  .va-contact-socials { display:flex; flex-direction:column; gap:12px; margin-top:8px; }
  .va-social-btn {
    display:flex; align-items:center; gap:14px;
    padding:14px 20px; border-radius:12px; text-decoration:none;
    font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700;
    transition:all 0.3s; border:2px solid transparent;
  }
  .va-social-btn-icon {
    width:38px; height:38px; border-radius:8px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
  }
  .va-social-btn-icon svg { width:24px; height:24px; }
  .va-social-btn-text { display:flex; flex-direction:column; line-height:1.3; }
  .va-social-btn-text span:first-child { font-size:11px; font-weight:500; opacity:0.7; }
  .va-social-btn-text span:last-child { font-size:14px; }

  .va-social-btn.wa {
    background:rgba(37,211,102,0.08); border-color:rgba(37,211,102,0.25); color:#1a8a44;
  }
  .va-social-btn.wa:hover {
    background:#25d366; color:white; border-color:#25d366;
    transform:translateX(6px); box-shadow:0 8px 25px rgba(37,211,102,0.4);
  }
  .va-social-btn.wa:hover .va-social-btn-text span:first-child { opacity:0.85; }
  .va-social-btn.ig {
    background:rgba(225,48,108,0.07); border-color:rgba(225,48,108,0.2); color:#b5006e;
  }
  .va-social-btn.ig:hover {
    background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);
    color:white; border-color:transparent;
    transform:translateX(6px); box-shadow:0 8px 25px rgba(225,48,108,0.4);
  }
  .va-social-btn.ig:hover .va-social-btn-text span:first-child { opacity:0.85; }

  /* ── HEADER ── */
  .va-header {
    position: fixed; top:0; left:0; right:0; z-index:1000;
    background: var(--navy);
    box-shadow: 0 4px 24px rgba(0,0,0,0.35);
    transition: all 0.3s;
  }
  .va-header-inner {
    max-width:1400px; margin:auto; padding:0 32px;
    display:flex; justify-content:space-between; align-items:center;
    height: 80px;
  }

  /* LOGO AREA */
  .va-logo-wrap { display:flex; align-items:center; gap:14px; cursor:pointer; flex-shrink:0; }
  .va-logo-img {
    width:52px; height:52px; border-radius:10px; object-fit:cover;
    border:2px solid rgba(154,205,50,0.5);
    box-shadow:0 4px 14px rgba(0,0,0,0.3);
    transition:transform 0.3s;
  }
  .va-logo-img:hover { transform:scale(1.07); }
  .va-logo-placeholder {
    width:52px; height:52px; border-radius:10px;
    background:linear-gradient(135deg,var(--green),#6fa800);
    border:2px solid rgba(154,205,50,0.5);
    display:flex; align-items:center; justify-content:center;
    font-size:22px; font-weight:800; color:white;
    font-family:'Montserrat',sans-serif;
    box-shadow:0 4px 14px rgba(0,0,0,0.3);
    flex-shrink:0;
  }
  .va-logo-text { display:flex; flex-direction:column; }
  .va-logo { color:white; font-family:'Montserrat',sans-serif; font-size:20px; font-weight:800; letter-spacing:0.5px; line-height:1.2; }
  .va-logo span { color:var(--green); }
  .va-logo-sub { color:rgba(255,255,255,0.45); font-size:11px; letter-spacing:1.5px; font-family:'Montserrat',sans-serif; text-transform:uppercase; margin-top:2px; }

  .va-nav { display:flex; gap:4px; align-items:center; }
  .va-nav a {
    color:rgba(255,255,255,0.82); padding:9px 16px; border-radius:5px;
    text-decoration:none; font-size:13.5px; font-weight:600; letter-spacing:0.4px;
    transition:all 0.25s; font-family:'Montserrat',sans-serif; cursor:pointer;
  }
  .va-nav a:hover { color:white; background:rgba(255,255,255,0.1); }
  .va-nav-cta {
    background:linear-gradient(135deg,var(--green),#6fa800);
    color:white !important; padding:9px 20px !important; border-radius:5px;
    font-weight:700 !important; margin-left:6px;
    box-shadow:0 4px 14px rgba(154,205,50,0.35);
  }
  .va-nav-cta:hover { box-shadow:0 6px 20px rgba(154,205,50,0.55) !important; background:linear-gradient(135deg,#acd93a,#5a9000) !important; }
  .va-hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; }
  .va-hamburger span { width:26px; height:2px; background:white; display:block; transition:all 0.3s; }

  /* ── WHATSAPP FLOATING BUTTON ── */
  .va-whatsapp-float {
    position:fixed; bottom:30px; right:30px; z-index:9999;
    display:flex; align-items:center; gap:10px;
    background:#25d366; color:white;
    padding:14px 22px; border-radius:50px;
    box-shadow:0 6px 28px rgba(37,211,102,0.55);
    text-decoration:none; font-family:'Montserrat',sans-serif;
    font-weight:700; font-size:14px;
    transition:all 0.35s;
    animation: waPulse 2.5s ease-in-out infinite;
  }
  .va-whatsapp-float:hover {
    background:#1ebe5c; transform:translateY(-4px) scale(1.04);
    box-shadow:0 12px 40px rgba(37,211,102,0.7);
    animation:none;
  }
  .va-whatsapp-float i { font-size:22px; }
  .va-wa-text { display:flex; flex-direction:column; line-height:1.2; }
  .va-wa-text span:first-child { font-size:11px; opacity:0.85; font-weight:500; }
  .va-wa-text span:last-child { font-size:14px; }

  @keyframes waPulse {
    0%,100% { box-shadow:0 6px 28px rgba(37,211,102,0.55); }
    50% { box-shadow:0 6px 40px rgba(37,211,102,0.85), 0 0 0 8px rgba(37,211,102,0.12); }
  }

  /* ── HERO SLIDER ── */
  .va-hero {
    position:relative; height:100vh; overflow:hidden;
    display:flex; align-items:center; justify-content:center;
    margin-top:80px;
  }
  .va-slide {
    position:absolute; inset:0;
    background-size:cover; background-position:center;
    opacity:0; transform:scale(1.06);
    transition:opacity 1.5s ease-in-out, transform 2.5s ease-in-out;
  }
  .va-slide.active { opacity:1; transform:scale(1); z-index:1; }
  .va-hero-overlay {
    position:absolute; inset:0; z-index:2;
    background:linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(11,60,93,0.75) 100%);
  }
  .va-hero-content {
    position:relative; z-index:3; text-align:center; color:white; padding:0 20px;
    animation: fadeUp 1s ease both;
  }
  .va-hero-badge {
    display:inline-block; background:rgba(154,205,50,0.2); border:1px solid var(--green);
    color:var(--green); padding:6px 18px; border-radius:30px;
    font-size:12px; letter-spacing:3px; text-transform:uppercase;
    margin-bottom:20px; font-family:'Montserrat',sans-serif;
  }
  .va-hero-content h2 {
    font-family:'Montserrat',sans-serif; font-size:clamp(32px,5vw,62px);
    font-weight:800; line-height:1.15; margin-bottom:16px;
    text-shadow: 0 2px 20px rgba(0,0,0,0.4);
  }
  .va-hero-content h2 em { color:var(--green); font-style:normal; }
  .va-hero-content p { font-size:18px; opacity:0.9; margin-bottom:32px; letter-spacing:1px; }
  .va-btn {
    background:linear-gradient(135deg,var(--gold),#e08c00);
    color:#000; padding:14px 32px; text-decoration:none;
    font-weight:700; border-radius:5px; font-size:15px;
    font-family:'Montserrat',sans-serif; letter-spacing:0.5px;
    display:inline-block; transition:all 0.3s;
    box-shadow: 0 6px 25px rgba(249,168,37,0.45);
  }
  .va-btn:hover { transform:translateY(-3px); box-shadow:0 10px 35px rgba(249,168,37,0.6); }
  .va-slider-btn {
    position:absolute; top:50%; transform:translateY(-50%);
    background:rgba(0,0,0,0.55); color:white; border:none;
    font-size:20px; padding:14px 18px; cursor:pointer; z-index:4;
    border-radius:4px; transition:all 0.3s;
  }
  .va-slider-btn:hover { background:var(--navy); }
  .va-slider-prev { left:18px; }
  .va-slider-next { right:18px; }
  .va-slider-dots { position:absolute; bottom:24px; z-index:4; display:flex; gap:8px; }
  .va-dot { width:10px; height:10px; border-radius:50%; background:rgba(255,255,255,0.4); cursor:pointer; transition:all 0.3s; }
  .va-dot.active { background:var(--green); width:28px; border-radius:5px; }

  /* ── SECTION BASE ── */
  .va-section { padding:80px 0; }
  .va-section-light { background:var(--light); }
  .va-section-white { background:var(--white); }
  .va-section-title {
    text-align:center; font-family:'Montserrat',sans-serif;
    font-size:clamp(24px,3.5vw,36px); font-weight:800; color:var(--navy);
    margin-bottom:12px;
  }
  .va-section-line {
    width:60px; height:4px; background:linear-gradient(90deg,var(--navy),var(--green));
    border-radius:2px; margin:0 auto 50px;
  }

  /* ── ABOUT + PROCESS ── */
  .va-about-grid {
    display:grid; grid-template-columns:1fr 1fr; gap:50px; align-items:center;
  }
  .va-left-col { display:flex; flex-direction:column; gap:28px; }
  .va-info-box {
    background:white; padding:32px; border-radius:12px;
    box-shadow:0 8px 30px rgba(0,0,0,0.08); border-left:5px solid var(--navy);
    transition:all 0.3s;
  }
  .va-info-box:hover { transform:translateY(-4px); box-shadow:0 14px 40px rgba(11,60,93,0.15); border-left-color:var(--green); }
  .va-info-box h3 { color:var(--navy); margin-bottom:12px; font-family:'Montserrat',sans-serif; font-size:17px; }
  .va-info-box p { color:var(--text2); line-height:1.8; }

  /* ── PROCESS CIRCLE ── */
  .va-process-wrapper {
    position:relative; width:480px; height:480px; margin:auto;
  }
  .va-process-ring {
    position:absolute; width:100%; height:100%;
    border:3px dashed rgba(11,60,93,0.3); border-radius:50%;
    animation: spinRing 30s linear infinite;
  }
  .va-process-center {
    position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    width:140px; height:140px; background:var(--navy);
    color:white; border-radius:50%;
    display:flex; flex-direction:column; justify-content:center; align-items:center;
    box-shadow:0 10px 35px rgba(11,60,93,0.4); text-align:center; z-index:2;
  }
  .va-process-center h3 { font-size:28px; font-family:'Montserrat',sans-serif; }
  .va-process-center p { font-size:13px; opacity:0.85; }
  .va-step {
    position:absolute; width:120px; height:120px;
    background:white; border-radius:50%; border:4px solid var(--navy);
    display:flex; flex-direction:column; justify-content:center; align-items:center;
    text-align:center; padding:12px;
    box-shadow:0 6px 20px rgba(0,0,0,0.12); transition:all 0.3s; z-index:3; cursor:default;
  }
  .va-step strong { font-size:20px; color:var(--navy); font-family:'Montserrat',sans-serif; }
  .va-step span { font-size:11px; margin-top:4px; line-height:1.3; color:var(--text); }
  .va-step:hover { background:var(--navy); transform:scale(1.12); box-shadow:0 10px 30px rgba(11,60,93,0.3); }
  .va-step:hover strong, .va-step:hover span { color:white; }
  /* Positions */
  .va-s1 { top:0; left:50%; transform:translate(-50%,-50%); }
  .va-s2 { top:18%; right:0; transform:translate(50%,-50%); }
  .va-s3 { bottom:18%; right:0; transform:translate(50%,50%); }
  .va-s4 { bottom:0; left:50%; transform:translate(-50%,50%); }
  .va-s5 { bottom:18%; left:0; transform:translate(-50%,50%); }
  .va-s6 { top:18%; left:0; transform:translate(-50%,-50%); }
  /* override hover transforms */
  .va-s1:hover,.va-s2:hover,.va-s3:hover,.va-s4:hover,.va-s5:hover,.va-s6:hover { transform:scale(1.12) !important; }
  .va-s1 { top:0; left:50%; margin-left:-60px; margin-top:-60px; transform:none; top:calc(0% - 60px); left:calc(50% - 60px); }
  /* re-do cleanly with top/left/margin */
  /* step circle positions: radius = 240px from center (480/2) */



  /* ── SERVICES ── */
  .va-service-tabs { display:flex; justify-content:center; flex-wrap:wrap; gap:14px; margin-bottom:40px; }
  .va-tab-btn {
    display:flex; align-items:center; gap:10px; padding:12px 22px;
    border:2px solid var(--navy); border-radius:30px; cursor:pointer;
    font-weight:700; color:var(--navy); background:white;
    font-family:'Montserrat',sans-serif; font-size:13px;
    transition:all 0.3s;
  }
  .va-tab-btn:hover { background:var(--navy); color:white; transform:translateY(-3px); box-shadow:0 8px 20px rgba(11,60,93,0.25); }
  .va-tab-btn.active { background:var(--navy); color:white; }
  .va-tab-btn i { font-size:16px; }
  .va-service-box {
    display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center;
    animation:fadeUp 0.5s ease;
  }
  .va-service-box img { width:100%; border-radius:14px; box-shadow:0 8px 30px rgba(0,0,0,0.12); }
  .va-service-box h3 { font-family:'Montserrat',sans-serif; color:var(--navy); margin-bottom:12px; font-size:22px; }
  .va-service-box p { color:var(--text2); line-height:1.8; }

  /* ── TEAM ── */
  .va-team-section {
    position:relative;
    background:url("https://plus.unsplash.com/premium_photo-1683120730432-b5ea74bd9047?auto=format&fit=crop&w=1400") center/cover no-repeat;
  }
  .va-team-overlay { position:absolute; inset:0; background:rgba(11,60,93,0.93); }
  .va-team-grid { position:relative; z-index:2; display:grid; grid-template-columns:1fr 1fr; gap:50px; align-items:center; }
  .va-team-text h3 { font-family:'Montserrat',sans-serif; font-size:26px; color:white; margin-bottom:16px; }
  .va-team-text p { color:rgba(255,255,255,0.82); line-height:1.8; margin-bottom:12px; }
  .va-accordion { display:flex; flex-direction:column; gap:14px; }
  .va-accordion-item {
    background:rgba(255,255,255,0.07); border-left:4px solid var(--green);
    border-radius:8px; overflow:hidden;
    transition:background 0.3s;
  }
  .va-accordion-item:hover { background:rgba(154,205,50,0.1); }
  .va-accordion-header {
    padding:16px 20px; display:flex; justify-content:space-between; cursor:pointer;
    font-weight:700; color:white; font-family:'Montserrat',sans-serif; font-size:15px;
  }
  .va-accordion-icon { font-size:20px; color:var(--green); transition:transform 0.3s; }
  .va-accordion-item.open .va-accordion-icon { transform:rotate(45deg); }
  .va-accordion-body {
    max-height:0; overflow:hidden;
    transition:max-height 0.4s ease, padding 0.3s ease;
    color:rgba(255,255,255,0.75); padding:0 20px; font-size:14px; line-height:1.7;
  }
  .va-accordion-item.open .va-accordion-body { max-height:200px; padding:14px 20px; }

  /* ── WORK SLIDER ── */
  .va-work-section { background:var(--light); }
  .va-work-slider { overflow:hidden; margin-top:30px; position:relative; }
  .va-work-track {
    display:flex; gap:20px; width:max-content;
    animation:scrollWork 28s linear infinite;
  }
  .va-work-track:hover { animation-play-state:paused; }
  .va-work-card {
    min-width:230px; height:165px; border-radius:12px; overflow:hidden;
    box-shadow:0 6px 20px rgba(0,0,0,0.12); background:white; flex-shrink:0;
  }
  .va-work-card img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s; }
  .va-work-card:hover img { transform:scale(1.1); }

  /* ── CONTACT ── */
  .va-contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:50px; }
  .va-contact-info { }
  .va-contact-info h3 { font-family:'Montserrat',sans-serif; color:var(--navy); font-size:20px; margin-bottom:20px; }
  .va-contact-item {
    display:flex; gap:14px; margin-bottom:18px; padding:18px;
    background:white; border-radius:10px; border-left:4px solid var(--navy);
    box-shadow:0 4px 15px rgba(0,0,0,0.06); transition:all 0.3s;
  }
  .va-contact-item:hover { border-left-color:var(--green); transform:translateX(4px); }
  .va-contact-icon { font-size:20px; color:var(--navy); flex-shrink:0; margin-top:2px; }
  .va-contact-item strong { display:block; color:var(--navy); font-size:13px; margin-bottom:3px; }
  .va-contact-item p { color:var(--text2); font-size:14px; }
  .va-form { background:white; padding:36px; border-radius:14px; box-shadow:0 8px 35px rgba(0,0,0,0.1); }
  .va-form h3 { font-family:'Montserrat',sans-serif; color:var(--navy); margin-bottom:22px; }
  .va-form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .va-form input, .va-form textarea, .va-form select {
    width:100%; padding:13px 16px; margin-bottom:16px;
    border:1.5px solid #ddd; border-radius:8px;
    font-family:'Open Sans',sans-serif; font-size:14px; color:var(--text);
    transition:border 0.3s; outline:none;
  }
  .va-form input:focus, .va-form textarea:focus { border-color:var(--navy); box-shadow:0 0 0 3px rgba(11,60,93,0.1); }
  .va-form textarea { resize:vertical; min-height:110px; }
  .va-form-btn {
    width:100%; padding:14px; background:linear-gradient(135deg,var(--navy),var(--navy2));
    color:white; border:none; border-radius:8px; font-size:15px; font-weight:700;
    font-family:'Montserrat',sans-serif; letter-spacing:0.5px; cursor:pointer;
    transition:all 0.3s; box-shadow:0 5px 20px rgba(11,60,93,0.3);
  }
  .va-form-btn:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(11,60,93,0.45); }
  .va-form-success {
    text-align:center; padding:40px 20px;
    color:var(--navy); font-family:'Montserrat',sans-serif;
  }
  .va-form-success .checkmark { font-size:56px; margin-bottom:12px; }

  /* ── FOOTER ── */
  .va-footer { background:var(--navy2); color:rgba(255,255,255,0.75); padding:24px 20px; text-align:center; font-size:14px; }
  .va-footer span { color:var(--green); }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scrollWork { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  /* ── MOBILE NAV ── */
  .va-mobile-nav {
    position:fixed; inset:0; z-index:999; background:rgba(8,46,74,0.98);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:30px;
    padding-top:40px;
  }
  .va-mobile-nav a { color:white; font-size:24px; font-family:'Montserrat',sans-serif; font-weight:700; text-decoration:none; letter-spacing:2px; cursor:pointer; }
  .va-mobile-socials { display:flex; gap:16px; margin-top:10px; }
  .va-mobile-social { display:flex; align-items:center; gap:8px; color:white; text-decoration:none; font-size:14px; font-family:'Montserrat',sans-serif; padding:10px 18px; border-radius:30px; border:1px solid rgba(255,255,255,0.2); }

  /* ── RESPONSIVE ── */
  @media(max-width:900px){
    .va-about-grid,.va-team-grid,.va-contact-grid { grid-template-columns:1fr; }
    .va-service-box { grid-template-columns:1fr; text-align:center; }
    .va-process-wrapper { width:340px; height:340px; }
    .va-step { width:88px; height:88px; }
    .va-step strong { font-size:16px; }
    .va-step span { font-size:10px; }
    .va-process-center { width:110px; height:110px; }
    .va-process-center h3 { font-size:20px; }
    .va-form-row { grid-template-columns:1fr; }
  }
  @media(max-width:768px){
    .va-nav { display:none; }
    .va-hamburger { display:flex; }
    .va-work-card { min-width:170px; height:125px; }
    .va-whatsapp-float { padding:12px 16px; }
    .va-wa-text { display:none; }
    .va-whatsapp-float i { font-size:26px; }
    .va-contact-socials { flex-direction:column; }
  }
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const SLIDES = [
  "https://cdn.pixabay.com/photo/2017/01/21/19/30/current-1998106_1280.jpg",
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400",
  "https://i0.wp.com/www.orbenergy.com/wp-content/uploads/2023/11/Hero.webp",
  "https://cdn.pixabay.com/photo/2017/07/06/03/00/electrical-2476782_1280.jpg",
];

const SERVICES = [
  {
    id: "s1", icon: "fa-solid fa-solar-panel", label: "Rooftop Solar",
    title: "Rooftop Solar System",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800",
    desc: "Complete rooftop solar installation solutions for residential, commercial, and industrial buildings ensuring high efficiency, safety, and long-term performance.",
  },
  {
    id: "s2", icon: "fa-solid fa-sun", label: "Solar Power",
    title: "Solar Power System",
    img: "https://i0.wp.com/www.orbenergy.com/wp-content/uploads/2023/11/Hero.webp",
    desc: "End-to-end solar power systems including design, installation, commissioning, and maintenance for maximum energy output.",
  },
  {
    id: "s3", icon: "fa-solid fa-bolt", label: "Electrification",
    title: "Electrification Service",
    img: "https://images.unsplash.com/photo-1581091012184-5c7c69b4b4b1?auto=format&fit=crop&w=800",
    desc: "Industrial and residential electrification services following strict safety standards and quality workmanship.",
  },
  {
    id: "s4", icon: "fa-solid fa-industry", label: "Transformer",
    title: "Electrical Transformer",
    img: "https://images.unsplash.com/photo-1624397640148-949b1732bbf3?auto=format&fit=crop&w=800",
    desc: "Installation, testing, and maintenance of electrical transformers for safe and reliable power distribution.",
  },
  {
    id: "s5", icon: "fa-solid fa-building", label: "Steel & GI",
    title: "Steel & GI Structure",
    img: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800",
    desc: "Fabrication and installation of durable steel and GI structures for solar and electrical infrastructure projects.",
  },
];

const PROCESS_STEPS = [
  "Site Inspection & Requirement Analysis",
  "Design & Planning",
  "Proposal & Approval",
  "Procurement & Preparation",
  "Installation & Execution",
  "Testing, Handover & Support",
];

const ACCORDION_ITEMS = [
  { title: "Creative Engineering", body: "Innovative engineering solutions for complex electrical and solar systems tailored to each project's unique requirements." },
  { title: "Lateral Thinking", body: "Multi-dimensional problem-solving for optimized results, combining field experience with modern methodologies." },
  { title: "In-Depth Knowledge", body: "Deep expertise in electrification, transformers, and solar power systems accumulated over years of hands-on projects." },
  { title: "Structured Execution", body: "Disciplined workflows ensuring safety compliance, quality materials, and timely delivery on every project." },
];

// Placeholder work images — replace src with your actual images
const WORK_IMAGES = Array.from({ length: 10 }, (_, i) => ({
  src: `https://picsum.photos/seed/va${i + 1}/400/300`,
  alt: `Project ${i + 1}`,
}));

/* ─────────────────────────────────────────
   ✏️  EDIT THESE LINKS
   Replace # with your actual URLs
───────────────────────────────────────── */
const SOCIAL_LINKS = {
  whatsappChat:      "https://wa.me/919630190422",                   // Direct WhatsApp chat
  whatsappCommunity: "https://chat.whatsapp.com/YOUR_COMMUNITY_LINK", // WhatsApp Community link
  instagram:         "https://instagram.com/YOUR_INSTAGRAM_HANDLE",   // Instagram page link
};

// ✏️ Set to true once you add your logo image to /public/logo.png
const LOGO_IMAGE = "/logo.png"; // e.g. "/logo.png"

/* Process step positions (6 evenly around a circle, r=50%) */
const stepPos = [
  { top: "0%",   left: "50%",  mt: "-60px", ml: "-60px" },
  { top: "25%",  left: "100%", mt: "-60px", ml: "-60px" },
  { top: "75%",  left: "100%", mt: "-60px", ml: "-60px" },
  { top: "100%", left: "50%",  mt: "-60px", ml: "-60px" },
  { top: "75%",  left: "0%",   mt: "-60px", ml: "-60px" },
  { top: "25%",  left: "0%",   mt: "-60px", ml: "-60px" },
];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function App() {
  const [slide, setSlide]         = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [openAcc, setOpenAcc]     = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData]   = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef(null);

  // Auto-slide
  useEffect(() => {
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  const prevSlide = () => { clearInterval(timerRef.current); setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length); };
  const nextSlide = () => { clearInterval(timerRef.current); setSlide(s => (s + 1) % SLIDES.length); };

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  const toggleAcc = (i) => setOpenAcc(openAcc === i ? null : i);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <style>{styles}</style>

      {/* ── HEADER ── */}
      <header className="va-header">
        <div className="va-header-inner">

          {/* LOGO */}
          <div className="va-logo-wrap" onClick={() => scrollTo("home")}>
            {LOGO_IMAGE
              ? <img src={LOGO_IMAGE} alt="Vandana Associates Logo" className="va-logo-img" />
              : <div className="va-logo-placeholder">V</div>
            }
            <div className="va-logo-text">
              <div className="va-logo">Vandana <span>Associates</span></div>
              <div className="va-logo-sub">Electrical &amp; Solar Solutions</div>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="va-nav">
            {["home","about","services","team","gallery","contact"].map(s => (
              <a key={s} onClick={() => scrollTo(s)}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </a>
            ))}
            <a className="va-nav-cta" onClick={() => scrollTo("contact")}>Get Quote</a>
          </nav>

          <div className="va-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <span /><span /><span />
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="va-mobile-nav" onClick={() => setMobileOpen(false)}>
          {["home","about","services","team","gallery","contact"].map(s => (
            <a key={s} onClick={() => scrollTo(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</a>
          ))}
        </div>
      )}

      {/* ── HERO SLIDER ── */}
      <section id="home" className="va-hero">
        {SLIDES.map((src, i) => (
          <div key={i} className={`va-slide${i === slide ? " active" : ""}`}
            style={{ backgroundImage: `url('${src}')` }} />
        ))}
        <div className="va-hero-overlay" />
        <div className="va-hero-content">
          <div className="va-hero-badge">Trusted Since Gwalior</div>
          <h2>Electrical &amp; <em>Solar Power</em><br/>Solutions</h2>
          <p>Reliable &bull; Professional &bull; Trusted Services</p>
          <a className="va-btn" onClick={() => scrollTo("contact")} style={{cursor:"pointer"}}>Get in Touch</a>
        </div>
        <button className="va-slider-btn va-slider-prev" onClick={prevSlide}>❮</button>
        <button className="va-slider-btn va-slider-next" onClick={nextSlide}>❯</button>
        <div className="va-slider-dots">
          {SLIDES.map((_, i) => (
            <div key={i} className={`va-dot${i === slide ? " active" : ""}`} onClick={() => { clearInterval(timerRef.current); setSlide(i); }} />
          ))}
        </div>
      </section>

      {/* ── ABOUT + PROCESS ── */}
      <section id="about" className="va-section va-section-light">
        <div className="va-container">
          <h2 className="va-section-title">About Us</h2>
          <div className="va-section-line" />
          <div className="va-about-grid">

            {/* LEFT */}
            <div className="va-left-col">
              <div className="va-info-box">
                <p>Vandana Associates is a trusted name in electrical and solar power solutions. We specialize in industrial, commercial, and residential electrical projects.</p>
                <br/>
                <p>With years of field experience, our team delivers structured execution, safety compliance, and high-efficiency systems designed for long-term performance.</p>
              </div>
              <div className="va-info-box">
                <h3>Why Choose Us?</h3>
                <p>
                  ✔ Experienced technical team<br/>
                  ✔ Safety-focused execution<br/>
                  ✔ Quality materials &amp; equipment<br/>
                  ✔ Timely project delivery<br/>
                  ✔ Long-term support &amp; maintenance
                </p>
              </div>
            </div>

            {/* RIGHT — Process Circle */}
            <div style={{ textAlign: "center" }}>
              <div className="va-process-wrapper">
                <div className="va-process-ring" />
                <div className="va-process-center">
                  <h3>6 Step</h3>
                  <p>Project Cycle</p>
                </div>
                {PROCESS_STEPS.map((label, i) => {
                  // Evenly space 6 steps around a 480px circle
                  const angle = (i / 6) * 2 * Math.PI - Math.PI / 2;
                  const r = 46; // % radius from center
                  const cx = 50 + r * Math.cos(angle);
                  const cy = 50 + r * Math.sin(angle);
                  return (
                    <div key={i} className="va-step" style={{
                      position:"absolute",
                      left: `${cx}%`, top: `${cy}%`,
                      transform: "translate(-50%,-50%)",
                    }}>
                      <strong>{i + 1}</strong>
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="va-section va-section-light">
        <div className="va-container">
          <h2 className="va-section-title">Our Services</h2>
          <div className="va-section-line" />
          <div className="va-service-tabs">
            {SERVICES.map((svc, i) => (
              <button key={i} className={`va-tab-btn${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>
                <i className={svc.icon}></i> {svc.label}
              </button>
            ))}
          </div>
          <div className="va-service-box">
            <img src={SERVICES[activeTab].img} alt={SERVICES[activeTab].title} />
            <div>
              <h3>{SERVICES[activeTab].title}</h3>
              <p>{SERVICES[activeTab].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="va-section va-team-section">
        <div className="va-team-overlay" />
        <div className="va-container">
          <h2 className="va-section-title" style={{color:"white"}}>Our Team</h2>
          <div className="va-section-line" />
          <div className="va-team-grid">
            <div className="va-team-text">
              <h3>Professional &amp; Skilled Team</h3>
              <p>Our success is driven by a highly skilled team of electrical engineers, technicians, and solar professionals. With strong technical expertise and hands-on field experience, we ensure safe execution, efficient planning, and reliable project delivery.</p>
              <p>We follow structured workflows, industry standards, and safety-first practices to deliver long-lasting and future-ready solutions.</p>
            </div>
            <div className="va-accordion">
              {ACCORDION_ITEMS.map((item, i) => (
                <div key={i} className={`va-accordion-item${openAcc === i ? " open" : ""}`}>
                  <div className="va-accordion-header" onClick={() => toggleAcc(i)}>
                    <span>{item.title}</span>
                    <span className="va-accordion-icon">{openAcc === i ? "×" : "+"}</span>
                  </div>
                  <div className="va-accordion-body">{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY / WORK SLIDER ── */}
      <section id="gallery" className="va-section va-work-section">
        <div className="va-container">
          <h2 className="va-section-title">Our Work &amp; Team</h2>
          <div className="va-section-line" />
          <div className="va-work-slider">
            <div className="va-work-track">
              {/* Original set */}
              {WORK_IMAGES.map((img, i) => (
                <div key={`a${i}`} className="va-work-card">
                  <img src={img.src} alt={img.alt}
                    onError={e => { e.target.src=`https://picsum.photos/seed/err${i}/400/300`; }} />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {WORK_IMAGES.map((img, i) => (
                <div key={`b${i}`} className="va-work-card">
                  <img src={img.src} alt={img.alt}
                    onError={e => { e.target.src=`https://picsum.photos/seed/err${i}/400/300`; }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="va-section va-section-light">
        <div className="va-container">
          <h2 className="va-section-title">Contact Us</h2>
          <div className="va-section-line" />
          <div className="va-contact-grid">

            {/* INFO */}
            <div className="va-contact-info">
              <h3>Get In Touch</h3>
              {[
                { icon:"📍", label:"Address", text:"House No. 11, New Krishna Vihar Colony,\nGovindpuri, Gwalior, M.P." },
                { icon:"📞", label:"Phone",   text:"+91 9630190422" },
                { icon:"✉️", label:"Email",   text:"vandanaassociates@email.com" },
                { icon:"🕐", label:"Working Hours", text:"Mon – Sat | 9 AM – 6 PM" },
              ].map((item, i) => (
                <div key={i} className="va-contact-item">
                  <div className="va-contact-icon">{item.icon}</div>
                  <div>
                    <strong>{item.label}</strong>
                    <p style={{whiteSpace:"pre-line"}}>{item.text}</p>
                  </div>
                </div>
              ))}

              {/* SOCIAL LINKS — only here */}
              <div style={{marginTop:"20px"}}>
                <p style={{fontSize:"12px", fontWeight:"700", letterSpacing:"1.5px", textTransform:"uppercase", color:"var(--navy)", marginBottom:"12px", fontFamily:"'Montserrat',sans-serif"}}>Connect With Us</p>
                <div className="va-contact-socials">

                  {/* WhatsApp Community */}
                  <a href={SOCIAL_LINKS.whatsappCommunity} target="_blank" rel="noopener noreferrer" className="va-social-btn wa">
                    <div className="va-social-btn-icon" style={{background:"#e7faf0"}}>
                      {/* Official WhatsApp SVG */}
                      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#25d366" d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7C17.1 43 20.5 44 24 44c11 0 20-9 20-20S35 4 24 4z"/>
                        <path fill="#fff" d="M35.2 28.5c-.5-.2-2.8-1.4-3.2-1.5-.4-.2-.7-.2-1 .2-.3.5-1.2 1.5-1.5 1.8-.3.3-.5.4-1 .1-.5-.2-2-.7-3.8-2.3-1.4-1.2-2.3-2.7-2.6-3.2-.3-.5 0-.7.2-.9.2-.2.5-.5.7-.7.2-.2.3-.4.4-.7.1-.3 0-.6-.1-.8-.1-.2-1-2.4-1.3-3.3-.4-.9-.7-.7-1-.7h-.9c-.3 0-.8.1-1.2.6-.4.5-1.6 1.5-1.6 3.8s1.6 4.4 1.8 4.7c.2.3 3.1 4.8 7.6 6.7 1.1.5 1.9.8 2.6 1 1.1.3 2 .3 2.8.2.8-.1 2.5-1 2.9-2 .4-.9.4-1.7.3-1.9-.1-.1-.4-.2-.9-.4z"/>
                      </svg>
                    </div>
                    <div className="va-social-btn-text">
                      <span>Join our</span>
                      <span>WhatsApp Community</span>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="va-social-btn ig">
                    <div className="va-social-btn-icon" style={{background:"#fdf0f5"}}>
                      {/* Official Instagram SVG */}
                      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <radialGradient id="ig1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#fd5"/>
                          <stop offset=".328" stopColor="#ff543f"/>
                          <stop offset=".348" stopColor="#fc5245"/>
                          <stop offset=".504" stopColor="#e64771"/>
                          <stop offset=".643" stopColor="#d53e91"/>
                          <stop offset=".761" stopColor="#cc39a4"/>
                          <stop offset=".841" stopColor="#c837ab"/>
                        </radialGradient>
                        <path fill="url(#ig1)" d="M34.017 41.99l-20 .019c-4.4.004-8.003-3.592-8.008-7.992l-.019-20c-.004-4.4 3.592-8.003 7.992-8.008l20-.019c4.4-.004 8.003 3.592 8.008 7.992l.019 20c.005 4.401-3.592 8.004-7.992 8.008z"/>
                        <radialGradient id="ig2" cx="11.786" cy="5.54" r="29.813" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#4168c9"/>
                          <stop offset=".999" stopColor="#4168c9" stopOpacity="0"/>
                        </radialGradient>
                        <path fill="url(#ig2)" d="M34.017 41.99l-20 .019c-4.4.004-8.003-3.592-8.008-7.992l-.019-20c-.004-4.4 3.592-8.003 7.992-8.008l20-.019c4.4-.004 8.003 3.592 8.008 7.992l.019 20c.005 4.401-3.592 8.004-7.992 8.008z"/>
                        <path fill="#fff" d="M24 31c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm6.5-3c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm1.5 13h-16c-1.103 0-2-.897-2-2v-8h2v8h16v-8h2v8c0 1.103-.897 2-2 2zm-1-18h-14c-1.103 0-2 .897-2 2v3h2v-3h14v3h2v-3c0-1.103-.897-2-2-2z"/>
                      </svg>
                    </div>
                    <div className="va-social-btn-text">
                      <span>Follow us on</span>
                      <span>Instagram</span>
                    </div>
                  </a>

                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="va-form">
              <h3>Send Us a Message</h3>
              {submitted ? (
                <div className="va-form-success">
                  <div className="checkmark">✅</div>
                  <h4 style={{marginBottom:8}}>Message Sent!</h4>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="va-form-row">
                    <input type="text" placeholder="Your Name" required
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <input type="tel" placeholder="Phone Number" required
                      value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <input type="email" placeholder="Your Email" required
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <textarea placeholder="Your Message" required
                    value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                  <button type="submit" className="va-form-btn">Send Message →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="va-footer">
        <p>© 2026 <span>Vandana Associates</span>. All Rights Reserved. | Gwalior, M.P.</p>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a href={SOCIAL_LINKS.whatsappChat} target="_blank" rel="noopener noreferrer" className="va-whatsapp-float">
        <i className="fa-brands fa-whatsapp"></i>
        <div className="va-wa-text">
          <span>Chat with us</span>
          <span>WhatsApp</span>
        </div>
      </a>
    </>
  );
}