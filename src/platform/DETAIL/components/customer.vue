<template>
  <div class="customer" @click="toCustomer">
    <img class="customer-image" src="../images/customer.png" alt="">
    <div class="customer-name">Customer service</div>
  </div>
</template>

<script>
import dsbridge from 'dsbridge'
export default {
  props: {
    config: Object
  },
  name: "customer",
  methods: {
    // 跳转到客服，兼容andorid App, iOS APP，网页iframe
    toCustomer() {
      if (this.config.device.deviceType === 'mobile') {
        dsbridge.call('toCustomer', JSON.stringify({}))
      }
      if (window.parent) {
        this.$$tools.postMessage('toCustomer', this.config)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.customer {
  width: 355px;
  height: 45px;
  background: $skin-bg5;
  display: flex;
  flex-float: row nowrap;
  align-items: center;
  justify-content: center;
  color: $skin-font1;
  border-radius: 10px;
  position: absolute;
  bottom: 20px;
  bottom: calc(20px + env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  .customer-image {
    width: 16px;
    height: 16px;
    margin-right:5px;
  }
}
</style>