export const api_host = import.meta.env.VITE_API_HOST
export const grabit_host = import.meta.env.VITE_GRABIT_HOST

const auth_endpoints = {
    login: 'account/admin/token/login/',
    logout: 'auth/token/logout/',
}

const api_base_endpoints = {
    dashboard_stats: 'api/homepage/stats/',
    categories: 'api/categories/',
    product: 'api/product/',
    orders: 'api/orders/',
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
    unpaginated_products: '/products/unpaginated/',
    delete: '/delete/',
    addproduct: '/addproduct/',
    editproduct: '/edit/',
    groups: '/groups/',
    keyfeatures: '/keyfeatures/',
    tables: '/tables/',
    alter_stock: '/alterstock/',
    alter_status: '/alterstatus/',
}

const api_endpoints = Object.keys(api_base_endpoints).reduce((acc, key) => {
    acc[key] = `${api_host}${api_base_endpoints[key]}`;
    return acc;
}, {})

const grabit_endpoints = Object.keys(grabit_base_endpoints).reduce((acc, key) => {
    acc[key] = `${grabit_host}${grabit_base_endpoints[key]}`
    return acc;
}, {})

export { api_endpoints, auth_endpoints, grabit_endpoints, endpoint_suffixes }