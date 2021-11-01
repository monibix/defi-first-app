pragma solidity ^0.8.0;

contract Migrations {
    address public owner; 
    uint public last_completed_migration;

    constructor() public {
        owner = msg.sender; //The current person who is connecting with the contract. If it's in the constructor we can create instances of that
    }

    modifier restricted() {
        if (msg.sender == owner) _; //if the person who is calling out the contract is the owner, continue
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }

}