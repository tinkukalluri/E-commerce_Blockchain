const Tin = artifacts.require("TinToken");

module.exports = function (deployer) {
    deployer.deploy(Tin, '300000000000000000000000');
};