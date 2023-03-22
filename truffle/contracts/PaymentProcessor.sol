pragma solidity >=0.4.22 <0.9.0;


import './TinToken.sol';

contract PaymentProcessor {

event PaymentDone(address payer, uint amount, uint paymentId,uint date);
TinToken public Tin ;
address payable  public TinTokenAddress;

constructor(address payable TinTokenAddress_ ) public {
    TinTokenAddress = TinTokenAddress_;
    Tin = TinToken(TinTokenAddress_);
}

function pay (uint amount, uint paymendId) external {
    // Tin.makePayment(msg.sender, amount);
    
}
}