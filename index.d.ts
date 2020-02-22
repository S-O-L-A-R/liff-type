/// <reference types="@line/bot-sdk" />
import LINE = require('@line/bot-sdk')

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

declare global {
    namespace liff {
        /**
         * Initialize a liff app. You can only call other LIFF SDK methods after calling liff.init(). 
         * The LIFF SDK gets access tokens and ID tokens from the LINE platform when you initialize the LIFF app.
         * @param config - LIFF app ID. Can be obtained when you add the LIFF app to your channel. 
         * @param initSuccessCallback - Callback to return a data object upon successful initialization of the LIFF app.
         * @param errorCallback - Callback to return an error object upon failure to initialize the LIFF app.
         * @example
         * ```
         * liff.init({
         *  liffId: "1234567890-abcdefgh" // use own liffId
         * })
         * .then(() => {
         *   // Start to use liff's api
         * })
         * .catch((err: LIFFErrorObject) => {
         *   // Error happens during initialization
         *   console.log(err.code, err.message);
         * });
         * ```
         * 
         * @returns a Promise object.
         */
        function init(
            config: LIFFConfig,
            initSuccessCallback?: LiffInitSuccessCallback,
            errorCallback?: LiffInitErrorCallback,
        ): Promise<void>;
        
        /**
         * Gets the environment in which the user is running the LIFF app.
         * @returns The environment in which the user is running the LIFF app is returned as a string.
         */
        function getOS(): 'ios' | 'android' | 'web'

        /**
         * Gets the version of the LIFF SDK.
         * @returns The version of the LIFF SDK is returned as a string.
         */
        function getVersion(): string

        /**
         * Gets the language settings of the environment in which the LIFF app is running.\
         * @returns String containing language settings specified in `navigator.language` in the LIFF app's running environment.
         */
        function getLanguage(): string

        /**
         * Determines whether the LIFF app is running in LINE's in-app browser.
         * @returns `true`: Running in LINE browser, `false`: Running in external browser
         */
        function isInClient(): boolean

        /**
         * Checks whether the user is logged in.
         * @returns `true`: The user is logged in
         *
         * `false`: The user is not logged in
         */
        function isLoggedIn(): boolean

        /**
         * Performs the LINE Login process (web login) for the Web app.
         * @param config - config.redirectUri `redirectUri`: URL to open in the LIFF app after LINE Login.
         * 
         */
        function login(config?: LIFFLoginConfig): void

        /**
         * Logs out.
         */
        function logout(): void

        /**
         * Opens the specified URL in the in-app browser of LINE or external browser.
         * @param params - Params object including `url` (required) and `external` (optional)
         */
        function openWindow(params: {
            url: string,
            external?: boolean
        }): void;
        
        /**
         * Gets the current user's access token.
         * @returns the current user's access token as a string.
         */
        function getAccessToken(): string;
        
        /**
         * Gets the current user's profile.
         * @returns a Promise object that contains the user's profile information.
         */
        function getProfile(): Promise<LINE.Profile>;
        
        /**
         * Sends messages on behalf of the user to the chat screen where the LIFF app is opened. If the LIFF app is opened on a screen other than the chat screen, messages cannot be sent.
         * @param messages - array of message object
         */
        function sendMessages(messages: LINE.Message[]): Promise<void>;
        
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
         * @returns There is no return value if the plugin is enabled successfully.
         *
         * If you fail to enable the plugins, a Promise object containing the error information is returned.
         */
        function initPlugins(plugins: LIFFPlugins[]): Promise<void>;
        
        /**
         * Gets the payload of the ID token that's automatically acquired by `liff.init()` The payload includes the user display name, profile image URL, and email address.
         * @returns Gets a Promise object containing the ID token payload.
         */
        function getDecodedIDToken(): Promise<LiffDecodedProfile>;

        /**
         * Gets the friendship status of the LINE Official Account that's linked to the LINE Login channel to which the LIFF app is added.
         * @returns a Promise object that specifies the status of the friendship.
         */
        function getFriendship(): Promise<Friendship>;

        const bluetooth: {
            /**
             * Check if the Bluetooth plugin can be used.
             * @returns a Promise object. The Promise object contains a Boolean object indicating whether or not the Bluetooth plugin can be used.
             */
            getAvailability(): Promise<boolean>
            /**
             * Scans the linked device, and acquires the information.
             * @param options
             * @returns a Promise object. The Promise object contains the BluetoothDeviceobject indicating information about the devices.
             */
            requestDevice(options?: LIFFRequestDeviceOptions): Promise<BluetoothDevice>
        }
    }    
}
