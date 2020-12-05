<template>
    <div>
       <DrawHeader v-bind:title="headerTitle"></DrawHeader>
       <div class="router-container">
       <router-view @getTitle="setTitle"></router-view>
       </div>
    </div>
</template>

<script>
import DrawHeader from "./DrawHeader"
export default {
    components:{
        DrawHeader
    },
    data(){
        return{
            headerTitle:""
        }
    },
    methods:{
        setTitle(val){
            this.headerTitle = val;
        }
    }
}
</script>

<style scoped>

</style>