<template>
    <router-link to="/home/all" class="order-now-button">Order Now</router-link>
    <!--<router-link to="/home/all" class="order-now-button">Test</router-link>-->
    <img :src="getWelcomeBackground" class="welcome-background"/>
</template>
<script>
import { useDataStore } from '../stores/dataStore';

export default{
    data(){
        return{
            dataStore : useDataStore(),
            imagesToPreload : [
                'https://i.ibb.co/tzK5Krc/spaghetti.png',
                'https://i.ibb.co/TcQWQNN/french-fries.jpg',
                'https://i.ibb.co/gZ9bg2T/apple-pie.jpg',
                'https://i.ibb.co/MSdbDjp/hot-fudge.png',
                'https://i.ibb.co/xj0mdVc/277564019-5197168866971224-4119571277153655248-n.png',
                'https://i.ibb.co/K9K0ZbW/Extra-Rice-e1661183825815.jpg'
            ],
            loadedImages : null
        }
    },

    methods: {
        preloadImage(){
            this.loadedImages++;

            if(this.loadedImages === this.imagesToPreload.length){

            }
        },

    },

    created(){
        this.dataStore.fetchCategoriesAPI();
        this.dataStore.fetchConfigAPI();
        this.dataStore.fetchItemsAPI();
    },

    computed: {
        getWelcomeBackground(){
            console.log(this.dataStore.config.welcome_background.str)
            return this.dataStore.config.welcome_background.str
        }
    }
}
</script> 

<style>
.order-now-button {
    width: 262px;
    height: 76px;
    display: block;
    position: absolute;
    bottom: 76px;
    left: 0;
    right: 0;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    font-size: 44px;
    font-family: emoji;
    font-weight: 400;
    background-color: rgba(0,0,0,1);
    border-radius: 124px;
}
.welcome-background {
    width: 100%;
    position: fixed;
    z-index: -100;
    height: 100%;
}
</style>