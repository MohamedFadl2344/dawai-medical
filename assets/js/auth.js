document.addEventListener('DOMContentLoaded', function() {
    const setupPasswordToggles = () => {
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const button = e.currentTarget;
                const input = button.previousElementSibling;
                const icon = button.querySelector('i');

                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
    };

// Password match validation function
    const validatePasswordMatch = () => {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password && confirmPassword) {
            confirmPassword.addEventListener('input', () => {
                if (password.value !== confirmPassword.value) {
                    confirmPassword.setCustomValidity('كلمات المرور غير متطابقة');
                } else {
                    confirmPassword.setCustomValidity('');
                }
            });
        }
    };

    // Verification code input management
    const setupVerificationInputs = () => {
        const inputs = document.querySelectorAll('.verification-input');
        
        if (inputs.length) {
            inputs.forEach((input, index) => {
                // Auto navigation between fields
                input.addEventListener('input', (e) => {
                    if (e.target.value.length === 1) {
                        if (index < inputs.length - 1) {
                            inputs[index + 1].focus();
                        }
                    }
                });

                // Allow backspace and move to previous field
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && !e.target.value && index > 0) {
                        inputs[index - 1].focus();
                    }
                });

                // Prevent entering more than one digit
                input.addEventListener('input', (e) => {
                    if (e.target.value.length > 1) {
                        e.target.value = e.target.value.slice(0, 1);
                    }
                    // Ensure input is only digits
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                });
            });
        }
    };

    // Initialize all functions
    setupPasswordToggles();
    validatePasswordMatch();
    setupVerificationInputs();

    // Form submission management
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add logic to send form data to server here
            // Example: 
            try {
                const formData = new FormData(form);
                const submitButton = form.querySelector('button[type="submit"]');
                
                // Change button state during submission
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                }

                // Add server communication code here
                
                // Restore button to original state
                if (submitButton) {
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = submitButton.getAttribute('data-original-text') || 'Submit';
                    }, 2000);
                }
            } catch (error) {
                console.error('An error occurred:', error);
                // Add error handling code here
            }
        });
    });
});
