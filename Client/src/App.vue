<template>

<the-header></the-header>
<router-view v-slot="slotProps">
  <transition name="route" mode="out-in">
    <component :is="slotProps.Component"></component>
  </transition>
</router-view>
</template>

<script>
import  TheHeader  from './components/layout/TheHeader.vue';
export default{
    components:{
        TheHeader
    }
}

</script>
<style >

* {
  box-sizing: border-box;
}
.header1{
  font-size: 40px;
}
.header2{
  font-size: 30px;
}
.header3{
  font-size :20px;
}

html {
  font-family: "Georgia", serif;
}

body {
  margin: 0;
}
.route-enter-from{
 opacity: 0;
 transform: translateY(-30px);
}
.route-leave-to{
  opacity: 0;
 transform: translateY(30px);
}
.route-enter-active{
  transition: all 0.3s ease-out;
}
.route-leave-active{
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from{
opacity: 1;
transform: translateY(0);
}

</style>