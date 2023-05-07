import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(ethers);

export default async function addContract(
  id,
  contract,
  arbiters,
  beneficiary,
  value
) {
  const buttonId = `approve-${id}`;

  const container = document.getElementById('container');
  container.innerHTML += createHTML(buttonId, arbiters, beneficiary, value);

  contract.on('Approved', () => {
    document.getElementById(buttonId).className = 'complete';
    document.getElementById(buttonId).innerText = "✓ It's been approved!";
  });

  document.getElementById(buttonId).addEventListener('click', async () => {
    const signer = provider.getSigner();
    await contract.connect(signer).approve();
  });
}

function createHTML(buttonId, arbiters, beneficiary, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter(s) </div>
          ${arbiters.join(",")}
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${value} </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}