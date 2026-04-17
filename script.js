// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ Page loaded!');
    
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    console.log('Found buttons:', navButtons.length);
    console.log('Found sections:', sections.length);
    
    // Add click event to each button
    navButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            
            console.log('Clicked:', button.getAttribute('data-section'));
            
            // Remove 'active' from all buttons
            navButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // Remove 'active' from all sections
            sections.forEach(function(section) {
                section.classList.remove('active');
            });
            
            // Add 'active' to clicked button
            button.classList.add('active');
            
            // Get the section to show
            const sectionId = button.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('✅ Showing section:', sectionId);
            } else {
                console.error('❌ Section not found:', sectionId);
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Back to top button
    const backBtn = document.getElementById('backToTop');
    
    if (backBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backBtn.classList.add('show');
            } else {
                backBtn.classList.remove('show');
            }
        });
        
        backBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Checklist save functionality
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    
    checkboxes.forEach(function(checkbox, index) {
        // Load saved state
        const saved = localStorage.getItem('check-' + index);
        if (saved === 'true') {
            checkbox.checked = true;
        }
        
        // Save when changed
        checkbox.addEventListener('change', function() {
            localStorage.setItem('check-' + index, checkbox.checked);
        });
    });
});

// Copy code function
function copyCode(button) {
    const codeElement = button.previousElementSibling;
    const text = codeElement.textContent;
    
    // Create temp textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    
    try {
        document.execCommand('copy');
        button.textContent = '✅ Copied!';
        
        setTimeout(function() {
            button.textContent = '📋 Copy';
        }, 2000);
    } catch (err) {
        button.textContent = '❌ Failed';
        console.error('Copy failed:', err);
    }
    
    document.body.removeChild(textarea);
}

console.log('🚀 Script loaded successfully!');