/// <reference types="@line/bot-sdk" />
import LINE = require('@line/bot-sdk');

declare type LIFFConfig = {
    liffId: string,
}

declare type LIFFErrorObject = {
    code: 'INIT_FAILED' | 'INVALID_ARGUMENT' | 'UNAUTHORIZED' | 'FORBIDDEN' | 
        'INVALID_CONFIG' | 'INVALID_ID_TOKEN' | 'THINGS_NO_LINKED_DEVICES' | 
        'BLUETOOTH_SETTING_OFF' | 'THINGS_TERMS_NOT_AGREED' | 'BLUETOOTH_NO_LOCATION_PERMISSION' | 
        'BLUETOOTH_LOCATION_DISABLED' | 'BLUETOOTH_LE_API_UNAVAILABLE' | 'BLUETOOTH_CONNECT_FAILED' | 
        'BLUETOOTH_ALREADY_CONNECTED' | 'BLUETOOTH_CONNECTION_LOST' | 'BLUETOOTH_UNSUPPORTED_OPERATION' | 
        'BLUETOOTH_SERVICE_NOT_FOUND' | 'BLUETOOTH_CHARACTERISTIC_NOT_FOUND',
    message: string,
}

declare type LiffInitSuccessData = {
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

declare type LiffInitSuccessCallback = (
    data: LiffInitSuccessData
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

declare interface LiffDecodedProfile {
    amr: string[]
    aud: string
    email: string
    exp: number
    iat: number
    iss: string
    name: string
    picture: string
    sub: string
}

declare interface Friendship {
    friendFlag: boolean
}

declare type LiffContextData = {
    type: 'utou' | 'room' | 'group' | 'none',
    viewType: 'compact' | 'tall' | 'full',
    userId?: string,
    utouId?: string,
    roomId?: string,
    groupId?: string,
}

declare type LIFFMessage = Exclude<LINE.Message, LINE.ImageMapMessage>

declare type LIFFMessages = [LIFFMessage?, LIFFMessage?, LIFFMessage?, LIFFMessage?, LIFFMessage?]

declare global {
    namespace liff {
        /**
         * Initialize a liff app. You can only call other LIFF SDK methods after calling liff.init(). 
         * The LIFF SDK gets access tokens and ID tokens from the LINE platform when you initialize the LIFF app.
         * @param config - LIFF app ID. Can be obtained when you add the LIFF app to your channel. 
         * @param initSuccessCallback - Callback to return a data object upon successful initialization of the LIFF app.
         * @param errorCallback - Callback to return an error object upon failure to initialize the LIFF app.
         * 
         */
        function init(
            config: LIFFConfig,
            initSuccessCallback?: LiffInitSuccessCallback,
            errorCallback?: LiffInitErrorCallback,
        ): Promise<void>;
        
        /**
         * Gets the environment in which the user is running the LIFF app.
         */
        function getOS(): 'ios' | 'android' | 'web'

        /**
         * Gets the version of the LIFF SDK.
         */
        function getVersion(): string

        /**
         * Gets the user's LINE version.
         *
         * If a user opens the LIFF app using an external browser, null is returned.
         */
        function getLineVersion(): string | null;

        /**
         * Gets the language settings of the environment in which the LIFF app is running.
         */
        function getLanguage(): string

        /**
         * Determines whether the LIFF app is running in LINE's in-app browser.
         */
        function isInClient(): boolean

        /**
         * Checks whether the user is logged in.
         */
        function isLoggedIn(): boolean

        /**
         * Checks whether the specified API is available in the environment where you started the LIFF app.
         */
        function isApiAvailable(apiName: string): boolean

        /**
         * Performs the LINE Login process (web login) for the Web app.
         * 
         */
        function login(config?: LIFFLoginConfig): void

        /**
         * Logs out.
         */
        function logout(): void

        /**
         * Gets the screen type (1-on-1 chat, group, or room) and the ID that identifies the screen from which the LIFF application is launched.
         */
        function getContext(): LiffContextData

        /**
         * Opens the specified URL in the in-app browser of LINE or external browser.
         */
        function openWindow(params: {
            url: string,
            external?: boolean
        }): void;
        
        /**
         * Gets the current user's access token.
         */
        function getAccessToken(): string;
        
        /**
         * Gets the current user's profile.
         */
        function getProfile(): Promise<LINE.Profile>;
        
        /**
         * Sends messages on behalf of the user to the chat screen where the LIFF app is opened.
         */
        function sendMessages(messages: LIFFMessages): Promise<void>;
        
        /**
         * Starts LINE's QR code reader and gets the string read by the user. To start the QR code reader, grant ScanQR permission to the LIFF app in the LINE Developers Console.
         */
        function scanCode(): Promise<scanCodeResult>

        /**
         * Closes the LIFF app.
         */
        function closeWindow(): void;
        
        /**
         * Enable the plugins.
         *
         * For example, if you enable the Bluetooth plugin, you can use the client API (liff.bluetooth.*) provided by the Bluetooth plugin.
         * @param plugins - Plugin name. Specify one of the following values: `bluetooth`
         *
         */
        function initPlugins(plugins: LIFFPlugins[]): Promise<void>;

        /**
         * Gets the ID token.
         */
        function getIDToken(): string;
        
        /**
         * Gets the payload of the ID token that's automatically acquired by `liff.init()` The payload includes the user display name, profile image URL, and email address.
         */
        function getDecodedIDToken(): Promise<LiffDecodedProfile>;

        /**
         * Gets the friendship status of the LINE Official Account that's linked to the LINE Login channel to which the LIFF app is added.
         */
        function getFriendship(): Promise<Friendship>;

        /**
         * Displays the target picker (screen for selecting a group or friend) and sends the message created by the developer to the selected target. This message appears to your group or friends as if you had sent it.
         * @param messages - maximum 5 messages
         */
        function shareTargetPicker(messages: LIFFMessages): Promise<void>;

        /**
         * Gets the Promise object that resolves when you run liff.init() for the first time after starting the LIFF app. If you use liff.ready, you can execute any process after the completion of liff.init().
         */
        const ready: Promise<void>;

        /**
         * The property that holds the LIFF app ID (String type) passed to liff.init().
         *
         * The value of liff.id is null until you run liff.init().
         */
        let id: string | null;

        const bluetooth: {
            /**
             * Check if the Bluetooth plugin can be used.
             */
            getAvailability(): Promise<boolean>
            /**
             * Scans the linked device, and acquires the information.
             * @param options
             */
            requestDevice(options?: LIFFRequestDeviceOptions): Promise<BluetoothDevice>
        }
    }
}
