import config from '../../config'
import store from '../store/store'
import Vue from 'vue'

const bus = new Vue()

const API = {
    bus: bus,
    get: function(  ) {
        const args = (arguments === 1 ? [arguments[0]] : Array.apply(null, arguments))
        const coll = args.shift() || null
        const cb   = args.shift() || null

        store.dispatch('setLoading', true)

        fetch(`${config.api_url}${coll}s`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                'Authorization': store.state.token
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
        }).then( res => {
            if( res.status !== 200 ) {
                if( process.env.NODE_ENV === 'development' ) console.log('Status Code: ' + res.status)
                bus.$emit('toast', 'Error fetching data' )
                setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                store.dispatch('setLoading', false)
                return
            }
            var Coll = capitalize(coll)
            res.json().then( data => {
                var Coll = capitalize(coll)
                const access = readRights( coll )
                if( access )  store.dispatch( `set${Coll}s` , data )
                if(cb) cb()
                store.dispatch('setLoading', false)
            })

        })
        .catch(err => {
            bus.$emit('toast', 'Database fetch error' )
            setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
            if( process.env.NODE_ENV === 'development' ) console.log('Fetch Error :-S', err)
            store.dispatch('setLoading', false)
        })
    },
    save: function() {
        const args = (arguments === 1 ? [arguments[0]] : Array.apply( null, arguments ))
        const coll   = args.shift() || null
        const data   = args.shift() || null

        store.dispatch('setLoading', true)

        if(  writeRights( coll ) ) {
            if( validate( coll, data ) ) {

                fetch(`${config.api_url}${coll}s`, {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, cors, *same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: "same-origin", // include, same-origin, *omit
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            'Authorization': store.state.token
                        },
                        redirect: "follow", // manual, *follow, error
                        referrer: "no-referrer", // no-referrer, *client
                        body: JSON.stringify(data), // body data type must match "Content-Type" header
                    })
                    .then( res => {
                        if( res.status !== 200 ) {
                            if( process.env.NODE_ENV === 'development' ) console.log('Status Code: ' + res.status)
                            bus.$emit('toast', 'Error saving data' )
                            setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                            store.dispatch('setLoading', false)
                            return
                        }
                        res.json().then( d => {
                            if( d.err ) {
                                bus.$emit('toast', 'Error savin data'  )
                                setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                                if( process.env.NODE_ENV === 'development' ) console.log( d.err )
                                store.dispatch('setLoading', false)
                                return
                            }
                            var Coll = capitalize(coll)
                            store.dispatch( `add${Coll}`, d)
                            bus.$emit('toast', 'Saved' )
                            setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                            store.dispatch('setLoading', false)
                        })
                    })
                    .catch(err => {
                        bus.$emit('toast', 'Database save error' )
                        setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                        if( process.env.NODE_ENV === 'development' ) console.log('Fetch Error :-S', err)
                        store.dispatch('setLoading', false)
                    })
            } else {
                return false
                store.dispatch('setLoading', false)
            }
        }  else {
            store.dispatch('setLoading', false)
        }

    },
    del: function() {
        const args = (arguments === 1 ? [arguments[0]] : Array.apply( null, arguments ))
        const coll = args.shift() || null
        const data = args.shift() || null
        const id   = data._id

        store.dispatch('setLoading', true)

        const access = writeRights( coll, data )
        if(  access ) {

            fetch(`${config.api_url}${coll}s/${id}`, {
                    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, cors, *same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, same-origin, *omit
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        'Authorization': store.state.token
                    },
                    redirect: "follow", // manual, *follow, error
                    referrer: "no-referrer", // no-referrer, *client
                })
                .then( res => {
                    if( res.status !== 200 ) {
                        if( process.env.NODE_ENV === 'development' ) console.log('Status Code: ' + res.status)
                        bus.$emit('toast', 'Error deleting data' )
                        setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                        store.dispatch('setLoading', false)
                        return
                    }
                    var Coll = capitalize(coll)
                    store.dispatch( `del${Coll}`, id )
                    bus.$emit('toast', 'Deleted' )
                    setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                    store.dispatch('setLoading', false)
                })
                .catch(err => {
                    bus.$emit('toast', 'Database delete error' )
                    setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                    if( process.env.NODE_ENV === 'development' ) console.log('Fetch Error :-S', err)
                    store.dispatch('setLoading', false)
                })
        }  else {
            store.dispatch('setLoading', false)
        }
    },
    update: function() {
        const args = (arguments === 1 ? [arguments[0]] : Array.apply( null, arguments ))
        const coll = args.shift() || null
        const data = args.shift() || null
        const access = writeRights( coll, data )

        store.dispatch('setLoading', true)

        if(  access ) {
            if( validate( coll, data ) ) {
                fetch(`${config.api_url}${coll}s/${data._id}`, {
                        method: "PUT", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, cors, *same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: "same-origin", // include, same-origin, *omit
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            'Authorization': store.state.token
                        },
                        redirect: "follow", // manual, *follow, error
                        referrer: "no-referrer", // no-referrer, *client
                        body: JSON.stringify(data), // body data type must match "Content-Type" header
                    })
                    .then( res => {
                        if( res.status !== 200 ) {
                            if( process.env.NODE_ENV === 'development' ) console.log('Status Code: ' + res.status)
                            bus.$emit('toast', 'Error updating data' )
                            setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                            store.dispatch('setLoading', false)
                            return
                        }
                        const Coll = capitalize(coll)
                        store.dispatch(`del${Coll}`, data._id)
                        store.dispatch(`add${Coll}`, data)
                        bus.$emit('toast', 'Updated' )
                        setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                        store.dispatch('setLoading', false)
                    })
                    .catch(err => {
                        bus.$emit('toast', 'Database update error' )
                        setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                        if( process.env.NODE_ENV === 'development' ) console.log('Fetch Error :-S', err)
                        store.dispatch('setLoading', false)
                    })
            } 
        } else {
            store.dispatch('setLoading', false)
        }
    },
    upload: function(formData) {
        store.dispatch('setLoading', true)
        return fetch(`${config.api_url}image`, {
            method: 'POST',
            headers: {
                'Authorization': store.state.token
            },
            body: formData
        })
        .then( res => {
            if( res.status !== 200 ) {
                if( process.env.NODE_ENV === 'development' ) console.log('Status Code: ' + res.status)
                bus.$emit('toast', 'Error uploading image' )
                setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                store.dispatch('setLoading', false)

                return res.json().then(data => {
                    var res = {}
                    res.err = data.err.replace('Server Error:','');
                    bus.$emit('toast', res.err )
                    setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
                    store.dispatch('setLoading', false)
                    return res
                })

            } else {
                return res.json().then(data => {
                    var res = data.file
                    res.img_src = `${config.api_url}${data.file.path}`
                    store.dispatch('setLoading', false)
                    return res
                })
            }
        })
        .catch(err => {
            bus.$emit('toast', 'Fetching error, please contact administrator...' )
            setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
            if( process.env.NODE_ENV === 'development' ) console.log('Fetch Error :-S', err)
            store.dispatch('setLoading', false)
        })
    }
}
export default API

