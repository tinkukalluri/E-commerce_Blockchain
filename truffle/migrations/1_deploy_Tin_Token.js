const Tin = artifacts.require("TinToken");

module.exports = function (deployer) {
    deployer.deploy(Tin, '30000000000');
};