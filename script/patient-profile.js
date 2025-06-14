 document.addEventListener('DOMContentLoaded', function() {
            const hamburgerMenu = document.getElementById('hamburger-menu');
            const sidebar = document.getElementById('sidebar');

            // Toggle sidebar on hamburger click
            hamburgerMenu.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
            
            // Basic expand/collapse functionality for table rows
            const tableBody = document.querySelector('.patient-table tbody');
            
            // Note: This is a simplified toggle for demonstration.
            // A real application would dynamically create and insert the detail row.
            // Here, we're just toggling the visibility of the pre-existing detail row.
            
            const expandIcons = document.querySelectorAll('.expand-icon');
            const detailRow = document.querySelector('.expanded-detail-row');
            const expandedRow = document.querySelector('.expanded-row');

            // Hide the detail row initially
            if (detailRow) {
                detailRow.style.display = 'none';
            }

            expandIcons.forEach(icon => {
                icon.addEventListener('click', function() {
                    const isExpanded = this.classList.contains('bi-chevron-down');
                    const parentRow = this.closest('tr');
                    
                    // On any click, reset all icons and hide the detail row
                    expandIcons.forEach(i => i.classList.replace('bi-chevron-down', 'bi-chevron-right'));
                    if (detailRow) detailRow.style.display = 'none';
                    document.querySelectorAll('.patient-table tbody tr').forEach(r => r.classList.remove('expanded-row-active'));


                    if (isExpanded) {
                        // It was open, now close it
                        if (detailRow) detailRow.style.display = 'none';
                        if (parentRow) parentRow.classList.remove('expanded-row-active');
                    } else {
                        // It was closed, now open it. We'll show the detail row after this row.
                        this.classList.replace('bi-chevron-right', 'bi-chevron-down');
                        if (parentRow) {
                             parentRow.classList.add('expanded-row-active');
                             // In a real app, you would insert the detail row here.
                             // For this demo, we assume the detail row is meant to follow the 4th row.
                             if (detailRow && parentRow === expandedRow) {
                                detailRow.style.display = 'table-row';
                             } else {
                                // If another row is clicked, we hide the static detail row
                                if (detailRow) detailRow.style.display = 'none';
                             }
                        }
                    }
                });
            });
        });