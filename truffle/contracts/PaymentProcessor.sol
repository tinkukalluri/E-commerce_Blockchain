pragma solidity >=0.4.22 <0.9.0;


import './TinToken.sol';

contract PaymentProcessor {

event PaymentDone(address payer, uint amount, uint paymentId,uint date);
TinToken public Tin ;

constructor (address TinTokenAddress) public {
    Tin = TinToken(TinTokenAddress);
}

function pay (uint amount, uint paymendId) external {
    Tin.makePayment(msg.sender, amount);
    // Tin._approve(msg.sender , amount);
    emit PaymentDone (msg.sender, amount, paymendId, block.timestamp);
}
// tinku
}