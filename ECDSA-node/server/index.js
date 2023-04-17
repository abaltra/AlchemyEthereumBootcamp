const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const keccak = require("ethereum-cryptography/keccak");
const utils = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "6c73a64850d6c74a55f46fe5eea3f00409cd7424": 100
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;

  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  console.log(req.body)
  const { signature, publicKey, recipient, amount } = req.body;

  console.log(req.body);
  try {
    isValidTransaction(req.body, signature, publicKey);
    senderAddress = publicKeyToETHAddress(publicKey);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: `Invalid public key ${publicKey} pass in` });
  }

  setInitialBalance(senderAddress);
  setInitialBalance(recipient);

  if (balances[senderAddress] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[senderAddress] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[senderAddress] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function publicKeyToETHAddress(publicKey) {
  console.log(`Transforming public key ${publicKey} into ETH address`)
  const address = utils.toHex(keccak.keccak256(utils.hexToBytes(publicKey).slice(1)).slice(-20));

  console.log(`ETH Address: ${address}`)


  return address
}

function isValidTransaction(payload, signature, publicKey) {
  console.log(`Verifying transaction is valid for: \n\tsignature: ${signature}\n\tkey: ${publicKey}`)
  delete payload.signature
  delete payload.publicKey

  console.log(`Cleaned up payload is: ${JSON.stringify(payload)}`)
  const utf8Encode = new TextEncoder();
  const encodedPayload = utf8Encode.encode(JSON.stringify(payload));
  const hashedPayload = utils.toHex(encodedPayload)

  const expandedSignature = secp.secp256k1.Signature.fromCompact(signature);
  expandedSignature.assertValidity();

  return secp.secp256k1.verify(expandedSignature, hashedPayload, publicKey);
}
