const MerkleTree = require('./MerkleTree');
const niceList = require('./niceList');
const verifyProof = require('./verifyProof');

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

// find the proof that norman block is in the list 
const name = 'Norman Block';
const index = niceList.findIndex(n => n === name);
const proof = merkleTree.getProof(index);

const fakeProof = [
    {
      data: 'ea66759295ab571737267fb1c326f2c2688d31beffc69267e9b38f74c33ae5ab',
      left: true
    }]

// verify proof against the Merkle Root
console.log(`Verifying "${name}" is in tree (expect true): ${verifyProof(proof, name, root)}`);
console.log(`Verifying "Not a name" is in tree (expect false): ${verifyProof(proof, "Not a name", root)}`);
console.log(`Verifying ${name} is in tree with fake proof (expect false): ${verifyProof(fakeProof, name, root)}`);

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?