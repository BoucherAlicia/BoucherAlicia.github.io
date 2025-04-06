let bluetoothDevice;
let bluetoothCharacteristic;

async function connectBluetooth() {
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

// Sauvegarde la connexion Bluetooth entre les pages
window.bluetoothDevice = bluetoothDevice;
window.bluetoothCharacteristic = bluetoothCharacteristic;