<template lang="">
    <div>
        <nav class="navbar navbar-light fixed-top bg">
        <div class="container-fluid flex-nowrap">
            <div class="d-flex flex-row">
                <button class="navbar-toggler border-0 d-none d-lg-inline" @click="toggleSidebar()">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a href="/" class="navbar-brand ps-3"><img src="/assets/img/brand_logo.png" alt="brand logo"></a>
            </div>
            <div class="d-flex flex-row">
                <form>
                    <div class="form-group d-none d-lg-inline">
                        <div class="input-group">
                            <input type="text" v-model="search" @keyup="onChange" class="form-control" placeholder="Search" style="width: 500px;">
                            <span class="material-icons input-group-text">search</span>
                        </div>
                    </div>
                </form>
                <div class="mt-2 ps-2 d-none d-lg-inline">
                    <span class="material-icons bg-light rounded-circle">mic</span>
                </div>
            </div>
            <div class="d-flex flex-row">
              <Popper arrow :content="username">
                <button class="rounded-circle shadow-none bg-danger d-none d-lg-inline text-white fw-bold fs-4 px-2 me-3 text-uppercase" v-if="isLoggedIn">{{firstname}}</button>
              </Popper>
                <a class="material-icons pe-4 mt-2 text-decoration-none" style="cursor:pointer;" v-if="isLoggedIn" data-bs-toggle="modal" data-bs-target="#uploadVideo">video_call</a>
                <!-- <span class="material-icons pe-4 mt-2">apps</span>
                <span class="material-icons pe-4 mt-2">more_vert</span> -->
                <button class="btn btn-outline-primary d-flex flex-nowrap p-2" v-if="isLoggedIn" @click="signOut()"><em class="material-icons">logout</em> LOGOUT</button>
                <button v-else @click="signIn()" class="btn btn-outline-primary"><em class="material-icons">account_circle</em> SIGN IN</button>
            </div>
        </div>
        <hr class="fixed-top" style="margin-top: 60px;">
        </nav>

        <!-- Modal -->
        <div class="modal fade" id="uploadVideo" tabindex="-1" role="dialog" aria-labelledby="uploadVideoTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="uploadVideoTitle">Upload videos</h5>
                <button type="button" class="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close">
                  <!-- <span aria-hidden="true">&times;</span> -->
                </button>
              </div>
              <form enctype="multipart/form-data" v-on:submit.prevent="submitFile">
                <div class="modal-body">
                  <!-- <div class="upload my-5">
                      <img src="assets/img/upload-svgrepo-com.svg">
                  </div> -->
                  <!-- <div> -->
                    <!-- <p>Drag and drop video files to upload</p> -->
                    <!-- <p>Your videos will be private until you publish them.</p> -->
                  <!-- </div> -->
                  <div>
                    <label for="video" class="fw-bold">Video</label><br/>
                    <!-- <label for="files" class="btn btn-primary me-2">SELECT FILES</label> -->
                    <input type="file" id="file" name="video" @change="handleFileUpload($event)"/><br>
                    <span v-if="v$.files.$error" class="error"> {{ v$.files.$errors[0].$message }} </span><br>
                    <span class='text-muted'>Supported files: mp4, webm.</span><br>
                    <!-- <progress max="100" v-if="submitFile" :value.prop="uploadPercentage"></progress>{{uploadPercentage}}% -->
                  </div>
                  <div class="mt-3">
                    <input class="form-control" @input="setTitle" type="text" v-model="title" id="title" name="title" placeholder="Video Title">
                    <span v-if="v$.title.$error" class="error"> {{ v$.title.$errors[0].$message }} </span>
                  </div>
                  <!-- <div class="mt-3">
                    <input class="form-control" @input="setDescription" type="text" v-model="description" id="description" name="description" placeholder="Video Description">
                    <span v-if="v$.description.$error" class="error"> {{ v$.description.$errors[0].$message }} </span>
                  </div> -->
                  <div class="form-floating mt-3">
                    <textarea class="form-control" @input="setDescription" v-model="description" ame="description" placeholder="Write Video Description" id="description" style="height: 100px"></textarea>
                    <label for="description">Description</label>
                    <span v-if="v$.description.$error" class="error"> {{ v$.description.$errors[0].$message }} </span>
                  </div>
                  <div class="mt-3">
                    <label for="thumbnail" class="fw-bold">Thumbnail</label><br/>
                    <!-- <label for="files" class="btn btn-primary me-2">SELECT FILES</label> -->
                    <input type="file" id="file" name="thumbnail" @change="handleFileUploadThumb($event)"/><br>
                    <span v-if="v$.thumbfiles.$error" class="error"> {{ v$.thumbfiles.$errors[0].$message }} </span><br>
                    <span class='text-muted'>Supported files: jpg, png, webp.</span><br>
                    <!-- <progress max="100" v-if="submitFile" :value.prop="uploadPercentage"></progress>{{uploadPercentage}}% -->
                  </div>
                  <div class="mt-3">
                    <label for="category">Category</label>
                    <select @input="setCatid" v-model="catid" id="category" class="form-select">
                      <option value="" label="Select a category ...">Select a category ...</option>
                      <option value="1" label="Music">Music</option>
                      <option value="2" label="Gaming">Gaming</option>
                      <option value="3" label="Sports">Sports</option>
                      <option value="4" label="News">News</option>
                    </select>
                    <span v-if="v$.catid.$error" class="error"> {{ v$.catid.$errors[0].$message }} </span>
                  </div>
                  <div v-if="videostatus" class="mt-3">
                    <span class="text-primary">Video Uploading in progress...</span>
                    <div class="spinner-grow text-primary ms-2" role="status">
                      <!-- <span class="visually-hidden">Loading...</span> -->
                    </div>
                    <!-- <span v-else>Video uploaded successfully</span> -->
                  </div>
                  <div class="mt-5 upload">
                    <input class="btn btn-primary" type="submit" value="Upload">
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import Popper from "vue3-popper";

