// Configuration pour la page de mesure (temps réel)
function initMeasureChart(ctx) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Angle (degrés)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                pointRadius: 3,
                fill: false,
                data: []
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 0
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second',
                        displayFormats: {
                            second: 'HH:mm:ss'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Temps'
                    }
                },
                y: {
                    min: 0,
                    max: 360,
                    title: {
                        display: true,
                        text: 'Degrés'
                    }
                }
            }
        }
    });
}
// Configuration pour la page d'historique
function initHistoryChart(ctx) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Angle (degrés)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                pointRadius: 3,
                fill: false,
                data: []
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    right: 0
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        displayFormats: {
                            second: 'HH:mm:ss'
                        }
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 10
                    },
                    grid: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Temps'
                    }
                },
                y: {
                    min: 0,
                    max: 360,
                    grid: {
                        display: true
                    },
                    title: {
                        display: true,
                        text: 'Degrés'
                    }
                }
            }
        }
    });
}

function updateChart(chart, data) {
    if (!chart || !chart.data || !chart.data.datasets) {
        console.error("Chart is not properly initialized");
        return;
    }

    chart.data.datasets[0].data = data.map(point => ({
        x: point.x instanceof Date ? point.x : new Date(point.x),
        y: point.y
    }));
    
    chart.update('none');
}

window.initChart = initChart;
window.updateChart = updateChart;