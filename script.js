// ==========================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// ==========================================

let selectedType = 'anime'; // anime o manhwa

// Rangos con probabilidades y colores
const rarities = [
    { name: 'COMMON', color: '#9e9e9e', probability: 40, class: 'rarity-common' },
    { name: 'UNCOMMON', color: '#4caf50', probability: 25, class: 'rarity-uncommon' },
    { name: 'RARE', color: '#2196f3', probability: 15, class: 'rarity-rare' },
    { name: 'EPIC', color: '#9c27b0', probability: 10, class: 'rarity-epic' },
    { name: 'LEGENDARY', color: '#ff9800', probability: 6, class: 'rarity-legendary' },
    { name: 'MYTHIC', color: '#e91e63', probability: 3, class: 'rarity-mythic' },
    { name: 'DIVINE', color: '#00f2ff', probability: 0.8, class: 'rarity-divine' },
    { name: 'CELESTIAL', color: '#ffd700', probability: 0.2, class: 'rarity-celestial' }
];

// ==========================================
// PARTÍCULAS DE FONDO
// ==========================================

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let dots = [];

function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}

window.addEventListener('resize', resize); 
resize();

for(let i = 0; i < 100; i++) {
    dots.push({
        x: Math.random() * canvas.width, 
        y: Math.random() * canvas.height, 
        r: Math.random() * 2, 
        v: Math.random() * 0.5 + 0.2,
        opacity: Math.random()
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(d => {
        ctx.fillStyle = `rgba(0, 242, 255, ${d.opacity * 0.3})`;
        ctx.beginPath(); 
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); 
        ctx.fill();
        d.y -= d.v; 
        d.opacity = Math.sin(Date.now() * 0.001 + d.x) * 0.5 + 0.5;
        if(d.y < 0) {
            d.y = canvas.height;
            d.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animate);
}

animate();

// ==========================================
// SELECTOR DE TIPO (ANIME/MANHWA)
// ==========================================

const typeButtons = document.querySelectorAll('.type-btn');

typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        typeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedType = btn.dataset.type;
    });
});

// ==========================================
// SISTEMA DE RAREZA CON PROBABILIDADES
// ==========================================

function getRarity() {
    const random = Math.random() * 100;
    let accumulated = 0;
    
    for(let rarity of rarities) {
        accumulated += rarity.probability;
        if(random <= accumulated) {
            return rarity;
        }
    }
    
    return rarities[0]; // Fallback a COMMON
}

// ==========================================
// EFECTOS VISUALES ÉPICOS
// ==========================================

function createEpicParticles(rarity) {
    const container = document.getElementById('epic-particles');
    container.innerHTML = '';
    
    // Solo para rarezas altas
    if(['LEGENDARY', 'MYTHIC', 'DIVINE', 'CELESTIAL'].includes(rarity.name)) {
        // Crear partículas flotantes
        for(let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'epic-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.background = rarity.color;
            particle.style.boxShadow = `0 0 10px ${rarity.color}`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(particle);
        }
        
        // Crear anillos expansivos para CELESTIAL y DIVINE
        if(['DIVINE', 'CELESTIAL'].includes(rarity.name)) {
            for(let i = 0; i < 3; i++) {
                const ring = document.createElement('div');
                ring.className = 'epic-ring';
                ring.style.borderColor = rarity.color;
                ring.style.animationDelay = i * 0.5 + 's';
                container.appendChild(ring);
            }
        }
        
        // Limpiar después de 5 segundos
        setTimeout(() => {
            container.innerHTML = '';
        }, 5000);
    }
}

function triggerShockwave(color) {
    const shockwave = document.getElementById('shockwave');
    shockwave.style.borderColor = color;
    shockwave.style.animation = 'none';
    setTimeout(() => {
        shockwave.style.animation = 'shockwaveExpand 1s ease-out';
    }, 10);
    
    setTimeout(() => {
        shockwave.style.animation = 'none';
    }, 1000);
}

function triggerFlash(color) {
    const flash = document.getElementById('flash');
    flash.style.background = `radial-gradient(circle, ${color}, white, ${color})`;
    flash.style.opacity = '1';
    setTimeout(() => { 
        flash.style.transition = 'opacity 0.5s'; 
        flash.style.opacity = '0'; 
    }, 100);
}

