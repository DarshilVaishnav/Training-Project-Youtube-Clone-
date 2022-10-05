<template>
  <div>
    <router-link :to="{ name: 'Home' }"></router-link>
    <router-view></router-view>  
  </div>
</template>

<script>
export default {
    name: "App",
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
} */

body{
    font-family: 'Roboto', sans-serif;
}

.check{
    font-size: 20px;
}

.btn-sm{
    font-size: 10px;
    font-weight: bold;
}

.title_logo{
    height: 50px;
    width: 40px;
}

.bord{
    border-top: 4px solid grey;
    padding-left: 3px;
}

.nav-item:hover{
    width: 100%;
    background-color: lightgray;
}

/* .side-bar {
   overflow-y: hidden;
   scrollbar-width: thin;
}
.side-bar:hover {
  overflow-y: scroll;
} */

.decoration{
    text-decoration: none;
    color: black;
}

a:hover {
  color: black;  
}

::-webkit-scrollbar {
  width: 8px;
  height: 1px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}


@media (max-width: 768px) {
    .side-bar, .search{
      display: none;
    }
}

@media (max-width: 900px) {
    .search input {
      width: 25rem;
    }
}
</style>
