import {createFetch} from './fetchS.js'

const containerProducts = document.querySelector('.container-products')
const searchProduct = document.getElementById('search')

let url = 'http://localhost:3000/products'
createFetch('GET', url)
.then(data => renderProducts(data))
.catch(e => console.log(e))


function renderProducts(data) {
    data.forEach(product => {
        const divProducts = document.createElement('div')
        divProducts.classList.add('div-products')

        const img = document.createElement('img')
        img.classList.add('product-img')
        img.setAttribute('src', product.img)

        divProducts.appendChild(img)


        const productName = document.createElement('h1')
        productName.classList.add('product-name')
        productName.textContent = product.name

        divProducts.appendChild(productName)


        const pDescription = document.createElement('p')
        pDescription.classList.add('product-description')
        pDescription.textContent = product.description

        divProducts.appendChild(pDescription)


        const price = document.createElement('p')
        price.classList.add('price')
        price.textContent = `R$${product.price}`

        const a = document.createElement('a')
        a.setAttribute('href', `second.html?id=${product.id}`)
        a.classList.add('link')
        a.textContent = 'Buy'

        divProducts.appendChild(price)
        divProducts.appendChild(a)

        containerProducts.appendChild(divProducts)
    });
    searchProduct.addEventListener('input', function(){
        const name = this.value
        if(name.length <= 0) {
        } else {
            containerProducts.innerHTML = ''
            renderProducts(data.filter(data => data.name.indexOf(name) >=0))
        }
    })
}