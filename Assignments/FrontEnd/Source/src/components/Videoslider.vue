<template lang="">
    <div class="container">
        <p class="py-3 fw-bold">{{title}}</p>
        <div class="cover">
        <a class="left" @click="leftscroll" style="z-index:2; cursor:pointer"> <em class="material-icons rounded-circle bg-secondary opacity-75 p-2">arrow_back_ios</em></a>
        <div class="video-slider" :id="id">
            <div class="video-slide" v-for="video in videos" :key="video.videoid">
                <router-link class="decoration" :to="{name:'Video',params:{id:video.videoid}}">
                    <video id="videoPlayer" class="card-video-top" muted="muted" :poster="video.thumbnailurl">
                        <source :src="video.videourl" type="video/mp4" />
                    </video>
                    <div class="card-body">
                        <div class="card-title">
                            <span class="d-flex flex-wrap" style="font-size:14px">{{video.title}}</span>
                        </div>
                        <p class="card-text text-muted small">Sony India<em class="material-icons fs-6">check_circle</em><br>
                            • 33K views <br>
                        </p>
                    </div>
                </router-link>
            </div>
        </div>
        <a class="right" @click="rightscroll" style="z-index:2; cursor:pointer"> <em class="material-icons rounded-circle bg-secondary mx-3 opacity-75 p-2">arrow_forward_ios</em></a>

        <hr/>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'SubscriptionComponent',
    data() {
        return {
            videos:[]
        }
    },
    props:['id','title'],
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
        leftscroll(){
            const left = document.querySelector(`#${this.id}`);
            left.scrollBy(-300,0);
        },
        rightscroll(){
            const right = document.querySelector(`#${this.id}`);
            right.scrollBy(300,0);
        }
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
    width: 200px;
}

.left{
    position: absolute;
    /* left: 0; */
    top: 40%;
    transform: translateY(-50%);
}

.right{
    position: absolute;
    right: 0;
    top: 40%;
    transform: translateY(-50%);
}

.cover{
    padding: 0px 30px;
    position: relative;
}

.video-slider::-webkit-scrollbar{
    display: none;
}

.bg-secondary{
    background-color: rgb(247, 241, 241) !important;
}
    
</style>