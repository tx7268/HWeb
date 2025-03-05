// main.js 文件内容

document.addEventListener("DOMContentLoaded", function() {
    // 初始化个人信息
    loadAboutSection();
    // 初始化项目展示
    loadProjects();
    // 初始化技能展示
    loadSkills();
    // 初始化联系方式
    loadContact();

    // 初始化全屏滚动
    new fullpage('#fullpage', {
        navigation: true,
        scrollingSpeed: 700,
        afterLoad: function(origin, destination, direction) {
            destination.item.classList.add('active');
        },
        onLeave: function(origin, destination, direction) {
            origin.item.classList.remove('active');
            // 更新导航栏活动状态
            updateActiveNav(destination.anchor);
        }
    });

    // 技能交互
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            const progress = item.querySelector('.progress');
            const value = progress.dataset.value;

            // 移除其他技能的active状态
            document.querySelectorAll('.skill-details.active').forEach(el => {
                if (el !== item.querySelector('.skill-details')) el.classList.remove('active');
            });

            // 切换当前技能的状态
            item.querySelector('.skill-details').classList.toggle('active');
            if (item.querySelector('.skill-details').classList.contains('active')) {
                progress.style.width = `${value}%`;
            } else {
                progress.style.width = '0';
            }

            item.querySelector('.progress-text').textContent = `${value}%`;
        });
    });

    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 点击导航链接时关闭移动端菜单
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 平滑滚动到指定部分
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').slice(1);
            fullpage_api.moveTo(sectionId);
        });
    });

    // 时间轴轮播功能
    let currentCard = 0;
    const cards = document.querySelectorAll('.timeline-card');

    function showCard(index) {
        cards.forEach((card, i) => {
            card.style.transform = `translateX(${(i - index) * 120}%) rotateY(0deg)`;
            card.style.opacity = i === index ? '1' : '0.5';
            card.style.zIndex = i === index ? '1' : '0';
        });
    }

    document.querySelector('.next-btn').addEventListener('click', () => {
        currentCard = (currentCard + 1) % cards.length;
        showCard(currentCard);
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentCard = (currentCard - 1 + cards.length) % cards.length;
        showCard(currentCard);
    });

    // 初始化显示
    showCard(currentCard);

    // 初始化时间轴自动轮播
    initTimelineCarousel();
    
    // 初始化技能进度条
    document.querySelectorAll('.skill-progress').forEach(progress => {
        const value = progress.getAttribute('data-progress');
        progress.style.width = `${value}%`;
    });

    // 初始化技能熟练度进度条
    document.querySelectorAll('.mastery-fill').forEach(bar => {
        const progress = bar.dataset.progress;
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 500);
    });
    
    initTimelineCarousel();
    
    // 调整技能熟练度卡片大小
    function adjustSkillCards() {
        const container = document.querySelector('.skills-mastery-grid');
        const items = document.querySelectorAll('.skill-mastery-item');
        if (!container || !items.length) return;
        
        const containerHeight = container.clientHeight;
        const rowHeight = containerHeight / 2; // 2行
        
        items.forEach(item => {
            item.style.height = `${rowHeight - 20}px`; // 减去间距
        });
    }
    
    // 页面加载和调整大小时重新计算
    window.addEventListener('load', adjustSkillCards);
    window.addEventListener('resize', adjustSkillCards);
});

// 更新导航栏活动状态
function updateActiveNav(sectionId) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === sectionId) {
            link.classList.add('active');
        }
    });
}

function loadAboutSection() {
    // 这里可以添加代码来动态加载个人信息
}

function loadProjects() {
    // 这里可以添加代码来动态加载项目卡片
}

function loadSkills() {
    // 这里可以添加代码来动态加载技能可视化
}

function loadContact() {
    // 这里可以添加代码来动态加载联系方式
}

// 技能卡片翻转
function toggleSkillInfo(card) {
    // 移除其他卡片的翻转状态
    document.querySelectorAll('.skill-card').forEach(item => {
        if(item !== card) {
            item.classList.remove('flipped');
        }
    });
    
    // 切换当前卡片的翻转状态
    card.classList.toggle('flipped');
}

// 技能熟练度交互
function toggleMasteryDetail(item) {
    const detail = item.querySelector('.skill-mastery-detail');
    const progressBar = item.querySelector('.mastery-fill');
    const progress = progressBar.dataset.progress;
    
    // 移除其他卡片的活动状态
    document.querySelectorAll('.skill-mastery-item').forEach(card => {
        if(card !== item) {
            card.querySelector('.skill-mastery-detail').classList.remove('active');
        }
    });
    
    // 切换当前卡片状态
    detail.classList.toggle('active');
    
    // 动画进度条
    if(!progressBar.style.width) {
        progressBar.style.width = progress + '%';
    }
    
    // 添加点击动画效果
    item.style.transform = 'scale(0.98)';
    setTimeout(() => {
        item.style.transform = 'translateY(-10px)';
    }, 150);
}

