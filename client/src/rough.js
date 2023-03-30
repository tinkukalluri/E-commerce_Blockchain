function makeid(seed) {
    return Math.round(Math.random() * seed) + seed;
}

console.log(makeid(33333333333));


li = [1, 2, 3]

for (l of li) {
    console.log(l)
}

obj = {
    "tinku": "kalluri",
    "sindhu": "bhavani"
}

console.log(Object.keys(obj))

l1 = [{ "tinku": "kalluri", "sin": "tinku" }]

console.log(l1.includes({ "tinku": "kalluri", "sin": "tinku" }))

var carBrands = [];

var car1 = { name: 'ford' };
var car2 = { name: 'lexus' };
var car3 = { name: 'maserati' };
var car4 = { name: 'ford' };

// carBrands.push(car1);
carBrands.push(car2);
carBrands.push(car3);
carBrands.push(car4);

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

console.log(containsObject(car1, carBrands))

