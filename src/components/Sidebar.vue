
<script setup>
// javascript code here
import {ref} from 'vue';

    const showSideBar = ref(false);
</script>


<template>
  <!-- vue and javascript code here -->
<div class="relative flex min-h-screen space-y-6">
  <!-- sidebar -->
  <div class="bg-emerald-600 text-cyan-100 w-64 space-y-6 px-2 absolute inset-y-0 left-0 md:relative md:-translate-x-0 transform -translate-x-full transition-200 ease-in-out " :class="{'relative -translate-x-0':showSideBar}"> 
    <a href="" class="flex items-center space-x-2 px-4 mt-10 ">
      <svg xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke-width="1.5" 
      stroke="currentColor" 
      class="w-10 h-10">
  <path 
  stroke-linecap="round" 
  stroke-linejoin="round" 
  d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
</svg><span class="text-2xl font-extrabold text-white"> ApartEase</span>
    </a>

    <!-- // menu navigation items -->
    <nav>
<a href="/" class=" group flex items-center py-3 px-4 hover:bg-emerald-700 rounded space-x-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
<span class="text-1xl  text-white group-hover:bg-emerald-700"> Dashboard</span>
</a> 

<a href="/" class=" group flex items-center py-3 px-4  hover:bg-emerald-700 rounded space-x-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
<span class="text-1xl  text-white group-hover:bg-emerald-700"> Resident List</span>

</a>

<a href="/" class=" group flex items-center py-3 px-4  hover:bg-emerald-700 rounded space-x-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
</svg>

<span class="text-1xl text-white  hover:bg-emerald-700 rounded-sm group-hover:bg-emerald-700"> Upload</span>

</a>

<a href="/" class=" group flex items-center py-3 px-4  hover:bg-emerald-700 rounded space-x-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>


<span class="text-1xl  text-white group-hover:bg-emerald-700">Line</span>

</a>

<a href="/" class=" group flex items-center py-3 px-4  hover:bg-emerald-700 rounded space-x-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>

<span class="text-1xl text-white group-hover:bg-emerald-700"> Create User </span>

</a>

<a href="/" class=" group flex items-center py-3 px-4  hover:bg-emerald-700 rounded space-x-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>


<span class="text-1xl  text-white group-hover:bg-emerald-700"> Signout </span>

</a>

    </nav>
  </div>



  <!-- main content -->
  <div class="flex-1">
  
    <!-- header -->
    <div class="bg-white shadow px-2 py-4">

      <button @click="showSideBar = !showSideBar" class="text-emerald-700">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</button>
 

    </div>
 
 
   

    <!-- content -->
    <div class="p-8 text-emerald-700 font-extrabold">Content</div>
  </div>

</div>
</template>







<style scoped>
/* css code here */

</style>