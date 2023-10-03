import CryptoJS from 'crypto-js';

const secretKey = CryptoJS.SHA256("21072000").toString()

export default{
    encrypted(value : any) {
        return CryptoJS.AES.encrypt(value, secretKey).toString();

    },
    decrypted(value : any) {
        if (value) {
          const bytes = CryptoJS.AES.decrypt(value, secretKey);
          const token = bytes.toString(CryptoJS.enc.Utf8);
          return token;
        }
        return null;
      }
}