// Web Audio API + Speech Synthesis
class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.voiceEnabled = true;
    this.volume = 0.5;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stopSpeak();
    return this.enabled;
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    if (!this.voiceEnabled) this.stopSpeak();
    return this.voiceEnabled;
  }

  play(type) {
    if (!this.enabled) return;
    this.init();
    const fn = {
      shoot: () => this._shoot(),
      hit: () => this._hit(),
      correct: () => this._correct(),
      wrong: () => this._wrong(),
      levelUp: () => this._levelUp(),
      click: () => this._click(),
      start: () => this._start(),
      complete: () => this._complete(),
      pop: () => this._pop(),
      tick: () => this._tick(),
      powerup: () => this._powerup()
    };
    (fn[type] || fn.click)();
  }

  speak(text, opts = {}) {
    if (!this.enabled || !this.voiceEnabled) return;
    if (!window.speechSynthesis) return;
    this.stopSpeak();
    const clean = String(text)
      .replace(/___+/g, ' blank ')
      .replace(/[📐📋💬🔑💡🎯✅❌🔄🏆💪⭐❤️🖤🔥]/g, '')
      .trim();
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = opts.lang || 'en-US';
    u.rate = opts.rate || 0.9;
    u.pitch = opts.pitch || 1.05;
    u.volume = this.volume;
    const voices = speechSynthesis.getVoices();
    const en = voices.find(v => /en(-|_)US/i.test(v.lang) && /female|samantha|google/i.test(v.name))
      || voices.find(v => /^en/i.test(v.lang));
    if (en) u.voice = en;
    speechSynthesis.speak(u);
  }

  stopSpeak() {
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  _tone(freq, duration, type = 'sine', vol = 0.3, delay = 0) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
    gain.gain.setValueAtTime(vol * this.volume, this.ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + duration);
    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + duration);
  }

  _shoot() {
    this._tone(800, 0.08, 'square', 0.15);
    this._tone(400, 0.12, 'sawtooth', 0.1, 0.02);
  }

  _hit() {
    this._tone(200, 0.15, 'sine', 0.25);
    this._tone(150, 0.2, 'triangle', 0.2, 0.05);
  }

  _correct() {
    [523, 659, 784].forEach((f, i) => this._tone(f, 0.2, 'sine', 0.25, i * 0.12));
  }

  _wrong() {
    [300, 250, 200].forEach((f, i) => this._tone(f, 0.25, 'sawtooth', 0.2, i * 0.15));
  }

  _levelUp() {
    [523, 659, 784, 1047].forEach((f, i) => this._tone(f, 0.25, 'sine', 0.3, i * 0.1));
  }

  _click() {
    this._tone(600, 0.06, 'sine', 0.15);
  }

  _start() {
    [392, 523, 659, 784].forEach((f, i) => this._tone(f, 0.3, 'sine', 0.25, i * 0.15));
  }

  _complete() {
    [523, 587, 659, 698, 784, 880, 988, 1047].forEach((f, i) =>
      this._tone(f, 0.2, 'sine', 0.2, i * 0.1)
    );
  }

  _pop() {
    this._tone(500, 0.1, 'sine', 0.2);
    this._tone(700, 0.08, 'sine', 0.15, 0.05);
  }

  _tick() {
    this._tone(900, 0.04, 'square', 0.08);
  }

  _powerup() {
    [440, 554, 659, 880].forEach((f, i) => this._tone(f, 0.15, 'triangle', 0.2, i * 0.08));
  }
}

const audio = new AudioManager();

if (typeof window !== 'undefined' && window.speechSynthesis) {
  speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
}
