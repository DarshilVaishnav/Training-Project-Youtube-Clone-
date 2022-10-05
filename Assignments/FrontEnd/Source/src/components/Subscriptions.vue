<template lang="">
    <div>
     <Videoslider id='bf' title="Beauty & Fashion"></Videoslider>
     <Videoslider id='comedy' title="Comedy"></Videoslider>  
     <Videoslider id='sports' title="Sports"></Videoslider>  
    </div>
</template>
<script>
import Videoslider from './Videoslider.vue'
export default {
    name:'SubscriptionComponent',
    components:{
        Videoslider
    },
    data() {
        return {
        }
    },
}
</script>
<style scoped>
 
</style>