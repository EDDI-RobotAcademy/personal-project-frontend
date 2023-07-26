<template lang="">
    <div class="black-bg">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Moirai+One&display=swap" rel="stylesheet">
        <div class="white-bg form-floating mb-3">
            <div style="text-align: center; padding-top:10px;">
                <a :href=this.placeData.place_url class="titleLink">{{ this.placeData.title }}</a>
            </div>
            <!-- <h4 style="text-align: center; padding: 10px;">{{ this.placeData.title }}</h4>
            <h4 style="text-align: center; padding: 10px;">{{ this.placeData.place_url }}</h4> -->
            <br/>
            <div class="row" style="text-align: center;">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <button type="button" class="btn btn-custom1"> 후기 남기기 </button>
                </div>
                <div class="col-sm-4"></div>
            </div>
            1<br/>
            1<br/>
            1<br/>
            1<br/>
            <div class="row" style="text-align: center;">
                <div class="col-sm-10"></div>
                <div class="col-sm-1">
                    <button type="button" class="btn btn-custom1" @click="$emit('close', false)">xxx</button>            
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['placeData']
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
    height: 300px;
    background: #EDFAFD;
    border-radius: 5px;
    margin: 15px auto;
}

.btn-custom1 {
    --bs-btn-font-weight: 600;
    --bs-btn-color: white;
    --bs-btn-bg: #83c1e7;

    /* --bs-btn-border-color: var(--bd-violet); */
    --bs-btn-border-radius: .5rem;

    /* 마우스 올렸을 때 폰트색 */
    --bs-btn-hover-color: var(--bs-white);
    --bs-btn-hover-bg: #2A93D5;
    /* --bs-btn-hover-border-color: #{shade-color($bd-violet, 10%)}; */

    /* --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb); */
    /* 클릭했을때 색 */
    --bs-btn-active-color: white;
    --bs-btn-active-bg: #2A93D5;
    /* --bs-btn-active-border-color: #{shade-color($bd-violet, 20%)}; */
}

.titleLink {
    text-decoration: none;
    color: black;
    font-size: xx-large;
    font-weight: bold;
    font-family: 'Moirai One', cursive;
}

.titleLink:hover {
    color: #2A93D5;
}

.row {
    margin-right: 0;
    margin-left: 0;
}
</style>