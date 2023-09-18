<template>
    <div id="back-container">
        <div id="total">Total: ₱ {{ cartTotal }}.00</div>
        <a @click="redirectToPreviousPage()">Back</a>
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

    methods: {
        redirectToPreviousPage(){
            this.$router.go(-1)
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
div#back-container {
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
#back-container a {
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