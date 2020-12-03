<template>
    <div>
       <DrawHeader></DrawHeader>
       <div class="router-container">
       <router-view></router-view>
       </div>
    </div>
</template>

<script>
import DrawHeader from "./DrawHeader"
export default {
    components:{
        DrawHeader
    }
}
</script>

<style scoped>

</style>