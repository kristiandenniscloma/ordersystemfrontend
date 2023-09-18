import axios from "axios";
import { defineStore } from "pinia";
import { compileScript } from "vue/compiler-sfc";

export const useDataStore = defineStore('data', {
    state(){
        return{
            categories: {},
            items: {},
            homeItems : {},
            loading: false,
            error: null,
            cart: [],
            cartTotal: 0
        }
    },

    actions:{
        async submitOrder(){
            const postData = this.cart;
            const response = await axios.post('https://foodorderingsystem-lac.vercel.app/api/v1/orders', postData)
            //const response = await axios.post('http://localhost:5000/api/v1/orders', postData)
            .then((response) => {
                // Handle the response data here
                console.log('Response:', response.data);
                console.log("order placed")
                this.cart = []
                this.cartTotal = 0
            })
            .catch((error) => {
            // Handle any errors that occurred during the request
                console.error('Error:', error);
            });
        },

        addItemInCart(key){
            console.log('add: ' + key);
            this.cart[key]['quantity'] = this.cart[key]['quantity'] + 1;
            this.cartTotal += this.cart[key]['item']['price'];
        },

        removeItemInCart(key){
            console.log('remove: ' + key);

            this.cart[key]['quantity'] = this.cart[key]['quantity'] - 1;
            this.cartTotal -= this.cart[key]['item']['price'];

            console.log(this.cart[key]);
            console.log('deduct: ' + this.cart[key]['price']);

            if(this.cart[key]['quantity'] <= 0){
                this.cart.splice(key, 1);

                console.log(this.cart);
            }
        },

        addToCart(item){
            const current_cart = this.cart;

            let already_in_cart = false;
            for(let key in current_cart){
                if(current_cart[key]['item']['id'] == item._id){
                    current_cart[key]['quantity'] = current_cart[key]['quantity'] + 1;
                    this.cartTotal += item.price;
                    already_in_cart = true;

                    console.log("test1");
                    break;
                }
            }

            if(already_in_cart == false){
                const newCartItem = {
                    'item' : item,
                    'quantity' : 1
                }

                this.cartTotal += item.price;
                this.cart.push(newCartItem);
            }

        },

        async fetchCategoriesAPI(){
            this.loading = true;

            try{
                //const response = await axios.get('https://y7g1z.wiremockapi.cloud/categories');
                const response = await axios.get('https://foodorderingsystem-lac.vercel.app/api/v1/categories/all');
                this.categories = response.data;
            }catch(error){
                console.log(error);
            }
        },

        async fetchItemsAPI(){
            this.loading = true;

            try{
                const response = await axios.get('https://foodorderingsystem-lac.vercel.app/api/v1/items/all');
                this.items = response.data;
            }catch(error){
                console.log(error);
            }
        },

        getCategories(){
            return this.categories;
        },

        getItemsByCategory(id_category = ''){
            if(id_category == 'all'){
                return this.items;
            }else{
                const items = this.items.filter(t => t.id_category == id_category);
                return items;
            }
        },
        
        getItemById(id){
            console.log(this.items.filter(t => t._id == id));
            return this.items.filter(t => t._id == id);
        },

        updateHomeItems(id_category){
            const filteredItems = this.getItemsByCategory(id_category);
            this.homeItems = filteredItems;
            //return filteredItems;

        }
    },

});