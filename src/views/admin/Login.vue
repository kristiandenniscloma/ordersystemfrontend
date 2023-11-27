<template>
    <div class="p-1 mt-5 text-center bg-light">
        <h2 >Login</h2>
    </div>
    <form class="form" @submit.prevent="submitLogin">
        <div class="form-group">
            <label for="text">Email</label> 
            <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <i class="fa fa-envelope-o"></i>
                </div>
            </div> 
            <input id="text" name="text" v-model="inputEmail" type="text" class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label for="text1">Password</label> 
            <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <i class="fa fa-lock"></i>
                </div>
            </div> 
            <input id="text1" v-model="inputPassword" name="text1" type="text" class="form-control">
            </div>
        </div> 
        <div class="form-group">
            <button name="submit" type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
</template>

<script>
import { supabase } from '../../lib/supabaseClient'
import { useDataStore } from '../../stores/dataStore'

export default {
    data(){
        return {
            inputEmail: '',
            inputPassword: '',
            dataStore : useDataStore()
        }
    },

    created(){  
        this.inputEmail = 'root@nimconcustomer.com',
        this.inputPassword = 'nimcon123'
    },

    methods:{
        async submitLogin(){
            console.log('submit form');
            try{
                const {data, error} = await supabase.auth.signInWithPassword({
                    email: this.inputEmail,
                    password: this.inputPassword
                })

                console.log(data)
                this.$router.push('/admin')
                this.dataStore.userId = data.user.id
            }catch(error){
                console.error('error : ' + error)
            }
        }
    }
}
</script>

<style scoped>
@import '../../assets/admin.css';

form{
    margin: 0 auto;
    margin-top: 20px;
}
</style>