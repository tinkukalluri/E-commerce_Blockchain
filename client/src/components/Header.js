import React, { useEffect, useState } from 'react'

import { Navigate, useHistory } from "react-router-dom";




export default function Header(props) {
    const [authResult, setAuthResult] = useState(false)
    const history = useHistory()
    const [search, setSearch] = useState('')
    console.log('Header rerendered')

    function handleSearch(e) {
        setSearch(e.target.value)
    }

    function handleSearchSubmit(e) {
        history.push(`/product_search?q=${search}`)
    }

    function jumbotron_maintop(logoutPressed, authResult) {
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
                                        <input type="search" onChange={handleSearch} id="form1" className="form-control" />
                                        <label className="form-label" htmlFor="form1">Search</label>
                                        <div className="form-notch"><div className="form-notch-leading" style={{ "width": "9px" }}></div><div className="form-notch-middle" style={{ "width": "47.2px" }}></div><div className="form-notch-trailing"></div></div></div>
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
                history.push('/')
            } else {
                console.log("looks like something went wrong")
            }
            authenticateUser()
        })
    }



    // component did mount
    useEffect(() => {
        console.log('Header component did mount')
        authenticateUser()
    }, [])

    useEffect(() => {
        authenticateUser()
    }, [authResult])


    console.log(props)
    return (
        < header >
            {jumbotron_maintop(logoutPressed, authResult)}
        </header >
    )
}
