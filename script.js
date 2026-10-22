// Personal links live here; resume-backed portfolio content is readable HTML in index.html.
const portfolio = {
  linkedinUrl: "https://www.linkedin.com/in/biswajeetpanda/",
  githubUrl: "https://github.com/jeethub26230"
};

const veil = document.querySelector("#hero-opening-mask");
const heroScene = document.querySelector("#home");
const header = document.querySelector(".site-header");
const mainContent = document.querySelector("#main");
const faceTeaser = document.querySelector(".opening-face-teaser");
const veilContext = veil?.getContext("2d");

if (veil && heroScene && header && mainContent && veilContext) {
  let canvasWidth = 0;
  let canvasHeight = 0;
  let pixelRatio = 1;
  let pointerIsDown = false;
  let hasInteracted = false;
  let previousPoint = null;

  const trackedWidth = (text, spacing) =>
    veilContext.measureText(text).width + Math.max(0, text.length - 1) * spacing;

  const fillTrackedText = (text, x, y, spacing) => {
    for (const character of text) {
      veilContext.fillText(character, x, y);
      x += veilContext.measureText(character).width + spacing;
    }
    return x;
  };

  const paintOpening = (width, height) => {
    veilContext.globalCompositeOperation = "source-over";
    veilContext.fillStyle = "#08090b";
    veilContext.fillRect(0, 0, width, height);

    const glow = veilContext.createRadialGradient(
      width * 0.74,
      Math.min(window.innerHeight, height) * 0.34,
      0,
      width * 0.74,
      Math.min(window.innerHeight, height) * 0.34,
      Math.max(width, height) * 0.74
    );
    glow.addColorStop(0, "rgba(83, 12, 21, 0.17)");
    glow.addColorStop(1, "rgba(8, 9, 11, 0)");
    veilContext.fillStyle = glow;
    veilContext.fillRect(0, 0, width, height);

    veilContext.strokeStyle = "rgba(227, 38, 53, 0.12)";
    veilContext.lineWidth = 1;
    for (let start = -height; start < width + height; start += 76) {
      veilContext.beginPath();
      veilContext.moveTo(start, 0);
      veilContext.lineTo(start - height * 0.7, height);
      veilContext.stroke();
    }

    const inset = Math.max(22, width * 0.035);
    const corner = Math.min(34, width * 0.06);
    const signatureBottom = Math.min(height, window.innerHeight) - inset;
    veilContext.strokeStyle = "rgba(227, 38, 53, 0.52)";
    veilContext.lineWidth = 1;
    [
      [inset, inset, 1, 1],
      [width - inset, inset, -1, 1],
      [inset, signatureBottom, 1, -1],
      [width - inset, signatureBottom, -1, -1]
    ].forEach(([x, y, directionX, directionY]) => {
      veilContext.beginPath();
      veilContext.moveTo(x + corner * directionX, y);
      veilContext.lineTo(x, y);
      veilContext.lineTo(x, y + corner * directionY);
      veilContext.stroke();
    });

    const left = Math.max(24, width * 0.075);
    const top = Math.max(118, Math.min(168, window.innerHeight * 0.22));
    const titleWidth = width - left * 2;
    const tracking = Math.max(1, width * 0.0022);
    veilContext.textAlign = "left";
    veilContext.textBaseline = "alphabetic";
    veilContext.fillStyle = "#e32635";
    veilContext.font = "11px 'Courier New', monospace";
    veilContext.fillText("GOTHAM // AFTER DARK", left, top);

    let titleSize = Math.min(width < 560 ? 58 : 124, width * 0.115);
    const titleFont = (size) => `${size}px "Bebas Neue", Impact, "Arial Narrow", sans-serif`;
    veilContext.font = titleFont(titleSize);
    const fullSecondLine = "BEHIND THE MASK";
    while (titleSize > 24 && trackedWidth(fullSecondLine, tracking) > titleWidth) {
      titleSize -= 1;
      veilContext.font = titleFont(titleSize);
    }

    const titleY = top + Math.max(62, titleSize * 1.08);
    const lineHeight = titleSize * 0.9;
    const titleTracking = Math.max(1.2, titleSize * 0.035);
    veilContext.fillStyle = "#e8e8e5";
    fillTrackedText("THE MAN", left, titleY, titleTracking);
    veilContext.fillStyle = "#e32635";
    const behindEnd = fillTrackedText("BEHIND", left, titleY + lineHeight, titleTracking);
    veilContext.fillStyle = "#e8e8e5";
    fillTrackedText("THE MASK", behindEnd + titleTracking * 2, titleY + lineHeight, titleTracking);

    veilContext.fillStyle = "rgba(232, 232, 229, 0.75)";
    veilContext.font = "11px 'Courier New', monospace";
    veilContext.fillText("Drag to reveal the truth", left, titleY + lineHeight + 42);

    veilContext.textAlign = "right";
    veilContext.fillStyle = "rgba(232, 232, 229, 0.7)";
    veilContext.font = "10px 'Courier New', monospace";
    veilContext.fillText("NIGHT WATCH  /  01:17 AM", width - left, signatureBottom);
    veilContext.globalCompositeOperation = "source-over";
  };

  const paintVeil = (preserveReveal = false) => {
    const width = mainContent.clientWidth;
    const height = header.offsetHeight + heroScene.offsetHeight;
    if (!width || !height) return;

    let previousCanvas = null;
    if (preserveReveal && veil.width && veil.height) {
      previousCanvas = document.createElement("canvas");
      previousCanvas.width = veil.width;
      previousCanvas.height = veil.height;
      previousCanvas.getContext("2d").drawImage(veil, 0, 0);
    }

    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvasWidth = width;
    canvasHeight = height;
    veil.width = Math.round(width * pixelRatio);
    veil.height = Math.round(height * pixelRatio);
    veil.style.width = `${width}px`;
    veil.style.height = `${height}px`;
    veil.style.top = `-${header.offsetHeight}px`;
    veilContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    veilContext.clearRect(0, 0, width, height);

    if (previousCanvas) {
      veilContext.drawImage(previousCanvas, 0, 0, previousCanvas.width, previousCanvas.height, 0, 0, width, height);
    } else {
      paintOpening(width, height);
    }

    faceTeaser.style.height = `${heroScene.offsetHeight}px`;
    previousPoint = null;
  };

  const eraseAt = (x, y, fromPoint = null) => {
    const radius = Math.max(58, Math.min(94, canvasWidth * 0.08));
    veilContext.globalCompositeOperation = "destination-out";

    const eraseStamp = (stampX, stampY) => {
      const gradient = veilContext.createRadialGradient(
        stampX,
        stampY,
        radius * 0.25,
        stampX,
        stampY,
        radius
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(0.68, "rgba(0, 0, 0, 0.94)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      veilContext.fillStyle = gradient;
      veilContext.beginPath();
      veilContext.arc(stampX, stampY, radius, 0, Math.PI * 2);
      veilContext.fill();
    };

    if (!fromPoint) {
      eraseStamp(x, y);
    } else {
      const distance = Math.hypot(x - fromPoint.x, y - fromPoint.y);
      const steps = Math.max(1, Math.ceil(distance / (radius * 0.22)));
      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        eraseStamp(
          fromPoint.x + (x - fromPoint.x) * progress,
          fromPoint.y + (y - fromPoint.y) * progress
        );
      }
    }

    veilContext.globalCompositeOperation = "source-over";
    previousPoint = { x, y };
    hasInteracted = true;
    faceTeaser.classList.add("is-hidden");
  };

  const pointerPosition = (event) => {
    const bounds = veil.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return x >= 0 && y >= 0 && x <= canvasWidth && y <= canvasHeight ? { x, y } : null;
  };

  paintVeil();

  document.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    if (event.button !== 0) return;
    const point = pointerPosition(event);
    if (!point) return;
    pointerIsDown = true;
    eraseAt(point.x, point.y);
  }, { passive: true });

  document.addEventListener("pointermove", (event) => {
    const point = pointerPosition(event);
    if (!point) {
      previousPoint = null;
      return;
    }
    if (event.pointerType === "mouse") {
      eraseAt(point.x, point.y, previousPoint);
      return;
    }
    if (!pointerIsDown) return;
    eraseAt(point.x, point.y, previousPoint);
  }, { passive: true });

  document.addEventListener("focusin", (event) => {
    const bounds = event.target.getBoundingClientRect();
    const point = pointerPosition({
      clientX: bounds.left + bounds.width / 2,
      clientY: bounds.top + bounds.height / 2
    });
    if (point) eraseAt(point.x, point.y);
  });

  window.addEventListener("pointerup", () => {
    pointerIsDown = false;
    previousPoint = null;
  }, { passive: true });
  window.addEventListener("pointercancel", () => {
    pointerIsDown = false;
    previousPoint = null;
  }, { passive: true });

  const resizeObserver = new ResizeObserver(() => {
    paintVeil(true);
  });
  resizeObserver.observe(header);
  resizeObserver.observe(heroScene);
  resizeObserver.observe(mainContent);

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      if (!hasInteracted) paintVeil();
    });
  }
  document.addEventListener("visibilitychange", () => {
    heroScene.classList.toggle("page-hidden", document.hidden);
  });
}

