import React, { useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom';

export default function ProductPage({ match, ...props }) {

  const [productDetails , setProductDetails] = useState([])
  const [variationJSX , setVariationJSX] = useState([])

  const { params: { productID } } = match;
  const history = useHistory()

  function fetchProductDetails(){
    const requestOptions = {
      method: 'get',
      headers: { "Content-Type": "application/json" },
  }
  let path = `/api/product_detials?pID=${productID}`
  fetch(path , requestOptions).then((response)=>{
    return response.json()
  }).then(data =>{
    console.log('data from productpage')
    console.log(data)
    setProductDetails(data)
  }).catch(e=>{
    console.log("error in product oage")
    setTimeout(fetchProductDetails , 1000)
  })
  }

  useEffect(()=>{
    console.log("product details updated")
    setvariationJSX_()
  } , [productDetails])

  function setvariationJSX_(){
    productDetails.forEach(product=>{
      
  setVariationJSX(prev =>{
    return prev.push(
      <div className="accordion-item">
      <h2 className="accordion-header" id="headingThree">
        <button className="accordion-button text-dark bg-light" type="button" data-mdb-toggle="collapse"
          data-mdb-target="#panelsStayOpen-collapseFour" aria-expanded="false"
          aria-controls="panelsStayOpen-collapseFour">
          {product.name}
        </button>
      </h2>
      <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse show"
        aria-labelledby="headingThree">
        <div className="accordion-body">
          {
            product.variation_options.forEach(variationOpt =>{
                <>
                <input type="checkbox" className="btn-check border justify-content-center" id="btn-check1"
            autoComplete="off" checked={true} />
          <label className="btn btn-white mb-1 px-1" style={{ "width": "60px" }} htmlFor="btn-check1">{variationOpt.value}</label>
                </>
            })
          }
        </div>
      </div>
    </div>
    )
  })
})
console.log(variationJSX)
  }


  useEffect(()=>{
    fetchProductDetails()
  } , [])

    
  console.log(props)
  // console.log(location)

  function body() {
    return (
      <>
        {/* <!--Main layout--> */}
        <main className="mt-5 pt-4">
          <div className="container mt-5">
            {/* <!--Grid row--> */}
            <div className="row">
              {/* <!--Grid column--> */}
              <div className="col-md-6 mb-4">
                <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg" className="img-fluid" alt="" />
              </div>
              {/* <!--Grid column--> */}

              {/* <!--Grid column--> */}
              <div className="col-md-6 mb-4">
                {/* <!--Content--> */}
                <div className="p-4">
                  <div className="mb-3">
                    <a href="">
                      <span className="badge bg-dark me-1">Category 2</span>
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
                    <span>$100</span>
                  </p>

                  <strong><p style={{ "fontSize": "20px" }}>Description</p></strong>

                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolor suscipit libero eos atque quia ipsa sint voluptatibus! Beatae sit assumenda asperiores iure at maxime atque repellendus maiores quia sapiente.</p>
                  

                  <div className="accordion" id="accordionPanelsStayOpenExample">

                    {variationJSX}

                  </div>


                  <form className="d-flex justify-content-left">
                    {/* <!-- Default input --> */}
                    <div className="form-outline me-1" style={{ "width": "100px" }}>
                      <input type="number" value="1" className="form-control" />
                    </div>
                    <button className="btn btn-primary ms-1" type="submit">
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
  }


  return (
    <>
      <div>ProductPage</div>
      <div>{productID}</div>
      {body()}
    </>
  )
}
