// script.js

// Common Functions
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const menuBackdrop = document.getElementById('menuBackdrop');
    let menuOpen = false;
    
    if (!hamburgerBtn) return;
    
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (menuOpen && hamburgerBtn && !hamburgerBtn.contains(e.target) && 
            hamburgerMenu && !hamburgerMenu.contains(e.target)) {
            closeMenu();
        }
    });
    
    function toggleMenu() {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    function openMenu() {
        hamburgerMenu.classList.add('active');
        if (menuBackdrop) menuBackdrop.classList.add('active');
        menuOpen = true;
    }
    
    function closeMenu() {
        hamburgerMenu.classList.remove('active');
        if (menuBackdrop) menuBackdrop.classList.remove('active');
        menuOpen = false;
    }
}

// Home Page Functions
function setupHomePage() {
    // Toggle balance visibility
    const eyeIcon = document.getElementById('eyeIcon');
    const balanceAmount = document.getElementById('balanceAmount');
    const originalBalance = '$179,056 USD';
    let balanceVisible = true;
    
    if (eyeIcon && balanceAmount) {
        eyeIcon.addEventListener('click', function() {
            if (balanceVisible) {
                balanceAmount.textContent = '******* USD';
                eyeIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                balanceAmount.textContent = originalBalance;
                eyeIcon.innerHTML = '<i class="fas fa-eye"></i>';
            }
            balanceVisible = !balanceVisible;
        });
    }
    
    // Mountain Time (MT) clock with 12-hour format
    function updateMountainTime() {
        const now = new Date();
        
        // Convert to Mountain Time (UTC-7 or UTC-6 depending on DST)
        // For simplicity, using UTC-6 (no DST handling in this demo)
        const mountainTimeOffset = -6; // UTC-6 for Mountain Time
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const mountainTime = new Date(utcTime + (mountainTimeOffset * 3600000));
        
        // Format time in 12-hour format with AM/PM
        const timeString = mountainTime.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Format date
        const dateString = mountainTime.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        // Update display
        const currentTimeEl = document.getElementById('currentTime');
        const currentDateEl = document.getElementById('currentDate');
        
        if (currentTimeEl) currentTimeEl.textContent = timeString;
        if (currentDateEl) currentDateEl.textContent = dateString;
        
        // Update greeting based on time of day
        updateGreeting(mountainTime);
    }
    
    // Update greeting based on time of day
    function updateGreeting(mountainTime) {
        const currentHour = mountainTime.getHours();
        const greetingEl = document.getElementById('greetingText');
        
        if (!greetingEl) return;
        
        let greeting = "Good Morning";
        
        if (currentHour >= 12 && currentHour < 18) {
            greeting = "Good Afternoon";
        } else if (currentHour >= 18) {
            greeting = "Good Evening";
        }
        
        // Update the greeting text
        greetingEl.textContent = greeting;
    }
    
    // Update time immediately and then every second
    updateMountainTime();
    setInterval(updateMountainTime, 1000);
    
    // Add click interactions to action cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('account-info-card')) {
                alert('Opening Account Information...');
            } else if (this.classList.contains('send-money-card')) {
                alert('Opening Send Money...');
            }
        });
    });
    
    // Top up button functionality
    const topupBtn = document.querySelector('.topup-btn');
    if (topupBtn) {
        topupBtn.addEventListener('click', function() {
            alert('Opening Top Up options...');
        });
    }
    
    // Update active nav button
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Login Page Functions
function setupLoginPage() {
    // Correct login credentials
    const CORRECT_CREDENTIALS = {
        name: "Alfredo Tercero",
        email: "alfredtercero660@gmail.com",
        routine: "124303120",
        pin: "2875"
    };
    
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = document.getElementById('btnText');
    const loginSpinner = document.getElementById('loginSpinner');
    const errorPopup = document.getElementById('errorPopup');
    const closeErrorBtn = document.getElementById('closeError');
    const togglePinBtn = document.getElementById('togglePin');
    const pinInput = document.getElementById('pin');
    
    if (!loginForm) return;
    
    // Toggle PIN visibility
    if (togglePinBtn && pinInput) {
        togglePinBtn.addEventListener('click', function() {
            const type = pinInput.getAttribute('type') === 'password' ? 'text' : 'password';
            pinInput.setAttribute('type', type);
            
            // Toggle eye icon
            const eyeIcon = this.querySelector('i');
            if (type === 'text') {
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });
    }
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get input values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const routine = document.getElementById('routine').value.trim();
        const pin = document.getElementById('pin').value;
        
        // Show loading state
        loginBtn.disabled = true;
        btnText.textContent = "Signing In...";
        loginSpinner.style.display = 'block';
        
        // Simulate network delay
        setTimeout(() => {
            // Validate credentials
            const isNameValid = name.toLowerCase() === CORRECT_CREDENTIALS.name.toLowerCase();
            const isEmailValid = email.toLowerCase() === CORRECT_CREDENTIALS.email.toLowerCase();
            const isRoutineValid = routine === CORRECT_CREDENTIALS.routine;
            const isPinValid = pin === CORRECT_CREDENTIALS.pin;
            
            if (isNameValid && isEmailValid && isRoutineValid && isPinValid) {
                // Successful login - redirect to home page
                btnText.textContent = "Login Successful!";
                loginSpinner.style.display = 'none';
                
                // Simulate redirect delay
                setTimeout(() => {
                    window.location.href = "home.html";
                }, 800);
            } else {
                // Failed login
                loginBtn.disabled = false;
                btnText.textContent = "Sign In";
                loginSpinner.style.display = 'none';
                
                // Show error popup
                showErrorPopup();
            }
        }, 1500);
    });
    
    // Show error popup with animation
    function showErrorPopup() {
        if (errorPopup) {
            errorPopup.classList.add('active');
        }
    }
    
    // Close error popup
    if (closeErrorBtn) {
        closeErrorBtn.addEventListener('click', function() {
            errorPopup.classList.remove('active');
            
            // Clear password field for security
            pinInput.value = '';
            pinInput.focus();
        });
    }
    
    // Add form validation hints
    const pinField = document.getElementById('pin');
    const routineField = document.getElementById('routine');
    
    if (pinField) {
        pinField.addEventListener('input', function(e) {
            // Only allow numbers for PIN
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    if (routineField) {
        routineField.addEventListener('input', function(e) {
            // Only allow numbers for routine number
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on and initialize appropriate functions
    if (document.getElementById('loginForm')) {
        setupLoginPage();
    }
    
    if (document.getElementById('hamburgerBtn')) {
        setupHamburgerMenu();
    }
    
    if (document.getElementById('balanceAmount')) {
        setupHomePage();
    }
});
