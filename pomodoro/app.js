/* ============================================================
   PomoFlow — app.js
   • Unsplash HD Wallpapers with Authentic Titles & Authors
   • Live Unsplash Search & Custom Unsplash URL Support
   • Live Local Clock & Fullscreen support
   • Focus (⚡) vs Wall Clock (🕒) Mode Pill Switch
   • Direct YouTube Stream Player with Instant Stations & Search
   • Bottom-Left Now Playing Badge (Active only when playing)
   • Pomodoro / Stopwatch / Wall Clock with Session Dot Tracking
   ============================================================ */

'use strict';

const UNSPLASH_ACCESS_KEY = 'b1kdzy1aoxyMd503svOQwpYiThKejm8Lt93Y-viH6nU';

/* ── Curated Unsplash Wallpapers with Authentic Titles & Authors ── */
const BACKGROUNDS = [
  {
    id: 'photo-1506744038136-46273834b3fb',
    label: 'Yosemite Vadisi ve Nehir',
    author: 'Bailey Zindel',
    tags: 'doğa dağ yosemite nehir ağaç valley mountain river nature pine trees'
  },
  {
    id: 'photo-1519681393784-d120267933ba',
    label: 'Karlı Zirveler ve Yıldızlar',
    author: 'Benjamin Voros',
    tags: 'dağ kar kış yıldız gece gökyüzü mountain snow starry night winter alpine'
  },
  {
    id: 'photo-1470071459604-3b5ec3a7fe05',
    label: 'Sisli Çam Ormanı',
    author: 'Ales Krivec',
    tags: 'orman sis ağaç doğa çam foggy pine forest mist nature trees green'
  },
  {
    id: 'photo-1507525428034-b723cf961d3e',
    label: 'Tropikal Deniz ve Gün Batımı',
    author: 'Sean Oulashin',
    tags: 'deniz sahil gün batımı okyanus kumsal beach sunset ocean coast calm'
  },
  {
    id: 'photo-1477346611705-65d1883cee1e',
    label: 'Mavi Dağ Silüetleri',
    author: 'Kalen Emsley',
    tags: 'dağ sis mavi vadi akşam misty blue mountain dusk hills nature'
  },
  {
    id: 'photo-1448375240586-882707db888b',
    label: 'Güneş Işıkları ve Yağmur Ormanı',
    author: 'Sebastian Unrau',
    tags: 'orman güneş ışık yeşil doğa rainforest sunlight rays green nature'
  },
  {
    id: 'photo-1464822759023-fed622ff2c3b',
    label: 'Rainier Dağı ve Alpin Çiçekler',
    author: 'Jerry Zhang',
    tags: 'dağ çiçek alpin gün doğumu mount rainier alpine sunrise landscape'
  },
  {
    id: 'photo-1518495973542-4542c06a5843',
    label: 'Sonbahar Işıltısı ve Patika',
    author: 'Luca Bravo',
    tags: 'sonbahar yaprak yol patika ağaç autumn golden leaves road path cozy'
  },
  {
    id: 'photo-1501785888041-af3ef285b470',
    label: 'Zümrüt Göl ve Yansımalar',
    author: 'Pietro De Grandi',
    tags: 'göl yansıma dağ yeşil su emerald lake reflection alpine nature'
  },
  {
    id: 'photo-1513836279014-a89f7a76ae86',
    label: 'Karlı Çam Ormanı',
    author: 'Roberto Nickson',
    tags: 'kar kış orman çam soğuk winter snow pines cold freeze peaceful'
  },
  {
    id: 'photo-1509316975850-ff9c5deb0cd9',
    label: 'Çöl Kumulları ve Samanyolu',
    author: 'Jeremy Bishop',
    tags: 'çöl kum gece yıldız uzay samanyolu desert sand dunes stars galaxy night'
  },
  {
    id: 'photo-1507525428034-b723cf961d3e',
    label: 'Pastel Gün Batımı ve Kumsal',
    author: 'Sean Oulashin',
    tags: 'kıyı pastel deniz dalga sahil beach pastel sunset waves ocean water'
  },
  {
    id: 'photo-1448375240586-882707db888b',
    label: 'Karanlık ve Masalsı Orman',
    author: 'Sebastian Unrau',
    tags: 'orman karanlık gizemli ağaç sis dark moody forest trees nature mystical'
  },
  {
    id: 'photo-1534447677768-be436bb09401',
    label: 'Kuzey Işıkları ve Fiyortlar',
    author: 'Benjamin Davies',
    tags: 'kuzey ışıkları aurora fiyort norveç northern lights green night fjord'
  },
  {
    id: 'photo-1518837695005-2083093ee35b',
    label: 'Okyanus Dalgası ve Köpükler',
    author: 'Matt Hardy',
    tags: 'okyanus dalga mavi su sörf ocean blue waves surf water marine'
  },
  {
    id: 'photo-1497436072909-60f360e1d4b1',
    label: 'Berrak Alpin Gölet',
    author: 'Andreas Gücklhorn',
    tags: 'göl berrak su dağ doğa crystal clear lake mountain nature serene'
  },
  {
    id: 'photo-1473448912268-2022ce9509d8',
    label: 'Bavyera Vadisinde Sonbahar',
    author: 'Eberhard Grossgasteiger',
    tags: 'sonbahar vadi orman dağ ağaç autumn trees bavaria valley colorful'
  },
  {
    id: 'photo-1500530855697-b586d89ba3ee',
    label: 'Mavi Saatte Dağ Ufku',
    author: 'Greg Rakozy',
    tags: 'dağ mavi saat ufuk gökyüzü sessiz blue hour mountain horizon calm'
  },
  {
    id: 'photo-1520250497591-112f2f40a3f4',
    label: 'Sıcak Işıklı Çalışma Masası',
    author: 'Thought Catalog',
    tags: 'kitap kahve çalışma masa cozy study desk coffee books warm study'
  },
  {
    id: 'photo-1507499739999-097706ad8914',
    label: 'Şelale ve Yosunlu Kayalar',
    author: 'Dan Freeman',
    tags: 'şelale su dere kaya orman waterfall rocks stream moss green nature'
  },
  {
    id: 'photo-1486870591958-9b9d0d1dda99',
    label: 'Karlı Alpler ve Bulut Denizi',
    author: 'Alberto Restifo',
    tags: 'kar kış bulut dağ zirve snowy alps clouds peak dramatic winter'
  },
  {
    id: 'photo-1504701954957-2010ec3bcec1',
    label: 'Sonbahar Ormanında Alacakaranlık',
    author: 'Luca Bravo',
    tags: 'nehir sonbahar sarı yaprak orman autumn river forest leaves stream'
  },
  {
    id: 'photo-1518709268805-4e9042af9f23',
    label: 'Mor Gökyüzü ve Şehir Işıkları',
    author: 'Aleksandar Pasaric',
    tags: 'şehir gece mor ışıklar binalar city night purple cyberpunk skyline'
  },
  {
    id: 'photo-1500382017468-9049fed747ef',
    label: 'Geniş Buğday Tarlası ve Ağaç',
    author: 'Johann Siemens',
    tags: 'tarla çayır ağaç gün batımı buğday wheat field lone tree sunset golden'
  }
];

function bgSrc(id) {
  if (typeof id === 'string' && (id.startsWith('http://') || id.startsWith('https://'))) {
    return id;
  }
  const cleanId = String(id).replace(/^photo-/, '');
  return `https://images.unsplash.com/photo-${cleanId}?auto=format&fit=crop&w=1920&q=85`;
}

function bgThumb(id) {
  if (typeof id === 'string' && (id.startsWith('http://') || id.startsWith('https://'))) {
    return id;
  }
  const cleanId = String(id).replace(/^photo-/, '');
  return `https://images.unsplash.com/photo-${cleanId}?auto=format&fit=crop&w=480&q=75`;
}

/* ── Defaults ───────────────────────────────────────────────── */
const DEFAULTS = { focus: 25, short: 5, long: 15, sessions: 4, autoStart: false };

