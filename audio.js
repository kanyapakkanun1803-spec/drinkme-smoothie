/**
 * Web Audio API Sound Synthesizer
 * Generates realistic refreshing beverage sound effects procedurally.
 * No external audio files required!
 */
class DrinkAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.initialized = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        this.initialized = true;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    // Ice cubes clinking against glass
    playIceClink() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        // Two subtle glass-like high frequencies
        [2400, 3100, 4200].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq + (Math.random() * 200 - 100), now + (i * 0.04));

            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(freq, now + (i * 0.04));
            filter.Q.setValueAtTime(15, now + (i * 0.04));

            gain.gain.setValueAtTime(0, now + (i * 0.04));
            gain.gain.linearRampToValueAtTime(0.12, now + (i * 0.04) + 0.005);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + (i * 0.04) + 0.25);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + (i * 0.04));
            osc.stop(now + (i * 0.04) + 0.3);
        });
    }

    // Refreshing fizz / carbonation / pour sound
    playFizz(duration = 0.8) {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(3500, now);
        filter.frequency.exponentialRampToValueAtTime(2000, now + duration);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
    }

    // Bottle cap popping off
    playBottlePop() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.09);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);

        // Followed immediately by subtle fizz
        setTimeout(() => this.playFizz(0.5), 60);
    }

    // Liquid droplet splash / "Bloop"
    playSplash() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(500 + Math.random() * 150, now);
        osc.frequency.exponentialRampToValueAtTime(950 + Math.random() * 200, now + 0.12);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.22);
    }

    // Switch flavor chime
    playChime() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
        
        chord.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.05);

            gain.gain.setValueAtTime(0, now + idx * 0.05);
            gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.05 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.05);
            osc.stop(now + idx * 0.05 + 0.45);
        });
    }

    // Shake shake sound
    playShake() {
        if (this.isMuted) return;
        this.playIceClink();
        setTimeout(() => this.playSplash(), 80);
        setTimeout(() => this.playIceClink(), 160);
        setTimeout(() => this.playFizz(0.4), 220);
    }
}

window.drinkAudio = new DrinkAudioEngine();
