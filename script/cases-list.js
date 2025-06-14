        // Sidebar toggle for mobile
        document.getElementById('sidebarToggle').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('show');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const toggle = document.getElementById('sidebarToggle');
            
            if (window.innerWidth <= 768 && 
                !sidebar.contains(event.target) && 
                !toggle.contains(event.target) && 
                sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });

        // Table row expansion
        function toggleRow(button) {
            const row = button.closest('tr');
            const icon = button.querySelector('i');
            const nextRow = row.nextElementSibling;
            
            // Check if this row is already expanded
            if (row.classList.contains('expanded')) {
                // Collapse
                row.classList.remove('expanded');
                if (nextRow && nextRow.classList.contains('expanded-content')) {
                    nextRow.style.display = 'none';
                }
                icon.className = 'bi bi-chevron-right';
            } else {
                // First, collapse any other expanded rows
                document.querySelectorAll('tr.expanded').forEach(expandedRow => {
                    expandedRow.classList.remove('expanded');
                    const expandedNext = expandedRow.nextElementSibling;
                    if (expandedNext && expandedNext.classList.contains('expanded-content')) {
                        expandedNext.style.display = 'none';
                    }
                    const expandedButton = expandedRow.querySelector('.expand-btn i');
                    if (expandedButton) {
                        expandedButton.className = 'bi bi-chevron-right';
                    }
                });
                
                // Expand this row
                row.classList.add('expanded');
                if (nextRow && nextRow.classList.contains('expanded-content')) {
                    nextRow.style.display = 'table-row';
                }
                icon.className = 'bi bi-chevron-down';
            }
        }

        // Initialize - hide all expanded content except the pre-expanded one
        document.addEventListener('DOMContentLoaded', function() {
            const expandedContent = document.querySelectorAll('.expanded-content');
            expandedContent.forEach((content, index) => {
                // Keep the first expanded content visible (as shown in the design)
                if (index > 0) {
                    content.style.display = 'none';
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                document.getElementById('sidebar').classList.remove('show');
            }
        });