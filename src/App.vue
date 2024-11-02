<script>
import AppNav from './components/AppNav.vue';
import AppFooter from './components/AppFooter.vue';




export default{
  components:{
    AppNav,
    AppFooter
  }
}




</script>

<template>

 
<AppNav></AppNav>

<div class=" bg-dark">

  <router-view></router-view>

</div>

<AppFooter></AppFooter>
  
</template>

<style scoped>

</style>