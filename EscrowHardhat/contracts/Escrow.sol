// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Escrow {
	mapping(address => bool) public arbiters;
	address public beneficiary;
	address public depositor;

	mapping(address => bool) public approvals;
	uint8 approvalsNeeded;
	uint8 currentApprovals;

	bool isApproved;

	constructor(address[] memory _arbiters, address _beneficiary) payable {
		require(_arbiters.length > 0 && _arbiters.length < 11, "Up to 10 arbiters are supported");

		for (uint8 i = 0; i < _arbiters.length; i++) {
			arbiters[_arbiters[i]] = true;
		}

		beneficiary = _beneficiary;
		depositor = msg.sender;
		approvalsNeeded = uint8(_arbiters.length);
	}

	event Approved(uint);
	event PartialApproval(address);

	function approve() external {
		require(arbiters[msg.sender], "Account not in approvers list");
		require(approvals[msg.sender] == false, "Can only approve a contract once");
		
		approvals[msg.sender] = true;
		currentApprovals += 1;

		emit PartialApproval(msg.sender);
		if (currentApprovals != approvalsNeeded) return;

		uint balance = address(this).balance;
		(bool sent, ) = payable(beneficiary).call{value: balance}("");
 		require(sent, "Failed to send Ether");
		emit Approved(balance);
		isApproved = true;
	}
}
