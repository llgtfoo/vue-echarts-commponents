<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p>{{getToken}}</p>
    <p>{{getClientInfo}}</p>
    <p><button @click="setStr">点击</button></p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed:{
    ...mapGetters({
      getToken: 'getToken',
      getClientInfo: 'globe/clientInfo',
    }),
    // getToken(){
    //   return this.$store.getters.getToken
    // },
    // getClientInfo(){
    //   return this.$store.getters['globe/clientInfo']
    // }
  },
  methods:{
    setStr(){
      this.$store.dispatch('globe/setStr','加油啊')
    }
  }
}
</script>
