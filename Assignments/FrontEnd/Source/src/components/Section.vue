<template lang="">
    <div>        
        <div>
            <ul class="nav">
                <li class="nav-item w-100 ps-3 active">
                    <router-link :to="{name:'Content'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">home</em> Home</a></router-link>
                </li>
                <li class="nav-item w-100 ps-3">
                    <router-link :to="{name:'Explore'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">explore</em> Explore</a></router-link>
                </li>
                <!-- <li class="nav-item ps-3">
                    <router-link :to="{name:'Shorts'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">play_circle_filled</em> Shorts</a></router-link>
                </li> -->
                <li class="nav-item w-100 ps-3">
                    <router-link :to="{name:'Subscriptions'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">subscriptions</em> Subscriptions</a></router-link>
                </li>
            </ul>
            <hr>
            <ul class="nav">
                <li class="nav-item w-100 ps-3">
                    <router-link :to="{name:'Library'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">library_add_check</em> Library</a></router-link>
                </li>
                <li class="nav-item w-100 ps-3">
                    <router-link :to="{name:'History'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">history</em> History</a></router-link>
                </li>
                <li v-if="isLoggedIn" class="nav-item w-100 ps-3">
                    <router-link :to="{name:'YourVideos'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">ondemand_video</em> Your Videos</a></router-link>
                </li>
            </ul>
            <hr>
            <div v-if="!isLoggedIn">
                <p class="small px-4">Sign in to like videos, comment, and subscribe.</p>
                <router-link :to="{name:'Login'}"><button class="btn btn-outline-primary ms-5 mb-2"><span class="material-icons">account_circle</span> SIGN IN</button></router-link>
                <hr>
            </div>
            <span class="pt-3 ps-4 text-secondary"><strong>BEST OF YOUTUBE</strong></span>
            <ul class="nav">   
                <li class="nav-item w-100 ps-3">
                    <router-link :to="{name:'Music'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">music_note</em> Music</a></router-link>
                </li>
                <li class="nav-item w-100 ps-3">
                    <router-link :to="{name:'Sports'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">emoji_events</em> Sports</a></router-link>
                </li>
                <li class="nav-item w-100 ps-3">
                    <router-link :to="{name:'Gaming'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">sports_esports</em> Gaming</a></router-link>
                </li>
                <!-- <li class="nav-item ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">movie</em> Movies</a>
                </li> -->
                <li class="nav-item w-100 ps-3">
                    <router-link :to="{name:'News'}" class="text-decoration-none"><a href="#" class="nav-link text-dark"><em class="material-icons pe-3">feed</em> News</a></router-link>
                </li>
                <!-- <li class="nav-item ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">stream</em> Live</a>
                </li>
                <li class="nav-item ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">sentiment_very_satisfied</em> Fashion & Beauty</a>
                </li>
                <li class="nav-item ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">lightbulb</em> Learning</a>
                </li>
                <li class="nav-item ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">live_tv</em> Spotlight</a>
                </li>
                <li class="nav-item ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">slow_motion_video</em> 360 Video</a>
                </li> -->
            </ul>
            <hr>
            <!-- <ul class="nav">
                <li class="nav-item ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">control_point</em> Browse channels</a>
                </li>
            </ul>
            <hr> -->
            <!-- <ul class="nav">
                <span class="ps-4 text-secondary"><strong>MORE FROM YOUTUBE</strong></span>
                <li class="nav-item ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">play_circle</em> YouTube premium</a>
                </li>
                <li class="nav-item ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">stream</em> Live</a>
                </li>
            </ul>
            <hr> -->
            <ul class="nav">
                <li class="nav-item w-100 ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">settings</em> Settings</a>
                </li>
                <li class="nav-item w-100 ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">outlined_flag</em> Report history</a>
                </li>
                <li class="nav-item w-100 ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">help_outline</em> Help</a>
                </li>
                <li class="nav-item w-100 ps-3">
                    <a href="#" class="nav-link text-dark"><em class="material-icons pe-3">feedback</em> Send feedback</a>
                </li>
            </ul>
            <hr>
            <p class="small px-4 w-100">About Press Copyright Contact us Creators Advertise Developers
            Terms Privacy Policy & Safety How YouTube worksTest new features</p>
            <span class="small px-4">&copy; 2022 Google LLC</span>
        </div> 
    </div>
</template>
<script>
export default {
    name:'SectionComponent',
    computed:{
      isLoggedIn(){ 
        return localStorage.getItem("user"); 
      }
    },
}
</script>
<style scoped>
/* .active {
  width: 100%;
  background-color: lightgrey;
} */

.exact-active-link {
  width: 100%;
  background-color: lightgrey !important;
  font-weight: bold;
}
</style>