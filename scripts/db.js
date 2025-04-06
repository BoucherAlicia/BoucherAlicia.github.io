function saveMeasurement(data) {
    const measurements = JSON.parse(localStorage.getItem('measurements')) || [];
    
    measurements.push({
        userName: localStorage.getItem('currentUser') || 'Anonyme',
        timestamp: new Date().toISOString(),
        data: data
    });
    
    localStorage.setItem('measurements', JSON.stringify(measurements));
    localStorage.removeItem('currentMeasurement'); // Nettoyage
}

function getAllMeasurements() {
    const measurements = JSON.parse(localStorage.getItem('measurements') || []);
    return measurements.map(m => ({
        ...m,
        data: m.data.map(d => ({
            x: new Date(d.x),
            y: d.y
        }))
    }));
}

// Sauvegarde automatique quand la page se ferme
window.addEventListener('beforeunload', () => {
    const currentData = JSON.parse(localStorage.getItem('currentMeasurement') || '[]');
    if (currentData.length > 0) {
        saveMeasurement(currentData);
    }
});

window.saveMeasurement = saveMeasurement;
window.getAllMeasurements = getAllMeasurements;