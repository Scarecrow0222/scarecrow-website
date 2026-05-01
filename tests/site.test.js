const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

test("project scaffold contains Next.js, Tailwind, and test scripts", () => {
  assert.equal(exists("package.json"), true);
  assert.equal(exists("next.config.mjs"), true);
  assert.equal(exists("tailwind.config.ts"), true);
  assert.equal(exists("src/app/layout.tsx"), true);
  assert.equal(exists("src/app/MobileNav.tsx"), true);
  assert.equal(exists("src/app/globals.css"), true);

  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.scripts.dev, "next dev");
  assert.equal(pkg.scripts.build, "next build");
  assert.equal(pkg.scripts.test, "node --test tests/site.test.js");
  assert.ok(pkg.dependencies.next);
  assert.ok(pkg.devDependencies.tailwindcss);
});

test("next image config allows note image hosts", () => {
  const config = read("next.config.mjs");
  assert.match(config, /assets\.st-note\.com/);
  assert.match(config, /d2l930y2yx77uc\.cloudfront\.net/);
});

test("layout exposes primary navigation and site identity", () => {
  const layout = read("src/app/layout.tsx");
  const mobileNav = read("src/app/MobileNav.tsx");
  assert.match(layout, /Scarecrow/);
  assert.match(layout, /Home/);
  assert.match(layout, /Logs/);
  assert.match(layout, /Projects/);
  assert.match(layout, /About/);
  assert.match(layout, /icon\.png/);
  assert.match(layout, /footer\.jpg/);
  assert.match(layout, /nav-link/);
  assert.match(layout, /MobileNav/);
  assert.match(mobileNav, /"use client"/);
  assert.match(mobileNav, /useState/);
  assert.match(mobileNav, /pointerdown/);
  assert.match(mobileNav, /Escape/);
  assert.match(mobileNav, /mobile-nav-backdrop/);
  assert.match(mobileNav, /mobile-nav-panel/);
  assert.match(mobileNav, /aria-expanded=\{isOpen\}/);
  assert.match(layout, /scale-\[1\.28\]/);
  assert.match(layout, /icons/);
  assert.match(layout, /icon:\s*"\/images\/icon\.png"/);
  assert.doesNotMatch(layout, /alt="Scarecrow footer icon"/);
});

test("note library declares default note RSS URL and defensive parser", () => {
  const note = read("src/lib/note.ts");
  assert.match(note, /https:\/\/note\.com\/scarecorow0222\/rss/);
  assert.match(note, /export async function getNoteArticles/);
  assert.match(note, /export function parseNoteRss/);
  assert.match(note, /NOTE_RSS_REVALIDATE_SECONDS\s*=\s*600/);
  assert.match(note, /fast-xml-parser/);
});

test("note parser strips html descriptions and normalizes item fields", () => {
  const note = read("src/lib/note.ts");
  assert.match(note, /replace\(\s*\/<\[\^>\]\*>\/g/);
  assert.match(note, /title/);
  assert.match(note, /link/);
  assert.match(note, /publishedAt/);
  assert.match(note, /excerpt/);
});

test("note parser supports note media thumbnail text nodes", () => {
  const note = read("src/lib/note.ts");
  assert.match(note, /type MediaValue/);
  assert.match(note, /resolveImageValue/);
  assert.match(note, /media:thumbnail/);
  assert.match(note, /typeof value === "string"/);
});

test("home page renders hero, logs, projects, and philosophy sections", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /深夜の作業部屋から/);
  assert.match(page, /keep-phrase/);
  assert.match(page, /hero-title/);
  assert.match(page, /Latest Logs/);
  assert.match(page, /target="_blank"/);
  assert.match(page, /rel="noopener noreferrer"/);
  assert.match(page, /article\.image/);
  assert.match(page, /note-article-media/);
  assert.match(page, /md:grid-cols-\[176px_minmax\(0,1fr\)\]/);
  assert.match(page, /Projects/);
  assert.match(page, /Philosophy/);
  assert.match(page, /getNoteArticles\(3\)/);
  assert.match(page, /top\.jpg/);
  assert.match(page, /philosophy\.jpg/);
  assert.match(page, /hero-scene/);
  assert.match(page, /hero-copy/);
  assert.match(page, /hero-visual/);
  assert.doesNotMatch(page, new RegExp("深夜の作業部屋から、\\s*<br />\\s*記録を残していく。"));
  assert.match(page, /projects-grid/);
  assert.match(page, /philosophy-scene/);
  assert.match(page, /philosophy-copy/);
  assert.match(page, /philosophy-visual/);
  assert.match(
    page,
    /効率だけを追わず、/
  );
  assert.match(page, /丁寧に考えることを/);
  assert.match(page, /大切にしたい。/);
  assert.match(page, /philosophy-text/);
  assert.doesNotMatch(page, /hero-socials/);
  assert.doesNotMatch(page, /https:\/\/github\.com/);
  assert.doesNotMatch(page, /https:\/\/x\.com/);
});