/* ── Built-in YouTube Database ──────────────────────────────── */
const MUSIC_DATABASE = [
  { videoId: 'rFZHOHl-L8A', title: 'Lofi Girl — Beats to Relax/Study to', author: 'Lofi Girl', duration: 'Canlı Yayın', tags: 'lofi girl beats chill study relax hip hop' },
  { videoId: 'JD-kMIpDfnY', title: 'Lofi Chill Radio', author: 'Lofi Girl', duration: 'Canlı Yayın', tags: 'lofi chill beats relax study sleep' },
  { videoId: 'rPjez8z61rI', title: 'Lofi Hip Hop Radio', author: 'Lofi Hip Hop', duration: 'Canlı Yayın', tags: 'lofi hiphop hip hop beats relax study' },
  { videoId: 'blAFxjhg62k', title: 'Coffee Shop Radio — Relaxing Cafe Music', author: 'Coffee Shop', duration: 'Canlı Yayın', tags: 'coffee shop cafe jazz relax study' },
  { videoId: 'J4lbi9rXDr8', title: 'Lofi Radio — 24/7 Chill Beats', author: 'Lofi Radio', duration: 'Canlı Yayın', tags: 'lofi radio chill beats relax study' },
  { videoId: '4xDzrJKXOOY', title: 'Synthwave Radio — Chill Synth / Retro Beats', author: 'Lofi Girl Synthwave', duration: 'Canlı Yayın', tags: 'synthwave retro 80s chill cyberpunk beats' },
  { videoId: 'vYIYIVmOo3Q', title: 'Rain Lofi — Beats to Study/Relax in the Rain', author: 'Rain Lofi', duration: 'Canlı Yayın', tags: 'rain lofi yağmur chill beats relax study' },
  { videoId: 'CwPCy1GLS38', title: 'Sad Lofi Radio — Emotional Beats', author: 'Sad Lofi', duration: 'Canlı Yayın', tags: 'sad lofi emotional chill beats melancholy' },
  { videoId: 'DWcJFNfaw9c', title: 'Coffee Shop Radio — Relaxing Jazz Piano & Rain', author: 'Cafe Music BGM', duration: '3:45:10', tags: 'jazz cafe coffee shop piano rain relax study' },
  { videoId: 'lTRiuFIWV54', title: 'Deep Focus Music for Studying & Concentration', author: 'Quiet Quest', duration: '4:00:00', tags: 'deep focus study concentration ambient alpha waves' },
  { videoId: 'n61ULEU7CO0', title: 'Forest Birds & Gentle Stream Ambience', author: 'Nature Sounds', duration: '3:00:00', tags: 'nature doğa kuşlar stream forest rain ambient' },
  { videoId: '5yx6BWlEVcY', title: 'Peaceful Piano — Classical Relaxing Music', author: 'HALIDONMUSIC', duration: '2:30:15', tags: 'classical klasik piyano piano mozart chopin study' },
  { videoId: 'q76bMs-dpRk', title: 'Rain & Thunderstorm on a Window for Focus/Sleep', author: 'Relaxing Sounds', duration: '8:00:00', tags: 'rain yağmur fırtına thunder storm sleep relax' },
  { videoId: 'WPni755-Krg', title: 'Ghibli Piano Studio — Relaxing Anime Music', author: 'Anime BGM', duration: '2:15:30', tags: 'anime ghibli miyazaki piano study relax' },
  { videoId: 'tNkZsRW7h2c', title: 'Space Ambient & Deep Cosmos Relaxation', author: 'Space Wave', duration: '4:00:00', tags: 'space uzay cosmos ambient deep sleep study' },
  { videoId: '1fueZCTYkpA', title: 'Ludovico Einaudi — Nuvole Bianche (Modern Piano)', author: 'Ludovico Einaudi', duration: '5:44', tags: 'piano klasik einaudi nuvole bianche study peaceful' },
  { videoId: 'e2qG56A4950', title: 'Hans Zimmer — Interstellar & Film Soundtrack Focus', author: 'Soundtrack Lab', duration: '2:00:00', tags: 'hans zimmer interstellar film soundtrack epic focus study' },
  { videoId: 'MCK76K6u7yU', title: 'Turkish Lofi & Anatolian Chill Beats', author: 'Turk Lofi', duration: '1:30:00', tags: 'türkçe turk anatolian lofi chill beats bağlama study' },
  { videoId: 'L_LUpnjgPso', title: 'Cozy Rain Cafe — Smooth Bossa Nova & Jazz', author: 'Bossa Nova Club', duration: '3:12:00', tags: 'jazz bossa nova cafe coffee rain study' }
];

/* ╔══════════════════════════════════════════════════════════╗
   ║          PARTICLE SYSTEM  (Snow · Rain · etc.)           ║
   ╚══════════════════════════════════════════════════════════╝ */

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.effect = 'snow';
    this.active = true;
    this.flakes = [];
    this.wind = 0;
    this.windTgt = 0;
    this.windTmr = 0;
    this._resize();
    this._init();
    this._loop();
    window.addEventListener('resize', () => this._resize());
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _count() {
    return this.effect === 'rain' ? 260 : this.effect === 'stars' ? 90 : 120;
  }

  _make(scatter = false) {
    const e = this.effect;
    const W = this.canvas.width;
    const H = this.canvas.height;
    const x = Math.random() * W;
    const y = scatter ? Math.random() * H : -20;

    switch (e) {
      case 'rain':
        return {
          x, y, vx: -1.5, vy: 14 + Math.random() * 8,
          r: 0.7 + Math.random() * 0.8, len: 14 + Math.random() * 12,
          alpha: 0.25 + Math.random() * 0.35
        };
      case 'cherry':
        return {
          x, y, vx: (Math.random() - .5) * .6, vy: .6 + Math.random() * 1.2,
          rx: 4 + Math.random() * 3, ry: 2 + Math.random() * 1.5,
          rot: Math.random() * Math.PI * 2, drot: (Math.random() - .5) * .04,
          alpha: .55 + Math.random() * .4, hue: 340 + Math.random() * 20,
          drift: (Math.random() - .5) * .3
        };
      case 'leaves':
        return {
          x, y, vx: (Math.random() - .5) * .8, vy: .8 + Math.random() * 1.4,
          rx: 5 + Math.random() * 4, ry: 2.5 + Math.random() * 2,
          rot: Math.random() * Math.PI * 2, drot: (Math.random() - .5) * .06,
          alpha: .65 + Math.random() * .3, hue: 18 + Math.random() * 30,
          sat: 70 + Math.random() * 20, lit: 40 + Math.random() * 20,
          drift: (Math.random() - .5) * .5
        };
      case 'stars':
        return {
          x, y: scatter ? Math.random() * H : Math.random() * H,
          r: .5 + Math.random() * 1.5, alpha: .3 + Math.random() * .7,
          twinkleSpd: .008 + Math.random() * .02, twinklePhase: Math.random() * Math.PI * 2,
          vx: 0, vy: .04 + Math.random() * .06
        };
      default: // snow
        return {
          x, y, vx: (Math.random() - .5) * .3, vy: .5 + Math.random() * 1.6,
          r: 1 + Math.random() * 3, alpha: .3 + Math.random() * .6,
          drift: (Math.random() - .5) * .2
        };
    }
  }

  _init() {
    this.flakes = [];
    for (let i = 0; i < this._count(); i++) this.flakes.push(this._make(true));
  }

  _update() {
    if (!this.active || this.effect === 'none') return;
    if (['snow', 'cherry', 'leaves'].includes(this.effect)) {
      this.windTmr++;
      if (this.windTmr > 200) { this.windTgt = (Math.random() - .5) * .55; this.windTmr = 0; }
      this.wind += (this.windTgt - this.wind) * .007;
    }
    const W = this.canvas.width, H = this.canvas.height;
    for (const f of this.flakes) {
      switch (this.effect) {
        case 'rain': f.x += f.vx; f.y += f.vy; break;
        case 'cherry': case 'leaves':
          f.x += f.vx + this.wind + f.drift; f.y += f.vy; f.rot += f.drot; break;
        case 'stars': f.y += f.vy; f.twinklePhase += f.twinkleSpd; break;
        default: f.x += f.vx + this.wind + f.drift; f.y += f.vy;
      }
      if (f.y > H + 30) Object.assign(f, this._make(false));
      if (f.x > W + 20) f.x = -10;
      if (f.x < -20) f.x = W + 10;
    }
  }

  _draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.active || this.effect === 'none') return;
    for (const f of this.flakes) {
      this.ctx.save();
      switch (this.effect) {
        case 'rain':
          this.ctx.globalAlpha = f.alpha;
          this.ctx.strokeStyle = 'rgba(180,215,255,.85)';
          this.ctx.lineWidth = f.r;
          this.ctx.beginPath();
          this.ctx.moveTo(f.x, f.y);
          this.ctx.lineTo(f.x + f.vx * .6, f.y - f.len);
          this.ctx.stroke(); break;
        case 'cherry':
          this.ctx.translate(f.x, f.y); this.ctx.rotate(f.rot);
          this.ctx.globalAlpha = f.alpha;
          this.ctx.fillStyle = `hsl(${f.hue},75%,82%)`;
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, f.rx, f.ry, 0, 0, Math.PI * 2); this.ctx.fill(); break;
        case 'leaves':
          this.ctx.translate(f.x, f.y); this.ctx.rotate(f.rot);
          this.ctx.globalAlpha = f.alpha;
          this.ctx.fillStyle = `hsl(${f.hue},${f.sat}%,${f.lit}%)`;
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, f.rx, f.ry, 0, 0, Math.PI * 2); this.ctx.fill();
          this.ctx.globalAlpha = f.alpha * .3;
          this.ctx.strokeStyle = `hsl(${f.hue},40%,20%)`;
          this.ctx.lineWidth = .5;
          this.ctx.beginPath(); this.ctx.moveTo(-f.rx, 0); this.ctx.lineTo(f.rx, 0); this.ctx.stroke(); break;
        case 'stars': {
          const p = .5 + .5 * Math.sin(f.twinklePhase);
          this.ctx.globalAlpha = f.alpha * (.4 + .6 * p);
          this.ctx.fillStyle = '#ffffff';
          this.ctx.beginPath();
          this.ctx.arc(f.x, f.y, f.r * (.8 + .4 * p), 0, Math.PI * 2); this.ctx.fill();
          if (f.r > 1.2) {
            this.ctx.globalAlpha = f.alpha * .15 * p;
            this.ctx.beginPath(); this.ctx.arc(f.x, f.y, f.r * 3.5, 0, Math.PI * 2); this.ctx.fill();
          }
          break;
        }
        default: // snow
          this.ctx.globalAlpha = f.alpha;
          this.ctx.fillStyle = '#ffffff';
          this.ctx.beginPath(); this.ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); this.ctx.fill();
          if (f.r > 2) {
            this.ctx.globalAlpha = f.alpha * .25;
            this.ctx.beginPath(); this.ctx.arc(f.x, f.y, f.r * 2.5, 0, Math.PI * 2); this.ctx.fill();
          }
      }
      this.ctx.restore();
    }
  }

  _loop() {
    this._update();
    this._draw();
    requestAnimationFrame(() => this._loop());
  }

  setEffect(effect) {
    this.effect = effect;
    this.active = effect !== 'none';
    this.wind = 0;
    this._init();
  }

  toggle() {
    this.active = !this.active;
    if (this.active && this.effect === 'none') this.effect = 'snow';
    return this.active;
  }
}

