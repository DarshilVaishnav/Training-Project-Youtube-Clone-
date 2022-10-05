<template lang="" v-if="isLoggedIn">
    <div class="container" v-if="videos.length > 0">
        <p class="pt-3 fw-bold">Your Videos</p>
        <div class="row" v-for="video in videos" :key="video.videoid">
            <p class="py-3">{{changeDate(video.modifiedtime)}}</p>
            <div class="card border-0 mb-3" style="max-width: 700px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <router-link class="decoration" :to="{name:'Video',params:{id:video.videoid}}">
                            <video id="videoPlayer" class="img-fluid rounded-start" muted="muted" :poster="video.thumbnailurl">
                                <source :src="video.videourl" type="video/mp4" />
                            </video>
                        </router-link>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <div class="d-flex">
                            <h6 class="card-title flex-fill">{{video.title}}</h6>
                            <em class="material-icons pe-2" data-bs-toggle="modal" data-bs-target="#editvideo" data-toggle="tooltip" data-placement="top" title="Edit" @click="editVideo(video)" style="cursor:pointer">edit</em>
                            <em class="material-icons" data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#deletevideo" data-placement="top" title="Delete forever" style="cursor:pointer">delete</em>
                        </div>
                        <p class="card-text">{{video.description}}</p>
                        <p class="card-text text-muted small" style="font-size:12px">Sony India<em class="material-icons fs-6">check_circle</em>
                        • 33K views <br>
                        </p>
                      </div>
                    </div>
                </div>
            </div>
            <!-- Edit video modal -->
            <div class="modal fade" id="editvideo" tabindex="-1" role="dialog" aria-labelledby="uploadVideoTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="uploadVideoTitle">Edit videos</h5>
                            <button type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form enctype="multipart/form-data">
                            <div class="modal-body">
                                <div class="form-floating mt-3">
                                    <input class="form-control" @input="setTitle" type="text" v-model="title" ame="title" id="title" name="title" placeholder="Video Title">
                                    <label for="title">Title</label>
                                    <span v-if="v$.title.$error" class="error text-danger"> {{ v$.title.$errors[0].$message }} </span>
                                </div>
                                <div class="form-floating mt-3">
                                  <textarea class="form-control" @input="setDescription" v-model="description" ame="description" placeholder="Write Video Description" id="description" style="height: 100px"></textarea>
                                  <label for="description">Description</label>
                                  <span v-if="v$.description.$error" class="error text-danger"> {{ v$.description.$errors[0].$message }} </span>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
                                <button type="submit" class="btn btn-primary" @click="updateVideo(video.videoid)">SAVE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- Delete video modal -->
            <div class="modal fade" id="deletevideo" tabindex="-1" role="dialog" aria-labelledby="deleteVideoTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteVideoTitle">Delete videos</h5>
                            <button type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                            <div class="modal-body">
                                <p class="fw-bolder">Permanently delete this video?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
                                <button type="submit" class="btn btn-danger" @click="deleteVideo(video.videoid)">DELETE</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="container text-center pt-5 mt-5">
        <div>
            <img src="/assets/img/no_content_illustration.svg" alt="no content">
        </div>
        <h2>No content available</h2>
        <p>Please upload atleast one video to see it here.</p>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
export default {
    name:'YourVideos',
    setup () {
      return { v$: useVuelidate() }
    },
    data() {
        return {
            videos:[],
            title:'',
            description:''
        }
    },
    validations(){
      return{
        title:{ required },
        description:{ required, minLength: minLength(10) },
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
        setTitle(){
            this.v$.title.$touch();
        },
        setDescription(){
            this.v$.description.$touch();
        },
        async getData() {
          try {
            const response = await axios.get(`${process.env.VUE_APP_URL}/videos`);
            this.videos = response.data.response;
            // console.log(this.videos);
            if(this.isLoggedIn){
                this.videos = this.videos.filter((v)=>v.userid == this.$cookies.get('user').userid)
                this.videos.sort((a,b)=>{return new Date(b.createtime) - new Date(a.createtime)})
                // for(let i = 0; i < this.videos.length; i++){
                //     if(this.videos[i].userid == this.$cookies.get('user').userid){  
                //         console.log('found');
                //         this.yourvideos +=  JSON.parse(JSON.stringify(this.videos[i]))
                //         console.log('vid',this.yourvideos);
                //         // this.videos = this.videos[i]
                //         // this.videos.sort((a,b)=>{return new Date(b.createtime) - new Date(a.createtime)})
                //     }
                // }
            }
            else{
                // console.log("user not logged in");
                return this.videos = '';
            }
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
        editVideo(video){
            this.title = video.title;
            this.description = video.description;
        },
        async updateVideo(id){
            if(!this.v$.$invalid){
                await axios.put(`${process.env.VUE_APP_URL}/videos/${id}`,
                {
                  title:this.title,
                  description:this.description
                },
                {
                  headers: {
                    "Content-Type": "application/json"
                  }
                }).catch((err)=>{
                    console.log(err);
                });
            }else{
                this.$moshaToast({ title: "Please Enter the required field"},{type: 'danger',timeout:2000})
            }
        },
        
        async deleteVideo(id){
            try{
                await axios.delete(`${process.env.VUE_APP_URL}/videos/${id}`)
                location.reload();
            }
            catch(err){
                console.log(err);
            }
        }                       
    },
}
</script>
<style lang="">
    
</style>