import React, { useEffect, useState } from 'react'
import Loading from '../Loading'
import { useHistory } from 'react-router-dom'


export default function Wishlist() {

    const [wishlistItem, setwishlistItem] = useState(-1)

    const history = useHistory()

    var fetchWishlistProductTImeout = 0
    var fetchWishlistProductTImeoutCounter = 5


    function fetchWishlistProducts() {
        if (!fetchWishlistProductTImeoutCounter) {
            clearTimeout(fetchWishlistProductTImeout)
            return
        }
        fetchWishlistProductTImeoutCounter--
        const requestOptions = {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
        const path = '/api/wishlist_product'
        fetch(path, requestOptions).then(response => response.json()).then(data => {
            console.log('response data from fetching wishlist products from server')
            console.log(data)
            if (data.status) {
                setwishlistItem(data.wishlist_items)
                clearTimeout(fetchWishlistProductTImeout)
            } else {
                fetchWishlistProductTImeout = setTimeout(fetchWishlistProducts, 1000)
            }
        }).catch(err => {
            console.log(err)
            fetchWishlistProductTImeout = setTimeout(fetchWishlistProducts, 1000)
        })
    }

    function handleRemoveItem(wishlistItem_id) {
        console.log(wishlistItem_id)
        const requestOptions = {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                'wishlist_item_id': wishlistItem_id
            })
        }
        const path = '/api/remove_from_wishlist'
        fetch(path, requestOptions).then(response => response.json()).then(data => {
            console.log(data)
            if (data.status) {
                // var temp_wishlistItems = wishlistItem
                // temp_wishlistItems.map(wishlistItem_ =>{
                //     if(wishlistItem_.id == wishlistItem_id){
                //         return null
                //     }else{
                //         return wishlistItem_
                //     }
                // })
                // setwishlistItem(temp_wishlistItems)
            }
        })
    }

    useEffect(() => {
        console.log(wishlistItem)
    }, [wishlistItem])

    useEffect(() => {
        fetchWishlistProducts()
    }, [])

    return (

        <div className="my-5">
            <div className="container">
                <div className="row">

                    <div className="col-lg-12">
                        <div className="card border shadow-0">
                            <div className="m-4">
                                <h4 className="card-title mb-4">Your wishlist</h4>
                                {/* cart item -1 */}

                                {
                                    wishlistItem == -1 ? <Loading /> : (
                                        wishlistItem.map(item => {
                                            return item != null ?
                                                (
                                                    <div className="row gy-3 mb-4">
                                                        <div className="col-lg-5">
                                                            <div className="me-lg-5">
                                                                <div className="d-flex">
                                                                    <img src={item.product.product_image}
                                                                        className="border rounded me-3" style={{ "width": "96px", "height": "96px" }} />
                                                                    <div className="">
                                                                        <a onClick={() => {
                                                                            history.push(`/product/${item.product.id}`)
                                                                        }} className="nav-link">{item.product.name}</a>
                                                                        <p className="p-muted">{item.product.description}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                            <div className="float-md-end">
                                                                <a className="btn btn-light border p-danger icon-hover-danger" onClick={() => { handleRemoveItem(item.id) }}> Remove</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null
                                        })
                                    )
                                }

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}
