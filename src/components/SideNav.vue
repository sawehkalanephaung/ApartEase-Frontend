<template>
  <div class="w-screen h-screen flex">
    <!-- Side bar -->
    <div class="w-[300px] h-full bg-gray-200 text-text" v-show="showSide">
      <div class="h-[50px] bg-primary flex justify-start items-center">
        <div class="px-[20px]">
          <h3 class="font-bold