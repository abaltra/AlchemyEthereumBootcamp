import { useState } from "react";
import { secp256k1 as secp} from "ethereum-cryptography/secp256k1"
import * as utils from "ethereum-cryptography/utils"
import server from "./server";

function sign(privateKey, payload) {
  let utf8Encode = new TextEncoder();
  const encodedPayload = utf8Encode.encode(JSON.stringify(payload));
  const signature = secp.sign(utils.toHex(encodedPayload), privateKey)
  return signature.toCompactHex()
}

function getPublicKeyFromPrivate(privateKey) {
  return utils.toHex(secp.getPublicKey(utils.hexToBytes(privateKey)))
}

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    let senderPrivateKey = prompt("Please enter your private key (this would be handled by a secure Wallet in a real app");
    if (!senderPrivateKey) return;

    const payload = {
      amount: parseInt(sendAmount),
      recipient,
    }

    payload["signature"] = sign(senderPrivateKey, payload)
    payload["publicKey"] = getPublicKeyFromPrivate(senderPrivateKey)

    try {
      const {
        data: { balance },
      } = await server.post(`send`, payload);
      setBalance(balance);
      alert(`Transfer of ${sendAmount} to ${recipient} succeeded!`)
    } catch (ex) {
      console.log(ex)
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
