// =====================================
// MOUSE TRAIL EFFECT
// =====================================
const mouseTrailContainer = document.getElementById('mouseTrailContainer');
let lastTrailTime = 0;
const trailInterval = 30; // milliseconds between particles

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    
    // Throttle particle creation
    if (currentTime - lastTrailTime < trailInterval) {
        return;
    }
    
    lastTrailTime = currentTime;
    
    // Create trail particle
    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    
    // Random size variation
    const size = Math.random() * 4 + 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    mouseTrailContainer.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        particle.remove();
    }, 1200);
});

// =====================================
// COUNTDOWN TIMER
// =====================================
const targetDate = new Date('2026-03-01T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// =====================================
// AUDIO PLAYER
// =====================================
const audioPlayer = document.getElementById('audioPlayer');
const audioButton = document.getElementById('audioButton');
const equalizer = document.getElementById('equalizer');
const audioIcon = audioButton.querySelector('.audio-icon');
const audioTitle = audioButton.querySelector('.audio-title');

audioButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        audioButton.classList.add('playing');
        equalizer.classList.add('active');
        audioIcon.textContent = '⏸';
        audioTitle.textContent = 'Now Playing...';
    } else {
        audioPlayer.pause();
        audioButton.classList.remove('playing');
        equalizer.classList.remove('active');
        audioIcon.textContent = '▶';
        audioTitle.textContent = 'Listen to the Spark';
    }
});

// Reset button when audio ends
audioPlayer.addEventListener('ended', () => {
    audioButton.classList.remove('playing');
    equalizer.classList.remove('active');
    audioIcon.textContent = '▶';
    audioTitle.textContent = 'Listen to the Spark';
});

// =====================================
// EMAIL CAPTURE
// =====================================
const emailInput = document.getElementById('emailInput');
const submitButton = document.getElementById('submitButton');
const successMessage = document.getElementById('successMessage');

// Track submission state
let isSubmitting = false;

// Create spark particles on hover
submitButton.addEventListener('mouseenter', () => {
    if (!isSubmitting) {
        createSparks();
    }
});

function createSparks() {
    const sparkCount = 12;
    const buttonRect = submitButton.getBoundingClientRect();
    
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        
        // Random position within button
        const startX = Math.random() * buttonRect.width;
        const startY = Math.random() * buttonRect.height;
        
        // Random trajectory
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100 - 50; // Bias upward
        
        spark.style.left = startX + 'px';
        spark.style.top = startY + 'px';
        spark.style.setProperty('--tx', tx + 'px');
        spark.style.setProperty('--ty', ty + 'px');
        
        submitButton.appendChild(spark);
        
        // Remove after animation
        setTimeout(() => spark.remove(), 600);
    }
}

// Email validation regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    emailInput.style.borderColor = 'rgba(255, 100, 100, 0.8)';
    
    // Update success message to show error
    successMessage.textContent = '✗ ' + message;
    successMessage.style.backgroundColor = 'rgba(220, 38, 38, 0.9)';
    successMessage.classList.add('show');
    
    setTimeout(() => {
        emailInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        successMessage.classList.remove('show');
        // Reset success message styling
        setTimeout(() => {
            successMessage.style.backgroundColor = 'rgba(220, 38, 38, 0.95)';
            successMessage.textContent = '✓ You\'re in. The fire rises.';
        }, 300);
    }, 3000);
}

// Show success message
function showSuccess(message) {
    successMessage.textContent = '✓ ' + message;
    successMessage.style.backgroundColor = 'rgba(220, 38, 38, 0.95)';
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Submit email to backend
async function submitEmail() {
    const email = emailInput.value.trim();
    
    // Client-side validation
    if (!email) {
        showError('Email address is required');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Prevent double submission
    if (isSubmitting) {
        return;
    }
    
    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.textContent = 'IGNITING...';
    
    // Create burst of sparks on click
    createSparks();
    createSparks();
    
    try {
        // Send to PHP backend
        const response = await fetch('submit-email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Success
            emailInput.value = '';
            showSuccess(data.message || 'You\'re in. The fire rises.');
        } else {
            // Server returned error
            showError(data.message || 'Something went wrong. Please try again.');
        }
    } catch (error) {
        // Network or other error
        console.error('Submission error:', error);
        showError('Connection error. Please check your internet and try again.');
    } finally {
        // Reset button state
        isSubmitting = false;
        submitButton.disabled = false;
        submitButton.textContent = 'IGNITE';
    }
}

// Handle button click
submitButton.addEventListener('click', submitEmail);

// Allow Enter key to submit
emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        submitEmail();
    }
});

// =====================================
// EMBER PARTICLES
// =====================================
const embersContainer = document.getElementById('embersContainer');
const emberCount = 30;

function createEmber() {
    const ember = document.createElement('div');
    ember.className = 'ember';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 100;
    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * 10;
    
    ember.style.width = size + 'px';
    ember.style.height = size + 'px';
    ember.style.left = startX + '%';
    ember.style.setProperty('--drift', drift + 'px');
    ember.style.animationDuration = duration + 's';
    ember.style.animationDelay = delay + 's';
    
    embersContainer.appendChild(ember);
    
    // Remove and recreate after animation
    setTimeout(() => {
        ember.remove();
        createEmber();
    }, (duration + delay) * 1000);
}

// Create initial embers
for (let i = 0; i < emberCount; i++) {
    setTimeout(() => createEmber(), i * 300);
}

// =====================================
// MEMBER CARD INTERACTIONS
// =====================================
const memberCards = document.querySelectorAll('.member-card');

memberCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const color = card.getAttribute('data-color');
        card.style.animation = 'cardPulse 1.5s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.animation = 'none';
    });
});

// Add card pulse animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes cardPulse {
        0%, 100% {
            box-shadow: 0 0 20px var(--glow-color);
        }
        50% {
            box-shadow: 0 0 40px var(--glow-color);
        }
    }
`;
document.head.appendChild(style);

// =====================================
// PERFORMANCE: Reduce particles on mobile
// =====================================
if (window.innerWidth < 768) {
    const allEmbers = document.querySelectorAll('.ember');
    allEmbers.forEach((ember, index) => {
        if (index % 2 === 0) {
            ember.remove();
        }
    });
}

// =====================================
// ACCESSIBILITY: Keyboard navigation
// =====================================
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && document.activeElement === audioButton) {
        e.preventDefault();
        audioButton.click();
    }
});

// =====================================
// PRELOAD AUDIO
// =====================================
audioPlayer.preload = 'auto';

console.log('🔥 BLAZE LACE - Ignition sequence initiated');