export default {    
    name:'HeaderComponent',
    components:{
      Popper
    },
    setup () {
      return { v$: useVuelidate() }
    },
    data() {
      return {
        title:'',
        description:'',
        catid:'',
        files:[],
        thumbfiles:[],
        videos:[],
        search:'',
        uploadPercentage: 0,
        username:'',
        firstname:'',
        videostatus:false
      }
    },
    validations(){
      return{
        files:{ required },
        thumbfiles:{ required },
        title:{ required },
        description:{ required, minLength: minLength(10) },
        catid:{ required }
      }
    },
    computed:{
      isLoggedIn(){ 
        return localStorage.getItem("user"); 
      },
    },
    created() {
      this.getUserDetail();
    },
    // created(){
    //   this.username = this.$cookies.get('user').firstname;
    // },    
    methods: {
      setTitle(){
        this.v$.title.$touch();
      },
      setDescription(){
        this.v$.description.$touch();
      },
      setCatid(){
        this.v$.catid.$touch();
      },
      async signIn(){
        this.$router.push('/login')
      },
      async signOut(){
        localStorage.removeItem('user');
        this.$cookies.remove('user')
        // this.$router.push('/')
        this.$router.push('/login');
        // location.reload();
      },
      handleFileUpload(event){
        this.files = event.target.files[0];
      },
      handleFileUploadThumb(event){
        this.thumbfiles = event.target.files[0];
      },
      onChange(){
        this.$emit("searchText", this.search)
      },
      toggleSidebar() {
        this.$emit("toggle");
      },
      async submitFile(){
        if(!this.v$.$invalid){
          this.videostatus = true;
          let formData = new FormData();
          formData.append('video', this.files);
          formData.append('title', this.title);
          formData.append('description', this.description);
          formData.append('thumbnail', this.thumbfiles);
          formData.append('userid',this.$cookies.get('user').userid)
          formData.append('catid',this.catid)
          // console.log(this.file);
          // console.log([...formData]);
          await axios.post(`${process.env.VUE_APP_URL}/videos`,
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: function( progressEvent ) {
                this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ) )
              }.bind(this)
            }
            ).then(()=>{
              this.videostatus = false;
              console.log('SUCCESS!!');
              this.$moshaToast({ title: "Video uploaded successfully"},{type: 'success',timeout:1000})
              setTimeout(() => {
                location.reload();
              }, 2000);
              // this.$router.push('/')
            })
            .catch(()=>{
              this.videostatus = false;
              console.log('FAILURE!!');
              // this.$refs.cleardata.reset();
              this.$moshaToast({ title: "Something went wrong", description:"Can't upload the video."},{type: 'warning',timeout:2000})
              // setTimeout(() => {
              //   location.reload();
              // }, 2500);
            }
          );
        }
        else{
          this.$moshaToast({ title: "Please Enter the required field"},{type: 'danger',timeout:2000})
          this.v$.$touch()
        }
      },
      getUserDetail(){
        if(this.isLoggedIn){
          let user = this.$cookies.get('user').firstname;
          this.username = user.concat(" ", this.$cookies.get('user').lastname)
          this.firstname = this.username.substring(0,1)
        }else{
          return this.username;
        }
      }
    },
}
</script>
<style scoped>
.bg{
    background-color: white;
}
.modal{
    height:900px;
    overflow: auto !important;
}
.upload{
    width: 50px;
    margin:auto;
}

.error {
  font-size: 14px;
  color: red;
}

.modal-dialog-scrollable{
  height: calc(100% - 1rem) !important;
}

:deep(.popper) {
    background: red;
    padding: 20px;
    border-radius: 20px;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
}
:deep(.popper #arrow::before) {
  background: red;
}
:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
  background: red;
}

.bg-danger{
  background: rgb(255 0 0) !important;
}

</style>
