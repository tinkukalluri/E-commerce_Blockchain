import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useHistory } from 'react-router-dom';

export default function ProductPage({ match, ...props }) {

  const [productDetails, setProductDetails] = useState([])
  const [productDetailJSX, setproductDetailJSX] = useState([])
  const [quantity, setquantity] = useState(1)

  const { params: { productID } } = match;
  const history = useHistory()
  var fetchProductTimeout = 0
  function fetchProductDetails() {
    const requestOptions = {
      method: 'get',
      headers: { "Content-Type": "application/json" },
    }
    let path = `/api/product_detials?pID=${productID}`
    fetch(path, requestOptions).then((response) => {
      return response.json()
    }).then(data => {
      console.log('data from productpage')
      console.log(data)
      setProductDetails(data)
    }).catch(e => {
      console.log("error in product oage")
      fetchProductTimeout = setTimeout(fetchProductDetails, 1000)
    })
  }

  useEffect(() => {
    console.log('ProductPage did mount')
    return () => {
      console.log('product details page unmounting')
      clearTimeout(fetchProductTimeout)
    }
  }, [])

  useEffect(() => {
    if (productDetails.length > 0) {
      console.log("product details updated")
      console.log(productDetails)
      setproductDetailJSX_()
    }
  }, [productDetails])

  useEffect(() => {
    console.log('changed productDetailJSX')
    console.log(productDetailJSX)
  }, [productDetailJSX])

  function setproductDetailJSX_() {
    productDetails.forEach(product => {
      console.log("inside for loop")
      setproductDetailJSX(
        <>
          {/* <!--Main layout--> */}
          <main className="mt-5 pt-4">
            <div className="container mt-5">
              {/* <!--Grid row--> */}
              <div className="row">
                {/* <!--Grid column--> */}
                <div className="col-md-6 mb-4">
                  <img src={product.product.product_image} className="img-fluid" alt="" />
                </div>
                {/* <!--Grid column--> */}

                {/* <!--Grid column--> */}
                <div className="col-md-6 mb-4">
                  {/* <!--Content--> */}
                  <div className="p-4">
                    <div className="mb-3">
                      <a href="">
                        <span className="badge bg-dark me-1">{product.category}</span>
                      </a>
                      <a href="">
                        <span className="badge bg-info me-1">New</span>
                      </a>
                      <a href="">
                        <span className="badge bg-danger me-1">Bestseller</span>
                      </a>
                    </div>

                    <p className="lead">
                      <span className="me-1">
                        <del>$200</del>
                      </span>
                      <span>₹ need to update</span>
                    </p>

                    <strong><p style={{ "fontSize": "20px" }}>{product.product.name}</p></strong>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor suscipit libero eos atque quia ipsa sint voluptatibus! Beatae sit assumenda asperiores iure at maxime atque repellendus maiores quia sapiente.</p>


                    {/* [0].variation[0].variation_options */}

                    <div className="accordion" id="accordionPanelsStayOpenExample">
                      {
                        product.variation.map(variation => {
                          console.log(variation)
                          return (
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button text-dark bg-light" type="button" data-mdb-toggle="collapse"
                                  data-mdb-target="#panelsStayOpen-collapseFour" aria-expanded="false"
                                  aria-controls="panelsStayOpen-collapseFour">
                                  {variation.name}
                                </button>
                              </h2>
                              <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse show"
                                aria-labelledby="headingThree">
                                <div className="accordion-body">
                                  {
                                    variation.variation_options.map(variationOpt => {
                                      console.log('variation_option')
                                      console.log(variationOpt)
                                      return (
                                        <>
                                          <input type="checkbox" className="btn-check border justify-content-center" id={"btn" + variationOpt.value}
                                            autoComplete="off" />
                                          <label className="btn btn-white mb-1 px-1" style={{ "width": "60px" }} htmlFor={"btn" + variationOpt.value}>{variationOpt.value}</label>
                                        </>
                                      )
                                    })
                                  }
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>


                    <form className="d-flex justify-content-left">
                      {/* <!-- Default input --> */}
                      <div className="form-outline me-1 m-4" style={{ "width": "100px" }}>
                        <input onChange={(e) => { console.log(e); setquantity(e.target.value) }} type="number" className="form-control" />
                      </div>
                      <button className="btn btn-primary ms-1 m-4" type="submit">
                        Add to cart
                        <i className="fas fa-shopping-cart ms-1"></i>
                      </button>
                    </form>
                  </div>
                  {/* <!--Content--> */}
                </div>
                {/* <!--Grid column--> */}
              </div>
              {/* <!--Grid row--> */}

              <hr />

              {/* <!--Grid row--> */}
              <div className="row d-flex justify-content-center">
                {/* <!--Grid column--> */}
                <div className="col-md-6 text-center">
                  <h4 className="my-4 h4">Additional information</h4>

                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus suscipit modi sapiente illo soluta odit voluptates, quibusdam officia. Neque quibusdam quas a quis porro? Molestias illo neque eum in laborum.</p>
                </div>
                {/* <!--Grid column--> */}
              </div>
              {/* <!--Grid row--> */}

              {/* <!--Grid row--> */}
              <div className="row">
                {/* <!--Grid column--> */}
                <div className="col-lg-4 col-md-12 mb-4">
                  <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/11.jpg" className="img-fluid" alt="" />
                </div>
                {/* <!--Grid column--> */}

                {/* <!--Grid column--> */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/12.jpg" className="img-fluid" alt="" />
                </div>
                {/* <!--Grid column--> */}

                {/* <!--Grid column--> */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/13.jpg" className="img-fluid" alt="" />
                </div>
                {/* <!--Grid column--> */}
              </div>
              {/* <!--Grid row--> */}
            </div>
          </main>
          {/* <!--Main layout--> */}
        </>
      )
    })
    console.log(productDetailJSX)
  }


  useEffect(() => {
    fetchProductDetails()
  }, [])


  console.log(props)
  // console.log(location)

  return (
    <>
      {/* <div>ProductPage</div>
      <div>{productID}</div> */}
      {productDetailJSX}
    </>
  )
}
