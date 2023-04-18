const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = "42e9367616c60220562f203f9ac788ec3ebc41eb96beea3d4d5e520359967897"

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  const { name, proof } = body

  // verify proof against the Merkle Root
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
