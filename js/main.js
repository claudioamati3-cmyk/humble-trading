/**
 * HUMBLE TRADING — "Dall'Abisso alla Luce"
 * Fluid Glowing Cursor, Depth Telemetry HUD, and Seamless Photo Deck Transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Fluid Glowing Cursor with Spring Physics
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const follower = document.createElement('div');
  follower.className = 'cursor-follower';
  document.body.appendChild(follower);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Add hover effect to interactive links
  const interactives = document.querySelectorAll('a, button');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // 2. Seamless Photo Deck Controller (Smooth Slide & Dissolve between Steps)
  const slides = [
    document.getElementById('bg-slide-1'),
    document.getElementById('bg-slide-2'),
    document.getElementById('bg-slide-3'),
    document.getElementById('bg-slide-4'),
    document.getElementById('bg-slide-5')
  ];

  const sections = document.querySelectorAll('.chapter-section');

  function updatePhotoDeck() {
    const scrollPos = window.scrollY + window.innerHeight * 0.45;
    let activeIndex = 0;

    sections.forEach((section, index) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeIndex = index;
      }
    });

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) {
      activeIndex = 4;
    }

    slides.forEach((slide, idx) => {
      if (slide) {
        if (idx === activeIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      }
    });
  }

  // 3. Depth Telemetry HUD Scroll Tracker
  const depthReadout = document.getElementById('depth-readout');
  const depthRailProgress = document.getElementById('depth-rail-progress');
  const depthStageTag = document.getElementById('depth-stage-tag');

  function updateDepth() {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const progress = Math.min(1, Math.max(0, currentScroll / (totalScroll || 1)));

    if (depthRailProgress) {
      depthRailProgress.style.height = `${progress * 100}%`;
    }

    const currentMeters = Math.round(-10000 + (progress * 10000));
    if (depthReadout) {
      depthReadout.textContent = `${currentMeters.toLocaleString('it-IT')}M`;
    }

    if (depthStageTag && depthReadout) {
      if (progress < 0.2) {
        depthStageTag.textContent = "ABISSO INFERNALE";
        depthStageTag.style.color = "#FF4500";
        depthReadout.style.color = "#F59E0B";
        depthReadout.style.textShadow = "0 0 20px rgba(245, 158, 11, 0.7)";
      } else if (progress < 0.5) {
        depthStageTag.textContent = "LA RISALITA";
        depthStageTag.style.color = "#00F5A0";
        depthReadout.style.color = "#00F5A0";
        depthReadout.style.textShadow = "0 0 20px rgba(0, 245, 160, 0.7)";
      } else if (progress < 0.75) {
        depthStageTag.textContent = "LA CHIAREZZA";
        depthStageTag.style.color = "#38BDF8";
        depthReadout.style.color = "#38BDF8";
        depthReadout.style.textShadow = "0 0 20px rgba(56, 189, 248, 0.7)";
      } else {
        depthStageTag.textContent = "SUPERFICIE / LUCE";
        depthStageTag.style.color = "#FFFFFF";
        depthReadout.style.color = "#FFFFFF";
        depthReadout.style.textShadow = "0 0 20px rgba(255, 255, 255, 0.7)";
      }
    }

    updatePhotoDeck();
  }

  window.addEventListener('scroll', updateDepth, { passive: true });
  updateDepth();
});
