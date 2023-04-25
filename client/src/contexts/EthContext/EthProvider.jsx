import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import {useHistory} from "react-router-dom";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [artifact, setArtifact] = useState('')
  const history = useHistory()
  console.log("history" , history)
  useEffect(()=>{
    if (window.ethereum) {
      console.log('Ethereum support is available')
      if (window.ethereum.isMetaMask) {
        console.log('MetaMask is active')
      } else {
        console.log('MetaMask is not available')
        history.push({
          pathname: '/oops',
          state: {
              oops_msg: "Please install MetaMask browser extension to continue using the application"
          }
      })
      return
      }
    } else {
      console.log('Ethereum support is not found')
      history.push({
        pathname: '/oops',
        state: {
            oops_msg: "No window.etherium object please install Metamask"
        }
    })
    return
    }
  } , [])

  const init = useCallback(
    async artifact => {
      console.log('init function called')
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider  || `https://sepolia.infura.io/v3/7ff8b75ef686485aa693b5bc3d6f7f4c` || "ws://localhost:8545" );
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        if(networkID!=11155111){
          history.push({
            pathname: '/oops',
            state: {
                oops_msg: "Please choose sepolia testnet to continue"
            }
        })
        }
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID.toString()].address;
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        console.log({ artifact, web3, accounts, networkID, contract })
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/TinToken.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    init(artifact);
  }, [artifact])

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum?.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum?.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch,
      setArtifact
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
