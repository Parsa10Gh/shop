let allProducts = [
    { id: 1, title: 'Album 1', price: 5, img: 'Images/Album 1.png', count: 1 },
    { id: 2, title: 'Album 2', price: 15, img: 'Images/Album 2.png', count: 1 },
    { id: 3, title: 'Album 3', price: 20, img: 'Images/Album 3.png', count: 1 },
    { id: 4, title: 'Album 4', price: 100, img: 'Images/Album 4.png', count: 1 },
    { id: 5, title: 'Coffee', price: 5, img: 'Images/Cofee.png', count: 1 },
    { id: 6, title: 'Shirt', price: 50, img: 'Images/Shirt.png', count: 1 },
]

let userBasket = []

let $ = document
const shopItemsContainer = $.querySelector('.shop-items')
const bastekProductsContainer = $.querySelector('.cart-items')
const removeAllProductsBtn = $.querySelector('#remove-all-products')
const cartTotalPriceElem = $.querySelector('.cart-total-price')

allProducts.forEach(function (product) {
/*     let productContainer = $.createElement('div')
    productContainer.classList.add('shop-item')

    let productTitleSpan = $.createElement('span')
    productTitleSpan.classList.add('shop-item-title')
    productTitleSpan.innerHTML = product.title

    let productImageElem = $.createElement('img')
    productImageElem.classList.add('shop-item-image')
    productImageElem.setAttribute('src', product.img)

    let productDetailsContainer = $.createElement('div')
    productDetailsContainer.classList.add('shop-item-details')

    let productPriceSpan = $.createElement('span')
    productPriceSpan.innerHTML = product.price
    productPriceSpan.classList.add('shop-item-price')

    let prodcutAddButton = $.createElement('button')
    prodcutAddButton.innerHTML = 'ADD TO CART'
    prodcutAddButton.className = 'btn btn-primary shop-item-button'
    prodcutAddButton.addEventListener('click', function () {
        addProductToBasketArray(product.id)
    })

    productDetailsContainer.append(productPriceSpan, prodcutAddButton)
    productContainer.append(productTitleSpan, productImageElem, productDetailsContainer)
    shopItemsContainer.append(productContainer) */
    shopItemsContainer.insertAdjacentHTML('beforeend','<div class="shop-item"><span class="shop-item-title">'+product.title+'</span><img class="shop-item-image" src="'+product.img+'" /><div class="shop-item-details"><span class="shop-item-price">'+product.price+'</span><button class="btn btn-primary shop-item-button" type="button" onclick=" addProductToBasketArray('+product.id+')">ADD TO CART</button></div></div>')

})



function addProductToBasketArray (productId) {

    let mainProduct = allProducts.find(function (product) {
        return product.id === productId
    })

    userBasket.push(mainProduct)

    basketProductsGenerator(userBasket)
    calcTotalPrice(userBasket)

    console.log(userBasket);
}

let basketProductFragment = $.createDocumentFragment();

function basketProductsGenerator (userBasketArray) {
    bastekProductsContainer.innerHTML = ''

    userBasketArray.forEach (function (product) {

        let basketProductContainer = $.createElement('div')
        basketProductContainer.classList.add('cart-row')

        let basketProductDetailsContainer = $.createElement('div')
        basketProductDetailsContainer.className = 'cart-item cart-column'

        let basketProductImg = $.createElement('img')
        basketProductImg.setAttribute('src', product.img)
        basketProductImg.setAttribute('width', "100")
        basketProductImg.setAttribute('height', "100")
        basketProductImg.classList.add('cart-item-image')

        let basketProductTitleSpan = $.createElement('span')
        basketProductTitleSpan.classList.add('cart-item-title')
        basketProductTitleSpan.innerHTML = product.title

        basketProductDetailsContainer.append(basketProductImg, basketProductTitleSpan)

        let basketProductPriceSpan = $.createElement('span')
        basketProductPriceSpan.className = 'cart-price cart-column'
        basketProductPriceSpan.innerHTML = product.price

        let basketProductInputsContainer = $.createElement('div')
        basketProductInputsContainer.className = 'cart-quantity cart-column'

        let basketProductInput = $.createElement('input')
        basketProductInput.className = 'cart-quantity-input'
        basketProductInput.value = product.count
        basketProductInput.setAttribute('type', 'number')
        basketProductInput.addEventListener('change', function () {
            updateProductCount(product.id, basketProductInput.value)
        })

        let basketProductRemoveBtn = $.createElement('button')
        basketProductRemoveBtn.className = 'btn btn-danger'
        basketProductRemoveBtn.innerHTML = 'Remove'
        basketProductRemoveBtn.addEventListener('click', function () {
            removeProductFromBasket(product.id)
        })

        basketProductInputsContainer.append(basketProductInput, basketProductRemoveBtn)

        basketProductContainer.append(basketProductDetailsContainer, basketProductPriceSpan, basketProductInputsContainer)

        basketProductFragment.append(basketProductContainer)
        // bastekProductsContainer.insertAdjacentHTML('beforeend','<div class="cart-row"><div class="cart-item cart-column"><img class="cart-item-image" src="'+product.img+'" width="100" height="100"><span class="cart-item-title">'+product.title+'</span></div><span class="cart-price cart-column">'+product.price+'</span><div class="cart-quantity cart-column"><input class="cart-quantity-input" onchange="updateProductCount('+product.id+','+ basketProductInput.value+')" type="number" value="1"><button class="btn btn-danger" onclick="removeProductFromBasket('+product.id+')" type="button">REMOVE</button></div></div>')

    }) 
    bastekProductsContainer.append(basketProductFragment)

    // bastekProductsContainer.insertAdjacentHTML('beforeend','<div class="cart-row"><div class="cart-item cart-column"><img class="cart-item-image" src="'+product.img+'" width="100" height="100"><span class="cart-item-title">'+product.title+'</span></div><span class="cart-price cart-column">'+product.price+'</span><div class="cart-quantity cart-column"><input class="cart-quantity-input" onchange="updateProductCount('+product.id+','+ basketProductInput.value+')" type="number" value="1"><button class="btn btn-danger" onclick="removeProductFromBasket('+product.id+')" type="button">REMOVE</button></div></div>')
}

function removeProductFromBasket (productId) {

    userBasket = userBasket.filter (function (product) {
        return product.id !== productId
    })

    calcTotalPrice(userBasket)
    basketProductsGenerator(userBasket)
}

removeAllProductsBtn.addEventListener('click', function () {
    userBasket = []
    basketProductsGenerator(userBasket)
    calcTotalPrice(userBasket)
    alert('Thank you for your purchase !')

})

function calcTotalPrice (userBasketArray) {
    let totalPriceValue = 0

    userBasketArray.forEach(function (product) {
        totalPriceValue += product.count * product.price
    })

    cartTotalPriceElem.innerHTML = totalPriceValue
}

function updateProductCount (productId, newCount) {
    console.log("product id: " + productId + ' new count: ' + newCount);

    userBasket.forEach(function (product) {
        if (product.id === productId) {
            product.count = newCount
        }
    })
    calcTotalPrice(userBasket)
}