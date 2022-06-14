<template>
  <div class="active-detail" v-show="orderInfo.rechargeNo">
    <!-- 顶部状态 -->
    <div class="common-wrapper">
      <div class="active-title">
        <img class="active-title-icon" src="/images/transfer.png" alt="" />
        <div class="active-title-text">{{ orderInfo.rechargeTypeName }}</div>
      </div>
      <img class="active-detail-icon" :src="statusText[orderInfo.rechargeStatus].icon" alt="" />
      <div class="active-status" :class="`${orderInfo.rechargeStatus}`">{{ statusText[orderInfo.rechargeStatus].title }}</div>
    </div>
    <!-- 个人信息 -->
    <div class="common-wrapper">
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("充值金额") }}:</div>
        <div class="common-item-value">{{ $$tools.toMoney(orderInfo.orderAmount) }} {{ orderInfo.currency }}</div>
      </div>
      <div class="common-wrapper-item" v-if="orderInfo.payAccount">
        <div class="common-item-label">{{ $i18n("付款人开户名") }}</div>
        <div class="common-item-value">{{ orderInfo.payAccount }}</div>
      </div>
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("充值方式") }}</div>
        <div class="common-item-value">{{ orderInfo.rechargeTypeName }}</div>
      </div>
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("订单号") }}:</div>
        <div class="common-item-value">
          {{ orderInfo.rechargeNo }}
          <img class="common-copy-icon" @click="copy(orderInfo.rechargeNo)" src="/images/copy.png" alt="copy" />
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
// import
export default {
  name: "chargeDetail",
  data() {
    const that = this
    return {
      config: {
        orderInfo: {}
      },
      statusText: {
        'pay$waiting': {
          title: that.$i18n("确认中"),
          icon: "/images/status-confirm.png"
        },
        'pay$confirm': {
          title: that.$i18n("确认中"),
          icon: "/images/status-confirm.png"
        },
        'pay$success': {
          title: that.$i18n("充值成功"),
          icon: "/images/status-success.png"
        },
        'pay$failed': {
          title: that.$i18n("支付失败"),
          icon: "/images/status-fail.png"
        }
      },
      orderInfo: {
        rechargeStatus:'pay$confirm'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化数据
    async init() {
      let config = await this.$$ajaxLoading.post('recharge/rechargeRecordInfo', {
        rechargeNo: this.$route.params.id
      })
      this.orderInfo = config
    },
    // 复制文本
    copy(txt) {
      this.$$msg.show(this.$i18n("复制成功,请粘贴使用"))
      this.$$tools.copyToClipboard(txt)

    },
    // 跳转到客服
    toCustomer() {
      dsBridge.call("toCustomer", {})
      this.$$tools.postMessage("toCustomer", {})
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
