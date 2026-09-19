const state = {
  screen: 'menu',
  character: CHARACTERS[0],
  tense: null,
  level: 'easy',
  questions: [],
  qIndex: 0,
  score: 0,
  streak: 0,
  lives: 3,
  correctCount: 0,
  timeLeft: 0,
  paused: false,
  taught: JSON.parse(localStorage.getItem('tenseTaught') || '{}'),
  scores: JSON.parse(localStorage.getItem('tenseScores') || '{}'),
  stars: JSON.parse(localStorage.getItem('tenseStars') || '{}')
};

let scene, camera, renderer, raycaster, mouse;
let playerChar, targets = [], particles = [];
let animId, clock, timerId = null;
let gameRunning = false;

const $ = id => document.getElementById(id);

function boot() {
  try {
    if (typeof THREE === 'undefined') {
      alert('Three.js failed to load. Please check your internet connection and refresh.');
      return;
    }
    initScreens();
    initThree();
    bindEvents();
    showScreen('menu');
    updateMenuProgress();
  } catch (err) {
    console.error(err);
    alert('Game failed to start: ' + err.message);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

function initScreens() {
  renderCharacterSelect();
  renderTenseSelect();
}

function bindEvents() {
  $('btn-start').addEventListener('click', () => { audio.play('click'); showScreen('characters'); });
  $('btn-how').addEventListener('click', () => { audio.play('click'); showHowToPlay(); });
  $('btn-sound').addEventListener('click', toggleSound);
  $('btn-voice').addEventListener('click', toggleVoice);
  $('btn-back-menu').addEventListener('click', () => { audio.play('click'); showScreen('menu'); });
  $('btn-back-chars').addEventListener('click', () => { audio.play('click'); showScreen('characters'); });
  $('btn-confirm-char').addEventListener('click', confirmCharacter);
  $('btn-skip-teach').addEventListener('click', skipTeaching);
  $('btn-next-slide').addEventListener('click', nextTeachSlide);
  $('btn-prev-slide').addEventListener('click', prevTeachSlide);
  $('btn-start-game').addEventListener('click', startGame);
  $('btn-speak-teach').addEventListener('click', speakTeachSlide);
  $('btn-regenerate').addEventListener('click', regenerateGame);
  $('btn-speak-q').addEventListener('click', speakQuestion);
  $('btn-pause').addEventListener('click', togglePause);
  $('btn-quit').addEventListener('click', quitGame);
  $('btn-resume').addEventListener('click', () => { audio.play('click'); togglePause(); });
  $('btn-quit-pause').addEventListener('click', () => { closeModal(); quitGame(); });
  $('btn-back-after-game').addEventListener('click', () => {
    audio.play('click');
    renderTenseSelect();
    showScreen('tenses');
  });
  $('btn-play-again').addEventListener('click', () => { audio.play('click'); startGame(); });

  window.addEventListener('pointerdown', onGamePointer);

  window.addEventListener('resize', onResize);
  window.addEventListener('keydown', e => {
    if (e.code === 'Space' && gameRunning && state.screen === 'game') {
      e.preventDefault();
      togglePause();
    }
    if (e.key === 'h' || e.key === 'H') {
      if (gameRunning) speakQuestion();
    }
  });
}

function showScreen(name) {
  state.screen = name;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $(`screen-${name}`);
  if (el) el.classList.add('active');

  if (name === 'menu') { stopGame(); hideCanvas(); updateMenuProgress(); }
  if (name === 'characters') {
    showCanvas();
    positionCharacter('preview');
    previewCharacter(state.character);
    startRenderLoop();
  }
  if (name === 'tenses') { hideCanvas(); renderTenseSelect(); }
  if (name === 'teach') hideCanvas();
  if (name === 'game') {
    showCanvas();
    positionCharacter('game');
  }
  if (name === 'result') hideCanvas();
}

function showCanvas() { $('game-canvas').style.display = 'block'; }
function hideCanvas() {
  if (state.screen !== 'game' && state.screen !== 'characters') {
    $('game-canvas').style.display = 'none';
  }
}

function showHowToPlay() { $('modal-how').classList.add('active'); }
function closeModal() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}
window.closeModal = closeModal;

function toggleSound() {
  const on = audio.toggle();
  $('btn-sound').textContent = on ? '🔊' : '🔇';
  audio.play('click');
}

function toggleVoice() {
  const on = audio.toggleVoice();
  $('btn-voice').textContent = on ? '🗣️' : '🤫';
  $('btn-voice').title = on ? 'Voice ON' : 'Voice OFF';
  audio.play('click');
  if (on) audio.speak('Voice is on!');
}

function updateMenuProgress() {
  const learned = Object.keys(state.taught).filter(k => state.taught[k]).length;
  const el = $('menu-progress');
  if (el) el.textContent = `Progress: ${learned} / 8 tenses learned · 進度 ${learned}/8`;
}

// ─── Character ───────────────────────────────────────────
function renderCharacterSelect() {
  const grid = $('char-grid');
  grid.innerHTML = '';
  CHARACTERS.forEach(char => {
    const card = document.createElement('div');
    card.className = 'char-card' + (char.id === state.character.id ? ' selected' : '');
    card.innerHTML = `
      <div class="char-emoji">${char.emoji}</div>
      <div class="char-name">${char.name}</div>
      <div class="char-name-zh">${char.nameZh}</div>
      <div class="char-desc">${char.description}</div>
    `;
    card.addEventListener('click', () => {
      audio.play('pop');
      state.character = char;
      document.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      previewCharacter(char);
      audio.speak(`Hi! I am ${char.name}`);
    });
    grid.appendChild(card);
  });
}

function previewCharacter(char) {
  if (!scene) return;
  if (playerChar) scene.remove(playerChar);
  playerChar = buildCharacter(scene, char);
  positionCharacter(state.screen === 'game' ? 'game' : 'preview');
  scene.add(playerChar);
}

function positionCharacter(mode) {
  if (!playerChar) return;
  if (mode === 'preview') {
    playerChar.position.set(0, 0, 2);
    playerChar.scale.set(1.4, 1.4, 1.4);
    camera.position.set(0, 2.5, 7);
    camera.lookAt(0, 1.5, 2);
  } else {
    playerChar.position.set(2.6, -0.2, 5.4);
    playerChar.scale.set(0.55, 0.55, 0.55);
    playerChar.rotation.y = -0.35;
    camera.position.set(0, 2.4, 7.2);
    camera.lookAt(0, 2.1, -4);
  }
}

function confirmCharacter() {
  audio.play('click');
  audio.speak(`Let's learn English with ${state.character.name}!`);
  renderTenseSelect();
  showScreen('tenses');
}

// ─── Tense select ────────────────────────────────────────
function renderTenseSelect() {
  const grid = $('tense-grid');
  grid.innerHTML = '';
  TENSES.forEach(tense => {
    const taught = state.taught[tense.id];
    const best = state.scores[tense.id] || 0;
    const stars = state.stars[tense.id] || 0;
    const card = document.createElement('div');
    card.className = 'tense-card';
    card.style.borderColor = tense.color;
    card.innerHTML = `
      <div class="tense-emoji">${tense.emoji}</div>
      <div class="tense-name">${tense.name}</div>
      <div class="tense-name-zh">${tense.nameZh}</div>
      ${taught ? '<span class="badge taught">✅ Learned</span>' : '<span class="badge new">📖 New</span>'}
      ${best > 0 ? `<span class="badge score">⭐ ${best}</span>` : ''}
      ${stars > 0 ? `<div class="star-row">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>` : ''}
    `;
    card.addEventListener('click', () => selectTense(tense));
    grid.appendChild(card);
  });
}

function selectTense(tense) {
  audio.play('pop');
  state.tense = tense;
  audio.speak(tense.name);
  showLevelSelect();
}

function showLevelSelect() {
  $('level-tense-name').textContent = `${state.tense.emoji} ${state.tense.name}`;
  const grid = $('level-grid');
  grid.innerHTML = '';
  LEVELS.forEach(lvl => {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.style.background = lvl.color;
    btn.innerHTML = `${'⭐'.repeat(lvl.stars)}<br>${lvl.name}<br><small>${lvl.nameZh}</small><br><small>⏱ ${lvl.timeLimit}s / Q</small>`;
    btn.addEventListener('click', () => {
      audio.play('click');
      state.level = lvl.id;
      showTeaching();
    });
    grid.appendChild(btn);
  });
  $('modal-level').classList.add('active');
}

// ─── Teaching ────────────────────────────────────────────
let teachSlide = 0;
const TEACH_SLIDES = ['intro', 'rules', 'examples', 'signals', 'ready'];

function showTeaching() {
  closeModal();
  teachSlide = 0;
  renderTeachSlide();
  showScreen('teach');
  setTimeout(speakTeachSlide, 400);
}

function renderTeachSlide() {
  const t = state.tense;
  const slide = TEACH_SLIDES[teachSlide];
  const content = $('teach-content');
  const progress = ((teachSlide + 1) / TEACH_SLIDES.length) * 100;
  $('teach-progress-bar').style.width = progress + '%';
  $('teach-slide-num').textContent = `${teachSlide + 1} / ${TEACH_SLIDES.length}`;
  $('btn-prev-slide').style.visibility = teachSlide === 0 ? 'hidden' : 'visible';

  if (slide === 'intro') {
    content.innerHTML = `
      <div class="teach-header" style="color:${t.color}">
        <span class="teach-big-emoji">${t.emoji}</span>
        <h2>${t.teaching.title}</h2>
        <p class="teach-sub">${t.teaching.subtitle}</p>
      </div>
      <div class="formula-box">📐 ${t.teaching.formula}</div>
    `;
  } else if (slide === 'rules') {
    content.innerHTML = `
      <h3>📋 Rules 規則</h3>
      <ul class="teach-list">${t.teaching.rules.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
  } else if (slide === 'examples') {
    content.innerHTML = `
      <h3>💬 Examples 例子</h3>
      ${t.teaching.examples.map((e, i) => `
        <div class="example-card" data-speak="${e.en}">
          <div class="ex-en">${e.en} <button class="mini-speak" data-i="${i}" type="button">🔊</button></div>
          <div class="ex-zh">${e.zh}</div>
        </div>
      `).join('')}
    `;
    content.querySelectorAll('.mini-speak').forEach(btn => {
      btn.addEventListener('click', ev => {
        ev.stopPropagation();
        const i = +btn.dataset.i;
        audio.play('click');
        audio.speak(t.teaching.examples[i].en);
      });
    });
  } else if (slide === 'signals') {
    content.innerHTML = `
      <h3>🔑 Signal Words 關鍵字</h3>
      <div class="signal-words">
        ${t.teaching.signalWords.map(w => `<span class="signal-tag">${w}</span>`).join('')}
      </div>
      <p class="teach-tip">💡 Look for these words in sentences to identify this tense!</p>
    `;
  } else if (slide === 'ready') {
    content.innerHTML = `
      <div class="ready-box">
        <div class="ready-emoji">🎯</div>
        <h2>Ready to Play!</h2>
        <p>準備好射擊遊戲了！</p>
        <p>Shoot the <strong>correct answer</strong> bubbles!</p>
        <p>射擊<strong>正確答案</strong>的泡泡！</p>
        <p class="teach-tip">Press 🔊 to hear each question. Space = pause.</p>
      </div>
    `;
  }

  const isLast = teachSlide >= TEACH_SLIDES.length - 1;
  $('btn-next-slide').textContent = 'Next 下一步 →';
  $('btn-next-slide').style.display = isLast ? 'none' : 'inline-block';
  $('btn-start-game').style.display = isLast ? 'inline-block' : 'none';
}

function speakTeachSlide() {
  audio.play('click');
  const t = state.tense;
  const slide = TEACH_SLIDES[teachSlide];
  if (slide === 'intro') audio.speak(`${t.teaching.title}. ${t.teaching.formula}`);
  else if (slide === 'rules') audio.speak(t.teaching.rules.join('. '));
  else if (slide === 'examples') audio.speak(t.teaching.examples.map(e => e.en).join('. '));
  else if (slide === 'signals') audio.speak(`Signal words: ${t.teaching.signalWords.join(', ')}`);
  else audio.speak('Ready to play! Shoot the correct answer bubbles!');
}

function nextTeachSlide() {
  audio.play('click');
  if (teachSlide < TEACH_SLIDES.length - 1) {
    teachSlide++;
    renderTeachSlide();
    setTimeout(speakTeachSlide, 250);
  } else {
    markTaught();
    startGame();
  }
}

function prevTeachSlide() {
  audio.play('click');
  if (teachSlide > 0) {
    teachSlide--;
    renderTeachSlide();
  }
}

function skipTeaching() {
  audio.play('click');
  audio.stopSpeak();
  markTaught();
  startGame();
}

function markTaught() {
  state.taught[state.tense.id] = true;
  localStorage.setItem('tenseTaught', JSON.stringify(state.taught));
}

// ─── Game ────────────────────────────────────────────────
function getLevelConfig() {
  return LEVELS.find(l => l.id === state.level) || LEVELS[0];
}

function startGame() {
  closeModal();
  audio.stopSpeak();
  audio.play('start');
  const lvl = getLevelConfig();
  state.questions = getQuestions(state.tense.id, state.level, lvl.questionsPerRound);
  state.qIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.lives = 3;
  state.correctCount = 0;
  state.paused = false;
  gameRunning = true;

  previewCharacter(state.character);
  showScreen('game');
  updateHUD();
  loadQuestion();
  startRenderLoop();
}

function regenerateGame() {
  if (state.paused) return;
  audio.play('powerup');
  const lvl = getLevelConfig();
  state.questions = regenerateQuestions(state.tense.id, state.level, lvl.questionsPerRound);
  state.qIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.lives = 3;
  state.correctCount = 0;
  clearTargets();
  clearTimer();
  updateHUD();
  loadQuestion();
  showFeedback('🔄 New questions! 新題目!', 'info');
  audio.speak('New questions loaded!');
}

function speakQuestion() {
  if (!state.questions[state.qIndex]) return;
  audio.play('click');
  audio.speak(state.questions[state.qIndex].q);
}

function loadQuestion() {
  if (state.qIndex >= state.questions.length) {
    endGame(true);
    return;
  }
  clearTargets();
  clearTimer();
  const q = state.questions[state.qIndex];
  $('question-text').textContent = q.q;
  $('question-hint').textContent = '💡 ' + q.hint;
  $('q-progress').textContent = `Question ${state.qIndex + 1} / ${state.questions.length}`;
  spawnTargets(q);
  startTimer();
  setTimeout(() => audio.speak(q.q), 300);
}

function startTimer() {
  const lvl = getLevelConfig();
  state.timeLeft = lvl.timeLimit;
  updateTimerBar();
  clearTimer();
  timerId = setInterval(() => {
    if (state.paused || !gameRunning) return;
    state.timeLeft--;
    updateTimerBar();
    if (state.timeLeft <= 5 && state.timeLeft > 0) audio.play('tick');
    if (state.timeLeft <= 0) {
      clearTimer();
      audio.play('wrong');
      state.lives--;
      state.streak = 0;
      showFeedback('⏰ Time\'s up! 時間到!', 'wrong');
      updateHUD();
      if (state.lives <= 0) {
        setTimeout(() => endGame(false), 1000);
      } else {
        state.qIndex++;
        setTimeout(loadQuestion, 1000);
      }
    }
  }, 1000);
}

function clearTimer() {
  if (timerId) { clearInterval(timerId); timerId = null; }
}

function updateTimerBar() {
  const lvl = getLevelConfig();
  const pct = Math.max(0, (state.timeLeft / lvl.timeLimit) * 100);
  const bar = $('timer-bar');
  if (bar) {
    bar.style.width = pct + '%';
    bar.className = 'timer-bar' + (pct < 30 ? ' danger' : pct < 50 ? ' warn' : '');
  }
  const label = $('timer-label');
  if (label) label.textContent = `⏱ ${state.timeLeft}s`;
}

function onGamePointer(e) {
  if (!gameRunning || state.paused || state.screen !== 'game') return;
  if (e.target.closest('button.btn-regen, button.btn, .game-controls, .hud-panel')) return;
  shoot(e);
}

function spawnTargets(q) {
  clearTargets();
  const positions = [
    { x: -2.6, y: 2.4, z: -3.2 },
    { x: 2.6, y: 2.4, z: -3.2 },
    { x: -1.4, y: 1.15, z: -2.6 },
    { x: 1.4, y: 1.15, z: -2.6 }
  ];
  const moveSpeed = state.level === 'hard' ? 0.02 : state.level === 'medium' ? 0.01 : 0;

  q.options.forEach((opt, i) => {
    const pos = positions[i] || { x: (i - 1.5) * 2, y: 2, z: -3 };
    const target = createTarget(opt, opt === q.correct, pos, moveSpeed);
    targets.push(target);
    scene.add(target.group);
  });
}

function createTarget(text, isCorrect, pos, moveSpeed) {
  const group = new THREE.Group();
  group.position.set(pos.x, pos.y, pos.z);

  const colors = [0xFF5252, 0x2979FF, 0x00C853, 0xFF6D00, 0xAA00FF, 0x00897B];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 20, 20),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  group.add(sphere);

  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeCircleTexture(text, color),
    transparent: true
  }));
  sprite.scale.set(2.3, 2.3, 1);
  group.add(sprite);

  group.userData = {
    text, isCorrect, sphere, alive: true,
    bobOffset: Math.random() * Math.PI * 2,
    baseY: pos.y,
    moveSpeed,
    moveDir: Math.random() > 0.5 ? 1 : -1,
    baseX: pos.x
  };

  return { group, isCorrect, text };
}

function makeCircleTexture(text, color) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const hex = '#' + color.toString(16).padStart(6, '0');

  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(cx, cy, 230, 0, Math.PI * 2);
  ctx.fillStyle = hex;
  ctx.fill();
  ctx.lineWidth = 18;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#2D3436';
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 10;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const fontSize = text.length > 22 ? 36 : text.length > 14 ? 44 : text.length > 8 ? 56 : 72;
  ctx.font = '700 ' + fontSize + 'px Arial, sans-serif';
  wrapText(ctx, text, cx, cy, 380, fontSize + 10);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  const lines = [];
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line.trim());
      line = word + ' ';
    } else line = test;
  }
  lines.push(line.trim());
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => {
    const ly = startY + i * lineHeight;
    ctx.strokeText(l, x, ly);
    ctx.fillText(l, x, ly);
  });
}

function clearTargets() {
  targets.forEach(t => scene.remove(t.group));
  targets = [];
}

function shoot(e) {
  if (!gameRunning || state.paused) return;
  audio.play('shoot');

  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const meshes = targets.filter(t => t.group.userData.alive).map(t => t.group);
  const hits = raycaster.intersectObjects(meshes, true);

  if (hits.length > 0) {
    let hitGroup = hits[0].object;
    while (hitGroup.parent && !hitGroup.userData.text) hitGroup = hitGroup.parent;
    if (!hitGroup.userData.text && hits[0].object.parent) hitGroup = hits[0].object.parent;
    if (hitGroup && hitGroup.userData && hitGroup.userData.text) handleHit(hitGroup);
  }
  showMuzzleFlash();
}

function handleHit(group) {
  if (!group.userData.alive || state.paused) return;
  group.userData.alive = false;

  const target = targets.find(t => t.group === group);
  if (!target) return;

  audio.play('hit');
  spawnParticles(group.position.clone(), target.isCorrect ? 0x6BCB77 : 0xFF6B6B);

  if (target.isCorrect) {
    clearTimer();
    audio.play('correct');
    const timeBonus = Math.max(0, state.timeLeft) * 2;
    const streakBonus = state.streak * 20;
    state.score += 100 + streakBonus + timeBonus;
    state.streak++;
    state.correctCount++;
    showFeedback(`✅ Correct! +${100 + streakBonus + timeBonus}`, 'correct');
    audio.speak('Correct!');
    animateTargetPop(group, () => {
      clearTargets();
      state.qIndex++;
      setTimeout(loadQuestion, 700);
    });
  } else {
    audio.play('wrong');
    state.lives--;
    state.streak = 0;
    showFeedback('❌ Wrong! 答錯了!', 'wrong');
    audio.speak('Try again!');
    animateTargetPop(group, () => {
      if (state.lives <= 0) {
        clearTimer();
        showFeedback(`Answer: ${state.questions[state.qIndex].correct}`, 'info');
        audio.speak(`The answer is ${state.questions[state.qIndex].correct}`);
        setTimeout(() => endGame(false), 1600);
      } else {
        updateHUD();
        checkAllWrong();
      }
    });
  }
  updateHUD();
}

function checkAllWrong() {
  const alive = targets.filter(t => t.group.userData.alive);
  if (alive.length === 0) {
    clearTimer();
    const ans = state.questions[state.qIndex].correct;
    showFeedback(`Answer: ${ans}`, 'info');
    audio.speak(`The answer is ${ans}`);
    setTimeout(() => {
      clearTargets();
      state.qIndex++;
      loadQuestion();
    }, 1500);
  }
}

function animateTargetPop(group, cb) {
  let scale = 1;
  const shrink = setInterval(() => {
    scale -= 0.12;
    if (scale <= 0) {
      clearInterval(shrink);
      scene.remove(group);
      if (cb) cb();
      return;
    }
    group.scale.set(scale, scale, scale);
  }, 30);
}

function spawnParticles(pos, color) {
  for (let i = 0; i < 14; i++) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 4, 4),
      new THREE.MeshBasicMaterial({ color, transparent: true })
    );
    p.position.copy(pos);
    p.userData = {
      vel: new THREE.Vector3((Math.random() - 0.5) * 0.3, Math.random() * 0.3, (Math.random() - 0.5) * 0.3),
      life: 1
    };
    scene.add(p);
    particles.push(p);
  }
}

function showMuzzleFlash() {
  const flash = $('muzzle-flash');
  flash.classList.add('active');
  setTimeout(() => flash.classList.remove('active'), 100);
}

function showFeedback(msg, type) {
  const el = $('feedback-msg');
  el.textContent = msg;
  el.className = 'feedback-msg ' + type + ' show';
  setTimeout(() => el.classList.remove('show'), 2000);
}

function updateHUD() {
  $('hud-score').textContent = state.score;
  $('hud-streak').textContent = state.streak;
  $('hud-lives').textContent = '❤️'.repeat(Math.max(0, state.lives)) + '🖤'.repeat(Math.max(0, 3 - state.lives));
  $('hud-tense').textContent = `${state.tense.emoji} ${state.tense.name}`;
  const lvl = getLevelConfig();
  $('hud-level').textContent = lvl.name;
}

function togglePause() {
  if (!gameRunning || state.screen !== 'game') return;
  state.paused = !state.paused;
  audio.play('click');
  if (state.paused) {
    audio.stopSpeak();
    $('modal-pause').classList.add('active');
  } else {
    closeModal();
  }
}

function quitGame() {
  audio.play('click');
  audio.stopSpeak();
  stopGame();
  renderTenseSelect();
  showScreen('tenses');
}

function calcStars(won) {
  if (!won) return 0;
  const total = state.questions.length;
  const ratio = state.correctCount / Math.max(1, total);
  if (ratio >= 1 && state.lives >= 2) return 3;
  if (ratio >= 0.7) return 2;
  return 1;
}

function endGame(won) {
  gameRunning = false;
  state.paused = false;
  clearTargets();
  clearTimer();
  closeModal();

  const earnedStars = calcStars(won);
  if (won) {
    audio.play('complete');
    const bonus = state.lives * 50 + state.correctCount * 10;
    state.score += bonus;
    const prev = state.scores[state.tense.id] || 0;
    if (state.score > prev) {
      state.scores[state.tense.id] = state.score;
      localStorage.setItem('tenseScores', JSON.stringify(state.scores));
    }
    const prevStars = state.stars[state.tense.id] || 0;
    if (earnedStars > prevStars) {
      state.stars[state.tense.id] = earnedStars;
      localStorage.setItem('tenseStars', JSON.stringify(state.stars));
    }
    audio.speak(`Amazing! You scored ${state.score} points!`);
  } else {
    audio.play('wrong');
    audio.speak('Keep trying! Practice makes perfect!');
  }

  $('result-icon').textContent = won ? '🏆' : '💪';
  $('result-title').textContent = won ? 'Amazing! 太棒了!' : 'Keep Trying! 再試試!';
  $('result-score').textContent = `Score: ${state.score}`;
  $('result-stars').textContent = won ? '⭐'.repeat(earnedStars) + '☆'.repeat(3 - earnedStars) : '☆☆☆';
  $('result-detail').textContent = won
    ? `Correct: ${state.correctCount}/${state.questions.length} · ${state.tense.nameZh}`
    : `Don't give up! 加油！Correct: ${state.correctCount}/${state.questions.length}`;

  showScreen('result');
}

function stopGame() {
  gameRunning = false;
  state.paused = false;
  clearTimer();
  audio.stopSpeak();
  if (animId) cancelAnimationFrame(animId);
  animId = null;
  clearTargets();
}

// ─── Three.js ────────────────────────────────────────────
function initThree() {
  const canvas = $('game-canvas');
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB);
  scene.fog = new THREE.Fog(0x87CEEB, 12, 55);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 3, 8);
  camera.lookAt(0, 2, 0);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  clock = new THREE.Clock();

  scene.add(new THREE.AmbientLight(0xFFFFFF, 0.65));
  const sun = new THREE.DirectionalLight(0xFFFFFF, 1);
  sun.position.set(5, 10, 5);
  sun.castShadow = true;
  scene.add(sun);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(22, 32),
    new THREE.MeshToonMaterial({ color: 0x7EC850 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const r = 12 + Math.random() * 3;
    createTree(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  for (let i = 0; i < 5; i++) {
    createCloud((Math.random() - 0.5) * 30, 8 + Math.random() * 4, -10 - Math.random() * 10);
  }

  previewCharacter(state.character);
}

function createTree(x, z) {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.3, 1.5, 8),
    new THREE.MeshToonMaterial({ color: 0x8B4513 })
  );
  trunk.position.set(x, 0.75, z);
  scene.add(trunk);
  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 8, 8),
    new THREE.MeshToonMaterial({ color: 0x228B22 })
  );
  leaves.position.set(x, 2.2, z);
  scene.add(leaves);
}

