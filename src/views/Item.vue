<template>
    <Header></Header>
    <div id="main-content">
        <div id="side-bar">
            <HomeCategories></HomeCategories>
        </div>
        <div id="content">
            <div id="content-inner">
                <div class="thumb">
                    <img :src="this.item.image" />
                </div>
                <div class="name">
                {{ this.item.name }}
                </div>
                <div class="price">
                    ₱ {{ this.item.price }}.00
                </div>
                <button class="add-to-cart" @click="addToCart">Add to cart</button>
            </div>
        </div>
    </div>
    <ViewCart></ViewCart>
</template>
<script>
import { useDataStore } from '../stores/dataStore';
import HomeCategories from '../components/HomeCategories.vue';
import Header from '../components/Header.vue';
import ViewCart from '../components/ViewCart.vue';

export default{
    components: {
        HomeCategories,
        Header,
        ViewCart
    },

    data(){
        return{
            item : {},
            dataStore : useDataStore()
        }
    },

    methods: {
        addToCart(){
            this.dataStore.addToCart(this.item);
        }
    },

    mounted(){
        this.item = this.dataStore.getItemById(this.$route.params.id)[0];
    }

}
</script> 

<style scoped>
div#content {
    padding: 16px;
}
div#content-inner {
    background-color: rgba(0, 0, 0,0.7);
    border-radius: 38px;
    padding: 20px;
    padding-bottom: 31px;
}
.thumb {
    margin: 0 auto;
    display: block;
}
.thumb img {
    width: auto;
    margin: 0 auto;
    display: BLOCK;
    max-height: 340px;
    height: 100%;
}
.name {
    color: #fff;
    font-size: 27px;
    margin-top: 28px;
}
.price {
    color: #ffff;
    margin-top: 7px;
    font-size: 30px;
}
button.add-to-cart {
    background-color: #fff;
    padding: 10px;
    width: 207px;
    border: none;
    border-radius: 56px;
    display: block;
    height: 64px;
    font-size: 28px;
    margin-top: 44px;
}

</style>