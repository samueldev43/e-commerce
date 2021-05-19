export async function createFetch(method, url, data = null) {

    try {
        return await fetch(url, {
            method,
            body: data
        })
        .then(response => ifErr(response))
        .then(response => response.json())
    } catch(err) {
        console.log(err)
    }

    function ifErr(response) {
        if(!response.ok) {
            throw Error('soemthing just went wrong')
        }
        return response
    }
}