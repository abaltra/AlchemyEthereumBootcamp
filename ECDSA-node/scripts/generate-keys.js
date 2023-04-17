const secp = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils");
const keccak = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey)

console.log(`Private key: ${utils.toHex(privateKey)}`)
console.log(`Public key: ${utils.toHex(publicKey)}`)
console.log(`ETH Address for public key: ${utils.toHex(keccak.keccak256(publicKey.slice(1)).slice(-20))}`)
