const Tether = artifacts.require('../src/contracts/Tether.sol');
const Faml = artifacts.require('../src/contracts/Faml.sol')

module.exports = async function(deployer) {
    await deployer.deploy(Tether)
    await deployer.deploy(Faml)
};

