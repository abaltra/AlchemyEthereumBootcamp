import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  let arbiterCount = 1;

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  async function newContract() {

    if (
      !document.getElementById('beneficiary').value ||
      !document.getElementById('eth').value ||
      document.getElementsByClassName('arbiterInput').length === 0
    )
    {
      document.getElementById('error_modal').getElementsByTagName("p")[0].innerText = "All fields are required";
      document.getElementById('error_modal').showModal();
      return;
    }

    const beneficiary = document.getElementById('beneficiary').value;
    const value = ethers.utils.parseEther(document.getElementById('eth').value);
    console.log( Array.from(document.getElementsByClassName("arbiterInput")))
    const arbiters = Array.from(document.getElementsByClassName("arbiterInput")).map(e => e.value);


    if (
      !ethers.utils.isAddress(beneficiary) ||
      !arbiters.every(ethers.utils.isAddress)
    ) {
      document.getElementById('error_modal').getElementsByTagName("p")[0].innerText = "Some addresses are invalid";
      document.getElementById('error_modal').showModal();
      return;
    }

    const escrowContract = await deploy(signer, arbiters, beneficiary, value);
    escrowContract.on('PartialApproval', (approverAddress) => {
      
      document.getElementById(`arbiter_${approverAddress}_${escrowContract.address}`).className = "complete";
    });
    const escrow = {
      address: escrowContract.address,
      arbiters,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
    };

    setEscrows([...escrows, escrow]);
  }

  function addArbiterRow() {
    let newEntry = document.createElement("input")
    newEntry.setAttribute("type", "text");
    newEntry.setAttribute("id", `arbiter_${arbiterCount}`);
    newEntry.setAttribute("class", "arbiterInput")

    const newContract = document.getElementById("arbiterGroup");
    newContract.insertBefore(newEntry, document.getElementById("addArbiter"))
    arbiterCount ++;
  }

  return (
    <>
      <dialog id="error_modal">
        <p>All fields are required</p>
        <form method='dialog'>
          <button>OK</button>
        </form>
      </dialog>
      <div className="contract" id="contract">
        <h1> New Contract </h1>
        <label id="arbiterGroup">
          Arbiter Address
          <input type="text" id="arbiter_0" className='arbiterInput' />
          <div 
            className='button'
            id='addArbiter'
            onClick={(e) => {
              e.preventDefault();
              addArbiterRow();
            }}
          >
            Add extra arbiter
          </div>
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in ETH)
          <input type="text" id="eth" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
