const canvas = document.getElementById("gameCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const BASE_WIDTH = 960;
  const BASE_HEIGHT = 360;
  const FLOOR_HEIGHT = 56;
  const PLAYER_WIDTH = 34;
  const PLAYER_HEIGHT = 34;
  const GRAVITY = 0.65;
  const JUMP_FORCE = -13.5;
  const OBSTACLE_WIDTH = 26;
  const OBSTACLE_INTERVAL = 1500;

  let player;
  let obstacles;
  let score;
  let bestScore;
  let sinceObstacle;
  let lastTime = 0;
  let frameId = null;
  let inView = false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // With reduced motion the game stays still until the first jump.
  let started = !reduceMotion;
  const FRAME_MS = 1000 / 60;

  function resetGame() {
    player = {
      x: 72,
      y: BASE_HEIGHT - FLOOR_HEIGHT - PLAYER_HEIGHT,
      vy: 0,
      onGround: true
    };
    obstacles = [];
    score = 0;
    sinceObstacle = 0;
  }

  function jump() {
    if (!started) {
      started = true;
      syncLoop();
    }
    if (player.onGround) {
      player.vy = JUMP_FORCE;
      player.onGround = false;
    }
  }

  function spawnObstacle() {
    const height = 36 + Math.random() * 54;
    const speed = 5.8 + Math.random() * 1.6;

    obstacles.push({
      x: BASE_WIDTH + 20,
      y: BASE_HEIGHT - FLOOR_HEIGHT - height,
      width: OBSTACLE_WIDTH,
      height,
      speed,
      passed: false
    });
  }

  function checkCollisions() {
    for (const obstacle of obstacles) {
      const collided =
        player.x < obstacle.x + obstacle.width &&
        player.x + PLAYER_WIDTH > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + PLAYER_HEIGHT > obstacle.y;

      if (collided) {
        bestScore = Math.max(bestScore, score);
        resetGame();
        return;
      }
    }
  }

  // dt is elapsed time in 60 Hz frames, so speed is the same on any refresh rate.
  function update(dt) {
    player.vy += GRAVITY * dt;
    player.y += player.vy * dt;

    const groundY = BASE_HEIGHT - FLOOR_HEIGHT - PLAYER_HEIGHT;
    if (player.y >= groundY) {
      player.y = groundY;
      player.vy = 0;
      player.onGround = true;
    }

    sinceObstacle += dt * FRAME_MS;
    if (sinceObstacle >= OBSTACLE_INTERVAL) {
      spawnObstacle();
      sinceObstacle = 0;
    }

    for (const obstacle of obstacles) {
      obstacle.x -= obstacle.speed * dt;
      if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
        obstacle.passed = true;
        score += 1;
      }
    }

    obstacles = obstacles.filter((obstacle) => obstacle.x + obstacle.width > -10);
    checkCollisions();
  }

  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, BASE_HEIGHT);
    gradient.addColorStop(0, "#102131");
    gradient.addColorStop(0.58, "#173042");
    gradient.addColorStop(1, "#1e2f34");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

    ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
    for (let i = 0; i < 22; i += 1) {
      const x = (i * 97) % BASE_WIDTH;
      const y = 36 + ((i * 53) % 130);
      ctx.fillRect(x, y, 2, 2);
    }
  }

  function drawGround() {
    ctx.fillStyle = "#13272b";
    ctx.fillRect(0, BASE_HEIGHT - FLOOR_HEIGHT, BASE_WIDTH, FLOOR_HEIGHT);

    ctx.strokeStyle = "rgba(110, 231, 210, 0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, BASE_HEIGHT - FLOOR_HEIGHT);
    ctx.lineTo(BASE_WIDTH, BASE_HEIGHT - FLOOR_HEIGHT);
    ctx.stroke();
  }

  function drawPlayer() {
    ctx.fillStyle = "#6ee7d2";
    ctx.fillRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    ctx.fillStyle = "#0f1419";
    ctx.fillRect(player.x + 20, player.y + 8, 5, 5);
  }

  function drawObstacles() {
    ctx.fillStyle = "#f6c177";
    for (const obstacle of obstacles) {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
  }

  function drawScore() {
    // The canvas is scaled to fit its container, so grow the text in canvas
    // units when it is shown small (phones) to keep it about 12 px on screen.
    const shown = canvas.clientWidth || BASE_WIDTH;
    const scale = BASE_WIDTH / shown;
    const big = Math.max(18, 14 * scale);
    const small = Math.max(14, 12 * scale);
    const family = '"Avenir Next", "Segoe UI", sans-serif';

    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 ${big}px ${family}`;
    ctx.fillText(`Score ${score}`, 24, 16 + big);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = `500 ${small}px ${family}`;
    ctx.fillText(`Best ${bestScore}`, 24, 16 + big + small * 1.4);

    if (!started) {
      ctx.textAlign = "center";
      ctx.fillText("Tap or press space to start", BASE_WIDTH / 2, BASE_HEIGHT / 2);
    } else if (scale < 1.6) {
      ctx.textAlign = "right";
      ctx.fillText("Space or tap to jump", BASE_WIDTH - 24, 16 + big);
    }
  }

  function draw() {
    drawBackground();
    drawGround();
    drawPlayer();
    drawObstacles();
    drawScore();
  }

  function gameLoop(timestamp) {
    frameId = null;
    // Cap dt so a long pause (background tab) cannot teleport anything.
    const dt = lastTime ? Math.min((timestamp - lastTime) / FRAME_MS, 3) : 1;
    lastTime = timestamp;

    update(dt);
    draw();
    if (inView && started) {
      frameId = requestAnimationFrame(gameLoop);
    }
  }

  // Start or stop the loop: it runs only while the game is on screen and started.
  function syncLoop() {
    const shouldRun = inView && started;
    if (shouldRun && frameId === null) {
      lastTime = 0;
      frameId = requestAnimationFrame(gameLoop);
    } else if (!shouldRun && frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  // Space is only taken over while the game itself has keyboard focus, so it
  // still scrolls the page and activates buttons everywhere else.
  canvas.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      jump();
    }
  });

  canvas.addEventListener("pointerdown", jump);

  bestScore = 0;
  resetGame();
  draw();

  new IntersectionObserver((entries) => {
    inView = entries[entries.length - 1].isIntersecting;
    syncLoop();
  }).observe(canvas);
}
