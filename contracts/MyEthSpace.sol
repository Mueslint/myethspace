// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyEthSpace {
    struct SocialActions {
        uint256 totalWaves;
        uint256 totalThumbs;
        uint256 totalLikes;
    }

    struct Message {
        address user;
        string message;
        uint256 timestamp;
    }

    event NewMessage(address indexed from, uint256 timestamp, string message);

    SocialActions socialActions;
    Message[] messages;

    constructor() payable {
        console.log("Hello world!");
    }

    function wave(string memory _message) public {
        socialActions.totalWaves += 1;
        console.log("%s has wave", msg.sender);
        messages.push(Message(msg.sender, _message, block.timestamp));
        emit NewMessage(msg.sender, block.timestamp, _message);
    }

    function thumbsup(string memory _message) public {
        socialActions.totalThumbs += 1;
        console.log("%s has thumbed", msg.sender);
        messages.push(Message(msg.sender, _message, block.timestamp));
        emit NewMessage(msg.sender, block.timestamp, _message);
    }

    function like(string memory _message) public {
        socialActions.totalLikes += 1;
        console.log("%s has liked", msg.sender);
        messages.push(Message(msg.sender, _message, block.timestamp));
        emit NewMessage(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }

    function getTotalSocialActions()
        public
        view
        returns (
            uint256 totalWaves,
            uint256 totalThumbs,
            uint256 totalLikes
        )
    {
        console.log(
            "We have %d waves, %d thumbs up and %d likes !",
            socialActions.totalWaves,
            socialActions.totalThumbs,
            socialActions.totalLikes
        );
        return (
            socialActions.totalWaves,
            socialActions.totalThumbs,
            socialActions.totalLikes
        );
    }
}
