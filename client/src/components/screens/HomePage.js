import React from 'react'
import { useEffect, useContext } from 'react'
import { useEth } from '../../contexts/EthContext'

export default function HomePage() {

    const { state } = useEth();

    function handleBuy(e) {
        console.log(e.target.value)

    }

    useEffect(() => {
        console.log('component Did mount')
        console.log(state)
    }, [])




    return (
        <>
            <div className="item-list" >
                <p>
                    User Account:
                </p>
                <div className="item">
                    <p>item-1</p>
                    <button value={'item-1'} onClick={handleBuy}>buy</button>
                </div>
            </div >
            {/*Main Navigation*/}
            < header >
                {/* Jumbotron */}
                < div className="p-3 text-center bg-white border-bottom" >
                    <div className="container">
                        <div className="row gy-3">
                            {/* Left elements */}
                            <div className="col-lg-2 col-sm-4 col-4">
                                <a href="https://mdbootstrap.com/" target="_blank" className="float-start">
                                    <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" />
                                </a>
                            </div>
                            {/* Left elements */}

                            {/* Center elements */}
                            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                                <div className="d-flex float-end">
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design"
                                        className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i
                                            className="fas fa-user-alt m-1 me-md-2"></i>
                                        <p className="d-none d-md-block mb-0">Sign in</p>
                                    </a>
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design"
                                        className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i
                                            className="fas fa-heart m-1 me-md-2"></i>
                                        <p className="d-none d-md-block mb-0">Wishlist</p>
                                    </a>
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design"
                                        className="border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i
                                            className="fas fa-shopping-cart m-1 me-md-2"></i>
                                        <p className="d-none d-md-block mb-0">My cart</p>
                                    </a>
                                </div>
                            </div>
                            {/* Center elements */}

                            {/* Right elements */}
                            <div className="col-lg-5 col-md-12 col-12">
                                <div className="input-group float-center">
                                    <div className="form-outline">
                                        <input type="search" id="form1" className="form-control" />
                                        {/* <label className="form-label" htmlFor="form1">Search</label> */}
                                    </div>
                                    <button type="button" className="btn btn-primary shadow-0">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                            {/* Right elements */}
                        </div>
                    </div>
                </div >
                {/* Jumbotron */}

                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    {/* Container wrapper */}
                    <div className="container justify-content-center justify-content-md-between">
                        {/* Toggle button */}
                        <button className="navbar-toggler border py-2 text-dark" type="button" data-mdb-toggle="collapse"
                            data-mdb-target="#navbarLeftAlignExample" aria-controls="navbarLeftAlignExample" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i className="fas fa-bars"></i>
                        </button>

                        {/* Collapsible wrapper */}
                        <div className="collapse navbar-collapse" id="navbarLeftAlignExample">
                            {/* Left links */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link text-dark" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="#">Categories</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="#">Hot offers</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="#">Gift boxes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="#">Projects</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="#">Menu item</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="#">Menu name</a>
                                </li>
                                {/* Navbar dropdown */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button"
                                        data-mdb-toggle="dropdown" aria-expanded="false">
                                        Others
                                    </a>
                                    {/* Dropdown menu */}
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <a className="dropdown-item" href="#">Action</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Another action</a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            {/* Left links */}
                        </div>
                    </div>
                    {/* Container wrapper */}
                </nav>
                {/* Navbar */}
                {/* Jumbotron */}
                <div className="bg-primary text-white py-5">
                    <div className="container py-5">
                        <h1>
                            Best products & <br />
                            brands in our store
                        </h1>
                        <p>
                            Trendy Products, Factory Prices, Excellent Service
                        </p>
                        <button type="button" className="btn btn-outline-light">
                            Learn more
                        </button>
                        <button type="button" className="btn btn-light shadow-0 text-primary pt-2 border border-white">
                            <span className="pt-1">Purchase now</span>
                        </button>
                    </div>
                </div>
                {/* Jumbotron */}
            </header >

            {/* Products */}
            < div >
                <div className="container my-5">
                    <header className="mb-4">
                        <h3>New products</h3>
                    </header>

                    <div className="row">
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





            {/* Footer */}
            <div className="text-center text-lg-start text-muted mt-3" style={{ "backgroundColor": '#f5f5f5' }}>
                {/* div: Links  */}
                <div className="">
                    <div className="container text-center text-md-start pt-4 pb-4">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-12 col-lg-3 col-sm-12 mb-2">
                                {/* Content */}
                                <a href="https://mdbootstrap.com/" target="_blank" className="">
                                    <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" />
                                </a>
                                <p className="mt-2 text-dark">
                                    © 2023 Copyright: MDBootstrap.com
                                </p>
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-6 col-sm-4 col-lg-2">
                                {/* Links */}
                                <h6 className="text-uppercase text-dark fw-bold mb-2">
                                    Store
                                </h6>
                                <ul className="list-unstyled mb-4">
                                    <li><a className="text-muted" href="#">About us</a></li>
                                    <li><a className="text-muted" href="#">Find store</a></li>
                                    <li><a className="text-muted" href="#">Categories</a></li>
                                    <li><a className="text-muted" href="#">Blogs</a></li>
                                </ul>
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-6 col-sm-4 col-lg-2">
                                {/* Links */}
                                <h6 className="text-uppercase text-dark fw-bold mb-2">
                                    Information
                                </h6>
                                <ul className="list-unstyled mb-4">
                                    <li><a className="text-muted" href="#">Help center</a></li>
                                    <li><a className="text-muted" href="#">Money refund</a></li>
                                    <li><a className="text-muted" href="#">Shipping info</a></li>
                                    <li><a className="text-muted" href="#">Refunds</a></li>
                                </ul>
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-6 col-sm-4 col-lg-2">
                                {/* Links */}
                                <h6 className="text-uppercase text-dark fw-bold mb-2">
                                    Support
                                </h6>
                                <ul className="list-unstyled mb-4">
                                    <li><a className="text-muted" href="#">Help center</a></li>
                                    <li><a className="text-muted" href="#">Documents</a></li>
                                    <li><a className="text-muted" href="#">Account restore</a></li>
                                    <li><a className="text-muted" href="#">My orders</a></li>
                                </ul>
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-12 col-sm-12 col-lg-3">
                                {/* Links */}
                                <h6 className="text-uppercase text-dark fw-bold mb-2">Newsletter</h6>
                                <p className="text-muted">Stay in touch with latest updates about our products and offers</p>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control border" placeholder="Email" aria-label="Email"
                                        aria-describedby="button-addon2" />
                                    <button className="btn btn-light border shadow-0" type="button" id="button-addon2"
                                        data-mdb-ripple-color="dark">
                                        Join
                                    </button>
                                </div>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </div>
                {/* div: Links  */}

                <div className="">
                    <div className="container">
                        <div className="d-flex justify-content-between py-4 border-top">
                            {/* {/*- payment */}
                            <div>
                                <i className="fab fa-lg fa-cc-visa text-dark"></i>
                                <i className="fab fa-lg fa-cc-amex text-dark"></i>
                                <i className="fab fa-lg fa-cc-mastercard text-dark"></i>
                                <i className="fab fa-lg fa-cc-paypal text-dark"></i>
                            </div>
                            {/* {/*- payment */}

                            {/* {/*- language selector -*/}
                            <div className="dropdown dropup">
                                <a className="dropdown-toggle text-dark" href="#" id="Dropdown" role="button" data-mdb-toggle="dropdown"
                                    aria-expanded="false"> <i className="flag-united-kingdom flag m-0 me-1"></i>English </a>

                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="Dropdown">
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-united-kingdom flag"></i>English <i
                                            className="fa fa-check text-success ms-2"></i></a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-poland flag"></i>Polski</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-china flag"></i>中文</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-japan flag"></i>日本語</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-germany flag"></i>Deutsch</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-france flag"></i>Français</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-spain flag"></i>Español</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-russia flag"></i>Русский</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><i className="flag-portugal flag"></i>Português</a>
                                    </li>
                                </ul>
                            </div>
                            {/* {/*- language selector -*/}
                        </div>
                    </div>
                </div>
            </div >

            {/* <Router>
                <Switch>
                    <Route exact path="/">
                        <FirebaseLogin  {...this.props} />
                    </Route>
                    <Route exact path="/">
                        <FirebaseLogin  {...this.props} />
                    </Route>
                    <Route exact path="/">
                        <FirebaseLogin  {...this.props} />
                    </Route>
                </Switch>
            </Router> */}

        </>

    )
}
