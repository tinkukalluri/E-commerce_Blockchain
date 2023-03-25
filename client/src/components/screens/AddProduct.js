import React, { useEffect } from 'react'
import { useState } from "react";
import { storage } from "../Firebase/firebase_config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function AddProduct() {
    // State to store uploaded file
    const [file, setFile] = useState("");
    const [productItemsJSX , setProductItemJSX] = useState([])

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

    function addAddNewProduct(e){
        setProductItemJSX(prev =>{
            console.log("prev")
            console.log(prev)
            let newItemList=prev;
            newItemList.push(
                <>
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
                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap align-items-center">
                            
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
                </>
            )
            console.log(newItemList)
            return newItemList
            
        })
    }

    function handleProductsSubmit(e){

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
                <label for="product_category">Variation value:</label>
                <select name="cars" id="product_category" onChange={handleProductCategoryChange}>
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

                {productItemsJSX}
            



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
