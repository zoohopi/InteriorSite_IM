const scenes = [
  [
    "FACADE",
    "첫인상으로 발걸음을 잡습니다",
    "아파트 단지 상가 특성상 처마와 기둥에 가려 매장이 잘 보이지 않았습니다.\n고재 간판과 조명으로 시선을 끌고, 방문까지 이어지는 파사드를 설계했습니다.",
    "50% 50%",
  ],
  [
    "ENTRANCE OBJECT",
    "브랜드 아이덴티티 오브제",
    "生(생) 竹(죽) 石(석) 月(월), 자연의 네 가지 요소를 공간에 담았습니다.\n자연 속에서 미식을 즐기던 선비의 풍류를 떠올리게 하는 공간으로 설계했습니다.",
    "50% 50%",
    "生(생) 살아있는 장어  ·  竹(죽) 사군자의 대나무\n石(석) 도시와 매장을 잇는 돌  ·  月(월) 달빛 아래 풍류를 담은 원형 조명",
  ],
  [
    "AQUARIUM",
    "파사드에 담은 브랜드 스토리",
    "남산장어는 장어직판장에서 신선한 생 장어를 직접 공수해옵니다.\n이 이야기를 담아 입구에 조경과 어항을 함께 설계해, 소비자가 입구에서부터 \n즐길 수 있는 하나의 콘텐츠로 만들었습니다.",
    "65% 50%",
  ],
  [
    "HALL · FIRST VIEW",
    "처음 마주하는 편안함",
    "부드러운 빛과 절제된 색감은 손님이 매장에 들어와 편안하게 머물도록 돕습니다. 첫 만족이 식사 경험과 매출을 만듭니다.",
    "50% 50%",
  ],
  [
    "HALL · MATERIAL",
    "주방도 하나의 콘텐츠로 설계",
    "모든 좌석에서 조리 과정이 보이도록 설계했습니다.\n깔끔한 주방과 직화로 굽는 조리사의 모습을 공개해, \n매장의 신뢰와 전문성을 전합니다.",
    "45% 50%",
  ],
  [
    "KITCHEN SIGN",
    "기다림까지 즐겁게",
    "조리과정을 의도적으로 노출해 손님이 기다리는 동안에도 기대감과 즐거움을 유발합니다. 또 그 모습이 프로페셔널 하게 보일 수 있게 오브제를 배치했습니다.",
    "55% 45%",
  ],
  [
    "ROOM · OVERVIEW",
    "함께 머물기 좋은 자리",
    "홀에서 룸으로 이어지는 시선과 테이블 배치는 일행이 편하게 대화하고 식사하도록 돕습니다. 편안한 체류가 만족과 재방문, 매출로 이어집니다.",
    "50% 50%",
  ],
  [
    "ROOM · ENTRANCE",
    "안쪽까지 편안하게",
    "나무 프레임 사이로 보이는 식사 자리는 프라이버시와 개방감을 함께 줍니다. 소비자가 편안할수록 식사 경험과 매장 매출도 좋아집니다.",
    "55% 50%",
  ],
  [
    "ROOM · DETAIL",
    "마지막 인상까지 만족스럽게",
    "소비자가 직접 느낄 감각을 생각하며 의자, 테이블, 벽면의 디테일을 설계했습니다.\n앉았을 때 테이블 높이는 적절한지, 벽에 옷이 스쳐도 불쾌하지 않을지 \n고민하며 마감재를 선택합니다.",
    "58% 50%",
  ],
];
const sceneFiles = [
  "space-01.jpg",
  "space-02.jpg",
  "space-03.jpg",
  "space-05.jpg",
  "space-07.jpg",
  "space-08.jpg",
  "space-09.jpg",
  "space-10.jpg",
  "space-11.jpg",
];
const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const clamp = (n) => Math.max(0, Math.min(1, n));
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const frameRoot = $("#journey-frames"),
  dots = $(".scene-dots");
