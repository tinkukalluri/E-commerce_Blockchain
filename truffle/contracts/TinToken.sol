// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;


import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract TinToken is ERC20 {
    // state variables with will cost u gas for manipulation
    // uint private tokenPrize = 1000000000000000000;
    uint private tokenPrize = 100000;
    mapping(address => uint[]) private EthereumSendersList;
    address[] addressIndices ;
    
    // struct 
    struct order_struct{
        uint orderID ;
        address from ;
        address to ;
        string IPFS_Hash ;
        string Storage_link ;
        string transaction_hash;
        uint amount;
    }

    order_struct[] public orders;
    uint[] public ordersIndices;  // will have orderID

    // enents
    event Bought(uint256 amount , address receiver);
    event Sold(uint256 amount);
    event PaymentDone(address payer, uint amount, uint paymentId , uint orderId,uint date);
    event PaymentFailed(address payer, uint amount, uint paymentId, uint orderId ,uint date);
    event PaymentDoneToSeller(uint orderID , address from , address to_ , string IPFS_Hash ,string Storage_link , string transaction_hash , uint amount);
    event PaymentFailedToSeller(uint orderID , address from , address to_ , string IPFS_Hash ,string Storage_link , string transaction_hash , uint amount);



    // constructor
    constructor(uint256 initialSupply) ERC20("Tin", "TIN") {
        _mint(address(this), initialSupply);
    }


// assuming we are using wei units for prizing i.e 1 eth = 10^18 wei units
// this function is used to set new prize of the tokens in wei units
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

    function payWithPaymentID(uint amount, uint paymendId , uint orderId , string memory IPFS_Hash_ ,string memory Storage_link_ , string memory transaction_hash_) external returns(bool){
        order_struct memory order;
        // order.orderID = orderID_;
        order.orderID = orderId;
        order.from = msg.sender;
        order.to = address(this);
        order.IPFS_Hash=IPFS_Hash_;
        order.Storage_link =Storage_link_;
        order.transaction_hash =transaction_hash_;
        order.amount =amount;
        
        if(transfer(address(this), amount)){
            emit PaymentDone(msg.sender, amount, paymendId, orderId ,  block.timestamp);
            orders.push(order);
            ordersIndices.push(orderId);
            return true;
        }
        emit PaymentFailed(msg.sender, amount, paymendId, orderId , block.timestamp);
        require(false , "Something went wrong with the payment")
        return false;
    }

    function payToSeller(uint orderID_ , address from_ , address to_ , string memory IPFS_Hash_ ,string memory Storage_link_ , string memory transaction_hash_ , uint amount_) public returns(order_struct memory) {
        // uint index = ordersIndices.length;
        order_struct memory order;
        // order.orderID = orderID_;
        order.orderID = orderID_;
        order.from = from_;
        order.to = to_;
        order.IPFS_Hash=IPFS_Hash_;
        order.Storage_link =Storage_link_;
        order.transaction_hash =transaction_hash_;
        order.amount =amount_;
        
        if(transfer(to_, amount_)){
            orders.push(order);
            ordersIndices.push(orderID_);
            emit PaymentDoneToSeller(orderID_ , from_ , to_ ,IPFS_Hash_ ,Storage_link_ , transaction_hash_ , amount_);
            return order;
        }
        emit PaymentFailedToSeller(orderID_ , from_ , to_ ,IPFS_Hash_ ,Storage_link_ , transaction_hash_ , amount_);
        return order;
    }

    function getorders() public view returns(order_struct[] memory){
        return orders;
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