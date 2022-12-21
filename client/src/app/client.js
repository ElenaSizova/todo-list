// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client(endpoint, { body, method, ...customConfig } = {}) {
    const headers = { 'Content-Type': 'application/json' }

    const config = {
        method,
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config.body = new URLSearchParams(body)
        config.headers = {'Content-Type':'application/x-www-form-urlencoded'}
    }

    let data
    try {
        const response = await fetch(endpoint, config)
        const data = await response.json()

        if (response.ok) {
            return data
        }
        throw new Error(response.statusText)
    } catch (err) {
        return Promise.reject(err.message ? err.message : data)
    }
}

client.get = function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, body, method: 'POST' })
}

client.put = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, body, method: 'PUT' })
}