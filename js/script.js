// =================================================================
// ScienceLab - Gelişmiş Dinamik Altyapı Scripti
// =================================================================

document.addEventListener("DOMContentLoaded", () => {

    /* =============================================================
       1. ENTEGRE ATOM LOADER & SAYFA YÜKLENME SÜRECİ
    ============================================================= */
    const loader = document.getElementById("loader");
    const fill = document.querySelector(".loading-fill");
    const percent = document.getElementById("loadingPercent");
    const loadingText = document.getElementById("loadingText");
    
    const loadingPhrases = [
        "Atomlar çarpıştırılıyor...",
        "Simülasyonlar hazırlanıyor...",
        "Teleskoplar kalibre ediliyor...",
        "Laboratuvar temizleniyor...",
        "Bilim dünyası yükleniyor..."
    ];

    let value = 0;

    const phraseInterval = setInterval(() => {
        const randomPhrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
        if (loadingText) loadingText.textContent = randomPhrase;
    }, 700);

    const loading = setInterval(() => {
        if (value >= 100) {
            clearInterval(loading);
            clearInterval(phraseInterval);
            setTimeout(() => {
                if (loader) {
                    loader.style.opacity = "0";
                    loader.style.visibility = "hidden";
                }
                launchRocket();
                setInterval(launchRocket, 12000);
            }, 400);
        } else {
            value += Math.floor(Math.random() * 4) + 1;
            if (value > 100) value = 100;
            if (fill) fill.style.width = value + "%";
            if (percent) percent.textContent = value + "%";
        }
    }, 30);

    /* =============================================================
       2. SCROLL PROGRESS BAR (OKUMA ÇUBUĞU) & BACK TO TOP
    ============================================================= */
    const progressBar = document.getElementById("progressBar");
    const backBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (progressBar) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = progress + "%";
        }

        if (backBtn) {
            if (window.scrollY > 400) {
                backBtn.style.display = "block";
            } else {
                backBtn.style.display = "none";
            }
        }
    });

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =============================================================
       3. MOLEKÜLER VE YILDIZ AĞI ARKA PLAN ANIMASYONU (CANVAS)
    ============================================================= */
    const starCanvas = document.getElementById("starCanvas");
    if (starCanvas) {
        const ctx = starCanvas.getContext("2d");
        let stars = [];
        const STAR_COUNT = 150;
        let mouse = { x: null, y: null };

        function resize() {
            starCanvas.width = window.innerWidth;
            starCanvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resize);
        resize();

        class Star {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * starCanvas.width;
                this.y = Math.random() * starCanvas.height;
                this.radius = Math.random() * 2.2;
                this.speed = 0.15 + Math.random() * 0.5;
                this.alpha = 0.2 + Math.random() * 0.8;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.fill();
            }
            update() {
                this.y -= this.speed;
                if (this.y < 0) {
                    this.y = starCanvas.height;
                    this.x = Math.random() * starCanvas.width;
                }
            }
        }

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(new Star());
        }

        window.addEventListener("mousemove", e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        function connect() {
            for (let a = 0; a < stars.length; a++) {
                for (let b = a + 1; b < stars.length; b++) {
                    const dx = stars[a].x - stars[b].x;
                    const dy = stars[a].y - stars[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(stars[a].x, stars[a].y);
                        ctx.lineTo(stars[b].x, stars[b].y);
                        ctx.strokeStyle = `rgba(100, 180, 255, ${1 - dist / 100})`;
                        ctx.lineWidth = 0.3;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
            stars.forEach(star => {
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - star.x;
                    const dy = mouse.y - star.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        star.x -= dx * 0.002;
                        star.y -= dy * 0.002;
                    }
                }
                star.update();
                star.draw();
            });
            connect();
            requestAnimationFrame(animate);
        }
        animate();
    }

    /* =============================================================
       4. INTERSECTION OBSERVER İLE TETİKLENEN SAYAÇ ANIMASYONU
    ============================================================= */
    const counters = document.querySelectorAll(".counter");
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const counter = entry.target;
            const target = Number(counter.dataset.target);
            let currentCount = 0;
            const speed = Math.max(1, target / 80);

            function update() {
                currentCount += speed;
                if (currentCount >= target) {
                    currentCount = target;
                }
                
                if (target >= 1000) {
                    counter.innerText = Math.floor(currentCount).toLocaleString("tr-TR");
                } else {
                    counter.innerText = Math.floor(currentCount);
                }

                if (currentCount < target) {
                    requestAnimationFrame(update);
                }
            }
            update();
            counterObserver.unobserve(counter);
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    /* =============================================================
       5. SCIENCE AI - STREAMING (KELİME KELİME AKAN) ULTRA HIZLI MOTOR
    ============================================================= */
    const aiButton = document.getElementById('scienceAI');
    const aiPanel = document.getElementById('aiPanel');
    const closeAI = document.getElementById('closeAI');
    const aiForm = document.getElementById('aiForm');
    const aiInput = document.getElementById('aiInput');
    const aiMessages = document.getElementById('aiMessages');

    const fastCache = {
        "fotosentez": "🌿 **Fotosentez**, bitkilerin güneş ışığını kullanarak su ve karbondioksiti besine (glikoza) ve oksijene dönüştürme sürecidir! Bu sayede hem kendilerine enerji sağlarlar hem de bizlere nefes alacak oksijen üretirler. Muhteşem bir doğa fabrikası değil mi? ☀️",
        "atom": "⚛️ **Atom**, maddenin en küçük yapı taşıdır! Merkezinde proton ve nötronlardan oluşan bir çekirdek, etrafında ise çılgınlar gibi dönen elektronlar bulunur. Tıpkı minik bir güneş sistemi gibidir! 🌌",
        "hücre": "🧬 **Hücre**, tüm canlıların en küçük yaşam birimidir! İçinde enerjiyi üreten mitokondri, yönetimi sağlayan çekirdek gibi harika organeller bulunur. Vücudunda bunlardan trilyonlarca var! 🦠",
        "volkan": "🌋 **Volkanlar**, Dünya'nın altındaki magmanın (ergimiş kayaların) yer kabuğundaki çatlaklardan dışarı fırlamasıyla oluşur! Yüzeye çıktığında adı 'lav' olur. Sitemizdeki Volkan Patlaması deneyini denemeyi unutma! 🔥",
        "lav": "🌋 **Volkanlar**, Dünya'nın altındaki magmanın yer kabuğundaki çatlaklardan dışarı fırlamasıyla oluşur! Yüzeye çıktığında adı 'lav' olur. Sitemizdeki Volkan Patlaması deneyini denemeyi unutma! 🔥",
        "dna": "🧬 **DNA**, senin tüm genetik şifreni saklayan dev bir kütüphanedir! Göz renginden boyuna kadar her şey bu sarmal zincirin içinde yazılıdır. Biyoloji odasındaki DNA Eşleşmesi oyununa göz atabilirsin! ✨",
        "yerçekimi": "🍎 **Yerçekimi**, kütlesi olan her şeyin birbirini çekmesidir. Isaac Newton kafasına düşen o meşhur elma sayesinde bu kuvveti formülize etmiştir! Dünya bizi çekmeseydi şu an uzayda süzülüyor olurduk! 🌌",
        "newton": "🍎 **Yerçekimi**, kütlesi olan her şeyin birbirini çekmesidir. Isaac Newton kafasına düşen o meşhur elma sayesinde bu kuvveti formülize etmiştir! Dünya bizi çekmeseydi şu an uzayda süzülüyor olurduk! 🌌",
        "merhaba": "Selam genç bilim insanı! 🔬 Ben Science AI. Fizik, kimya, biyoloji veya uzay hakkında merak ettiğin her şeyi bana sorabilirsin! Bugün neyi keşfetmek istersin? 🚀",
        "selam": "Selam genç bilim insanı! 🔬 Ben Science AI. Fizik, kimya, biyoloji veya uzay hakkında merak ettiğin her şeyi bana sorabilirsin! Bugün neyi keşfetmek istersin? 🚀"
    };

    if (aiButton && aiPanel) {
        aiButton.addEventListener('click', () => {
            aiPanel.style.display = 'flex';
            aiButton.style.display = 'none';
            if (aiMessages) aiMessages.scrollTop = aiMessages.scrollHeight;
        });

        if (closeAI) {
            closeAI.addEventListener('click', () => {
                aiPanel.style.display = 'none';
                aiButton.style.display = 'block';
            });
        }

        if (aiForm) {
            aiForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const originalQuestion = aiInput.value.trim();
                const cleanQuestion = originalQuestion.toLowerCase();
                if (!originalQuestion) return;

                appendAiMessage(originalQuestion, 'user');
                aiInput.value = '';

                const loadingId = appendAiLoading();
                aiMessages.scrollTop = aiMessages.scrollHeight;

                let cachedAnswer = null;
                for (let key in fastCache) {
                    if (cleanQuestion.includes(key)) {
                        cachedAnswer = fastCache[key];
                        break;
                    }
                }

                if (cachedAnswer) {
                    setTimeout(() => {
                        const loadEl = document.getElementById(loadingId);
                        if (loadEl) loadEl.remove();
                        startTextStreaming(cachedAnswer);
                    }, 200);
                    return;
                }

                try {
                    const url = `https://text.pollinations.ai/${encodeURIComponent(originalQuestion)}?system=${encodeURIComponent("Sen ScienceLab eğitim platformunun asistanı Science AI'sın. Bilimsel sorulara bir öğretmen gibi samimi, maksimum 2 paragraf uzunluğunda, bol emojili Türkçe cevaplar ver.")}`;
                    
                    const response = await fetch(url);
                    
                    const loadEl = document.getElementById(loadingId);
                    if (loadEl) loadEl.remove();

                    if (!response.ok) throw new Error("API hatası");

                    const fullText = await response.text();
                    
                    if (!fullText || fullText.trim() === "") {
                        appendAiMessage("Şu an laboratuvarda ufak bir kesinti var, tekrar deneyebilir misin? 🔬", 'bot');
                        return;
                    }

                    startTextStreaming(fullText);

                } catch (error) {
                    console.error("Science AI Hatası:", error);
                    const loadEl = document.getElementById(loadingId);
                    if (loadEl) loadEl.remove();
                    appendAiMessage("Bağlantı hatası oluştu. Lütfen internetini kontrol et. 🌐", 'bot');
                }

                aiMessages.scrollTop = aiMessages.scrollHeight;
            });
        }
    }

    function startTextStreaming(text) {
        const msgDiv = document.createElement('div');
        msgDiv.style.padding = '8px 12px';
        msgDiv.style.borderRadius = '8px';
        msgDiv.style.maxWidth = '85%';
        msgDiv.style.fontSize = '0.9rem';
        msgDiv.style.lineHeight = '1.4';
        msgDiv.style.marginBottom = '5px';
        msgDiv.style.background = 'rgba(255, 255, 255, 0.08)';
        msgDiv.style.color = '#e2e8f0';
        msgDiv.style.alignSelf = 'flex-start';
        aiMessages.appendChild(msgDiv);

        let index = 0;
        const words = text.split(" ");
        
        function stream() {
            if (index < words.length) {
                msgDiv.innerText += (index === 0 ? "" : " ") + words[index];
                msgDiv.innerHTML = msgDiv.innerHTML.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                aiMessages.scrollTop = aiMessages.scrollHeight;
                index++;
                setTimeout(stream, 20);
            }
        }
        stream();
    }

    function appendAiMessage(text, sender) {
        if (!aiMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.style.padding = '8px 12px';
        msgDiv.style.borderRadius = '8px';
        msgDiv.style.maxWidth = '85%';
        msgDiv.style.fontSize = '0.9rem';
        msgDiv.style.lineHeight = '1.4';
        msgDiv.style.marginBottom = '5px';
        
        if (sender === 'user') {
            msgDiv.style.background = '#4f46e5';
            msgDiv.style.color = 'white';
            msgDiv.style.alignSelf = 'flex-end';
        } else {
            msgDiv.style.background = 'rgba(255, 255, 255, 0.08)';
            msgDiv.style.color = '#e2e8f0';
            msgDiv.style.alignSelf = 'flex-start';
        }

        msgDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        aiMessages.appendChild(msgDiv);
    }

    function appendAiLoading() {
        const id = 'ai-loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = id;
        loadingDiv.style.background = 'rgba(255, 255, 255, 0.05)';
        loadingDiv.style.padding = '8px 12px';
        loadingDiv.style.borderRadius = '8px';
        loadingDiv.style.alignSelf = 'flex-start';
        loadingDiv.style.color = '#94a3b8';
        loadingDiv.style.fontSize = '0.85rem';
        loadingDiv.innerHTML = 'Düşünüyor<span class="ai-dots">...</span>';
        
        if (aiMessages) aiMessages.appendChild(loadingDiv);
        return id;
    }

    /* =============================================================
       6. DÜNYAYI DEĞİŞTİREN BİLİM İNSANLARI SLIDER (OTOMATİK VE BUTONLU)
    ============================================================= */
    const track = document.querySelector(".scientist-track");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (track) {
        if (nextBtn) {
            nextBtn.onclick = () => {
                track.scrollBy({ left: 360, behavior: "smooth" });
            };
        }
        if (prevBtn) {
            prevBtn.onclick = () => {
                track.scrollBy({ left: -360, behavior: "smooth" });
            };
        }

        setInterval(() => {
            track.scrollBy({ left: 360, behavior: "smooth" });
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
                track.scrollTo({ left: 0, behavior: "smooth" });
            }
        }, 5000);
    }

    /* =============================================================
       7. CURSOR GLOW (KURSÖR PARLAMASI) & GEZEGEN PARALAKS ETKİSİ
    ============================================================= */
    const glow = document.querySelector(".cursor-glow");
    document.addEventListener("mousemove", (e) => {
        if (glow) {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        }
    });

    const planet = document.querySelector(".planet");
    window.addEventListener("mousemove", (e) => {
        if (!planet) return;
        const x = (window.innerWidth / 2 - e.clientX) / 35;
        const y = (window.innerHeight / 2 - e.clientY) / 35;
        planet.style.transform = `rotate(${performance.now() / 120}deg) translate(${x}px, ${y}px)`;
    });

    /* =============================================================
       8. HERO ROCKET (ROKET FIRLATMA FONKSİYONU)
    ============================================================= */
    const rocket = document.querySelector(".rocket");
    function launchRocket() {
        if (!rocket) return;
        rocket.classList.remove("launch");
        void rocket.offsetWidth;
        rocket.classList.add("launch");
    }

    /* =============================================================
       9. SİTE GENELİ KARANLIK / AYDINLIK TEMA GEÇİŞİ
    ============================================================= */
    const themeBtn = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        if (themeBtn) themeBtn.textContent = "☀️";
    } else {
        if (themeBtn) themeBtn.textContent = "🌙";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
                themeBtn.textContent = "☀️";
            } else {
                localStorage.setItem("theme", "dark");
                themeBtn.textContent = "🌙";
            }
        });
    }

    /* =============================================================
       10. KAYDIRDIKÇA BELİRME ANIMASYONU (SCROLL REVEAL)
    ============================================================= */
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    function revealAnimation() {
        const trigger = window.innerHeight * 0.85;
        reveals.forEach(item => {
            const top = item.getBoundingClientRect().top;
            if (top < trigger) {
                item.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", revealAnimation);
    window.addEventListener("load", revealAnimation);

    /* =============================================================
       11. INTERAKTIF BİLİM İNSANLARI HİKAYE SİSTEMİ (MODAL MOTORU)
    ============================================================= */
    const scientistStories = {
        "albert einstein": {
            name: "Albert Einstein",
            discovery: "Görelilik Kuramı ve Fotoelektrik Etki 🌌",
            emoji: "⚛️",
            history: "Albert Einstein, küçük bir çocukken babasının ona hediye ettiği bir pusulaya bakarak doğanın gizemlerine aşık oldu. Okulda ezberci eğitime her zaman karşı çıktı. Bir patent ofisinde memur olarak çalışırken, boş zamanlarında modern fiziği kökten değiştirecek teoriler üretti. Zamanın ve uzayın bükülebileceğini kanıtlayan Görelilik Kuramı'nı yazdı. Işığın hem dalga hem parçacık olduğunu göstererek Nobel Ödülü kazandı. En büyük mesajı şuydu: <em>'Hayal gücü, bilgiden daha önemlidir.'</em>"
        },
        "nikola tesla": {
            name: "Nikola Tesla",
            discovery: "Alternatif Akım ve Kablosuz Enerji ⚡",
            emoji: "🔌",
            history: "Nikola Tesla, şimşekli ve fırtınalı bir gecede doğdu. Kafasında tasarladığı makineleri hiç çizim yapmadan, sadece zihninde çalıştırıp test edebilecek muazzam bir görsel hafızaya sahipti. Thomas Edison ile yaşadığı 'Akım Savaşları'nı kazanarak tüm dünyanın elektriğe kavuşmasını sağlayan Alternatif Akım (AC) sistemini geliştirdi. Kablosuz enerji aktarımı, radyo ve uzaktan kumanda gibi çağının çok ötesinde icatlar yaptı. Paraya hiç değer vermedi, tüm patentlerini insanlığın ücretsiz elektriğe ulaşması için yırttı."
        },
        "marie curie": {
            name: "Marie Curie",
            discovery: "Radyoaktivite, Polonyum ve Radyum Keşfi 🧬",
            emoji: "🧪",
            history: "Marie Curie, yoksulluk içinde büyüdü ve laboratuvar malzemeleri alabilmek için yıllarca mürebbiyelik yaptı. Bilim dünyasında kadınların dışlandığı bir dönemde, tavan arası gibi bir barakada tonlarca uranyum cevherini günlerce kürekle karıştırarak yepyeni iki element keşfetti: Radyum ve Polonyum! Tarihte iki farklı bilim dalında (Fizik ve Kimya) iki Nobel Ödülü alan tek insandır. Bilim aşkı uğruna laboratuvar önlüğünde taşıdığı radyoaktif ışınlar nedeniyle hayatını kaybederek kanser tedavisinin önünü açtı."
        },
        "isaac newton": {
            name: "Isaac Newton",
            discovery: "Yerçekimi Kanunu ve Hareket Prensipleri 🍎",
            emoji: "🔭",
            history: "1665 yılında büyük bir veba salgını nedeniyle Isaac Newton'ın üniversitesi kapatıldı ve Newton annesinin çiftlik evine sığınarak karantinaya girdi. İşte o karantina günlerinde, bahçedeki bir ağaçtan düşen elma sayesinde evreni bir arada tutan gizli gücü, yani 'Yerçekimi'ni keşfetti! Işığı prizmadan geçirerek renk tayfını buldu ve aynalı teleskopu icat etti. Evrenin belirli matematiksel kurallarla çalıştığını kanıtlayarak klasik fiziğin temelini attı."
        }
    };

    const sModal = document.getElementById("scientistModal");
    const mName = document.getElementById("modalName");
    const mDiscovery = document.getElementById("modalDiscovery");
    const mHistory = document.getElementById("modalHistory");
    const mEmoji = document.getElementById("modalEmoji");
    const mClose = document.getElementById("closeModal");
    const mReadBtn = document.getElementById("modalReadBtn");

    document.querySelectorAll(".scientist-card .detail-btn").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".scientist-card");
            const scientistName = card.querySelector("h3").innerText.toLowerCase().trim();
            const storyData = scientistStories[scientistName];
            
            if (storyData && sModal) {
                mName.innerText = storyData.name;
                mDiscovery.innerText = storyData.discovery;
                mHistory.innerHTML = storyData.history;
                mEmoji.innerText = storyData.emoji;
                sModal.style.display = "flex";
            }
        });
    });

    if (mClose && sModal) {
        mClose.addEventListener("click", () => sModal.style.display = "none");
    }
    if (mReadBtn && sModal) {
        mReadBtn.addEventListener("click", () => {
            sModal.style.display = "none";
            addXP(10); // Hikayeyi okuyan kullanıcıya +10 XP ödül verilir!
        });
    }
    window.addEventListener("click", (e) => {
        if (e.target === sModal) sModal.style.display = "none";
    });

    document.querySelectorAll(".card button").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            alert("🧪 Bu simülasyon veya laboratuvar ekranı çok yakında ScienceLab'e eklenecek!");
        });
    });
});

