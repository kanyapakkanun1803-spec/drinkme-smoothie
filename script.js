/**
 * DrinkMe Interactive Application Controller
 * Handles 3D parallax, theme morphing, audio triggers,
 * ingredient modal, freshness slider, and ordering simulator.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current state
    let currentIndex = 0;
    let particleEngine = null;
    let isShaking = false;
    let orderQuantity = 1;
    let selectedSweetness = "50%";
    let selectedIce = "ปกติ (Extra Cold)";
    let selectedAddons = [];

    // DOM Elements
    const body = document.body;
    const bottleWrapper = document.getElementById('bottle-wrapper');
    const bottleContainer = document.getElementById('bottle-container');
    const neckTag = document.getElementById('neck-tag');
    const tagIcon = document.getElementById('tag-icon');
    const tagText = document.getElementById('tag-text');
    const bottleLabel = document.getElementById('bottle-label');
    const labelTitle = document.getElementById('label-title');
    const labelSubtitle = document.getElementById('label-subtitle');
    const labelArt = document.getElementById('label-art');
    const liquidLayer = document.getElementById('liquid-layer');
    const liquidWave = document.getElementById('liquid-wave');
    const condensationLayer = document.getElementById('bottle-condensation');
    const frostLayer = document.getElementById('frost-effect');

    // Content Display Elements
    const drinkNameTh = document.getElementById('drink-name-th');
    const drinkNameEn = document.getElementById('drink-name-en');
    const drinkEdition = document.getElementById('drink-edition');
    const drinkBadge = document.getElementById('drink-badge');
    const drinkPrice = document.getElementById('drink-price');
    const drinkDesc = document.getElementById('drink-desc');
    const ingredientsContainer = document.getElementById('ingredients-container');
    const menuThumbnails = document.getElementById('menu-thumbnails');

    // Metrics & Nutrition Elements
    const metricCoolness = document.getElementById('metric-coolness');
    const metricSmoothness = document.getElementById('metric-smoothness');
    const metricEnergy = document.getElementById('metric-energy');
    const barCoolness = document.getElementById('bar-coolness');
    const barSmoothness = document.getElementById('bar-smoothness');
    const barEnergy = document.getElementById('bar-energy');

    const nutCalories = document.getElementById('nut-calories');
    const nutProtein = document.getElementById('nut-protein');
    const nutFats = document.getElementById('nut-fats');
    const nutFiber = document.getElementById('nut-fiber');

    // Controls
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnShake = document.getElementById('btn-shake');
    const btnSound = document.getElementById('btn-sound');
    const freshnessSlider = document.getElementById('freshness-slider');
    const freshnessValText = document.getElementById('freshness-val-text');
    const btnOpenOrder = document.getElementById('btn-open-order');
    const btnDeconstruct = document.getElementById('btn-deconstruct');

    // Modals
    const ingredientModal = document.getElementById('ingredient-modal');
    const modalIngredientTitle = document.getElementById('modal-ingredient-title');
    const modalIngredientPercent = document.getElementById('modal-ingredient-percent');
    const modalIngredientBenefit = document.getElementById('modal-ingredient-benefit');
    const modalIngredientSource = document.getElementById('modal-ingredient-source');
    const modalIngredientIcon = document.getElementById('modal-ingredient-icon');
    const btnCloseIngredientModal = document.getElementById('btn-close-ingredient-modal');

    const orderModal = document.getElementById('order-modal');
    const orderModalDrinkName = document.getElementById('order-modal-drink-name');
    const orderModalPrice = document.getElementById('order-modal-price');
    const orderQtyDisplay = document.getElementById('order-qty');
    const btnQtyMinus = document.getElementById('btn-qty-minus');
    const btnQtyPlus = document.getElementById('btn-qty-plus');
    const btnCloseOrderModal = document.getElementById('btn-close-order-modal');
    const btnConfirmOrder = document.getElementById('btn-confirm-order');

    // Toast notification
    const toast = document.getElementById('toast-notification');

    // Initialize Particle Engine
    if (window.ParticleEngine) {
        particleEngine = new ParticleEngine('particle-canvas');
    }

    // Generate Menu Switcher Thumbnails
    function initThumbnails() {
        if (!menuThumbnails) return;
        menuThumbnails.innerHTML = '';
        DRINK_MENUS.forEach((menu, idx) => {
            const btn = document.createElement('button');
            btn.className = `menu-tab-btn flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel text-left transition-all ${idx === currentIndex ? 'active' : 'opacity-70 hover:opacity-100'}`;
            btn.setAttribute('data-index', idx);

            const iconCircle = document.createElement('div');
            iconCircle.className = 'w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm';
            iconCircle.style.background = menu.theme.liquidColor;
            iconCircle.innerHTML = (idx <= 1) ? '🥑' : '🍓';

            const info = document.createElement('div');
            info.innerHTML = `
                <div class="text-xs font-bold leading-tight">${menu.nameTh}</div>
                <div class="text-[11px] font-semibold text-emerald-800 opacity-80">฿${menu.price}</div>
            `;

            btn.appendChild(iconCircle);
            btn.appendChild(info);

            btn.addEventListener('click', () => {
                selectMenu(idx);
            });

            menuThumbnails.appendChild(btn);
        });
    }

    // SVG Artwork Generators for Label Centerpiece
    function getLabelArtworkSVG(index) {
        if (index <= 1) {
            // Avocado Illustration SVG
            return `
                <svg viewBox="0 0 100 80" class="label-art-img w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="avoSkin" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#3d5a1f"/>
                            <stop offset="100%" stop-color="#233a0f"/>
                        </radialGradient>
                        <radialGradient id="avoFlesh" cx="40%" cy="40%" r="55%">
                            <stop offset="0%" stop-color="#f5f7be"/>
                            <stop offset="60%" stop-color="#cde874"/>
                            <stop offset="100%" stop-color="#73a832"/>
                        </radialGradient>
                        <radialGradient id="avoPit" cx="35%" cy="35%" r="50%">
                            <stop offset="0%" stop-color="#a06034"/>
                            <stop offset="80%" stop-color="#5a2e12"/>
                            <stop offset="100%" stop-color="#381b09"/>
                        </radialGradient>
                    </defs>
                    <!-- Avocado Slices & Leaves Background -->
                    <path d="M15 65 C20 40, 45 40, 50 65 Z" fill="#699c2e" opacity="0.6"/>
                    <path d="M60 62 C70 45, 90 50, 92 65 Z" fill="#88b548" opacity="0.7"/>
                    <!-- Main Halved Avocado -->
                    <ellipse cx="50" cy="45" rx="26" ry="32" fill="url(#avoSkin)" transform="rotate(-8 50 45)"/>
                    <ellipse cx="50" cy="45" rx="22" ry="28" fill="url(#avoFlesh)" transform="rotate(-8 50 45)"/>
                    <!-- Brown Pit -->
                    <ellipse cx="50" cy="48" rx="12" ry="14" fill="url(#avoPit)" transform="rotate(-8 50 48)"/>
                    <!-- Pit Highlight -->
                    <ellipse cx="46" cy="44" rx="3.5" ry="4.5" fill="#ffffff" opacity="0.45" transform="rotate(-20 46 44)"/>
                </svg>
            `;
        } else {
            // Berry Cluster Illustration SVG
            return `
                <svg viewBox="0 0 100 80" class="label-art-img w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="strawGrad" cx="35%" cy="30%" r="60%">
                            <stop offset="0%" stop-color="#ff5277"/>
                            <stop offset="70%" stop-color="#d81b49"/>
                            <stop offset="100%" stop-color="#880424"/>
                        </radialGradient>
                        <radialGradient id="blueGrad" cx="35%" cy="30%" r="60%">
                            <stop offset="0%" stop-color="#7598e8"/>
                            <stop offset="70%" stop-color="#28448f"/>
                            <stop offset="100%" stop-color="#121e42"/>
                        </radialGradient>
                        <radialGradient id="raspGrad" cx="35%" cy="30%" r="60%">
                            <stop offset="0%" stop-color="#ff4081"/>
                            <stop offset="80%" stop-color="#c2185b"/>
                            <stop offset="100%" stop-color="#660223"/>
                        </radialGradient>
                    </defs>
                    <!-- Strawberry -->
                    <path d="M50 68 C70 55, 68 32, 50 30 C32 32, 30 55, 50 68 Z" fill="url(#strawGrad)"/>
                    <!-- Strawberry Seeds -->
                    <circle cx="44" cy="42" r="1" fill="#fff9b0"/>
                    <circle cx="56" cy="42" r="1" fill="#fff9b0"/>
                    <circle cx="50" cy="50" r="1" fill="#fff9b0"/>
                    <circle cx="45" cy="56" r="1" fill="#fff9b0"/>
                    <circle cx="55" cy="56" r="1" fill="#fff9b0"/>
                    <!-- Calyx leaves -->
                    <path d="M42 30 L50 24 L58 30 L50 33 Z" fill="#2e7d32"/>
                    <!-- Blueberries -->
                    <circle cx="28" cy="52" r="12" fill="url(#blueGrad)"/>
                    <circle cx="26" cy="50" r="3" fill="#ffffff" opacity="0.3"/>
                    <circle cx="72" cy="54" r="13" fill="url(#blueGrad)"/>
                    <circle cx="70" cy="52" r="3" fill="#ffffff" opacity="0.3"/>
                    <!-- Raspberries -->
                    <circle cx="36" cy="36" r="9" fill="url(#raspGrad)"/>
                    <circle cx="64" cy="38" r="8" fill="url(#raspGrad)"/>
                    <!-- Splash Drops -->
                    <circle cx="20" cy="38" r="2.5" fill="#e91e63" opacity="0.8"/>
                    <circle cx="80" cy="42" r="2.5" fill="#9c27b0" opacity="0.8"/>
                </svg>
            `;
        }
    }

    // Switch and Update Selected Menu
    function selectMenu(index) {
        if (index < 0) index = DRINK_MENUS.length - 1;
        if (index >= DRINK_MENUS.length) index = 0;
        currentIndex = index;

        const menu = DRINK_MENUS[currentIndex];

        // Play Sound
        if (window.drinkAudio) {
            window.drinkAudio.playChime();
        }

        // Update CSS Variables & Background
        body.style.background = menu.theme.bgGradient;
        document.documentElement.style.setProperty('--primary-color', menu.theme.primary);
        document.documentElement.style.setProperty('--accent-color', menu.theme.accent);
        document.documentElement.style.setProperty('--card-glow', menu.theme.cardGlow);

        // Update Particle System
        if (particleEngine) {
            particleEngine.setMenu(currentIndex);
        }

        // Bottle Liquid Gradient & Wave
        liquidLayer.style.background = menu.theme.liquidColor;
        liquidWave.style.fill = menu.theme.liquidWave;

        // Bottle Neck Liquid
        const bottleNeckElem = document.querySelector('.bottle-neck');
        if (bottleNeckElem) {
            bottleNeckElem.style.background = menu.theme.liquidColor;
        }

        // Quick order card price
        const quickOrderPrice = document.getElementById('quick-order-price');
        if (quickOrderPrice) {
            quickOrderPrice.textContent = `฿${menu.price}`;
        }

        // Neck Tag Styling & Icon
        neckTag.style.background = menu.theme.labelBg;
        if (menu.tagType === 'sun') {
            tagIcon.textContent = '☀️';
            tagIcon.style.color = '#e65100';
        } else {
            tagIcon.textContent = '❄️';
            tagIcon.style.color = '#0277bd';
        }
        tagText.textContent = menu.tagText;

        // Label Styling
        bottleLabel.style.background = menu.theme.labelBg;
        bottleLabel.style.color = menu.theme.labelText;
        labelTitle.textContent = menu.nameEn;
        labelTitle.style.color = menu.theme.labelText;
        labelSubtitle.textContent = menu.editionEn;
        labelSubtitle.style.color = menu.theme.labelText;
        labelArt.innerHTML = getLabelArtworkSVG(currentIndex);

        // Text & Hero Details
        drinkNameTh.textContent = menu.nameTh;
        drinkNameEn.textContent = menu.nameEn;
        drinkEdition.textContent = `[ ${menu.editionEn} ]`;
        drinkBadge.textContent = menu.badge;
        drinkPrice.textContent = `฿${menu.price}`;
        drinkDesc.textContent = menu.description;

        // Metrics & Progress Bars
        metricCoolness.textContent = menu.freshnessMetrics.coolness;
        metricSmoothness.textContent = menu.freshnessMetrics.smoothness;
        metricEnergy.textContent = menu.freshnessMetrics.energy;

        barCoolness.style.width = menu.freshnessMetrics.coolness;
        barSmoothness.style.width = menu.freshnessMetrics.smoothness;
        barEnergy.style.width = menu.freshnessMetrics.energy;

        // Nutrition Table
        nutCalories.textContent = menu.nutrition.calories;
        nutProtein.textContent = menu.nutrition.protein;
        nutFats.textContent = menu.nutrition.healthyFats;
        nutFiber.textContent = menu.nutrition.fiber;

        // Render Ingredients Interactive Badges
        renderIngredientBadges(menu.ingredients);

        // Update Active Tab in Thumbnails
        document.querySelectorAll('.menu-tab-btn').forEach((btn, idx) => {
            if (idx === currentIndex) {
                btn.classList.add('active');
                btn.style.borderColor = menu.theme.primary;
            } else {
                btn.classList.remove('active');
                btn.style.borderColor = 'transparent';
            }
        });

        // Bottle entrance pop animation
        bottleWrapper.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        bottleWrapper.style.transform = 'scale(0.95) translateY(10px)';
        setTimeout(() => {
            bottleWrapper.style.transform = 'scale(1) translateY(0)';
        }, 80);
    }

    // Render Ingredient Cards
    function renderIngredientBadges(ingredients) {
        if (!ingredientsContainer) return;
        ingredientsContainer.innerHTML = '';

        ingredients.forEach((ing) => {
            const card = document.createElement('div');
            card.className = 'ingredient-badge flex items-center justify-between group';
            card.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-2xl transform group-hover:scale-125 transition-transform duration-300">${ing.icon}</span>
                    <div>
                        <h4 class="font-bold text-sm text-gray-800 leading-tight">${ing.nameTh}</h4>
                        <p class="text-[11px] text-gray-500 font-medium">${ing.nameEn}</p>
                    </div>
                </div>
                <div class="text-right flex items-center gap-2">
                    <span class="text-xs font-black px-2.5 py-1 rounded-full bg-white/80 text-gray-800 shadow-sm border border-gray-100">
                        ${ing.percent}%
                    </span>
                    <span class="text-gray-400 group-hover:text-emerald-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    </span>
                </div>
            `;

            card.addEventListener('click', () => {
                showIngredientDetails(ing);
            });

            ingredientsContainer.appendChild(card);
        });
    }

    // Show Detail Modal for Single Ingredient
    function showIngredientDetails(ing) {
        if (window.drinkAudio) window.drinkAudio.playIceClink();
        modalIngredientIcon.textContent = ing.icon;
        modalIngredientTitle.textContent = ing.nameTh;
        modalIngredientPercent.textContent = `สัดส่วน ${ing.percent}% ของสูตรเครื่องดื่ม`;
        modalIngredientBenefit.textContent = ing.benefit;
        modalIngredientSource.textContent = ing.source;
        ingredientModal.classList.add('active');
    }

    if (btnCloseIngredientModal) {
        btnCloseIngredientModal.addEventListener('click', () => {
            ingredientModal.classList.remove('active');
        });
    }

    if (ingredientModal) {
        ingredientModal.addEventListener('click', (e) => {
            if (e.target === ingredientModal) {
                ingredientModal.classList.remove('active');
            }
        });
    }

    // 3D Parallax Tilt Effect with Mouse
    let isMouseOver = false;
    document.addEventListener('mousemove', (e) => {
        if (isShaking) return;
        const rect = bottleWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
        const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

        // Constrain tilt angle
        const rotateY = deltaX * 18;  // max 18 deg
        const rotateX = -deltaY * 18; // max 18 deg

        bottleWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset bottle rotation on mouse leave
    document.addEventListener('mouseleave', () => {
        if (!isShaking) {
            bottleWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    });

    // Shake to Mix Action
    function shakeBottle() {
        if (isShaking) return;
        isShaking = true;

        if (window.drinkAudio) {
            window.drinkAudio.playShake();
        }

        if (particleEngine) {
            particleEngine.burstParticles(45);
        }

        bottleWrapper.classList.add('shaking');

        // Create micro bubbles burst
        const bubbleContainer = document.querySelector('.micro-bubbles');
        if (bubbleContainer) {
            for (let i = 0; i < 15; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'micro-bubble';
                const size = Math.random() * 8 + 4;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${Math.random() * 85 + 5}%`;
                bubble.style.animationDuration = `${Math.random() * 1.5 + 1.2}s`;
                bubbleContainer.appendChild(bubble);

                setTimeout(() => bubble.remove(), 2500);
            }
        }

        setTimeout(() => {
            bottleWrapper.classList.remove('shaking');
            isShaking = false;
            showToast("✨ เขย่าเสร็จแล้ว! น้ำผลไม้ผสมผสานกันอย่างลงตัว สดชื่น 100%");
        }, 750);
    }

    if (btnShake) {
        btnShake.addEventListener('click', shakeBottle);
    }

    // Freshness & Chill Slider
    if (freshnessSlider) {
        freshnessSlider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (particleEngine) {
                particleEngine.setFreshness(val);
            }

            // Update Frost & Condensation visuals
            if (frostLayer) {
                frostLayer.style.opacity = (val * 0.45).toFixed(2);
            }
            if (condensationLayer) {
                condensationLayer.style.opacity = Math.min(1, 0.4 + val * 0.45).toFixed(2);
            }

            // Text indicator
            if (val <= 0.6) {
                freshnessValText.textContent = "ความเย็นระดับมาตรฐาน (8°C)";
            } else if (val <= 1.2) {
                freshnessValText.textContent = "เย็นฉ่ำ สดชื่นพิเศษ (4°C)";
            } else {
                freshnessValText.textContent = "เย็นสะใจ เกล็ดน้ำแข็ง Frost (-2°C)";
            }
        });
    }

    // Prev / Next Buttons
    if (btnPrev) {
        btnPrev.addEventListener('click', () => selectMenu(currentIndex - 1));
    }
    if (btnNext) {
        btnNext.addEventListener('click', () => selectMenu(currentIndex + 1));
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') selectMenu(currentIndex - 1);
        if (e.key === 'ArrowRight') selectMenu(currentIndex + 1);
        if (e.key === ' ' && !orderModal.classList.contains('active')) {
            e.preventDefault();
            shakeBottle();
        }
    });

    // Sound Toggle Button
    if (btnSound) {
        btnSound.addEventListener('click', () => {
            if (window.drinkAudio) {
                const muted = window.drinkAudio.toggleMute();
                btnSound.innerHTML = muted 
                    ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg><span class="hidden sm:inline">เสียง: ปิด</span>'
                    : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span class="hidden sm:inline">เสียง: เปิด</span>';
                
                showToast(muted ? "🔇 ปิดเสียงจำลองความสดชื่น" : "🔊 เปิดเสียงเอฟเฟกต์ธรรมชาติ");
            }
        });
    }

    // Open Ingredient Deconstructor Modal
    if (btnDeconstruct) {
        btnDeconstruct.addEventListener('click', () => {
            const menu = DRINK_MENUS[currentIndex];
            // Open first ingredient or full list
            showIngredientDetails(menu.ingredients[0]);
        });
    }

    // Order Simulator Customizer Modal
    if (btnOpenOrder) {
        btnOpenOrder.addEventListener('click', () => {
            if (window.drinkAudio) window.drinkAudio.playBottlePop();
            orderQuantity = 1;
            selectedAddons = [];
            updateOrderModalData();
            orderModal.classList.add('active');
        });
    }

    function updateOrderModalData() {
        const menu = DRINK_MENUS[currentIndex];
        orderModalDrinkName.textContent = menu.nameTh;
        orderQtyDisplay.textContent = orderQuantity;

        let total = menu.price * orderQuantity;
        if (selectedAddons.includes('chia')) total += 15 * orderQuantity;
        if (selectedAddons.includes('extra_berry')) total += 20 * orderQuantity;

        orderModalPrice.textContent = `฿${total}`;
    }

    if (btnQtyMinus) {
        btnQtyMinus.addEventListener('click', () => {
            if (orderQuantity > 1) {
                orderQuantity--;
                updateOrderModalData();
            }
        });
    }

    if (btnQtyPlus) {
        btnQtyPlus.addEventListener('click', () => {
            orderQuantity++;
            updateOrderModalData();
        });
    }

    // Sweetness & Ice Selectors inside Modal
    document.querySelectorAll('.sweetness-opt').forEach((opt) => {
        opt.addEventListener('click', (e) => {
            document.querySelectorAll('.sweetness-opt').forEach(b => b.classList.remove('bg-emerald-600', 'text-white'));
            e.currentTarget.classList.add('bg-emerald-600', 'text-white');
            selectedSweetness = e.currentTarget.dataset.val;
        });
    });

    document.querySelectorAll('.addon-checkbox').forEach((cb) => {
        cb.addEventListener('change', (e) => {
            const val = e.target.value;
            if (e.target.checked) {
                selectedAddons.push(val);
            } else {
                selectedAddons = selectedAddons.filter(item => item !== val);
            }
            updateOrderModalData();
        });
    });

    if (btnCloseOrderModal) {
        btnCloseOrderModal.addEventListener('click', () => {
            orderModal.classList.remove('active');
        });
    }

    if (orderModal) {
        orderModal.addEventListener('click', (e) => {
            if (e.target === orderModal) {
                orderModal.classList.remove('active');
            }
        });
    }

    if (btnConfirmOrder) {
        btnConfirmOrder.addEventListener('click', () => {
            if (window.drinkAudio) window.drinkAudio.playSplash();
            orderModal.classList.remove('active');
            const menu = DRINK_MENUS[currentIndex];
            showToast(`🎉 เพิ่ม ${menu.nameTh} (${orderQuantity} ขวด) ลงในตะกร้าสำเร็จ! สดชื่นส่งตรงถึงมือคุณ`);
        });
    }

    // Toast Notification helper
    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.remove('opacity-0', 'translate-y-5');
        toast.classList.add('opacity-100', 'translate-y-0');

        setTimeout(() => {
            toast.classList.remove('opacity-100', 'translate-y-0');
            toast.classList.add('opacity-0', 'translate-y-5');
        }, 3200);
    }

    // Initialize UI
    initThumbnails();
    selectMenu(0);
});
