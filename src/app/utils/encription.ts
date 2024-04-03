import { Injectable } from "@angular/core";
import CryptoJS from "crypto-js";
@Injectable({
    providedIn: 'root'
})
export class Encription {
    public encryptUsingAES256(data: any) {
        let _key = CryptoJS.enc.Utf8.parse("IRTADMINENCPOLCY");
        let _iv = CryptoJS.enc.Utf8.parse("IRTADMINENCPOLCY");
        let encrypted = CryptoJS.AES.encrypt(
          JSON.stringify(data), _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }
        );
        return encrypted;
    }

    public decryptUsingAES256(data: any) {
        let _key = CryptoJS.enc.Utf8.parse("IRTADMINENCPOLCY");
        let _iv = CryptoJS.enc.Utf8.parse("IRTADMINENCPOLCY");
    
        let decrypted = CryptoJS.AES.decrypt(
          data, _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }
        ).toString(CryptoJS.enc.Utf8);
    
        return JSON.parse(decrypted);
      }

}

export { CryptoJS };
