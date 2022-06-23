<template>
  <div class="cancel-top flex">
    <div class="cancel-left-info">
      <div class="cancel-left-item flex" v-if="paymentAmount * 1 > 0">
        <div class="cancel-left-label">{{ $i18n("充值金额") }}:</div>
        <div class="cancel-left-value">{{ $$tools.toMoney(paymentAmount) }} {{ config.currency }}</div>
      </div>
      <div class="cancel-left-item flex">
        <div class="cancel-left-label">{{ $i18n("订单号") }}:</div>
        <div class="cancel-left-value">{{ orderNo }}</div>
        <img class="cancel-copy-icon" src="/images/copy.png" @click="copy" />
      </div>
    </div>
    <div class="cancel-top-btn btn" v-if="status === 'wait'" @click="cancelHandel">{{ $i18n("撤销订单") }}</div>
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object
    },
    status: {
      type: String,
      default: "wait"
    }
  },
  computed: {
    orderNo() {
      return this.config.orderNo || this.config.qrCodeInfo.orderNo
    },
    paymentAmount() {
      return this.config.paymentAmount || this.config.qrCodeInfo.amount
    }
  },
  data() {
    return {}
  },
  methods: {
    cancelHandel() {
      this.$emit("cancelHandel")
    },
    copy() {
      this.$$msg.show(this.$i18n("detail.qrcode.txt_4", "复制成功,请粘贴使用"))
      this.$$tools.copyToClipboard(this.orderNo)
    }
  }
}
</script>

<style lang="scss">
.cancel-top {
  background-color: $skin-bg2;
  height: 67px;
  justify-content: space-between;
  align-items: center;
  padding: 15px 12px;
  align-self: flex-start;
  width: 100%;
  .cancel-left-item {
    display: flex;
    line-height: 19px;
    font-size: 13px;
    align-items: center;
    margin-top: 10px;
    &:first-child {
      margin-top: 0px;
    }
    .cancel-left-label {
      color: $skin-font4;
    }
    .cancel-left-value {
      color: $skin-font1;
      padding-left: 4px;
      max-width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .cancel-copy-icon {
    width: 17px;
    height: 17px;
    display: block;
    cursor: pointer;
  }
  .cancel-top-btn {
    font-size: 13px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid $skin-font4;
    color: $skin-font2;
    line-height: 32px;
    padding: 0 2px;
    width: 100px;
    text-align: center;
  }
}
@media screen and (min-width: 780px) {
  .cancel-top {
    background: none;
    font-weight: bold;
    .cancel-left-item {
      .cancel-left-value {
        color: $skin-font5;
        max-width: initial;
      }
    }
    .cancel-top-btn {
      background: $skin-color1;
      color: $skin-font1;
      border: 0;
      cursor: pointer;
    }
  }
}
</style>
