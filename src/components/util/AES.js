import * as CryptoJS from 'crypto-js';

let AuthTokenKey = 'bird20190101java'; //AES密钥
let AuthTokenIv = 'bird20190101java'; //AES向量

/*AES加密*/
export function Encrypt(data) {
  // let dataStr = JSON.stringify(data);
  let str = '';
  try {
    let encrypted = CryptoJS.AES.encrypt(
      data,
      CryptoJS.enc.Latin1.parse(AuthTokenKey),
      {
        iv: CryptoJS.enc.Latin1.parse(AuthTokenIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      }
    );
    str = encrypted.toString();
  } catch (error) {
    console.log(str);
  }
  return str;
}

/*AES解密*/
export function Decrypt(data) {
  let str = '';
  try {
    let data2 = data.replace(/\n/gm, '');
    let decrypted = CryptoJS.AES.decrypt(
      data2,
      CryptoJS.enc.Latin1.parse(AuthTokenKey),
      {
        iv: CryptoJS.enc.Latin1.parse(AuthTokenIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      }
    );
    str = decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {}

  return str;
}
