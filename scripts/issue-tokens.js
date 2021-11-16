const DecentralBank = artifacts.require('../src/contracts/DecentralBank.sol');

module.exports = async function issueRewards(callback) {
    let decentralBank = await DecentralBank.deployed()
    await decentralBank.issueTokens()
    console.log('Tokens have been issued successfully!')
    callback()
}