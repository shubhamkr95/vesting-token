// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
 address admin;

 constructor() ERC20("Vesting Token", "VT") {
  admin = msg.sender;
  _mint(msg.sender, 1000000 * 10**18);
 }
}
