<template lang="">
    <div class="container">
        <p class="py-3 fw-bold">Trending videos</p>
        <div class="row" v-for="video in videos" :key="video.videoid">
            <router-link class="decoration" :to="{name:'Video',params:{id:video.videoid}}">
            <div class="card border-0 bg-light mb-3" style="max-width: 700px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <video id="videoPlayer" class="img-fluid rounded-start" muted="muted" :poster="video.thumbnailurl">
                            <source :src="video.videourl" type="video/mp4" />
                        </video>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h6 class="card-title">{{video.title}}</h6>
                        <p class="card-text text-muted small" style="font-size:12px">Sony India<em class="material-icons fs-6">check_circle</em>
                        • 33K views <br>
                        </p>
                      </div>
                    </div>
                </div>
            </div>
            </router-link>
        </div>
    </div>
    <!-- <div class="col-lg-2 card border-0 bg-light">   
                <video id="videoPlayer" muted="muted" :poster="video.thumbnailurl">
                    <source :src="video.videourl" type="video/mp4" />
                </video>
            </div>
            <div class="col-lg-8 card-body">
                <div class="card-title d-flex flex-row">
                    <img src="/assets/img/img2_2.PNG" class="title_logo" alt="...">
                    <h6 class="ps-2">{{video.title}}</h6>
                </div>
                <p class="card-text text-muted ps-5 small">Sony India<em class="material-icons fs-6">check_circle</em><br>
                    33K watching <br>
                </p>
    </div> -->
</template>
<script>
import axios from 'axios'

export default {
    name:'ExploreComponent',
    data() {
        return {
            videos:[]
        }
    },
    props:['video'],

    mounted() {
        this.getData();
    },
 
    methods: {
        async getData() {
          try {
            const response = await axios.get(`${process.env.VUE_APP_URL}/videos`);
            this.videos = response.data.response;
          } catch (error) {
            console.log(error);
          }
        },              
    },
}
</script>
<style lang="">
    
</style>