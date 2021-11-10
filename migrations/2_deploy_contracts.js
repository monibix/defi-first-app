const Tether = artifacts.require('../src/contracts/Tether.sol');
const RWD = artifacts.require('../src/contracts/RWD.sol');
const DecentralBank = artifacts.require('../src/contracts/DecentralBank.sol');

module.exports = async function(deployer, network, accounts) {
    // Deploy Tether contract
    await deployer.deploy(Tether)
    const tether = await Tether.deployed();

    // Deploy RWD contract
    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    // Deploy DecentralBank contract
    await deployer.deploy(DecentralBank, rwd.address, tether.address)
    const decentralBank = await DecentralBank.deployed()

    // Transfer the RWD tokens to the bank (1milion)
    await rwd.transfer(decentralBank.address, '1000000000000000000000000')

    // Distribute 100 Tether tokens to investor
    await tether.transfer(accounts[1], '100000000000000000000')

};