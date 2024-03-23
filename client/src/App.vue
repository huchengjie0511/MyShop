<template>
  <Transition class="move">
    <router-view />
  </Transition>
    <!-- 路由路口 -->
  <bottom />
</template>

<script >
import bottom from './components/layout/bottom.vue'
export default{
  component:{
    bottom
  }
}
</script>

<style lang="css" scoped>
.move-enter-active, .move-leave-active {
  transition: all 0.5s ease-out;
}

.move-enter-from, .move-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>