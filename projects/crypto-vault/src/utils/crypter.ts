import {enc, AES} from 'crypto-js';

export class Crypter {

  public static encrypt(key, value) {
    key = enc.Utf8.parse(key);
    let ciphertext = AES.encrypt(value, key, { iv: key }).toString();
    return ciphertext;
  }

  public static decrypt(key, value) {
    key = enc.Utf8.parse(key);
    let decryptedData = AES.decrypt(value, key, {
      iv: key
    });
    return decryptedData.toString(enc.Utf8);
  }
}