/// <reference types="@line/bot-sdk" />
import LINE = require('@line/bot-sdk')

declare type LiffInitSuccessCallback = (
    data: {
        language: string,
        context: {
            type: string,
            viewType: string,
            userId: string,
            utouId: string,
            roomId: string,
            groupId: string,
        }
    }
) => void

declare type LiffInitErrorCallback = (error: Error) => void

declare type LIFFPlugins = 'bluetooth'

declare interface LINEBluetoothRequestDeviceFilter {
    deviceId: string
}

declare interface LIFFRequestDeviceOptions {
    filters: LINEBluetoothRequestDeviceFilter[]
}

declare interface BluetoothRemoteGATTCharacteristic {
    service?: BluetoothRemoteGATTService
    uuid: string
    value: DataView
    readValue(): Promise<DataView>
    writeValue(value: BufferSource): Promise<void>
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>
    stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>
    addEventListener(eventName: string, event: EventListener): void
    removeEventListener(eventName: string): void
}

declare interface BluetoothRemoteGATTService {
    device: BluetoothDevice
    uuid: string
    getCharacteristic(characteristicUUID: string): Promise<BluetoothRemoteGATTCharacteristic>	
}

declare interface BluetoothRemoteGATTServer {
    device: BluetoothDevice
    connected: boolean
    connect(): Promise<BluetoothRemoteGATTService>
    disconnect(): void
    getPrimaryService(serviceUUID: string): Promise<BluetoothRemoteGATTService>
}

declare interface BluetoothDevice {
    id: string
    name?: string
    gatt?: any
    watchingAdvertisements: boolean
    watchAdvertisements(): Promise<void>
    unwatchAdvertisements(): void
    addEventListener(eventName: string, event: EventListener): void
    removeEventListener(event: EventListener)
}

declare global {
    namespace liff {
        function init(
            initSuccessCallback: LiffInitSuccessCallback,
            errorCallback: LiffInitErrorCallback,
        ): void;
    
        function openWindow(params: {
            url: string,
            external?: boolean
        }): void;
        
        function getAccessToken(): string;
        
        function getProfile(): Promise<LINE.Profile>;
        
        function sendMessages(messages: LINE.Message[]): Promise<void>;
        
        function closeWindow(): void;
        
        function initPlugins(plugins: LIFFPlugins[]): Promise<void>;
        
        const bluetooth: {
            getAvailability(): Promise<boolean>
            requestDevice(options?: LIFFRequestDeviceOptions): Promise<BluetoothDevice>
        }
    }    
}
