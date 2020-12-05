<template>
    <div>
    
<main class='container'>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>1</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <span class='particle'>0</span>
  <article class='content' v-show="!loginIn">
    <p>请先返回首页登录</p>
    <p>
      <button @click="jumpHelloWorld">返回</button>
    </p>
  </article>
</main>

    </div>
</template>

<script>
import '../assets/css/myfile.css'
import {utils} from "../utils/index"
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters([
            'loginIn',
            'userId',
        ])
    },
    methods:{
      jumpHelloWorld(){
        this.$router.push('/');
      }
    }
}
</script>

<style scoped>

</style>