let bluetoothDevice;
let bluetoothCharacteristic;

//////Simulation avec générateurs de données

// Remplacez toute la fonction connectBluetooth() par :
async function connectBluetooth() {
    // Simulation de données (5 valeurs aléatoires par seconde)
    setInterval(() => {
        const simulatedAngle = Math.random() * 360;
        const event = {
            target: {
                value: new TextEncoder().encode(`Angle: ${simulatedAngle.toFixed(2)} deg`)
            }
        };
        if (window.handleData) handleData(event);
    }, 200);
    
    return true; // Simule une connexion réussie
}

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

// Sauvegarde la connexion Bluetooth entre les pages
window.bluetoothDevice = bluetoothDevice;
window.bluetoothCharacteristic = bluetoothCharacteristic;