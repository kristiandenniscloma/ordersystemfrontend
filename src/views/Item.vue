<template>
    <FrontAlert :msg="alertMessage" :show="showAlert" ref="alertRef"></FrontAlert>
    <transition name="slide-fade">
        <div v-if="show" >
            <Header></Header>
            <div id="main-content">
                <div id="side-bar">
                    <HomeCategories></HomeCategories>
                </div>
                <div id="content">
                    <div id="content-inner">
                        <div class="thumb">
                            <img :src="this.item.image_url" id="image-thumb"/>
                            <img :src="this.item.image_url" id="image-thumb-effect"/>
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
        </div>
    </transition>
</template>
<script>
import { useDataStore } from '../stores/dataStore';
import HomeCategories from '../components/HomeCategories.vue';
import Header from '../components/Header.vue';
import ViewCart from '../components/ViewCart.vue';
import FrontAlert from '../components/FrontAlert.vue'

export default{
    components: {
        HomeCategories,
        Header,
        ViewCart,
        FrontAlert
    },

    data(){
        return{
            item : {},
            dataStore : useDataStore(),
            show: false,
            alertMessage : '',
        }
    },

    created(){

    },

    methods: {
        addToCart(){
            this.dataStore.addToCart(this.item)
            //this.popAlert("Added to cart")

            document.getElementById("image-thumb-effect").classList.add('resize-effect');

            setTimeout(function() {
                // Set the image opacity to 0 for a fading effect
                document.getElementById("image-thumb-effect").classList.add('fade-out');
            }, 300);

            setTimeout(function() {
                // Set the image opacity to 0 for a fading effect
                document.getElementById("image-thumb-effect").style.display = 'none';
                document.getElementById("image-thumb-effect").classList.remove('fade-out');
                document.getElementById("image-thumb-effect").classList.remove('resize-effect');
                
            }, 500);

            
            setTimeout(function() {
                // Set the image opacity to 0 for a fading effect
                document.getElementById("image-thumb-effect").style.display = 'block';
                
            }, 600);
            
        },
        popAlert(msg){
            this.alertMessage = msg
            this.$refs.alertRef.showHide()
        },

    },

    mounted(){
        this.item = this.dataStore.getItemById(this.$route.params.id)[0]
        this.show = !this.show
    },

    beforeRouteEnter(to, from, next) {
    // Add the 'hide-scroll' class to the body when entering the page
        document.body.classList.add('hide-scroll')
        //document.body.classList.add('hide-inner-scrolls');
        next()
    },
    beforeRouteLeave(to, from, next) {
        // Remove the 'hide-scroll' class from the body when leaving the page
        document.body.classList.remove('hide-scroll')

        next()
    },

}
</script> 

<style scoped>
.resize-effect{
    visibility: visible !important;
    width: 150px !important;
    top: 1100px !important;
    left: 550px !important;
}
.fade-out{
    opacity: 0;
    transition: all 0.5s ease !important;
}
img#image-thumb-effect {
    width: 300px;
    position: absolute;
    z-index: 100;
    top: 207px;
    left: 261px;
    visibility: hidden;
    transition: all 0.5s ease, display 1s ease;
}
#image-thumb {
    width: 400px;
    height: auto;
}
div#content {
    padding: 16px;
    overflow: hidden;
}
div#content-inner {
    border-radius: 38px;
    padding: 20px;
    padding-bottom: 31px;
}
.thumb {
    margin: 0 auto;
    display: block;
}
.thumb img {
   /* width: auto;*/
    margin: 0 auto;
    display: BLOCK;
    /* height: 340px;*/
    /* height: 100%;*/
}
.name {
    font-size: 21px;
    margin-top: 28px;
}
.price {
    margin-top: 7px;
    font-size: 25px;
}
button.add-to-cart {
    background-color: gold;
    padding: 2px;
    width: 169px;
    border: none;
    border-radius: 56px;
    display: block;
    height: 53px;
    font-size: 22px;
    margin-top: 26px;
}

</style>