document.querySelector("#current-year").textContent = new Date().getFullYear();

const linkedinTarget = document.querySelector("#contact-linkedin");
let linkedinHref = "";
let linkedinNeedsCorrection = false;
if (portfolio.linkedinUrl.trim()) {
  try {
    const parsedLinkedinUrl = new URL(portfolio.linkedinUrl);
    if (["http:", "https:"].includes(parsedLinkedinUrl.protocol)) {
      linkedinHref = parsedLinkedinUrl.href;
    } else {
      linkedinNeedsCorrection = true;
    }
  } catch {
    linkedinNeedsCorrection = true;
  }
}
if (linkedinHref) {
  linkedinTarget.innerHTML = `<a class="button button-primary" href="${linkedinHref}" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a>`;
} else {
  const note = linkedinNeedsCorrection
    ? "Replace linkedinUrl in script.js with a valid profile URL."
    : "Add your LinkedIn profile URL to linkedinUrl in script.js.";
  linkedinTarget.innerHTML = `<span class="button button-primary button-unavailable" aria-disabled="true">Connect on LinkedIn <span aria-hidden="true">↗</span></span><small class="link-config-note">${note}</small>`;
}

const socialLinks = document.querySelector("#social-links");
const socials = [
  ["GitHub", portfolio.githubUrl]
];
socialLinks.innerHTML = socials.map(([label, url]) => url
  ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span></a>`
  : `<span class="social-unset">${label}: add ${label.toLowerCase()}Url in script.js</span>`
).join("");


const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
};

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
document.documentElement.classList.add("js-enabled");


// Heavy storm: dense rain, irregular branching bolts, and scene-wide illumination.
(() => {
  const canvas = document.getElementById("hero-rain");
  const scene = document.getElementById("home");
  const lightning = document.querySelector(".hero-lightning");
  const svg = lightning && lightning.querySelector(".lightning-bolt");
  if (!canvas || !scene || !lightning || !svg) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0, height = 0, drops = [], raf = 0, strikeTimer = 0;
  const rand = (a,b) => a + Math.random() * (b-a);

  const resize = () => {
    const rect = scene.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = rect.width; height = rect.height;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    canvas.style.width = width + "px"; canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Three visual depths: fine distant rain, long mid-ground streaks, and a few foreground drops.
    const count = Math.max(260, Math.min(760, Math.round(width * height / 1450)));
    drops = Array.from({length: count}, (_,i) => {
      const depth = Math.random();
      return {
        x: Math.random()*width, y: Math.random()*height,
        len: depth < .55 ? rand(7,16) : depth < .9 ? rand(18,34) : rand(32,52),
        speed: depth < .55 ? rand(7,12) : depth < .9 ? rand(13,21) : rand(20,29),
        alpha: depth < .55 ? rand(.12,.28) : depth < .9 ? rand(.2,.42) : rand(.25,.5),
        thick: depth > .94 ? rand(1,1.45) : rand(.45,.85),
        drift: rand(-3.2,-1.4)
      };
    });
  };
  const draw = () => {
    ctx.clearRect(0,0,width,height);
    for (const d of drops) {
      ctx.beginPath();
      ctx.moveTo(d.x,d.y);
      ctx.lineTo(d.x + d.drift * (d.len/24), d.y + d.len);
      ctx.strokeStyle = `rgba(205,224,247,${d.alpha})`;
      ctx.lineWidth = d.thick;
      ctx.stroke();
      d.x += d.drift * .34; d.y += d.speed;
      if (d.y > height + 55 || d.x < -55) {
        d.x = rand(0,width+60); d.y = -d.len-rand(0,height*.35);
      }
    }
    if (!reduced && !document.hidden) raf = requestAnimationFrame(draw);
  };

  function makeBolt() {
    // Each strike gets a different position and branching silhouette; not a fixed center icon.
    const x0 = Math.round(rand(85,175));
    let x = x0, y = 0;
    const main = [];
    main.push(`M ${x} ${y}`);
    while (y < 570) {
      x += rand(-38,38);
      y += rand(35,72);
      main.push(`L ${Math.max(18,Math.min(242,x)).toFixed(1)} ${Math.min(600,y).toFixed(1)}`);
    }
    const branches = [];
    for (let i=0;i<5;i++) {
      const by = rand(100,470);
      const bx = rand(65,195);
      const dir = Math.random() < .5 ? -1 : 1;
      branches.push(`M ${bx} ${by} l ${dir*rand(18,42)} ${rand(12,28)} l ${dir*rand(14,30)} ${rand(18,34)}`);
    }
    const paths = svg.querySelectorAll("path");
    if (paths[0]) paths[0].setAttribute("d", branches.join(" "));
    if (paths[1]) paths[1].setAttribute("d", main.join(" "));
    if (paths[2]) paths[2].setAttribute("d", main.join(" "));
    svg.style.left = `${rand(12,72)}%`;
    svg.style.width = `${rand(230,390)}px`;
  }
  const strike = () => {
    if (reduced || document.hidden) return;
    makeBolt();
    lightning.classList.remove("is-flashing");
    void lightning.offsetWidth;
    lightning.classList.add("is-flashing");
    window.setTimeout(() => lightning.classList.remove("is-flashing"), 1100);
    // Storm cells pulse irregularly; some strikes are followed by a close double flash.
    strikeTimer = window.setTimeout(strike, rand(2800,6800));
  };

  resize();
  if (reduced) return;
  draw();
  strikeTimer = window.setTimeout(strike, rand(1200,2600));
  window.addEventListener("resize", resize, {passive:true});
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(raf); clearTimeout(strikeTimer);
    } else {
      draw(); strikeTimer = window.setTimeout(strike, rand(700,1700));
    }
  });
})();
