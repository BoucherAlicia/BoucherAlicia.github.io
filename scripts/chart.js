function initChart(ctx) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Angle (degrés)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                data: []
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second',
                        displayFormats: {
                            second: 'HH:mm:ss'
                        }
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
    chart.data.datasets[0].data = data;
    chart.update();
}

window.initChart = initChart;
window.updateChart = updateChart;