// ==========================================
// ANIMACIÓN DE ROLL ÉPICA
// ==========================================

function showRollAnimation(rarity) {
    const rollAnimation = document.getElementById('roll-animation');
    const rarityText = document.getElementById('rarity-text');
    const symbolsContainer = document.getElementById('mystic-symbols');
    const wavesContainer = document.getElementById('energy-waves');
    const burstContainer = document.getElementById('particle-burst-container');
    
    // Aplicar color de rareza
    document.documentElement.style.setProperty('--rarity-color', rarity.color);
    
    // Mostrar animación
    rollAnimation.classList.add('active');
    
    // Crear símbolos místicos orbitando
    const symbols = ['◆', '★', '◈', '✦', '◉', '◊', '✧', '◇', '⬟', '⬢', '⬣', '⬡'];
    symbolsContainer.innerHTML = '';
    
    for(let i = 0; i < 12; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'mystic-symbol';
        symbol.textContent = symbols[i];
        symbol.style.animationDelay = (i * 0.3) + 's';
        symbol.style.animationDuration = (3 + Math.random() * 2) + 's';
        symbol.style.fontSize = (2 + Math.random()) + 'rem';
        symbolsContainer.appendChild(symbol);
    }
    
    // Crear ondas de energía escalonadas
    wavesContainer.innerHTML = '';
    for(let i = 0; i < 8; i++) {
        const wave = document.createElement('div');
        wave.className = 'energy-wave';
        wave.style.animationDelay = (i * 0.2) + 's';
        wave.style.animationDuration = (1.5 + i * 0.2) + 's';
        wavesContainer.appendChild(wave);
    }
    
    // Explosión de partículas después de 1.5s
    setTimeout(() => {
        burstContainer.innerHTML = '';
        const particleCount = rarity.name === 'CELESTIAL' ? 80 : 
                             rarity.name === 'DIVINE' ? 70 : 
                             rarity.name === 'MYTHIC' ? 60 : 50;
        
        for(let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-burst';
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 150 + Math.random() * 150;
            particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            particle.style.animationDelay = Math.random() * 0.2 + 's';
            particle.style.animationDuration = (1 + Math.random() * 0.5) + 's';
            burstContainer.appendChild(particle);
        }
    }, 1500);
    
    // Mostrar texto de rareza con efecto dramático
    setTimeout(() => {
        rarityText.textContent = rarity.name;
        rarityText.style.color = rarity.color;
        rarityText.style.textShadow = `
            0 0 30px ${rarity.color}, 
            0 0 60px ${rarity.color},
            0 0 90px ${rarity.color},
            0 0 120px ${rarity.color}
        `;
        
        // Vibración de pantalla para rarezas épicas
        if(['LEGENDARY', 'MYTHIC', 'DIVINE', 'CELESTIAL'].includes(rarity.name)) {
            document.body.style.animation = 'screenShake 0.5s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
        }
    }, 1500);
    
    // Ocultar animación después de 3.5s
    return new Promise(resolve => {
        setTimeout(() => {
            rollAnimation.classList.remove('active');
            symbolsContainer.innerHTML = '';
            wavesContainer.innerHTML = '';
            burstContainer.innerHTML = '';
            resolve();
        }, 3500);
    });
}

// ==========================================
// FUNCIÓN PRINCIPAL DE INVOCACIÓN (ACTUALIZADA)
// ==========================================

