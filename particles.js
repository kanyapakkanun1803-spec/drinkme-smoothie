/**
 * DrinkMe Interactive Particles & Physics Engine
 * Handles:
 * - Floating Realistic Ice Cubes with Refraction & Frost
 * - Dynamic Water Condensation Droplets running down glass
 * - Floating Fresh Fruit Slices (Avocado, Strawberries, Blueberries, Raspberries)
 * - Cold Mist / Chilled Vapor (controlled by Freshness Slider)
 * - Effervescent Micro-Bubbles
 */

class ParticleEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;

        this.currentMenuIndex = 0;
        this.freshnessLevel = 1.0; // 0.2 to 2.0
        this.mouse = { x: this.width / 2, y: this.height / 2, targetX: this.width / 2, targetY: this.height / 2 };

        this.iceCubes = [];
        this.mistParticles = [];
        this.fruitParticles = [];
        this.droplets = [];
        this.bubbles = [];

        this.init();
        this.bindEvents();
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    init() {
        this.resize();
        this.createIceCubes(10);
        this.createMist(40);
        this.createFruits();
        this.createDroplets(28);
    }

    resize() {
        if (!this.canvas) return;
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.targetX = e.clientX;
            this.mouse.targetY = e.clientY;
        });
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.targetX = e.touches[0].clientX;
                this.mouse.targetY = e.touches[0].clientY;
            }
        }, { passive: true });
    }

    setMenu(index) {
        this.currentMenuIndex = index;
        this.createFruits();
        this.burstParticles(35);
    }

    setFreshness(val) {
        this.freshnessLevel = val; // e.g. 0.5 to 1.8
    }

    createIceCubes(count) {
        this.iceCubes = [];
        for (let i = 0; i < count; i++) {
            this.iceCubes.push({
                x: (Math.random() * 0.8 + 0.1) * this.width,
                y: (Math.random() * 0.7 + 0.15) * this.height,
                size: Math.random() * 32 + 24,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.015,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                baseY: (Math.random() * 0.7 + 0.15) * this.height,
                phase: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.5 + 0.45
            });
        }
    }

    createMist(count) {
        this.mistParticles = [];
        for (let i = 0; i < count; i++) {
            this.mistParticles.push({
                x: this.width * 0.5 + (Math.random() - 0.5) * 380,
                y: this.height * 0.75 + Math.random() * 120,
                radius: Math.random() * 45 + 25,
                vx: (Math.random() - 0.5) * 0.8,
                vy: -(Math.random() * 0.9 + 0.4),
                alpha: Math.random() * 0.25 + 0.05,
                maxLife: Math.random() * 120 + 80,
                life: 0
            });
        }
    }

    createFruits() {
        this.fruitParticles = [];
        const isAvocado = (this.currentMenuIndex === 0 || this.currentMenuIndex === 1);
        const count = 14;

        for (let i = 0; i < count; i++) {
            let type;
            if (isAvocado) {
                // Avocado types: 'half', 'slice', 'seed', 'leaf'
                const types = ['avocado-half', 'avocado-slice', 'mint-leaf', 'ice-mini', 'dew'];
                type = types[i % types.length];
            } else {
                // Berry types: 'strawberry', 'blueberry', 'raspberry', 'mulberry', 'leaf'
                const types = ['strawberry', 'blueberry', 'raspberry', 'mulberry', 'mint-leaf', 'ice-mini'];
                type = types[i % types.length];
            }

            // Distribute mostly on left & right sides to frame the bottle
            const side = i % 2 === 0 ? 1 : -1;
            const xOffset = side * (Math.random() * 300 + 260);

            this.fruitParticles.push({
                type: type,
                x: this.width / 2 + xOffset,
                y: (Math.random() * 0.7 + 0.15) * this.height,
                baseX: this.width / 2 + xOffset,
                baseY: (Math.random() * 0.7 + 0.15) * this.height,
                size: Math.random() * 26 + 22,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.02,
                floatSpeed: Math.random() * 0.002 + 0.001,
                floatPhase: Math.random() * Math.PI * 2,
                depth: Math.random() * 0.7 + 0.3 // for parallax
            });
        }
    }

    createDroplets(count) {
        this.droplets = [];
        for (let i = 0; i < count; i++) {
            this.droplets.push({
                // around bottle center region
                x: this.width / 2 + (Math.random() - 0.5) * 220,
                y: this.height * 0.35 + Math.random() * (this.height * 0.4),
                radius: Math.random() * 4.5 + 2,
                speed: Math.random() * 0.4 + 0.1,
                dripping: Math.random() > 0.6,
                alpha: Math.random() * 0.4 + 0.5
            });
        }
    }

    burstParticles(count = 25) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 7 + 2;
            this.bubbles.push({
                x: this.width / 2 + (Math.random() - 0.5) * 140,
                y: this.height * 0.55 + (Math.random() - 0.5) * 200,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                radius: Math.random() * 5 + 2.5,
                alpha: 0.9,
                color: this.getBubbleColor()
            });
        }
    }

    getBubbleColor() {
        if (this.currentMenuIndex === 0) return 'rgba(163, 209, 87, 0.7)'; // Avocado milk
        if (this.currentMenuIndex === 1) return 'rgba(139, 195, 74, 0.8)'; // Avocado oat
        if (this.currentMenuIndex === 2) return 'rgba(233, 30, 99, 0.8)';  // Berry classic
        return 'rgba(206, 147, 216, 0.8)';                               // Berry yogurt
    }

    animate() {
        // Smooth mouse dampening
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.renderMist();
        this.renderIceCubes();
        this.renderFruits();
        this.renderDroplets();
        this.renderBubbles();

        requestAnimationFrame(this.animate);
    }

    // 1. Chilled Mist Particles
    renderMist() {
        const mistCount = Math.floor(this.mistParticles.length * this.freshnessLevel);
        for (let i = 0; i < mistCount; i++) {
            const p = this.mistParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life++;

            if (p.life > p.maxLife || p.y < this.height * 0.2) {
                p.x = this.width * 0.5 + (Math.random() - 0.5) * 340;
                p.y = this.height * 0.78 + Math.random() * 80;
                p.life = 0;
            }

            const currentAlpha = Math.sin((p.life / p.maxLife) * Math.PI) * p.alpha * this.freshnessLevel;
            const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
            grad.addColorStop(0.5, `rgba(235, 248, 255, ${currentAlpha * 0.5})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    // 2. Realistic 3D Crystal Ice Cubes
    renderIceCubes() {
        this.iceCubes.forEach((cube) => {
            cube.phase += 0.015;
            cube.rotation += cube.rotSpeed;

            // Parallax based on mouse
            const mouseOffsetX = (this.mouse.x - this.width / 2) * 0.025;
            const mouseOffsetY = (this.mouse.y - this.height / 2) * 0.025;

            const drawX = cube.x + Math.sin(cube.phase) * 12 + mouseOffsetX;
            const drawY = cube.baseY + Math.cos(cube.phase * 0.8) * 16 + mouseOffsetY;

            this.drawRealisticIceCube(drawX, drawY, cube.size, cube.rotation, cube.opacity);
        });
    }

    drawRealisticIceCube(x, y, s, angle, opacity) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);

        // Soft drop shadow
        this.ctx.shadowColor = 'rgba(7, 30, 60, 0.12)';
        this.ctx.shadowBlur = 18;
        this.ctx.shadowOffsetY = 10;

        // Cube Body with frosted glass refraction
        const grad = this.ctx.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.85 * opacity})`);
        grad.addColorStop(0.3, `rgba(230, 245, 255, ${0.55 * opacity})`);
        grad.addColorStop(0.7, `rgba(210, 238, 252, ${0.35 * opacity})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${0.75 * opacity})`);

        this.ctx.fillStyle = grad;
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * opacity})`;
        this.ctx.lineWidth = 1.8;

        // Rounded polygon ice cube shape
        const r = s * 0.18;
        this.ctx.beginPath();
        if (this.ctx.roundRect) {
            this.ctx.roundRect(-s / 2, -s / 2, s, s, r);
        } else {
            this.ctx.rect(-s / 2, -s / 2, s, s);
        }
        this.ctx.fill();
        this.ctx.stroke();

        // Inner refraction facets
        this.ctx.shadowColor = 'transparent';
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * opacity})`;
        this.ctx.lineWidth = 1.2;

        this.ctx.beginPath();
        this.ctx.moveTo(-s * 0.3, -s * 0.35);
        this.ctx.lineTo(s * 0.2, -s * 0.2);
        this.ctx.lineTo(s * 0.35, s * 0.25);
        this.ctx.stroke();

        // Highlight glint / sparkle
        this.ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(-s * 0.25, -s * 0.25, s * 0.08, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    // 3. Floating Fruits & Leaves
    renderFruits() {
        this.fruitParticles.forEach((f) => {
            f.floatPhase += f.floatSpeed * 10;
            f.rotation += f.rotSpeed;

            // Parallax shift
            const parallaxX = (this.mouse.x - this.width / 2) * (0.04 * f.depth);
            const parallaxY = (this.mouse.y - this.height / 2) * (0.04 * f.depth);

            const drawX = f.baseX + Math.sin(f.floatPhase) * 15 + parallaxX;
            const drawY = f.baseY + Math.cos(f.floatPhase * 0.7) * 20 + parallaxY;

            this.drawFruitItem(drawX, drawY, f.size, f.rotation, f.type);
        });
    }

    drawFruitItem(x, y, s, angle, type) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);

        // Ambient glow / drop shadow
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        this.ctx.shadowBlur = 12;
        this.ctx.shadowOffsetY = 6;

        switch (type) {
            case 'avocado-half':
                this.drawAvocadoHalf(s);
                break;
            case 'avocado-slice':
                this.drawAvocadoSlice(s);
                break;
            case 'strawberry':
                this.drawStrawberry(s);
                break;
            case 'blueberry':
                this.drawBlueberry(s);
                break;
            case 'raspberry':
                this.drawRaspberry(s);
                break;
            case 'mulberry':
                this.drawMulberry(s);
                break;
            case 'mint-leaf':
                this.drawMintLeaf(s);
                break;
            case 'ice-mini':
                this.drawRealisticIceCube(0, 0, s * 0.7, 0, 0.7);
                break;
            default:
                this.drawMintLeaf(s);
        }

        this.ctx.restore();
    }

    drawAvocadoHalf(s) {
        // Dark green skin
        this.ctx.fillStyle = '#2d471e';
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, s * 0.65, s * 0.85, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Lighter green flesh
        const fleshGrad = this.ctx.createRadialGradient(0, 0, s * 0.1, 0, 0, s * 0.6);
        fleshGrad.addColorStop(0, '#f2f5ab');
        fleshGrad.addColorStop(0.7, '#c2dc69');
        fleshGrad.addColorStop(1, '#5b8a2e');

        this.ctx.fillStyle = fleshGrad;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, s * 0.58, s * 0.76, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Brown seed pit
        const seedGrad = this.ctx.createRadialGradient(-s * 0.08, -s * 0.08, 0, 0, 0, s * 0.32);
        seedGrad.addColorStop(0, '#94582f');
        seedGrad.addColorStop(0.7, '#633519');
        seedGrad.addColorStop(1, '#3b1d0c');

        this.ctx.fillStyle = seedGrad;
        this.ctx.beginPath();
        this.ctx.ellipse(0, s * 0.1, s * 0.3, s * 0.32, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Seed shine highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.beginPath();
        this.ctx.ellipse(-s * 0.1, s * 0.02, s * 0.07, s * 0.1, -0.4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawAvocadoSlice(s) {
        this.ctx.fillStyle = '#4c7826';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, s * 0.7, 0, Math.PI);
        this.ctx.fill();

        const grad = this.ctx.createLinearGradient(0, -s * 0.2, 0, s * 0.7);
        grad.addColorStop(0, '#f9facb');
        grad.addColorStop(0.7, '#c9e265');
        grad.addColorStop(1, '#7ea934');

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, s * 0.6, 0, Math.PI);
        this.ctx.fill();
    }

    drawStrawberry(s) {
        // Strawberry body gradient
        const grad = this.ctx.createRadialGradient(-s * 0.15, -s * 0.2, 0, 0, 0, s * 0.7);
        grad.addColorStop(0, '#ff4b68');
        grad.addColorStop(0.7, '#e6143c');
        grad.addColorStop(1, '#9e031f');

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.moveTo(0, s * 0.75);
        this.ctx.bezierCurveTo(s * 0.7, s * 0.25, s * 0.6, -s * 0.55, 0, -s * 0.55);
        this.ctx.bezierCurveTo(-s * 0.6, -s * 0.55, -s * 0.7, s * 0.25, 0, s * 0.75);
        this.ctx.fill();

        // Golden yellow seeds
        this.ctx.fillStyle = '#fff4a3';
        const seeds = [
            [-s * 0.2, -s * 0.2], [s * 0.2, -s * 0.2],
            [0, -s * 0.05], [-s * 0.25, s * 0.15],
            [s * 0.25, s * 0.15], [0, s * 0.35]
        ];
        seeds.forEach(([sx, sy]) => {
            this.ctx.beginPath();
            this.ctx.ellipse(sx, sy, 1.4, 2.2, 0.2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Green leaves on top
        this.ctx.fillStyle = '#2e7d32';
        for (let i = -2; i <= 2; i++) {
            this.ctx.beginPath();
            this.ctx.ellipse(i * (s * 0.15), -s * 0.55, s * 0.12, s * 0.22, i * 0.3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawBlueberry(s) {
        const grad = this.ctx.createRadialGradient(-s * 0.2, -s * 0.2, 0, 0, 0, s * 0.6);
        grad.addColorStop(0, '#6889d4');
        grad.addColorStop(0.5, '#2e498c');
        grad.addColorStop(1, '#111d40');

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, s * 0.55, 0, Math.PI * 2);
        this.ctx.fill();

        // Crown on top
        this.ctx.strokeStyle = '#85a5f2';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.arc(0, -s * 0.1, s * 0.18, 0, Math.PI * 2);
        this.ctx.stroke();

        // Soft powdery sheen / bloom
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.beginPath();
        this.ctx.arc(-s * 0.18, -s * 0.18, s * 0.15, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawRaspberry(s) {
        const radius = s * 0.16;
        const positions = [
            [0, -s * 0.35], [-s * 0.22, -s * 0.2], [s * 0.22, -s * 0.2],
            [-s * 0.3, 0], [0, 0], [s * 0.3, 0],
            [-s * 0.2, s * 0.22], [s * 0.2, s * 0.22], [0, s * 0.38]
        ];

        positions.forEach(([dx, dy]) => {
            const grad = this.ctx.createRadialGradient(dx - 2, dy - 2, 0, dx, dy, radius);
            grad.addColorStop(0, '#ff497b');
            grad.addColorStop(0.7, '#c20947');
            grad.addColorStop(1, '#660223');

            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.arc(dx, dy, radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawMulberry(s) {
        const radius = s * 0.14;
        const positions = [
            [0, -s * 0.45], [-s * 0.18, -s * 0.3], [s * 0.18, -s * 0.3],
            [-s * 0.22, -s * 0.1], [0, -s * 0.1], [s * 0.22, -s * 0.1],
            [-s * 0.2, s * 0.1], [0, s * 0.1], [s * 0.2, s * 0.1],
            [-s * 0.18, s * 0.3], [s * 0.18, s * 0.3], [0, s * 0.45]
        ];

        positions.forEach(([dx, dy]) => {
            const grad = this.ctx.createRadialGradient(dx - 1, dy - 1, 0, dx, dy, radius);
            grad.addColorStop(0, '#4d1e57');
            grad.addColorStop(0.7, '#24082e');
            grad.addColorStop(1, '#0e0214');

            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.arc(dx, dy, radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawMintLeaf(s) {
        const grad = this.ctx.createLinearGradient(-s * 0.4, 0, s * 0.4, 0);
        grad.addColorStop(0, '#66bb6a');
        grad.addColorStop(0.5, '#43a047');
        grad.addColorStop(1, '#2e7d32');

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -s * 0.5);
        this.ctx.bezierCurveTo(s * 0.45, -s * 0.2, s * 0.45, s * 0.3, 0, s * 0.5);
        this.ctx.bezierCurveTo(-s * 0.45, s * 0.3, -s * 0.45, -s * 0.2, 0, -s * 0.5);
        this.ctx.fill();

        // Central vein
        this.ctx.strokeStyle = '#a5d6a7';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -s * 0.4);
        this.ctx.lineTo(0, s * 0.4);
        this.ctx.stroke();
    }

    // 4. Condensation Water Droplets
    renderDroplets() {
        this.droplets.forEach((d) => {
            if (d.dripping) {
                d.y += d.speed * this.freshnessLevel;
                if (d.y > this.height * 0.75) {
                    d.y = this.height * 0.32;
                    d.x = this.width / 2 + (Math.random() - 0.5) * 220;
                }
            }

            // Glass droplet 3D convex lens look
            this.ctx.save();
            const grad = this.ctx.createRadialGradient(d.x - d.radius * 0.3, d.y - d.radius * 0.3, 0, d.x, d.y, d.radius);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
            grad.addColorStop(0.4, 'rgba(220, 240, 255, 0.5)');
            grad.addColorStop(0.9, 'rgba(180, 215, 245, 0.2)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0.15)');

            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Specular glint
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(d.x - d.radius * 0.35, d.y - d.radius * 0.35, d.radius * 0.3, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    // 5. Bubbles from Shake / Click
    renderBubbles() {
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const b = this.bubbles[i];
            b.x += b.vx;
            b.y += b.vy;
            b.vy -= 0.08; // buoyancy
            b.alpha -= 0.015;

            if (b.alpha <= 0) {
                this.bubbles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.fillStyle = b.color;
            this.ctx.globalAlpha = Math.max(0, b.alpha);
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Bubble highlight ring
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            this.ctx.stroke();

            this.ctx.restore();
        }
    }
}

window.ParticleEngine = ParticleEngine;
