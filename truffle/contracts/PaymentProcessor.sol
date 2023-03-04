pragma solidity >=0.4.22 <0.9.0;


import './TinToken.sol';

contract PaymentProcessor {

event PaymentDone(address payer, uint amount, uint paymentId,uint date);
TinToken public Tin ;
address public TinTokenAddress;

constructor (address TinTokenAddress_ ) public {
    TinTokenAddress = TinTokenAddress_;
    Tin = TinToken(TinTokenAddress_);

}

function pay (uint amount, uint paymendId) external {
    // Tin.makePayment(msg.sender, amount);
    bool approval = Tin.approve(TinTokenAddress, amount);
    require(approval , "something went wrong with approval of allowance");
    Tin.transferFrom(msg.sender,TinTokenAddress , amount);
    // Tin._approve(msg.sender , amount);
    emit PaymentDone (msg.sender, amount, paymendId, block.timestamp);
}
// tinku
}