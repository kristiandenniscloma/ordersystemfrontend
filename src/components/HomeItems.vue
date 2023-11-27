<template>
    <div id="items">
        <router-link v-for="(i, key) in computeItems" class="item" :to="'/item/' + i.id">
            <div class="item-thumb">
                <img :src="i.image_url" />
            </div>
            <div class="item-name">
                {{ i.name }}
            </div>
            <div class="item-price">
                ₱{{ i.price }}.00
            </div>
        </router-link>
    </div>
</template>

<script>
import { useDataStore } from '../stores/dataStore';
import Header from '../components/Header.vue'

export default{
    components:{
        Header,
    },

    data(){
        return{
            items : {},
            dataStore : useDataStore()
        }
    },

    mounted(){
        this.dataStore.updateHomeItems(this.$route.params.id);
    },

    watch:{
        '$route.params.id' : 'handleRouteChange'
    },

    methods: {
        handleRouteChange(){
            //console.log('handleRouteChange');
            this.dataStore.updateHomeItems(this.$route.params.id);
        }
    },

    computed: {
        computeItems(){
            //console.log(this.dataStore.homeItems);
            return this.dataStore.homeItems;
        }
    }
}
</script>