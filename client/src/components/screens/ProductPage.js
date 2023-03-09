import React from 'react'

export default function ProductPage({match , ...props}) {
    const { params: { productID } } = match;
    console.log(props)
    // console.log(location)
  return (
    <>
    <div>ProductPage</div>
    <div>{productID}</div>  
    </>
  )
}
