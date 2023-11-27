<template>
    <img :src="getHeaderBanner" class="header-banner"/>
</template>
<script>
import { useDataStore } from '../stores/dataStore';

export default{
    data(){
        return{
            dataStore : useDataStore(),
        }
    },
    computed: {
        getHeaderBanner(){
            console.log(this.dataStore.config)
            return this.dataStore.config.header_banner.str
        }
    }
}
</script>