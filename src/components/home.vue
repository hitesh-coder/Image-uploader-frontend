<template>
    <div class="home">
        <transition name="fade">
            <preloader />
        </transition>
        <dragndrop v-if="!uploading" />
        <div class="container" v-else>
            <img
                src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
                alt=""
            />
        </div>
        <div class="container d-none pick-input">
            <input
                type="file"
                name="file"
                id="file"
                @change="imageChosen"
                ref="fileInput"
                style="display: none"
            />
            <div class="btn btn-primary" @click="$refs.fileInput.click()">
                Pick File
            </div>
        </div>

        <div class="container my-4">
            <button
                @click="createPost"
                class="btn btn-primary shadow-sm fw-normal"
                style="width:100%;"
            >
                Submit
            </button>
        </div>

        <div
            class="
                container
                d-flex
                flex-column
                p-4
                border
                rounded-3
                shadow-sm
                my-4
                image-storage
            "
            v-for="image in files.files"
            :key="image"
        >
            <img
                :src="'/api/posts/image/' + image.filename"
                alt=""
                class="image-fluid rounded-3"
            />
            <div
                class="btn btn-danger fw-normal mt-4"
                @click="deleteImage(image._id)"
            >
                DELETE
            </div>
        </div>

        <credits />
    </div>
</template>

<script>
import postService from "../postService";
import Credits from './credits.vue';
import Dragndrop from "./dragndrop.vue";
import preloader from "./preloader.vue";

export default {
    components: { preloader, Dragndrop, Credits },
    name: "home",
    component: { preloader, Dragndrop },
    data() {
        return {
            files: [],
            error: null,
            uploading: false,
        };
    },
    async created() {
        try {
            this.files = await postService.getPosts();
        } catch (err) {
            this.error = err.message;
        }
    },
    computed: {
        imageFile() {
            return this.$store.getters.imageFile;
        },
    },
    methods: {
        setImage(e) {
            let file = e.dataTransfer.files[0];
            let validExtension = ["image/jpg", "image/jpeg", "image/png"];
            // let file = e.dataTransfer.files[0];

            if (validExtension.includes(file.type)) {
                let fileReader = new FileReader();
                fileReader.onload = () => {
                    let fileURL = fileReader.result;
                    // console.log(fileURL)
                    this.$store.dispatch("setImgSrc", fileURL);
                };
                fileReader.readAsDataURL(file);
                this.$store.dispatch("setImgFile", file);
            } else {
                alert("Please enter an image file");
            }
        },
        createPost() {
            let fd = new FormData();
            fd.append("file", this.imageFile);
            postService
                .insertPost(fd)
                .then((this.uploading = true))
                .then(async () => {
                    try {
                        this.files = await postService.getPosts();
                        this.uploading = false;
                    } catch (err) {
                        this.error = err.message;
                    }
                });
            this.$store.dispatch("removeFileData");
        },
        async deleteImage(id) {
            await postService.deletePost(id).then(async () => {
                try {
                    this.files = await postService.getPosts();
                } catch (err) {
                    this.error = err.message;
                }
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media screen and (max-width: 767px) {
    .pick-input {
        display: flex !important;
        justify-content: center;
    }
    .image-storage{
        width: 95%;
    }
}

@media screen and (min-width: 767px) {
    .container {
        width: 50%;
        padding: 0;
    }
}
</style>
