



export function getStorage(key) {
    try {
        let val = localStorage.getItem(key);
        return val;
    } catch (e) {
        console.log('something went wrong in pushing element in the localStorage')
    }
}

export function setStorage(key, val) {
    try {
        localStorage.setItem(key, val);
        return true;
    } catch (e) {
        console.log('couldnt set the key val pairs in localStorage')
        return false;
    }

}

export function pushStorage(key, val) {
    try {
        let temp_val = localStorage.getItem(key);
        if (temp_val) {
            temp_val.push(val)
        } else {
            temp_val = val
        }
        localStorage.setItem(key, temp_val)
        return true
    } catch (e) {
        console.log('something went wrong in pushing element in the localStorage')
        return false
    }
}

export function alert_user(msg){
    alert(msg)
}