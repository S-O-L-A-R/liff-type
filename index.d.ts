/// <reference types="@line/bot-sdk" />
import LINE = require('@line/bot-sdk')

declare type LIFFConfig = {
    liffId: string,
}

declare type LIFFErrorObject = {
    code: 'INIT_FAILED' | 'INVALID_ARGUMENT' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'INVALID_CONFIG' | 'INVALID_ID_TOKEN' | 'INVALID_ARGUMENT' | 'THINGS_NO_LINKED_DEVICES' | 'BLUETOOTH_SETTING_OFF' | 'THINGS_TERMS_NOT_AGREED' | 'BLUETOOTH_NO_LOCATION_PERMISSION' | 'BLUETOOTH_LOCATION_DISABLED' | 'BLUETOOTH_LE_API_UNAVAILABLE' | 'BLUETOOTH_CONNECT_FAILED' | 'BLUETOOTH_ALREADY_CONNECTED' | 'BLUETOOTH_CONNECTION_LOST' | 'BLUETOOTH_UNSUPPORTED_OPERATION' | 'BLUETOOTH_SERVICE_NOT_FOUND' | 'BLUETOOTH_CHARACTERISTIC_NOT_FOUND',
    message: string,
}

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

declare type LiffInitErrorCallback = (error: LIFFErrorObject) => void

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
    gatt?: BluetoothRemoteGATTServer
    watchingAdvertisements: boolean
    watchAdvertisements(): Promise<void>
    unwatchAdvertisements(): void
    addEventListener(eventName: string, event: EventListener): void
    removeEventListener(event: EventListener): void
}

declare type LIFFLoginConfig = {
    redirectUri?: string
}

declare interface scanCodeResult {
    value: string | null
}

declare global {
    namespace liff {
        function init(
            config: LIFFConfig,
            initSuccessCallback?: LiffInitSuccessCallback,
            errorCallback?: LiffInitErrorCallback,
        ): Promise<void>;
        
        function getOS(): 'ios' | 'android' | 'web'

        function getVersion(): string

        function getLanguage(): string

        function isInClient(): boolean

        function isLoggedIn(): boolean

        function login(config?: LIFFLoginConfig): void

        function logout(): void

        function openWindow(params: {
            url: string,
            external?: boolean
        }): void;
        
        function getAccessToken(): string;
        
        function getProfile(): Promise<LINE.Profile>;
        
        function sendMessages(messages: LINE.Message[]): Promise<void>;
        
        function scanCode(): Promise<scanCodeResult>

        function closeWindow(): void;
        
        function initPlugins(plugins: LIFFPlugins[]): Promise<void>;
        
        const bluetooth: {
            getAvailability(): Promise<boolean>
            requestDevice(options?: LIFFRequestDeviceOptions): Promise<BluetoothDevice>
        }
    }    
}
