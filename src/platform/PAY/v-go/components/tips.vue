<template>
<div class="transfer-payout">
  <img class="transfer-icon" src="../images/notice.png" alt="">
  <marquee class="transfer-content" v-html="content"></marquee>
</div>
</template>

<script>
export default {
  name: "tips.vue",
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.transfer-payout {
  background: $skin-color7;
  height: 34px;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  padding: 0 12px;
  border-radius: 0 0 12px 12px;
  .transfer-content {
    min-width: 0;
    flex: 1;
    margin-left: 12px;
    color: $skin-font5;
    overflow-x: auto;
    white-space: nowrap;
    height: 34px;
    line-height: 34px;
    em {
      color: $skin-color3
    }
  }
}
</style>