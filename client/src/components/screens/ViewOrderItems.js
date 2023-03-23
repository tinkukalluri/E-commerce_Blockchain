import React, { useEffect, useState } from 'react'
import Loading from '../Loading';
import '../viewOrderItems/orderitems.css'
import {getPaymentStatusTXT , getOrderStatusTXT } from './ViewOrders.js'
import { useHistory } from 'react-router-dom';

export default function ViewOrderItems(props) {

    const {order_id} = (props.location && props.location.state) || -1;
    const [userOrderItems , setUserOrderItems] = useState(-1)
    const [userOrderDetails , setUserOrderDetails]= useState(-1)
    const history = useHistory()
    var userOrderTimeout = 0

    console.log(order_id)
    console.log(props.location)
    console.log(props)

    function fetchOrderItems(){
        const requestOptions = {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
        let path = `/api/user_order_items?order_id=${order_id}`
        fetch(path , requestOptions).then(res=> res.json()).then(data=>{
            console.log("fetched data from the server")
            // {
            //     "status": true,
            //     "order_items": [
            //         {
            //             "order_item": {
            //                 "id": 30,
            //                 "product_item_id": 13,
            //                 "order_id": 36,
            //                 "qty": 1
            //             },
            //             "productItem": {
            //                 "id": 13,
            //                 "product_id": 7,
            //                 "SKU": "s-pants",
            //                 "qty_in_stock": 19,
            //                 "product_image": "http://cdn.shopify.com/s/files/1/0053/5350/4881/products/Steel-grey-everyday-pant2.jpg?v=1673092119",
            //                 "prize": 333,
            //                 "IPFS_hash": null,
            //                 "img_url": "http://cdn.shopify.com/s/files/1/0053/5350/4881/products/Steel-grey-everyday-pant2.jpg?v=1673092119",
            //                 "added_on": "2023-03-10T19:36:04Z"
            //             },
            //             "product": {
            //                 "id": 7,
            //                 "category_id": 2,
            //                 "name": "cool pants",
            //                 "description": "cools shirts",
            //                 "product_image": "https://m.media-amazon.com/images/I/71DBklVte9L._UX569_.jpg",
            //                 "added_on": "2023-03-10T19:35:20Z"
            //             }
            //         }
            //     ],
            //     "order": {
            //         "id": 36,
            //         "transaction_hash": null,
            //         "order_status": 5,
            //         "order_total": 333,
            //         "shipping_address_id": null,
            //         "payment_status": 2,
            //         "order_date": "2023-03-23T10:36:15.992599Z",
            //         "user_id": 1
            //     },
            //     "order_id": "36"
            // }
            if(data.status){
                setUserOrderItems(data.order_items)
                setUserOrderDetails(data.order)
                clearInterval(userOrderTimeout)
            }else{
                console.log(data.oops)
                userOrderTimeout = setTimeout(fetchOrderItems , 1000)
            }
        }).catch(()=>{
            userOrderTimeout = setTimeout(fetchOrderItems , 1000)
        })
    }

    useEffect(()=>{
    console.log(userOrderItems)
    } , [userOrderItems])

    useEffect(()=>{
        fetchOrderItems()
    } , [order_id])

    useEffect(()=>{
        return ()=>{
            clearInterval(userOrderTimeout)
        }
    } , [])

    function handleProductClick(e , product_id){
        history.push(`/product/${product_id}`)
    }


    return (
        <>
        <div>ViewOrderItems</div>
        {order_id}
        <div className="user-orders">
        <div className="text-primary text-center font-monospace">Your order</div>

                {
                    userOrderDetails==-1 ? <Loading/>  : (
                    <div className="col-lg-12 order-details p-3">
                        <div className="text-danger"><i>order-details </i> </div>
                        <h4 className="text-success">orderid: {userOrderDetails.id}</h4>
                        <h5 className="text-success"> <i>order status</i> : {getOrderStatusTXT(userOrderDetails.order_status)}</h5>
                        <h5 className="text-success"><i>payment status</i>: {getPaymentStatusTXT(userOrderDetails.payment_status)}</h5> 
                        <h5 className="text-success"><i>transaction hash</i>: {userOrderDetails.transaction_hash}</h5> 
                        <h5 className="text-success"><i>order date</i>: {userOrderDetails.order_date}</h5> 
                    </div>
                    )
                }

                {
                    userOrderItems==-1 ? <Loading/> : (
                                <>
                                <div className="card border shadow-0">
                                    <div className="m-4">
                                        <h4 className="card-title mb-4">Your order items</h4>
                                        {
                                            userOrderItems.map((order_item)=>{
                                            let productItem = order_item.productItem
                                            let order_item_details = order_item.order_item
                                            let product = order_item.product
                                            return (
                                                <div className="row gy-3 mb-4 onclick-hover" onClick={(e)=>{
                                                    handleProductClick(e ,product.id )
                                                }}>
                                                <div className="col-lg-5">
                                                    <div className="me-lg-5">
                                                        <div className="d-flex">
                                                            <img src={productItem.product_image} className="border rounded me-3" style={{"width": "96px",  "height": "96px"}}/>
                                                            <div className="">
                                                                <a href="#" className="nav-link"  onClick={(e)=>{
                                                                    handleProductClick(e ,product.id )
                                                                }}>{product.description}</a>
                                                                <p className="p-muted">{product.name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                                                    <i>qty: {order_item_details.qty}</i>
                                                    
                                                </div>
                                                <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                    <div className="float-md-end">
                                                        <div className="">
                                                            <p className="h6">₹{order_item_details.qty * productItem.prize  }</p>
                                                            <br/>
                                                            <small className="p-muted p-nowrap">₹{productItem.prize}/per item </small>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                    </div>
                                </div>
                                </>
                                )
                }
                
                
        </div>
        </>
    )
}
