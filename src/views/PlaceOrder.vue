<template>
    <div id="message">
        Please get the printed copy of your order below.
    </div>
    <router-link to="/home/all" id="order-again">Order Again</router-link>
</template>
<script>
import axios from "axios";
import { useDataStore } from '../stores/dataStore';

    export default{
        data(){
            return{
                dataStore : useDataStore()
            }
        },

        created(){

        },
        async mounted(){
            const cart = this.dataStore.cart;

            const postData = {
                'name' : 'kristian yeah'
            }

            this.dataStore.submitOrder();

        }
    }
</script>
<style scoped>
div#message{
    color: #fff !important;
    text-align: center;
    margin-top: 241px;
    font-size:  30px;
}
a#order-again {
    font-size: 34px;
    color: #fff;
    background-color: rgba(0,0,0,0.8);
    border-radius: 75px;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    width: 271px;
    text-align: center;
    height: 71px;
    line-height: 63px;
    bottom: 112px;
}
</style> 