<template>
    <!--<img :src="getInnerBackground" class="welcome-background"/>-->
    <transition name="slide-fade">
        <div v-if="show" >
            <Header></Header>
            <div id="main-content">
                <div id="side-bar">
                    <div class="white-fade-top"></div>
                    <HomeCategories></HomeCategories>
                    <div class="white-fade-bottom"></div>
                </div>
                <div id="content">
                    <HomeItems></HomeItems>
                </div>
            </div>
            <ViewCart></ViewCart>
        </div>
    </transition>
    
</template>
<script>
import Header from '../components/Header.vue'
import HomeCategories from '../components/HomeCategories.vue'
import ViewCart from '../components/ViewCart.vue'
import HomeItems from '../components/HomeItems.vue'
import { useDataStore } from '../stores/dataStore';

export default{
    data(){
        return{
            dataStore : useDataStore(),
            show: false,
        }
    },

    components: {
        Header,
        HomeItems,
        HomeCategories,
        ViewCart
    },

    computed: {
        getInnerBackground(){
            return this.dataStore.config.inner_background.str
        }
    },

    methods:{
    },

    mounted(){
        this.show = !this.show;
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
.inner-background{
    width: 100%;
    position: fixed;
    z-index: -100;
}

</style>