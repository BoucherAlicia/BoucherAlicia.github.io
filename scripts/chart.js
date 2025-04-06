function initChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Angle (degrés)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                fill: false,
                data: []
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        displayFormats: {
                            minute: 'HH:mm'
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

function updateChart(chart, data) {
    chart.data.datasets[0].data = data.map(point => ({
        x: point.x,
        y: point.y
    }));
    chart.update();
}

window.initChart = initChart;
window.updateChart = updateChart;