import React, { useState, useEffect } from 'react'
import { useEth } from '../../contexts/EthContext'
import Footer from '../footer';
import Navigator from '../Navigator';
import { useHistory } from 'react-router-dom';
import LoadingFullScreen from '../LoadingFullScreen';


export async function handleWishList(e , product_id , wishlist_item_id=-1 , refresh_page=()=>{}){
    if(e.target.classList.value.search('text-danger')!=-1){
        await removeWishList(e , wishlist_item_id )
    }else{
        console.log(product_id)
        const requestOptions = {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "product_id" : product_id
              })
        }
        let path = `/api/add_to_wishlist`
        await fetch(path , requestOptions).then(response=> response.json()).then(data=>{
            if(data.status){
                console.log(e.target)
                console.log('data added successfully')
                e.target.classList.toggle("text-danger");
            }else{
                console.log(data.oops)
            }
        })
    }
    refresh_page()
}

export async function removeWishList(e , wishlist_item_id){
    console.log(wishlist_item_id)
    const requestOptions = {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "wishlist_item_id": wishlist_item_id
          })
    }
    let path = `/api/remove_from_wishlist`
    fetch(path , requestOptions).then(response=> response.json()).then(data=>{
        if(data.status){
            console.log('removed from wishlist')
            e.target.classList.toggle("text-danger");
        }else{
            console.log(data.oops)
        }
    })

    
}

export default function HomePage() {

    const { state } = useEth();
    const [NewProducts, setNewProducts] = useState('')
    const [NewProductsJSX, setNewProductsJSX] = useState(null)
    const history = useHistory()
    const fetchNewProductsTimeout = 0
    const [FullScreenLoading , setFullScreenLoading] = useState(true)

    function handleBuy(e) {
        console.log(e.target.value)
    }
    console.log(state)
    useEffect(() => {
        console.log('component Did mount')
        get_new_products()
        return () => {
            clearTimeout(fetchNewProductsTimeout)
        }
    }, [])


    function get_new_products(offset = 1, limit = 10) {
        setFullScreenLoading(true)
        const requestOptions = {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
        let path = `/api/get_new_products?offset=${offset}&limit=${limit}`
        fetch(path, requestOptions).then(function (response) {
            return response.json()
        }).then((data) => {
            console.log(data);
            setNewProducts(data);
            return true
        }).catch(e => {
            console.log("exception in fetching new products")
            console.log(e)
            fetchNewProductsTimeout = setTimeout(get_new_products, 1000)
        })
    }
    function handleProductClick(e) {
        const productID = e
        console.log('handle click', productID)
        history.push(`/product/${productID}`)
    }

    useEffect(() => {
        if (NewProducts == '') {

        } else {
            let li = []
            NewProducts.forEach(product => {
                li.push(<div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                    <div className="card w-100 my-2 shadow-2-strong">
                        <img onClick={() => handleProductClick(product['id'])} src={product.product_image} className="card-img-top"
                            style={{ 'aspectRation': '1 / 1' }} />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">rs{product.min_prize}</p>
                            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                <a onClick={() => handleProductClick(product['id'])} className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                {product?.wishlistItem==-1 ? (<a onClick={(e)=>{
                                    handleWishList(e ,product['id'] ,product?.wishlistItem?.id , get_new_products )
                                }} className="btn btn-light border px-2 pt-2 icon-hover"><i
                                    className="fas fa-heart fa-lg text-secondary px-1"></i></a>):
                                (
                                    <a onClick={(e)=>{
                                    handleWishList(e ,product['id'] ,product?.wishlistItem?.id , get_new_products)
                                }} className="btn btn-light border px-2 pt-2 icon-hover"><i
                                    className="fas fa-heart fa-lg text-secondary px-1 text-danger"></i></a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>);
            })
            setNewProductsJSX(li)
            setFullScreenLoading(false)
        }
    }, [NewProducts])



    return (
        <>
            {/*Main Navigation*/}
            <Navigator navbar page="homepage" homepage />

            {/* Products */}
            {FullScreenLoading ? <LoadingFullScreen/> :(
            <div>
                <div className="container my-5">
                    <header className="mb-4">
                        <h3>New products</h3>
                    </header>

                    <div className="row">
                        {NewProductsJSX}
                        <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                            <div className="card w-100 my-2 shadow-2-strong">
                                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" className="card-img-top"
                                    style={{ 'aspectRation': '1 / 1' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">GoPro HERO6 4K Action Camera - Black</h5>
                                    <p className="card-text">$790.50</p>
                                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                        <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i
                                            className="fas fa-heart fa-lg text-secondary px-1 btn-secondary"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                            <div className="card w-100 my-2 shadow-2-strong">
                                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.webp" className="card-img-top"
                                    style={{ 'aspectRation': '1 / 1' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Canon camera 20x zoom, Black color EOS 2000</h5>
                                    <p className="card-text">$320.00</p>
                                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                        <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i
                                            className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                            <div className="card w-100 my-2 shadow-2-strong">
                                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp" className="card-img-top"
                                    style={{ 'aspectRation': '1 / 1' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Xiaomi Redmi 8 Original Global Version 4GB</h5>
                                    <p className="card-text">$120.00</p>
                                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                        <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i
                                            className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                            <div className="card w-100 my-2 shadow-2-strong">
                                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/4.webp" className="card-img-top"
                                    style={{ 'aspectRation': '1 / 1' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Apple iPhone 12 Pro 6.1" RAM 6GB 512GB Unlocked</h5>
                                    <p className="card-text">$120.00</p>
                                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                        <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i
                                            className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                            <div className="card w-100 my-2 shadow-2-strong">
                                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp" className="card-img-top"
                                    style={{ 'aspectRation': '1 / 1' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Apple Watch Series 1 Sport Case 38mm Black</h5>
                                    <p className="card-text">$790.50</p>
                                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                        <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i
                                            className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                            <div className="card w-100 my-2 shadow-2-strong">
                                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/6.webp" className="card-img-top"
                                    style={{ 'aspectRation': '1 / 1' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">T-shirts with multiple colors, for men and lady</h5>
                                    <p className="card-text">$120.00</p>
                                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                        <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i
                                            className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                            <div className="card w-100 my-2 shadow-2-strong">
                                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp" className="card-img-top"
                                    style={{ 'aspectRation': '1 / 1' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Gaming Headset 32db Blackbuilt in mic</h5>
                                    <p className="card-text">$99.50</p>
                                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                        <a href="#!" className="btn btn-light border icon-hover px-2 pt-2"><i
                                            className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                            <div className="card w-100 my-2 shadow-2-strong">
                                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp" className="card-img-top"
                                    style={{ 'aspectRation': '1 / 1' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">T-shirts with multiple colors, for men and lady</h5>
                                    <p className="card-text">$120.00</p>
                                    <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                        <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i
                                            className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
            {/* Products */}

            {/* footer */}
            {/* <Footer grey /> */}


            {/* footer-end */}
        </>

    )
}
