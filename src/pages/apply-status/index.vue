<template>
  <div class="active-detail">
    <!-- 顶部状态 -->
    <div class="common-wrapper">
      <div class="active-title">
        <div class="active-title-text">{{ $i18n("提款到银行卡") }}</div>
      </div>
      <img class="active-detail-icon" :src="statusText[orderInfo.status].icon" alt="" />
      <div class="active-status" :class="`${orderInfo.status}`">{{ statusText[orderInfo.status].title }}</div>
    </div>
    <!-- 个人信息 -->
    <div class="common-wrapper">
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("提款金额") }}</div>
        <div class="common-item-value">{{ $$tools.toMoney(orderInfo.amount) }} {{ config.currency }}</div>
      </div>
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("提款账户") }}</div>
        <div class="common-item-value">{{ orderInfo.identityName }}</div>
      </div>
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("提款银行卡") }}</div>
        <div class="common-item-value">{{ orderInfo.bankCard }}</div>
      </div>
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("订单号") }}:</div>
        <div class="common-item-value">
          {{ orderInfo.orderNo }}
          <img class="common-copy-icon" @click="copy(orderInfo.orderNo)" src="/images/copy.png" alt="copy" />
        </div>
      </div>
    </div>
    <div class="customer-area flex w-middle w-center" @click="toCustomer">
      <img class="customer-area-icon" src="/images/customer.png" alt="" />
      <div class="customer-area-text">{{ $i18n("客服服务") }}</div>
    </div>
  </div>
</template>

<script>
import ChargeDetail from "../charge-status"
export default {
  name: "applyDetail",
  mixins: [ChargeDetail],
  data() {
    const that = this
    return {
      statusText: {
        confirm: {
          title: that.$i18n("确认中"),
          icon: "/images/status-confirm.png"
        },
        success: {
          title: that.$i18n("提款成功"),
          icon: "/images/status-success.png"
        },
        failed: {
          title: that.$i18n("提款失败"),
          icon: "/images/status-fail.png"
        }
      }
    }
  },
  methods: {
    // 初始化数据
    init() {
      this.config.orderInfo.status = "failed"
      this.orderInfo = this.config.orderInfo || {}
    }
  }
}
</script>

<style scoped lang="scss">
.active-title {
  background: $skin-bg5;
  border-radius: 10px 10px 0 0;
  color: $skin-font1;
  font-weight: bold;
}
</style>
