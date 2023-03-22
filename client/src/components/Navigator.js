import React ,  { useEffect, useState } from 'react'




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

export default function Navigator(props) {


  return (
    <>
        {props.navbar ? navbar(props) : null}
        {props.homepage ? jumbotron_home_container() : null}
    </>
  )
}

