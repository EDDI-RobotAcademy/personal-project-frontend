<template>
    <div>
        <form @submit.prevent="onsubmit" id="signupInfo">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="placeName2" id="placeName" placeholder="placeName"
                    disabled>
                <label for="floatingInput">{{ this.placeName }}</label>
            </div>
            <div>
            </div>
            <div class="form-floating mb-3">
                <div class="row">
                    <div class="col-sm-2">
                        <h5>수질</h5>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="starRating1" name="flexRadioDefault"
                                id="flexRadioDefault1" value="1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                1
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="starRating1" name="flexRadioDefault"
                                id="flexRadioDefault2" value="2">
                            <label class="form-check-label" for="flexRadioDefault2">
                                2
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="starRating1" name="flexRadioDefault"
                                id="flexRadioDefault3" value="3">
                            <label class="form-check-label" for="flexRadioDefault3">
                                3
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="starRating1" name="flexRadioDefault"
                                id="flexRadioDefault4" value="4">
                            <label class="form-check-label" for="flexRadioDefault4">
                                4
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="starRating1" name="flexRadioDefault"
                                id="flexRadioDefault5" value="5">
                            <label class="form-check-label" for="flexRadioDefault5">
                                5
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-floating mb-3">
                <div class="row">
                    <div class="col-sm-2">
                        <h5>시설</h5>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="starRating2" name="flexRadioDefault2"
                                id="flexRadioDefault11" value="1">
                            <label class="form-check-label" for="flexRadioDefault11">
                                1
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="starRating2" name="flexRadioDefault2"
                                id="flexRadioDefault22" value="2">
                            <label class="form-check-label" for="flexRadioDefault22">
                                2
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="starRating2" name="flexRadioDefault2"
                                id="flexRadioDefault33" value="3">
                            <label class="form-check-label" for="flexRadioDefault33">
                                3
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="starRating2" name="flexRadioDefault2"
                                id="flexRadioDefault44" value="4">
                            <label class="form-check-label" for="flexRadioDefault44">
                                4
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="starRating2" name="flexRadioDefault2"
                                id="flexRadioDefault55" value="5">
                            <label class="form-check-label" for="flexRadioDefault55">
                                5
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <div class="form-floating mb-3">

                <input type="content" class="form-control" v-model="content" id="content" placeholder="content"
                    style="height: 400px;">

                <label for="floatingPassword">Content</label>
            </div>
        </form>
        <div>
            <button type="submit" class="btn btn-outline-primary" style="margin-top: 10px;" @click="onSubmit">
                등록
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        placeName: {
            type: String,
            required: true,
            default: ''
        }
    },
    data() {
        return {
            placeName2: '',
            content: '',
            starRating1: '',
            starRating2: ''
        }
    },
    methods: {
        onSubmit() {
            const { placeName2, content, starRating1, starRating2 } = this
            this.$emit('submit', { placeName2, content, starRating1, starRating2 })
        }
    },
}
</script>
<style></style>