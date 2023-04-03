import React, { useEffect, useState } from 'react'
import Footer from '../footer'
import Navigator from "../Navigator";
import Loading from '../Loading';
import { handlePaymentVerification } from './ViewOrders.js'

// getting etherium provider
import { useEth } from '../../contexts/EthContext'

export default function () {
    const { state: { contract, artifact, accounts, web3 }, state, setArtifact, dispatch } = useEth();
    const [cart, setCart] = useState([])
    const [cartID, setCartID] = useState(0)
    const [cartItems, setCartItems] = useState(-1)
    const [cartTotal, setCartTotal] = useState(-1)
    const [cartTax, setCartTax] = useState(0)
    const [cartDiscount, setCartDiscount] = useState(0)
    const [ready_to_make_order, setMakeOrder] = useState(false)

    let fetchCartItemsTimeout = 0
    var fetchCartItemsTimeoutCounter = 5
    let cart_total = 0

    // function makeid(length) {
    //     var result = '';
    //     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     var charactersLength = characters.length;
    //     for (var i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // }

    function makeid(seed) {
        return Math.round(Math.random() * seed) + seed;
    }

    function makePayment() {
        console.log('make payment')
        if (ready_to_make_order) {
            const requestOptions = {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ready_to_make_order)
            }
            let path = `/api/create_order`
            fetch(path, requestOptions).then(response => response.json()).then(data => {
                // response====> {
                //     "shopping_cart_items": [
                //         {
                //             "id": 12,
                //             "cart_id": 2,
                //             "product_item_id": 15,
                //             "qty": 6,
                //             "added_on": "2023-03-22T18:49:50.851527Z",
                //             "productItem": {
                //                 "id": 15,
                //                 "product_id": 7,
                //                 "SKU": "l-pants",
                //                 "qty_in_stock": 19,
                //                 "product_image": "http://cdn.shopify.com/s/files/1/0053/5350/4881/products/Steel-grey-everyday-pant2.jpg?v=1673092119",
                //                 "prize": 333,
                //                 "IPFS_hash": null,
                //                 "img_url": "http://cdn.shopify.com/s/files/1/0053/5350/4881/products/Steel-grey-everyday-pant2.jpg?v=1673092119",
                //                 "added_on": "2023-03-10T19:36:07Z"
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
                //         "cart_id": 2,
                //             "cart_total": 1998,
                //                 "status": true,
                //                     "order_id": 5,
                //                         "payment_status": 2,
                //                             "order_status": 5
                // }
                console.log('response data from make order ')
                console.log(data)
                if (data.status) {
                    if (artifact?.contractName == 'TinToken') {
                        // this is from solidity function payWithPaymentID(uint amount, uint paymendId , uint orderId , string memory IPFS_Hash_ ,string memory Storage_link_ , string memory transaction_hash_) external returns(bool)
                        let paymentId = makeid(3333333333)
                        console.log("paymentId:", paymentId)
                        contract.methods.payWithPaymentID(cartTotal, paymentId, data.order_id, '', '', '').send({
                            from: accounts[0]
                        }).then(receipt => {
                            console.log('payment receipt')
                            console.log(receipt)
                            // {
                            //     "transactionHash": "0x8f00b307d8613608f9378d86b565ca1b331b75a082007eabc6b6d94cdb6f720b",
                            //         "transactionIndex": 0,
                            //             "blockHash": "0x41c79e3364c22311331c3cf22eb38ff1650aa98d589063c0d501b1cbd782640e",
                            //                 "blockNumber": 19,
                            //                     "from": "0xdfeb088754c16a2657ee3a78f702016ebb5d1c15",
                            //                         "to": "0x0b3fd59b26ce37ded4fd48918098d879d539ba4c",
                            //                             "gasUsed": 193069,
                            //                                 "cumulativeGasUsed": 193069,
                            //                                     "contractAddress": null,
                            //                                         "status": true,
                            //                                             "logsBloom": "0x00000000000000000000000040000008000000000040000000000000000000000000001000000000000000000000100000000000000000000040000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000002000000000000000000000000000200000000000000000000000000100000000000000000000000000080000000000200000000020000000000000000",
                            //                                                 "events": {
                            //         "Transfer": {
                            //             "logIndex": 0,
                            //                 "transactionIndex": 0,
                            //                     "transactionHash": "0x8f00b307d8613608f9378d86b565ca1b331b75a082007eabc6b6d94cdb6f720b",
                            //                         "blockHash": "0x41c79e3364c22311331c3cf22eb38ff1650aa98d589063c0d501b1cbd782640e",
                            //                             "blockNumber": 19,
                            //                                 "address": "0x0b3FD59B26Ce37DEd4FD48918098d879D539bA4c",
                            //                                     "type": "mined",
                            //                                         "id": "log_ef749706",
                            //                                             "returnValues": {
                            //                 "0": "0xDFeb088754c16A2657ee3a78F702016eBB5d1C15",
                            //                     "1": "0x0b3FD59B26Ce37DEd4FD48918098d879D539bA4c",
                            //                         "2": "333",
                            //                             "from": "0xDFeb088754c16A2657ee3a78F702016eBB5d1C15",
                            //                                 "to": "0x0b3FD59B26Ce37DEd4FD48918098d879D539bA4c",
                            //                                     "value": "333"
                            //             },
                            //             "event": "Transfer",
                            //                 "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                            //                     "raw": {
                            //                 "data": "0x000000000000000000000000000000000000000000000000000000000000014d",
                            //                     "topics": [
                            //                         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                            //                         "0x000000000000000000000000dfeb088754c16a2657ee3a78f702016ebb5d1c15",
                            //                         "0x0000000000000000000000000b3fd59b26ce37ded4fd48918098d879d539ba4c"
                            //                     ]
                            //             }
                            //         },
                            //         "PaymentDone": {
                            //             "logIndex": 1,
                            //                 "transactionIndex": 0,
                            //                     "transactionHash": "0x8f00b307d8613608f9378d86b565ca1b331b75a082007eabc6b6d94cdb6f720b",
                            //                         "blockHash": "0x41c79e3364c22311331c3cf22eb38ff1650aa98d589063c0d501b1cbd782640e",
                            //                             "blockNumber": 19,
                            //                                 "address": "0x0b3FD59B26Ce37DEd4FD48918098d879D539bA4c",
                            //                                     "type": "mined",
                            //                                         "id": "log_af56fb96",
                            //                                             "returnValues": {
                            //                 "0": "0xDFeb088754c16A2657ee3a78F702016eBB5d1C15",
                            //                     "1": "333",
                            //                         "2": "4720248233",
                            //                             "3": "20",
                            //                                 "4": "1679493971",
                            //                                     "payer": "0xDFeb088754c16A2657ee3a78F702016eBB5d1C15",
                            //                                         "amount": "333",
                            //                                             "paymentId": "4720248233",
                            //                                                 "orderId": "20",
                            //                                                     "date": "1679493971"
                            //             },
                            //             "event": "PaymentDone",
                            //                 "signature": "0x544caf200015959964c0a99785d417bd4d6915512d7cb574ac1b503bd3ae843f",
                            //                     "raw": {
                            //                 "data": "0x000000000000000000000000dfeb088754c16a2657ee3a78f702016ebb5d1c15000000000000000000000000000000000000000000000000000000000000014d00000000000000000000000000000000000000000000000000000001195945a9000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000641b0b53",
                            //                     "topics": [
                            //                         "0x544caf200015959964c0a99785d417bd4d6915512d7cb574ac1b503bd3ae843f"
                            //                     ]
                            //             }
                            //         }
                            //     }
                            // }
                            if (receipt.status) {
                                update_transaction_hash_in_shopOrder_db(receipt.transactionHash, data.order_id)

                            } else {
                                console.log('something went wrong with payment')
                            }
                        })
                    }
                }
            })
        }
    }

    async function update_transaction_hash_in_shopOrder_db(transactionHash, orderId) {
        const requestOptions = {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                'tx_hash': transactionHash,
                "order_id": orderId
            })
        }
        const path = '/api/update_tx_hash'
        fetch(path, requestOptions).then(response => response.json()).then(async data => {
            console.log('loged from update_tx')
            console.log(data)
            if (data.status) {
                console.log('updated successfully tx_hash')
                let res = await handlePaymentVerification("e", orderId, () => { console.log('called by update_transaction_hash_in_shopOrder_db') }) //() => { } some dummy function for fetchOrders in ViewOrders.js
                console.log(res)
                if (res.status) {
                    clearCart()
                }
            }
        })
    }

    function clearCart() {
        const requestOptions = {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }

        const path = `/api/empty_cart`
        fetch(path, requestOptions).then(response => response.json()).then(data => {
            console.log("empty cart")
            console.log(data)
            if (data.status) {
                fetchCartItems()
            }
        })
    }

    function handleRemoveItem(cart_item_id) {
        const requestOptions = {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                'cart_item_id': cart_item_id
            })
        }
        let path = `/api/remove_from_cart`
        fetch(path, requestOptions).then(response => response.json()).then((data) => {
            console.log('remove item from cart respose')
            console.log(data)
            if (data.status) {
                fetchCartItems()
            }
        })
    }

    function fetchCartItems() {
        if(!fetchCartItemsTimeoutCounter){
            return
        }
        console.log(fetchCartItemsTimeoutCounter)
        fetchCartItemsTimeoutCounter--
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
            setCartItems(data.shopping_cart_items.length == 0 ? [] : data.shopping_cart_items)
            clearTimeout(fetchCartItemsTimeout)
            setCartTotal(0)
        }).catch(e => {
            console.log("error in cartItems")
            fetchCartItemsTimeout = setTimeout(fetchCartItems, 1000)
        })
    }

    useEffect(() => {
        let total_value = 0
        cartItems == -1 ? total_value = 0 :
            cartItems.map(item => {
                total_value += item.productItem.prize * item.qty
            })
        setCartTotal(total_value)
    }, [cartItems])

    useEffect(() => [
        setMakeOrder(
            { ...cart, cart_total: cartTotal }
        )
    ], [cartTotal])

    useEffect(() => {
        fetchCartItems()
        return () => {
            clearTimeout(fetchCartItemsTimeout)
        }
    }, [])


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
                                        cartItems == -1 ? <Loading /> : (
                                            cartItems.map(item => {
                                                cart_total += item.productItem.prize
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
                                                                        [1, 2, 3, 4, 5].map(qty => {
                                                                            if (qty == Number(item.qty)) {
                                                                                return <option selected={true}>{qty}</option>
                                                                            } else {
                                                                                return <option>{qty}</option>
                                                                            }
                                                                        }
                                                                        )
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="">
                                                                <p className="h6">₹{Number(item.qty) * Number(item.productItem.prize)}</p> <br />
                                                                <small className="p-muted p-nowrap"> ₹{item.productItem.prize} / per item </small>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                            <div className="float-md-end">
                                                                <a href="#!" className="btn btn-light border px-2 icon-hover-primary"><i
                                                                    className="fas fa-heart fa-lg px-1 p-secondary"></i></a>
                                                                <a className="btn btn-light border p-danger icon-hover-danger" onClick={() => { handleRemoveItem(item.id) }}> Remove</a>
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
                                        <p className="mb-2 fw-bold">{cartTotal == -1 ? <Loading /> : cartTotal}</p>
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
