
somethingWasSuccesful = false

function someAsynFunction() {
    return new Promise((resolve, reject) => {
       if (somethingWasSuccesful) {
        setTimeout(()=>{
            resolve('yupppp');  
        } , 10000)
       }else{
          reject('nope')
       }
    });
 }


 someAsynFunction().then(console.log).catch(console.log)