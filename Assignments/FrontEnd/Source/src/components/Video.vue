<template lang="">
    <div>
      <div class="container player">
        <div class="row">
          <div class="col-sm">
            <div class="row no-gutters">
            <div class="card mt-3 border-0 bg-light" style="max-width: 1000px;" v-for="video in videoData" :key="video.videoid">
                <video id="videoPlayer" class="card-img-top" :poster="video.thumbnailurl" controls>
                    <source :src="video.videourl" type="video/mp4" />
                </video>
                <div class="card-body">
                    <div>
                      <h5>{{video.title}}</h5>
                    </div>
                    <hr/>
                    <div class="card-title d-flex flex-row">
                        <img src="/assets/img/img2_2.PNG" class="title_logo" alt="...">
                        <h6 class="ps-2">{{video.description}}</h6>
                    </div>
                    <p class="card-text text-muted ps-5 small">Sony India<em class="material-icons fs-6">check_circle</em><br>
                        33K views <br>
                    </p>  
                </div>
            </div> 
          </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'VideoComponent',
    data() {
      return {
        videoData:[],
      }
    },
    props:['video'],
    created() {
      this.getData();
    },

    // computed: {
    //    watchVideo() {
    //   //   // console.log(this.$route.params.id);
    //     //console.log(this.videoData.find(v => v.videoid == this.$route.params.id));
    //     let temp = [];
    //       this.videoData.forEach((item)=>{
    //         if(item.videoid == this.$route.params.id){
    //             temp = item;
    //             console.log("data match",temp)
    //         }
    //         // console.log("data not match");
    //       })
    //       return temp;
          
    //   }
    // },
    // async beforeRouteUpdate(to) {
    // // react to route changes...
    // // this.userData = await fetchUser(to.params.id)
    // this.videos = await this.videoData.find(v => v.videoid == to.params.id)
    // console.log('data',this.videos);
    // },
    methods: {
      async getData() {
        try {
          const response = await axios.get(`${process.env.VUE_APP_URL}/videos/${this.$route.params.id}`);
          this.videoData = response.data.response;
          // console.log('videovideo',this.videoData);
        } catch (error) {
          console.log(error);
        }
      },
      
      // watchVideo(){
      //   return this.videoData.find(v => v.videoid == this.$route.params.id)
      // }

      // watchVideoData(){
      //   return this.videos
      // }
    },
}
</script>
<style scoped>
 .card-img-top{
  height:600px;
 }
</style>
