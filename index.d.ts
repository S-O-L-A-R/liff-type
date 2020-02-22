/// <reference types="@line/bot-sdk" />
import LINE = require('@line/bot-sdk')

declare type LIFFConfig = {
    /**
     * LIFF app ID. Can be obtained when you add the LIFF app to your channel.
     * @see https://developers.line.biz/en/docs/liff/registering-liff-apps/
     */
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
    /**
     * String containing language settings specified in `navigator.language` in the LIFF app's running environment.
     */
    language: string,
    context: {
        /**
         * The type of screen from where the LIFF app was launched. 
         * - utou: 1-on-1 chat
         * - room: Room
         * - group: Group
         * - none: A screen other than a 1-on-1 chat, room, or group. For example, Wallet tab.
         */
        type: string,
        /**
         * Size of the LIFF app view. One of:
         * `compact`, `tall`, `full`
         * @see https://developers.line.biz/en/docs/liff/registering-liff-apps/
         */
        viewType: string,
        /**
         * User ID. Included when the type property is `utou`, `room`, or `group`.
         */
        userId: string,
        /**
         * 1-on-1 chat ID. Included when the type property is `utou`.
         */
        utouId: string,
        /**
         * Room ID. Included when the type property is `room`.
         */
        roomId: string,
        /**
         * Group ID. Included when the type property is `group`.
         */
        groupId: string,
    }
}

declare type LiffInitSuccessCallback = (
    data: LiffInitSuccessData
) => void

declare type LiffInitErrorCallback = (error: LIFFErrorObject) => void

declare type LIFFPlugins = 'bluetooth'

declare interface LINEBluetoothRequestDeviceFilter {
    /**
     * Device ID of the device that receives the advertisement packet
     */
    deviceId: string
}

declare interface LIFFRequestDeviceOptions {
    /**
     * Array of the `LINEBluetoothRequestDeviceFilter` object
     */
    filters: LINEBluetoothRequestDeviceFilter[]
}

declare interface BluetoothRemoteGATTCharacteristic {
    /**
     * `BluetoothRemoteGATTService` object
     */
    service?: BluetoothRemoteGATTService
    /**
     * UUID
     */
    uuid: string
    /**
     * `DataView` object
     */
    value: DataView
    /**
     * Reads the value of the characteristic.
     */
    readValue(): Promise<DataView>
    /**
     * Writes the value to the characteristic.
     * @param {BufferSource} value 
     */
    writeValue(value: BufferSource): Promise<void>
    /**
     * Starts the notification of characteristic change.
     */
    startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>
    /**
     * Stops the notification of characteristic change.
     */
    stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>
    /**
     * Registers the event listener. You can register the event listener in `characteristicvaluechangedevent` containing the target property.
     * @param {string} eventName 
     * @param {EventListener} event 
     */
    addEventListener(eventName: string, event: EventListener): void
    /**
     * Deletes the already-registered event listener. You can delete the event listener registered in `characteristicvaluechanged` event.
     * @param {string} eventName 
     */
    removeEventListener(eventName: string): void
}

declare interface BluetoothRemoteGATTService {
    /**
     * BluetoothDevice object
     */
    device: BluetoothDevice
    /**
     * GATT Service UUID
     */
    uuid: string
    /**
     * Acquires the characteristics. Specify a 128-bit UUID in the characteristicUUID.
     * @param {string} characteristicUUID 
     */
    getCharacteristic(characteristicUUID: string): Promise<BluetoothRemoteGATTCharacteristic>	
}

declare interface BluetoothRemoteGATTServer {
    /**
     * BluetoothDevice object
     */
    device: BluetoothDevice
    /**
     * `true` if connected. `false` if not connected
     */
    connected: boolean
    /**
     * Connects with the device.
     */
    connect(): Promise<BluetoothRemoteGATTService>
    /**
     * Disconnects from the GATT server of the device.
     */
    disconnect(): void
    /**
     * Acquires the primary service of the GATT server. Specify a 128-bit UUID in the serviceUUID.
     * @see https://developers.line.biz/en/reference/liff/#bluetoothremotegattserver
     * @param {string} serviceUUID 
     */
    getPrimaryService(serviceUUID: string): Promise<BluetoothRemoteGATTService>
}

