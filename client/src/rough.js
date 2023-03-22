function makeid(seed) {
    return Math.round(Math.random() * seed) + seed;
}

console.log(makeid(33333333333));