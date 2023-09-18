<template>
    <div id="view-cart-container">
        <div id="total">Total: ₱ {{ cartTotal }}.00</div>
        <router-link to="/cart">View Cart</router-link>
    </div>
</template>

<script>
import { useDataStore } from '../stores/dataStore';

export default {
    data(){
        return {
            dataStore: useDataStore()
        }
    },

    computed: {
        cartTotal(){
            return this.dataStore.cartTotal; 
        }
    }
}
</script>

<style scoped>
div#view-cart-container {
    overflow: auto;
    position: fixed;
    bottom: 0;
    background-color: rgba(0,0,0, 0.8);
    width: 100%;
    display: block;
    padding: 27px;
    padding-top: 16px;
    padding-bottom: 16px;
}
#view-cart-container a {
    color: #000;
    width: 200px;
    display: block;
    height: 65px;
    text-align: center;
    padding-top: 9px;
    border-radius: 15px;
    background-color: #fff;
    font-size: 27px;
    float: right;
}
div#total {
    width: 300px;
    font-size: 35px;
    color: #fff;
    float: left;
}
</style>