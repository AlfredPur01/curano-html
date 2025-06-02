document.addEventListener('DOMContentLoaded', () => {
    const proceedButton = document.getElementById('proceedButton');
    const roleOptionsContainer = document.getElementById('roleOptions');
    const roleCheckboxes = roleOptionsContainer.querySelectorAll('input[name="role"]');
    const roleMessage = document.getElementById('roleMessage');

    // Functionality for "Super admin" and "Admin" to be mutually exclusive (like radio buttons)
    const superAdminCheckbox = document.getElementById('superAdmin');
    const adminCheckbox = document.getElementById('admin');

    function handleExclusiveRoles(changedCheckbox) {
        if (changedCheckbox === superAdminCheckbox && superAdminCheckbox.checked) {
            adminCheckbox.checked = false;
        } else if (changedCheckbox === adminCheckbox && adminCheckbox.checked) {
            superAdminCheckbox.checked = false;
        }
    }

    if (superAdminCheckbox && adminCheckbox) {
        superAdminCheckbox.addEventListener('change', () => handleExclusiveRoles(superAdminCheckbox));
        adminCheckbox.addEventListener('change', () => handleExclusiveRoles(adminCheckbox));
    }


    proceedButton.addEventListener('click', () => {
        const selectedRoles = [];
        roleCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedRoles.push(checkbox.value);
            }
        });

        roleMessage.textContent = ''; // Clear previous message
        roleMessage.className = 'message-display'; // Reset class

        if (selectedRoles.length === 0) {
            roleMessage.textContent = 'Please select at least one role.';
            roleMessage.classList.add('error');
            return;
        }

        // For demonstration, log selected roles and show a message
        console.log('Selected roles:', selectedRoles);
        roleMessage.textContent = `Proceeding with role(s): ${selectedRoles.join(', ')}`;
        roleMessage.classList.add('success');

        // In a real application, you would navigate or perform an action here
        // For example:
        // setTimeout(() => {
        //     window.location.href = 'dashboard.html?roles=' + selectedRoles.join(',');
        // }, 1000);
        
        // For now, just disable the button to indicate action taken
        proceedButton.disabled = true;
        proceedButton.textContent = 'Processing...';
        setTimeout(() => {
            // Simulate completion
            proceedButton.disabled = false;
            proceedButton.textContent = 'Proceed';
            // You might redirect or update UI further here
        }, 2000);


    });
});