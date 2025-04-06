let bluetoothDevice;
let bluetoothCharacteristic;
let isSimulationMode = true; // Ajout d'un flag pour le mode simulation


// Simulation avec générateurs de données

async function connectBluetooth() {
    if (isSimulationMode) {
        // Mode simulation
        localStorage.setItem('connectionMode', 'simulation');
        
        const intervalId = setInterval(() => {
            const simulatedAngle = Math.random() * 360;
            const event = {
                target: {
                    value: new TextEncoder().encode(`Angle: ${simulatedAngle.toFixed(2)} deg`)
                }
            };
            if (window.handleData) handleData(event);
        }, 200);
        
        // Stocker l'ID de l'intervalle pour pouvoir l'arrêter
        localStorage.setItem('simulationInterval', intervalId.toString());
        
        return true;
    } else {
        // Mode Bluetooth réel
        localStorage.setItem('connectionMode', 'bluetooth');
        try {
            // UUID standard pour SPP (Serial Port Profile)
            const serviceUuid = '00001101-0000-1000-8000-00805f9b34fb';
            
            bluetoothDevice = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: [serviceUuid]
            });
            
            const server = await bluetoothDevice.gatt.connect();
            const service = await server.getPrimaryService(serviceUuid);
            const characteristics = await service.getCharacteristics();
            
            bluetoothCharacteristic = characteristics[0];
            await bluetoothCharacteristic.startNotifications();
            
            return true;
        } catch (error) {
            console.error('Bluetooth error:', error);
            throw error;
        }
    }
}
function disconnectBluetooth() {
    if (isSimulationMode) {
        // Arrêter la simulation
        const intervalId = parseInt(localStorage.getItem('simulationInterval'));
        if (intervalId) clearInterval(intervalId);
    } else {
        // Déconnexion Bluetooth réelle
        if (bluetoothDevice?.gatt.connected) {
            bluetoothDevice.gatt.disconnect();
        }
    }
    localStorage.removeItem('connectionMode');
}
window.connectBluetooth = connectBluetooth;
window.disconnectBluetooth = disconnectBluetooth;

// async function connectBluetooth() {
//     try {
//         // UUID standard pour SPP (Serial Port Profile)
//         const serviceUuid = '00001101-0000-1000-8000-00805f9b34fb';
        
//         bluetoothDevice = await navigator.bluetooth.requestDevice({
//             acceptAllDevices: true,
//             optionalServices: [serviceUuid]
//         });
        
//         const server = await bluetoothDevice.gatt.connect();
//         const service = await server.getPrimaryService(serviceUuid);
//         const characteristics = await service.getCharacteristics();
        
//         bluetoothCharacteristic = characteristics[0];
//         await bluetoothCharacteristic.startNotifications();
        
//         return true;
//     } catch (error) {
//         console.error('Bluetooth error:', error);
//         throw error;
//     }
// }

// // Sauvegarde la connexion Bluetooth entre les pages
// window.bluetoothDevice = bluetoothDevice;
// window.bluetoothCharacteristic = bluetoothCharacteristic;