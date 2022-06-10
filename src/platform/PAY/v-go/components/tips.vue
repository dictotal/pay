<template>
<div class="transfer-payout">
  <img class="transfer-icon" src="../images/notice.png" alt="">
  <div class="transfer-content" v-html="content"></div>
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
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  padding: 8px 12px;
  border-radius: 0 0 12px 12px;
  .transfer-content {
    min-width: 0;
    flex: 1;
    margin-left: 12px;
    display: block;
    color: $skin-font5;
    em {
      color: $skin-color3
    }
  }
}
</style>
