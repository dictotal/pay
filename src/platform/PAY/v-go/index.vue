<template>
  <div class="pay-waiting">
    <component :is="viewName" :config="config"></component>
  </div>
</template>
<script>
import onlineBank from "./components/onlineBank"
import transfer from "./components/transfer"
import { qrcodeData, transferData } from "@/data"
export default {
  name: "v-go",
  data() {
    return {
      viewName: "",
      config: {}
    }
  },
  created() {
    if (this.$route.query.paymentType === "transpay") {
      this.viewName = "transfer"
      transferData.qrCodeInfo = transferData.transferInfo
      this.config = transferData
    } else {
      this.viewName = "onlineBank"
      console.error(qrcodeData)
      this.config = qrcodeData
    }
  },
  components: {
    transfer,
    onlineBank
  }
}
</script>
