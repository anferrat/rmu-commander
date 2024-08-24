import QuickCrypto from "react-native-quick-crypto";

export class CryptoUtil {
    constructor() { }

    createRandom(se: number) {
        if (se <= 0)
            return "";
        se > 0 && se < 7 && (se = 10);
        const Ee = se - 6
            , Zt = new Uint8Array(Math.floor((Ee || Ee) / 2));
        return crypto.getRandomValues(Zt),
            Array.from(Zt, this.toHex).join("") + this.randomString(7)
    }

    toHex(se: number) {
        return ("0" + se.toString(16)).substr(-2)
    }

    randomString(se: number) {
        let Ee = "";
        const Zt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            , yn = new Uint32Array(se);
        crypto.getRandomValues(yn);
        for (let $t = 0; $t < se; $t++)
            Ee += Zt[yn[$t] % Zt.length]
        return Ee
    }

    createCodeChallenge(code_verifier: string): string {
        return QuickCrypto.createHash('sha256').update(code_verifier).digest().toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    }
}