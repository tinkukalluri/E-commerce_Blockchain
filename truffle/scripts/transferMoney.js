const Web3 = require('web3')





var receiver = '0xb5564b9B1E493eF95d7d944c457a52f5f85F5E0E'

var sender = '0xc4c16cc3a23d2abfe9260a114043ac2a314f68fc'

async function init(){
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
    const web3  = new Web3(provider)
    var accounts = await web3.eth.getAccounts()
    return await web3.eth.sendTransaction({from: accounts[0] , to:receiver,value:'22222222222222'})
}

init().then((receipt)=>{
    console.log(receipt)
})