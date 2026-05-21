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
  let lastObstacleTime;
  let lastTime = 0;

  function resetGame() {
    player = {
      x: 72,
      y: BASE_HEIGHT - FLOOR_HEIGHT - PLAYER_HEIGHT,
      vy: 0,
      onGround: true
    };
    obstacles = [];
    score = 0;
    lastObstacleTime = performance.now();
  }

  function jump() {
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

  function update() {
    player.vy += GRAVITY;
    player.y += player.vy;

    const groundY = BASE_HEIGHT - FLOOR_HEIGHT - PLAYER_HEIGHT;
    if (player.y >= groundY) {
      player.y = groundY;
      player.vy = 0;
      player.onGround = true;
    }

    if (performance.now() - lastObstacleTime >= OBSTACLE_INTERVAL) {
      spawnObstacle();
      lastObstacleTime = performance.now();
    }

    for (const obstacle of obstacles) {
      obstacle.x -= obstacle.speed;
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
    ctx.fillStyle = "#f4efe7";
    ctx.font = '700 18px "Avenir Next", "Segoe UI", sans-serif';
    ctx.fillText(`Score ${score}`, 24, 34);
    ctx.fillStyle = "rgba(244, 239, 231, 0.7)";
    ctx.font = '500 14px "Avenir Next", "Segoe UI", sans-serif';
    ctx.fillText(`Best ${bestScore}`, 24, 56);
    ctx.fillText("Space or tap to jump", BASE_WIDTH - 180, 34);
  }

  function draw() {
    drawBackground();
    drawGround();
    drawPlayer();
    drawObstacles();
    drawScore();
  }

  function gameLoop(timestamp) {
    if (!lastTime) {
      lastTime = timestamp;
    }

    update();
    draw();
    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
  }

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      jump();
    }
  });

  canvas.addEventListener("pointerdown", jump);

  bestScore = 0;
  resetGame();
  requestAnimationFrame(gameLoop);
}
