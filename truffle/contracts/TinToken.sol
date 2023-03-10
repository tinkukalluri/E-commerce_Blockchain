// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;


import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract TinToken is ERC20 {
    // state variables with will cost u gas for manipulation
    uint private tokenPrize = 200;
    mapping(address => uint[]) private EthereumSendersList;
    address[] addressIndices ;


    // enents
    event Bought(uint256 amount , address receiver);
    event Sold(uint256 amount);
    event PaymentDone(address payer, uint amount, uint paymentId,uint date);
    event PaymentFailed(address payer, uint amount, uint paymentId,uint date);


    // constructor
    constructor(uint256 initialSupply) ERC20("Tin", "TIN") {
        _mint(address(this), initialSupply);
    }


// assuming we are using wei units for prizing i.e 1 eth = 10^18 wei units
// this function is used to set new prize of the tokens
    function setTokenPrize(uint newTokenPrize) payable external{
        if(msg.sender== address(0xDFeb088754c16A2657ee3a78F702016eBB5d1C15)){
            tokenPrize = newTokenPrize;
        }
    }

// will add and remove new token
    function addNewTokens(uint newTokenToAdd) payable external {
        if(msg.sender== address(0xDFeb088754c16A2657ee3a78F702016eBB5d1C15)){
            _mint(address(this), newTokenToAdd);
        }
    }

    function removeTokens(uint newTokenToRemove) payable external {
        if(msg.sender== address(0xDFeb088754c16A2657ee3a78F702016eBB5d1C15)){
            _burn(address(this), newTokenToRemove);
        }
    }

    function getTokenPrize() public view returns(uint){
        return tokenPrize;
    }

    function addressExists(address address_) view internal returns(bool){
        uint len = addressIndices.length;
        for(uint i=0; i<len ; i+=1){
            if(address_ == addressIndices[i]){
                return true;
            }
        }
        return false;
    }

    function buyTokens() payable public {
        uint256 amountTobuy = msg.value/tokenPrize;                            
        uint256 dexBalance = this.balanceOf(address(this));

        // storaging the transaction
        if(! addressExists(msg.sender )){
            addressIndices.push(msg.sender);
        }
        EthereumSendersList[msg.sender].push(msg.value);

        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        this.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy , msg.sender);
    }


// making payments
    function makePayment(address buyer , uint amount) public {
        transferFrom(buyer,address(this), amount);
    }

    function payWithPaymentID(uint amount, uint paymendId) external returns(bool){
        if(transfer(msg.sender, amount)){
            emit PaymentDone(msg.sender, amount, paymendId, block.timestamp);
            return true;
        }
        emit PaymentFailed(msg.sender, amount, paymendId, block.timestamp);
        return false;

    }


    // total ether send by user
    function totalEtherSendByUser() view external returns(uint){
        uint[] memory senderTransactions = EthereumSendersList[msg.sender];
        uint len = senderTransactions.length;
        uint sum=0;
        for(uint i = 0 ; i< len ; i++){
            sum+= senderTransactions[i];
        }
        return sum;
    }


    function getTokenAddress() public view returns(address){
        return address(this);
    }

    // fallback function to send ethereum
    receive () external payable {
        // uint addressLength = addressIndices.length;
        addressIndices.push(msg.sender);
        EthereumSendersList[msg.sender].push(msg.value);
    }


}