<template>
    <div id="view-cart-container">
        <div id="total">Total: ₱ {{ cartTotal }}.00</div>
        <router-link to="/cart" id="add-to-cart">View Cart</router-link>
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
    background-color: crimson;
    width: 100%;
    display: block;
    padding: 27px;
    padding-top: 11px;
    padding-bottom: 11px;
    margin-top: 20px;
}
#view-cart-container a {
    color: #000;
    width: 152px;
    display: block;
    height: 51px;
    text-align: center;
    padding-top: 7px;
    border-radius: 100px;
    background-color: gold;
    font-size: 23px;
    float: right;
}
div#total {
    width: 300px;
    font-size: 28px;
    color: #fff;
    float: left;
}
</style>