var CryptoJS = require("crypto-js");
const key = "659280147772";

var cipherText = CryptoJS.AES.encrypt("Pizza331!",key).toString();
var bytes  = CryptoJS.AES.decrypt(cipherText, key);
var password = CryptoJS.AES.decrypt("U2FsdGVkX19v8VePlptuso0L6d7v2besqtmUVV+Cy80=",key)
var originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log(cipherText);
console.log(originalText)
console.log(password.toString(CryptoJS.enc.Utf8))
//{"_id":{"$oid":"6493914afa4222849cf41acb"},"firstName":"Will","lastName":"Gallagher","email":"creeksidewill@gmail.com","password":"U2FsdGVkX19v8VePlptuso0L6d7v2besqtmUVV+Cy80="}