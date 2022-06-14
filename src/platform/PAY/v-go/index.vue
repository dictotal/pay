<template>
  <div class="pay-waiting">
    <component :is="viewName" :config="config"></component>
  </div>
</template>
<script>
import onlineBank from "./components/onlineBank"
import transfer from "./components/transfer"
import orderMixin from '../mixins/init'
export default {
  name: "v-go",
  mixins: [orderMixin],
  data() {
    return {
      viewName: "",
      config: {}
    }
  },
  async created() {
    let storeData = await this.getOrderData()
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