scenes.forEach((s, i) => {
  const frame = document.createElement("article");
  frame.className = "scene-frame";
  const img = document.createElement("img");
  img.src = `images/${sceneFiles[i]}`;
  img.alt = `남산장어 ${s[0]} — ${s[1]}`;
  img.style.objectPosition = s[3];
  img.loading = i < 2 ? "eager" : "lazy";
  img.decoding = "async";
  frame.append(img);
  const caption = document.createElement("div");
  caption.className = "static-caption";
  caption.hidden = !reduced.matches;
  const title = document.createElement("h3");
  title.textContent = s[1];
  const desc = document.createElement("p");
  desc.textContent = s[2];
  caption.append(title, desc);
  if (s[4]) {
    const detail = document.createElement("p");
    detail.className = "scene-detail";
    detail.textContent = s[4];
    caption.append(detail);
  }
  frame.append(caption);
  frameRoot.append(frame);
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `${i + 1}. ${s[1]}`);
  dot.addEventListener("click", () => {
    const j = $("#journey");
    const unit = (j.offsetHeight - innerHeight) / scenes.length;
    window.scrollTo({
      top: j.offsetTop + (i + 0.43) * unit,
      behavior: reduced.matches ? "instant" : "smooth",
    });
  });
  dots.append(dot);
});
const frames = $$(".scene-frame"),
  images = $$(".scene-frame img");
const experienceScroll = $(".experience-scroll"),
  experienceFrames = $$(".experience-frame"),
  experienceDots = $$(".experience-progress span");
let active = -1,
  experienceActive = -1,
  queued = false;
