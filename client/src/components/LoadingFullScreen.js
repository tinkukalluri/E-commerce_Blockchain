import React, { useEffect } from 'react'

import bitcoin_load from '../svg/bitcoinLoad.svg'

var ProgressBar = require('progressbar.js')

export default function LoadingFullScreen() {

  var animationIntervalID = 0
  var circleRadius = 0.25

  useEffect(()=>{

    var bar = new ProgressBar.Circle('#loading_animation', {
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      duration: 1500,
      easing: 'bounce',
      strokeWidth: 6,
      from: {color: '#4169E1', a:0},
      to: {color: '#191970', a:1},
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
      }
    });
    
    bar.animate(circleRadius);  // Number from 0.0 to 1.0

    animationIntervalID = setInterval(()=>{
      console.log('animation')
      circleRadius = (circleRadius + 0.25)%2
      bar.animate(circleRadius)
    } , 1500)

    return ()=>{
      clearInterval(animationIntervalID)
    }
  } , [])

  const ani_style={
    "width":"150px" , 
  }

  

  return (
    // <img  src={bitcoin_load} alt="Your SVG" />
    <>
    <div className='d-flex flex-column justify-content-center align-items-center' style={{"height": "70vh"}}>
      <div style={ani_style} id="loading_animation" className='d-flex justify-content-center align-items-center'></div>
      <h4 style={{"font-family": "'Brush Script MT', cursive"}}>Loading...</h4>
    </div>
    </>
  )
}

