pragma solidity ^0.8.0;

import './RWD.sol';
import '../contracts/Tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked; 
    mapping(address => bool) public isStaking; 

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    //Staking function
    function depositTokens(uint _amount) public {
        require(_amount > 0, 'amount cannot be 0');
        //Transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);
        //Keep track of the staking balances 
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        //Update Staking Balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    //issue rewards
    function issueTokens() public {
        //require the owner to issue tokens only
        require(msg.sender == owner, 'caller must be the owner');
            for(uint i=0; i<stakers.length; i++) {
                address recipient = stakers[i];
                uint balance = stakingBalance[recipient] / 9; //percentatge incentive
                if (balance>0) {
                    rwd.transfer(recipient, balance);                    
                }
            }
    }

    //unstake tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance can't be less than 0");
        //transfer the tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);
        //reset staking balance
        stakingBalance[msg.sender] = 0;
        //update staking status
        isStaking[msg.sender] = false;
    }


}