test("route pages for logs, projects, and about are present", () => {
  const logs = read("src/app/logs/page.tsx");
  const projectsPage = read("src/app/projects/page.tsx");
  const about = read("src/app/about/page.tsx");

  assert.match(logs, /noteの記事/);
  assert.match(logs, /target="_blank"/);
  assert.match(logs, /rel="noopener noreferrer"/);
  assert.match(logs, /article\.image/);
  assert.match(logs, /note-article-media/);
  assert.match(logs, /md:grid-cols-\[220px_minmax\(0,1fr\)\]/);
  assert.match(logs, /まだ記事を取得できませんでした/);
  assert.match(logs, /lanthanum\.jpg/);
  assert.match(logs, /intro-scene/);
  assert.match(logs, /intro-visual/);
  assert.match(logs, new RegExp("考えたこと、試したこと、うまくいかなかったことも含めて、\\s*<br />\\s*夜の作業メモを積み上げています。"));

  assert.match(projectsPage, /制作物/);
  assert.match(projectsPage, /projects\.png/);
  assert.match(projectsPage, /intro-scene/);
  assert.match(projectsPage, /intro-visual/);
  assert.match(projectsPage, /projects-grid/);
  assert.doesNotMatch(projectsPage, /gap-px/);

  assert.match(about, /Scarecrowについて/);
  assert.match(about, /icon\.png/);
  assert.match(about, /about-scene/);
  assert.match(about, /scale-\[1\.18\]/);
  assert.match(about, /https:\/\/note\.com\/scarecorow0222/);
  assert.match(about, /https:\/\/x\.com\/Scarecrow0222/);
  assert.equal((about.match(/target="_blank"/g) || []).length, 2);
  assert.equal((about.match(/rel="noopener noreferrer"/g) || []).length, 2);
  assert.equal((about.match(/border-y border-\[#6f5a42\]\/35/g) || []).length, 0);
});

test("global styles blend text and images into a unified scene", () => {
  const styles = read("src/app/globals.css");
  assert.match(styles, /\.hero-scene/);
  assert.match(styles, /\.hero-title/);
  assert.match(styles, /\.hero-copy/);
  assert.match(styles, /\.hero-visual/);
  assert.match(styles, /\.image-wash/);
  assert.match(styles, /\.projects-grid/);
  assert.match(styles, /\.intro-scene/);
  assert.match(styles, /\.intro-visual/);
  assert.match(styles, /\.about-scene/);
  assert.match(styles, /\.philosophy-scene/);
  assert.match(styles, /\.philosophy-text/);
  assert.match(styles, /\.keep-phrase/);
  assert.match(styles, /\.philosophy-visual/);
  assert.match(styles, /\.nav-link::after/);
  assert.match(styles, /\.mobile-nav-toggle/);
  assert.match(styles, /\.mobile-nav-menu/);
  assert.match(styles, /\.mobile-nav-panel/);
  assert.match(styles, /\.mobile-nav-backdrop/);
  assert.match(styles, /translateX\(100%\)/);
  assert.match(styles, /100dvh/);
  assert.match(styles, /\.mobile-nav-menu\[data-open="true"\]/);
  assert.match(styles, /transition:\s*opacity 180ms ease, visibility 180ms ease/);
  assert.match(styles, /transition:\s*transform 220ms ease/);
  assert.match(styles, /@media \(max-width: 767px\)/);
  assert.match(styles, /font-size: clamp\(1\.7rem, 9\.5vw, 2\.65rem\)/);
  assert.match(styles, /word-break: keep-all/);
  assert.match(styles, /\.section-band/);
  assert.match(styles, /min-height: clamp\(420px, 64vh, 620px\)/);
  assert.doesNotMatch(styles, /border-left: 1px solid rgba\(111, 90, 66, 0\.34\)/);
});

test("page design avoids over-fragmenting content into framed cards", () => {
  const appSources = [
    read("src/app/page.tsx"),
    read("src/app/logs/page.tsx"),
    read("src/app/projects/page.tsx"),
    read("src/app/about/page.tsx")
  ].join("\n");
  const panelCount = (appSources.match(/paper-panel/g) || []).length;
  const frameCount = (appSources.match(/story-frame/g) || []).length;

  assert.ok(panelCount <= 2, `paper-panel appears ${panelCount} times`);
  assert.ok(frameCount <= 3, `story-frame appears ${frameCount} times`);
});

test("project data contains first release cards", () => {
  const projects = read("src/data/projects.ts");
  assert.match(projects, /Scarecrow Web/);
  assert.match(projects, /AI Chat ツール/);
  assert.match(projects, /リソース管理アプリ/);
  assert.match(projects, /成長記録アプリ/);
});
