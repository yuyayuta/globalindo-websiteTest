gsap.registerPlugin(ScrollTrigger);

// ── Mobile menu ─────────────────────────────────────────────
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll("#mobileMenu a");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ── Scroll-spy nav highlight ─────────────────────────────────
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => {
          a.style.color = a.getAttribute("href") === `#${entry.target.id}` ? "#1f7a3d" : "";
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach((s) => observer.observe(s));

// ── GSAP animations ──────────────────────────────────────────
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Hero entrance
  gsap.from(".hero-badge", {
    y: 22, opacity: 0, duration: 0.8, ease: "power3.out",
  });
  gsap.from(".hero-title", {
    y: 36, opacity: 0, duration: 1, delay: 0.1, ease: "power3.out",
  });
  gsap.from(".hero-text", {
    y: 26, opacity: 0, duration: 0.9, delay: 0.25, ease: "power3.out",
  });
  gsap.from(".hero-actions", {
    y: 20, opacity: 0, duration: 0.85, delay: 0.38, ease: "power3.out",
  });
  gsap.from(".hero-stats > div", {
    y: 18, opacity: 0, duration: 0.75, delay: 0.5, stagger: 0.12, ease: "power3.out",
  });
  gsap.from(".hero-image-wrap", {
    y: 28, opacity: 0, duration: 1, delay: 0.18, ease: "power3.out",
  });

  // Scroll-reveal for generic .reveal elements
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.to(el, {
      y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 86%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Process steps staggered reveal
  gsap.utils.toArray(".process-step").forEach((el, i) => {
    gsap.from(el, {
      y: 30, opacity: 0, duration: 0.8, delay: i * 0.08, ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Trust badges stagger
  gsap.utils.toArray(".trust-badge").forEach((el, i) => {
    gsap.from(el, {
      y: 24, opacity: 0, duration: 0.7, delay: i * 0.07, ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // CTA glow drift
  gsap.to(".cta-glow", {
    x: -24, y: -20, repeat: -1, yoyo: true, duration: 4, ease: "sine.inOut",
  });
});

mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.set(
    ".reveal, .hero-badge, .hero-title, .hero-text, .hero-actions, .hero-image-wrap, .hero-stats > div, .process-step, .trust-badge",
    { opacity: 1, y: 0, clearProps: "transform" }
  );
});
