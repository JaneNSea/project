    // 粒子背景系统
    class ParticleBackground {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.init();
        }

        init() {
            this.resize();
            window.addEventListener('resize', () => this.resize());
            
            // 创建粒子
            for(let i = 0; i < 80; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: `rgba(255,255,255,${Math.random() * 0.3})`
                });
            }
            
            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                if(particle.x > this.canvas.width) particle.x = 0;
                if(particle.x < 0) particle.x = this.canvas.width;
                if(particle.y > this.canvas.height) particle.y = 0;
                if(particle.y < 0) particle.y = this.canvas.height;
                
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color;
                this.ctx.fill();
            });
            
            requestAnimationFrame(() => this.animate());
        }
    }

    // 实时时钟
    function updateClock() {
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        };
        document.getElementById('realtime-clock').textContent = 
            new Date().toLocaleTimeString('zh-CN', options);
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleBackground('particles-canvas');
        setInterval(updateClock, 1000);
    });





    // 滚动动画触发器
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.25 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });





    // 增强版主题管理
    class ThemeManager {
        constructor() {
            this.themeToggle = document.getElementById('theme-toggle');
            this.themeIcon = this.themeToggle.querySelector('i');
            this.init();
        }

        init() {
            this.setInitialTheme();
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        setInitialTheme() {
            const savedTheme = localStorage.getItem('theme');
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
                document.documentElement.classList.add('dark');
                this.themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        }

        toggleTheme() {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', 
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
            this.themeIcon.classList.toggle('fa-moon');
            this.themeIcon.classList.toggle('fa-sun');
        }
    }

    // 数字动画增强
    class CounterAnimator {
        constructor(selector = '[data-count]') {
            this.counters = document.querySelectorAll(selector);
            this.init();
        }

        init() {
            this.counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                this.animateValue(counter, 0, target, 1500);
            });
        }

        animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.textContent = Math.floor(progress * (end - start) + start);
                progress < 1 && requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeManager();
        new CounterAnimator();
        
        // 滚动动画
        const animateOnScroll = () => {
            document.querySelectorAll('.chart-bar').forEach(bar => {
                const rect = bar.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    bar.style.transform = 'scaleX(1)';
                }
            });
        };
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // 初始触发
    });



  
    // 节点坐标数据
    const routeCoordinates = [
        [29.3417, 120.0975],   // 义乌
        [31.8206, 117.2274],   // 合肥
        [34.3418, 108.9398],   // 西安
        [34.7473, 113.6249],   // 郑州
        [36.0611, 103.8342],   // 兰州
        [43.8163, 87.6233],    // 乌鲁木齐
        [45.1667, 82.5667],    // 阿拉山口
        [51.4344, 6.7623],     // 杜伊斯堡
        [40.4168, -3.7038]     // 马德里
    ];

    // 详细节点信息
    const countries = [
        {
            name: "义乌",
            coords: [29.3417, 120.0975],
            image: "义乌.png",
            description: "义乌中欧班列运输多样货物，包括日用百货、汽车配件、机械设备等。出口货物正转向高附加值产品，如智能家电、光伏组件、新能源汽车。特定时期，还提供客户定制专列，如茶叶、防疫物资、跨境电商产品等。义乌市政府提供政策补贴，浙江省商务厅推进铁路货运单物权化改革，实现双向进口。国家发展改革委支持义乌市在国际铁路多式联运规则方面先行先试。"
        },
        {
            name: "西安",
            coords: [34.3418, 108.9398],
            image: "西安.jpg",
            description: "西安站负责运送包括光伏组件和输变电设备在内的工业设备，以及仿唐工艺品和陕西特产石榴等文化产品。作为“一带一路”核心枢纽，西安享有国家级开发区税收优惠，企业所得税减按15%征收。2020年成为国家中欧班列集结中心示范工程，获得中央财政5亿元资金支持。当地简化了跨境电商货物的通关流程，并提供“长安号”专项政策，对本地企业出口货物给予每美元0.1-0.3元的物流补贴。"
        },
        {
            name: "郑州",
            coords: [34.7473, 113.6249],
            image: "郑州.webp",
            description: "郑州站负责运送电子产品和食品，包括苹果手机零部件和速冻食品品牌如三全、思念。作为国家中心城市，郑州的物流枢纽功能被纳入国家规划。河南自贸试验区郑州片区推动“国际物流+跨境电商”模式，实施“一单制”多式联运。政府支持建设陆港经济示范区，郑州国际陆港获得土地和基建资金支持，2023年获得50亿元专项债券。此外，政府还提供“郑欧班列”补贴，对欧洲和中亚方向的班列分别提供约5000元和3000元的补贴。"
        },
        {
            name: "兰州",
            coords: [36.0611, 103.8342],
            image: "兰州.jpg",
            description: "兰州是义新欧班列的关键节点，主要运送本地产品如石油化工设备、有色金属、中药材和特色农产品，以及长三角、京津冀的电子产品、机械设备等中转货物。回程班列则运输哈萨克斯坦小麦、俄罗斯木材、德国汽车配件等。政策上，兰州享受国家级物流枢纽建设支持，地方税收优惠，通关便利化措施，以及10亿元物流产业基金支持冷链物流和跨境电商发展。"
        },
        {
            name: "乌鲁木齐",
            coords: [43.8163, 87.6233],
            image: "乌鲁木齐.jpg",
            description: "乌鲁木齐是中欧班列西通道的关键枢纽，主要运送新疆特产如番茄酱、棉纺织品、干果和光伏材料，也中转东部地区的机电产品和建材。回程班列则运输俄罗斯原油、欧洲红酒、奶粉和汽车等高价值商品。政策上，乌鲁木齐得益于“丝绸之路经济带核心区”定位，享有国家级战略支持、地方物流补贴、口岸便利化和多式联运发展等优势。"
        },
        {
            name: "阿拉山口",
            coords: [45.1667, 82.5667],
            image: "阿拉山口.jpg",
            description: "阿拉山口站主要负责中欧班列集装箱（主要装载机械和化工品）的过境中转，以及本地特产如羊毛制品和新疆干果的出口至中亚。该地区被指定为边境经济合作区，享有“五免五减半”的税收优惠。海关总署实施的“数字口岸”系统使得班列通关时间大幅缩短至30分钟。此外，根据西部大开发政策，企业所得税率为15%，进口资源类商品的增值税可即征即退。"
        },
        {
            name: "杜伊斯堡",
            coords: [51.4344, 6.7623],
            image: "杜伊斯堡.png",
            description: "杜伊斯堡站点的物资运送涉及电子产品、机械零件、日用百货等。回程班列与去程数量均衡，载有汽车整车及零配件、机械配件、医疗器材、食品、日用品、化工材料等货物。政策支持“义新欧”德国集散中心的建立，旨在实现“贸易+中欧班列+海外仓+金融”的供应链新模式。"
        },
        {
            name: "马德里",
            coords: [40.4168, -3.7038],
            image: "马德里.jpg",
            description: "马德里通过义新欧班列运送超过10万种商品，包括电子产品、机械设备等，并提供西班牙特色产品如红酒、橄榄油。西班牙政府为促进中欧班列运营和发展，提供税收优惠和物流补贴等政策支持。班列运营增加了中西贸易规模，特别是为西班牙特色商品开辟了新的输华通路。"
        }
    ];

    // 初始化变量
    let map = null;
    let dynamicRoute = null;
    let currentIndex = 0;

    // 创建自定义图标
   const countryIcon = L.divIcon({
    className: 'country-marker',
    iconSize: [24, 24]
});

