import "./style.css";

const B = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

function on(i, a, b) {
  return Math.min(1, (64 - i) / 48) > (B[a % 8][b % 8] + 0.5) / 64;
}

function ramp(dir) {
  const vert = dir === "u";
  const w = vert ? 8 : 64;
  const h = vert ? 64 : 8;
  let p = "";
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = dir === "r" ? x : dir === "l" ? 63 - x : 63 - y;
      if (on(i, y, x)) p += `M${x} ${y}h1v1h-1z`;
    }
  }
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' ` +
    `shape-rendering='crispEdges'><path d='${p}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const root = document.documentElement.style;
["r", "l", "u"].forEach((d) => root.setProperty(`--ramp-${d}`, ramp(d)));

const app = document.querySelector("#app");
app.classList.add("l-stack");

const patterns = [
  ["c-dither-btn--right", "お問い合わせ"],
  ["c-dither-btn--close", "資料をダウンロード"],
  ["c-dither-btn--up", "採用情報を見る"],
];

patterns.forEach(([modifier, label]) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `c-dither-btn ${modifier}`;
  button.textContent = label;
  app.appendChild(button);
});
