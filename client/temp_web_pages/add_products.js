document.addEventListener('DOMContentLoaded' , ()=>{

    document.getElementById('product_submit').addEventListener('click' , (e)=>{
        console.log('clicked submit')
        product_rows = document.querySelectorAll('.product_row')
        console.log(product_rows)
        for(let i =0 ; i<product_rows.length ; i++){
            console.log(product_rows[i])
            product_row = product_rows[i]
            console.log(product_row.querySelector('#sku').value)
            console.log(product_row.querySelector('#qty').value)
            console.log(product_row.querySelector('#image').value)
            console.log(product_row.querySelector('#price').value)
            console.log(product_row.querySelector('#var_name').value)
            console.log(product_row.querySelector('#var_val').value)
            // console.log(product_row[i]['value'])
        }
    })

    product_list = document.querySelector('#products_list')
    product_list.append(
    
            <div class="row gy-3 mb-4 border shadow-0 product_row">
                        
                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                            <div class="form-group mb-2 col-12">
                                <label for="exampleInputEmail1">SKU</label>
                                <input type="text" id="sku" name="sku" class="form-control"  aria-describedby="emailHelp" placeholder="Enter product SKU"/>
                            </div>
                        </div>

                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                            <div class="form-group mb-2 col-12">
                                <label for="exampleInputEmail1">Quantity</label>
                                <input type="text" id="qty" name="qty" class="form-control" aria-describedby="emailHelp" placeholder="Enter product qty"/>
                            </div>
                        </div>

                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                            <div class="form-group mb-2 col-12">
                                <label for="exampleInputEmail1">Image</label>
                                <input type="file" id="image" name="quantity" accept="image/*" class="form-control"  aria-describedby="emailHelp" placeholder="Enter product image"/>
                            </div>
                        </div>

                        <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row p-nowrap">
                            <div class="form-group mb-2 col-12">
                                <label for="exampleInputEmail1">Price</label>
                                <input type="text" id="price" name="Price" class="form-control"  aria-describedby="emailHelp" placeholder="Enter product name"/>
                            </div>
                        </div>

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
    )


})

