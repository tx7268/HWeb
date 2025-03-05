document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('myVideo');
    const enterBtn = document.getElementById('enterBtn');
    const videoBackground = document.querySelector('.video-background');

    function enterMainPage() {
        window.location.href = 'main.html';
    }

    // 初始化粒子效果
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
        }
    });

    // 视频点击事件
    videoBackground.addEventListener('click', enterMainPage);
    
    // 按钮点击事件
    enterBtn.addEventListener('click', enterMainPage);

    // 确保视频加载完成
    video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log(e));
    });
});