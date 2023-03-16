import React, { useEffect } from 'react'
import { useEth } from '../../contexts/EthContext'

export default function TinWallet() {
    const { state , setArtifact , dispatch } = useEth();

    useEffect(()=>{
        setArtifact(require('../../contracts/TinToken.json'))
        console.log(state)
    } , [])

    useEffect(()=>{
        
    } , [state])

  return (
    <>
    <div className="bg-light my-5">
        <div className="container">
            <div className="row">
                <div className="col-lg-9">

                </div>
            </div>
        </div>
    </div>
    </>
  )
}
