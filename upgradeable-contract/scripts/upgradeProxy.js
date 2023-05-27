const { ethers, upgrades } = require('hardhat');

const PROXY_ADDRESS = "0x657eC1371A82f431feb11C8438EE57Ba7bfDaFBd";

async function main() {
    const VendingMachineV2 = await ethers.getContractFactory("VendingMachineV2")
    const upgraded = await upgrades.upgradeProxy(PROXY_ADDRESS, VendingMachineV2)
    await upgraded.deployed();

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(PROXY_ADDRESS)

    console.log(`Proxy contract address: ${PROXY_ADDRESS}`)
    console.log(`Current implementation owner: ${upgraded.owner()}`)
    console.log(`Implementaion address: ${implementationAddress}`)
}

main();