/* =============================================================
   GAMIFICATION (XP & ROZET SİSTEMİ MOTORU)
============================================================= */
let userStats = JSON.parse(localStorage.getItem("userStats")) || {
    xp: 0,
    level: 1,
    badges: []
};

function initGamification() {
    updateXPUIDisplay();
    checkAndRenderBadges();
}

function addXP(amount, badgeId = null) {
    userStats.xp += amount;
    let nextLevelTarget = userStats.level * 100;
    if (userStats.xp >= nextLevelTarget) {
        userStats.level++;
        alert(`🎉 TEBRİKLER! Seviye Atladın! Yeni Seviyen: Başarılı Bilim İnsanı (Level ${userStats.level}) 🔬`);
    }

    if (badgeId && !userStats.badges.includes(badgeId)) {
        userStats.badges.push(badgeId);
    }

    localStorage.setItem("userStats", JSON.stringify(userStats));
    updateXPUIDisplay();
    checkAndRenderBadges();
}

function updateXPUIDisplay() {
    const xpText = document.getElementById("userXP");
    const levelText = document.getElementById("userLevel");
    if (xpText) xpText.textContent = userStats.xp;
    if (levelText) levelText.textContent = userStats.level;
}

function checkAndRenderBadges() {
    userStats.badges.forEach(badgeId => {
        const badgeCard = document.querySelector(`[data-badge="${badgeId}"]`);
        if (badgeCard) {
            badgeCard.style.opacity = "1";
            badgeCard.style.filter = "none";
            badgeCard.style.borderColor = "var(--success)";
            const statusText = badgeCard.querySelector(".badge-status");
            if (statusText) statusText.textContent = "🔓 KİLİT AÇILDI";
        }
    });
}

window.addEventListener("load", initGamification);