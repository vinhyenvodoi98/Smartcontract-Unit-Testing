pragma solidity ^0.4.5;

contract DappToken {
  uint256 public totalSupply;

  constructor (uint256 _initialSupply) public {
    totalSupply = _initialSupply;
  }
}