const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList)

async function main() {
  // const name = "Alejandro"
  if (process.argv.length < 3) {
    console.error("Pass in at least one name!")
    return;
  }

  for (let index = 2; index < process.argv.length; index++)
  {
    const element = process.argv[index];

    const merkleIndex = niceList.findIndex(n => n === element)
  
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name: element,
      proof: merkleTree.getProof(merkleIndex)
    });

    console.log(`${element}: ${gift}`)
  }
}

main();
