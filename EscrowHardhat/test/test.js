const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Escrow', function () {
  let contract;
  let depositor;
  let beneficiary;
  let arbiters;
  const deposit = ethers.utils.parseEther('1');
  beforeEach(async () => {
    depositor = ethers.provider.getSigner(0);
    beneficiary = ethers.provider.getSigner(1);
    arbiters = [ethers.provider.getSigner(2), ethers.provider.getSigner(3)];
    const Escrow = await ethers.getContractFactory('Escrow');
    contract = await Escrow.deploy(
      arbiters.map(async a => await a.getAddress()),
      beneficiary.getAddress(),
      {
        value: deposit,
      }
    );
    await contract.deployed();
  });

  it('should be funded initially', async function () {
    let balance = await ethers.provider.getBalance(contract.address);
    expect(balance).to.eq(deposit);
  });

  describe('after approval from address other than the arbiter', () => {
    it('should revert', async () => {
      await expect(contract.connect(beneficiary).approve()).to.be.reverted;
    });
  });

  describe('after double approval from same arbiter', () => {
    it('should revert', async () => {
      const approveTxn = await contract.connect(arbiters[0]).approve();
      await approveTxn.wait();
      await expect(contract.connect(arbiters[0]).approve()).to.be.reverted;
    });
  });

  describe('after approval from all arbiters', () => {
    it('should transfer balance to beneficiary', async () => {
      const before = await ethers.provider.getBalance(beneficiary.getAddress());
      let approveTxn = await contract.connect(arbiters[0]).approve();
      await approveTxn.wait();
      approveTxn = await contract.connect(arbiters[1]).approve();
      await approveTxn.wait();
      const after = await ethers.provider.getBalance(beneficiary.getAddress());
      expect(after.sub(before)).to.eq(deposit);
    });
  });
});
