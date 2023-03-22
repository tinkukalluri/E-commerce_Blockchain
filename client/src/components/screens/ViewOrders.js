import React, { useState, useEffect } from 'react'


// custom components
import Loading from '../Loading'

// importing css

import css from '../ViewOrders/css/orders.css'

export default function ViewOrders(props) {

    const [orders, setOrders] = useState(-1)

    var fetchOrdersTimeInterval = 0

    // component did mount


    // response: 
    // {
    //     "orders": [
    //         {
    //             "order_status": 5,
    //             "order_total": 999,
    //             "shipping_address_id": null,
    //             "payment_status": 2,
    //             "order_date": "2023-03-22",
    //             "user_id": 6
    //         }
    //     ],
    //         "status": true
    // }

    function fetchOrders() {
        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        let path = `/api/get_user_orders`
        fetch(path, requestOptions).then(response => response.json()).then((data) => {
            console.log("orders fetched from the server")
            console.log(data)
            if (data.status == true) {
                setOrders(data.orders)
                clearTimeout(fetchOrdersTimeInterval)
            } else {
                if (data.oops != undefined) {
                    console.log('oops encountered in fetching orders')
                    console.log(data.oops)
                }
            }
        }).catch(error => {
            console.log('oops something went wrong with fetching the orders from the server')
            console.log(error)
            fetchOrdersTimeInterval = setTimeout(fetchOrders, 1000)
        })
    }

    useEffect(() => {
        fetchOrders()
        return () => {
            clearTimeout(fetchOrdersTimeInterval)
        }
    }, [])


    // < div className = "row bg-white mb-2 " >
    //     <div className="col-lg-12 p-3 order-item">
    //         <div className="d-flex justify-content-between align-items-center">
    //             <div className="">order-item</div>
    //             <div className="">order-item</div>
    //             <div className="">order-item</div>
    //             <button className="btn-outline-danger text-danger">Verify Payment</button>
    //         </div>
    //     </div>
    // </div >

    function getOrderStatusTXT(order_status) {
        switch (order_status) {
            case 1:
                return "delivered"
            case 2:
                return "out_for_delivery"
            case 3:
                return "shipped"
            case 4:
                return 'packed'
            case 5:
                return "confirmed"
            default:
                return "unconfirmed"
        }
    }

    function handlePaymentVerification(e, order_id) {
        console.log('clicked on payment verification')
        const requestOptions = {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                'order_id': order_id
            })
        }
        const path = '/blockchain/verify_payment'
        fetch(path, requestOptions).then(response => response.json()).then(
            data => {
                console.log(data)
            }
        )

    }


    return (
        <>
            {orders == -1 ? <Loading /> : (
                <div className="user-orders">
                    <div className="text-primary text-center font-monospace">Your orders</div>
                    <div className="container">
                        {
                            orders.map(order => {
                                return (
                                    <div className="row bg-white mb-2 ">
                                        <div className="col-lg-12 p-3 order-item">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="">status: {getOrderStatusTXT(order.order_status)}</div>
                                                <div className="">₹{order.order_total}</div>
                                                <div className="">{order.shipping_address_id}</div>
                                                {/* <div className="">{order.payment_status}</div> */}
                                                <div className="">{order.order_date}</div>
                                                {order.payment_status == 1 ? <div className="text-success" >Payment Verified</div> : (order.payment_status == 2 ? <button onClick={(e) => { handlePaymentVerification(e, order.id) }} className="btn-outline-warning text-warning">Verify Payment</button> : <div className="text-danger" >Payment Failed</div>)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </>
    )
}
