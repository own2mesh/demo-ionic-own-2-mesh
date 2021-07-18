export interface LockLocal {
    /**
     * locks unique name
     * @example 'AUAS000004'
     */
    id: string;

    /**
     * name of the locks model
     * @example
     * 'OKGSS101'
     */
    modelName: string;

    /**
     * locks unique mac address
     * @example 'C4:DE:65:A4:8F:55'
     */
    mac: string;

    /**
     * same as password, but converted to Array of hexadecimals
     */
    passwordHexaDecimal: Array<string>;

    /**
     * same as secret, but converted to Array of hexadecimals
     */
    secretHexaDecimal: Array<string>;
    password: Array<number>;
    secret: Array<number>;
}
