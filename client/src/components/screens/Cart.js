import React, { useEffect  , useState} from 'react'
import Footer from '../footer'
import Navigator from "../Navigator";
import Loading from '../Loading';

export default function () {
    const [cart , setCart] = useState([])
    const [cartID , setCartID] = useState(0)
    const [cartItems , setCartItems] = useState([])
    const [cartTotal , setCartTotal] = useState(-1)
    const [cartTax , setCartTax] = useState(0)
    const [cartDiscount , setCartDiscount]= useState(0)
    const [ready_to_make_order , setMakeOrder] = useState(false)

    let fetchCartItemsTimeout=0
    let cart_total= 0

    function makePayment(){
        console.log('make payment')
        if(ready_to_make_order){
            const requestOptions = {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ready_to_make_order)
            }
            let path = `/api/create_order`
            fetch(path , requestOptions).then(response => response.json()).then(data => {
                console.log('response data from make order ')
                console.log(data)
            })
        }
    }

    function handleRemoveItem(cart_item_id){
        const requestOptions = {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                'cart_item_id' : cart_item_id
            })
          }
          let path = `/api/remove_from_cart`
          fetch(path , requestOptions).then(response => response.json()).then((data)=>{
            console.log('remove item from cart respose')
            console.log(data)
            if(data.status){
                fetchCartItems()
            }
          })
    }

    function fetchCartItems() {
        const requestOptions = {
          method: 'get',
          headers: { "Content-Type": "application/json" },
        }
        let path = `/api/cart_products`
        fetch(path, requestOptions).then((response) => {
          return response.json()
        }).then(data => {
          console.log('data from cartItems')
          console.log(data)
          setCart(data)
          setCartID(data.cart_id)
          setCartItems(data.shopping_cart_items)
          clearTimeout(fetchCartItemsTimeout)
          setCartTotal(0)
        }).catch(e => {
          console.log("error in cartItems")
          fetchCartItemsTimeout = setTimeout(fetchCartItems, 1000)
        })
      }

      useEffect(()=>{
        let total_value = 0
        cartItems.map(item =>{
            total_value+=item.productItem.prize
        })
        setCartTotal(total_value)
      } , [cartItems])

      useEffect(()=>[
        setMakeOrder(
            {...cart , cart_total: cartTotal}
        )
      ] , [cartTotal])

      useEffect(()=>{
        fetchCartItems()
        return ()=>{
            clearTimeout(fetchCartItemsTimeout)
        }
      } , [])


    return (
        <>
            <Navigator navbar cart page='cart' />
            {/* <!-- cart + summary --> */}
            <div className="bg-light my-5">
                <div className="container">
                    <div className="row">
                        {/* <!-- cart --> */}
                        <div className="col-lg-9">
                            <div className="card border shadow-0">
                                <div className="m-4">
                                    <h4 className="card-title mb-4">Your shopping cart</h4>
                                    {/* cart item -1 */}
                                    
                                    {   
                                        
                                        cartItems.length==0 ? <Loading/>: (
                                        cartItems.map(item =>{
                                            cart_total+=item.productItem.prize
                                            return (
                                                <div className="row gy-3 mb-4">
                                                    <div className="col-lg-5">
                                                        <div className="me-lg-5">
                                                            <div className="d-flex">
                                                                <img src={item.productItem.product_image}
                                                                    className="border rounded me-3" style={{ "width": "96px", "height": "96px" }} />
                                                                <div className="">
                                                                    <a href="#" className="nav-link">{item.product.name}</a>
                                                                    <p className="p-muted">{item.product.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                                                        <div className="">
                                                            <select style={{ 'width': "100px" }} className="form-select me-4">
                                                                {
                                                                [1 , 2 ,3   ,4 , 5].map(qty=>
                                                                        {
                                                                            if(qty==Number(item.qty)){
                                                                                return <option selected={true}>{qty}</option>
                                                                            }else{
                                                                                return <option>{qty}</option>
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="">
                                                            <p className="h6">₹{Number(item.qty)*Number(item.productItem.prize)}</p> <br />
                                                            <small className="p-muted p-nowrap"> ₹{item.productItem.prize} / per item </small>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                        <div className="float-md-end">
                                                            <a href="#!" className="btn btn-light border px-2 icon-hover-primary"><i
                                                                className="fas fa-heart fa-lg px-1 p-secondary"></i></a>
                                                            <a className="btn btn-light border p-danger icon-hover-danger" onClick={()=>{handleRemoveItem(item.id)}}> Remove</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        )
                                    }

                                    {/* cart-item-2 */}
                                    {/* <div className="row gy-3 mb-4">
                                        <div className="col-lg-5">
                                            <div className="me-lg-5">
                                                <div className="d-flex">
                                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/12.webp"
                                                        className="border rounded me-3" style={{ "width": "96px", "height": "96px" }} />
                                                    <div className="">
                                                        <a href="#" className="nav-link">Mens T-shirt Cotton Base</a>
                                                        <p className="p-muted">Blue, Medium</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                                            <div className="">
                                                <select style={{ 'width': "100px" }} className="form-select me-4">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                            </div>
                                            <div className="">
                                                <p className="h6">₹444.80</p> <br />
                                                <small className="p-muted p-nowrap"> ₹12.20 / per item </small>
                                            </div>
                                        </div>
                                        <div
                                            className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                            <div className="float-md-end">
                                                <a href="#!" className="btn btn-light border px-2 icon-hover-primary"><i
                                                    className="fas fa-heart fa-lg px-1 p-secondary"></i></a>
                                                <a href="#" className="btn btn-light border p-danger icon-hover-danger"> Remove</a>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>

                                {/* <div className="border-top pt-4 mx-4 mb-4">
                                    <p><i className="fas fa-truck p-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>
                                    <p className="p-muted">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip
                                    </p>
                                </div> */}
                            </div>
                        </div>
                        {/* <!-- cart -->
                        <!-- summary --> */}
                        <div className="col-lg-3" >
                            <div className="card mb-3 border shadow-0">
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label className="form-label">Have coupon?</label>
                                            <div className="input-group">
                                                <input type="p" className="form-control border" name="" placeholder="Coupon code" />
                                                <button className="btn btn-light border">Apply</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card shadow-0 border">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Total price:</p>
                                        <p className="mb-2">{cartTotal}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Discount:</p>
                                        <p className="mb-2 p-success">-₹{cartDiscount}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">TAX:</p>
                                        <p className="mb-2">₹{cartTax}</p>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Total price:</p>
                                        <p className="mb-2 fw-bold">{cartTotal==-1 ? <Loading/> : cartTotal}</p>
                                    </div>

                                    <div className="mt-3">
                                        <a onClick={makePayment} className="btn btn-success w-100 shadow-0 mb-2"> Make Purchase </a>
                                        <a href="#" className="btn btn-light w-100 border mt-2"> Back to shop </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- summary --> */}
                    </div>
                </div>
            </div>
            {/* <!-- cart + summary --> */}
        </>
    )
}
