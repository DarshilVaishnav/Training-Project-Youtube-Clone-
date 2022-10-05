<template lang="">
    <div>
        <span class="fw-bold fs-3">Sports</span>
        <div class="row gx-2 gy-0">
            <div class="card mt-3 me-1 border-0 bg-light" v-for="video in keyFilter" :key="video.videoid">
                <router-link class="decoration" :to="{name:'Video',params:{id:video.videoid}}">   
                <video id="videoPlayer" class="card-img-top" muted="muted" :poster="video.thumbnailurl">
                    <source :src="video.videourl" type="video/mp4" />
                </video>
                <div class="card-body">
                    <div class="card-title d-flex flex-row">
                        <img src="/assets/img/img2_2.PNG" class="title_logo" alt="...">
                        <h6 class="ps-2">{{video.title}}</h6>
                    </div>
                    <p class="card-text text-muted ps-5 small">Sony India<em class="material-icons fs-6">check_circle</em><br>
                        33K views <br>
                    </p>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'SportsComponent',
    data() {
        return {
            videos:[]
        }
    },
    mounted() {
        this.getData();
    },
    computed:{
        keyFilter(){
            return this.videos.filter((v)=>v.catid == 3)
        }
    },
    methods: {
        async getData() {
          try {
            const response = await axios.get(`${process.env.VUE_APP_URL}/category`);
            this.videos = response.data.response;
          } catch (error) {
            console.log(error);
          }
        },
    }
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
    height: 200px;
}
</style>