<template lang="">
    <div>
        <Header @searchText="handleChange" @toggle="handleSidebar"></Header><!-- @searchvideo="display1($event)" -->
        
        <div class="container-fluid" style="margin-top: 65px;">
          <div class="row">
            <div v-if="!isSidebarActive" class="col-xl-2 col-lg-3 side-bar sidebar" id="navbarNav">
              <Section></Section> 
            </div>
            <div class="col-xl-10 col-lg-9 bg-light min-vh-100 main" :class="[isSidebarActive ? activeClass : '']">
              <!-- <Content :search="searchValue"></Content> -->
              <router-view :search="searchValue"></router-view> 
              <!-- @videoData="handleVideoData" :video="videodata" -->
              <!-- <button type="button" @click="handleVideoData()">HomeData</button> -->
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import Header from './Header.vue'
import Section from './Section.vue'
// import Content from './Content.vue'
export default {
    name:'HomeComponent',
    components: {
    Header,
    Section,
    // Content
    },
    data() {
      return {
        videodata:[],
        searchVideoData:'',
        searchValue:'',
        isSidebarActive: false,
        activeClass:'col-xl-12 bg-light px-4 mr-5 position-relative'
      }
    },
    computed:{
      isLoggedIn(){ 
        return localStorage.getItem("user"); 
      },
    },
    methods: {
      handleChange(value){
        this.searchValue = value;
      },
      handleSidebar(){
        this.isSidebarActive = !this.isSidebarActive
      },
      // handleVideoData(value){
      //   console.log('home',value);
      //   this.videodata = value;
      // }
    },
}
</script>
<style scoped>
@media (min-width: 992px) {
.sidebar{
    position: fixed;
    left:0;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 100px;
    scrollbar-width: none;
  }
}
  
.main{
  position: absolute;
  right:0;
}
.sidebar:hover::-webkit-scrollbar{
  display: block;
}
.sidebar::-webkit-scrollbar{
  display: none;
}
.sidebar:hover{
  scrollbar-width: unset;
}


</style>