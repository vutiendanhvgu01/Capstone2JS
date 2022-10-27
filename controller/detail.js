var token_cybersoft ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjIzLzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDgwMDAwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg0OTQ3NjAwfQ.u471oZWr9EMgIb7oeyuaxfi8spgAgUuTkUHYSS9pBWg'

function getProductDetail(){
    var urlParams = new URLSearchParams(window.location.search)
    console.log(urlParams.get('id'))
    var id = urlParams.get('id')
    var promise = axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=1`,
        method: 'GET',
        headers:{
            TokenCyberSoft: token_cybersoft
        }
        
    })
    promise.then(function(res){
        console.log(res.data.content)
        var product = res.data.content
        document.getElementById('product-name').innerHTML = product.name
        document.getElementById('product-description').innerHTML = product.description
        document.getElementById('product-prize').innerHTML = `${product.price}$`
        document.getElementById('img-product').src = product.image
        renderAvailableSize(product.size)
    })
    promise.catch(function(err){
        console.log(err)
    })
}
getProductDetail()
function renderAvailableSize(arrSize){
    let content =''
    for(let i = 0 ; i<arrSize.length;i++){
        let product = arrSize[i]
        content += `
        <button style="display: inline-block; width: 50px; height: 50px; border:none; background-color: #CCCCCC; font-size: 24px; font-weight: 600; margin-right: 10px;">${product}</button>
        `
    }
    document.querySelector('#size-product').innerHTML = content

}
function increaseQuantity(){
    let quantity = document.querySelector('#quantity').value
    quantity = Number(quantity)
    quantity++
    document.querySelector('#quantity').value=quantity
}
function decreaseQuantity(){
    let quantity = document.querySelector('#quantity').value
    quantity = Number(quantity)
    quantity--
    if(quantity<=0){
        document.getElementsByClassName("minus").disable = True
    }
    document.querySelector('#quantity').value=quantity
    
}

