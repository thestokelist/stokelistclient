const queryString = require('query-string');

const apiUrl = process.env.REACT_APP_API_URL

const standardHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const handleErrors = async (response,method) => {
    const isOK = await !response.ok
    if (isOK) {
        console.log(`Error occured whilst attempting ${method} to ${response.url}: ${response.statusText}`);
        response = null
    }
    return response
}

const tokenHeaders = token => {
    return Object.assign(standardHeaders, {'Authorization': `Bearer ${token}`});
}

export const apiPost = async (endpoint, data) => {
    let response = await fetch(apiUrl+endpoint, {
        method: 'POST',
        headers: standardHeaders,
        body: JSON.stringify(data),
    })
    response = await handleErrors(response,'POST')
    return response
}

export const authApiGet = async (endpoint, token) => {
    let response = await fetch(apiUrl+endpoint, {
        method: 'GET',
        headers: tokenHeaders(token),
    })
    response = await handleErrors(response,'GET')
    return response
}

export const apiGet = async (endpoint, params) => {
    console.log(endpoint)
    let response = await fetch(`${apiUrl}${endpoint}?${queryString.stringify(params)}`, {
        method: 'GET',
        headers: standardHeaders,
    })
    response = await handleErrors(response,'GET')
    return response
}

export const authApiDelete = async (endpoint, token) => {
    let response = await fetch(apiUrl+endpoint, {
        method: 'DELETE',
        headers: tokenHeaders(token),
    })
    response = await handleErrors(response,'DELETE')
    return response
}

export const authApiPut = async (endpoint, data, token) => {
    let response = await fetch(apiUrl+endpoint, {
        method: 'PUT',
        headers: tokenHeaders(token),
        body: JSON.stringify(data),
    })
    response = await handleErrors(response,'PUT')
    return response

}

export const authApiPatch = async (endpoint, token) => {
    let response = await fetch(apiUrl+endpoint, {
        method: 'PATCH',
        headers: tokenHeaders(token),
    })
    response = await handleErrors(response,'PATCH')
    return response

}

