<template lang="">
    <div class="container" v-if="isLoggedIn">
        <p class="pt-3 fw-bold">Watch history</p>
        <div class="row" v-for="video in videos" :key="video.videoid">
            <router-link class="decoration" :to="{name:'Video',params:{id:video.videoid}}">
            <p class="py-3">{{changeDate(video.modifiedtime)}}</p>
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
    <div v-else class="container text-center pt-5 mt-5">
        <em class="material-icons" style="font-size:100px !important;">history</em>
        <h2>Keep track of what you watch</h2>
        <p>Watch history isn't viewable when you're signed out.</p>
        <button @click="signIn()" class="btn btn-outline-primary"><em class="material-icons">account_circle</em> SIGN IN</button>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
    name:'HistoryComponent',
    data() {
        return {
            videos:[]
        }
    },
    mounted() {
        this.getData();
    },
    computed:{
      isLoggedIn(){ 
        return localStorage.getItem("user"); 
      },
    },
    methods: {
        async getData() {
          try {
            const response = await axios.get(`${process.env.VUE_APP_URL}/videos`);
            this.videos = response.data.response;
            this.videos.sort((a,b)=>{return new Date(b.createtime) - new Date(a.createtime)})
          } catch (error) {
            console.log(error);
          }
        },
        changeDate(value){
            return moment(value).utc().format('MMM DD');
        },
        signIn(){
            this.$router.push('/login')
        },               
    },
}
</script>
<style lang="">
    
</style>