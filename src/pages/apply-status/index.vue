<template>
  <div class="active-detail" v-if="orderInfo.withdrawNo">
    <!-- 顶部状态 -->
    <div class="common-wrapper">
      <div class="active-title">
        <div class="active-title-text">{{ $i18n("提款到银行卡") }}</div>
      </div>
      <img class="active-detail-icon" :src="statusText[orderInfo.withdrawStatus].icon" alt="" />
      <div class="active-status" :class="`${orderInfo.withdrawStatus}`" v-html="orderInfo.withdrawStatusName"></div>
    </div>
    <!-- 个人信息 -->
    <div class="common-wrapper">
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("提款金额") }}</div>
        <div class="common-item-value">{{ $$tools.toMoney(orderInfo.orderAmount) }} {{ orderInfo._currency }}</div>
      </div>
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("提款账户") }}</div>
        <div class="common-item-value">{{ orderInfo.realName }}</div>
      </div>
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("提款银行卡") }}</div>
        <div class="common-item-value">{{ orderInfo.bankCard }}</div>
      </div>
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("订单号") }}:</div>
        <div class="common-item-value">
          {{ orderInfo.withdrawNo }}
          <img class="common-copy-icon" @click="copy(orderInfo.withdrawNo)" src="/images/copy.png" alt="copy" />
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
        withdraw$waiting: {
          title: that.$i18n("确认中"),
          icon: "/images/status-confirm.png"
        },
        withdraw$success: {
          title: that.$i18n("提款成功"),
          icon: "/images/status-success.png"
        },
        withdraw$failed: {
          title: that.$i18n("提款失败"),
          icon: "/images/status-fail.png"
        }
      },
      orderInfo: {
        withdrawStatus: "withdraw$waiting"
      }
    }
  },
  methods: {
    // 初始化数据
    async init() {
      let config = await this.$$ajaxLoading.post("/withdraw/withdrawInfo", {
        withdrawNo: this.$route.params.id
      })
      this.orderInfo = config
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
@media screen and (min-width: 780px) {
  .active-title {
    background: $skin-color1;
    color: $skin-font1;
    font-weight: bold;
  }
}
</style>
