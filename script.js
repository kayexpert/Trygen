/**
 * Countdown Timer Script
 * Calculates time remaining and updates UI
 */

const initCountdown = () => {
    // Set launch date to 10 days from current date for demonstration
    // Time calculated safely using Date operations
    const now = new Date();
    const futureDate = new Date(now.getTime() + (10 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
    const countDownDate = futureDate.getTime();

    // DOM Elements
    const elDays = document.getElementById("days");
    const elHours = document.getElementById("hours");
    const elMinutes = document.getElementById("minutes");
    const elSeconds = document.getElementById("seconds");
    const wrapper = document.querySelector(".countdown-wrapper");

    const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const distance = countDownDate - currentTime;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Pad with leading zero and render
        elDays.textContent = String(days).padStart(2, '0');
        elHours.textContent = String(hours).padStart(2, '0');
        elMinutes.textContent = String(minutes).padStart(2, '0');
        elSeconds.textContent = String(seconds).padStart(2, '0');

        // Handle case when countdown hits zero
        if (distance < 0) {
            clearInterval(timer);
            wrapper.innerHTML = "<h2 style='font-size: 3rem; font-weight: 700; background: linear-gradient(to right, #00f5d4, #3a86ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'>We Are Live!</h2>";
        }
    }, 1000);
};

/**
 * Handle Notification Form Submission (Mock Effect)
 */
const initNotifyForm = () => {
    const notifyBtn = document.getElementById("notifyBtn");
    const emailInput = document.querySelector("input[type='email']");

    if (!notifyBtn || !emailInput) return;

    notifyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Simple validation
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            // Success state
            const originalText = notifyBtn.textContent;
            const originalBg = notifyBtn.style.background;
            
            notifyBtn.textContent = "Subscribed! ✨";
            notifyBtn.style.background = "linear-gradient(135deg, #00b09b, #96c93d)";
            notifyBtn.style.pointerEvents = "none";
            
            setTimeout(() => {
                notifyBtn.textContent = originalText;
                notifyBtn.style.background = originalBg;
                notifyBtn.style.pointerEvents = "auto";
                emailInput.value = "";
            }, 3000);
        } else {
            // Error visual feedback
            emailInput.style.borderColor = "#ff4d4d";
            emailInput.style.animation = "shake 0.4s ease";
            
            setTimeout(() => {
                emailInput.style.animation = "none";
                emailInput.style.borderColor = "var(--glass-border)";
            }, 400);
        }
    });

    // Handle Enter key
    emailInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            notifyBtn.click();
        }
    });
};

// Error shake animation utility
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
}
`;
document.head.appendChild(styleSheet);


// Initialization
document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initNotifyForm();
});
