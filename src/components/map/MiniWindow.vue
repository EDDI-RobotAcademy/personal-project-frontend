<template lang="">
    <div class="black-bg">
        <div class="white-bg">
            <h2>미니창</h2>
            {{ this.placeData }}
            <button @click="$emit('close', false)">xxx</button>            
        </div>
    </div>
</template>
<script>
export default {
    props : ['placeData']
}
</script>
<style>
.black-bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.399);
    position: fixed;
}
.white-bg {
    width: 50%;
    height: 500px;
    background: rgb(230, 244, 255);
    border-radius: 5px;
    margin: 15px auto;
}
</style>