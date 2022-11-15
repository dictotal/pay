<template>
  <div class="active-detail" v-if="orderInfo.withdrawNo">
    <!-- 顶部状态 -->
    <div class="common-wrapper">
      <div class="active-title">
        <div class="active-title-text">{{ $i18n("提款到银行卡") }}</div>
      </div>
      <img class="active-detail-icon" :src="statusText[orderInfo.withdrawStatus].icon" alt="" />
      <div class="active-status" :class="`${statusText[orderInfo.withdrawStatus].className}`" v-html="orderInfo.withdrawStatusName"></div>
    </div>
    <!-- 个人信息 -->
    <div class="common-wrapper">
      <div class="common-wrapper-item">
        <div class="common-item-label">{{ $i18n("提款金额") }}</div>
        <div class="common-item-value">{{ $$tools.toMoney(orderInfo.orderAmount) }} {{ orderInfo.currency }}</div>
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
      <!-- <img class="customer-area-icon" src="/images/customer.png" alt="" /> -->
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
        // 提款成功 提款失败 字段还未调试
        audit$waiting: {
          title: that.$i18n("确认中"),
          icon: "/images/status-confirm.png",
          className: 'confirm',
        },
        withdraw$success: {
          title: that.$i18n("提款成功"),
          icon: "/images/status-success.png",
          className: 'success'
        },
        withdraw$failed: {
          title: that.$i18n("提款失败"),
          icon: "/images/status-fail.png",
          className: 'failed'
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
      // let config = {
      //   _account: "cherry02",
      //   _balUsable: 17631.08,
      //   _balWdl: 0,
      //   _currency: "MMK",
      //   _currencyUnit: "ks",
      //   _hasAgentPermission: "no",
      //   _userGroup: "u",
      //   bankCard: "012222",
      //   bankName: "AYA Pay",
      //   createDate: "2022-05-26 21:04:47",
      //   iconUrl: "https://img.yym203.com/link/tt/bank_icon/aya_pay.png",
      //   orderAmount: 10000,
      //   realName: "cherry",
      //   remark: "-",
      //   withdrawNo: "2205582752699650621440",
      //   withdrawStatus: "withdraw$waiting",
      //   withdrawStatusName: "<font color='#FF7600'>已发起(汇款中)</font>"
      // }
      console.log('----',config)
      this.orderInfo = config
    }
  }
}
</script>

<style scoped lang="scss">
.active-title {
  background: #ebebeb;
  border-radius: 10px 10px 0 0;
  color: $skin-color333;
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
