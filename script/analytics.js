document.addEventListener('DOMContentLoaded', function() {
    // --- Sidebar Toggle ---
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.getElementById('main-content');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // --- Chart.js Implementation ---
    const ctx = document.getElementById('analyticsChart');
    if(ctx) {
        // Custom plugin to draw the circle and annotation on the point
        const pointAnnotationPlugin = {
            id: 'pointAnnotation',
            afterDraw: chart => {
                const activePoint = chart.getDatasetMeta(0).data[2]; // Target the 3rd point (index 2 for 'Mar')
                if (activePoint) {
                    const { x, y } = activePoint.getProps(['x', 'y']);
                    const ctx = chart.ctx;
                    
                    // Draw outer circle
                    ctx.beginPath();
                    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
                    ctx.fillStyle = 'rgba(0, 191, 166, 0.2)';
                    ctx.fill();

                    // Draw inner circle
                    ctx.beginPath();
                    ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = '#00BFA6';
                    ctx.fill();

                    // Draw the annotation box
                    const text = '1,256,599';
                    ctx.font = 'bold 12px Inter';
                    const textWidth = ctx.measureText(text).width;
                    const boxX = x - (textWidth / 2) - 10;
                    const boxY = y - 40;
                    const boxWidth = textWidth + 20;
                    const boxHeight = 25;
                    
                    ctx.fillStyle = '#212529';
                    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 5);
                    ctx.fill();

                    // Draw triangle pointer
                    ctx.beginPath();
                    ctx.moveTo(x - 5, y - 15);
                    ctx.lineTo(x + 5, y - 15);
                    ctx.lineTo(x, y - 10);
                    ctx.closePath();
                    ctx.fill();

                    // Draw text
                    ctx.fillStyle = '#fff';
                    ctx.textAlign = 'center';
                    ctx.fillText(text, x, y - 24);
                }
            }
        };
        
        // Polyfill for roundRect if not available
        if (!CanvasRenderingContext2D.prototype.roundRect) {
          CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
          }
        }


        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                {
                    label: 'Current Week',
                    data: [10, 12, 18, 15, 20, 18, 22],
                    borderColor: '#0d6efd',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#0d6efd',
                },
                {
                    label: 'Previous Week',
                    data: [8, 10, 12, 14, 16, 19, 21],
                    borderColor: '#6c757d',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#6c757d',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false // Disable default tooltip to use custom annotation
                    },
                    pointAnnotation: {} // Enable our custom plugin
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 10,
                            callback: function(value) {
                                return value + 'M';
                            }
                        },
                        grid: {
                            drawBorder: false,
                            color: '#f0f0f0'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            },
            plugins: [pointAnnotationPlugin]
        });
    }
});