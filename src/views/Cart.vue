<template>
    <div id="cart">
        <div v-for="(i, key) in cart" class="cart-item">
            <div class="cart-item-details">
                <div class="cart-item-thumb">
                    <img :src="i.item.image" />
                </div>
                <div class="cart-item-name">
                    {{ i.item.name }}
                </div>
                <div class="cart-item-price">
                    ₱{{ i.item.price }}.00
                </div>
            </div>
            <div class="cart-item-action">
                <div class="add" @click="add(key)">+</div>
                <div class="quantity">{{ i.quantity }}</div>
                <div class="remove" @click="remove(key)">-</div>
            </div>
        </div>
    </div>
    <a href="http://127.0.0.1:5000/">Place order 2</a>
    <div id="place-holder-container">
        <router-link to="/place-order" id="place-holder">PLACE ORDER</router-link>
    </div>
    <Back></Back>
</template>

<script>
import { useDataStore } from '../stores/dataStore';
import Back from '../components/Back.vue';

export default{
    components:{
        Back
    },

    data(){
        return{
            dataStore : useDataStore(),
            cart : null
        }
    },

    mounted(){
        this.cart = this.dataStore.cart;

        console.log(this.cart);
    },

    methods: {
        add(key){
            this.dataStore.addItemInCart(key);
        },

        remove(key){
            this.dataStore.removeItemInCart(key);
        }
    }
}
</script>

<style scoped>
.cart-item-price {
    float: none !important;
}
.cart-item-name, .cart-item-price {
    color: #fff;
    font-size: 21px;
    float: left;
}
.cart-item {
    overflow: auto;
    border-bottom: 4px dashed #fff;
    padding: 24px;
    padding-top: 23px;
    background-color: rgba(0,0,0,0.8);
}
.cart-item-thumb {
    float: left;
    margin-right: 30px;
}
.cart-item-details {
    width: auto;
    float: left;
}
.cart-item-thumb img {
    width: 173px;
}
.add, .quantity, .remove {
    font-size: 29px;
    color: #000;
    background-color: #fff;
    width: 45px;
    height: 45px;
    float: left;
    text-align: center;
    line-height: 39px;
    border-radius: 4px;
    margin-right: 14px;
}
.cart-item-action {
    float: right;
    margin-top: 43px;
    width: 245px;
    margin-left: 43px;
}
div#place-holder-container {
    background-color: rgba(0,0,0,0.6);
    padding: 28px;
}
a#place-holder {
    color: #000;
    background-color: #fff;
    padding: 15px;
    font-size: 24px;
    border-radius: 4px;
    margin: 0 auto;
    display: block;
    width: 191px;
    text-align: center;
    line-height: 30px;
    height: 60px;
}
</style>