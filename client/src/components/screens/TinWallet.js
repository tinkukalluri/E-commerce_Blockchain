import React, { useEffect, useState } from 'react'
import { useEth } from '../../contexts/EthContext'


// importing css
import css from '../TinWallet/tinwallet.css'

export default function TinWallet() {
    const { state:{contract , artifact , accounts , web3} ,  state , setArtifact , dispatch } = useEth();
    const [balance , setBalance] = useState(0)
    const [value , setValue] = useState('')
    const [tokenPrize , setTokenPrize ] = useState('')
    const [approxTokens , setApproxTokens] = useState(0)

    useEffect(()=>{
        // setArtifact(require('../../contracts/TinToken.json'))
        console.log(state)
    } , [])

    function init(){
        if(artifact?.contractName=='TinToken'){
            console.log('state of artifact changed')
            console.log(state)
            
            contract.methods.balanceOf(accounts[0]).call().then(data=>{
                console.log(data)
                setBalance(parseInt(data))
            })

            contract.methods.getTokenPrize().call().then(data =>{
                console.log('token prize fetched successfully :' , data)
                setTokenPrize(parseInt(data))
            })
        }
    }

    useEffect(()=>{
        init()
    } , [state])

    useEffect(()=>{
        const {web3} = state
        if(artifact?.contractName=='TinToken'){
            if(value=='' || value==null ){
                setApproxTokens(0)
            }else{
                let value_to_wei = web3.utils.toWei(value.toString())
                console.log("value_to_wei" , value_to_wei , typeof value_to_wei)
                setApproxTokens(value_to_wei /tokenPrize )
            }
        }
    } , [value])


    function handleAddCoins(e){
        console.log('add money clicked')
        contract.methods.buyTokens().send({
            'value': web3.utils.toWei(value.toString()), 
            'from': accounts[0]
        }).then(receipt =>{
            console.log('add money receipt')
            console.log(receipt.status)
            if(receipt.status){
                init()
                setValue('')
            }
        })
    }



  return (
    <>
    <div className="bg-light my-5 ">
        <div className="d-flex flex-column justify-content-center align-items-center">
        <div>
            <div className ='wallet_balance py-2 d-flex justify-content-between'>
                <i style={{"textAlign": "left", "color" : "grey" , "fontSize":"1.5rem"}}>balance</i>
                <b className="wallet_balance_coins">{balance}</b>
            </div>
            <input onChange={(e)=>{
                setValue(e.target.value)
            }}  value={value} className="wallet_coins_entry mt-3" placeholder="Add amount" type="number"/>
            <button onClick={handleAddCoins} className = 'wallet_add_coins mt-3' >Add coins</button>
            <div style={{color : "grey"}}>
                approx no. of tokens: {approxTokens} TinTokens
            </div>
        </div>
        </div>
    </div>
    </>
  )
}
