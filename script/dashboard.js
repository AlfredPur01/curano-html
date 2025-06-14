  // Mobile sidebar toggle
  function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.classList.toggle('show');
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
      const sidebar = document.getElementById('sidebar');
      const toggleBtn = document.querySelector('button[onclick="toggleSidebar()"]');
      
      if (window.innerWidth <= 768) {
          if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
              sidebar.classList.remove('show');
          }
      }
  });

  // Pagination functionality
  document.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          if (!this.innerHTML.includes('chevron')) {
              document.querySelector('.page-btn.active').classList.remove('active');
              this.classList.add('active');
          }
      });
  });

  // Search functionality
  document.querySelector('.search-input').addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const tableRows = document.querySelectorAll('.custom-table tbody tr');
      
      tableRows.forEach(row => {
          const caseId = row.querySelector('.case-id').textContent.toLowerCase();
          const patient = row.cells[0].textContent.toLowerCase();
          
          if (caseId.includes(searchTerm) || patient.includes(searchTerm)) {
              row.style.display = '';
          } else {
              row.style.display = 'none';
          }
      });
  });

  // Dropdown functionality
  document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(dropdown => {
      dropdown.addEventListener('click', function(e) {
          e.preventDefault();
          const menu = this.nextElementSibling;
          menu.classList.toggle('show');
      });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(event) {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
          if (!menu.previousElementSibling.contains(event.target) && !menu.contains(event.target)) {
              menu.classList.remove('show');
          }
      });
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });

  // Add loading states for buttons
  document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
          e.preventDefault();
          const originalText = this.innerHTML;
          this.innerHTML = '<i class="bi bi-arrow-repeat spinner-border spinner-border-sm"></i> Loading...';
          this.disabled = true;
          
          setTimeout(() => {
              this.innerHTML = originalText;
              this.disabled = false;
          }, 1500);
      });
  });

  // Initialize tooltips if needed
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Responsive chart adjustment
  function adjustChart() {
      const chart = document.querySelector('svg');
      if (chart && window.innerWidth < 768) {
          chart.style.height = '200px';
      } else if (chart) {
          chart.style.height = '300px';
      }
  }

  window.addEventListener('resize', adjustChart);
  adjustChart();

  // Add some interactive animations
  document.querySelectorAll('.stat-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-2px)';
          this.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
      });
  });

  // Simulate real-time updates
  function updateStats() {
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
          const current = parseInt(stat.textContent);
          const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          if (change !== 0) {
              stat.textContent = current + change;
          }
      });
  }

  // Update stats every 30 seconds (optional)
  // setInterval(updateStats, 30000);

  console.log('Curano Dashboard loaded successfully!');