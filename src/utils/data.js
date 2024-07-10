export const api_host = 'http://127.0.0.1:8000/';
export const grabit_host = 'http://127.0.0.1:7000/';

const api_base_endpoints = {
    categories: 'api/categories/',
    products: 'api/products/',
    tags: 'api/t/',
}

const grabit_base_endpoints = {
    get_product: 'product/data',
    search_product: 'product/search',
    fetch_img: 'product/getimage',
}

const endpoint_suffixes = {
    update_table: '/tables/update/',
    products: '/products/',
    addproduct: '/addproduct/',
}

const api_endpoints = Object.keys(api_base_endpoints).reduce((acc, key) => {
    acc[key] = `${api_host}${api_base_endpoints[key]}`;
    return acc;
}, {})

const grabit_endpoints = Object.keys(grabit_base_endpoints).reduce((acc, key) => {
    acc[key] = `${grabit_host}${grabit_base_endpoints[key]}`
    return acc;
}, {})

export { api_endpoints, grabit_endpoints, endpoint_suffixes }