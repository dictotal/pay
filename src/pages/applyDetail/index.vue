<template>
<div class="active-detail">
  <!-- 顶部状态 -->
  <div class="common-wrapper">
    <div class="active-title">
      <div class="active-title-text">{{ $i18n('detailStatus.txt_7') }}</div>
    </div>
    <img class="active-detail-icon" :src="statusText[orderInfo.status].icon" alt="">
    <div class="active-status" :class="`${orderInfo.status}`">{{ statusText[orderInfo.status].title }}</div>
  </div>
  <!-- 个人信息 -->
  <div class="common-wrapper">
    <div class="common-wrapper-item">
      <div class="common-item-label">{{ $i18n('detailStatus.txt_8', '提款金额') }}</div>
      <div class="common-item-value">{{ $$tools.toMoney(orderInfo.amount) }} {{config.currency}}</div>
    </div>
    <div class="common-wrapper-item">
      <div class="common-item-label">{{ $i18n('detailStatus.txt_9', '提款账户') }}</div>
      <div class="common-item-value">{{ config.identityName }}</div>
    </div>
    <div class="common-wrapper-item">
      <div class="common-item-label">{{ $i18n('detailStatus.txt_10', '提款银行卡') }}</div>
      <div class="common-item-value">{{ orderInfo.bankCard }}</div>
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
          title: that.$i18n('detailStatus.txt_5', '提款成功'),
          icon: require('../images/status-success.png'),
        },
        failed: {
          title: that.$i18n('detailStatus.txt_6', '提款失败'),
          icon: require('../images/status-fail.png'),
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
      this.config.orderInfo.status = 'failed'
      this.orderInfo = this.config.orderInfo || {}
      console.log(this.orderInfo, 'this.orderInfo')
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
  background: $skin-color1;
  border-radius: 10px 10px 0 0;
  color: $skin-bg1;
  font-weight: bold;
}
</style>
