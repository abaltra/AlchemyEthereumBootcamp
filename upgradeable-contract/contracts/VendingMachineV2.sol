// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "hardhat/console.sol";

contract VendingMachineV2 is Initializable {
    uint public numSodas;
    address public owner;

    mapping(address => uint) amountsBought;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can withdraw");
        _;
    }

    function initialize(uint _numSodas) public initializer {
        numSodas = _numSodas;
        owner = msg.sender;
    }

    function purchaseSoda() public payable {
        require(msg.value >= 1000 wei, "You must pay 1000 wei for a soda");
        require(numSodas > 0, "No sodas left!");
        numSodas--;
        amountsBought[msg.sender] += 1;
    }

    function withdrawProfits() public onlyOwner {
        require(address(this).balance > 0, "Pofits must be more than 0");
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to withdraw");
    }

    function setNewOwner(address nOwner) public onlyOwner {
        owner = nOwner;
    }
}