async function summon() {
    const btn = document.querySelector('.btn-summon');
    const scene = document.getElementById('scene');
    const ui = document.getElementById('ui-main');
    
    btn.style.display = 'none';
    scene.style.display = 'block';

    try {
        // Determinar rareza
        const rarity = getRarity();
        
        // Obtener personaje según tipo seleccionado
        let char;
        if(selectedType === 'anime') {
            char = await fetchAnimeCharacter();
        } else {
            char = await fetchManhwaCharacter();
        }
        
        // Ocultar dado y mostrar animación de roll
        setTimeout(async () => {
            scene.style.display = 'none';
            
            // Mostrar animación épica de roll
            await showRollAnimation(rarity);
            
            // Llenar datos de la carta
            document.getElementById('r-name').innerText = char.name;
            document.getElementById('r-img').src = char.image;
            document.getElementById('r-desc').innerText = char.description;
            document.getElementById('r-rank').innerText = rarity.name;
            
            // Aplicar color y clase de rareza
            document.documentElement.style.setProperty('--rarity-color', rarity.color);
            const card = document.getElementById('main-card');
            card.className = 'card ' + rarity.class;
            
            // Efectos visuales finales
            triggerShockwave(rarity.color);
            triggerFlash(rarity.color);
            createEpicParticles(rarity);
            
            ui.style.display = 'none';
            document.getElementById('card-result').style.display = 'block';
            
            // Animar HP
            setTimeout(() => {
                const hp = Math.floor(Math.random() * 40) + 60;
                document.getElementById('r-hp-fill').style.width = hp + '%';
                document.getElementById('r-hp-num').innerText = hp + '% HP';
            }, 500);
        }, 2500);

    } catch (e) { 
        console.error(e);
        alert("Error de conexión con el sistema"); 
        location.reload(); 
    }
}

// ==========================================
// OBTENER PERSONAJES DE ANIME
// ==========================================

async function fetchAnimeCharacter() {
    const page = Math.floor(Math.random() * 50) + 1;
    const res = await fetch(`https://api.jikan.moe/v4/top/characters?page=${page}`);
    const data = await res.json();
    const char = data.data[Math.floor(Math.random() * data.data.length)];
    
    return {
        name: char.name,
        image: char.images.jpg.image_url,
        description: char.about ? char.about.split('\n')[0].substring(0, 150) : "Datos del sistema protegidos."
    };
}

// ==========================================
// OBTENER PERSONAJES DE MANHWA
// ==========================================

async function fetchManhwaCharacter() {
    // Usando Jikan API con filtro de manga coreano
    const page = Math.floor(Math.random() * 20) + 1;
    const res = await fetch(`https://api.jikan.moe/v4/top/manga?page=${page}&type=manhwa`);
    const data = await res.json();
    const manhwa = data.data[Math.floor(Math.random() * data.data.length)];
    
    return {
        name: manhwa.title,
        image: manhwa.images.jpg.large_image_url || manhwa.images.jpg.image_url,
        description: manhwa.synopsis ? manhwa.synopsis.substring(0, 150) + '...' : "Manhwa legendario del sistema."
    };
}

// ==========================================
// FUNCIÓN DE DESCARGA CORREGIDA
// ==========================================

function download() {
    const captureArea = document.getElementById('capture-area');
    const card = document.getElementById('main-card');
    const rankTag = document.querySelector('.rank-tag');
    const hpFill = document.getElementById('r-hp-fill');
    
    // Guardar estados originales
    const originalCardStyle = card.style.cssText;
    const originalRankAnimation = rankTag.style.animation;
    const originalHpAnimation = hpFill.style.animation;
    
    // Congelar animaciones
    card.style.animation = 'none';
    card.style.transform = 'none';
    card.style.transition = 'none';
    rankTag.style.animation = 'none';
    hpFill.style.animation = 'none';
    
    // Pequeño delay para aplicar cambios
    setTimeout(() => {
        html2canvas(captureArea, {
            useCORS: true,
            backgroundColor: "#030305",
            scale: 3,
            logging: false,
            imageTimeout: 0
        }).then(canvas => {
            // Restaurar animaciones
            card.style.cssText = originalCardStyle;
            rankTag.style.animation = originalRankAnimation;
            hpFill.style.animation = originalHpAnimation;
            
            // Crear y descargar
            const link = document.createElement('a');
            const charName = document.getElementById('r-name').innerText.replace(/\s+/g, '_');
            const rarityName = document.getElementById('r-rank').innerText;
            link.download = `${rarityName}_${charName}_CARD.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(err => {
            console.error('Error en descarga:', err);
            alert('Error al generar imagen. Intenta de nuevo.');
            
            // Restaurar en caso de error
            card.style.cssText = originalCardStyle;
            rankTag.style.animation = originalRankAnimation;
            hpFill.style.animation = originalHpAnimation;
        });
    }, 100);
}
