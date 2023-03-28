import React, { useEffect } from 'react'
import { useState } from "react";
import { storage } from "../Firebase/firebase_config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function AddProduct() {
    // State to store uploaded file
    const [file, setFile] = useState("");
    const [productItemsJSX , setProductItemJSX] = useState([])
    const [productCategories , setProductCategories] = useState([])

    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    useEffect(()=>{
        console.log('product item updated')
    } , [productItemsJSX])

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

    function fetchProductCategories(){
        const requestOpt = {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
        const path = 'api/get_product_category'
        fetch(path , requestOpt).then(response=>response.json()).then(data=>{
            console.log(data)
            if(data.status){
                setProductCategories(data.product_category)
            }else{
                console.log('looks like somnething went wrong in fetching product categories')
                 console.log(data.oops)
            }
        })

    }

    function addAddNewProduct(e){
        
            let prev= [...productItemsJSX]
            prev.push(
                    <div class="row gy-3 mb-4 border shadow-0 product_row">
                        
                        {/* <!-- SKU --> */}
                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                            <div class="form-group mb-2 col-12">
                                <label for="exampleInputEmail1">SKU</label>
                                <input type="text" id="sku" name="sku" class="form-control" aria-describedby="emailHelp" placeholder="Enter product SKU"/>
                            </div>
                        </div>

                        {/* <!-- qty in stock --> */}
                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                            <div class="form-group mb-2 col-12">
                                <label for="exampleInputEmail1">Quantity</label>
                                <input type="text" id="qty" name="qty" class="form-control" aria-describedby="emailHelp" placeholder="Enter product qty"/>
                            </div>
                        </div>

                        {/* <!-- product image --> */}
                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                            <div class="form-group mb-2 col-12">
                                <label for="exampleInputEmail1">Image</label>
                                <input type="file" id="image" name="quantity" accept="image/*" class="form-control"  aria-describedby="emailHelp" placeholder="Enter product image"/>
                            </div>
                        </div>

                        {/* <!-- price --> */}
                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                            <div class="form-group mb-2 col-12">
                                <label for="exampleInputEmail1">Price</label>
                                <input type="text" id="price" name="Price" class="form-control" aria-describedby="emailHelp" placeholder="Enter product name"/>
                            </div>
                        </div>

                        {/* <!-- variation name --> */}
                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap align-items-center"  >
                            
                            <label for="var_name">Variation name:</label>
                            <select name="variation name" id="var_name">
                                <option selected value="None">select</option>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>

                        {/* <!-- variation value --> */}
                        <div  class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap align-items-center">
                            
                            <label for="var_val">Variation value:</label>
                            <select name="cars" id="var_val">
                                <option selected value="None">select</option>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        
                        </div>

                    </div>
            )
            console.log(prev)
            setProductItemJSX(prev)
    }

    function handleProductsSubmit(e){
        console.log('clicked submit')
        let product_rows = document.querySelectorAll('.product_row')
        console.log(product_rows)
        for(let i =0 ; i<product_rows.length ; i++){
            console.log(product_rows[i])
            let product_row = product_rows[i]
            console.log(product_row.querySelector('#sku').value)
            console.log(product_row.querySelector('#qty').value)
            console.log(product_row.querySelector('#image').value)
            console.log(product_row.querySelector('#price').value)
            console.log(product_row.querySelector('#var_name').value)
            console.log(product_row.querySelector('#var_val').value)
        }
    }

    function handleProductCategoryChange(e){
        let product_cat = document.querySelector("#product_category").value
        console.log(product_cat)
        if(product_cat=="None"){
            console.log('please select any category')
        }
    }

    return (
        <div>
            {/* <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUpload}>Upload to Firebase</button>
            <p>{percent} "% done"</p> */}

            <div>
            <div class="container mt-3">
                <div class="row">
            {/* select category */}
                <label for="product_category">Product category</label>
                <select style={{"margin":"10px"}} name="cars" id="product_category" onChange={handleProductCategoryChange}>
                    <option selected value="None">select</option>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>


    <div class="form-group mb-2 col-12">
        <label for="exampleInputEmail1">Product name</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter product name"/>
    </div>

    <div class="form-group mb-2 col-12">
        <label for="exampleInputEmail1">Product Description</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter product Description"/>
    </div>

    <div class="form-group mb-2 col-12">
        <label for="exampleInputEmail1">Product Image</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter product Image"/>
    </div>
    

    <div class="card border shadow-0">
        <div class="m-4">
            <h4 class="card-title mb-4">Add items</h4>
            <div id="products_list">

                {productItemsJSX.map(ele=> ele)}
            



            {/* <!-- another product --> */}
            </div>
            



            {/* <!-- add product button --> */}


            <div class="d-flex flex-row gy-3 mb-4 border shadow-0 justify-content-around align-content-center">
                <button class="btn btn-primary" onClick={addAddNewProduct}>Add Product</button>
                <button class="btn btn-primary" id="product_submit" onClick={handleProductsSubmit}>submit</button>
            </div>


            
        </div>
    </div>

        </div>

</div>
        </div>


        </div>
    );
}
