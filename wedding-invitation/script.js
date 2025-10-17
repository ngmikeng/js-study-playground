// Function to get query parameters
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        brideName: urlParams.get('bride') || 'The Bride',
        groomName: urlParams.get('groom') || 'The Groom',
        // Use ISO format YYYY-MM-DDTHH:MM:SS for best compatibility
        dateTime: urlParams.get('date') || '2026-12-31T12:00:00' 
    };
}

// Apply the names and date to the HTML
const params = getQueryParams();
document.getElementById('bride-name').textContent = params.brideName;
document.getElementById('groom-name').textContent = params.groomName;

const weddingDateTime = new Date(params.dateTime);
document.getElementById('wedding-date-time').textContent = weddingDateTime.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
    hour: '2-digit', minute: '2-digit' 
});

//-------------- Countdown Timer
const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDateTime - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById('countdown').innerHTML = "<h2>The celebration has begun! 🎉</h2>";
        return;
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result, ensuring two digits
    countdownElements.days.textContent = String(days).padStart(2, '0');
    countdownElements.hours.textContent = String(hours).padStart(2, '0');
    countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
    countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
}

// Initial call and set the interval
updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);

// ---------------- Dark/Light Theme Toggle ----------------
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Update the button text/emoji
    if (body.classList.contains('dark-mode')) {
        modeToggle.textContent = '☀️'; // Sun for light mode
        localStorage.setItem('mode', 'dark');
    } else {
        modeToggle.textContent = '🌙'; // Moon for dark mode
        localStorage.setItem('mode', 'light');
    }
});

// Check local storage for preferred mode on load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('mode') === 'dark') {
        body.classList.add('dark-mode');
        modeToggle.textContent = '☀️';
    }
});


// ---------------- Heart Animation ----------------
const heartArea = document.querySelector('.heart-animation-area');

function createHeart() {
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; 
    // Randomize starting position (left of the screen)
    heart.style.left = `${Math.random() * 100}vw`; 
    // Randomize animation duration for variety
    heart.style.animationDuration = `${Math.random() * 5 + 5}s`; 
    
    heartArea.appendChild(heart);

    // Remove heart after animation finishes to prevent memory overload
    setTimeout(() => {
        heart.remove();
    }, 10000); // Should match or slightly exceed the max animation duration
}

// Spawn a new heart every 500 milliseconds
setInterval(createHeart, 500);




