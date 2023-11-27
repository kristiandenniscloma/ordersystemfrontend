<template>
    <header>
        <h1>Dashboard</h1>
    </header>
    <div id='main-content'>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <router-link to="/category">Parent Categories</router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/sub-category">Sub Categories</router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/item">Items</router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/orders">Current Orders</router-link>
            </li>
            <li class="list-group-item">
                <router-link to="/welcome">Order Mode</router-link>
            </li>
        </ul>
    </div>
</template>

<script>

export default{
    components:{
    }
}

</script>

<style scoped>
@import '../../assets/admin.css';
</style>
