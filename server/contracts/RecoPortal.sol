// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract RecoPortal {
    uint256 totalReco;

    // Generate random number.
    uint256 private seed;

    // Solidity Events
    event NewReco(address indexed from, uint256 timestamp, string message);

    // A struct is a custom datatype where we can customize what we want to hold inside it.
    struct Reco {
        address recommender; // The address of the user who recommended.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user recommended.
    }

    // I declare a variable recos that lets me store an array of structs.
    // This is what lets me hold all the recos anyone ever sends to me!
    Reco[] recos;

    // Storing the address with the last time user recommended.
    mapping(address => uint256) public lastRecoAt;

    constructor() payable {
        console.log("I am a contract and I am smart.");

        // Initial seed.
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function recommend(string memory _message) public {
        require(
            lastRecoAt[msg.sender] + 15 minutes < block.timestamp,
            "You need to wait 15 minutes before you could recommend again."
        );

        // Update current timestamp.
        lastRecoAt[msg.sender] = block.timestamp;

        totalReco += 1;
        console.log("%s has recommended you something!", msg.sender, _message);

        // Store the reco date to array.
        recos.push(Reco(msg.sender, _message, block.timestamp));

        // New seed for next user.
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        // 50% chance that user wins the prize.
        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.00042069 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from the contract.");
        }

        emit NewReco(msg.sender, block.timestamp, _message);
    }

    function getAllReco() public view returns (Reco[] memory) {
        return recos;
    }

    function getTotalReco() public view returns (uint256) {
        console.log("We have %d total recommendations!", totalReco);
        return totalReco;
    }
}
