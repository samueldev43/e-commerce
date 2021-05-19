import {createFetch} from './fetchS.js'

const container = document.querySelector('.container')

const zipCode = document.getElementById('zip')
const delivery = document.getElementById('delivery')
const city = document.getElementById('city')
const state = document.getElementById('state')


let urlC = 'http://localhost:3000/products'
createFetch('GET', urlC)
.then(response => render(response))
.catch(err => console.log(err))

let url = window.location.search
let urlParams = new URLSearchParams(url)
let id = parseInt(urlParams.get('id'))

function render(data) {
    const divCartProduct = document.createElement('div')
    divCartProduct.classList.add('product')

    const imgC = document.createElement('img')
    imgC.classList.add('product-img')
    imgC.setAttribute('src', `${data.find(data => data.id === id).img}`)

    divCartProduct.appendChild(imgC)

    const nameProduct = document.createElement('h1')
    nameProduct.classList.add('cart-name')
    nameProduct.textContent = `${data.find(n => n.id === id).name}`

    divCartProduct.appendChild(nameProduct)

    const pDescription = document.createElement('p')
    pDescription.classList.add('p-description')
    pDescription.textContent = `${data.find(descrip => descrip.id === id).description}`

    divCartProduct.appendChild(pDescription)

    const pricep = document.createElement('p')
    pricep.classList.add('p-price')
    pricep.textContent = `total payable: R$${data.find(price => price.id === id).price}`

    divCartProduct.appendChild(pricep)
    container.appendChild(divCartProduct)
}

zipCode.addEventListener('input', function() {
    const val = this.value

    let urlZip = `https://viacep.com.br/ws/${val}/json/`
    createFetch('GET', urlZip)
    .then(response => fn(response))
    .catch(e => e)

    function fn( data ) {
        delivery.value = data.bairro
        city.value = data.localidade
        state.value = data.uf
    }
})