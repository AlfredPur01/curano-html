        document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebar-toggle');
            const mainContent = document.getElementById('main-content');
            
            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', function() {
                    sidebar.classList.toggle('active');
                });
            }

            // Optional: Close sidebar when clicking on the main content area on mobile
            mainContent.addEventListener('click', function() {
                if (window.innerWidth < 992 && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            });
        });
    