/* ╔══════════════════════════════════════════════════════════╗
   ║               POMODORO TIMER                             ║
   ╚══════════════════════════════════════════════════════════╝ */

class Timer {
  constructor(cfg) {
    this.cfg = { ...DEFAULTS, ...cfg };
    this.mode = 'focus';          // 'focus' | 'short' | 'long'
    this.displayMode = 'pomodoro'; // 'pomodoro' | 'stopwatch' | 'clock'
    this.running = false;
    this.timeLeft = this.cfg.focus * 60;
    this.elapsed = 0;
    this.interval = null;
    this.sessions = 0;
    this.focusSec = 0;

    this.onTick = null;
    this.onDone = null;
    this.onMode = null;
  }

  get isStopwatch() { return this.displayMode === 'stopwatch'; }
  get isClock() { return this.displayMode === 'clock'; }

  get seconds() {
    return this.isStopwatch ? this.elapsed : this.timeLeft;
  }

  get formatted() {
    if (this.isClock) {
      const now = new Date();
      return {
        m: String(now.getHours()).padStart(2, '0'),
        s: String(now.getMinutes()).padStart(2, '0'),
      };
    }
    const t = this.seconds;
    return {
      m: String(Math.floor(t / 60)).padStart(2, '0'),
      s: String(t % 60).padStart(2, '0'),
    };
  }

  get duration() { return this.cfg[this.mode] * 60; }

  start() {
    if (this.running || this.isClock) return;
    this.running = true;
    this.interval = setInterval(() => this._tick(), 1000);
  }

  pause() {
    if (!this.running) return;
    this.running = false;
    clearInterval(this.interval);
    this.interval = null;
  }

  toggle() {
    if (this.isClock) return false;
    this.running ? this.pause() : this.start();
    return this.running;
  }

  reset() {
    this.pause();
    this.elapsed = 0;
    this.timeLeft = this.duration;
    this.onTick?.();
  }

  _tick() {
    if (this.isStopwatch) {
      this.elapsed++;
      if (this.mode === 'focus') this.focusSec++;
    } else {
      if (this.mode === 'focus') this.focusSec++;
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.onTick?.();
        this._done();
        return;
      }
    }
    this.onTick?.();
  }

  _done() {
    this.pause();
    if (this.mode === 'focus') {
      this.sessions++;
      this.onDone?.('focus', this.sessions % this.cfg.sessions === 0);
    } else {
      this.onDone?.(this.mode, false);
    }
  }

  setMode(mode) {
    this.pause();
    this.mode = mode;
    this.timeLeft = this.cfg[mode] * 60;
    this.elapsed = 0;
    this.onTick?.();
    this.onMode?.(mode);
  }

  setDisplayMode(mode) {
    this.pause();
    this.displayMode = mode;
    if (mode === 'clock') this.elapsed = 0;
    this.onTick?.();
  }

  addMinutes(m) {
    if (this.isStopwatch || this.isClock) return;
    this.timeLeft += m * 60;
    this.onTick?.();
  }

  updateConfig(newCfg) {
    this.cfg = { ...this.cfg, ...newCfg };
    if (!this.running) {
      this.timeLeft = this.duration;
      this.onTick?.();
    }
  }
}

/* ╔══════════════════════════════════════════════════════════╗
   ║            YOUTUBE  (Native IFrame Player & Search)      ║
   ╚══════════════════════════════════════════════════════════╝ */

class YouTubeManager {
  constructor() {
    this.videoId = null;
    this.isPlaying = false;
    this.isLooping = JSON.parse(localStorage.getItem('ff-yt-loop') ?? 'true');
    this.volume = 80;
    this.favorites = JSON.parse(localStorage.getItem('ff-yt-favs') || '[]');
    this.currentMeta = null;
    this._initEvents();
  }

