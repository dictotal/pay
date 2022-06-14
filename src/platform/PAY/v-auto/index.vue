<template>
  <div class="pay-waiting">
    <component :is="viewName" :config="config"></component>
  </div>
</template>
<script>
import Tools from "@/common/tools"
import transfer from "./components/transfer"
import { injectLanguage } from "@/common/i18n"
import lang from "@/platform/PAY/v-go/language.json"
import langAuto from "./language.json"
import orderMixin from '../mixins/init'

let injectOnce = Tools.once(function () {
  injectLanguage(lang)
  injectLanguage(langAuto)
})
export default {
  name: "v-go",
  mixins: [orderMixin],
  data() {
    return {
      viewName: "",
      config: null
    }
  },
  async created() {
    let storeData = await this.getOrderData()
    storeData.qrCodeInfo = storeData.transferInfo
    storeData.qrCodeInfo.amount = null
    storeData.paymentAmount = null
    this.config = storeData
    this.viewName = 'transfer'
    injectOnce()
  },
  components: {
    transfer
  }
}
</script>
