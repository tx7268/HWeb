import Chart from 'chart.js/auto';

// 初始化雷达图
function initRadarChart() {
    const ctx = document.getElementById('skillsRadar').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['前端开发', '后端开发', 'UI设计', '数据库', '项目管理'],
            datasets: [{
                data: [90, 75, 85, 70, 80],
                backgroundColor: 'rgba(0, 102, 184, 0.2)',
                borderColor: 'rgba(0, 102, 184, 1)',
                pointBackgroundColor: 'rgba(0, 102, 184, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// 初始化进度条动画
function initProgressBars() {
    const bars = document.querySelectorAll('.skill-progress');
    bars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
}

function toggleSkill(element) {
    const detail = element.querySelector('.skill-detail');
    const progress = element.querySelector('.skill-progress');
    
    // 切换活动状态
    detail.classList.toggle('active');
    
    // 如果展开则显示进度条动画
    if (detail.classList.contains('active')) {
        const progressValue = progress.getAttribute('data-progress');
        setTimeout(() => {
            progress.style.width = `${progressValue}%`;
        }, 100);
    } else {
        progress.style.width = '0';
    }
}

// 初始化进度条
document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach(skill => {
        const detail = skill.querySelector('.skill-detail');
        detail.style.height = '0px';
    });
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initRadarChart();
    initProgressBars();
});