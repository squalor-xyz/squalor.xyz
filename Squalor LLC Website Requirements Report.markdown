# Website Requirements Report for Squalor, LLC

## 1. Overview

The Squalor, LLC website is a single-page application designed to showcase the company's identity and capabilities. Hosted on GitHub Pages, it features a dark, tech-inspired aesthetic with interactive elements to engage visitors. The website comprises four main sections:

- A header displaying the company logo, name, and tagline.
- A game section featuring a simple jumper game built with an HTML5 canvas.
- An about section providing a brief company description.
- A footer with company details and an interactive contact link.

The site also includes a commented-out contact section, which is not rendered but noted for completeness. The design emphasizes simplicity, interactivity, and a modern feel, aligning with the company's focus on technology and innovation.

## 2. HTML Structure

The website's HTML structure is straightforward and must include the following components:

- **Document Setup:**
  - DOCTYPE declaration: `<!DOCTYPE html>`
  - HTML root element: `<html lang="en">`

- **Head Section:**
  - Character encoding: `<meta charset="UTF-8" />`
  - Viewport for responsiveness: `<meta name="viewport" content="width=device-width, initial-scale=1.0"/>`
  - Page title: `<title>Squalor, LLC</title>`
  - Embedded CSS styles within a `<style>` tag (detailed in Section 3).

- **Body Section:**
  - **Header:**
    - Element: `<header>`
    - Logo container: `<div class="logo">`
      - Inline SVG with attributes `viewBox="0 0 200 200"` and `xmlns="http://www.w3.org/2000/svg"`
        - Circle element: `<circle cx="100" cy="100" r="90" fill="none" stroke="#0af" stroke-width="8"/>`
        - Path element forming an "S": `<path d="M60,80 C60,50 140,50 140,80 C140,110 60,110 60,140 C60,170 140,170 140,140" fill="none" stroke="#0af" stroke-width="8" stroke-linecap="round"/>`
    - Company name: `<h1 class="brand-name">Squalor</h1>`
    - Tagline: `<p class="tagline">Consulting • Contracting • Technology Development</p>`

  - **Game Section:**
    - Element: `<section id="game-container">`
    - Canvas for the game: `<canvas id="gameCanvas" width="600" height="300"></canvas>`

  - **About Section:**
    - Element: `<section id="about">`
    - Heading: `<h2>About Squalor</h2>`
    - Description: `<p>Squalor is a forward-thinking technology company specializing in innovative software, hardware prototypes, and consulting services. Our focus is on delivering custom solutions that push boundaries and spark new possibilities.</p>`

  - **Commented-Out Contact Section (Not Rendered):**
    - Wrapped in comments: `<!-- <section id="contact"> ... </section> -->`
    - Includes: `<h2>Contact</h2>`, an empty `<p>`, and `<span class="hidden-email" id="contactEmail">[ Show Email ]</span>`

  - **Footer:**
    - Element: `<footer>`
    - Paragraph: `<p>`
      - Content: `<strong>Squalor, LLC</strong> - <em>Jump into the future.</em><br/>`
      - Links: `<a href="#about">About</a> | <span class="hidden-email" id="contactEmail">Contact</span>`
      - Commented-out link: `<!-- | <a href="#contact">Contact</a> -->`

  - **Scripts:**
    - Embedded JavaScript within a `<script>` tag at the body’s end (detailed in Section 4).
    - An external Cloudflare script for security, optional for core functionality (noted in Section 6).

## 3. CSS Styles

