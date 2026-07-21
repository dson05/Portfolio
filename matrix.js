// matrix.js
const canvas = document.getElementById("canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡ
  let letters = "abcdefghijklmnopqrstuvwxyzㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡαβγδεζηθικλμνξοπρσςτυφχψω".split("");
  let fontSize = 14;
  let columns = canvas.width / fontSize;
  let drops = new Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 50);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops = new Array(Math.floor(columns)).fill(1);
  });
}

// Email copy function
function copyEmail(event) {
  if (event) event.preventDefault();
  const email = "djson721@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showCopiedMessage("Copied to clipboard!");
  });
}

function showCopiedMessage(message) {
  const msgDiv = document.createElement("div");
  msgDiv.textContent = message;
  msgDiv.style.position = "fixed";
  msgDiv.style.top = "50%";
  msgDiv.style.left = "50%";
  msgDiv.style.transform = "translate(-50%, -50%)";
  msgDiv.style.background = "#32435aff";
  msgDiv.style.color = "white";
  msgDiv.style.padding = "12px 24px";
  msgDiv.style.borderRadius = "10px";
  msgDiv.style.zIndex = 9999;
  msgDiv.style.opacity = "0";
  msgDiv.style.transition = "opacity 0.3s ease";

  document.body.appendChild(msgDiv);
  requestAnimationFrame(() => {
    msgDiv.style.opacity = "1";
  });

  setTimeout(() => {
    msgDiv.style.opacity = "0";
    setTimeout(() => document.body.removeChild(msgDiv), 300);
  }, 2000);
}

// Scroll header behavior
document.addEventListener("DOMContentLoaded", () => {
  const scrollHeader = document.getElementById("scroll-header");
  if (scrollHeader) {
    const SCROLL_SHOW_Y = 60;   // show earlier on scroll
    const HOVER_ZONE_Y = 48;    // px from top that triggers reveal
    let hoverHideTimeout;
    let isPointerInHeader = false;
    let navActive = false;

    const setNavActive = (active) => {
      navActive = active;
      scrollHeader.classList.toggle("nav-active", active);
    };

    const showHeader = () => {
      clearTimeout(hoverHideTimeout);
      scrollHeader.classList.add("visible");
    };

    const hideHeader = () => {
      scrollHeader.classList.remove("visible");
    };

    const updateForScroll = () => {
      if (window.scrollY > SCROLL_SHOW_Y) {
        showHeader();
        setNavActive(false);
      } else if (!isPointerInHeader) {
        hideHeader();
        setNavActive(false);
      }
    };

    const handleMouseMove = (e) => {
      const rect = scrollHeader.getBoundingClientRect();
      const inHeaderBounds = e.clientY >= rect.top && e.clientY <= rect.bottom;
      const nearTop = e.clientY <= HOVER_ZONE_Y;
      isPointerInHeader = inHeaderBounds;

      if (nearTop || inHeaderBounds) {
        showHeader();
        setNavActive(true);
      } else if (window.scrollY <= SCROLL_SHOW_Y) {
        clearTimeout(hoverHideTimeout);
        hoverHideTimeout = setTimeout(() => {
          if (window.scrollY <= SCROLL_SHOW_Y && !isPointerInHeader) {
            hideHeader();
            setNavActive(false);
          }
        }, 0);
      } else {
        setNavActive(false);
      }
    };

    // Initial state
    updateForScroll();

    window.addEventListener("scroll", updateForScroll);
    document.addEventListener("mousemove", handleMouseMove);
  }

  // PDF viewer handling for writing.html
  const urlParams = new URLSearchParams(window.location.search);
  const sample = urlParams.get('sample');
  
  if (sample && sample !== 'Why-I-Love-Cybersecurity') {
    const samplesGrid = document.getElementById('samples-grid');
    const pdfViewerSection = document.getElementById('pdf-viewer-section');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    if (samplesGrid && pdfViewerSection && pdfViewer) {
      samplesGrid.classList.add('hidden');
      pdfViewerSection.classList.remove('hidden');
      pdfViewer.src = `writing/${sample}.pdf`;
      document.title = `Daniel Son - ${getSampleTitle(sample)}`;
    }
  }
});

function getSampleTitle(sample) {
  const titles = {
    'machines': 'Machines Do Think... Kind Of',
    'platovsmlk': 'Plato vs. Martin Luther King Jr.',
    'cherryhill': 'Cherry Hill Urban Community Garden',
    'gymculture': 'Damaging Consequences of Toxic Gym Culture',
    'commonapp': 'Common App Essay',
    'america': 'America: The Nation Builder'
  };
  return titles[sample] || 'Writing Sample';
}

