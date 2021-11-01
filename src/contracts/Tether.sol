pragma solidity ^0.8.0;

contract Tether {
    string public name = 'Mock Tether Token';
    string public symbol = 'mUSDT';
    uint256 public totalSupply = 1000000000000000000000000; //18 zeros + 6 zeros pel milió. 1 milion tokens
    uint8 public decimals = 18;
}