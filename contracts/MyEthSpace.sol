// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyEthSpace {
    struct SocialActions {
        uint256 totalWaves;
        uint256 totalThumbs;
        uint256 totalLikes;
    }

    SocialActions socialActions;

    constructor() {
        console.log("Hello world!");
    }

    function wave() public {
        socialActions.totalWaves += 1;
        console.log("%s has wave", msg.sender);
    }

    function thumbsup() public {
        socialActions.totalThumbs += 1;
        console.log("%s has thumbed", msg.sender);
    }

    function like() public {
        socialActions.totalLikes += 1;
        console.log("%s has liked", msg.sender);
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
