// DOM elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const counters = document.querySelectorAll('.counter');
let performanceChart, assetAllocationChart, goalForecastChart;

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    
    const isDarkMode = body.classList.contains('dark');
    
    if (isDarkMode) {
        body.classList.remove('light');
        themeToggle.querySelector('i').classList.remove('fa-sun');
        themeToggle.querySelector('i').classList.add('fa-moon');
        themeToggle.querySelector('span').textContent = 'Dark Mode';
    } else {
        body.classList.add('light');
        body.classList.remove('dark');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
        themeToggle.querySelector('span').textContent = 'Light Mode';
    }
    
    // Update chart colors
    updateChartsTheme();
});

// Counter animation
function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1500;
        const increment = target / duration * 10;
        let currentValue = 0;
        
        const animateCounter = () => {
            currentValue += increment;
            counter.textContent = Math.floor(currentValue).toLocaleString('en-IN');
            
            if (currentValue < target) {
                setTimeout(animateCounter, 10);
            } else {
                counter.textContent = target.toLocaleString('en-IN');
            }
        };
        
        animateCounter();
    });
}

// Initialize charts
function initCharts() {
    // Performance Chart
    const performanceChartCtx = document.getElementById('performanceChart');
    if (performanceChartCtx) {
        const ctx = performanceChartCtx.getContext('2d');
        const performanceGradient = ctx.createLinearGradient(0, 0, 0, 400);
        performanceGradient.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
        performanceGradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
        
        const performanceData = {
            labels: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
            datasets: [{
                label: 'Portfolio Value',
                data: [1202400, 1198600, 1205200, 1210500, 1208900, 1215000, 1223400, 1228900, 1225600, 1232100, 1237800, 1242300, 1245680],
                borderColor: '#38bdf8',
                backgroundColor: performanceGradient,
                borderWidth: 2,
                pointBackgroundColor: '#38bdf8',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true
            }]
        };
        
        performanceChart = new Chart(ctx, {
            type: 'line',
            data: performanceData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleFont: {
                            size: 14,
                            family: 'Inter, sans-serif'
                        },
                        bodyFont: {
                            size: 13,
                            family: 'Inter, sans-serif'
                        },
                        callbacks: {
                            label: function(context) {
                                return `₹${context.raw.toLocaleString('en-IN')}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            color: 'rgba(120, 120, 120, 0.2)'
                        },
                        ticks: {
                            color: 'rgba(180, 180, 180, 0.8)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(120, 120, 120, 0.2)'
                        },
                        ticks: {
                            color: 'rgba(180, 180, 180, 0.8)',
                            callback: function(value) {
                                return `₹${(value / 1000).toFixed(0)}K`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Asset Allocation Chart
    const assetAllocationCtx = document.getElementById('assetAllocationChart');
    if (assetAllocationCtx) {
        assetAllocationChart = new Chart(assetAllocationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Stocks', 'Mutual Funds', 'Bonds', 'Crypto'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: ['#3b82f6', '#22c55e', '#eab308', '#a855f7'],
                    borderWidth: 0,
                    hoverOffset: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleFont: {
                            size: 14,
                            family: 'Inter, sans-serif'
                        },
                        bodyFont: {
                            size: 13,
                            family: 'Inter, sans-serif'
                        },
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Goal Forecast Chart
    const goalForecastCtx = document.getElementById('goalForecastChart');
    if (goalForecastCtx) {
        goalForecastChart = new Chart(goalForecastCtx, {
            type: 'line',
            data: {
                labels: ['2025', '2026', '2027', '2028', '2029', '2030', '2035', '2040'],
                datasets: [
                    {
                        label: 'Retirement Fund',
                        data: [4850000, 7500000, 10500000, 13800000, 17500000, 21600000, 50000000, 110000000],
                        borderColor: '#22c55e',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Child\'s Education',
                        data: [1250000, 2000000, 3200000, 4600000, 5800000, 6000000, null, null],
                        borderColor: '#eab308',
                        backgroundColor: 'rgba(234, 179, 8, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Home Purchase',
                        data: [3500000, 4800000, 6200000, 7500000, null, null, null, null],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 15,
                            color: 'rgba(180, 180, 180, 0.8)'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleFont: {
                            size: 14,
                            family: 'Inter, sans-serif'
                        },
                        bodyFont: {
                            size: 13,
                            family: 'Inter, sans-serif'
                        },
                        callbacks: {
                            label: function(context) {
                                if (context.raw === null) return '';
                                return `${context.dataset.label}: ₹${(context.raw/100000).toFixed(1)} Lakh`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            color: 'rgba(120, 120, 120, 0.2)'
                        },
                        ticks: {
                            color: 'rgba(180, 180, 180, 0.8)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(120, 120, 120, 0.2)'
                        },
                        ticks: {
                            color: 'rgba(180, 180, 180, 0.8)',
                            callback: function(value) {
                                return `₹${(value/100000).toFixed(0)}L`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Update charts when theme changes
function updateChartsTheme() {
    const isDarkMode = body.classList.contains('dark');
    
    if (performanceChart) {
        performanceChart.options.scales.x.ticks.color = isDarkMode ? 'rgba(180, 180, 180, 0.8)' : 'rgba(100, 116, 139, 0.8)';
        performanceChart.options.scales.y.ticks.color = isDarkMode ? 'rgba(180, 180, 180, 0.8)' : 'rgba(100, 116, 139, 0.8)';
        performanceChart.options.scales.x.grid.color = isDarkMode ? 'rgba(120, 120, 120, 0.2)' : 'rgba(226, 232, 240, 0.5)';
        performanceChart.options.scales.y.grid.color = isDarkMode ? 'rgba(120, 120, 120, 0.2)' : 'rgba(226, 232, 240, 0.5)';
        performanceChart.options.plugins.tooltip.backgroundColor = isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)';
        performanceChart.options.plugins.tooltip.titleColor = isDarkMode ? '#fff' : '#334155';
        performanceChart.options.plugins.tooltip.bodyColor = isDarkMode ? '#e2e8f0' : '#64748b';
        performanceChart.update();
    }
    
    if (assetAllocationChart) {
        assetAllocationChart.options.plugins.tooltip.backgroundColor = isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)';
        assetAllocationChart.options.plugins.tooltip.titleColor = isDarkMode ? '#fff' : '#334155';
        assetAllocationChart.options.plugins.tooltip.bodyColor = isDarkMode ? '#e2e8f0' : '#64748b';
        assetAllocationChart.update();
    }

    if (goalForecastChart) {
        goalForecastChart.options.plugins.legend.labels.color = isDarkMode ? 'rgba(180, 180, 180, 0.8)' : 'rgba(100, 116, 139, 0.8)';
        goalForecastChart.options.scales.x.ticks.color = isDarkMode ? 'rgba(180, 180, 180, 0.8)' : 'rgba(100, 116, 139, 0.8)';
        goalForecastChart.options.scales.y.ticks.color = isDarkMode ? 'rgba(180, 180, 180, 0.8)' : 'rgba(100, 116, 139, 0.8)';
        goalForecastChart.options.scales.x.grid.color = isDarkMode ? 'rgba(120, 120, 120, 0.2)' : 'rgba(226, 232, 240, 0.5)';
        goalForecastChart.options.scales.y.grid.color = isDarkMode ? 'rgba(120, 120, 120, 0.2)' : 'rgba(226, 232, 240, 0.5)';
        goalForecastChart.options.plugins.tooltip.backgroundColor = isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)';
        goalForecastChart.options.plugins.tooltip.titleColor = isDarkMode ? '#fff' : '#334155';
        goalForecastChart.options.plugins.tooltip.bodyColor = isDarkMode ? '#e2e8f0' : '#64748b';
        goalForecastChart.update();
    }
}

// Make time period buttons for chart responsive
function setupChartTimeButtons() {
    const timeButtons = document.querySelectorAll('.flex.space-x-2 button');
    if (timeButtons.length) {
        timeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                timeButtons.forEach(btn => {
                    btn.classList.remove('bg-primary-700', 'text-white');
                    btn.classList.add('bg-dark-900', 'text-gray-400');
                });
                
                // Add active class to clicked button
                this.classList.remove('bg-dark-900', 'text-gray-400');
                this.classList.add('bg-primary-700', 'text-white');
                
                // Here you would update the chart data based on time period
                // For demonstration, we'll just update with random data
                if (performanceChart) {
                    const newData = Array(13).fill(0).map(() => Math.floor(Math.random() * 100000) + 1200000);
                    performanceChart.data.datasets[0].data = newData;
                    performanceChart.update();
                }
            });
        });
    }
}

// Star toggle functionality for watchlist
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('fa-star')) {
        e.target.classList.toggle('fas');
        e.target.classList.toggle('far');
        e.target.classList.toggle('text-yellow-500');
        e.target.classList.toggle('text-gray-500');
    }
});

// Watchlist functionality
function setupWatchlist() {
    const watchlistLink = document.querySelector('a[href="#"] i.fa-star').parentElement;
    if (watchlistLink) {
        watchlistLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Show an alert that watchlist is now working
            alert('Watchlist functionality is now working!');
            
            // If a watchlist page exists, you could navigate to it
            // window.location.href = 'watchlist.html';
        });
    }
    
    // Add event listeners to watchlist Trade buttons
    const tradeButtons = document.querySelectorAll('.bg-primary-600.text-white');
    if (tradeButtons.length) {
        tradeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const stockRow = this.closest('tr');
                const stockSymbol = stockRow.querySelector('.font-medium').textContent;
                alert(`Trade initiated for ${stockSymbol}`);
            });
        });
    }
    
    // Add stock button functionality
    const addStockButton = document.querySelector('button.text-primary-400 i.fa-plus');
    if (addStockButton) {
        addStockButton.parentElement.addEventListener('click', function() {
            alert('Add Stock functionality is now available!');
        });
    }
}

// Settings page functionality
function setupSettings() {
    const settingsLink = document.querySelector('a[href="#"] i.fa-cog').parentElement;
    if (settingsLink) {
        settingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Settings page is now available!');
            // If a settings page exists, you could navigate to it
            // window.location.href = 'settings.html';
        });
    }
}

// Transactions page functionality
function setupTransactions() {
    const transactionsLink = document.querySelector('a[href="#"] i.fa-wallet').parentElement;
    if (transactionsLink) {
        transactionsLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Transactions page is now available!');
            // If a transactions page exists, you could navigate to it
            // window.location.href = 'transactions.html';
        });
    }
    
    // Transaction filter functionality
    const transactionSelect = document.querySelector('select.bg-dark-900');
    if (transactionSelect) {
        transactionSelect.addEventListener('change', function() {
            alert(`Filtered transactions to: ${this.value}`);
        });
    }
}

// Add ripple effect to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.classList.add('ripple');
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    animateCounters();
    setupChartTimeButtons();
    setupWatchlist();
    setupSettings();
    setupTransactions();
    
    // Apply animations to elements
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('animate-fade-in');
    }
    
    const cards = document.querySelectorAll('.bg-dark-800');
    cards.forEach((card, index) => {
        card.classList.add('card-hover');
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-slide-up');
    });
}); 