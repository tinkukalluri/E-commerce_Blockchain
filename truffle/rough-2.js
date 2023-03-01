const Web3 = require('web3')
const tinContractjson = require('../client/src/contracts/TinToken.json')

const web3 = new Web3('HTTP://127.0.0.1:7545');

const Tincontract = new web3.eth.Contract(
    tinContractjson.abi,
    tinContractjson.networks[5777].address
)

Tincontract.methods.setTokenPrize(3000).send({
    from: '0x6533c493606BD41DC4C8B6Cd6F1C5C2e34200345',
    value: '200'
}).then(receipt => {
    console.log(receipt)
    Tincontract.methods.getTokenPrize().call().then(value => {
        console.log(value)
    })
})




