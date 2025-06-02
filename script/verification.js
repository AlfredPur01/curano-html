document.addEventListener('DOMContentLoaded', () => {
    const otpInputsContainer = document.getElementById('otpInputs');
    const verifyButton = document.getElementById('verifyOtpButton');
    const timerDisplay = document.getElementById('timerDisplay');
    const resendCodeLink = document.getElementById('resendCodeLink');
    const messageDisplay = document.getElementById('messageDisplay');

    // Ensure all critical elements exist before proceeding
    if (!otpInputsContainer || !verifyButton || !timerDisplay || !resendCodeLink || !messageDisplay) {
        console.error("OTP Page: One or more essential HTML elements are missing. Script cannot run.");
        return;
    }

    const otpInputs = [...otpInputsContainer.querySelectorAll('.otp-input')];
    const OTP_LENGTH = 6;
    let timerInterval;
    let timeLeft = 60; // 60 seconds for the timer
    // let generatedOtp = ''; // No longer strictly needed for verification, but can be used for hint/resend simulation

    function simulateOtpGeneration() {
        // Simulate OTP generation for "resend" and initial hint if desired
        // For testing, any 6-digit code will work, so this is more for UI consistency.
        let otpForHint = '';
        for (let i = 0; i < OTP_LENGTH; i++) {
            otpForHint += Math.floor(Math.random() * 10).toString();
        }
        console.log(`Simulated new OTP (for hint/testing): ${otpForHint}`);
        messageDisplay.textContent = `(Hint: Enter any 6 digits, e.g., ${otpForHint})`;
        messageDisplay.className = 'message-display'; // Reset class
    }


    function startTimer() {
        timeLeft = 60; // Reset timer
        resendCodeLink.classList.add('disabled-link');
        timerDisplay.style.color = '#ffab40'; // Default timer color

        clearInterval(timerInterval); // Clear any existing interval
        timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "00:00";
                timerDisplay.style.color = '#ff8a80'; // Change color when expired
                resendCodeLink.classList.remove('disabled-link');
                messageDisplay.textContent = "OTP expired. Please resend or enter a new code.";
                messageDisplay.className = 'message-display error';
            }
        }, 1000);
    }

    // OTP input handling
    if (otpInputs.length === OTP_LENGTH) { // Ensure we have the correct number of inputs
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                // If a digit is entered and it's not the last input, focus next
                if (e.target.value && index < OTP_LENGTH - 1) {
                    otpInputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === "Backspace") {
                    // If current input is empty and it's not the first, focus previous and clear it
                    if (!e.target.value && index > 0) {
                        otpInputs[index - 1].focus();
                        otpInputs[index - 1].value = ''; // Also clear previous if moving back
                    }
                } else if (e.key.length === 1 && isNaN(parseInt(e.key)) && !e.ctrlKey && !e.metaKey) {
                    // Allow only digits (simplified)
                    e.preventDefault();
                }
            });
            
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
                // Check if pasted data consists only of digits
                if (/^\d+$/.test(pasteData)) {
                    const digits = pasteData.split('');
                    let currentPasteDigitIndex = 0;
                    for (let i = index; i < OTP_LENGTH && currentPasteDigitIndex < digits.length; i++) {
                        otpInputs[i].value = digits[currentPasteDigitIndex++];
                        if (i < OTP_LENGTH - 1 && currentPasteDigitIndex < digits.length) {
                            // otpInputs[i+1].focus(); // Move focus as user types
                        } else if (i === OTP_LENGTH - 1 || currentPasteDigitIndex === digits.length) {
                            otpInputs[i].focus(); // Focus the last filled input or current if paste is short
                        }
                    }
                     // If pasted data exactly fills remaining or all OTP_LENGTH inputs, move focus appropriately
                    if (digits.length >= (OTP_LENGTH - index)) {
                        otpInputs[Math.min(OTP_LENGTH - 1, index + digits.length - 1)].focus();
                    }

                }
            });
        });
        
        // Focus the first input on load
        otpInputs[0].focus();
    } else {
        console.error("OTP Page: Incorrect number of OTP input fields found. Expected " + OTP_LENGTH);
    }


    verifyButton.addEventListener('click', () => {
        const enteredOtp = otpInputs.map(input => input.value).join('');
        messageDisplay.textContent = ''; // Clear previous messages
        messageDisplay.className = 'message-display';

        if (enteredOtp.length !== OTP_LENGTH) {
            messageDisplay.textContent = "Please enter all 6 digits.";
            messageDisplay.classList.add('error');
            return;
        }

        if (timeLeft <= 0) {
            messageDisplay.textContent = "OTP has expired. Please try again or resend.";
            messageDisplay.classList.add('error');
            return;
        }

        // --- MODIFIED VERIFICATION LOGIC ---
        // For testing: any 6-digit number is considered valid if the timer hasn't expired.
        // No need to compare with a 'generatedOtp'.
        console.log("Verification attempt with (any 6 digits accepted for testing):", enteredOtp);
        
        messageDisplay.textContent = "Verification Successful! Redirecting...";
        messageDisplay.classList.remove('error'); // Ensure no error class
        messageDisplay.classList.add('success');
        clearInterval(timerInterval); // Stop timer

        // Disable inputs and button to prevent further interaction
        otpInputs.forEach(input => input.disabled = true);
        verifyButton.disabled = true;
        resendCodeLink.classList.add('disabled-link');

        // Redirect to the select role page after a short delay
        setTimeout(() => {
            window.location.href = './role.html'; // Make sure this page exists
        }, 1500); // 1.5-second delay to show success message
        // --- END MODIFIED VERIFICATION LOGIC ---
    });

    resendCodeLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (resendCodeLink.classList.contains('disabled-link')) {
            return;
        }
        clearInterval(timerInterval); // Clear existing timer
        simulateOtpGeneration(); // Show a new hint
        startTimer();
        otpInputs.forEach(input => {
            input.value = ''; // Clear inputs
            input.disabled = false; // Re-enable if disabled
        });
        verifyButton.disabled = false; // Re-enable verify button
        if (otpInputs.length > 0) otpInputs[0].focus();
        // messageDisplay.textContent = `New OTP (any 6 digits) can be entered.`; // This is covered by simulateOtpGeneration
        // messageDisplay.className = 'message-display';
    });

    // Initial setup
    simulateOtpGeneration(); // Generate an initial hint
    startTimer();
});