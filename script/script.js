document.addEventListener('DOMContentLoaded', function () {
    // --- Testimonial Data & Slider ---
    const testimonialsData = [
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
            author: "Dr Marcus Gris", // Original image showed "Dr Morsue ene"
            title: "Senior Surgeon",
            avatarType: "initials", // "initials" or "image"
            avatarValue: "MG", // Initials or image URL "https://via.placeholder.com/50/AABBCC/FFFFFF?text=DM"
            backgroundImage: "signup%201.jpg" // Ensure this image is in the same folder or update path
        },
        {
            text: "The AI-assisted clinical decision making has revolutionized our tumor board meetings. The collaborative features make it easy to share insights with colleagues worldwide.",
            author: "Dr Sarah Johnson",
            title: "Chief Oncologist",
            avatarType: "initials",
            avatarValue: "SJ",
            backgroundImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=70" // Example
        },
        {
            text: "Curano has streamlined our cancer case documentation process. The centralized hub approach saves us hours each week and improves patient outcomes.",
            author: "Dr Robert Kim",
            title: "Medical Director",
            avatarType: "initials",
            avatarValue: "RK",
            backgroundImage: "https://images.unsplash.com/photo-1581091870618-5ab594785996?auto=format&fit=crop&w=1200&q=70" // Example
        },
        {
            text: "Platform intuitive and easy to navigate. Documentation and AI features are top-notch for our oncology department.",
            author: "Dr Emily Carter",
            title: "Clinical Researcher",
            avatarType: "initials",
            avatarValue: "EC",
            backgroundImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=70" // Example
        }
    ];

    const leftPanel = document.getElementById('leftPanel');
    const testimonialContainer = document.getElementById('testimonialContainer');
    const dotsContainer = document.getElementById('testimonialDotsContainer');
    let currentSlideIndex = 0;
    let slideInterval;

    function renderTestimonials() {
        if (!testimonialContainer || !dotsContainer || !leftPanel) return;

        testimonialContainer.innerHTML = ''; // Clear existing
        dotsContainer.innerHTML = ''; // Clear existing

        testimonialsData.forEach((testimonial, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.classList.add('testimonial-slide');
            if (index === 0) slide.classList.add('active');

            let avatarHtml = '';
            if (testimonial.avatarType === 'initials') {
                avatarHtml = `<div class="author-avatar">${testimonial.avatarValue}</div>`;
            } else if (testimonial.avatarType === 'image') {
                avatarHtml = `<div class="author-avatar"><img src="${testimonial.avatarValue}" alt="${testimonial.author}"></div>`;
            }

            slide.innerHTML = `
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    ${avatarHtml}
                    <div class="author-info">
                        <h6>${testimonial.author}</h6>
                        <p>${testimonial.title}</p>
                    </div>
                </div>
            `;
            testimonialContainer.appendChild(slide);

            // Create dot
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                showSlide(index);
                resetSlideInterval();
            });
            dotsContainer.appendChild(dot);
        });
        // Set initial background
        if (testimonialsData.length > 0 && leftPanel) { // Added null check for leftPanel
             leftPanel.style.backgroundImage = `url('${testimonialsData[0].backgroundImage}')`;
        }
    }

    function showSlide(index) {
        // Added null checks for testimonialContainer and dotsContainer
        if (!testimonialContainer || !dotsContainer) return;

        const slides = testimonialContainer.querySelectorAll('.testimonial-slide');
        const dots = dotsContainer.querySelectorAll('.dot');

        if (slides.length === 0 || dots.length === 0) return; // Exit if no slides/dots

        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        if (leftPanel && testimonialsData[index]) { // Added null check for leftPanel and data
            leftPanel.style.backgroundImage = `url('${testimonialsData[index].backgroundImage}')`;
        }
        currentSlideIndex = index;
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000); // Change every 7 seconds
    }

    if (testimonialContainer && dotsContainer && leftPanel) {
        renderTestimonials();
        if (testimonialsData.length > 1) {
             resetSlideInterval();
        }
    }

    // --- Password Toggle ---
    const passwordInput = document.getElementById('password');
    const passwordToggleBtn = document.getElementById('passwordToggleBtn');
    const passwordIcon = document.getElementById('passwordIcon');

    if (passwordInput && passwordToggleBtn && passwordIcon) { // Added null checks
        passwordToggleBtn.addEventListener('click', function () {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordIcon.classList.remove('fa-eye');
                passwordIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordIcon.classList.remove('fa-eye-slash');
                passwordIcon.classList.add('fa-eye');
            }
        });
    }
    
    // --- Custom Checkbox ---
    const termsActualCheckbox = document.getElementById('termsActualCheckbox');
    const termsVisualCheckbox = document.getElementById('termsVisualCheckbox');

    if (termsVisualCheckbox && termsActualCheckbox) {
        termsVisualCheckbox.addEventListener('click', function() {
            termsActualCheckbox.checked = !termsActualCheckbox.checked;
            this.classList.toggle('checked', termsActualCheckbox.checked);
            const checkIcon = this.querySelector('i');
            if(checkIcon) checkIcon.style.display = termsActualCheckbox.checked ? 'block' : 'none';
            
            // Trigger validation for the actual checkbox only if validateField function exists
            if (typeof validateField === 'function') {
                 validateField(termsActualCheckbox, () => termsActualCheckbox.checked, "You must agree to the terms and conditions.");
            }
        });
    }

    // --- Form Validation & Submission ---
    const signupForm = document.getElementById('signupForm');
    const nameField = document.getElementById('name');
    const hospitalNameField = document.getElementById('hospitalName');
    const emailField = document.getElementById('email');
    // passwordInput is already defined above
    // termsActualCheckbox is already defined above
    const formSuccessMessage = document.getElementById('formSuccessMessage');
    const formErrorMessage = document.getElementById('formErrorMessage'); // Assuming you have this for general form errors


    function isValidEmail(email) {
        if(!email) return false; // Handle null or undefined email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Make validateField globally accessible or define it before it's called by checkbox listener
    // For safety, ensure it's defined if elements exist
    function validateField(field, conditionResult, errorMessageText) {
        if (!field) return true; // If field doesn't exist, don't block validation

        // Check if conditionResult is a function and call it, otherwise use its value
        const isValid = typeof conditionResult === 'function' ? conditionResult() : conditionResult;
        
        const feedbackElement = (field.closest('.form-group') || field.closest('.terms-checkbox'))?.querySelector('.invalid-feedback');

        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            if (feedbackElement) feedbackElement.style.display = 'none';
            if (field.type === 'checkbox' && termsVisualCheckbox) {
                termsVisualCheckbox.classList.remove('is-invalid-visual');
            }
            return true;
        } else {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            if (feedbackElement) {
                feedbackElement.textContent = errorMessageText;
                feedbackElement.style.display = 'block';
            }
            if (field.type === 'checkbox' && termsVisualCheckbox) {
                termsVisualCheckbox.classList.add('is-invalid-visual');
            }
            return false;
        }
    }


    if (signupForm) {
        // Add real-time validation on input/change if elements exist
        [nameField, hospitalNameField, emailField, passwordInput].forEach(field => {
            if (field) { // Check if the field exists before adding listener
                field.addEventListener('input', () => {
                    switch(field.id) {
                        case 'name': validateField(field, () => field.value.trim() !== '', "Please enter your name."); break;
                        case 'hospitalName': validateField(field, () => field.value.trim() !== '', "Please enter your hospital name."); break;
                        case 'email': validateField(field, () => isValidEmail(field.value.trim()), "Please enter a valid email address."); break;
                        case 'password': validateField(field, () => field.value.length >= 8, "Password must be at least 8 characters long."); break;
                    }
                });
            }
        });

        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if(formSuccessMessage) formSuccessMessage.style.display = 'none';
            if(formErrorMessage) formErrorMessage.style.display = 'none';

            let isFormValid = true;
            // Validate only if fields exist
            if (nameField) isFormValid &= validateField(nameField, () => nameField.value.trim() !== '', "Please enter your name.");
            if (hospitalNameField) isFormValid &= validateField(hospitalNameField, () => hospitalNameField.value.trim() !== '', "Please enter your hospital name.");
            if (emailField) isFormValid &= validateField(emailField, () => isValidEmail(emailField.value.trim()), "Please enter a valid email address.");
            if (passwordInput) isFormValid &= validateField(passwordInput, () => passwordInput.value.length >= 8, "Password must be at least 8 characters long.");
            if (termsActualCheckbox) isFormValid &= validateField(termsActualCheckbox, () => termsActualCheckbox.checked, "You must agree to the terms and conditions.");

            if (isFormValid) {
                console.log('Sign-up form valid. Storing basic info and redirecting to verification...');
                
                const userData = {
                    name: nameField ? nameField.value.trim() : '',
                    hospitalName: hospitalNameField ? hospitalNameField.value.trim() : '',
                    email: emailField ? emailField.value.trim() : '',
                    // Do NOT store password in localStorage.
                    // This object is just for potentially passing non-sensitive info like email to the next page.
                    timestamp: new Date().toISOString()
                };
                
                // Store minimal, non-sensitive info if needed for the next step (e.g., email for display)
                try {
                    localStorage.setItem('pendingVerificationUser', JSON.stringify({ email: userData.email }));
                } catch (storageError) {
                    console.warn("Could not save user email to localStorage:", storageError);
                }

                // Display success message and then redirect
                if (formSuccessMessage) {
                    formSuccessMessage.textContent = 'Registration successful! Redirecting to verification...';
                    formSuccessMessage.className = 'alert alert-success mt-3'; // Ensure you have alert styles
                    formSuccessMessage.style.display = 'block';
                } else {
                    // Fallback if no dedicated message container
                    alert('Registration successful! Redirecting to verification...');
                }
                
                // Redirect to OTP verification page
                setTimeout(() => {
                    window.location.href = './verification.html'; // Make sure this page exists
                }, 1500); // Delay to allow user to see the message

            } else {
                console.log("Form validation failed.");
                if (formErrorMessage) {
                    formErrorMessage.textContent = 'Please correct the errors in the form.';
                    formErrorMessage.className = 'alert alert-danger mt-3'; // Ensure you have alert styles
                    formErrorMessage.style.display = 'block';
                } else if (formSuccessMessage && !formSuccessMessage.textContent) { 
                    // If no specific error message div, use the success one for errors too
                    // but only if it's not already showing a success message.
                    formSuccessMessage.textContent = 'Please correct the errors in the form.';
                    formSuccessMessage.className = 'alert alert-danger mt-3';
                    formSuccessMessage.style.display = 'block';
                }
            }
        });
    }
});