declare interface BluetoothDevice {
    /**
     * Device ID
     */
    id: string
    /**
     * device name
     */
    name?: string
    /**
     * BluetoothRemoteGATTServer object
     */
    gatt?: BluetoothRemoteGATTServer
    /**
     * Monitoring status of advertisement packet (*)
     */
    watchingAdvertisements: boolean
    /**
     * Starts the reception of the advertisement packet. (*)
     */
    watchAdvertisements(): Promise<void>
    unwatchAdvertisements(): void
    /**
     * Registers the event listener. You can register the event listener in `advertisementreceived event(*)` and `gattserverdisconnected` event.
     * @param {string} eventName 
     * @param {EventListener} event 
     */
    addEventListener(eventName: string, event: EventListener): void
    /**
     * Deletes the already-registered event listener. You can delete the event listener registered in `advertisementreceived event(*)` and `gattserverdisconnected` event.
     * @param {EventListener} event 
     */
    removeEventListener(event: EventListener): void
}

declare type LIFFLoginConfig = {
    /**
     * URL to open in the LIFF app after LINE Login. If omitted, the user is redirected to the page that displays when the LIFF app is opened (front page).
     */
    redirectUri?: string
}

declare interface scanCodeResult {
    /**
     * String read by the QR code reader
     */
    value: string | null
}

declare interface LiffDecodedProfile {
    /**
     * List of authentication methods used by the user 
     * @see https://developers.line.biz/en/docs/line-login/integrate-line-login/#making-an-authorization-request
     * Possible values: ['pwd', 'lineautologin', 'lineqr', 'linesso' ]
     */
    amr: string[]
    /**
     * Channel ID
     */
    aud: string
    /**
     * User's email address. Not included if the `email` scope was not specified in the authorization request.
     */
    email: string
    /**
     * The expiry date of the token in UNIX time.
     */
    exp: number
    /**
     * Time when the ID token was generated in UNIX time.
     */
    iat: number
    /**
     * `https://access.line.me` URL where the ID token is generated.
     */
    iss: string
    /**
     * User's display name. Not included if the `profile` scope was not specified in the authorization request.
     */
    name: string
    /**
     * User's profile image URL. Not included if the `profile` scope was not specified in the authorization request.
     */
    picture: string
    /**
     * User ID for which the ID token is generated
     */
    sub: string
}

declare interface Friendship {
    /**
     * `true`: The user has added the LINE Official Account as a friend and has not blocked it. Otherwise, `false`
     */
    friendFlag: boolean
}

