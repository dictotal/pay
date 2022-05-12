<template>
<div class="active-detail">
  <!-- 顶部状态 -->
  <div class="common-wrapper">
    <div class="active-title">
      <img class="active-title-icon" src="../images/transfer.png" alt="">
      <div class="active-title-text">Bank Transfer</div>
    </div>
    <img class="active-detail-icon" :src="statusText[orderInfo.status].icon" alt="">
    <div class="active-status" :class="`${orderInfo.status}`">{{ statusText[orderInfo.status].title }}</div>
  </div>
  <!-- 个人信息 -->
  <div class="common-wrapper">
    <div class="common-wrapper-item">
      <div class="common-item-label">Deposit Amount:</div>
      <div class="common-item-value">{{ $$tools.toMoney(orderInfo.amount) }} {{config.currency}}</div>
    </div>
    <div class="common-wrapper-item">
      <div class="common-item-label">{{ $i18n('detailStatus.txt_3', '充值方式') }}</div>
      <div class="common-item-value">{{ config.identityName }}</div>
    </div>
    <div class="common-wrapper-item">
      <div class="common-item-label">{{ $i18n('detailStatus.txt_1', '充值方式') }}</div>
      <div class="common-item-value">{{ config.paymentType === 'transpay' ? $i18n('detailStatus.txt_2') : 'THAI QR' }}</div>
    </div>
    <div class="common-wrapper-item">
      <div class="common-item-label">Order number:</div>
      <div class="common-item-value">
        {{ orderInfo.orderNo }}
        <img class="common-copy-icon" @click="copy(orderInfo.orderNo)" src="../images/copy.png" alt="copy">
      </div>
    </div>
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
  created() {
    this.init()
  },
  methods: {
    // 初始化数据
    init() {
      this.orderInfo = this.config.orderInfo || {}
    },
    // 复制文本
    copy(txt) {
      this.$$msg.show(this.$i18n('detailStatus.txt_14','复制成功,请粘贴使用'));
      this.$$tools.copyToClipboard(txt);
    }
  }
}
</script>

<style scoped lang="scss">
.active-title {
  background: #306bff;
  border-radius: 10px 10px 0 0;
}
</style>
