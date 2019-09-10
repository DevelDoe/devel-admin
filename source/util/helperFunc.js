
export const keySort = (arr, k, d) => {
    let desc = d || false
    Array.prototype.keySrt = function (key, desc) {
        this.sort(function (a, b) {
            let result = desc ? (a[key] < b[key]) : (a[key] > b[key])
            return result ? 1 : -1
        })
        return this
    }
    return arr.keySrt(k, desc)
}

export const numSort = (list) => {
    return list.sort((a, b) => {
        return a - b;
    })
}

export const cap = (str) => {
    str =  str.trim().toLowerCase()
    return str.charAt(0).toUpperCase() + str.slice(1)
}