const Tether = artifacts.require('../src/contracts/Tether.sol');

module.exports = async function(deployer) {
    await deployer.deploy(Tether)
};