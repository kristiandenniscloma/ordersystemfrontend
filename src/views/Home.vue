<template>
    <Header></Header>
    <div id="main-content">
        <div id="side-bar">
            <HomeCategories></HomeCategories>
        </div>
        <div id="content">
            <HomeItems></HomeItems>
        </div>
    </div>
    <ViewCart></ViewCart>
</template>
<script>
import Header from '../components/Header.vue'
import HomeItems from '../components/HomeItems.vue'
import HomeCategories from '../components/HomeCategories.vue'
import ViewCart from '../components/ViewCart.vue';

export default{
    components: {
        Header,
        HomeItems,
        HomeCategories,
        ViewCart
    },
}
</script> 

<style scoped>

</style>