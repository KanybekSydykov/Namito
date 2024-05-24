const _URI = 'https://namito.kg/api/'; 

export const ENDPOINTS = {
    getMainPage: () => _URI + 'main-page/',
    getAdvertisements: () => _URI + 'advertisement/',
    getAboutPage: () => _URI + 'about-us/',
    getDeliveryPage: () => _URI + 'delivery/',
    getNewProducts: () => _URI + 'new-products/',
    getAllProducts : () => _URI + 'products/',
    getLayoutData : () => _URI + 'layout/',
    getCategoryData: (slug) => _URI + `category/${slug}/`,
    getProductData: (id) => _URI + `products/${id}/`,
    getSimilarProducts: (id) => _URI + `products/${id}/similar/`,
    postLogin: () => _URI + 'users/login/',
}