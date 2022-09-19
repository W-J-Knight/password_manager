// module to help encrytion and decryption
const crypto = require("crypto");
// key is hidden
const secret = process.env['secret_key'];

const encrypt = (password) => {
    // create defferent identify for each encryption
    const iv = Buffer.from(crypto.randomBytes(16));
    // what will encrypt the password
    const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);

    // varible to hold the encrypt password that is creates
    const encryptedPassword = Buffer.concat([
        cipher.update(password),
        cipher.final(),
    ]);

    // return object with iv and password that tranform hex valuestring
    return {
        iv: iv.toString("hex"),
        password: encryptedPassword.toString("hex"),
    };
};

// decrypt the passord use key and iv
const decrypt = (encryption) => {
    const decipher = crypto.createDecipheriv(
        "aes-256-ctr",
        Buffer.from(secret),
        // transform back from hex value
        Buffer.from(encryption.iv, "hex")
    );

    const decryptedPassword = Buffer.concat([
        // transform back from hex value
        decipher.update(Buffer.from(encryption.password, "hex")),
        decipher.final(),
    ]);

    return decryptedPassword.toString();
};

module.exports = { encrypt, decrypt };