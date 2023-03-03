pragma solidity >=0.4.22 <0.9.0;

import './TinToken.sol';

contract PaymentProcessor{
    address public admin;
    TinToken public tinToken;

    constructor (address admin_) public {
        admin = admin_;
        tinToken = new TinToken();
    }
    
    function makePayment(uint amount, uint paymentID) external{

    }
}