// 确保地图已初始化后添加国家标记
document.getElementById('play-route').addEventListener('click', async () => {
    if (!map) {
        map = L.map('dynamic-map', {
            zoomControl: false,
            attributionControl: false
        }).setView([34.7473, 113.6249], 4);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
    }

    countries.forEach(country => {
        L.marker(country.coords, { icon: countryIcon })
            .addTo(map)
            .bindTooltip(country.name, { permanent: true, direction: 'top', className: 'country-label' });
    });
});

    // 播放路线演示
        document.getElementById('play-route').addEventListener('click', async () => {
                const preview = document.getElementById('map-preview');
                const playButton = document.getElementById('play-route');
                
                preview.style.opacity = '0';
                await new Promise(r => setTimeout(r, 500));
                preview.remove();

                if (!map) {
                        map = L.map('dynamic-map', {
                                zoomControl: false,
                                attributionControl: false
                        }).setView([34.7473, 113.6249], 4);

                        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
                }

                dynamicRoute = L.polyline([], {
                        color: '#00FF00',
                        weight: 4,
                        opacity: 0.8
                }).addTo(map);

                playButton.disabled = true;
                await animateRoute();
                resetRoute();
        });

        // 路线动画
        async function animateRoute() {
                while (currentIndex < routeCoordinates.length - 1) {
                        const start = routeCoordinates[currentIndex];
                        const end = routeCoordinates[currentIndex + 1];
                        const steps = 100; // Number of intermediate steps for smooth animation
                        const duration = 1500; // Total duration for each segment
                        const interval = duration / steps;

                        for (let i = 0; i <= steps; i++) {
                                const lat = start[0] + (end[0] - start[0]) * (i / steps);
                                const lng = start[1] + (end[1] - start[1]) * (i / steps);
                                dynamicRoute.addLatLng([lat, lng]);
                                map.panTo([lat, lng], { animate: false });
                                await new Promise(r => setTimeout(r, interval));
                        }

                        updateNodeInfo(countries[currentIndex]);
                        currentIndex++;
                        await new Promise(r => setTimeout(r, 500)); // Delay before moving to the next segment
                }
        }

        // 更新节点信息
        function updateNodeInfo(data) {
                const infoContainer = document.getElementById('node-info');
                document.getElementById('current-node').textContent = data.name;

                const nodeCard = document.createElement('div');
                nodeCard.className = 'node-card';
                nodeCard.innerHTML = `
                        <div class="flex items-start gap-4 mb-4">
                                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg 
                                        flex items-center justify-center">
                                        <i class="fas fa-train text-blue-600 dark:text-blue-300"></i>
                                </div>
                                <div>
                                        <h5 class="font-bold text-lg">${data.name}</h5>
                                        <p class="text-sm text-gray-500">坐标：${data.coords.join(', ')}</p>
                                </div>
                        </div>
                        <img src="${data.image}" 
                                class="w-full h-40 object-cover rounded-lg mb-4"
                                onerror="this.src='./placeholder.jpg'">
                        <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                ${data.description}
                        </p>
                        <div class="mt-4 flex items-center justify-between text-sm">
                                <span class="px-2 py-1 bg-green-100 dark:bg-green-900 
                                        text-green-600 dark:text-green-300 rounded-full">
                                        第 ${currentIndex + 1} 站
                                </span>
                                <span class="text-gray-500 text-xs">
                                        ${new Date().toLocaleTimeString()}
                                </span>
                        </div>
                `;

                infoContainer.prepend(nodeCard);
                infoContainer.scrollTo({ top: 0, behavior: 'smooth' });

                // 保留最近5条记录
                if (infoContainer.children.length > 5) {
                        infoContainer.removeChild(infoContainer.lastChild);
                }
        }

        


    
    
   






