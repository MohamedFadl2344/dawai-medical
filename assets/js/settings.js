document.addEventListener('DOMContentLoaded', function() {
    // Toggle user type
    const userTypeSwitch = document.getElementById('userTypeSwitch');
    const patientSettings = document.getElementById('patientSettings');
    const doctorSettings = document.getElementById('doctorSettings');

    if (userTypeSwitch) {
        userTypeSwitch.addEventListener('change', function() {
            const isDoctor = this.value === 'doctor';
            patientSettings.style.display = isDoctor ? 'none' : 'block';
            doctorSettings.style.display = isDoctor ? 'block' : 'none';

            // Activate the first tab in the appropriate menu
            const firstTab = isDoctor ? 
                doctorSettings.querySelector('.nav-link') :
                patientSettings.querySelector('.nav-link');
            firstTab.click();
        });
    }

    // Show/hide password
    const togglePasswordButtons = document.querySelectorAll('.password-toggle');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type');
            const newType = type === 'password' ? 'text' : 'password';
            input.setAttribute('type', newType);
            
            // Change icon
            const icon = this.querySelector('i');
            if (newType === 'text') {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Save preferences
    const preferencesForm = document.getElementById('preferencesForm');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add code here to save preferences
            alert('Preferences saved successfully');
        });
    }

    // Update settings
    const settingsForms = document.querySelectorAll('.settings-form');
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add code here to save settings
            alert('Settings saved successfully');
        });
    });
});
