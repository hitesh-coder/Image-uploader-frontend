<template>
  <div
    class="
      d-none d-md-flex
      flex-column
      dragndrop
      container
      p-4
      shadow
      rounded-3
      justify-content-center
      align-items-center
    "
    style="width: 50%"
  >
    <div class="text-center fs-4 fw-bold my-2">Upload your image</div>
    <div class="text-center fw-normal fs-6 my-2">
      File should be Jpeg, Png,...
    </div>
    <div v-if="imgSrc">
      <img :src="imgSrc" alt="" style="width: 90%" class="rounded-3 my-4" />
    </div>
    <div
      class="
        drag-area
        border-primary border-2
        rounded-3
        p-5
        bg-light bg-gradient
        my-4
      "
      :style="{ border: borderState }"
      style="width: 90%"
      @dragover.prevent="changeBorderToSolid"
      @dragleave="changeBorderToDashed"
      @drop.prevent="imageDrop"
      v-else
    >
      <img src="../assets/image.svg" alt="" class="image-fluid mb-4" />
      <div class="text-center">Drag & Drop your image here</div>
      <div class="text-center fs-4 fw-normal">or</div>
      <input
        type="file"
        name="file"
        id="file"
        @change="imageChosen"
        ref="fileInput"
        style="display: none"
      />
      <div
        class="btn btn-primary mt-4 shadow-sm"
        @click="$refs.fileInput.click()"
      >
        Pick File
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dragndrop",
  data() {
    return {
      borderState: "dashed",
      getImage: null,
    };
  },
  computed: {
    imgSrc() {
      return this.$store.getters.imageSrc;
    },
  },
  methods: {
    changeBorderToSolid(e) {
      e.preventDefault();
      this.borderState = "solid";
    },
    changeBorderToDashed() {
      this.borderState = "dashed";
    },
    imageChosen(e) {
      this.setImage(e.target.files[0]);
    },
    dropImage(e) {
      this.setImage(e.dataTransfer.files[0]);
    },
    setImage(file) {
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
  },
};
</script>

<style lang="scss" scoped></style>
