import axios from "axios";
import { defineStore } from "pinia";
import { supabase } from '../lib/supabaseClient'

export const useDataStore = defineStore('data', {
    state(){
        return{
            categories: {},
            config: {},
            items: {},
            homeItems : {},
            loading: false,
            error: null,
            cart: [],
            cartTotal: 0,
            orders : [],
            userId : '',
            pageStorage : 'Food Ordering'
        }
    },

    actions:{
        addItemInCart(key){
            //console.log('add: ' + key);
            this.cart[key]['quantity'] = this.cart[key]['quantity'] + 1;
            this.cartTotal += this.cart[key]['item']['price'];
        },

        removeItemInCart(key){
            console.log('remove: ' + key);

            this.cart[key]['quantity'] = this.cart[key]['quantity'] - 1;
            this.cartTotal -= this.cart[key]['item']['price'];

            //console.log(this.cart[key]);
            //console.log('deduct: ' + this.cart[key]['price']);

            if(this.cart[key]['quantity'] <= 0){
                this.cart.splice(key, 1);

                //console.log(this.cart);
            }
        },

        addToCart(item){
            const current_cart = this.cart;

            let already_in_cart = false;
            for(let key in current_cart){
                if(current_cart[key]['item']['id'] == item.id){
                    current_cart[key]['quantity'] = current_cart[key]['quantity'] + 1;
                    this.cartTotal += item.price;
                    already_in_cart = true;

                    //console.log("test1");
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
            //console.log('fetch categories');

            try{
                const { data, error } = await supabase
                .from('subcategories')
                .select('*')
                .order('name', { ascending: true })

                for(let key in data){
                    const { data:imageurl } = supabase
                    .storage
                    .from(this.pageStorage)
                    .getPublicUrl(data[key]['image'])

                    data[key]['image_url'] = imageurl.publicUrl
                }

                this.categories = data

                //console.log(this.categories)
            }catch(error){
                console.log(error);
            }
        },

        async fetchConfigAPI(){
            this.loading = true;
            //console.log('fetch config');

            try{
                const { data, error } = await supabase
                .from('config')
                .select('*')

                for(let key in data){
                    //console.log(data[key]['variable'])
                    this.config[data[key]['variable']]= {
                        'str' : data[key]['value_str'],
                        'int' : data[key]['value_int'],
                    }
                }

                //console.log(this.config)

            }catch(error){
                console.log(error);
            }
        },

        async fetchItemsAPI(){
            this.loading = true;
            //console.log('fetch items');

            try{
                const { data, error } = await supabase
                .from('items')
                .select('*')
                .order('name', { ascending: true })

                for(let key in data){
                    const { data:imageurl } = supabase
                    .storage
                    .from(this.pageStorage)
                    .getPublicUrl(data[key]['image'])

                    data[key]['image_url'] = imageurl.publicUrl
                }

                this.items = data

                console.log(this.items)
            }catch(error){
                console.log(error);
            }
        },

        getCategories(){
            return this.categories;
        },

        getItemsByCategory(id_category = ''){
            //console.log(id_category)

            //console.log(this.items)
            if(id_category == 'all'){
                return this.items;
            }else{
                const items = this.items.filter(t => t.category == id_category);
                return items;
            }
        },
        
        getItemById(id){
            //console.log(this.items.filter(t => t.id == id));
            return this.items.filter(t => t.id == id);
        },

        updateHomeItems(id_category){
            const filteredItems = this.getItemsByCategory(id_category);
            this.homeItems = filteredItems;
            //return filteredItems;

        }
    },

});