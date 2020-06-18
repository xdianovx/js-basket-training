const basketBtn = document.querySelectorAll('.toBasketBtn');

basketBtn.forEach((button) => {
    button.addEventListener('click', (event) => {
        let id = event.srcElement.dataset.id;
        let price = event.srcElement.dataset.price;
        let name = event.srcElement.dataset.name;
        basket.addProduct({
            id: id,
            price: price,
            name: name
        });
    });
});

const basket = {

    products: {

    },




    addProduct(product) {
        this.addProductToObject(product);
        this.renderProductInBasket(product);
        this.renderTotalSum();
        this.addRemoveBtnsListeners();
    },

    removeProduct(event) {
        let id = event.srcElement.dataset.id;
        this.removeProductFromObject(id);
        this.removeProductFromBasket(id);

    },


    removeProductFromBasket(id) {
        let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
        if (countTd.textContent = 1) {
            countTd.parentNode.remove()
        } else {
            countTd.textContent--;
        }
    },


    removeProductFromObject(){
        if(this.products[id].count == 1){
            delete this.products[id];
        } else {
            this.products[id].count--;
        }
    },

    removeProductListener(event) {
        basket.removeProduct(event);
        basket.renderTotalSum();
    },

    addRemoveBtnsListeners() {
        let btns = document.querySelector('.productRemoveBtn');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', this.removeProductListener)
        }

    },

    renderTotalSum() {
        document.querySelector('.total').textContent = this.getTotalSum();

    },

    getTotalSum() {
        let sum = 0;
        for (let key in this.products) {
            sum += this.products[key].price * this.products[key].count;
        }
        console.log(this.products);
        return sum;
    },

    addProductToObject(product) {
        if (this.products[product.id] == undefined) {
            this.products[product.id] = {
                price: product.price,
                name: product.name,
                count: 1
            }
        } else {
            this.products[product.id].count++;
        }
    },

    renderProductInBasket(product) {
        let productExist = document.querySelector(`.productCount[data-id="${product.id}"]`);

        if (productExist) {
            productExist.textContent++;
            return;
        }

        let productRow = `
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td class="productCount" data-id="${product.id}">1</td>
                <td>
                    <i class="fas fa-trash-alt productRemoveBtn" data-id="${product.id}"></i>
                </td>
            </tr> 
        `;

        let tbody = document.querySelector('tbody');
        tbody.insertAdjacentHTML('beforeend', productRow);


    }

}
