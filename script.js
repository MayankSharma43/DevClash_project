// Game State Management
const gameState = {
    completedLevels: JSON.parse(localStorage.getItem('completedLevels')) || [],
    currentLevel: parseInt(localStorage.getItem('currentLevel')) || 1
};

// Update Progress Bar
function updateProgress() {
    const totalLevels = 10;
    const completed = gameState.completedLevels.length;
    const percentage = (completed / totalLevels) * 100;
    
    const progressFill = document.getElementById('overallProgress');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `${completed}/${totalLevels} Levels Complete`;
    }
}

// Update Level Status
function updateLevelStatus() {
    gameState.completedLevels.forEach(level => {
        const statusElement = document.getElementById(`status-${level}`);
        const achievementElement = document.getElementById(`achievement-${level}`);
        
        if (statusElement) {
            statusElement.classList.add('completed');
            statusElement.innerHTML = `
                <span class="status-icon">✅</span>
                <span class="status-text">Completed!</span>
            `;
        }
        
        if (achievementElement) {
            achievementElement.classList.remove('locked');
            achievementElement.classList.add('unlocked');
        }
    });
}

// Mark Level as Complete
function completeLevel(levelNumber) {
    if (!gameState.completedLevels.includes(levelNumber)) {
        gameState.completedLevels.push(levelNumber);
        localStorage.setItem('completedLevels', JSON.stringify(gameState.completedLevels));
        
        // Show celebration
        showCelebration(levelNumber);
        
        // Update UI
        updateProgress();
        updateLevelStatus();
        
        // Update button
        const completeBtn = document.querySelector('.complete-btn');
        if (completeBtn) {
            completeBtn.textContent = '✅ Level Completed!';
            completeBtn.classList.add('completed');
            completeBtn.disabled = true;
        }
    }
}

// Show Celebration Animation
function showCelebration(levelNumber) {
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 3rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        text-align: center;
        font-size: 2rem;
        font-weight: 800;
        animation: popIn 0.5s ease;
    `;
    celebration.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
        <div>Level ${levelNumber} Complete!</div>
        <div style="font-size: 1rem; margin-top: 1rem; opacity: 0.9;">Achievement Unlocked!</div>
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.style.animation = 'popOut 0.5s ease';
        setTimeout(() => celebration.remove(), 500);
    }, 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    updateLevelStatus();
    
    // Check if on level page
    const levelPage = document.body.classList.contains('level-page');
    if (levelPage) {
        const completeBtn = document.querySelector('.complete-btn');
        if (completeBtn) {
            const levelNumber = parseInt(completeBtn.dataset.level);
            
            // Check if already completed
            if (gameState.completedLevels.includes(levelNumber)) {
                completeBtn.textContent = '✅ Level Completed!';
                completeBtn.classList.add('completed');
                completeBtn.disabled = true;
            }
            
            // Add click event
            completeBtn.addEventListener('click', function() {
                completeLevel(levelNumber);
            });
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes popOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Copy Code Functionality
function copyCode(button) {
    const codeBlock = button.previousElementSibling;
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✅ Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}