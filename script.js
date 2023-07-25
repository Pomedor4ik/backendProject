const baseUrl = "http://localhost:4000/products"

const productsListEl = document.querySelector('.productsList')
const productsCountEl = document.querySelector('#productsCount')


const formCreateEl = { 
    name: document.querySelector('#formCreate-name'),
    quantity: document.querySelector('#formCreate-quantity'),
    price: document.querySelector('#formCreate-price'),
    description: document.querySelector('#formCreate-description'),
    btn: document.querySelector('#formCreate-btn')
}

let products = []
const renderProducts = () => { 
    productsListEl.innerHTML = ``
    products.forEach((productItem) => { 
        productsListEl.innerHTML += ` 
        <div>
            <hr>
                <p>id: ${productItem.id}</p>
                <p>${productItem.name}</p>
                <p>${productItem.price}</p>
                <button 
                    product-id="${productItem.id}" 
                    class="btn-delete"
                >Delete</button>
            <hr>
        </div>
        `
    })
    const btnsDelete = document.querySelectorAll('.btn-delete')
    btnsDelete.forEach((btnItem) => { 
        btnItem.addEventListener("click", () => {
            const productId = btnItem.getAttribute("product-id")
            axios.delete(`${baseUrl}/delete?id=${productId}`)
                .then(()=> {
                    getProducts()
                })
        })
        
    })
}
const getCount = () => { 
    axios.get(`${baseUrl}/count`)
        .then((res) => {
            console.log(res.data)
            productsCountEl.innerHTML = `Total products: ${res.data.count}`
        })
}
const getProducts = () => {
    getCount()
//request to get products array
    axios.get(`${baseUrl}/get-all`)
        .then((res)=> {
            products = res.data
            renderProducts()
        })
}

getProducts()

formCreateEl.btn.addEventListener("click", () => { 
    const formData = { 
        name: formCreateEl.name.value,
        quantity: formCreateEl.quantity.value,
        price: formCreateEl.price.value,
        description: formCreateEl.description.value
    }
    console.log(formData)
    axios.post(`${baseUrl}/create`, {...formData})
        .then((res) => {
            console.log(res.data)
            getProducts()
        })
})
