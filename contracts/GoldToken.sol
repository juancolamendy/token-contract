//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoldToken is ERC20 {
    constructor() ERC20("Gold", "GDL") {
        _mint(msg.sender, 100000 * (10 ** 18));
    }
}
