// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract RecoPortal {
    uint256 totalReco;

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

    constructor() {
        console.log("I am a contract and I am smart.");
    }

    function recommend(string memory _message) public {
        totalReco += 1;
        console.log("%s has recommended you something!", msg.sender, _message);

        // Store the reco date to array.
        recos.push(Reco(msg.sender, _message, block.timestamp));

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
