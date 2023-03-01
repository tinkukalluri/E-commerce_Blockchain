const ethers = require('ethers');
let mnemonic = "casino answer fetch rebuild name speed runway click initial stable shadow school";
let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
console.log(mnemonicWallet.privateKey);