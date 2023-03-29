import React, { useEffect } from 'react'
import { useState } from "react";
import { storage } from "../Firebase/firebase_config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


import Loading from '../Loading';

export default function AddProduct() {
    // State to store uploaded file
    const [file, setFile] = useState("");
    const [productItemsJSX , setProductItemJSX] = useState([])
    const [productCategories , setProductCategories] = useState([])
    const [productVariations , setProductVariations] = useState([])
    const [productVariationOptions , setProductVariationOptions] = useState([])
    const [productItemNo , setProductItemNo] = useState([])

    var fetchProductCategoryTimeout = 5
    var fetchProductVariationTimeout = 5
    var fetcProductVariationOptionTimeout = 5


    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    useEffect(()=>{
        fetchProductCategories()

    } , [])

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

    function fetchProductVariationOptions(variation_id){
        fetcProductVariationOptionTimeout-=1
        const requestOpt = {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
        const path = `/api/get_variation_options?variation_id=${variation_id}`
        fetch(path , requestOpt).then(response=>response.json()).then(data=>{
            console.log('product-variations')
            console.log(data)
            if(data.status){
                setProductVariationOptions(data.variation_options)
                clearTimeout(fetcProductVariationOptionTimeout)
            }else{
                console.log('something went wrong fetching the variations')
                console.log(data.oops)
                if(fetcProductVariationOptionTimeout){
                    fetcProductVariationOptionTimeout = setTimeout(fetchProductVariationOptions , 1000)
                }
            }
        }).catch((err)=>{
            console.log(err)
            if(fetcProductVariationOptionTimeout){
                fetcProductVariationOptionTimeout = setTimeout(fetchProductVariationOptions , 1000)
            }
        })
    }


    function fetchProductVariations(category_id){
        fetchProductVariationTimeout-=1
        const requestOpt = {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
        const path = `/api/get_variations?category_id=${category_id}`
        fetch(path , requestOpt).then(response=>response.json()).then(data=>{
            console.log('product-variations')
            console.log(data)
            if(data.status){
                setProductVariations(data.variations)
                clearTimeout(fetchProductVariationTimeout)
            }else{
                console.log('something went wrong fetching the variations')
                console.log(data.oops)
                if(fetchProductVariationTimeout){
                    fetchProductVariationTimeout = setTimeout(fetchProductVariations , 1000)
                }
            }
        }).catch(()=>{
            if(fetchProductVariationTimeout){
                fetchProductVariationTimeout = setTimeout(fetchProductVariations , 1000)
            }
        })
    }

    function fetchProductCategories(){
        fetchProductCategoryTimeout-=1
        const requestOpt = {
            method: 'get',
            headers: { "Content-Type": "application/json" },
        }
        const path = '/api/get_product_category'
        fetch(path , requestOpt).then(response=>response.json()).then(data=>{
            console.log(data)
            if(data.status){
                setProductCategories(data.product_category)
                clearTimeout(fetchProductCategoryTimeout)
            }else{
                console.log('looks like somnething went wrong in fetching product categories')
                 console.log(data.oops)
                if(fetchProductCategoryTimeout){
                    fetchProductCategoryTimeout = setTimeout(fetchProductCategories , 1000)
                }            }
        }).catch((err)=>{
            console.log(err)
            if(fetchProductCategoryTimeout){
                fetchProductCategoryTimeout = setTimeout(fetchProductCategories , 1000)
            }
        })

    }

    function addAddNewProduct(e){
        
            let prev= [...productItemNo]
            prev.push(
                    prev.length
            )
            console.log(prev)
            setProductItemNo(prev)
    }

    function readFileAsDataURL(file){
        return new Promise((resolve, reject) => {
          var fr = new FileReader();  
          fr.onload = () => {
            resolve(fr.result )
          };
          fr.onerror = reject;
          fr.readAsDataURL(file);
        });
    }


    async function handleProductsSubmit(e){
        console.log('clicked submit')
        let product_rows = document.querySelectorAll('.product_row')
        console.log(product_rows)
        let product_items = []
        let product_cat = document.querySelector("#product_category").value
        console.log(product_cat)
        if(product_cat=="None"){
            console.log('please select any category')
            return null
        }

        let product_name = document.querySelector('#product_name').value
        let product_desc =  document.querySelector('#product_desc').value
        let product_img = document.querySelector('#product_img').files[0]
        let product_img_base64 = ''
        product_img_base64 = await readFileAsDataURL(product_img)
        console.log('product_image_base64' ,product_img_base64 )

        // product items
        for(let i =0 ; i<product_rows.length ; i++){
            console.log(product_rows[i])
            let product_row = product_rows[i]
            let sku = product_row.querySelector('#sku').value
            let qty = product_row.querySelector('#qty').value
            let image = product_row.querySelector('#image').files[0]
            let image_base64 = ''
            image_base64 = await readFileAsDataURL(image)
            let price = product_row.querySelector('#price').value
            let variation_name = product_row.querySelector('#var_name').value
            let variation_val = product_row.querySelector('#var_val').value
            console.log(sku , qty , image_base64 , price , variation_name , variation_val)
            product_items.push({
                sku , qty , image_base64 , price , variation_name , variation_val
            })
        }
        console.log(product_items)
        const requestOpt = {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "product_category" : product_cat,
                'product' : {
                    'product_name' : product_name ,
                    'product_desc': product_desc , 
                    'product_img_base64': product_img_base64
                }, 
                'product_items' : product_items
            }) 
        }
        const path = `/api/add_products`
        fetch(path , requestOpt).then(response => response.json()).then(data =>{
            console.log(data)
            if(data.status){
                console.log('products added to the server')
            }else{
                console.log('something went wrong adding products to the database')
                console.log(data.oops)
            }

        }).catch(err =>{
            console.log('oops something went wrong while sending a request')
            console.log(err)
        })
    }



    function handleProductCategoryChange(e){
        let product_cat = document.querySelector("#product_category").value
        console.log(product_cat)
        if(product_cat=="None"){
            console.log('please select any category')
        }else{
            fetchProductVariations(parseInt(product_cat))
        }
    }


    function handleProductVariationChange(e){
        let variation_id = e.target.value
        console.log('handle product variation change' , e.target.value)
        if(variation_id=='None'){
            console.log('please select a valid vairation')
        }else{
            fetchProductVariationOptions(variation_id)
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
                {
                    productCategories.length?(
                
                <select style={{"margin":"10px"}} name="cars" id="product_category" onChange={handleProductCategoryChange}>
                    <option selected value="None">select</option>
                    
                    {
                        productCategories.map(product_category=>{
                            return (
                                <option value={product_category.id}>{product_category.category_name}</option>
                            )
                        })
                    }
                </select>) : <Loading/>
                }


    <div class="form-group mb-2 col-12">
        <label for="product_name">Product name</label>
        <input type="text" class="form-control" id="product_name" aria-describedby="emailHelp" placeholder="Enter product name"/>
    </div>

    <div class="form-group mb-2 col-12">
        <label for="product_desc">Product Description</label>
        <input type="text" class="form-control" id="product_desc" aria-describedby="emailHelp" placeholder="Enter product Description"/>
    </div>

    <div class="form-group mb-2 col-12">
        <label for="product_img">Product Image</label>
        <input type="file" accept="image/*" class="form-control" id="product_img" aria-describedby="emailHelp" placeholder="Enter product Image"/>
    </div>
    

    <div class="card border shadow-0">
        <div class="m-4">
            <h4 class="card-title mb-4">Add items</h4>
            <div id="products_list">

                {/* {productItemsJSX.map(ele=> ele)} */}

                {
                    productItemNo.map(productItemNo_ =>{
                        return (
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
                                <input type="number" id="qty" name="qty" class="form-control" aria-describedby="emailHelp" placeholder="Enter product qty"/>
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
                                <input type="number" id="price" name="Price" class="form-control" aria-describedby="emailHelp" placeholder="Enter product name"/>
                            </div>
                        </div>

                        {/* <!-- variation name --> */}
                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap align-items-center"  >
                            
                            <label for="var_name">Variation name: </label>
                            <select name="variation name" id="var_name" onChange={(e)=>{handleProductVariationChange(e)}}>
                                <option selected value="None">select</option>
                                {
                                    productVariations.map((variation)=>{
                                        return (
                                            <option value={variation.id} > {variation.name}  </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        {/* <!-- variation value --> */}
                        <div  class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap align-items-center">
                            
                            <label for="var_val">Variation value: </label>
                            <select name="cars" id="var_val">
                                <option selected value="None">select</option>
                                {
                                    productVariationOptions.map(variation_option =>{
                                        return (
                                            <option value={variation_option.id}>{variation_option.value}</option>
                                        )
                                    })
                                }
                            </select>
                        
                        </div>

                    </div> 
                        )
                    })
                }
            



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