  _initEvents() {
    window.addEventListener('message', e => {
      try {
        const msg = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (!msg) return;

        let state = null;
        if (msg.event === 'infoDelivery' && msg.info && typeof msg.info.playerState !== 'undefined') {
          state = msg.info.playerState;
        } else if (msg.event === 'onStateChange') {
          state = typeof msg.info === 'number' ? msg.info : msg.info?.playerState;
        } else if (msg.event === 'initialDelivery' && msg.info && typeof msg.info.playerState !== 'undefined') {
          state = msg.info.playerState;
        }

        if (state !== null && state !== undefined) {
          if (state === 1) {
            this.isPlaying = true;
          } else if (state === 0) {
            // Video ended: seamlessly replay from beginning if looping is enabled
            if (this.isLooping) {
              this.isPlaying = true;
              this._sendCmd('seekTo', [0, true]);
              this._sendCmd('playVideo');
            } else {
              this.isPlaying = false;
            }
          } else if (state === 2 || state === -1 || state === 5) {
            this.isPlaying = false;
          }
          this._syncUI();
        }
      } catch (_) { }
    });

    const iframe = document.getElementById('yt-player-iframe');
    if (iframe) {
      iframe.addEventListener('load', () => {
        try {
          iframe.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), '*');
          if (this.isLooping) {
            this._sendCmd('setLoop', [true]);
          }
        } catch (_) { }
      });
    }
  }

  _sendCmd(func, args = []) {
    const iframe = document.getElementById('yt-player-iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: func,
        args: args
      }), '*');
    }
  }

  load(input, chipEl = null) {
    const id = this.extractId(input);
    if (!id) return false;

    // Highlight active chip if provided
    document.querySelectorAll('.stations-chips .chip').forEach(c => c.classList.remove('chip-active'));
    if (chipEl) {
      chipEl.classList.add('chip-active');
    } else {
      const matchChip = document.querySelector(`.stations-chips .chip[data-vid="${id}"]`);
      if (matchChip) matchChip.classList.add('chip-active');
    }

    this.videoId = id;
    this._showCard();
    this._fetchMeta(id);

    const iframe = document.getElementById('yt-player-iframe');
    if (iframe) {
      const loopParam = this.isLooping ? `&loop=1&playlist=${id}` : '';
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&enablejsapi=1&playsinline=1&rel=0&iv_load_policy=3${loopParam}`;
      this.isPlaying = true;
      this._syncUI();
    }
    return true;
  }

  togglePlay() {
    if (this.isPlaying) {
      this._sendCmd('pauseVideo');
      this.isPlaying = false;
    } else {
      this._sendCmd('playVideo');
      this.isPlaying = true;
    }
    this._syncUI();
  }

  setVolume(v) {
    this.volume = v;
    this._sendCmd('setVolume', [v]);
    this._sendCmd('unMute');
  }

  toggleLoop() {
    this.isLooping = !this.isLooping;
    localStorage.setItem('ff-yt-loop', JSON.stringify(this.isLooping));
    this.syncLoopButton();
    this._sendCmd('setLoop', [this.isLooping]);
    return this.isLooping;
  }

  syncLoopButton() {
    const loopBtn = document.getElementById('yt-np-loop-btn');
    if (loopBtn) {
      loopBtn.classList.toggle('active', this.isLooping);
      loopBtn.title = this.isLooping
        ? 'Döngü Modu (Açık — Sürekli Tekrarla)'
        : 'Döngü Modu (Kapalı)';
    }
  }

  async _fetchMeta(id) {
    const titleEl = document.getElementById('yt-np-title');
    const chanEl = document.getElementById('yt-np-channel');
    if (titleEl) titleEl.textContent = 'Yükleniyor…';
    if (chanEl) chanEl.textContent = '';

    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=https://youtu.be/${id}&format=json`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (titleEl) titleEl.textContent = data.title;
      if (chanEl) chanEl.textContent = data.author_name;
      this.currentMeta = { id, title: data.title, channel: data.author_name };
    } catch (_) {
      const match = MUSIC_DATABASE.find(m => m.videoId === id);
      const title = match ? match.title : 'Şu An Oynatılıyor';
      const chan = match ? match.author : 'YouTube';
      if (titleEl) titleEl.textContent = title;
      if (chanEl) chanEl.textContent = chan;
      this.currentMeta = { id, title: title, channel: chan };
    }

    this.syncFavButton();
    this.syncLoopButton();
    this._syncUI();
  }

  syncFavButton() {
    const favBtn = document.getElementById('yt-np-fav-btn');
    if (favBtn && this.videoId) {
      const isFav = this.favorites.some(f => f.id === this.videoId);
      favBtn.classList.toggle('saved', isFav);
    }
  }

  _showCard() {
    document.getElementById('yt-now-playing')?.classList.remove('hidden');
    this.syncLoopButton();
  }

  _syncUI() {
    const icon = document.getElementById('yt-pp-icon');
    if (icon) {
      if (this.isPlaying) {
        icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      } else {
        icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      }
    }

    document.getElementById('yt-playing-badge')?.classList.toggle('hidden', !this.isPlaying);
    const isYtOpen = !document.getElementById('youtube-widget')?.classList.contains('hidden');
    document.getElementById('btn-music')?.classList.toggle('active', isYtOpen);
    document.getElementById('yt-backdrop')?.classList.toggle('hidden', !isYtOpen);

    // Sync bottom-left floating Now Playing pill (only visible when actively playing)
    const bnp = document.getElementById('bottom-now-playing');
    const bnpTitle = document.getElementById('bnp-title');
    const bnpArtist = document.getElementById('bnp-artist');

    if (bnp) {
      if (this.videoId && this.isPlaying) {
        bnp.classList.remove('hidden');
        bnp.classList.remove('paused');
        if (bnpTitle) bnpTitle.textContent = this.currentMeta?.title || 'YouTube Müzik';
        if (bnpArtist) bnpArtist.textContent = this.currentMeta?.channel || 'YouTube';
        bnp.title = `${this.currentMeta?.title || 'Müzik'} — Oynatılıyor (Aç/Kapat)`;
      } else {
        bnp.classList.add('paused');
        bnp.classList.add('hidden');
      }
    }
  }

  extractId(input) {
    if (!input) return null;
    input = input.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
    const patterns = [
      /[?&]v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /embed\/([a-zA-Z0-9_-]{11})/,
      /shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const r of patterns) {
      const m = input.match(r);
      if (m) return m[1];
    }
    return null;
  }

  toggleFavoriteCurrent() {
    if (!this.videoId) return;
    const isFav = this.favorites.some(f => f.id === this.videoId);
    if (isFav) {
      this.favorites = this.favorites.filter(f => f.id !== this.videoId);
    } else {
      this.favorites.push({
        id: this.videoId,
        title: this.currentMeta?.title || 'YouTube Video',
        channel: this.currentMeta?.channel || 'YouTube'
      });
    }
    localStorage.setItem('ff-yt-favs', JSON.stringify(this.favorites));
    this.syncFavButton();
  }
}

/* ╔══════════════════════════════════════════════════════════╗
   ║               COMPLETION CHIME                           ║
   ╚══════════════════════════════════════════════════════════╝ */

function playChime() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ac.createOscillator(), gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.type = 'sine'; osc.frequency.value = freq;
      const t = ac.currentTime + i * .14;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(.35, t + .04);
      gain.gain.exponentialRampToValueAtTime(.001, t + .65);
      osc.start(t); osc.stop(t + .7);
    });
  } catch (_) { }
}

