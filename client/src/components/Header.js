import React, { useEffect, useState } from 'react'


export function jumbotron_maintop(logoutPressed, authResult) {
    return (
        <>
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
                        <div className="col-lg-5 col-md-12 col-12">
                            <div className="input-group float-center">
                                <div className="form-outline">
                                    <input type="search" id="form1" className="form-control" />
                                    <label className="form-label" htmlFor="form1">Search</label>
                                    <div className="form-notch"><div className="form-notch-leading" style={{ "width": "9px" }}></div><div className="form-notch-middle" style={{ "width": "47.2px" }}></div><div className="form-notch-trailing"></div></div></div>
                                <button type="button" className="btn btn-primary shadow-0">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        {/* Center elements */}



                        {/* Right elements */}
                        <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                            <div className="d-flex float-end">
                                {authResult ? (<a href="/login" onClick={logoutPressed}
                                    className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i
                                        className="fas fa-user-alt m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">Sign out</p>
                                </a>) : (<a href="/login"
                                    className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" > <i
                                        className="fas fa-user-alt m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">Sign in</p>
                                </a>)}
                                <a href="https://github.com/mdbootstrap/bootstrap-material-design"
                                    className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" > <i
                                        className="fas fa-heart m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">Wishlist</p>
                                </a>
                                <a href="https://github.com/mdbootstrap/bootstrap-material-design"
                                    className="border rounded py-1 px-3 nav-link d-flex align-items-center" > <i
                                        className="fas fa-shopping-cart m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">My cart</p>
                                </a>
                            </div>
                        </div>
                        {/* Right elements */}
                    </div>
                </div>
            </div >
            {/* Jumbotron */}
        </>
    )
}

function nav_homepage() {
    return (
        <>
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
        </>
    )
}

function jumbotron_home_container() {
    return (
        <>
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
        </>
    )
}

export function nav_(props) {
    return (
        <>
            <div className="bg-primary">
                <div className="container py-4">
                    {/* <!-- Breadcrumb --> */}
                    <nav className="d-flex">
                        <h6 className="mb-0">
                            <a href="/" className="text-white-50">1. Home</a>
                            <span className="text-white-50 mx-2"> </span>
                            {props.checkout ? (<><a href="/cart" className="text-white-50"><u>2. Shopping cart</u></a>
                                <span className="text-white-50 mx-2"> </span></>) : (<><a href="/cart" className="text-white"><u>2. Shopping cart</u></a>
                                    <span className="text-white-50 mx-2"> </span></>)}
                            {props.checkout ? (<><a href="/checkout" className="text-white"><u>3. Order info & payment</u></a>
                                <span className="text-white-50 mx-2"> </span></>) : null}
                        </h6>
                    </nav>
                    {/* <!-- Breadcrumb --> */}
                </div>
            </div>
        </>
    )
}

// export function nav_checkout() {
//     return (
//         <>
//             {/* <!-- Heading --> */}
//             <div className="bg-primary">
//                 <div className="container py-4">
//                     {/* <!-- Breadcrumb --> */}
//                     <nav className="d-flex">
//                         <h6 className="mb-0">
//                             <a href="" className="text-white-50">Home</a>
//                             <span className="text-white-50 mx-2">  </span>
//                             <a href="" className="text-white-50">2. Shopping cart</a>
//                             <span className="text-white-50 mx-2"> </span>
//                             <a href="" className="text-white"><u>3. Order info & payment</u></a>
//                             <span className="text-white-50 mx-2"> </span>
//                             {/* <a href="" className="text-white-50">4. Payment</a> */}
//                         </h6>
//                     </nav>
//                     {/* <!-- Breadcrumb --> */}
//                 </div>
//             </div>
//             {/* <!-- Heading --> */}
//         </>
//     )
// }


export function navbar(props) {
    switch (props.page) {
        case 'homepage':
            console.log('navbar homepage')
            return nav_homepage()
        // case 'cart':
        //     console.log('navbar cartpage')
        //     return nav_cart()
        // case 'checkout':
        //     console.log('navbar checkout');
        //     return nav_checkout()
        default:
            return nav_(props);
    }
}



export default function Header(props) {
    const [authResult, setAuthResult] = useState(false)

    function authenticateUser() {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({

            }),
        }
        fetch('/api/authenticate', requestOptions).then(function (response) {
            return response.json()
        }).then((data) => {
            if (data.result) {
                console.log("user successfully authenticated", data.result);
                setAuthResult(data.result)
            } else {
                // window.location.replace('/login')
                console.log("user not authenticated")
            }
        })
    };


    function logoutPressed(e) {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        }
        fetch("/api/logout", requestOptions).then((response) => {
            return response.json()
        }).then(data => {
            if (data.status) {
                console.log("logged out", data)
                // window.location.replace('/')
            } else {
                console.log("looks like something went wrong")
            }
            authenticateUser()
        })
    }



    // component did mount
    useEffect(() => {
        authenticateUser()
    }, [])


    console.log(props)
    return (
        < header >
            {jumbotron_maintop(logoutPressed, authResult)}
            {props.navbar ? navbar(props) : null}
            {props.homepage ? jumbotron_home_container() : null}
        </header >
    )
}
