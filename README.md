# NovaTech Computer Store
**Run:** open `index.html` in a browser (internet needed for GSAP + Google Fonts CDNs), or serve with `npx serve` / VS Code Live Server.
**Structure:** root pages `*.html`; `css/` (style, dashboard); `js/` (main = UI, animations = GSAP, validation, dashboard); `assets/` (logo, images).
**Tech:** HTML5, CSS3, vanilla JS, GSAP 3 + ScrollTrigger (cdnjs). No frameworks/backend.
**GSAP:** `js/animations.js` — a loader timeline (index only) then `start()`: hero timeline, `ScrollTrigger.batch` reveals for `[data-r]`, pinned horizontal scroll (desktop only; native swipe on mobile), sticky steps, counters (`data-n`), tilt (`.tilt`), magnetic buttons (`.mag`). Disabled under `prefers-reduced-motion`.
**Validation:** `js/validation.js`. Add `data-validate` to a form and `data-v="name|email|pass|confirm|phone|text|check"` to inputs. Names: letters/space/hyphen; email: `x@y.tld`; password: 8+ chars; show/hide via `data-eye`.
**Logo:** overwrite `assets/logo/logo.webp` (or change the `src` in `js/` HTML files to your PNG). Sizing lives in `.logo img` in `css/style.css`.
**Images:** product visuals are SVG illustrations in `assets/images/`. Swap any with your own photo:  `<img src="assets/images/x.jpg" alt="..." loading="lazy">`.
**Dashboards:** `admin-dashboard.html` (sidebar panels switch via `data-p`) and `public-dashboard.html` (customer view). Both use demo data; login lets you choose a dashboard and validates email/password format only (no backend authentication).

Pages use full-bleed background scenes (`assets/images/bg-*.svg`); set one with `style="--bg:url(...)"` on a `.bgs` section. Blog articles are demo tiles (no article pages).

## Photos and video
Photos are hotlinked from Unsplash (free under the Unsplash License; credit appreciated): Andrey Matveev, sdl sanjaya, Joshua Kettle, Gavin Phillips, Mymoon Humayun. If a photo cannot load, the matching illustration in `assets/images/` shows instead. Photo classes (`im-u1`..`im-u5`) are defined at the end of `css/style.css`; change the URL there to use your own photo.
About-page hero video: put an MP4 at `assets/videos/hero.mp4` (muted, looping, autoplays). Until then the hero shows the photo.