declare global {
    namespace liff {
        /**
         * Initialize a liff app. You can only call other LIFF SDK methods after calling liff.init(). 
         * The LIFF SDK gets access tokens and ID tokens from the LINE platform when you initialize the LIFF app.
         * @param {LIFFConfig} config - LIFF app ID. Can be obtained when you add the LIFF app to your channel. For more information, @see https://developers.line.biz/en/docs/liff/registering-liff-apps/
         *
         *  Note: 
         *  If the user isn't logging in through LINE, you must specify liffId.
         * @param {LiffInitSuccessCallback} [options] initSuccessCallback - Callback to return a data object upon successful initialization of the LIFF app.
         * @param {LiffInitErrorCallback} [options] errorCallback - Callback to return an error object upon failure to initialize the LIFF app.
         * @see https://developers.line.biz/en/reference/liff/#initialize-liff-app
         * @example 
         * ```
         * liff.init({
         *  liffId: "1234567890-abcdefgh" // use own liffId
         * })
         * .then((data: LiffInitSuccessData) => {
         *   // Start to use liff's api
         *  console.log(data);
         * })
         * .catch((err: LIFFErrorObject) => {
         *   // Error happens during initialization
         *   console.log(err.code, err.message);
         * });
         * ```
         * 
         * @returns Returns a Promise object.
         */
        function init(
            config: LIFFConfig,
            initSuccessCallback?: LiffInitSuccessCallback,
            errorCallback?: LiffInitErrorCallback,
        ): Promise<void>;
        
        /**
         * Gets the environment in which the user is running the LIFF app.
         * @see https://developers.line.biz/en/reference/liff/#get-os
         * @returns The environment in which the user is running the LIFF app is returned as a string.
         * Possible values are 'ios', 'android' and 'web'
         */
        function getOS(): 'ios' | 'android' | 'web'

        /**
         * Gets the version of the LIFF SDK.
         * @see https://developers.line.biz/en/reference/liff/#get-version
         * @returns The version of the LIFF SDK is returned as a string.
         */
        function getVersion(): string

        /**
         * Gets the language settings of the environment in which the LIFF app is running.
         * @see https://developers.line.biz/en/reference/liff/#get-language
         * @returns String containing language settings specified in `navigator.language` in the LIFF app's running environment.
         */
        function getLanguage(): string

        /**
         * Determines whether the LIFF app is running in LINE's in-app browser.
         * @see https://developers.line.biz/en/reference/liff/#is-in-client
         * @returns `true`: Running in LINE browser 
         * 
         * `false`: Running in external browser
         */
        function isInClient(): boolean

        /**
         * Checks whether the user is logged in.
         * @see https://developers.line.biz/en/reference/liff/#is-logged-in
         * @returns `true`: The user is logged in
         *
         * `false`: The user is not logged in
         */
        function isLoggedIn(): boolean

        /**
         * Performs the LINE Login process (web login) for the Web app.
         * @see https://developers.line.biz/en/reference/liff/#login
         * @param {LIFFLoginConfig} config - config.redirectUri `redirectUri`: URL to open in the LIFF app after LINE Login. 
         * @see https://developers.line.biz/en/reference/liff/#login
         * ```
         * @returns None
         */
        function login(config?: LIFFLoginConfig): void

        /**
         * Logs out.
         * @see https://developers.line.biz/en/reference/liff/#logout
         * @returns None
         */
        function logout(): void

        /**
         * Opens the specified URL in the in-app browser of LINE or external browser.
         * @param params - Params object including `url` (required) and `external` (optional)
         * @see https://developers.line.biz/en/reference/liff/#open-window
         * @returns None
         */
        function openWindow(params: {
            url: string,
            external?: boolean
        }): void;
        
        /**
         * Gets the current user's access token.
         * @see https://developers.line.biz/en/reference/liff/#get-access-token
         * @returns Returns the current user's access token as a string.
         */
        function getAccessToken(): string;
        
        /**
         * Gets the current user's profile.
         * @see https://developers.line.biz/en/reference/liff/#get-profile
         * @returns Returns a Promise object that contains the user's profile information.
         */
        function getProfile(): Promise<LINE.Profile>;
        
        /**
         * Sends messages on behalf of the user to the chat screen where the LIFF app is opened. If the LIFF app is opened on a screen other than the chat screen, messages cannot be sent.
         * @param {LINE.Message[]} messages 
         * @see https://developers.line.biz/en/reference/liff/#send-messages
         */
        function sendMessages(messages: LINE.Message[]): Promise<void>;
        
        /**
         * Starts LINE's QR code reader and gets the string read by the user. To start the QR code reader, grant ScanQR permission to the LIFF app in the LINE Developers Console.
         * @see https://developers.line.biz/en/reference/liff/#scan-code
         */
        function scanCode(): Promise<scanCodeResult>

        /**
         * Closes the LIFF app.
         * @see https://developers.line.biz/en/reference/liff/#close-window
         */
        function closeWindow(): void;
        
        /**
         * Enable the plugins.
         *
         * For example, if you enable the Bluetooth plugin, you can use the client API (liff.bluetooth.*) provided by the Bluetooth plugin.
         * @param {string[]} plugins - Plugin name. Specify one of the following values: `bluetooth`
         * @see https://developers.line.biz/en/reference/liff/#init-plugins
         * @returns There is no return value if the plugin is enabled successfully.
         *
         * If you fail to enable the plugins, a Promise object containing the error information is returned.
         */
        function initPlugins(plugins: LIFFPlugins[]): Promise<void>;
        
        /**
         * Gets the payload of the ID token that's automatically acquired by `liff.init()` The payload includes the user display name, profile image URL, and email address.
         * @see https://developers.line.biz/en/reference/liff/#get-decoded-id-token
         * @returns Gets a Promise object containing the ID token payload.
         */
        function getDecodedIDToken(): Promise<LiffDecodedProfile>;

        /**
         * Gets the friendship status of the LINE Official Account that's linked to the LINE Login channel to which the LIFF app is added.
         * @see https://developers.line.biz/en/reference/liff/#get-friendship
         * @returns Gets a Promise object that specifies the status of the friendship.
         */
        function getFriendship(): Promise<Friendship>;

        const bluetooth: {
            /**
             * Check if the Bluetooth plugin can be used. Call this method to check the following conditions:
             * @see https://developers.line.biz/en/reference/liff/#bluetooth-get-availability
             * @returns Returns a Promise object. The Promise object contains a Boolean object indicating whether or not the Bluetooth plugin can be used.
             */
            getAvailability(): Promise<boolean>
            /**
             * Scans the linked device, and acquires the information.
             * @param options 
             * @see https://developers.line.biz/en/reference/liff/#bluetooth-request-device
             * @returns Returns a Promise object. The Promise object contains the BluetoothDeviceobject indicating information about the devices.
             */
            requestDevice(options?: LIFFRequestDeviceOptions): Promise<BluetoothDevice>
        }
    }    
}
