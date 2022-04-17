// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract RecoPortal {
    uint256 totalReco;

    constructor() {
        console.log("I am a contract and I am smart.");
    }

    function recommend() public {
        totalReco += 1;
        console.log("%s has recommended you something!", msg.sender);
    }

    function getTotalReco() public view returns (uint256) {
        console.log("We have %d total recommendations!", totalReco);
        return totalReco;
    }
}
