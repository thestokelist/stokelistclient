const queryString = require('query-string');

const apiUrl = process.env.REACT_APP_API_URL

const handleErrors = async (response,method) => {
    const isOK = await !response.ok
    if (isOK) {
        console.log(`Error occured whilst attempting ${method} to ${response.url}: ${response.statusText}`);
        response = null
    }
    return response
}

export const apiPost = async (endpoint, data) => {
    let response = await fetch(apiUrl+endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    response = await handleErrors(response,'POST')
    return response
}

export const authApiGet = async endpoint => {
    let response = await fetch(apiUrl+endpoint, {
        method: 'GET',
        credentials: 'include'
    })
    response = await handleErrors(response,'GET')
    return response
}

export const apiGet = async (endpoint, params) => {
    console.log(endpoint)
    let response = await fetch(`${apiUrl}${endpoint}?${queryString.stringify(params)}`, {
        method: 'GET'
    })
    response = await handleErrors(response,'GET')
    return response
}

export const authApiDelete = async (endpoint, data) => {
    let response = await fetch(apiUrl+endpoint, {
        method: 'DELETE',
        credentials: 'include'
    })
    response = await handleErrors(response,'GET')
    return response

}

