
const TinToken = artifacts.require('TinToken')

// TinTokenJson = require('../../client/src/contracts/TinToken.json')


contract('TinToken', () => {
    it('contract address credited with correct amount', async () => {
        const TinTokenInstance = await TinToken.deployed();
        var value = (await TinTokenInstance.balanceOf(TinToken.networks[5777].address));
        console.log(value);
        console.log(typeof value)
        assert.equal(value.toString(), '300000000000000000000000')
    })
}) 