// 更新时间轴自动轮播函数
function initTimelineCarousel() {
    const cards = document.querySelectorAll('.timeline-card');
    const dots = document.querySelectorAll('.timeline-dots .dot');
    const upBtn = document.getElementById('up-btn');
    const downBtn = document.getElementById('down-btn');
    let currentIndex = 0;
    let isAnimating = false;

    function updateSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        // 移除所有active类
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // 添加新的active类
        cards[index].classList.add('active');
        dots[index].classList.add('active');

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide(currentIndex);
        }
    }

    function nextSlide() {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateSlide(currentIndex);
        }
    }

    // 添加事件监听
    upBtn.addEventListener('click', prevSlide);
    downBtn.addEventListener('click', nextSlide);
    
    // 点击导航点切换
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlide(currentIndex);
        });
    });

    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            prevSlide();
        } else if (e.key === 'ArrowDown') {
            nextSlide();
        }
    });

    // 触摸控制
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // 自动播放
    let autoplayInterval;
    
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            if (currentIndex >= cards.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateSlide(currentIndex);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // 鼠标悬停时停止自动播放
    const timelineContainer = document.querySelector('.timeline-container');
    timelineContainer.addEventListener('mouseenter', stopAutoplay);
    timelineContainer.addEventListener('mouseleave', startAutoplay);

    // 初始化显示和自动播放
    updateSlide(0);
    startAutoplay();
}

// 确保DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initTimelineCarousel);

function initTimelineSection() {
    let currentIndex = 0;
    const cards = document.querySelectorAll('.timeline-card');
    const dots = document.querySelectorAll('.timeline-dots .dot');
    const clockTable = document.querySelector('.clock-table');

    function updateSlide(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });

        // 旋转时钟
        clockTable.style.transform = `rotate(${index * -60}deg)`;
    }

    // 添加导航点点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlide(currentIndex);
        });
    });

    // 初始化时钟刻度
    initClockScale();

    // 初始化显示第一张卡片
    updateSlide(0);
}

// 在文档加载完成后初始化
document.addEventListener('DOMContentLoaded', initTimelineSection);

// 大学时光部分的交互逻辑
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.card').length;

function updateSlide(index) {
    // 移除所有卡片的 active 类
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
    });
    
    // 移除所有导航点的 active 类
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });
    
    // 添加当前卡片和导航点的 active 类
    const currentCard = document.querySelectorAll('.card')[index];
    const currentDot = document.querySelectorAll('.dot')[index];
    
    if (currentCard && currentDot) {
        currentCard.classList.add('active');
        currentDot.classList.add('active');
    }
    
    // 更新当前索引
    currentSlide = index;
}

function slideToNext() {
    if (currentSlide < totalSlides - 1) {
        updateSlide(currentSlide + 1);
    }
}

function slideToPrev() {
    if (currentSlide > 0) {
        updateSlide(currentSlide - 1);
    }
}

// 添加导航点点击事件
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => updateSlide(index));
});

// 添加键盘导航
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        slideToPrev();
    } else if (e.key === 'ArrowDown') {
        slideToNext();
    }
});

// 初始化显示第一张卡片
document.addEventListener('DOMContentLoaded', () => {
    updateSlide(0);
});

// 大学时光时间轴数据
const timelineData = {
    '2022': {
        semester: '大一上学期',
        description: [
            '初入大学,怀着对未来的憧憬和热情,开始了新的学习旅程。',
            '加入机器人协会,接触编程,为梦想播下希望的种子。',
            '在课程学习中打下扎实的基础,为未来的专业发展做好准备。'
        ]
    },
    '2023': {
        semester: '大一下学期',
        description: [
            '深入学习专业课程,参与各类竞赛和项目。',
            '在实践中不断成长,逐渐找到自己的方向。',
            '为未来的发展打下坚实基础。'
        ]
    },
    '2024': {
        semester: '大二上学期',
        description: [
            '专注技术提升,在项目实践中积累经验。',
            '通过不断学习和尝试,逐步实现自己的目标。',
            '开始规划未来的职业发展方向。'
        ]
    }
};

function updateTimeline(year) {
    // 更新文字内容
    const data = timelineData[year];
    document.querySelector('.year-title').textContent = year;
    document.querySelector('.semester-title').textContent = data.semester;
    document.querySelector('.description-text').innerHTML = 
        data.description.map(text => `<p>${text}</p>`).join('');

    // 更新动画类
    ['year-title', 'semester-title', 'description-text'].forEach(cls => {
        const element = document.querySelector(`.${cls}`);
        element.classList.remove('active');
        void element.offsetWidth; // 触发重绘
        element.classList.add('active');
    });

    // 旋转时钟
    const rotation = (parseInt(year) - 2022) * 90;
    document.querySelector('.clock-face').style.transform = `rotate(${rotation}deg)`;

    // 更新导航点状态
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.year === year);
    });
}

// 初始化时间轴
document.addEventListener('DOMContentLoaded', () => {
    // 添加导航点点击事件
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            updateTimeline(dot.dataset.year);
        });
    });

    // 初始化显示
    updateTimeline('2022');
});

// 修改教育经历年份切换函数
function nextYear(nextId) {
    // 获取当前和下一个卡片
    const currentCard = document.querySelector('.education-card.active');
    const nextCard = document.getElementById(nextId);
    
    if (!currentCard || !nextCard) return;

    // 添加过渡动画
    currentCard.style.transform = 'translateX(-100%)';
    currentCard.style.opacity = '0';
    
    // 移除当前卡片的active类并添加hidden类
    setTimeout(() => {
        currentCard.classList.remove('active');
        currentCard.classList.add('hidden');
        currentCard.style.transform = 'translateX(100%)';
        
        // 显示下一个卡片
        nextCard.classList.remove('hidden');
        nextCard.classList.add('active');
        nextCard.style.transform = 'translateX(0)';
        nextCard.style.opacity = '1';
    }, 300);
}

// 初始化教育经历section
document.addEventListener('DOMContentLoaded', function() {
    // 确保第一个卡片显示
    const firstCard = document.querySelector('#freshman');
    if (firstCard) {
        firstCard.classList.add('active');
        firstCard.classList.remove('hidden');
    }
});