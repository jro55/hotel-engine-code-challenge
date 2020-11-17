const axios = require('axios');

export async function makeRequest(method, url, body, params) {
    const requestData = {
        method: method,
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 15000,
    };
    if (body) requestData.data = body;
    if (params) requestData.params = params;
    try {
        const response = await axios(requestData);
        if (response.status === 204) return null;
        if (typeof response.data !== 'undefined' && response.data !== null) {
            return response.data;
        }
        throw new Error('No data was returned from the request.');
    } catch (error) {
        // log error here
        throw error;
    }
}