<template>
    <transition name="slide-fade">
        <div v-if="show" >
            <div id="cart">
                <div v-for="(i, key) in cart" class="cart-item">
                    <router-link :to="'/item/' + i.item.id" class="cart-item-details" >
                        <div class="cart-item-thumb">
                            <img :src="i.item.image_url" />
                        </div>
                        <div class="col2">
                            <div class="cart-item-name">
                                {{ i.item.name }}
                            </div>
                            <div class="cart-item-price">
                                ₱{{ i.item.price }}.00
                            </div>
                        </div>
                    </router-link>
                    <div class="cart-item-action">
                        <div class="add" @click="add(key)">+</div>
                        <div class="quantity">{{ i.quantity }}</div>
                        <div class="remove" @click="remove(key)">-</div>
                    </div>
                </div>
            </div>
            <div id="place-holder-container">
                <router-link to="/place-order" id="place-holder">PLACE ORDER</router-link>
            </div>
            <Back propsPrevLink="/home/all"></Back>
        </div>
    </transition>
</template>

<script>
import { useDataStore } from '../stores/dataStore';
import Back from '../components/Back.vue';

export default{
    components:{
        Back
    },

    props: {

    },

    data(){
        return{
            dataStore : useDataStore(),
            cart : null,
            show: false,
            prevLink : ''
        }
    },

    mounted(){
        this.cart = this.dataStore.cart
        console.log(this.cart)
        this.show = !this.show
    },

    methods: {
        add(key){
            this.dataStore.addItemInCart(key)
        },

        remove(key){
            this.dataStore.removeItemInCart(key)
        }
    },

    beforeRouteEnter(to, from, next) {
    // Add the 'hide-scroll' class to the body when entering the page
        document.body.classList.add('hide-scroll');
        //document.body.classList.add('hide-inner-scrolls');
        next();
    },
    beforeRouteLeave(to, from, next) {
        // Remove the 'hide-scroll' class from the body when leaving the page
        document.body.classList.remove('hide-scroll');

        next();
    },

}
</script>

<style scoped>
div#cart {
    height: 1097px;
    overflow: auto;
}
#app {
    margin: 0 auto;
    background-color: crimson;
}
.col2 {
    float: left;
}
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
    background-color: crimson;
}
.cart-item-thumb {
    float: left;
    margin-right: 30px;
}
.cart-item-details {
    width: 420px;
    float: left;
}
.cart-item-thumb img {
    width: auto;
    max-height: 63px;
    height: 100%;
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
    margin-top: 12px;
    width: 245px;
    margin-left: 43px;
}
div#place-holder-container {
    padding: 10px;
    width: 100%;
    bottom: 93px;
    border-bottom: 11px solid #FFF;
    border-top: 5px solid #fff;
    margin-bottom: -5px;
}
a#place-holder {
    color: #000;
    background-color: gold;
    padding: 12px;
    font-size: 21px;
    border-radius: 100px;
    margin: 0 auto;
    display: block;
    width: 196px;
    text-align: center;
    line-height: 30px;
    height: 58px;
}
#back-container {
    overflow: auto;
    background-color: crimson;
    width: 100%;
    display: block;
    padding: 13px;
    padding-top: 16px;
    padding-bottom: 16px;
}
</style>