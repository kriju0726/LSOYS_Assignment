# Magic Memory — React Frontend

A simple, fast memory card-matching game built with **React 17** (Create React App v4). 
It features flip animations, a timer with start/pause/resume, a “New Game” control, a running turn counter, a persisted best score, background video, and sound effects for matches, mismatches, and win.

> **Run locally:** `npm run start`

---

## 1) Setup

### Prerequisites
- **Node.js**: 16.x–20.x recommended (the scripts already include the `--openssl-legacy-provider` flag for newer Node versions).
- **npm**: comes with Node.

### Install & Run
```bash
# from the project root
npm install
npm run start
```
This launches the dev server at http://localhost:3000 (default).

### Build for production
```bash
npm run build
```
The production build is emitted to the `build/` folder.

> **Why the openssl flag?** `react-scripts@4` can error on newer Node versions; the scripts here already set `--openssl-legacy-provider` to avoid the OpenSSL error.

---

## 2) Project Structure (high level)

```
.
├─ public/
│  ├─ img/                # card faces + cover
│  ├─ music/              # match / notMatch / winner sounds
│  ├─ vdo.mp4             # background looping video
│  └─ index.html
├─ src/
│  ├─ components/
│  │  ├─ Controls.js      # New Game button
│  │  ├─ ScoreBoard.js    # High Score + Turns
│  │  ├─ Timer.js         # Start / Pause / Resume controls + time
│  │  ├─ SingleCard.js    # flip card component
│  │  └─ SingleCard.css   # flip animation
│  ├─ hooks/
│  │  ├─ useTimer.js      # timer state & interval
│  │  └─ useGameLogic.js  # shuffling, matching, turns, sounds, win check
│  ├─ utils/
│  │  └─ cardsData.js     # list of card images (6 pairs)
│  ├─ App.js / App.css
│  ├─ index.js / index.css
│  └─ ...
├─ package.json
└─ package-lock.json
```

**Tech stack**
- React 17 with Create React App (react-scripts 4)
- Plain CSS for styles and animations
- HTML5 audio for SFX, video background in `public/index.html`
- `localStorage` for persisting best score

---

## 3) How to Play & Controls

### Controls UI
- **New Game** — shuffles a fresh deck, resets turns and time.
- **Start** — starts the timer.
- **Pause / Resume** — pauses or resumes the timer.

### Game Interaction
- Click/tap on a card to flip it.
- Flip **two** cards:
  - If they **match**, they stay revealed and a *match* sound plays.
  - If they **don’t match**, a *notMatch* sound plays and they flip back after a short delay.
- When all pairs are matched, a *winner* sound plays.
- **Turns** increments after each guess (i.e., after two cards are evaluated).
- **High Score** shows your best result (lowest turns), stored in `localStorage` and kept across sessions.

---

## 4) Features

- 🃏 **Card flip animation** (3D rotation with smooth transitions).
- 🔀 **One-click shuffle** with *New Game*.
- ⏱️ **Timer** with **Start / Pause / Resume**, time resets on New Game.
- 🧮 **Turn counter** and **best (lowest) turns** saved in `localStorage`.
- 🔊 **Sound effects**: `match.mp3`, `notMatch.mp3`, `winner.mp3` (in `public/music/`).
- 🎞️ **Background video** (`public/vdo.mp4`) plays muted & loops.
- 📱 **Responsive container** (centered layout, max width 860px).

---

## 5) Known Issues & Notes

1. **Absolute asset paths**  
   Image and audio sources use root-absolute paths like `/img/...` and `/music/...`.  
   If you deploy under a subpath (e.g., GitHub Pages at `/user/repo`), these can break.  
   **Fix:** Replace with `process.env.PUBLIC_URL + '/img/...'` (and similarly for music) or make the paths relative.

2. **Autoplay policies for media**  
   - Sounds won’t play until after a user interaction (browser policy). This is expected.  
   - The background video is muted and uses `playsInline`, but on some mobile browsers it may not render until after interaction or if the codec isn’t supported.

3. **Node / OpenSSL error on newer Node**  
   This project’s scripts already include the `--openssl-legacy-provider` workaround. If you still see an OpenSSL error, try Node 18 LTS.

4. **Fast clicking during comparison**  
   The code disables clicks while two cards are being compared, but extremely rapid interactions on very slow devices may still feel laggy.

5. **High score semantics**  
   Currently tracks **lowest turns** globally via `localStorage` key `highScore`. If you add difficulty modes later, namespace keys (e.g., `highScore_easy`).

---

## 6) Available npm scripts

- `npm run start` — start the dev server.
- `npm run build` — production build.
- `npm run test` — run tests (CRA default).
- `npm run eject` — eject CRA (irreversible).

---

## 7) Roadmap (optional ideas)

- Difficulty levels (more pairs)
- Confetti / win overlay
- Move-based scoring + time-based scoring
- Sound / music mute toggle
- Accessibility & keyboard focus management

---

**Happy matching!**
