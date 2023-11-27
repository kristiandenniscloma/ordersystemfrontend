<template>
    <div id="message">
        Please scan this QR Code and pay online.
    </div>
    <!--<router-link to="/home/all" id="order-again">Order Again</router-link>-->
    <div id="qrcode">
        <div v-if="showGenerateQRText" class="qr-generating-text">
            Generating QR Code. Please wait....
        </div>
        <img :src="qrSrc" v-if="!showGenerateQRText"/>
    </div>
    
    <router-link to="/cart" id="order-again">Back</router-link>
</template>
<script>
import axios from "axios";
import { useDataStore } from '../stores/dataStore';
import { supabase } from '../lib/supabaseClient'
import QRCode from 'qrcode'

export default{
    data(){
        return{
            dataStore : useDataStore(),
            qrSrc : '',
            showGenerateQRText : true,
            paymentIntentId : null,
            checkPayment : false,
        }
    },

    created(){

    },

    methods: {
        async checkPaymentLoop(){
            console.log(this.checkPayment)
            if(this.checkPayment == true){
                console.log("check payment: " + this.paymentIntentId)

                const response = await axios.get('http://143.198.219.64/api/check-payment/' + this.paymentIntentId)
                console.log(response)    
                if(response.data.status == "paid"){
                    this.$router.push('/paid')
                }


            }

            //return false;
        }
    },

    async mounted(){
        const cart = this.dataStore.cart
        let payment_intent_id = ''

        try {
            const response = await axios.post('http://143.198.219.64/api/generate-payment-url', cart);
            console.log(response);        
            payment_intent_id = response.data.data.attributes.payment_intent.id

            this.paymentIntentId = payment_intent_id

            const currentDate = new Date();
            const timestamp = currentDate.getTime();

            const dataToInsert = {
                'long_url' : response.data.data.attributes.checkout_url,
                'short_url' : timestamp
            }   
            
            this.qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=http://143.198.219.64/redirect/' + timestamp

            const { data : insertResponse, error: insertError } = await supabase 
                .from('payment_url')
                .insert(dataToInsert)
                .select()

            this.showGenerateQRText = false

            setTimeout(() => {
                console.log("start checking")
                this.checkPayment = true

                let runCheckPaymentLoop = setInterval(() => {
                    this.checkPaymentLoop()
                }, 2000)
            }, 8000);

            
        } catch (error) { 
            console.error('Error:', error)
        }


        let total = 0
        for(let key in cart ){
            total += cart[key].item.price * cart[key].quantity  
        }

        const dataToInsert = {
            'total_price' : total,
            'status' : 'new',
            'payment_intent_id' : payment_intent_id
        }

        const { data : insertResponse, error: insertError } = await supabase 
        .from('orders')
        .insert(dataToInsert)
        .select()

        if(insertResponse){
            console.log('insert response');
            console.log(insertResponse)
            const id_order =  insertResponse[0].id

            for(let key in cart ){
                const dataToInsert = {
                    'id_order' : id_order,
                    'price' : cart[key].item.price,
                    'item_name' :  cart[key].item.name,
                    'id_item' :  cart[key].item.id,
                    'quantity' :  cart[key].quantity,
                    'status' : 'added',
                }

                const { data, error } = await supabase 
                .from('order_items')
                .insert(dataToInsert)
            }
        }
    }
}
</script>
<style scoped> 
div#message{
    text-align: center;
    font-size: 29px;
    margin: 0 auto;
    margin-top: 92px;
    margin-bottom: 78px;
    width: 80%;
}
a#order-again {
    font-size: 34px;
    color: #fff;
    background-color: rgba(0,0,0,0.8);
    border-radius: 75px;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    width: 271px;
    text-align: center;
    height: 71px;
    line-height: 63px;
    bottom: 112px;
}
#qrcode img {
    margin: 0 auto;
    display: block;
}
.qr-generating-text {
    margin: 0 auto;
    display: block;
    text-align: center;
    margin-bottom: 23px;
    font-size: 33px;
}
</style> 