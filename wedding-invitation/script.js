// --- Translation Data ---
const translations = {
    en: {
        greeting: "Dear [NAME],",
        invited: "You're Invited!",
        save_the_date: "Save the Date",
        location_header: "Venue Location",
        days_label: "Days",
        hours_label: "Hours",
        minutes_label: "Minutes",
        seconds_label: "Seconds",
        message_body: "We are overjoyed to invite you to celebrate our marriage. Your presence is the greatest gift.",
    },
    vn: {
        greeting: "Gửi [NAME],",
        invited: "Kính Mời!",
        save_the_date: "Lưu giữ ngày này",
        location_header: "Địa Điểm Tổ Chức",
        days_label: "Ngày",
        hours_label: "Giờ",
        minutes_label: "Phút",
        seconds_label: "Giây",
        message_body: "Chúng tôi vô cùng hạnh phúc khi mời bạn đến chung vui trong ngày cưới. Sự hiện diện của bạn là món quà lớn nhất.",
    }
};

let currentLang = 'en'; // Default language

// Function to get query parameters
function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        receiverName: urlParams.get('to') || '',
        brideName: urlParams.get('bride') || 'The Bride',
        groomName: urlParams.get('groom') || 'The Groom',
        dateTime: urlParams.get('date') || '2026-12-31T12:00:00',
        locationAddress: urlParams.get('location') || 'A Beautiful Venue, City, Country'
    };
}

// Apply the names and date to the HTML
const params = getQueryParams();
document.getElementById('receiver-name').textContent = params.receiverName; // Apply receiver name
document.getElementById('bride-name').textContent = params.brideName;
document.getElementById('groom-name').textContent = params.groomName;

// --- Check for Named Guest ---
const isNamedGuest = params.receiverName && params.receiverName.trim() !== '';

// 1. Hide/Show Greeting and Change H1 Text
const greetingElement = document.querySelector('.greeting');
const h1Element = document.querySelector('[data-key="invited"]'); // Use the data-key selector for H1

if (isNamedGuest) {
    // If name is present, show greeting and set H1 key to 'invited'
    greetingElement.style.display = 'block';
    h1Element.setAttribute('data-key', 'invited');
    // The setLanguage function will inject the name later
} else {
    // If name is NOT present, hide greeting and set H1 key to 'save_the_date'
    greetingElement.style.display = 'none';
    h1Element.setAttribute('data-key', 'save_the_date');
}

const weddingDateTime = setStartDateTime();

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

// --- Location Link Generator ---

function createLocationLink(address) {
    const locationElement = document.getElementById('wedding-location-link');
    
    // 1. URL-encode the address for use in Google Maps query
    const encodedAddress = encodeURIComponent(address);
    
    // 2. Create the Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    // 3. Create the <a> element
    const link = document.createElement('a');
    link.href = googleMapsUrl;
    link.textContent = `📍 ${address}`; // The visible text is the full address
    link.target = "_blank"; // Open in a new tab
    link.rel = "noopener noreferrer"; // Security best practice
    link.classList.add('location-link'); // Add a class for styling

    // 4. Inject the link into the container
    locationElement.innerHTML = ''; // Clear previous content
    locationElement.appendChild(link);
}

// Initial call to create the link
createLocationLink(`${params.locationAddress}`);

// --- Language Toggle Logic ---
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang); // Save preference
    
    // Update content based on data-key
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        let text = translations[lang][key];

        // Special handling for the greeting to insert the receiver name
        if (key === 'greeting') {
            // Only attempt to insert the name if it is a named guest
            if (isNamedGuest) {
                text = text.replace('[NAME]', `<span id="receiver-name">${params.receiverName}</span>`);
                element.innerHTML = text;
            }
        } else {
            element.textContent = text;
        }
    });

    // Update the toggle button icon
    const langToggle = document.getElementById('lang-toggle');
    langToggle.textContent = lang === 'en' ? '🇻🇳' : '🇬🇧'; // Toggle icon

    setStartDateTime();
}

// Event Listener for the toggle button
document.getElementById('lang-toggle').addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'vn' : 'en';
    setLanguage(newLang);
});

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
    // Check local storage for language preference
    const storedLang = localStorage.getItem('lang');
    if (storedLang && ['en', 'vn'].includes(storedLang)) {
        setLanguage(storedLang);
    } else {
        setLanguage('en'); // Default
    }

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


function setStartDateTime() {
    const params = getQueryParams();
    const weddingDateTime = new Date(params.dateTime);
    const locale = currentLang === 'en' ? 'en-US' : 'vi-VN';
    document.getElementById('wedding-date-time').textContent = weddingDateTime.toLocaleString(locale, {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    return weddingDateTime;
}

