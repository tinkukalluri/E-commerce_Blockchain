import React, { useEffect, useState } from 'react'

import { Navigate, useHistory } from "react-router-dom";




export default function Header(props) {
    const [authResult, setAuthResult] = useState(false)
    const history = useHistory()
    const [search, setSearch] = useState('')
    const [jumbotronJSX, setJumbotronJSX] = useState([])
    console.log('Header rerendered')

    function handleSearchtxt(e) {
        console.log(e)
        setSearch(e.target.value.toLowerCase())
        console.log(search)
    }

    function handleSearchSubmit(e) {
        props.setAppSearch(search)
        history.replace(`/product_search?q=${search}`)
    }

    function loginPressed(e) {
        history.replace('/login')
    }

    function wishlistPressed() {
        history.push('/wishlist')
    }

    function cartPressed() {
        history.push('/cart')
    }

    function jumbotron_maintop() {
        console.log('authResult changed')
        console.log(typeof authResult)
        console.log(authResult)
        setJumbotronJSX(
            <div className="p-3 text-center bg-white border-bottom">
                <div className="container">
                    <div className="row gy-3">
                        {/* Left elements */}
                        <div className="col-lg-2 col-sm-4 col-4">
                            <a href="https://kalluriabhinandan.web.app/" target="_blank" className="text-black h2">
                                ABC
                            </a>
                        </div>
                        {/* Left elements */}

                        {/* Center elements */}
                        <div className="col-lg-5 col-md-12 col-12">
                            <div className="input-group float-center">
                                <div className="form-outline">
                                    <input type="search" value={search} onChange={handleSearchtxt} id="form1" className="form-control" />
                                    <label className="form-label" htmlFor="form1">Search</label>
                                    <div className="form-notch"><div className="form-notch-leading" style={{ "width": "9px" }}></div>
                                        <div className="form-notch-middle" style={{ "width": "47.2px" }}></div>
                                        <div className="form-notch-trailing"></div>
                                    </div>
                                </div>
                                <button type="button" onClick={handleSearchSubmit} className="btn btn-primary shadow-0">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        {/* Center elements */}



                        {/* Right elements */}
                        <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                            <div className="d-flex float-end">
                                {authResult ? (<a onClick={logoutPressed}
                                    className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> <i
                                        className="fas fa-user-alt m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">Sign out</p>
                                </a>) : (<a onClick={loginPressed}
                                    className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" > <i
                                        className="fas fa-user-alt m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">Sign in</p>
                                </a>)}
                                <a onClick={wishlistPressed}
                                    className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" > <i
                                        className="fas fa-heart m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">Wishlist</p>
                                </a>
                                <a onClick={cartPressed}
                                    className="border rounded py-1 px-3 nav-link d-flex align-items-center" > <i
                                        className="fas fa-shopping-cart m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">My cart</p>
                                </a>
                            </div>
                        </div>
                        {/* Right elements */}
                    </div>
                </div>
            </div>
        )
    }


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
                setAuthResult(!data.status)
                history.push('/')
            } else {
                console.log("looks like something went wrong")
            }

        })
    }

    // authenticateUser()

    // component did mount
    useEffect(() => {
        console.log('Header component did mount')
        authenticateUser()
    }, [])


    useEffect(() => {
        authenticateUser()
        jumbotron_maintop()
    }, [props.authResultApp, authResult])


    console.log(props)
    return (
        < header >
            {jumbotronJSX}
        </header >
    )
}
