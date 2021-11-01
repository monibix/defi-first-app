pragma solidity ^0.8.0;

contract Tether {
    string public name = 'Mock Tether Token';
    string public symbol = 'mUSDT';
    uint256 public totalSupply = 1000000000000000000000000; //18 zeros + 6 zeros pel milió. 1 milion tokens
    uint8 public decimals = 18;

    event Transfer (
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approve (
        address indexed _owner, 
        address indexed _spender, 
        uint _value
    );

    mapping(address => uint256) public balanceOf;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns(bool success) {
        //check if the balance is greater or equal than the value to transfer
        require(balanceOf[msg.sender] >= _value);
        //substract the value to the sender
        balanceOf[msg.sender] -= _value;
        //add the value to transferee 
        balanceOf[_to] += _value;
        //run the transfer
        emit Transfer(msg.sender, _to, _value);
        //return true if everything is successful 
        return true;
    }
    

}