function capitalize( string ) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function empty( data ) {

    if (typeof(data) == 'number' || typeof(data) == 'boolean') return false
    if (typeof(data) == 'undefined' || data === null) return true
    if (typeof(data.length) != 'undefined') return data.length == 0

    let count = 0
    for (let i in data) {
        if (data.hasOwnProperty(i)) count++
    }
    return count == 0

}
function readRights( coll ) {

    if( coll !== 'user' && coll !== 'resource' ) {
        const readRights = store.state.resources.find( resource => resource.name === coll ).read
        const accessRights = store.state.logged.sec_lv
        if (accessRights < readRights || accessRights === readRights) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }

}
function writeRights( coll, data ) {
    const accessRights = store.state.logged.sec_lv
    if(coll === 'resource' && accessRights === '9'  || coll === 'user' && accessRights === '9' ) {
        bus.$emit('toast', 'No Write permissions: Your on a special guest account, I guess your someone who has an interesst in my work! Please feel free to look around.' )
        setTimeout( () => { bus.$emit('toast', '' ) }, 8000 )
        API.get( `${coll}` )
        return false
    } else if( coll !== 'resource') {
        const writeRights = store.state.resources.find( resource => resource.name === coll ).write
        if (accessRights === '9') {
           bus.$emit('toast', 'No Write permissions: Your on a special guest account, I guess your someone who has an interesst in my work! Please feel free to look around.' )
           setTimeout( () => { bus.$emit('toast', '' ) }, 8000 )
           return false
        } else if (accessRights <= writeRights ) {
            return true
        } else {
            bus.$emit('toast', 'Your security clearance is at level ' + accessRights + '. Write persmission for this dataset is at level ' + writeRights + '. Please contact administrator to grant you higher security level to write to this dataset.' )
            setTimeout( () => { bus.$emit('toast', '' ) }, 8000 )
            return false
        }
    } else {
        return true
    }
}
function validate( coll, data ) {
    const self              = this
    const schema            = store.state.resources.find( resource => resource.name === coll )
    let valid               = true
    let err                 = []

    if( !schema ) return true

    Object.keys( data ).forEach( key => {
        if( key !== '_id' && key !== '__v' ) {

            const field = schema.fields.find( field => field.name === key )

            if( field.required )
                if( empty( data[key] ) ) {
                    valid = false
                    err.push(key.split("_")[0] + ' must be filled out')
                }

            if( field.unique )
                if( duplicate( coll, data, key ) ) {
                    valid = false
                    err.push(key.split("_")[0] + ' must be unique')
                }
        }

    })

    if ( !valid ) {
        bus.$emit('toast', err.join(', ') )
        setTimeout( () => { bus.$emit('toast', '' ) }, 4000 )
        store.dispatch('setLoading', false)
        return
    }

    if ( valid ) {
        return true
    }

}
function duplicate( coll, data, key ) {

    if(data[key] === "" || data[key] === null) return false

    let collection = store.getters[coll+'s']

    var removeSelfFromList = collection.filter( item => {
        return item._id !== data._id
    })

    var fieldsData = removeSelfFromList.map( item => {
        if(item[key] !== null) return item[key].toLowerCase()
    })

    var duplicate = fieldsData.some( name => {
        return name === data[key].toLowerCase()
    })
    return duplicate
}
