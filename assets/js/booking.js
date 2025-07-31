// Add this code in a new file booking.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.remove('active');
            stepIndicators[index].classList.remove('active');
        });
        
        steps[stepIndex].classList.add('active');
        stepIndicators[stepIndex].classList.add('active');
        
        // Update navigation buttons
        if (stepIndex === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }
        
        if (stepIndex === steps.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    // Validate current step data
    function validateStep(stepIndex) {
        const currentStepElement = steps[stepIndex];
        const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    }

    nextBtn.addEventListener('click', function() {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });

    prevBtn.addEventListener('click', function() {
        currentStep--;
        showStep(currentStep);
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateStep(currentStep)) {
            // Here you can add code to send data to the server
            alert('Booking request submitted successfully! You will be contacted soon to confirm your booking.');
            form.reset();
            currentStep = 0;
            showStep(currentStep);
        }
    });

    // Update doctors list when specialty is selected
    const specialtySelect = document.getElementById('specialty');
    const doctorSelect = document.getElementById('doctor');
    
    specialtySelect.addEventListener('change', function() {
        // Here you can add code to fetch doctors by specialty from the server
        // Simple example:
        doctorSelect.innerHTML = '<option value="">Select doctor</option>';
        if (this.value) {
            const doctors = {
                'general': ['Dr. Ahmed Mohamed', 'Dr. Mohamed Ali'],
                'dental': ['Dr. Sarah Ahmed', 'Dr. Omar Khaled'],
                'cardiology': ['Dr. Khaled Ibrahim', 'Dr. Laila Omar'],
                'pediatrics': ['Dr. Huda Said', 'Dr. Yasser Mahmoud']
            };
            
            doctors[this.value].forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor;
                option.textContent = doctor;
                doctorSelect.appendChild(option);
            });
        }
    });

    // Update available times when date is selected
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    
    dateInput.addEventListener('change', function() {
        // Here you can add code to fetch available times from the server
        // Simple example:
        timeSelect.innerHTML = '<option value="">Select time</option>';
        if (this.value) {
            const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00'];
            times.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            });
        }
    });
});