const products = [
    {
        category: 'Продукты',
        idCategory: 'category1',
        list: [
            {
                productName: 'Мясо',
                idProduct: '1',
                price: '150',
            },
            {
                productName: 'Рыба',
                idProduct: '2',
                price: '280',
            },
            {
                productName: 'Овощи',
                idProduct: '3',
                price: '70',
            },
        ]
    },
    {
        category: 'Одежда',
        idCategory: 'category2',
        list: [
            {
                productName: 'Рубашки',
                idProduct: '1',
                price: '800',
            },
            {
                productName: 'Брюки',
                idProduct: '2',
                price: '50',
            },
            {
                productName: 'Туфли',
                idProduct: '3',
                price: '50',
            },
        ]
    },
    {
        category: 'Техника',
        idCategory: 'category3',
        list: [
            {
                productName: 'Телевизоры',
                idProduct: '1',
                price: '16000',

            },
            {
                productName: 'Телефоны',
                idProduct: '2',
                price: '45000',
            },
            {
                productName: 'Пылесосы',
                idProduct: '3',
                price: '9000',
            },
        ]
    }
];

const categoryBlock = document.querySelector('.category_block');
const productBlock = document.querySelector('.product_block');
const specificationBlock = document.querySelector('.specification_block');

function creatingCategoriesList (parentBlock) {
    parentBlock.insertAdjacentHTML('beforeend', `<ul class="category_list"></ul>`);
    const categoryList = document.querySelector('.category_list');
    for (let el of products){
        categoryList.insertAdjacentHTML('beforeend', `<li class="category_element" id="${el.idCategory}"> ${el.category}</li>`);
    }
}

function eventCreatingProductList (event) {
    if (Array.from(event.target.classList).includes("category_element")){
        productBlock.innerHTML = '';
        specificationBlock.innerHTML = '';
        productBlock.dataset.idCategory = event.target.id;
        let productList = '';
        const requestedCategories = products.find(element => element.idCategory === (event.target.id)).list;
        for (let element of requestedCategories) {
            productList += `<div class='product_card' id='${element.idProduct}'>  
                <h2 class="product_card__title">${element.productName}</h2>  
                <p class="product_card__price"> ${element.price} грн.</p></div>`
        }
        productBlock.insertAdjacentHTML('beforeend', productList);
        return requestedCategories;
    }
}

function eventCreatingSpecificationProduct(event) {
    if (Array.from((event.target.parentNode).classList).includes("product_card")){
        specificationBlock.innerHTML = '';
        let requestedCategories = products.find(element => element.idCategory === (productBlock.dataset.idCategory)).list;
        let requestedProduct = requestedCategories.find(element => element.idProduct === ((event.target.parentElement).id));
        let specification = `<h2 class="specification_block__title">${requestedProduct.productName}</h2>  
                <p class="specification_block__price"> ${requestedProduct.price} грн.</p> 
                <p class="specification_block__specification"> 
                <button class="specification_block__button"> BUY </button>`;
        specificationBlock.insertAdjacentHTML('beforeend', specification);
        const btn = document.querySelector('.specification_block__button');
        btn.addEventListener('click', message);
    }
}

function message (){
    document.body.insertAdjacentHTML('afterbegin', `<div class="message_block"> Товар Преобретен </div>`);
    let messageBlock = document.querySelector('.message_block');
    setTimeout(()=>{messageBlock.remove();
        specificationBlock.innerHTML = "";
        productBlock.innerHTML = '';}, 2000);
}
creatingCategoriesList (categoryBlock);
categoryBlock.addEventListener('click', eventCreatingProductList);
productBlock.addEventListener('click', eventCreatingSpecificationProduct);