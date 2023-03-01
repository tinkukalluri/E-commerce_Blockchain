// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;


import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract TinToken is ERC20 {
    uint private tokenPrize = 200;

    constructor(uint256 initialSupply) ERC20("Tin", "TIN") {
        _mint(address(this), initialSupply);
    }


    event Bought(uint256 amount , address receiver);
    event Sold(uint256 amount);

// assuming we are using wei units for prizing i.e 1 eth = 10^18 wei units
    function setTokenPrize(uint newTokenPrize) payable external{
        if(msg.sender== address(0x6533c493606BD41DC4C8B6Cd6F1C5C2e34200345)){
            tokenPrize = newTokenPrize;
        }
    }

    function addNewTokens(uint newTokenToAdd) payable external {
        if(msg.sender== address(0x6533c493606BD41DC4C8B6Cd6F1C5C2e34200345)){
            _mint(address(this), newTokenToAdd);
        }
    }

    function getTokenPrize() public view returns(uint){
        return tokenPrize;
    }


    function buy() payable public {
        uint256 amountTobuy = msg.value/tokenPrize;                            
        uint256 dexBalance = this.balanceOf(address(this));
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        this.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy , msg.sender);
    }



}