function createCloud(x, y, z) {
  const group = new THREE.Group();
  [0xFFFFFF, 0xF0F0F0, 0xE8E8E8].forEach((c, i) => {
    const puff = new THREE.Mesh(
      new THREE.SphereGeometry(0.8 + i * 0.2, 8, 8),
      new THREE.MeshToonMaterial({ color: c, transparent: true, opacity: 0.9 })
    );
    puff.position.set(i * 0.7 - 0.7, Math.sin(i) * 0.2, 0);
    group.add(puff);
  });
  group.position.set(x, y, z);
  group.userData.isCloud = true;
  scene.add(group);
}

function startRenderLoop() {
  if (animId) cancelAnimationFrame(animId);
  function animate() {
    animId = requestAnimationFrame(animate);
    if (state.paused) {
      renderer.render(scene, camera);
      return;
    }
    const t = clock.getElapsedTime();

    if (playerChar) {
      if (state.screen === 'characters') {
        playerChar.rotation.y = t * 0.3;
        playerChar.position.y = Math.sin(t * 2) * 0.05;
      } else if (state.screen === 'game') {
        playerChar.position.y = -0.2 + Math.sin(t * 2) * 0.04;
      }
    }

    targets.forEach(({ group }) => {
      const ud = group.userData;
      if (!ud.alive) return;
      group.position.y = ud.baseY + Math.sin(t * 2 + ud.bobOffset) * 0.25;
      if (ud.moveSpeed > 0) {
        group.position.x += ud.moveSpeed * ud.moveDir;
        if (Math.abs(group.position.x - ud.baseX) > 1.2) ud.moveDir *= -1;
      }
    });

    scene.children.forEach(obj => {
      if (obj.userData.isCloud) {
        obj.position.x += 0.005;
        if (obj.position.x > 20) obj.position.x = -20;
      }
    });

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.position.add(p.userData.vel);
      p.userData.life -= 0.03;
      p.material.opacity = p.userData.life;
      if (p.userData.life <= 0) {
        scene.remove(p);
        particles.splice(i, 1);
      }
    }

    renderer.render(scene, camera);
  }
  animate();
}

function onResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
