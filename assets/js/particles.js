// 粒子背景效果
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
        this.canvas.id = 'particles-js';
        document.body.appendChild(this.canvas);
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3 },
                move: {
                    enable: true,
                    speed: 3
                }
            },
            interactivity: {
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    }
                }
            }
        });
    }
}

new ParticleBackground();