// Course filtering functionality
function filterCourses(category) {
  // Update active button
  document.querySelectorAll('.edu-filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`${category}-btn`).classList.add('active');
  
  // Show/hide courses based on category
  const allCourses = document.querySelectorAll('.course-tile');
  
  allCourses.forEach(course => {
    if (course.classList.contains(`${category}-course`)) {
      course.style.display = '';
    } else {
      course.style.display = 'none';
    }
  });
}

// Initialize with cs courses showing
document.addEventListener('DOMContentLoaded', function() {
  filterCourses('cs');
});

/************************************
 *  LEETCODE ANALYTICS FETCH LOGIC  *
 ************************************/

const leetUsername = "DanielSon721";
const leetCodeProfileUrl = `https://leetcode.com/u/${encodeURIComponent(leetUsername)}/`;
const leetCodeApiEndpoints = [
  `https://leetcode-api-faisalshohag.vercel.app/${encodeURIComponent(leetUsername)}`,
];

function getLeetCodeElements() {
  return {
    totalSolved: document.getElementById("lc-total-solved"),
    easyLabel: document.getElementById("lc-easy-label"),
    mediumLabel: document.getElementById("lc-medium-label"),
    hardLabel: document.getElementById("lc-hard-label"),
    easyBar: document.getElementById("lc-easy-bar"),
    mediumBar: document.getElementById("lc-medium-bar"),
    hardBar: document.getElementById("lc-hard-bar"),
    status: document.getElementById("lc-status"),
  };
}

function hasLeetCodeWidget(elements) {
  return Object.values(elements).every(Boolean);
}

function setLeetCodeStatus(elements, message, isError = false) {
  if (!elements.status) return;
  elements.status.className = `mt-6 text-center text-sm ${isError ? "text-red-300" : "text-gray-400"}`;
  elements.status.innerHTML = message;
}

function normalizeLeetCodeStats(data) {
  if (!data) return null;

  const stats = {
    totalSolved: Number(data.totalSolved),
    easySolved: Number(data.easySolved),
    totalEasy: Number(data.totalEasy),
    mediumSolved: Number(data.mediumSolved),
    totalMedium: Number(data.totalMedium),
    hardSolved: Number(data.hardSolved),
    totalHard: Number(data.totalHard),
  };

  if (Object.values(stats).some((value) => !Number.isFinite(value))) {
    return null;
  }

  return stats;
}

function setLeetCodeBarWidth(bar, solved, total) {
  const percentage = total > 0 ? Math.min(100, (solved / total) * 100) : 0;
  bar.style.width = `${percentage}%`;
}

function renderLeetCodeStats(elements, stats) {
  elements.totalSolved.innerText = stats.totalSolved;
  elements.easyLabel.innerText = `${stats.easySolved} / ${stats.totalEasy}`;
  elements.mediumLabel.innerText = `${stats.mediumSolved} / ${stats.totalMedium}`;
  elements.hardLabel.innerText = `${stats.hardSolved} / ${stats.totalHard}`;

  setLeetCodeBarWidth(elements.easyBar, stats.easySolved, stats.totalEasy);
  setLeetCodeBarWidth(elements.mediumBar, stats.mediumSolved, stats.totalMedium);
  setLeetCodeBarWidth(elements.hardBar, stats.hardSolved, stats.totalHard);

  setLeetCodeStatus(
    elements,
    `Live stats from public LeetCode data. <a href="${leetCodeProfileUrl}" class="text-green-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer">View profile</a>.`,
  );
}

function renderLeetCodeFallback(elements) {
  elements.totalSolved.innerText = "--";
  elements.easyLabel.innerText = "--";
  elements.mediumLabel.innerText = "--";
  elements.hardLabel.innerText = "--";

  setLeetCodeBarWidth(elements.easyBar, 0, 1);
  setLeetCodeBarWidth(elements.mediumBar, 0, 1);
  setLeetCodeBarWidth(elements.hardBar, 0, 1);

  setLeetCodeStatus(
    elements,
    `Live LeetCode stats are temporarily unavailable. <a href="${leetCodeProfileUrl}" class="text-green-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer">View profile</a>.`,
    true,
  );
}

async function fetchJsonWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function fetchLeetCodeStats() {
  let lastError = new Error("Unable to fetch LeetCode stats.");

  for (const endpoint of leetCodeApiEndpoints) {
    try {
      const res = await fetchJsonWithTimeout(endpoint);

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const stats = normalizeLeetCodeStats(data);

      if (!stats) {
        throw new Error("Unexpected LeetCode response payload.");
      }

      return stats;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError;
}

async function loadLeetCodeStats() {
  const elements = getLeetCodeElements();

  if (!hasLeetCodeWidget(elements)) {
    return;
  }

  try {
    const stats = await fetchLeetCodeStats();
    renderLeetCodeStats(elements, stats);
  } catch (err) {
    console.log("LeetCode API error", err);
    renderLeetCodeFallback(elements);
  }
}

document.addEventListener("DOMContentLoaded", loadLeetCodeStats);