The website’s styling is embedded in the `<head>` within a `<style>` tag. The styles define a consistent, modern look:

    /* Reset styles for consistency */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    /* Body styling for dark theme and typography */
    body {
      font-family: Arial, sans-serif;
      background: #111;
      color: #f0f0f0;
      overflow-x: hidden;
      line-height: 1.4;
    }
    /* Header layout */
    header {
      text-align: center;
      padding: 2rem 1rem 1.5rem;
    }
    /* Logo sizing and centering */
    .logo {
      width: 120px;
      margin: 0 auto;
    }
    /* Brand name styling */
    h1.brand-name {
      font-size: 2rem;
      margin-top: 1rem;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    /* Tagline appearance */
    p.tagline {
      margin: 0.5rem 0;
      font-size: 1rem;
      opacity: 0.8;
    }
    /* Game container for centering the canvas */
    #game-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2rem auto;
      max-width: 800px;
      width: 100%;
    }
    /* Canvas styling */
    canvas {
      background: #222;
      display: block;
      border: 2px solid #555;
    }
    /* Footer layout and opacity */
    footer {
      text-align: center;
      padding: 2rem;
      opacity: 0.8;
      font-size: 0.9rem;
    }
    /* Footer link colors */
    footer a {
      color: #0af;
      margin: 0 10px;
    }
    /* Hover effect for footer links */
    footer a:hover {
      text-decoration: underline;
    }
    /* Section constraints */
    section {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    /* Heading styling */
    h2 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    /* Paragraph spacing */
    p {
      margin-bottom: 1rem;
    }
    /* Interactive email link */
    .hidden-email {
      color: #0af;
      text-decoration: underline;
      cursor: pointer;
    }
    /* Hover effect for email link */
    .hidden-email:hover {
      text-decoration: none;
    }

## 4. JavaScript Functionality

JavaScript is embedded at the end of the `<body>` within a `<script>` tag, providing interactivity for the game and contact feature.

### Game Logic
The game is a jumper where a player avoids obstacles:

- **Initialization:**
  - Canvas selection: `const canvas = document.getElementById('gameCanvas');`
  - 2D context: `const ctx = canvas.getContext('2d');`
  - Constants:
    - Gravity: `GRAVITY = 0.5`
    - Jump force: `JUMP_FORCE = -12`
    - Player size: `PLAYER_WIDTH = 30`, `PLAYER_HEIGHT = 30`
    - Floor height: `FLOOR_HEIGHT = 50`
    - Obstacle width: `OBSTACLE_WIDTH = 20`
    - Obstacle spawn interval: `OBSTACLE_GAP = 2000` (ms)
  - Player object properties:
    - Position: `x: 50`, `y: canvas.height - FLOOR_HEIGHT - PLAYER_HEIGHT`
    - Velocity: `vy: 0`
    - State: `onGround: true`
  - Obstacle array: `obstacles = []`
  - Timing variables: `lastObstacleTime = 0`, `lastTime = 0`
  - Score: `score = 0`

- **Event Handling:**
  - Listen for `keydown` events; on `e.code === 'Space'`, prevent default behavior and trigger `jump()`.

- **Core Functions:**
  - `jump()`: If `player.onGround`, apply `player.vy = JUMP_FORCE` and set `player.onGround = false`.
  - `update(deltaTime)`:
    - Apply gravity: `player.vy += GRAVITY`
    - Update position: `player.y += player.vy`
    - Ground collision: If `player.y >= canvas.height - FLOOR_HEIGHT - PLAYER_HEIGHT`, fix `player.y`, set `player.onGround = true`, and reset `player.vy = 0`
    - Spawn obstacles every `OBSTACLE_GAP` ms using `spawnObstacle()`
    - Move obstacles: `obs.x -= obs.speed`
    - Increment score when obstacles pass player (`!obs.passed && obs.x + OBSTACLE_WIDTH < player.x`)
    - Remove off-screen obstacles
    - Check collisions with `checkCollisions()`
  - `spawnObstacle()`:
    - Random height: 30–60px
    - Random speed: 3–5px/frame
    - Add to `obstacles` with properties: `x`, `y`, `width`, `height`, `speed`, `passed`
  - `checkCollisions()`: Reset game if player overlaps an obstacle
  - `draw()`:
    - Clear canvas
    - Draw floor (gray), player (cyan), obstacles (tomato), and score (white)
  - `gameLoop(timestamp)`: Manage animation with `requestAnimationFrame`
  - `resetGame()`: Restore initial state

### Contact Email
- Select element: `const contactEmailElem = document.getElementById("contactEmail");`
- On click, construct `contact@squalor.xyz` and open a `mailto:` link.

## 5. Assets

- **SVG Logo:**
  - Inline SVG in the header
  - Attributes: `viewBox="0 0 200 200"`, `xmlns="http://www.w3.org/2000/svg"`
  - Elements:
    - Circle with cyan stroke
    - Curved path forming an "S" with cyan stroke

## 6. Additional Requirements

- **Responsiveness:**
  - Viewport meta tag ensures proper scaling on mobile devices.
  - Content is centered with a maximum width of 800px.

- **Performance:**
  - Game animation leverages `requestAnimationFrame` for smoothness.

- **Security:**
  - Email address is dynamically generated to deter scraping.

- **Hosting:**
  - Deployed on GitHub Pages.

- **External Scripts:**
  - Includes an optional Cloudflare script for security, not essential for core functionality.

This report provides a complete blueprint to recreate the Squalor, LLC website, detailing its structure, styling, interactivity, and supporting requirements.