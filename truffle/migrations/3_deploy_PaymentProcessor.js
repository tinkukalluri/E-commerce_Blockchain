
const PaymentProcessor = artifacts.require("PaymentProcessor")
const TinToken = artifacts.require('TinToken')

module.exports = async function (deployer) {
    TinTokenAddress= TinToken.networks[5777].address
    await deployer.deploy(PaymentProcessor , TinTokenAddress);
};




