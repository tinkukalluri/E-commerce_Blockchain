
const PaymentProcessor = artifacts.require('PaymentProcessor')

PaymentProcessorJson = require('../../client/src/contracts/PaymentProcessor.json')


contract('PaymentProcessor', () => {
    it('contract address credited with correct amount', async () => {
        const PaymentProcessorInstance = await PaymentProcessor.deployed();
        var value = (await PaymentProcessorInstance.balanceOf(PaymentProcessor.networks[5777].address));
        console.log(value);
        console.log(typeof value)
        assert.equal(value.toString(), '300000000000000000000000')
    })
}) 