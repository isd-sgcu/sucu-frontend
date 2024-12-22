import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_SECRET_KEY;

export const getDecryptedToken = () => {
    const encryptedToken = sessionStorage.getItem('encryptedToken');
    if (encryptedToken) {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
        const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
        console.log('Decrypted Token:', decryptedToken);
        return decryptedToken;
    }
    console.log('No encrypted token found in sessionStorage.');
    return null;
};