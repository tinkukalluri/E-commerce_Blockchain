import React, { useState, useEffect } from 'react'
import { useEth } from '../../contexts/EthContext'
import Footer from '../footer';
import Navigator from '../Navigator';

export default function HomePage() {

    const { state } = useEth();
    const [NewProducts, setNewProducts] = useState('')
    const [NewProductsJSX, setNewProductsJSX] = useState(null)

    function handleBuy(e) {
        console.log(e.target.value)
    }
    console.log(state)
    useEffect(() => {
        console.log('component Did mount')

        get_new_products()
    }, [])


    function get_new_products(offset = 1, limit = 10) {
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

        })
    }

    useEffect(() => {
        if (NewProducts == '') {

        } else {
            let li = []
            NewProducts.forEach(product => {
                li.push(<div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                    <div className="card w-100 my-2 shadow-2-strong">
                        <img src={product.product_image_item} className="card-img-top"
                            style={{ 'aspectRation': '1 / 1' }} />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">rs{product.prize}</p>
                            <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                                <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i
                                    className="fas fa-heart fa-lg text-secondary px-1"></i></a>
                            </div>
                        </div>
                    </div>
                </div>);
            })
            setNewProductsJSX(li)
        }
    }, [NewProducts])



    return (
        <>
            {/*Main Navigation*/}
            <Navigator navbar page="homepage" homepage/>

            {/* Products */}

            < div >
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
                                            className="fas fa-heart fa-lg text-secondary px-1"></i></a>
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
            </div >
            {/* Products */}

            {/* footer */}
            {/* <Footer grey /> */}


            {/* footer-end */}
        </>

    )
}
