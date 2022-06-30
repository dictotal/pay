<template>
  <div class="not-found" id="notFound">
    <div class="btn not-found-btn" @click="$router.replace('/')">{{ $i18n("回到首页") }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created () {
    this.$router.replace('/')
  }
}
</script>
<style lang="scss" scoped>
.not-found-btn {
  color: $skin-font3;
  width: 2rem;
  height: 0.44rem;
  line-height: 0.44rem;
  background: $skin-white;
  font-size: 14px;
  text-align: center;
  margin: 0.5rem auto;
  border-radius: 10px;
}
</style>