// Animate contents rather than section boxes, keeping sticky geometry stable.
const sectionEntrances = $$(".section").map((section) => {
  const content = document.createElement("div");
  content.className = "section-content";
  while (section.firstChild) content.append(section.firstChild);
  section.append(content);
  return { section, content };
});
function render() {
  queued = false;
  if (reduced.matches) return;
  sectionEntrances.forEach(({ section, content }) => {
    const top = section.getBoundingClientRect().top;
    const progress = clamp((innerHeight - top) / (innerHeight * 0.8));
    const eased = 1 - Math.pow(1 - progress, 3);
    content.style.setProperty("--entry-y", `${(1 - eased) * 90}px`);
    content.style.setProperty("--entry-opacity", String(0.3 + eased * 0.7));
  });
  const hero = $(".hero"),
    travel = hero.offsetHeight - innerHeight;
  const hp = clamp(scrollY / Math.max(1, travel));
  $(".hero-word").style.transform =
    `translate(-50%, calc(-50% + ${(1 - clamp(hp / 0.72)) * 210}px))`;
  $(".hero-word").style.opacity = String(clamp(hp / 0.35));
  const experienceRect = experienceScroll.getBoundingClientRect();
  if (experienceRect.top <= innerHeight && experienceRect.bottom >= 0) {
    const experienceProgress = clamp(
      -experienceRect.top /
        Math.max(1, experienceScroll.offsetHeight - innerHeight),
    );
    const experiencePosition = experienceProgress * experienceFrames.length;
    const experienceIndex = Math.min(
      experienceFrames.length - 1,
      Math.floor(experiencePosition),
    );
    const experienceLocal = experiencePosition - experienceIndex;
    const experienceCross =
      experienceIndex < experienceFrames.length - 1
        ? clamp((experienceLocal - 0.78) / 0.22)
        : 0;
    experienceFrames.forEach((frame, i) => {
      frame.style.opacity =
        i === experienceIndex
          ? String(1 - experienceCross)
          : i === experienceIndex + 1
            ? String(experienceCross)
            : "0";
      frame.style.visibility =
        i === experienceIndex || i === experienceIndex + 1
          ? "visible"
          : "hidden";
      frame.style.transform = `scale(${i === experienceIndex ? 1.04 - experienceLocal * 0.04 : 1.04})`;
    });
    if (experienceIndex !== experienceActive) {
      experienceActive = experienceIndex;
      experienceDots.forEach((dot, i) =>
        dot.classList.toggle("is-active", i === experienceIndex),
      );
      const next = experienceFrames[experienceIndex + 1]?.querySelector("img");
      if (next) next.loading = "eager";
    }
  }
  const journey = $("#journey");
  const r = journey.getBoundingClientRect();
  if (r.top > innerHeight || r.bottom < 0) return;
  const p =
    clamp(-r.top / (journey.offsetHeight - innerHeight)) * scenes.length;
  const idx = Math.min(scenes.length - 1, Math.floor(p));
  const local = p >= scenes.length ? 1 : p - idx;
  const cross = idx < scenes.length - 1 ? clamp((local - 0.8) / 0.2) : 0;
  frames.forEach((f, i) => {
    const visible = i === idx || (i === idx + 1 && cross > 0);
    f.style.visibility = visible ? "visible" : "hidden";
    f.style.opacity =
      i === idx ? String(1 - cross) : i === idx + 1 ? String(cross) : "0";
    f.style.filter = i === idx ? `blur(${cross * 7}px)` : "none";
    f.style.transform = `translateY(${i === idx ? -cross * 8 : (1 - cross) * 12}%)`;
    if (visible) {
      images[i].loading = "eager";
      images[i].style.transform =
        `scale(${i === idx ? 1.045 - local * 0.045 : 1.045})`;
    }
  });
  if (idx !== active) {
    active = idx;
    $("#scene-tag").textContent =
      `${String(idx + 1).padStart(2, "0")} / ${scenes[idx][0]}`;
    $("#scene-title").textContent = scenes[idx][1];
    $("#scene-description").textContent = scenes[idx][2];
    const detail = $("#scene-detail");
    detail.textContent = scenes[idx][4] || "";
    detail.hidden = !scenes[idx][4];
    $("#scene-count").textContent =
      `${String(idx + 1).padStart(2, "0")} / ${scenes.length}`;
    $$(".scene-dots button").forEach((b, i) =>
      b.setAttribute("aria-current", String(i === idx)),
    );
    if (images[idx + 1]) images[idx + 1].loading = "eager";
  }
  const gradient = clamp((local - 0.08) / 0.26);
  $(".journey-shade").style.transform = `translateY(${(1 - gradient) * 100}%)`;
  $(".journey-shade").style.opacity = String(1 - cross);
  const text = clamp((local - 0.34) / 0.2);
  $(".journey-copy").style.opacity = String(text * (1 - cross));
  $(".journey-copy").style.transform = `translateY(${(1 - text) * 80}px)`;
}
function queue() {
  if (!queued) {
    queued = true;
    requestAnimationFrame(render);
  }
}
addEventListener("scroll", queue, { passive: true });
addEventListener("resize", queue);
render();
reduced.addEventListener("change", () => {
  $$(".static-caption").forEach((e) => (e.hidden = !reduced.matches));
  frames.forEach((e) => {
    e.style.visibility = "visible";
  });
  queue();
});
$("#year").textContent = new Date().getFullYear();
let restoreFocus = null;
function openDialog(dialog) {
  restoreFocus = document.activeElement;
  dialog.showModal();
  document.body.style.overflow = "hidden";
}
$$("dialog").forEach((d) => {
  d.addEventListener("close", () => {
    document.body.style.overflow = "";
    restoreFocus?.focus();
  });
  d.addEventListener("click", (e) => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        d.close();
    }
  });
  d.querySelectorAll("[data-close]").forEach((b) =>
    b.addEventListener("click", () => d.close()),
  );
});
$$("[data-media]").forEach((b) =>
  b.addEventListener("click", () => {
    $("#media-title").textContent = b.dataset.media;
    openDialog($("#media-dialog"));
  }),
);
$$("[data-estimate]").forEach((b) =>
  b.addEventListener("click", () => openDialog($("#estimate-dialog"))),
);
const labels = {
  business: "업종",
  type: "공사 유형",
  area: "면적 (평)",
  location: "지역",
  budget: "계획 예산",
  opening: "오픈 시기",
  notes: "추가 요청",
};
// Count once when the experience figure enters the viewport.
const experienceCount = $("#experience-count");
if (!reduced.matches) {
  experienceCount.textContent = "0";
  const countObserver = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    countObserver.disconnect();
    const start = performance.now();
    function tick(now) {
      const progress = reduced.matches ? 1 : clamp((now - start) / 1600);
      experienceCount.textContent = String(Math.round(127 * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, { threshold: 0.5 });
  countObserver.observe(experienceCount);
}
let resultText = "";
$("#estimate-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const dl = $("#estimate-summary");
  dl.replaceChildren();
  resultText = "아그디자인 — 매장 기획서\n\n";
  Object.entries(labels).forEach(([key, label]) => {
    const value = String(data.get(key) || "미입력");
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    dl.append(dt, dd);
    resultText += `${label}: ${value}\n`;
  });
  resultText +=
    "\n금액 미산정 · 상담 미접수 · 대표님이 직접 작성한 기획 내용입니다.";
  e.target.hidden = true;
  $("#estimate-result").hidden = false;
  $("#estimate-dialog").scrollTop = 0;
  $("#download-summary").focus();
});
$("#edit-summary").addEventListener("click", () => {
  $("#estimate-result").hidden = true;
  $("#estimate-form").hidden = false;
  $("#estimate-form select").focus();
});
$("#download-summary").addEventListener("click", () => {
  const blob = new Blob(["\ufeff" + resultText], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "아그디자인_매장기획서.txt";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
