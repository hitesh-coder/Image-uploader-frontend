<template>
  <div class="preloader" v-if="!isloaded">
    <img
      src="https://media2.giphy.com/media/rrTXn4zEMp008/giphy.gif?cid=790b76112a8f84c718115d7a0e1e4969a3856a0df252622b&rid=giphy.gif&ct=g"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: "preloader",
  data() {
    return {
      isloaded: false,
    };
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.isloaded = true;
      }
    };
  },
};
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0%;
  left: 0%;

  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #1f6bc7;

  z-index: 999;
}
</style>
