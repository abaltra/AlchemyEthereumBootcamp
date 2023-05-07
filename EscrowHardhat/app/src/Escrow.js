import { ethers } from 'ethers';

export default function Escrow({
  address,
  arbiters,
  beneficiary,
  value,
  handleApprove,
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter(s) </div>
          <ul>
            {arbiters.map((arbiter) => {
              return (<li key={"arbiter_" + arbiter} id={"arbiter_" + arbiter + "_" + address}> {arbiter} </li>)
            })}
          </ul>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value (ETH)</div>
          <div> {ethers.utils.formatEther(value)} </div>
        </li>
        <div
          className="button"
          id={address}
          onClick={(e) => {
            e.preventDefault();

            handleApprove();
          }}
        >
          Approve
        </div>
      </ul>
    </div>
  );
}
