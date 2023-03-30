import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { setStorage, getStorage, pushStorage } from '../utils';

export default function ProductPage({ match, ...props }) {

  const [productDetails, setProductDetails] = useState([])
  const [quantity, setquantity] = useState(1)
  const [productVariation, setProductVariation] = useState({ quantity: 1 })
  const [productPrice, setProductPrice] = useState("select a variation")
  const [selectedProductItem, setSelectedProductItem] = useState(null)

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

  function handleAddToCart(e) {
    console.log(productVariation)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...productVariation, "selected_product": selectedProductItem })
    }
    let path = `/api/add_to_cart`
    fetch(path, requestOptions).then(response => response.json()).then(data => {
      console.log(data)
      if (data.status) {
        console.log('added to cart')
      } else {
        console.log('something went wrong with the item adding to cart')
      }
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
    console.log('-------------------------------------------------product variation-----------------------------------------------------')
    console.log(productVariation)
  }, [productVariation])

  // handleSelection(e , product.product.id , product.productItem , variation , variationOpt)

  function handleSelection(e, product_id, productItem, variation_id, variationOpt_id) {
    console.log('======================')
    console.log(e.target)
    console.log(e.target.name)
    console.log(e.target.value)
    console.log(product_id, productItem, variation_id, variationOpt_id)

    setProductVariation(
      prevState => {
        prevState[e.target.name] = {
          val: e.target.value,
          variation_id,
          variationOpt_id
        }
        prevState['product_id'] = product_id
        if (e.target.name == 'quantity') {
          prevState['quantity'] = e.target.value
        }
        console.log(prevState)
        return {
          ...prevState,
        }
      }
    )
  }

  // Returns true if arr1[0..n-1] and arr2[0..m-1]
  // contain same elements.
  function areEqualArrays(arr1, arr2) {
    let N = arr1.length;
    let M = arr2.length;

    // If lengths of array are not equal means
    // array are not equal
    if (N != M)
      return false;

    // Sort both arrays
    arr1.sort();
    arr2.sort();

    // Linearly compare elements
    for (let i = 0; i < N; i++)
      if (arr1[i] != arr2[i])
        return false;

    // If all elements were same.
    return true;
  }


  let productVariation_json = {
    "quantity": 1,
    "size": {
      "val": "xs",
      "variation_id": 1,
      "variationOpt_id": 1
    },
    "product_id": 24
  }


  useEffect(() => {
    let var_opts = []
    for (let key of Object.keys(productVariation)) {
      if (key != 'quantity' && key != 'product_id') {
        if (productVariation[key]) {
          var_opts.push(productVariation[key]['variationOpt_id'])
        }
      }
    }

    if (productDetails.length && productDetails[0]['variation']?.length == var_opts?.length) {
      console.log('=====================================================================================')
      console.log(var_opts)
      console.log(productDetails[0]['variation'])
      for (let productItem_ of productDetails[0]['productItem']) {
        if (areEqualArrays(productItem_.variation_options, var_opts)) {
          setSelectedProductItem(productItem_)
        }
      }
    }

  }, [productVariation])

  let selectedProductItem_json = {
    "id": 28,
    "product_id": 24,
    "SKU": "tinku-item-1",
    "qty_in_stock": 2,
    "product_image": "https://scontent.fhyd11-2.fna.fbcdn.net/v/t1.18169-9/21105788_760434490831886_4333824704480604768_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=eGWD0a6GGJAAX_0KeNM&_nc_ht=scontent.fhyd11-2.fna&oh=00_AfBBc3h_wRgDrrBq1DQCw3GC6ApMF_yW36xorqp_6QrsIg&oe=644C1321",
    "prize": 23,
    "IPFS_hash": null,
    "img_url": null,
    "added_on": "2023-03-30T01:21:42.719382Z",
    "variation_options": [
      1
    ]
  }
  useEffect(() => {
    console.log('selected item')
    console.log(selectedProductItem)
    setProductPrice(selectedProductItem?.prize ? selectedProductItem.prize : "select a variation")
  }, [selectedProductItem])



  function setproductDetailJSX_() {
    return (
      <>
        {
          productDetails.map(product => {
            return (
              <>
                {/* <!--Main layout--> */}
                < main className="mt-5 pt-4" >
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
                              <del>₹200</del>
                            </span>
                            <span>₹{productPrice}</span>
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
                                                <input type="radio" name={variation.name} data="tinku" value={variationOpt.value} onClick={(e) => {
                                                  handleSelection(e, product.product.id, product.productItem, variation.id, variationOpt.id)
                                                }} className="btn-check border justify-content-center" id={"btn" + variationOpt.value}
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
                              <input style={{
                                color: "black",
                                backgroundColor: 'grey'
                              }} name="quantity" value={productVariation.quantity} onChange={(e) => { handleSelection(e, product.product.id) }} type="number" className="form-control" />
                            </div>
                            <a onClick={handleAddToCart} className="btn btn-primary ms-1 m-4">
                              Add to cart
                              <i className="fas fa-shopping-cart ms-1"></i>
                            </a>
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
                </main >
                {/* <!--Main layout--> */}
              </>
            )
          })
        }
      </>
    )
  }


  useEffect(() => {
    fetchProductDetails()
  }, [])


  return (
    <>
      {/* <div>ProductPage</div>
      <div>{productID}</div> */}
      {setproductDetailJSX_()}
    </>
  )
}
