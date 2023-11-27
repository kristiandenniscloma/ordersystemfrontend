<template>
    <h2>Orders</h2>
    <div v-for="(i, key) in getOrders" class="order-item">
        <div class="ref">{{ i.id }}</div>
        <div class="order-items">
            <div v-for="(i2, key2) in i.items">
                <div class="item">
                    <div class="order-item-name">
                        {{ i2.item_name }}({{ i2.price }}.00) x  {{ i2.quantity }}
                    </div>
                </div>
            </div>
        </div>
        <div class="total">Total: {{ i.total_price }}.00</div> 
        <div class="status">
            <button :class="{ 'current' : i.status === 'preparing', 'clicked' : isClicked}" class="status-item " @click="updateOrderStatus(i.id, 'preparing')">
                Preparing
            </button>
            <button :class="{ 'current' : i.status === 'done', 'clicked' : isClicked}" class="status-item" @click="updateOrderStatus(i.id, 'done')">
                Done
            </button>
            <button :class="{ 'current' : i.status === 'cancelled', 'clicked' : isClicked}" class="status-item" @click="updateOrderStatus(i.id, 'cancelled')">
                Cancelled
            </button>
        </div>
    </div>
</template>

<script>
import { useDataStore } from '../stores/dataStore';
import { supabase } from '../lib/supabaseClient'

export default{
    components:{
    },

    data(){
        return{
            dataStore : useDataStore(),
            orders: null,
            isClicked : false
        }
    },

    mounted(){
        setInterval(this.pullOrders, 3000)
    },

    methods: {
        async pullOrders(){
            const { data : allOrders, allOrdersError } = await supabase
            .from('orders')
            .select('*')
            .order('id', { ascending: false })

            const { data : allOrderItems, allOrderItemsError } = await supabase
            .from('order_items')
            .select('*')

            for(let key in allOrders){
                const fiteredOrderItems = Object.values(allOrderItems).filter((item) => item.id_order === allOrders[key].id)

                allOrders[key].items = fiteredOrderItems
            }

            this.orders = allOrders
        },

        async updateOrderStatus(id, newStatus){
            try{
                this.loading = true

                const { data, error } = await supabase
                .from('orders')
                .update({
                    status: newStatus,
                })
                .eq('id', id)

                this.pullOrders()
            }catch(error){
                console.log(error)
            }
        }
    },

    computed: {
        getOrders(){
            return this.orders
        },
    },

    beforeRouteEnter(to, from, next) {
    // Add the 'hide-scroll' class to the body when entering the page
        document.body.classList.add('page-orders');
        next();
    },
    beforeRouteLeave(to, from, next) {
        // Remove the 'hide-scroll' class from the body when leaving the page
        document.body.classList.remove('page-orders');
        next();
    },

}
</script>

<style scoped>
body{
  background-image: none !important;
  background-color: #000;
}
#app {
  margin: 0 auto;
  overflow: auto;
  background-color: #000;
  height: 100%;
}
.order-item {
  border: 1px solid #ccc;
  padding: 18px;
}
button.status-item {
  border: none;
  width: 100%;
  height: 58px;
  margin-bottom: 10px;
  font-size: 16px;
}
button.status-item.current {
  background-color: aqua;
}
button:active{
  background-color: red;
}

h2 {
  font-size: 32px;
  color: #fff;
  margin-bottom: 14px;
  margin-top: 14px;
  text-align: center;
}
.order-item {
  background-color: #fff;
  border-radius: 13px;
  font-size: 25px;
  width: calc(33% - 20px);
  float: left;
  margin: 0 10px;
  margin-bottom: 20px;
}
.ref {
  font-weight: bold;
  font-size: 27px;
  margin-bottom: 15px;
}
.item {
  border-bottom: 1px solid #000;
}
.total {
  margin-top: 33px;
}
.status {
  margin-top: 23px;
}
</style>
