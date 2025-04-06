function initChart(ctx) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Angle (degrés)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                fill: false,
                data: []
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 0 // Désactive l'animation pour des mises à jour instantanées
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        displayFormats: {
                            second: 'HH:mm:ss'
                        },
                        tooltipFormat: 'HH:mm:ss'
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
    // Conversion des dates en objets Date si nécessaire
    const formattedData = data.map(point => ({
        x: point.x instanceof Date ? point.x : new Date(point.x),
        y: point.y
    }));
    
    chart.data.datasets[0].data = formattedData;
    chart.update('none'); // 'none' pour éviter l'animation
}