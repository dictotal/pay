<template>
  <div class="transfer-payout">
    <img class="transfer-icon" src="../images/notice.png" alt="" />
    <div class="transfer-content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: "tips.vue",
  props: {
    content: {
      type: String,
      default: ""
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
    font-weight: bold;
    overflow-x: auto;
    white-space: nowrap;
    height: 34px;
    line-height: 34px;
    em {
      color: $skin-color3;
    }
  }
}

@media screen and (min-width: 780px) {
  .transfer-payout {
    border-radius: 0;
    .transfer-icon {
      width: 18px;
      height: 18px;
    }
    .transfer-content {
      font-size: 14px;
    }
  }
}
</style>
