function saveMeasurement(data) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser || data.length === 0) return;

    const measurements = JSON.parse(localStorage.getItem('measurements') || []);
    
    measurements.push({
        userName: currentUser,
        timestamp: new Date().toISOString(),
        data: data
    });
    
    localStorage.setItem('measurements', JSON.stringify(measurements));
    localStorage.removeItem('currentMeasurement');
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

function deletePatientData(username) {
    const measurements = getAllMeasurements();
    const updated = measurements.filter(m => m.userName !== username);
    localStorage.setItem('measurements', JSON.stringify(updated));
}

function deleteSingleMeasurement(timestamp) {
    const measurements = getAllMeasurements();
    const updated = measurements.filter(m => m.timestamp !== timestamp);
    localStorage.setItem('measurements', JSON.stringify(updated));
}

window.deletePatientData = deletePatientData;
window.deleteSingleMeasurement = deleteSingleMeasurement;
window.saveMeasurement = saveMeasurement;
window.getAllMeasurements = getAllMeasurements;