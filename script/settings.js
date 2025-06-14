// Settings Page JavaScript
                        
        // Mobile sidebar toggle
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('show');
        }

        // Add mobile menu button for smaller screens
        function createMobileMenuButton() {
            const navbar = document.querySelector('.navbar .container-fluid');
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'btn d-lg-none';
            mobileMenuBtn.innerHTML = '<i class="bi bi-list"></i>';
            mobileMenuBtn.onclick = toggleSidebar;
            mobileMenuBtn.style.cssText = `
                position: absolute;
                left: 15px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                font-size: 20px;
                color: var(--medium-gray);
                z-index: 1001;
            `;
            navbar.insertBefore(mobileMenuBtn, navbar.firstChild);
        }

        // Sidebar menu interactions
        function initializeSidebarMenu() {
            const sidebarLinks = document.querySelectorAll('.sidebar-link');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Remove active class from all links
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    this.classList.add('active');
                });
            });
        }

        // Settings menu interactions
        function initializeSettingsMenu() {
            const settingsLinks = document.querySelectorAll('.settings-menu-link');
            settingsLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Remove active state from all links
                    settingsLinks.forEach(l => l.classList.remove('active'));
                    // Add active state to clicked link
                    this.classList.add('active');
                });
            });
        }

        // Delete button interactions
        function initializeDeleteButtons() {
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const row = this.closest('tr');
                    if (confirm('Are you sure you want to delete this user?')) {
                        row.style.opacity = '0.5';
                        setTimeout(() => {
                            row.remove();
                        }, 300);
                    }
                });
            });
        }

        // Sort dropdown functionality
        function initializeSortDropdown() {
            const sortDropdown = document.querySelector('.sort-dropdown');
            if (sortDropdown) {
                sortDropdown.addEventListener('click', function() {
                    // Toggle dropdown visual state
                    const icon = this.querySelector('.bi-chevron-down');
                    icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
                });
            }
        }

        // Search functionality
        function initializeSearch() {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    const tableRows = document.querySelectorAll('.users-table tbody tr');
                    
                    tableRows.forEach(row => {
                        const userName = row.querySelector('.user-name-table').textContent.toLowerCase();
                        if (userName.includes(searchTerm)) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    });
                });
            }
        }

        // User profile dropdown
        function initializeUserProfile() {
            const userProfile = document.querySelector('.user-profile');
            if (userProfile) {
                userProfile.addEventListener('click', function() {
                    // Create dropdown menu if it doesn't exist
                    let dropdown = document.querySelector('.user-dropdown');
                    if (!dropdown) {
                        dropdown = document.createElement('div');
                        dropdown.className = 'user-dropdown';
                        dropdown.innerHTML = `
                            <div class="dropdown-item">Profile Settings</div>
                            <div class="dropdown-item">Account</div>
                            <div class="dropdown-item">Logout</div>
                        `;
                        dropdown.style.cssText = `
                            position: absolute;
                            top: 100%;
                            right: 0;
                            background: white;
                            border: 1px solid var(--border-color);
                            border-radius: 8px;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                            min-width: 150px;
                            z-index: 1000;
                            display: none;
                        `;
                        this.style.position = 'relative';
                        this.appendChild(dropdown);
                    }
                    
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                });
            }
        }

        // Table row hover effects
        function initializeTableHovers() {
            const tableRows = document.querySelectorAll('.users-table tbody tr');
            tableRows.forEach(row => {
                row.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = '#f8fafc';
                });
                
                row.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '';
                });
            });
        }

        // Responsive table handling
        function handleResponsiveTable() {
            const table = document.querySelector('.users-table');
            const container = document.querySelector('.users-container');
            
            function checkTableOverflow() {
                if (window.innerWidth < 768) {
                    container.style.overflowX = 'auto';
                    table.style.minWidth = '600px';
                } else {
                    container.style.overflowX = 'visible';
                    table.style.minWidth = 'auto';
                }
            }
            
            checkTableOverflow();
            window.addEventListener('resize', checkTableOverflow);
        }

        // Button click animations
        function initializeButtonAnimations() {
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        }

        // Thoughts card interaction
        function initializeThoughtsCard() {
            const thoughtsCard = document.querySelector('.thoughts-card');
            if (thoughtsCard && window.innerWidth > 768) {
                thoughtsCard.addEventListener('click', function() {
                    this.style.transform = this.style.transform === 'scale(1.05)' ? 'scale(1)' : 'scale(1.05)';
                });
            }
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            const userDropdown = document.querySelector('.user-dropdown');
            if (userDropdown && !e.target.closest('.user-profile')) {
                userDropdown.style.display = 'none';
            }
            
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth < 768 && !e.target.closest('.sidebar') && !e.target.closest('button')) {
                sidebar.classList.remove('show');
            }
        });

        // Initialize all functionality when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            createMobileMenuButton();
            initializeSidebarMenu();
            initializeSettingsMenu();
            initializeDeleteButtons();
            initializeSortDropdown();
            initializeSearch();
            initializeUserProfile();
            initializeTableHovers();
            handleResponsiveTable();
            initializeButtonAnimations();
            initializeThoughtsCard();
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth >= 768) {
                sidebar.classList.remove('show');
            }
        });

        // Add smooth transitions
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .dropdown-item {
                    padding: 8px 16px;
                    cursor: pointer;
                    font-size: 14px;
                    color: var(--dark-gray);
                    transition: background-color 0.2s;
                }
                
                .dropdown-item:hover {
                    background-color: var(--light-gray);
                }
                
                .btn {
                    transition: all 0.2s ease;
                }
                
                .thoughts-card {
                    transition: transform 0.3s ease;
                    cursor: pointer;
                }
                
                .users-table tbody tr {
                    transition: background-color 0.2s ease;
                }
                
                @media (max-width: 768px) {
                    .settings-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 16px;
                    }
                    
                    .settings-actions {
                        flex-wrap: wrap;
                        width: 100%;
                    }
                    
                    .settings-actions .btn {
                        flex: 1;
                        min-width: 120px;
                    }
                    
                    .navbar-brand {
                        margin-left: 50px;
                    }
                    
                    .users-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
                    }
                }
                
                @media (max-width: 576px) {
                    .settings-actions .btn {
                        font-size: 12px;
                        padding: 6px 12px;
                    }
                    
                    .users-controls {
                        width: 100%;
                    }
                    
                    .sort-dropdown {
                        flex: 1;
                    }
                }
            </style>
        `);