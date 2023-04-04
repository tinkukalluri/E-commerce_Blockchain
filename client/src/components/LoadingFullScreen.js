import React, { useEffect } from 'react'

import bitcoin_load from '../svg/bitcoinLoad.svg'

var ProgressBar = require('progressbar.js')

export default function LoadingFullScreen() {

  useEffect(()=>{

    var bar = new ProgressBar.Circle('#loading_animation', {
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      duration: 5000,
      easing: 'bounce',
      strokeWidth: 6,
      from: {color: '#4169E1', a:0},
      to: {color: '#191970', a:1},
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
      }
    });
    
    bar.animate(1.0);  // Number from 0.0 to 1.0




  } , [])

  const ani_style={
    "width":"150px" , 
  }

  

  return (
    // <img  src={bitcoin_load} alt="Your SVG" />
    <>
    <div style={ani_style} id="loading_animation" className='d-flex justify-content-center align-items-center'></div>
    </>
  )
}

