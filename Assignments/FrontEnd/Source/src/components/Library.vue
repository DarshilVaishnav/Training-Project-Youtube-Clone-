<template lang="">
    <div class="container">
        <em class="material-icons pe-2 py-4">history</em><span class="py-3 fw-bold">History</span>
        <div class="video-slider">
            <div class="video-slide" v-for="video in videos" :key="video.videoid">
                <router-link class="decoration" :to="{name:'Video',params:{id:video.videoid}}">
                    <video id="videoPlayer" class="card-video-top" muted="muted" :poster="video.thumbnailurl">
                        <source :src="video.videourl" type="video/mp4" />
                    </video>
                    <div class="card-body">
                        <div class="card-title">
                            <span class="d-flex flex-wrap overflow-hidden" style="font-size:14px">{{video.title}}</span>
                        </div>
                        <p class="card-text text-muted small">Sony India<em class="material-icons fs-6">check_circle</em><br>
                            • 33K views <br>
                        </p>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- <hr/> -->
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'LibraryComponent',
    data() {
        return {
            videos:[]
        }
    },
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
<style scoped>

.video-slider{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
    scroll-behavior: smooth;
}

.video-slide{
    margin-left: 5px;    
    border-radius: 10px;
    max-width: 300px;
}

.card-video-top {
    height: 100px;
}

::-webkit-scrollbar {
  height: 6px;
}
    
</style>