(function getProductInfo() {
    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Product',
        method: 'GET',
        
    });

    promise.then(function(res) {
        console.log(res.data.content);

        renderProductItem(res.data.content);
    })

    promise.catch(function(err) {
        console.log(err);
    })
})();

// Render product 
function renderProductItem(arrProduct) {
    var contentHTML = '';

    for (var i = 0; i < arrProduct.length; i++) {
        var product = arrProduct[i];

        contentHTML += `
            <div class="product-item">
                <div class="product-img">
                    <img class="w-100" src="${product.image}" />
                </div>
                <div class="product-desc">
                    <h5>${product.name}</h5>
                    <p>${product.description.length > 50 ? product.description.substr(0, 50) + " ..." : product.description}</p>
                </div>
                <div class="product-btn">
                    <a href="./detail.html?id=${product.id}" class="btn-buy">Buy now</a>
                    <a href="#" class="btn-price">${product.price}$</a>
                </div>
            </div>
        `;
    }

    document.querySelector('#productList').innerHTML = contentHTML;
}