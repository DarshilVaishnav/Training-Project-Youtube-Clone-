<template lang="">
    <div class="mx-2">
        <div class="d-flex flex-row mt-2 overflow-auto">
            <button class="btn btn-outline-secondary rounded-pill shadow-none" @click="keyFilter()">All</button>
            <!-- <button class="btn btn-outline-secondary rounded-pill ms-2">Live</button> -->
            <button class="btn btn-outline-secondary rounded-pill ms-2 shadow-none" @click="keyFilter('Allu Arjun')">Allu Arjun</button>
            <button class="btn btn-outline-secondary rounded-pill ms-2 shadow-none" @click="keyFilter('T-Series')">T-Series</button>
            <button class="btn btn-outline-secondary rounded-pill ms-2 shadow-none" @click="keyFilter('Akshay Kumar')">Akshay Kumar</button>
            <button class="btn btn-outline-secondary rounded-pill ms-2 shadow-none" @click="keyFilter('Comedies')">Comedies</button>
            <button class="btn btn-outline-secondary rounded-pill ms-2 shadow-none" @click="keyFilter('Music')">Music</button>
            <!-- <button class="btn btn-outline-secondary rounded-pill ms-2">Street food</button> -->
            <button class="btn btn-outline-secondary rounded-pill ms-2 shadow-none" @click="keyFilter('Filmi')">Filmi</button>
            <button class="btn btn-outline-secondary rounded-pill ms-2 shadow-none" @click="keyFilter('Trailers')">Trailers</button>
            <!-- <button class="btn btn-outline-secondary rounded-pill ms-2">Google Cloud Platform</button> -->
            <!-- <button class="btn btn-outline-secondary rounded-pill ms-2">APIs</button> -->
            <!-- <button class="btn btn-outline-secondary rounded-pill ms-2">Stock</button> -->
            <!-- <button class="btn btn-outline-secondary rounded-pill ms-2">4K</button> -->
        </div>
        <div class="row mt-2 gx-2 gy-0">
            <div class="card mt-3 me-1 border-0 bg-light" v-for="video in filteredList" :key="video.videoid">
                <router-link class="decoration" :to="{name:'Video',params:{id:video.videoid}}">   
                <video id="videoPlayer" class="card-img-top" muted="muted" :poster="video.thumbnailurl">    
                    <source :src="video.videourl" type="video/mp4" />
                </video>
                <div class="card-body">
                    <div class="card-title d-flex flex-row">
                        <img src="assets/img/img2_2.PNG" class="title_logo" alt="...">
                        <h6 class="ps-2">{{video.title}}</h6>
                    </div>
                    <p class="card-text text-muted ps-5 small">Sony India<em class="material-icons fs-6">check_circle</em><br>
                        33K views <br>
                    </p>
                </div>
                </router-link>
                <!-- <button class="btn btn-danger" @click="deleteData(video.videoid)">Delete</button> -->
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'ContentComponent',
    data() {
        return {
            videos:[],
            temp:[]
        }
    },
    props:{
        search:String
    },
    computed:{
      filteredList() {
        if(this.search){
            return this.videos.filter(video => {
              return video.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
        else{
            return this.videos;
        }
      },
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
          try {
            const response = await axios.get(`${process.env.VUE_APP_URL}/videos`);
            this.videos = response.data.response;
            this.temp = response.data.response;
          } catch (error) {
            console.log(error);
          }
        },
        // async deleteData(id){
        //     try{
        //         await axios.delete(`http://localhost:8081/videos/${id}`)
        //     }
        //     catch(err){
        //         console.log(err);
        //     }
        // },
        handleVideo(){
            this.$emit("videoData", this.videos)
        },
        keyFilter(data){
            this.videos = this.temp;
            if(data){
                var filtervideo = this.videos.filter((v)=>v.keyword === data)
                this.videos = filtervideo;
            }
            else{
                return this.videos
            }
            
        }
    },
}
</script>
<style scoped>
.card {
  transition: all .5s ease-in; /* Animation */
  border-radius: 0 !important;
  margin: 0;
  width: 18rem;
}

.card:hover {
  transform: scale(1.1);
  z-index: 5;  
}

.card-img-top {
    width: 100%;
    height: 200px
}
</style>