const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 30;
const FLOOR_HEIGHT = 50;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_GAP = 2000;

let player = {
  x: 50,
  y: canvas.height - FLOOR_HEIGHT - PLAYER_HEIGHT,
  vy: 0,
  onGround: true
};

let obstacles = [];
let lastObstacleTime = 0;
let lastTime = 0;
let score = 0;

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    jump();
  }
});

function jump() {
  if (player.onGround) {
    player.vy = JUMP_FORCE;
    player.onGround = false;
  }
}

function update(deltaTime) {
  player.vy += GRAVITY;
  player.y += player.vy;

  if (player.y >= canvas.height - FLOOR_HEIGHT - PLAYER_HEIGHT) {
    player.y = canvas.height - FLOOR_HEIGHT - PLAYER_HEIGHT;
    player.onGround = true;
    player.vy = 0;
  }

  if (performance.now() - lastObstacleTime > OBSTACLE_GAP) {
    spawnObstacle();
    lastObstacleTime = performance.now();
  }

  for (let obs of obstacles) {
    obs.x -= obs.speed;
    if (!obs.passed && obs.x + OBSTACLE_WIDTH < player.x) {
      obs.passed = true;
      score++;
    }
  }

  obstacles = obstacles.filter(obs => obs.x + OBSTACLE_WIDTH > 0);
  checkCollisions();
}

function spawnObstacle() {
  const minHeight = 30;
  const maxHeight = 60;
  const obstacleHeight = minHeight + Math.random() * (maxHeight - minHeight);
  const obstacleSpeed = 3 + Math.random() * 2;

  obstacles.push({
    x: canvas.width,
    y: canvas.height - FLOOR_HEIGHT - obstacleHeight,
    width: OBSTACLE_WIDTH,
    height: obstacleHeight,
    speed: obstacleSpeed,
    passed: false
  });
}

function checkCollisions() {
  for (let obs of obstacles) {
    if (
      player.x < obs.x + obs.width &&
      player.x + PLAYER_WIDTH > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + PLAYER_HEIGHT > obs.y
    ) {
      resetGame();
      return;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#444";
  ctx.fillRect(0, canvas.height - FLOOR_HEIGHT, canvas.width, FLOOR_HEIGHT);
  ctx.fillStyle = "#0af";
  ctx.fillRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  ctx.fillStyle = "tomato";
  for (let obs of obstacles) {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  }
  ctx.fillStyle = "#fff";
  ctx.font = "16px sans-serif";
  ctx.fillText("Score: " + score, 10, 20);
}

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  update(deltaTime);
  draw();

  requestAnimationFrame(gameLoop);
}

function resetGame() {
  player.x = 50;
  player.y = canvas.height - FLOOR_HEIGHT - PLAYER_HEIGHT;
  player.vy = 0;
  player.onGround = true;
  obstacles = [];
  lastObstacleTime = performance.now();
  score = 0;
}

requestAnimationFrame(gameLoop);