/* ╔══════════════════════════════════════════════════════════╗
   ║               MAIN APPLICATION INIT                      ║
   ╚══════════════════════════════════════════════════════════╝ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Load persisted state ─────────────────────────────── */
  const savedCfg = JSON.parse(localStorage.getItem('ff-settings') || '{}');

  // Restore user selection or choose a random Unsplash wallpaper on first load
  const storedBg = localStorage.getItem('ff-bg-id');
  const isValidBg = storedBg &&
    !storedBg.includes('source.unsplash.com') && // invalidate old source.unsplash URLs
    (
      BACKGROUNDS.some(b => b.id === storedBg) ||
      storedBg.startsWith('http://') ||
      storedBg.startsWith('https://') ||
      storedBg.startsWith('photo-')
    );

  let initialBgId;
  if (isValidBg) {
    initialBgId = storedBg;
  } else {
    const randIdx = Math.floor(Math.random() * BACKGROUNDS.length);
    initialBgId = BACKGROUNDS[randIdx].id;
    localStorage.setItem('ff-bg-id', initialBgId);
  }

  const savedBgId = initialBgId;
  const savedEffect = localStorage.getItem('ff-effect') || 'snow';
  const savedOpacity = parseFloat(localStorage.getItem('ff-opacity') || '0.30');

  /* ── Init systems ─────────────────────────────────────── */
  const canvas = document.getElementById('particle-canvas');
  const particles = new ParticleSystem(canvas);
  const timer = new Timer(savedCfg);
  const yt = new YouTubeManager();

  particles.setEffect(savedEffect);

  /* ── DOM shortcuts ────────────────────────────────────── */
  const bgLayer = document.getElementById('bg-layer');
  const bgOverlayEl = document.getElementById('bg-overlay');
  const timerM = document.getElementById('timer-m');
  const timerS = document.getElementById('timer-s');
  const timerDisp = document.getElementById('timer-display');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  const stopwatchBtn = document.getElementById('stopwatch-btn');
  const totalFocusEl = document.getElementById('total-focus-time');
  const appEl = document.getElementById('app');
  const quickAddRow = document.getElementById('quick-add-row');
  const clockEl = document.getElementById('live-clock-display');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const fsExpandIcon = document.getElementById('fs-expand-icon');
  const fsCompressIcon = document.getElementById('fs-compress-icon');
  const switchFocusBtn = document.getElementById('switch-focus-btn');
  const switchClockBtn = document.getElementById('switch-clock-btn');

  /* ══════════════════════════════════════════════════════
     LIVE HEADER CLOCK & FULLSCREEN
     ══════════════════════════════════════════════════ */

  function updateHeaderClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) {
      clockEl.textContent = `${h}:${m}`;
      clockEl.title = `Yerel Saat: ${h}:${m}:${s}`;
    }
  }
  updateHeaderClock();
  setInterval(updateHeaderClock, 1000);

  // Fullscreen toggle
  btnFullscreen?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
    } else {
      document.exitFullscreen().catch(() => { });
    }
  });

  document.addEventListener('fullscreenchange', () => {
    const isFs = !!document.fullscreenElement;
    fsExpandIcon?.classList.toggle('hidden', isFs);
    fsCompressIcon?.classList.toggle('hidden', !isFs);
  });

  /* ══════════════════════════════════════════════════════
     FOCUS (⚡) VS WALL CLOCK (🕒) PILL SWITCH
     ══════════════════════════════════════════════════ */

  function setAppDisplayMode(mode) {
    if (mode === 'clock') {
      switchClockBtn?.classList.add('active');
      switchFocusBtn?.classList.remove('active');
      appEl.classList.add('clock-active');
      timer.setDisplayMode('clock');
    } else {
      switchFocusBtn?.classList.add('active');
      switchClockBtn?.classList.remove('active');
      appEl.classList.remove('clock-active');
      timer.setDisplayMode('pomodoro');
    }
    renderTimer();
    renderStartBtn();
  }

  switchFocusBtn?.addEventListener('click', () => setAppDisplayMode('pomodoro'));
  switchClockBtn?.addEventListener('click', () => setAppDisplayMode('clock'));

  /* ══════════════════════════════════════════════════════
     UNSPLASH BACKGROUNDS & SEARCH
     ══════════════════════════════════════════════════ */

  let activeBg = savedBgId;

  function applyBg(bgIdOrUrl) {
    activeBg = bgIdOrUrl;
    bgLayer.style.backgroundImage = `url("${bgSrc(bgIdOrUrl)}")`;
    localStorage.setItem('ff-bg-id', bgIdOrUrl);
    document.querySelectorAll('.bg-photo-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === String(bgIdOrUrl));
    });
  }

  function setOverlayOpacity(val) {
    const alpha = (val / 100).toFixed(2);
    bgOverlayEl.style.background = `rgba(0,0,0,${alpha})`;
    localStorage.setItem('ff-opacity', alpha);
  }

  const opSlider = document.getElementById('overlay-opacity');
  if (opSlider) {
    opSlider.value = Math.round(savedOpacity * 100);
    setOverlayOpacity(Math.round(savedOpacity * 100));
    opSlider.addEventListener('input', () => setOverlayOpacity(Number(opSlider.value)));
  }

  // Render Background Grid
  const bgGrid = document.getElementById('bg-photo-grid');
  function unsplashPageUrl(id) {
    if (typeof id === 'string' && (id.startsWith('http://') || id.startsWith('https://'))) {
      // For full URLs from API search, link to Unsplash search instead
      return `https:/images.unsplash.com`;
    }
    const cleanId = String(id);
    return `https:/images.unsplash.com/${cleanId}`;
  }

  function renderBgGrid(items = BACKGROUNDS) {
    if (!bgGrid) return;
    bgGrid.innerHTML = '';

    if (items.length === 0) {
      bgGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 28px; color: var(--w50); font-size: 13px;">Aradığınız kriterlere uygun Unsplash görseli bulunamadı.</div>';
      return;
    }

    items.forEach(bg => {
      const el = document.createElement('div');
      el.className = `bg-photo-item${String(bg.id) === String(activeBg) ? ' active' : ''}`;
      el.dataset.id = bg.id;
      el.innerHTML = `
        <img src="${bgThumb(bg.id)}" alt="${bg.label}" loading="lazy">
        <a class="bg-unsplash-link" href="${unsplashPageUrl(bg.id)}" target="_blank" rel="noopener" title="Unsplash'ta görüntüle" onclick="event.stopPropagation()">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
        <div class="bg-photo-label">
          <div class="bg-photo-title">${bg.label}</div>
          <div class="bg-photo-author">${bg.author ? `${bg.author} • Unsplash` : 'Unsplash'}</div>
        </div>
      `;
      el.addEventListener('click', () => applyBg(bg.id));
      bgGrid.appendChild(el);
    });
  }
  renderBgGrid();
  applyBg(savedBgId);

  // ── Unsplash API v1 Search ───────────────────────────────
  const bgSearchInput = document.getElementById('bg-search-input');
  const bgSearchBtn = document.getElementById('bg-search-btn');

  function renderApiResults(photos, query) {
    if (!bgGrid) return;
    bgGrid.innerHTML = '';
    if (!photos || photos.length === 0) {
      bgGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:28px;color:var(--w50);font-size:13px;">"${query}" için Unsplash'ta sonuç bulunamadı.</div>`;
      return;
    }
    photos.forEach(photo => {
      const el = document.createElement('div');
      const fullUrl = photo.urls.full;
      const thumbUrl = photo.urls.small;
      const label = photo.alt_description || photo.description || query;
      const author = photo.user?.name || 'Unsplash';
      el.className = `bg-photo-item${fullUrl === activeBg ? ' active' : ''}`;
      el.dataset.id = fullUrl;
      el.innerHTML = `
        <img src="${thumbUrl}" alt="${label}" loading="lazy">
        <div class="bg-photo-label">
          <div class="bg-photo-title">${label.charAt(0).toUpperCase() + label.slice(1)}</div>
          <div class="bg-photo-author">${author} • Unsplash</div>
        </div>
      `;
      el.addEventListener('click', () => applyBg(fullUrl));
      bgGrid.appendChild(el);
    });
  }

  async function searchUnsplashApi(query) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.warn('Unsplash API error:', err);
      return null;
    }
  }

  async function doUnsplashSearch() {
    const q = bgSearchInput ? bgSearchInput.value.trim() : '';
    if (!q) { renderBgGrid(BACKGROUNDS); return; }

    if (bgGrid) bgGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:28px;color:var(--w50);font-size:13px;">Unsplash'ta aranıyor…</div>`;

    const photos = await searchUnsplashApi(q);
    if (photos === null) {
      // API failed — fall back to local curated list
      const localMatches = BACKGROUNDS.filter(b =>
        b.label.toLowerCase().includes(q.toLowerCase()) ||
        (b.author && b.author.toLowerCase().includes(q.toLowerCase())) ||
        (b.tags && b.tags.toLowerCase().includes(q.toLowerCase()))
      );
      renderBgGrid(localMatches.length > 0 ? localMatches : BACKGROUNDS);
      showToast('⚠️ Unsplash\'a ulaşılamadı, yerel liste gösteriliyor.');
      return;
    }
    renderApiResults(photos, q);
  }

  bgSearchBtn?.addEventListener('click', doUnsplashSearch);

  bgSearchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); doUnsplashSearch(); }
  });

  // While typing: fast local filter (no API calls per keystroke)
  bgSearchInput?.addEventListener('input', () => {
    const q = bgSearchInput.value.trim();
    if (!q) { renderBgGrid(BACKGROUNDS); return; }
    const localMatches = BACKGROUNDS.filter(b =>
      b.label.toLowerCase().includes(q.toLowerCase()) ||
      (b.author && b.author.toLowerCase().includes(q.toLowerCase())) ||
      (b.tags && b.tags.toLowerCase().includes(q.toLowerCase()))
    );
    if (localMatches.length > 0) {
      renderBgGrid(localMatches);
    } else if (bgGrid) {
      bgGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--w50);font-size:12px;line-height:1.6;">
        Yerel listede eşleşme yok.<br>
        <span style="color:var(--w80);">Enter veya → ile Unsplash API'de ara.</span>
      </div>`;
    }
  });

  // Extract Unsplash Photo ID from URL or apply direct URL
  function extractUnsplashId(url) {
    if (!url) return null;
    url = url.trim();
    // match https://images.unsplash.com/photo-1506744038136-46273834b3fb...
    const m1 = url.match(/photo-([a-zA-Z0-9_-]+)/);
    if (m1) return `photo-${m1[1]}`;
    // match https://unsplash.com/photos/yosemite-valley-1506744038136 or id
    const m2 = url.match(/unsplash\.com\/photos\/[a-zA-Z0-9_.-]+-([a-zA-Z0-9_-]{10,})/);
    if (m2) return `photo-${m2[1]}`;
    return url;
  }

  // Custom Image URL / Unsplash Link
  const customBgInput = document.getElementById('bg-custom-url-input');
  const customBgBtn = document.getElementById('bg-custom-url-btn');
  customBgBtn?.addEventListener('click', () => {
    const rawUrl = customBgInput?.value.trim();
    if (rawUrl && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://'))) {
      const finalId = extractUnsplashId(rawUrl);
      applyBg(finalId);
      showToast('🖼️ Unsplash arka planı başarıyla uygulandı!');
      document.getElementById('bg-overlay-modal')?.classList.add('hidden');
    } else {
      showToast('⚠️ Lütfen geçerli bir Unsplash veya görsel linki (https://...) girin.');
    }
  });

  /* ══════════════════════════════════════════════════════
     TIMER UI RENDERING
     ══════════════════════════════════════════════════ */

  function renderTimer() {
    const { m, s } = timer.formatted;
    timerM.textContent = m;
    timerS.textContent = s;

    // Document title update
    if (timer.isClock) {
      document.title = `${m}:${s} — FocusFlow Clock`;
    } else if (timer.isStopwatch) {
      document.title = `⏱ ${m}:${s} — FocusFlow`;
    } else {
      const modeLabel = { focus: 'Focus', short: 'Break', long: 'Long Break' }[timer.mode];
      document.title = `${m}:${s} — ${modeLabel}`;
    }

    // Focus time tracker
    const totMin = Math.floor(timer.focusSec / 60);
    if (totalFocusEl) {
      totalFocusEl.textContent = totMin >= 60
        ? `${Math.floor(totMin / 60)}s ${totMin % 60}d` : `${totMin}d`;
    }

    // Reset button visibility
    if (resetBtn) {
      resetBtn.style.visibility = (timer.running || timer.seconds !== timer.duration) ? 'visible' : 'hidden';
    }

    renderDots();
  }

  function renderDots() {
    const dots = document.querySelectorAll('.dot');
    const total = Math.min(timer.cfg.sessions, dots.length);
    const completed = timer.sessions % timer.cfg.sessions;
    dots.forEach((dot, i) => {
      dot.classList.toggle('done', i < completed && i < total);
      dot.classList.toggle('current', i === completed && timer.mode === 'focus');
      dot.style.display = i < total ? '' : 'none';
    });
  }

  function renderStartBtn() {
    if (timer.isClock) {
      startBtn.textContent = 'Saat Modu';
      startBtn.classList.add('pausing');
    } else if (timer.running) {
      startBtn.textContent = 'Duraklat';
      startBtn.classList.add('pausing');
    } else {
      startBtn.textContent = (timer.seconds < timer.duration && timer.seconds > 0) ? 'Devam Et' : 'Başlat';
      startBtn.classList.remove('pausing');
    }
  }

  timer.onTick = () => renderTimer();
  timer.onMode = () => {
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === timer.mode);
    });
    renderTimer();
  };

  timer.onDone = (fromMode, isLong) => {
    playChime();
    let msg, next;
    if (fromMode === 'focus') {
      if (isLong) { msg = '🎉 Uzun mola vakti! Harika odaklandın.'; next = 'long'; }
      else { msg = '✅ Oturum bitti! Kısa mola zamanı.'; next = 'short'; }
    } else {
      msg = '🎯 Mola bitti — tekrar odaklanalım!'; next = 'focus';
    }

    showToast(msg);
    renderStartBtn();

    if (Notification.permission === 'granted') {
      new Notification('FocusFlow', { body: msg });
    }

    setTimeout(() => {
      timer.setMode(next);
      renderStartBtn();
      if (timer.cfg.autoStart) { timer.start(); renderStartBtn(); }
    }, 2200);
  };

  /* ── Controls ─────────────────────────────────────────── */
  startBtn.addEventListener('click', () => {
    if (timer.isClock) return;
    timer.toggle();
    renderStartBtn();
    if (timer.running && Notification.permission === 'default') Notification.requestPermission();
  });

  resetBtn?.addEventListener('click', () => {
    timer.reset();
    renderStartBtn();
    startBtn.textContent = 'Başlat';
    startBtn.classList.remove('pausing');
  });

  // Cycle: Pomodoro ↔ Stopwatch
  stopwatchBtn?.addEventListener('click', () => {
    if (timer.isClock) setAppDisplayMode('pomodoro');
    const nextMode = timer.isStopwatch ? 'pomodoro' : 'stopwatch';
    timer.setDisplayMode(nextMode);
    stopwatchBtn.classList.toggle('active', timer.isStopwatch);
    stopwatchBtn.title = timer.isStopwatch ? 'Kronometre Açık' : 'Kronometreye Geç';

    const pomodoroOnly = !timer.isStopwatch;
    quickAddRow.style.opacity = pomodoroOnly ? '1' : '0.35';
    quickAddRow.style.pointerEvents = pomodoroOnly ? 'all' : 'none';

    renderTimer();
    renderStartBtn();
  });

  /* ── Mode tabs ────────────────────────────────────────── */
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (timer.isClock) setAppDisplayMode('pomodoro');
      timer.setMode(tab.dataset.mode);
      renderStartBtn();
      startBtn.classList.remove('pausing');
    });
  });

  /* ── Quick add ────────────────────────────────────────── */
  document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      timer.addMinutes(Number(btn.dataset.add));
      btn.style.transform = 'scale(0.9)';
      setTimeout(() => (btn.style.transform = ''), 130);
    });
  });

  /* ══════════════════════════════════════════════════════
     DYNAMIC TASK / CHECKLIST MANAGER (MAX 3 TASKS)
     ══════════════════════════════════════════════════ */
  const taskInput = document.getElementById('task-input');
  const taskAddBtn = document.getElementById('task-add-btn');
  const taskListEl = document.getElementById('task-list');
  const taskFooterEl = document.getElementById('task-footer');
  const taskStatsEl = document.getElementById('task-stats');
  const btnClearTasks = document.getElementById('btn-clear-completed');

  const TASKS_STORAGE_KEY = 'pomoflow_tasks';
  const MAX_TASKS = 3;

  let tasks = [];
  try {
    const saved = localStorage.getItem(TASKS_STORAGE_KEY);
    tasks = saved ? JSON.parse(saved) : [];
    if (tasks.length > MAX_TASKS) tasks = tasks.slice(0, MAX_TASKS);
  } catch (e) {
    tasks = [];
  }

  function saveTasks() {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) { }
  }

  function updateInputPlaceholder() {
    if (!taskInput) return;
    if (tasks.length >= MAX_TASKS) {
      taskInput.placeholder = 'Maksimum 3 görev (Yeni eklemek için birini silin)';
    } else {
      taskInput.placeholder = 'Şu an ne üzerinde çalışıyorsun?';
    }
  }

  function renderTasks() {
    if (!taskListEl) return;
    taskListEl.innerHTML = '';
    updateInputPlaceholder();

    if (tasks.length === 0) {
      if (taskFooterEl) taskFooterEl.classList.add('hidden');
      return;
    }

    const completedCount = tasks.filter(t => t.completed).length;

    tasks.forEach(task => {
      const item = document.createElement('div');
      item.className = `task-item${task.completed ? ' completed' : ''}`;
      item.dataset.id = task.id;

      // Checkbox
      const checkBtn = document.createElement('button');
      checkBtn.type = 'button';
      checkBtn.className = 'task-checkbox';
      checkBtn.setAttribute('aria-label', task.completed ? 'Görevi tamamlanmadı yap' : 'Görevi tamamla');
      checkBtn.title = task.completed ? 'Görevi tamamlanmadı olarak işaretle' : 'Görevi tamamla';
      checkBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>`;
      checkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTask(task.id);
      });

      // Text
      const textSpan = document.createElement('span');
      textSpan.className = 'task-text';
      textSpan.textContent = task.text;
      textSpan.title = 'Durumu değiştirmek için tıkla';
      textSpan.addEventListener('click', () => toggleTask(task.id));

      // Delete button
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'task-delete-btn';
      delBtn.setAttribute('aria-label', 'Görevi sil');
      delBtn.title = 'Görevi sil';
      delBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>`;
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id, item);
      });

      item.appendChild(checkBtn);
      item.appendChild(textSpan);
      item.appendChild(delBtn);
      taskListEl.appendChild(item);
    });

    if (taskFooterEl && taskStatsEl) {
      taskFooterEl.classList.remove('hidden');
      taskStatsEl.textContent = `${completedCount}/${tasks.length} tamamlandı`;
      if (btnClearTasks) {
        btnClearTasks.style.display = completedCount > 0 ? '' : 'none';
      }
    }
  }

  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (tasks.length >= MAX_TASKS) {
      showToast(`En fazla ${MAX_TASKS} görev ekleyebilirsiniz. Yeni eklemek için lütfen bir görevi silin.`);
      return;
    }

    const newTask = {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      text: trimmed,
      completed: false,
      createdAt: Date.now()
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    if (taskInput) taskInput.value = '';
  }

  function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(id, itemEl) {
    if (itemEl) {
      itemEl.style.opacity = '0';
      itemEl.style.transform = 'scale(0.9) translateY(-6px)';
      setTimeout(() => {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
      }, 160);
    } else {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      renderTasks();
    }
  }

  taskInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask(taskInput.value);
    }
  });

  taskAddBtn?.addEventListener('click', () => {
    if (taskInput) addTask(taskInput.value);
  });

  btnClearTasks?.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
  });

  renderTasks();

  /* ══════════════════════════════════════════════════════
     TOOLBAR BUTTONS
     ══════════════════════════════════════════════════ */

  const btnParticles = document.getElementById('btn-particles');
  const btnMusic = document.getElementById('btn-music');
  const btnBg = document.getElementById('btn-bg');
  const btnSettings = document.getElementById('btn-settings');
  const btnZen = document.getElementById('btn-zen');
  const ytWidget = document.getElementById('youtube-widget');

  btnParticles?.addEventListener('click', () => {
    const on = particles.toggle();
    btnParticles.classList.toggle('active', on);
  });
  btnParticles?.classList.toggle('active', particles.active);

  const ytBackdrop = document.getElementById('yt-backdrop');

  function setYtWidgetVisible(show) {
    if (!ytWidget) return;
    ytWidget.classList.toggle('hidden', !show);
    btnMusic?.classList.toggle('active', show);
    ytBackdrop?.classList.toggle('hidden', !show);
  }

  btnMusic?.addEventListener('click', () => {
    const isNowHidden = ytWidget.classList.contains('hidden');
    setYtWidgetVisible(isNowHidden);
  });

  document.getElementById('bottom-now-playing')?.addEventListener('click', () => {
    const isNowHidden = ytWidget.classList.contains('hidden');
    setYtWidgetVisible(isNowHidden);
  });

  ytBackdrop?.addEventListener('click', () => {
    setYtWidgetVisible(false);
  });

  btnBg?.addEventListener('click', () =>
    document.getElementById('bg-overlay-modal')?.classList.remove('hidden')
  );


  btnSettings?.addEventListener('click', () => {
    syncSettingsUI();
    document.getElementById('settings-overlay')?.classList.remove('hidden');
  });

  let zenMode = false;
  btnZen?.addEventListener('click', () => toggleZen());

  function toggleZen(force) {
    zenMode = force !== undefined ? force : !zenMode;
    appEl.classList.toggle('zen', zenMode);
    btnZen?.classList.toggle('active', zenMode);
  }
  timerDisp?.addEventListener('click', () => { if (zenMode) toggleZen(false); });

  /* ══════════════════════════════════════════════════════
     BACKGROUND & WEATHER MODAL TABS
     ══════════════════════════════════════════════════ */

  document.getElementById('close-bg-modal')?.addEventListener('click', () =>
    document.getElementById('bg-overlay-modal')?.classList.add('hidden')
  );
  document.getElementById('bg-overlay-modal')?.addEventListener('click', e => {
    if (e.target.id === 'bg-overlay-modal')
      document.getElementById('bg-overlay-modal').classList.add('hidden');
  });

  document.querySelectorAll('.mtab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const isWeather = tab.dataset.tab === 'weather';
      document.getElementById('bg-tab-content')?.classList.toggle('hidden', isWeather);
      document.getElementById('weather-grid')?.classList.toggle('hidden', !isWeather);
    });
  });

  document.querySelectorAll('.weather-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.weather-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const eff = card.dataset.effect;
      particles.setEffect(eff);
      localStorage.setItem('ff-effect', eff);
      btnParticles?.classList.toggle('active', eff !== 'none');
    });
  });

  const initCard = document.querySelector(`.weather-card[data-effect="${savedEffect}"]`);
  if (initCard) {
    document.querySelectorAll('.weather-card').forEach(c => c.classList.remove('active'));
    initCard.classList.add('active');
  }

  /* ══════════════════════════════════════════════════════
     SETTINGS MODAL
     ══════════════════════════════════════════════════ */

  let editCfg = { ...timer.cfg };

  function syncSettingsUI() {
    editCfg = { ...timer.cfg };
    ['focus', 'short', 'long', 'sessions'].forEach(k => {
      const el = document.getElementById(`s-${k}`);
      if (el) el.textContent = editCfg[k];
    });
    const tog = document.getElementById('auto-start-toggle');
    if (tog) tog.checked = !!editCfg.autoStart;
  }

  const LIMITS = { focus: [1, 120], short: [1, 60], long: [1, 60], sessions: [1, 10] };

  document.querySelectorAll('.s-decr').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.s;
      editCfg[k] = Math.max(LIMITS[k][0], editCfg[k] - 1);
      const el = document.getElementById(`s-${k}`); if (el) el.textContent = editCfg[k];
    });
  });

  document.querySelectorAll('.s-incr').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.s;
      editCfg[k] = Math.min(LIMITS[k][1], editCfg[k] + 1);
      const el = document.getElementById(`s-${k}`); if (el) el.textContent = editCfg[k];
    });
  });

  document.getElementById('auto-start-toggle')?.addEventListener('change', e => {
    editCfg.autoStart = e.target.checked;
  });

  document.getElementById('save-settings')?.addEventListener('click', () => {
    timer.updateConfig(editCfg);
    localStorage.setItem('ff-settings', JSON.stringify(editCfg));
    renderDots(); renderTimer();
    document.getElementById('settings-overlay')?.classList.add('hidden');
    showToast('⚙️ Ayarlar kaydedildi!');
  });

  document.getElementById('close-settings')?.addEventListener('click', () =>
    document.getElementById('settings-overlay')?.classList.add('hidden')
  );
  document.getElementById('settings-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'settings-overlay')
      document.getElementById('settings-overlay').classList.add('hidden');
  });

  /* ══════════════════════════════════════════════════════
     YOUTUBE WIDGET: CLOSE, SEARCH, FAVORITES, STATIONS
     ══════════════════════════════════════════════════ */

  const ytCloseBtn = document.getElementById('yt-close-btn');
  const ytSearchInput = document.getElementById('yt-search-input');
  const ytSearchBtn = document.getElementById('yt-search-btn');
  const ytTabs = document.querySelectorAll('.yt-tab');
  const ytPanels = document.querySelectorAll('.yt-panel');
  const ytResults = document.getElementById('yt-results-content');
  const ytFavsList = document.getElementById('yt-favs-list');
  const ytFavsEmpty = document.getElementById('yt-favs-empty');
  const ytLoopBtn = document.getElementById('yt-np-loop-btn');
  const ytFavBtn = document.getElementById('yt-np-fav-btn');
  const ytPlayPauseBtn = document.getElementById('yt-play-pause-btn');
  const ytVolSlider = document.getElementById('yt-vol');

  // Widget Close Cross Button
  ytCloseBtn?.addEventListener('click', () => {
    setYtWidgetVisible(false);
  });

  // Switch Widget Tabs
  function switchYtTab(tabId) {
    ytTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    ytPanels.forEach(p => p.classList.toggle('hidden', p.id !== `yt-${tabId}-panel`));
    if (tabId === 'favorites') renderFavorites();
  }
  ytTabs.forEach(t => t.addEventListener('click', () => switchYtTab(t.dataset.tab)));

  const formatSecs = s => s ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` : '';

  function renderSearchResults(vids) {
    if (!ytResults) return;
    if (!vids || vids.length === 0) {
      ytResults.innerHTML = '<div class="yt-error">Aramanızla eşleşen video bulunamadı.</div>';
      return;
    }

    ytResults.innerHTML = vids.map(v => {
      const vidId = v.videoId;
      const title = (v.title || 'Video').replace(/"/g, '&quot;');
      const author = (v.author || 'YouTube').replace(/"/g, '&quot;');
      const dur = v.lengthSeconds ? formatSecs(v.lengthSeconds) : (v.duration || '');
      const isFav = yt.favorites.some(f => f.id === vidId);

      return `
        <div class="yt-item" data-vid="${vidId}">
          <img class="yt-item-thumb" src="https://img.youtube.com/vi/${vidId}/mqdefault.jpg" alt="" loading="lazy">
          <div class="yt-item-info">
            <div class="yt-item-title">${title}</div>
            <div class="yt-item-sub">
              <span>${author}</span>
              ${dur ? `• <span class="yt-item-dur">${dur}</span>` : ''}
            </div>
          </div>
          <button class="yt-fav-btn ${isFav ? 'saved' : ''}" data-action="fav" data-vid="${vidId}" data-title="${title}" data-channel="${author}" title="Favorilere ekle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </button>
        </div>
      `;
    }).join('');

    // Bind search items
    ytResults.querySelectorAll('.yt-item').forEach(el => {
      el.addEventListener('click', e => {
        if (e.target.closest('.yt-fav-btn')) {
          const favBtn = e.target.closest('.yt-fav-btn');
          const vidId = favBtn.dataset.vid;
          const title = favBtn.dataset.title;
          const chan = favBtn.dataset.channel;
          const isFav = yt.favorites.some(f => f.id === vidId);
          if (isFav) {
            yt.favorites = yt.favorites.filter(f => f.id !== vidId);
            favBtn.classList.remove('saved');
          } else {
            yt.favorites.push({ id: vidId, title, channel: chan });
            favBtn.classList.add('saved');
          }
          localStorage.setItem('ff-yt-favs', JSON.stringify(yt.favorites));
          yt.syncFavButton();
        } else {
          yt.load(el.dataset.vid);
        }
      });
    });
  }

  // YouTube Search with Direct URL/ID + Invidious API + Local Database Fallback
  async function performYTSearch(q) {
    if (!q || !q.trim()) return;
    q = q.trim();

    // 1. Direct YouTube Link or Video ID Check
    const directId = yt.extractId(q);
    if (directId) {
      yt.load(directId);
      switchYtTab('stations');
      showToast('🎵 Video yükleniyor…');
      return;
    }

    if (!ytResults) return;
    ytResults.innerHTML = '<div class="yt-loading"><div class="yt-spinner"></div>YouTube\'da aranıyor...</div>';
    switchYtTab('results');

    // 2. Try online Invidious APIs
    let apiSuccess = false;
    const endpoints = [
      'https://invidious.flokinet.to/api/v1/search?q=',
      'https://invidious.projectsegfau.lt/api/v1/search?q=',
      'https://inv.nadeko.net/api/v1/search?q=',
      'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://invidious.flokinet.to/api/v1/search?q=' + encodeURIComponent(q))
    ];

    for (const url of endpoints) {
      try {
        const fullUrl = url.includes('allorigins') ? url : (url + encodeURIComponent(q));
        const res = await fetch(fullUrl, { signal: AbortSignal.timeout(3500) });
        if (res.ok) {
          const data = await res.json();
          const items = Array.isArray(data) ? data : (data.items || []);
          const vids = items.filter(item => item.type === 'video' || item.videoId).slice(0, 15);
          if (vids.length > 0) {
            renderSearchResults(vids);
            apiSuccess = true;
            break;
          }
        }
      } catch (_) { }
    }

    // 3. Fallback to rich curated local search database
    if (!apiSuccess) {
      const qLow = q.toLowerCase();
      const localMatches = MUSIC_DATABASE.filter(m =>
        m.title.toLowerCase().includes(qLow) ||
        m.author.toLowerCase().includes(qLow) ||
        (m.tags && m.tags.toLowerCase().includes(qLow))
      );

      if (localMatches.length > 0) {
        renderSearchResults(localMatches);
      } else {
        renderSearchResults(MUSIC_DATABASE.slice(0, 8));
      }
    }
  }

  ytSearchBtn?.addEventListener('click', () => performYTSearch(ytSearchInput?.value));
  ytSearchInput?.addEventListener('keydown', e => { if (e.key === 'Enter') performYTSearch(ytSearchInput.value); });

  // Render Favorites Tab
  function renderFavorites() {
    if (!ytFavsList || !ytFavsEmpty) return;
    const favs = yt.favorites;
    if (favs.length === 0) {
      ytFavsList.innerHTML = '';
      ytFavsEmpty.classList.remove('hidden');
      return;
    }
    ytFavsEmpty.classList.add('hidden');
    ytFavsList.innerHTML = favs.map(f => `
      <div class="yt-item" data-vid="${f.id}">
        <img class="yt-item-thumb" src="https://img.youtube.com/vi/${f.id}/mqdefault.jpg" alt="" loading="lazy">
        <div class="yt-item-info">
          <div class="yt-item-title">${f.title}</div>
          <div class="yt-item-sub"><span>${f.channel}</span></div>
        </div>
        <button class="yt-fav-btn saved" data-action="remove" data-vid="${f.id}" title="Favorilerden Çıkar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </button>
      </div>
    `).join('');

    ytFavsList.querySelectorAll('.yt-item').forEach(el => {
      el.addEventListener('click', e => {
        if (e.target.closest('.yt-fav-btn')) {
          yt.favorites = yt.favorites.filter(x => x.id !== el.dataset.vid);
          localStorage.setItem('ff-yt-favs', JSON.stringify(yt.favorites));
          renderFavorites();
          yt.syncFavButton();
        } else {
          yt.load(el.dataset.vid);
        }
      });
    });
  }

  // Loop Button on Now Playing Card
  ytLoopBtn?.addEventListener('click', () => {
    yt.toggleLoop();
  });

  // Favorite Star on Now Playing Card
  ytFavBtn?.addEventListener('click', () => {
    yt.toggleFavoriteCurrent();
    if (!document.getElementById('yt-favorites-panel').classList.contains('hidden')) {
      renderFavorites();
    }
  });

  // Station Quick Chips
  document.querySelectorAll('.stations-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      yt.load(chip.dataset.vid, chip);
    });
  });

  // Play / Pause & Volume
  ytPlayPauseBtn?.addEventListener('click', () => yt.togglePlay());
  ytVolSlider?.addEventListener('input', () => yt.setVolume(Number(ytVolSlider.value)));

  /* ══════════════════════════════════════════════════════
     TOAST
     ══════════════════════════════════════════════════ */

  let toastTimer;
  const toastEl = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  function showToast(msg, ms = 4000) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = msg;
    toastEl.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.add('hidden'), ms);
  }

  /* ══════════════════════════════════════════════════════
     KEYBOARD SHORTCUTS
     ══════════════════════════════════════════════════ */

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.metaKey || e.ctrlKey) return;
    switch (e.code) {
      case 'Space': e.preventDefault(); timer.toggle(); renderStartBtn(); break;
      case 'KeyR': timer.reset(); renderStartBtn(); renderTimer(); startBtn.classList.remove('pausing'); break;
      case 'KeyZ': toggleZen(); break;
      case 'Digit1': if (!timer.isClock) { timer.setMode('focus'); renderStartBtn(); } break;
      case 'Digit2': if (!timer.isClock) { timer.setMode('short'); renderStartBtn(); } break;
      case 'Digit3': if (!timer.isClock) { timer.setMode('long'); renderStartBtn(); } break;
      case 'Escape':
        document.getElementById('bg-overlay-modal')?.classList.add('hidden');
        document.getElementById('settings-overlay')?.classList.add('hidden');
        setYtWidgetVisible(false);
        if (zenMode) toggleZen(false);
        break;
    }
  });

  /* ── Initial Render ───────────────────────────────────── */
  syncSettingsUI();
  yt.syncLoopButton();
  renderTimer();
  renderStartBtn();
});
