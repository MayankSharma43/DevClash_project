// Wait for page to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    
    console.log("JavaScript is working!"); // Check in browser console (F12)
    
    // GET ELEMENTS FROM HTML
    const form = document.getElementById('myForm');
    const nameInput = document.getElementById('nameInput');
    const output = document.getElementById('output');
    
    // LISTEN FOR FORM SUBMISSION
    form.addEventListener('submit', function(event) {
        
        // Prevent page from refreshing (default form behavior)
        event.preventDefault();
        
        // GET THE VALUE user typed
        const userName = nameInput.value;
        
        // VALIDATE - check if not empty
        if (userName.trim() === '') {
            output.textContent = 'Please enter a name!';
            output.style.color = 'red';
            return;
        }
        
        // DISPLAY OUTPUT
        output.textContent = `Hello, ${userName}! Welcome to DevClash!`;
        output.style.color = 'green';
        
        // CLEAR INPUT
        nameInput.value = '';
    });
    
});


// ====== MORE USEFUL FUNCTIONS YOU CAN USE ======

// FUNCTION: Show/Hide elements
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

// FUNCTION: Save to browser storage (persists even after refresh)
function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}

// FUNCTION: Get from browser storage
function getFromStorage(key) {
    return localStorage.getItem(key);
}

// FUNCTION: Create new element dynamically
function createCard(title, description) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
    `;
    document.querySelector('.container').appendChild(card);
}

// EXAMPLE USAGE:
// createCard("New Feature", "This was added dynamically!");