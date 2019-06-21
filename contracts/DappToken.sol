pragma solidity ^0.4.5;

contract DappToken {
  //Name
  string public name = "DappToken";
  //Symbol
  string public symbol = "DAPP";
  //Standard
  string public standard = "DApp Token v1.0";

  uint256 public totalSupply;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  mapping (address => uint256) public balanceOf ;

  constructor (uint256 _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
  }

  // Transfer
  function transfer(address _to, uint256 _value) public returns(bool success) {
  // Exception if account doesn't have enough
  require ( balanceOf[msg.sender] >= _value );
  // Return a boolean
  balanceOf[msg.sender] -= _value;
  balanceOf[_to] += _value;

  Transfer(msg.sender, _to, _value);
  // Transfer Event
  return true;
  }
}