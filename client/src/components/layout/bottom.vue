<template>
    <div class="bottom">
      <div :class="getClass('myProperty')" @click="activateComponent('myProperty')">My Property</div>
      <div :class="getClass('homeProperty')" @click="activateComponent('homeProperty')">Home Property</div>
      <div :class="getClass('shopProperty')" @click="activateComponent('shopProperty')">Shop Property</div>
      <div :class="getClass('aiProperty')" @click="activateComponent('aiProperty')">AI Property</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const unclickClassMap = {
    myProperty: 'iconfant icon-wode-copy',
    homeProperty: 'iconfant icon-zhuye1-copy',
    shopProperty: 'iconfant icon-gouwuche-copy-copy-copy',
    aiProperty: 'iconfant icon-AI-copy',
  };
  const clickedClassMap = {
    myProperty: 'iconfant icon-wode',
    homeProperty: 'iconfant icon-zhuye1',
    shopProperty: 'iconfant icon-gouwuche-copy-copy',
    aiProperty: 'iconfant icon-AI',
  };
  
  const activeComponent = ref(null);
  
  const getClass = (component) => {
    return activeComponent.value === component ? clickedClassMap[component] : unclickClassMap[component];
  };
  
  const activateComponent = (component) => {
    activeComponent.value = component;
  };
  </script>
  
  <style>
  .bottom div {
    cursor: pointer;
    padding: 10px;
    margin: 5px;
  }
  </style>
  