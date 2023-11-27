<template>
    <!--<button @click="showHide">Test2</button>-->
    <Transition name="fade" mode="out-in">
        <div v-if="showAlert">
            <div id="alert">
                <button class="alert-close" @click="closeAlert">X</button>
                <div class="alert-message">
                    {{ msg }}
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    props: {
        msg : String,
    },

    data() {
        return {
            showAlert: false,
        };
    },

    methods: {
        showHide() {
            this.showAlert = !this.showAlert;
        },
        closeAlert(){
            this.showAlert = false
        }
    },
};
</script>
  
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease-out;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  div#alert {
    width: 350px;
    height: 219px;
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: calc(30% - 100px);
    background-color: #fff;
    border-radius: 10px;
    border: 4px solid #ccc;
    padding: 15px;
}
button.alert-close {
    position: absolute;
    border: none;
    color: #fff;
    background-color: #666;
    border-radius: 31px;
    height: 25px;
    width: 25px;
    text-align: center;
    font-size: 19px;
    font-weight: normal;
    right: 10px;
    top: 11px;
}
.alert-message {
    margin-top: 40px;
    text-align: center;
}
</style>