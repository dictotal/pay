<template>
<div class="active-detail">
  <div class="common-wrapper">
    <div class="active-title">
      <img class="active-title-icon" src="../images/transfer.png" alt="">
      <div class="active-title-text">Bank Transfer</div>
    </div>
    <img class="active-detail-icon" :src="statusText[config.orderInfo.status].icon" alt="">
    <div class="active-status">{{ statusText[config.orderInfo.status].title }}</div>
  </div>
</div>
</template>

<script>
// import
export default {
  name: "chargeDetail",
  props: {
    config: Object
  },
  data() {
    const that = this
    return {
      statusText: {
        confirm: {
          title: that.$i18n('detailStatus.txt_4', '确认中'),
          icon: require('../images/status-confirm.png'),
        },
        success: {
          title: that.$i18n('detailStatus.txt_5', '充值成功'),
          icon: require('../images/status-confirm.png'),
        },
        failed: {
          title: that.$i18n('detailStatus.txt_6', '充值失败'),
          icon: require('../images/status-confirm.png'),
        }
      }
    }
  },
}
</script>

<style scoped scoped>
.active-title {
  background: #306bff;
  border-radius: 10px 10px 0 0;
}
</style>