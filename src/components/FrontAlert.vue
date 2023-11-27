<template>
    <!--<button @click="showHide">Test2</button>-->
    <Transition name="fade" mode="out-in">
        <div v-if="showAlert">
            <div id="alert" class="front">
                <div class="alert-message">
                    {{ msg }}
                </div>
                <button class="alert-close" @click="closeAlert">Close</button>
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
    transition: opacity 0.2s ease-out;
  }

.fade-enter-from,
.fade-leave-to {
opacity: 0;
}


div#alert.front {
    background-color: gold;
    padding: 19px;
    position: absolute;
    left: 0;
    right: 0;
    width: 300px;
    margin: 0 auto;
    top: 30%;
    border-radius: 12px;
    padding-bottom: 83px;
    border: 5px solid #fff;
}
.front button.alert-close {
    position: absolute;
    margin: 0 auto;
    cursor: pointer;
    width: 128px;
    background-color: crimson;
    border-radius: 100px;
    font-size: 24px;
    font-weight: bold;
    display: block;
    bottom: 10px;
    height: 62px;
    color: #fff;
    border: 0; 
    left: 0;
    right: 0;
}

.alert-message {
    margin-top: 0;
    text-align: center;
    color: #000;
    font-size: 32px;
}
</style>