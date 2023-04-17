const secp = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils");
const keccak = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey)

console.log(`Private key: ${utils.toHex(privateKey)}`)
console.log(`Public key: ${utils.toHex(publicKey)}`)
console.log(`ETH Address for public key: ${utils.toHex(keccak.keccak256(publicKey.slice(1)).slice(-20))}`)


const payload = { test: 1 }
const hashedPayload = hashPayload(payload)
const signature = sign(privateKey, payload)

console.log(`Signature for payload is ${signature}`)

const expandedSignature = secp.secp256k1.Signature.fromCompact(signature);
expandedSignature.assertValidity();

const isMessageVerified = secp.secp256k1.verify(expandedSignature, hashedPayload, publicKey);

console.log(`Is Message verified?: ${isMessageVerified}`)




// console.log(`Recovered public key: ${utils.toHex(recoveredPublicKey)}`)

function hashPayload(payload) {
    let utf8Encode = new TextEncoder();
    const encodedPayload = utf8Encode.encode(JSON.stringify(payload));
    return utils.toHex(encodedPayload)
}

function sign(privateKey, payload) {
    const signature = secp.secp256k1.sign(hashPayload(payload), privateKey)
    return signature.toCompactHex()
  }