<template>
    <div id="categories">
        <router-link :to="'/home/' + i._id" v-for="(i, key) in categories" class="category">
            <div class="category-thumb">
                <img :src="i.image" />
            </div>
            <div class="category-name">
                {{ i.name }}
            </div>
        </router-link>
    </div>
</template>

<script>
import { useDataStore } from '../stores/dataStore';
export default{
    data(){
        return{
            categories : {},
            dataStore : useDataStore()
        }
    },
 
    computed: {
        categories(){
            return this.dataStore.categories;
        }
    },

    mounted(){
       // this.filterHomeItems(this.$route.params.id);
    },

    methods: {
        //filterHomeItems(category_id){
        //    this.dataStore.updateHomeItems(category_id);
        //}
    }
}
</script> 