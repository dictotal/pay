<template>
  <div class="pay-waiting">
    <component :is="viewName" :config="config"></component>
  </div>
</template>
<script>
import onlineBank from "./components/onlineBank"
import transfer from "./components/transfer"
export default {
  name: "v-go",
  data() {
    return {
      viewName: "",
      config: {}
    }
  },
  created() {
    let storeKey = window.commonParams.currency + this.$route.query.paymentId
    let storeData = JSON.parse(localStorage.getItem(storeKey))
    if (this.$route.query.modelType === "transfer") {
      this.viewName = "transfer"
      storeData.qrCodeInfo = storeData.transferInfo
    } else {
      this.viewName = "onlineBank"
    }
    this.config = storeData
  },
  components: {
    transfer,
    onlineBank
  }
}
</script>
