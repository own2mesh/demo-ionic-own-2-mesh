export interface LockLocal {
    id: string;
    mac: string;
    password: Array<number>;
    secret: Array<number>;
    passwordHexaDecimal: Array<string>;
    secretHexaDecimal: Array<string>;
}
