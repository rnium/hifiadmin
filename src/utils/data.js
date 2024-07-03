export const api_host = 'http://127.0.0.1:8000/';

const api_base_endpoints = {
    categories: 'api/categories/',
    products: 'api/products/',
}

const endpoint_suffixes = {
    update_table: '/tables/update/'
}

const api_endpoints = Object.keys(api_base_endpoints).reduce((acc, key) => {
    acc[key] = `${api_host}${api_base_endpoints[key]}`;
    return acc;
}, {})

export { api_endpoints, endpoint_suffixes }