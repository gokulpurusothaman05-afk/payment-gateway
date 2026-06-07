/**
 * STACKLY DASHBOARD - CHARTS & ANALYTICS
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        initDashboardCharts();
        initDashboardCounters();
        initSidebarToggle();
    });

    // ==========================================
    // DASHBOARD CHARTS
    // ==========================================
    function initDashboardCharts() {
        // Revenue Chart
        const revenueChartEl = document.getElementById('revenueChart');
        if (revenueChartEl) {
            const revenueCtx = revenueChartEl.getContext('2d');
            new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Revenue',
                        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
                        borderColor: '#6C63FF',
                        backgroundColor: 'rgba(108, 99, 255, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#6C63FF',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: '#2C3E50',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            padding: 12,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.parsed.y.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Payment Methods Chart
        const paymentMethodsChartEl = document.getElementById('paymentMethodsChart');
        if (paymentMethodsChartEl) {
            const paymentCtx = paymentMethodsChartEl.getContext('2d');
            new Chart(paymentCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Credit Card', 'PayPal', 'UPI', 'Net Banking'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: [
                            '#6C63FF',
                            '#4CAF50',
                            '#FF9800',
                            '#2196F3'
                        ],
                        borderWidth: 0,
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            backgroundColor: '#2C3E50',
                            padding: 12,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Volume Chart (Admin Dashboard)
        const volumeChartEl = document.getElementById('volumeChart');
        if (volumeChartEl) {
            const volumeCtx = volumeChartEl.getContext('2d');
            new Chart(volumeCtx, {
                type: 'bar',
                data: {
                    labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
                    datasets: [{
                        label: 'Transactions',
                        data: [1200, 800, 1500, 2200, 3500, 4200, 3800, 2900],
                        backgroundColor: 'rgba(108, 99, 255, 0.8)',
                        borderColor: '#6C63FF',
                        borderWidth: 2,
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: '#2C3E50',
                            padding: 12
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }

    // ==========================================
    // DASHBOARD COUNTERS
    // ==========================================
    function initDashboardCounters() {
        $('.stat-card .counter').each(function() {
            const $this = $(this);
            const target = parseInt($this.attr('data-target'));

            if (target && !$this.hasClass('counted')) {
                $this.addClass('counted');

                $({ Counter: 0 }).animate({ Counter: target }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter).toLocaleString());
                    },
                    complete: function() {
                        $this.text(target.toLocaleString());
                    }
                });
            }
        });
    }

    // ==========================================
    // SIDEBAR TOGGLE
    // ==========================================
    function initSidebarToggle() {
        $('#sidebarToggle').on('click', function() {
            $('.dashboard-sidebar').toggleClass('active');
            $('.dashboard-main').toggleClass('expanded');
        });

        // Close sidebar on mobile when clicking outside
        $(document).on('click', function(e) {
            if ($(window).width() <= 768) {
                if (!$(e.target).closest('.dashboard-sidebar, #sidebarToggle').length) {
                    $('.dashboard-sidebar').removeClass('active');
                }
            }
        });
    }

    // ==========================================
    // REAL-TIME UPDATES SIMULATION
    // ==========================================
    function simulateRealTimeUpdates() {
        setInterval(function() {
            // Update random stat (demo purpose)
            const $randomStat = $('.stat-number').eq(Math.floor(Math.random() * $('.stat-number').length));
            const currentValue = parseInt($randomStat.text().replace(/,/g, ''));
            const change = Math.floor(Math.random() * 100) - 50;
            const newValue = Math.max(0, currentValue + change);

            $({ val: currentValue }).animate({ val: newValue }, {
                duration: 1000,
                step: function() {
                    $randomStat.text(Math.ceil(this.val).toLocaleString());
                }
            });
        }, 10000);
    }

    // Uncomment to enable real-time updates
    // simulateRealTimeUpdates();

})(jQuery);